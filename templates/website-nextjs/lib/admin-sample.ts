/**
 * Sample submissions so the admin has something to lay out against.
 *
 * The names are invented. Real applicants must never be hard-coded here — this
 * repository is public. TODO(supabase): replace with a server-side select from
 * grant_submissions and investment_submissions using the service-role key.
 *
 * Note what is absent: leadership demographics and faith alignment are asked on
 * the public forms and stored, but they are screening taxonomy and are not
 * surfaced here. The scoring rubric, exclusion screens, the 4944 PRI test and
 * reference checks stay in the diligence system entirely.
 */

export type SubmissionForm = 'Grant' | 'Investment';
export type SubmissionStatus = 'new' | 'reviewing' | 'advanced' | 'declined';

export interface Submission {
  id: string;
  form: SubmissionForm;
  name: string;
  contact: string;
  received: string;
  geography: string;
  note: string;
  status: SubmissionStatus;
  /** Grants only. A non-diverse board or senior team is a hard fail. */
  diverseBoard?: boolean;
  ask?: string;
  /** Investments only. */
  tier?: string;
  postRevenue?: boolean;
  /** The highest-weight investment signal. 'No' is near-disqualifying. */
  personalCapital?: string;
}

export const submissions: Submission[] = [
  {
    id: 'G-104', form: 'Grant', name: 'Example Academy', contact: 'first@example.org',
    received: '2026-09-02', geography: 'Charlotte / NC', ask: '$25,000', diverseBoard: true,
    status: 'new', note: 'College access for first-generation students.'
  },
  {
    id: 'G-105', form: 'Grant', name: 'Second Example Trust', contact: 'second@example.org',
    received: '2026-09-03', geography: 'Charlotte / NC', ask: '$10,000', diverseBoard: true,
    status: 'reviewing', note: 'Job readiness for refugee women.'
  },
  {
    id: 'G-106', form: 'Grant', name: 'Third Example Foundation', contact: 'third@example.org',
    received: '2026-09-04', geography: 'International', ask: '$150,000', diverseBoard: false,
    status: 'new', note: 'Out of geography, and the board requirement is not met.'
  },
  {
    id: 'I-041', form: 'Investment', name: 'Example Health Co', contact: 'founders@example.com',
    received: '2026-09-01', geography: 'East Africa', tier: 'Angel / PRI',
    personalCapital: 'Yes — $60k', postRevenue: true, status: 'advanced',
    note: 'Founder capital in, post-revenue, distribution path defined.'
  },
  {
    id: 'I-042', form: 'Investment', name: 'Example Field Co', contact: 'ops@example.com',
    received: '2026-09-03', geography: 'Southern Africa', tier: 'Below market',
    personalCapital: 'Yes — undisclosed', postRevenue: true, status: 'reviewing',
    note: 'Asked for the amount; awaiting reply.'
  },
  {
    id: 'I-043', form: 'Investment', name: 'Fourth Example Labs', contact: 'ceo@example.com',
    received: '2026-09-05', geography: 'United States', tier: 'Market or above',
    personalCapital: 'No', postRevenue: false, status: 'new',
    note: 'Pre-revenue and no founder capital. Outside the tier.'
  }
];

/** Why a submission fails a hard gate, or null when it passes. */
export function gateFailure(s: Submission): string | null {
  if (s.form === 'Grant') {
    return s.diverseBoard === false ? 'No diverse board or senior leadership' : null;
  }
  if (s.postRevenue === false) return 'Pre-revenue, outside the Angel / PRI tier';
  if (s.personalCapital === 'No') return 'No founder or GP capital invested';
  return null;
}

export async function getSubmissions(): Promise<Submission[]> {
  // TODO(supabase): server-side select, ordered by received desc.
  return submissions;
}
