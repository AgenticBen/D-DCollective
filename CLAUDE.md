# D+D Collective — website

The public website for D+D Collective, a private charitable foundation working
toward the restoration of shalom through grants and redemptive investing.

Worked on by Ben and Michele, each with their own Claude. The rules below are
not preferences — several of them are legal or consent obligations.

## ⚠ This repository is PUBLIC

Anything committed here is world-readable and stays readable in git history even
after deletion. Before adding a file, assume a stranger will read it.

### Never commit

- **The internal brief** (`private/`, `website-content-brief.html`) — it is
  headed "Internal · Meeting prep" and carries partner demographics, faith
  alignment, portfolio return postures and internal notes.
- **Leadership demographics or faith-alignment classifications of real
  organizations.** Asking an applicant these on a form is fine and intended;
  recording them against a named partner is internal screening taxonomy.
- **Portfolio holdings, return postures, giving levels, or amounts.**
- **The internal screens:** the conversions exclusion, the investment exclusion
  screen, the IRS 4944 PRI test, impact stress tests, reference-check criteria.
  These stay in Supabase or in env config, never in tracked code — committing
  them as admin logic publishes them.
- **Secrets.** Never a real key in a tracked file, and never the Supabase
  secret/service-role key in a `NEXT_PUBLIC_*` variable — that ships it to the
  browser. Add it with `vercel env add SUPABASE_SERVICE_ROLE_KEY production`,
  which reads the value from a prompt rather than the command line.

The hard gates that the brief *does* say to make public are fine in code: the
diverse board/leadership requirement, the post-revenue requirement, and founder
personal capital.

### Consent is a content rule

No named partner, scholar or grantee ships without their approval, and the
description should be in their own words. `consentReceivedAt` gates rendering in
both the data layer and the Supabase row-level-security policy. A row with a
null consent date must never render.

### The MCP server

`/api/mcp` exposes content tools so events and the reading list can be managed
conversationally: `list_events`, `create_event`, `update_event`, `publish_event`,
`delete_event`, `list_resources`, `create_resource`.

It holds **no service-role key**. Every request authenticates as a real staff
member and the Supabase client carries that identity into row-level security, so
the tools can only do what that person could do. That is why the MCP cannot read
`grant_submissions` or `investment_submissions` — those tables carry no policy,
so an authenticated session gets nothing back. Verified, not assumed.

The bearer credential is either a Supabase access token or `email:password`;
the latter exists because access tokens expire after an hour and an MCP config
is static. Revoke access by changing the password or disabling the user.

## Publishing content

Content lives in Supabase (project `dd-collective`), not in git. `lib/data.ts`
holds types and accessors only.

Partners and portfolio holdings are loaded but **unpublished**: the design's own
source says the descriptions are drafts to be replaced with copy each
organization writes about itself, and urls stay null until they confirm. A
partner appears on the site only when `is_published` is true AND
`consent_received_at` is set — enforced by the row-level-security policy, not
just by app code. Events and resources are D+D's own content and are published.

Events carry a `kind` (Dinner, Book discussion, Convening, Visit). The Events
page derives all three of its sections from `starts_at`, so nothing needs
curating: the soonest future event becomes the spotlight, the remaining future
events fill "Coming up", and anything past falls into the archive, most recent
first, capped at five.

Pages revalidate every 60 seconds, so publishing a row shows up without a
redeploy.

### Scholarships: 4945(g) approval is pending

The site may describe the scholarship focus and feature alumni. It must not
carry an application form, a deadline, or "apply now" language for the new
entity until IRS 4945(g) approval is received.

## /admin authentication

Real auth, via Supabase Auth. Sessions are cookie-based (`@supabase/ssr`) and
`/admin` is gated in `middleware.ts` — server-side, against a validated JWT,
never by conditional rendering in a client component.

Two rules that are easy to get wrong:

- Use `supabase.auth.getClaims()` in server code. **Never** `getSession()`: the
  cookie can be spoofed and `getSession()` does not revalidate the token.
- There is no public sign-up route and no sign-up UI. Accounts are created by
  hand in the Supabase dashboard.

Credentials live in Supabase, never in this repository. Do not hard-code an
email or password anywhere in the tree — it is public.

## Publishing content

Content lives in Supabase (project `dd-collective`), not in git. `lib/data.ts`
holds types and accessors only.

Partners and portfolio holdings are loaded but **unpublished**: the design's own
source says the descriptions are drafts to be replaced with copy each
organization writes about itself, and urls stay null until they confirm. A
partner appears on the site only when `is_published` is true AND
`consent_received_at` is set — enforced by the row-level-security policy, not
just by app code. Events and resources are D+D's own content and are published.

Pages revalidate every 60 seconds, so publishing a row shows up without a
redeploy.

### Scholarships: 4945(g) approval is pending

The site may describe the scholarship focus and feature alumni. It must not
carry an application form, a deadline, or "apply now" language for the new
entity until IRS 4945(g) approval is received.

## ⚠ /admin has no authentication yet

Sign-in accepts anything, no password is checked, and `/admin` is directly
reachable. This is deliberate, so the dashboard can be reviewed. It is safe only
while **both** of these hold:

1. Vercel deployment protection covers every URL that serves the site. It is
   currently `all_except_custom_domains` — so attaching a custom domain leaves
   the admin wide open.
2. The submissions shown are invented. `lib/admin-sample.ts` holds fabricated
   records; no real applicant data is stored anywhere yet.

Replace it with Supabase Auth enforced in Next.js middleware before either
changes. The real thing holds applicants' revenue figures, co-investor names and
personal capital positions. Delete the demo path entirely rather than leaving a
bypass in the codebase.

## Layout

```
tokens/ styles.css assets/ guidelines/ components/   the design system
SKILL.md github.md readme.md                          design-system docs
templates/website-nextjs/                             ← the site that ships
```

`templates/website-nextjs/` is the production app; Vercel's Root Directory
points at it. `ui_kits/` (the static click-through prototype, including the
admin design) is gitignored and stays local — it is the visual reference for
building the real admin.

## Brand

The design system is the source of truth. `app/globals.css` is a verbatim port
of `tokens/*.css`; change the tokens first, then mirror. `components/ds.tsx`
mirrors the design system's components line-for-line.

- **DM Sans** throughout, **DM Mono** for metadata, dates and token values.
  The system ships no serif — do not reintroduce one.
- Logo teals `#A4DBDA` / `#67AFB7` are authoritative for the mark and the
  brand gradient. Interface teals `#4BBFBF` / `#2A8FA8` carry UI text and
  borders, where the softer logo teal fails contrast.
- Border-led, not shadow-led: one hairline, one 56x2px gradient rule. No
  shadows except the focus ring. No icons — the system ships none; use a
  label, a pill, a number, or a unicode arrow.
- Sentence case. No emoji. Institutional "we", never "I". Interpuncts (·)
  carry metadata.
- Logo artwork is raster, traced from screenshots — the .ai/.eps files never
  arrived. Replace `public/brand/*` when real vectors exist.

## Working on it

```bash
cd templates/website-nextjs && npm install && npm run dev
```

Branch off `main`, open a PR. The site is `noindex` in three places (layout
metadata, `robots.txt`, and an `X-Robots-Tag` header) until launch — leave that
in place.
