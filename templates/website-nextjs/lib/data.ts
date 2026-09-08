/**
 * Everything that changes lives behind an async accessor here, now backed by
 * Supabase. Row-level security does the gating: partners are only selectable
 * when they are published AND carry a consent date, so an unconsented partner
 * cannot reach the page even if a query forgets to filter.
 *
 * Static prose (mission, values, how we work, about) is NOT here — it lives in
 * MDX under content/.
 *
 * Note on what is deliberately absent: the internal screening taxonomy
 * (leadership demographics, faith alignment, giving levels, amounts) has no
 * field in any type below. It is internal, and the surest way to keep it off
 * the site is for the public data layer not to carry it at all. Keep it that
 * way when this moves to Supabase: select the columns listed here, not the row.
 */

import { supabase } from '@/lib/supabase';

export type Region = 'charlotte' | 'east-africa' | 'national-global';
export type Vehicle = 'fund' | 'direct' | 'pri' | 'angel';
export type ReturnPosture = 'at-market' | 'above-market' | 'concessionary';

export const REGION_LABELS: Record<Region, string> = {
  charlotte: 'Charlotte and North Carolina',
  'east-africa': 'East Africa',
  'national-global': 'National and global'
};

export const REGION_ORDER: Region[] = ['charlotte', 'east-africa', 'national-global'];

export const VEHICLE_LABELS: Record<Vehicle, string> = {
  fund: 'Fund',
  direct: 'Direct investment',
  pri: 'Programme-related investment',
  angel: 'Angel investment'
};

export const POSTURE_LABELS: Record<ReturnPosture, string> = {
  'at-market': 'At market',
  'above-market': 'Above market',
  concessionary: 'Concessionary'
};

export interface Organization {
  slug: string;
  name: string;
  /** One line, in the organization's own words. */
  description: string;
  region: Region;
  /** Where the work happens, when it is more specific than the region. */
  place: string | null;
  url: string | null;
  /** Partner-supplied and consented. Null renders no image at all. */
  logoUrl: string | null;
  /** Short labels for what the organization offers. Shown on the card back. */
  offers: string[];
  /** ISO 8601 date consent was received. Null means this entry never renders. */
  consentReceivedAt: string | null;
}

export interface PortfolioHolding {
  slug: string;
  name: string;
  vehicle: Vehicle;
  geography: string;
  cause: string;
  url: string | null;
  /** Held in the data, published only when flags.showReturnPosture is on. */
  returnPosture: ReturnPosture;
  consentReceivedAt: string | null;
}

export interface Event {
  slug: string;
  title: string;
  /** ISO 8601. Null when the date is not settled yet. */
  date: string | null;
  location: string;
  description: string;
  url: string | null;
  /** Dinner, Book discussion, Convening, Visit. */
  kind: string | null;
}

export interface Resource {
  slug: string;
  title: string;
  source: string;
  /** Why Michele passes this along. */
  why: string;
  url: string;
}

const emptyOnMissingConfig = <T,>(rows: T[] | null): T[] => rows ?? [];

/** Only published organizations with a consent date are ever returned. */
export async function getOrganizations(region?: Region): Promise<Organization[]> {
  if (!supabase) return [];
  let q = supabase
    .from('partners')
    .select('slug,name,description,region,place,offers,url,logo_url,consent_received_at')
    .order('sort_order')
    .order('name');
  if (region) q = q.eq('region', region);
  const { data } = await q;
  return emptyOnMissingConfig(data).map((r) => ({
    slug: r.slug,
    name: r.name,
    description: r.description,
    region: r.region as Region,
    place: r.place,
    url: r.url,
    logoUrl: r.logo_url,
    offers: r.offers ?? [],
    consentReceivedAt: r.consent_received_at
  }));
}

/**
 * The same partners, but read as the signed-in staff member when there is one.
 *
 * Anonymous visitors get exactly what the RLS policy allows: published rows
 * with a real consent date. Staff get every row, so the cards can be reviewed
 * before anyone has been asked for consent — without faking a consent date or
 * loosening the policy that protects them. Rows the public cannot see come back
 * flagged, and the card marks them.
 */
export async function getOrganizationsForViewer(): Promise<{
  groups: Array<{ region: Region; label: string; organizations: Organization[] }>;
  isStaff: boolean;
  draftSlugs: Set<string>;
}> {
  const { createClient } = await import('@/lib/auth/server');
  const authed = await createClient();
  const { data: claimData } = await authed.auth.getClaims();
  const isStaff = Boolean(claimData?.claims);

  if (!isStaff) {
    return { groups: await getOrganizationsByRegion(), isStaff: false, draftSlugs: new Set() };
  }

  const { data } = await authed
    .from('partners')
    .select('slug,name,description,region,place,offers,url,logo_url,consent_received_at,is_published')
    .order('sort_order')
    .order('name');

  const rows = data ?? [];
  const draftSlugs = new Set(
    rows.filter((r) => !r.is_published || !r.consent_received_at).map((r) => r.slug as string)
  );
  const all: Organization[] = rows.map((r) => ({
    slug: r.slug,
    name: r.name,
    description: r.description,
    region: r.region as Region,
    place: r.place,
    url: r.url,
    logoUrl: r.logo_url,
    offers: r.offers ?? [],
    consentReceivedAt: r.consent_received_at
  }));

  const groups = REGION_ORDER.map((region) => ({
    region,
    label: REGION_LABELS[region],
    organizations: all.filter((o) => o.region === region)
  })).filter((g) => g.organizations.length > 0);

  return { groups, isStaff: true, draftSlugs };
}

export async function getOrganizationsByRegion(): Promise<Array<{ region: Region; label: string; organizations: Organization[] }>> {
  const all = await getOrganizations();
  return REGION_ORDER.map((region) => ({
    region,
    label: REGION_LABELS[region],
    organizations: all.filter((o) => o.region === region)
  })).filter((group) => group.organizations.length > 0);
}

export async function getPortfolio(): Promise<PortfolioHolding[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from('portfolio')
    .select('slug,name,vehicle,geography,cause,url,return_posture,consent_received_at')
    .order('sort_order')
    .order('name');
  return emptyOnMissingConfig(data).map((r) => ({
    slug: r.slug,
    name: r.name,
    vehicle: r.vehicle as Vehicle,
    geography: r.geography,
    cause: r.cause,
    url: r.url,
    returnPosture: r.return_posture as ReturnPosture,
    consentReceivedAt: r.consent_received_at
  }));
}

const EVENT_COLUMNS = 'slug,title,starts_at,location,description,link,kind';

type EventRow = {
  slug: string; title: string; starts_at: string | null; location: string | null;
  description: string | null; link: string | null; kind: string | null;
};

const toEvent = (r: EventRow): Event => ({
  slug: r.slug,
  title: r.title,
  date: r.starts_at ? String(r.starts_at).slice(0, 10) : null,
  location: r.location ?? '',
  description: r.description ?? '',
  url: r.link,
  kind: r.kind
});

const today = (now: Date) => now.toISOString().slice(0, 10);

/**
 * Upcoming events, soonest first. Undated events sort last: they are still
 * ahead of us, we just do not know when. The page spotlights the first of
 * these and lists the rest.
 */
export async function getUpcomingEvents(now = new Date()): Promise<Event[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from('events')
    .select(EVENT_COLUMNS)
    .order('starts_at', { ascending: true, nullsFirst: false });
  const cutoff = today(now);
  return (data ?? []).map(toEvent).filter((e) => !e.date || e.date >= cutoff);
}

/** The archive: most recently finished first. */
export async function getPastEvents(limit = 5, now = new Date()): Promise<Event[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from('events')
    .select(EVENT_COLUMNS)
    .lt('starts_at', now.toISOString())
    .order('starts_at', { ascending: false })
    .limit(limit);
  return (data ?? []).map(toEvent);
}

export async function getResources(): Promise<Resource[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from('resources')
    .select('slug,title,source,why_it_matters,link')
    .order('sort_order');
  return emptyOnMissingConfig(data).map((r) => ({
    slug: r.slug,
    title: r.title,
    source: r.source ?? '',
    why: r.why_it_matters ?? '',
    url: r.link ?? ''
  }));
}

export function formatEventDate(date: string | null): string {
  if (!date) return 'Date to be set';
  return new Date(date + 'T12:00:00Z').toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC'
  });
}
