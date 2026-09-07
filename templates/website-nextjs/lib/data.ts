/**
 * Everything that changes lives behind an async accessor here. Replacing a
 * body with a Supabase query touches this file and nothing else.
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
}

export interface Resource {
  slug: string;
  title: string;
  source: string;
  /** Why Michele passes this along. */
  why: string;
  url: string;
}

/**
 * TODO(supabase): select from the `organizations` table.
 * Organizations, with their consent dates, live in Supabase. Deliberately empty here: this repository is public, and
 * partner names ship only after consent is recorded. Seed rows are kept
 * out of git in private/seed/data.with-rows.ts.
 */
const organizations: Organization[] = [];

/**
 * TODO(supabase): select from the `portfolio` table.
 * Portfolio holdings, including returnPosture, live in Supabase. Deliberately empty here: this repository is public, and
 * partner names ship only after consent is recorded. Seed rows are kept
 * out of git in private/seed/data.with-rows.ts.
 */
const portfolio: PortfolioHolding[] = [];

/**
 * TODO(supabase): select from the `events` table.
 * Events live in Supabase so Michele can publish them from the admin. Deliberately empty here: this repository is public, and
 * partner names ship only after consent is recorded. Seed rows are kept
 * out of git in private/seed/data.with-rows.ts.
 */
const events: Event[] = [];

/**
 * TODO(supabase): select from the `resources` table.
 * Resources live in Supabase so Michele can publish them from the admin. Deliberately empty here: this repository is public, and
 * partner names ship only after consent is recorded. Seed rows are kept
 * out of git in private/seed/data.with-rows.ts.
 */
const resources: Resource[] = [];

const published = <T extends { consentReceivedAt: string | null }>(rows: T[]) =>
  rows.filter((r) => Boolean(r.consentReceivedAt));

/** Only organizations with a consent date are ever returned. */
export async function getOrganizations(region?: Region): Promise<Organization[]> {
  const rows = published(organizations).filter((o) => !region || o.region === region);
  return rows.sort((a, b) => a.name.localeCompare(b.name));
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
  return published(portfolio).sort((a, b) => a.name.localeCompare(b.name));
}

/** Undated events sort last; past events are not returned. */
export async function getEvents(now = new Date()): Promise<Event[]> {
  const today = now.toISOString().slice(0, 10);
  return events
    .filter((e) => !e.date || e.date >= today)
    .sort((a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999'));
}

export async function getResources(): Promise<Resource[]> {
  return resources;
}

export function formatEventDate(date: string | null): string {
  if (!date) return 'Date to be set';
  return new Date(date + 'T12:00:00Z').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  });
}
