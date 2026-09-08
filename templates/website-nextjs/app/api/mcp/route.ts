import { createMcpHandler, withMcpAuth } from 'mcp-handler';
/* The MCP SDK's schema types are zod v4, while the form validation in
   lib/schemas.ts is zod v3 and working. Rather than migrate the forms to get
   this route to compile, v4 is installed under an alias and used only here. */
import { z } from 'zod4';
import { clientForSession, sessionForCredential } from '@/lib/mcp-auth';

export const maxDuration = 60;

/** Tool results are plain text: clients render it, and failures read clearly. */
const say = (text: string) => ({ content: [{ type: 'text' as const, text }] });

/**
 * The staff member's access token, which withMcpAuth put on the request and the
 * handler threads through to the tool context. It lives under `http`, not at the
 * top level — verified against a live call rather than assumed.
 */
const tokenOf = (ctx: unknown) =>
  (ctx as { http?: { authInfo?: { token?: string } } }).http?.authInfo?.token ?? '';

const KINDS = ['Dinner', 'Book discussion', 'Convening', 'Visit'] as const;

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'list_events',
      {
        description:
          'List gatherings: slug, date, title, location, kind, and whether each is published. The site ' +
          'derives its own sections from the date — soonest future event is the spotlight, later ones are ' +
          '"Coming up", past ones fall into the archive.',
        inputSchema: { include_unpublished: z.boolean().optional() }
      },
      async (args, ctx) => {
        const { include_unpublished = true } = args as { include_unpublished?: boolean };
        const supabase = clientForSession(tokenOf(ctx));
        let query = supabase
          .from('events')
          .select('slug,title,starts_at,location,kind,is_published')
          .order('starts_at', { ascending: true });
        if (!include_unpublished) query = query.eq('is_published', true);

        const { data, error } = await query;
        if (error) return say(`Could not list events: ${error.message}`);
        if (!data?.length) return say('No events yet.');

        return say(
          data
            .map((e) => {
              const when = e.starts_at ? String(e.starts_at).slice(0, 10) : 'date not set';
              return `${e.slug} · ${when} · ${e.title}${e.location ? ` · ${e.location}` : ''}` +
                `${e.kind ? ` · ${e.kind}` : ''} · ${e.is_published ? 'published' : 'draft'}`;
            })
            .join('\n')
        );
      }
    );

    server.registerTool(
      'create_event',
      {
        description:
          "Add a gathering. The site places it automatically from starts_at. Leave it a draft unless it " +
          'is ready to be public.',
        inputSchema: {
          title: z.string().min(1),
          starts_at: z.string().describe('ISO 8601, e.g. 2026-12-03T18:00:00Z'),
          location: z.string().min(1),
          description: z.string().min(1).describe("One or two sentences in D+D's plain voice."),
          kind: z.enum(KINDS),
          is_online: z.boolean().optional(),
          link: z.string().url().nullable().optional(),
          publish: z.boolean().optional().describe('Put it on the public site straight away.')
        }
      },
      async (args, ctx) => {
        const input = args as {
          title: string; starts_at: string; location: string; description: string;
          kind: string; is_online?: boolean; link?: string | null; publish?: boolean;
        };
        const startsAt = new Date(input.starts_at);
        if (Number.isNaN(startsAt.getTime())) {
          return say(`"${input.starts_at}" is not a date I can read. Use ISO 8601, e.g. 2026-12-03T18:00:00Z.`);
        }

        const slug = slugify(input.title);
        const supabase = clientForSession(tokenOf(ctx));
        const { error } = await supabase.from('events').insert({
          slug,
          title: input.title,
          starts_at: startsAt.toISOString(),
          location: input.location,
          description: input.description,
          kind: input.kind,
          is_online: input.is_online ?? false,
          link: input.link ?? null,
          is_published: input.publish ?? false
        });

        if (error) {
          return say(
            error.code === '23505'
              ? `There is already an event with the slug "${slug}". Give it a slightly different title.`
              : `Could not create the event: ${error.message}`
          );
        }

        return say(
          `Created "${input.title}" (${slug}) on ${startsAt.toISOString().slice(0, 10)} at ${input.location}. ` +
            (input.publish ? 'It is live; the site refreshes within a minute.' : 'It is a draft — publish_event puts it on the site.')
        );
      }
    );

    server.registerTool(
      'update_event',
      {
        description: 'Change a gathering. Only the fields you pass are altered.',
        inputSchema: {
          slug: z.string().min(1),
          title: z.string().min(1).optional(),
          starts_at: z.string().optional(),
          location: z.string().min(1).optional(),
          description: z.string().min(1).optional(),
          kind: z.enum(KINDS).optional(),
          link: z.string().url().nullable().optional()
        }
      },
      async (args, ctx) => {
        const { slug, ...fields } = args as Record<string, unknown> & { slug: string };
        const patch: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(fields)) {
          if (v === undefined) continue;
          if (k === 'starts_at') {
            const d = new Date(String(v));
            if (Number.isNaN(d.getTime())) return say(`"${String(v)}" is not a date I can read.`);
            patch.starts_at = d.toISOString();
          } else {
            patch[k] = v;
          }
        }
        if (Object.keys(patch).length === 0) return say('Nothing to change — pass at least one field.');

        const supabase = clientForSession(tokenOf(ctx));
        const { data, error } = await supabase.from('events').update(patch).eq('slug', slug).select('slug');
        if (error) return say(`Could not update ${slug}: ${error.message}`);
        if (!data?.length) return say(`No event with the slug "${slug}".`);
        return say(`Updated ${slug}: ${Object.keys(patch).join(', ')}.`);
      }
    );

    server.registerTool(
      'publish_event',
      {
        description: 'Put a gathering on the public site, or take it back off.',
        inputSchema: { slug: z.string().min(1), published: z.boolean().optional() }
      },
      async (args, ctx) => {
        const { slug, published = true } = args as { slug: string; published?: boolean };
        const supabase = clientForSession(tokenOf(ctx));
        const { data, error } = await supabase
          .from('events')
          .update({ is_published: published })
          .eq('slug', slug)
          .select('slug,title');
        if (error) return say(`Could not change ${slug}: ${error.message}`);
        if (!data?.length) return say(`No event with the slug "${slug}".`);
        return say(`"${data[0].title}" is now ${published ? 'on the site' : 'a draft'}.`);
      }
    );

    server.registerTool(
      'delete_event',
      {
        description: 'Remove a gathering permanently. Prefer unpublishing unless it should truly be gone.',
        inputSchema: { slug: z.string().min(1) }
      },
      async (args, ctx) => {
        const { slug } = args as { slug: string };
        const supabase = clientForSession(tokenOf(ctx));
        const { data, error } = await supabase.from('events').delete().eq('slug', slug).select('slug');
        if (error) return say(`Could not delete ${slug}: ${error.message}`);
        if (!data?.length) return say(`No event with the slug "${slug}".`);
        return say(`Deleted ${slug}.`);
      }
    );

    server.registerTool(
      'list_resources',
      {
        description: 'List the reading list shown under "Worth reading" on the Events page.',
        inputSchema: {}
      },
      async (_args, ctx) => {
        const supabase = clientForSession(tokenOf(ctx));
        const { data, error } = await supabase
          .from('resources')
          .select('slug,title,source,is_published')
          .order('sort_order');
        if (error) return say(`Could not list resources: ${error.message}`);
        if (!data?.length) return say('No resources yet.');
        return say(
          data.map((r) => `${r.slug} · ${r.title} (${r.source}) · ${r.is_published ? 'published' : 'draft'}`).join('\n')
        );
      }
    );

    server.registerTool(
      'create_resource',
      {
        description: 'Add a piece to the reading list.',
        inputSchema: {
          title: z.string().min(1),
          source: z.string().min(1),
          why_it_matters: z.string().min(1).describe('Why D+D keeps sending people this.'),
          link: z.string().url(),
          publish: z.boolean().optional()
        }
      },
      async (args, ctx) => {
        const input = args as {
          title: string; source: string; why_it_matters: string; link: string; publish?: boolean;
        };
        const slug = slugify(input.title);
        const supabase = clientForSession(tokenOf(ctx));
        const { error } = await supabase.from('resources').insert({
          slug,
          title: input.title,
          source: input.source,
          why_it_matters: input.why_it_matters,
          link: input.link,
          is_published: input.publish ?? false
        });
        if (error) return say(`Could not add the resource: ${error.message}`);
        return say(`Added "${input.title}" (${slug}).${input.publish ? ' It is live.' : ' It is a draft.'}`);
      }
    );
  },
  {
    serverInfo: { name: 'dd-collective', version: '1.0.0' },
    instructions:
      'Content tools for the D+D Collective website: events and the reading list. Grant and investment ' +
      'submissions are deliberately unreachable from here.'
  }
);

/**
 * Every request authenticates as a real staff member, and the Supabase client
 * carries that identity into row-level security. There is no service key here
 * on purpose: these tools can only do what that person could do, which is why
 * they cannot read applicant submissions.
 */
const authenticated = withMcpAuth(
  handler,
  async (_req, bearer) => {
    if (!bearer) return undefined;
    const session = await sessionForCredential(bearer);
    if (!session) return undefined;
    return { token: session.accessToken, clientId: session.email, scopes: ['content'] };
  },
  { required: true }
);

export { authenticated as GET, authenticated as POST };
