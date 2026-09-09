import { z } from 'zod';

/**
 * One schema per form, imported by both the page (client) and the route
 * handler (server). Nothing validates in only one of the two places.
 *
 * These are pre-qualification gates. Anything internal — exclusion screens,
 * giving levels, the IRS 4944 PRI test, impact stress tests, reference checks,
 * the five-pillar scoring rubric — has no field here and must not be added.
 */

const required = (label: string) => z.string().trim().min(1, label + ' is required.');
const email = z.string().trim().min(1, 'An email address is required.').email('That does not look like an email address.');

/** Bots fill hidden inputs. Humans never see this one. */
const honeypot = z.string().max(0, 'This field must be left empty.').optional();

export const LEADERSHIP_BACKGROUND = ['poc-led', 'women-led', 'neither'] as const;
export const FAITH_ALIGNMENT = ['faith-led', 'faith-integrated', 'none'] as const;
export const GEOGRAPHY = ['charlotte-nc', 'east-africa', 'us', 'international'] as const;
export const POPULATIONS = ['women', 'people-of-colour', 'blind-or-visually-impaired', 'children', 'marginalized-communities'] as const;
export const LEVERS = ['scholarships', 'empowerment', 'capacity'] as const;
export const ORG_CHARACTER = ['grassroots', 'institutional'] as const;

export const grantApplicationSchema = z.object({
  organizationName: required('Organization name'),
  primaryContact: required('A primary contact'),
  email,
  irsStatus: z.enum(['501c3', 'fiscally-sponsored', 'other'], { errorMap: () => ({ message: 'Select your tax status.' }) }),
  ein: required('An EIN'),
  boardComposition: required('A description of your board and senior leadership'),
  leadershipBackground: z.enum(LEADERSHIP_BACKGROUND, { errorMap: () => ({ message: 'Select the option that fits best.' }) }),
  faithAlignment: z.enum(FAITH_ALIGNMENT, { errorMap: () => ({ message: 'Select one.' }) }),
  geography: z.array(z.enum(GEOGRAPHY)).min(1, 'Select at least one geography.'),
  populations: z.array(z.enum(POPULATIONS)).min(1, 'Select at least one population.'),
  leadershipPathways: required('A description of how the work expands leadership pathways'),
  lever: z.enum(LEVERS, { errorMap: () => ({ message: 'Select the closest fit.' }) }),
  budgetSize: required('An annual budget figure'),
  orgCharacter: z.enum(ORG_CHARACTER, { errorMap: () => ({ message: 'Select one.' }) }),
  requestAmount: required('A requested amount'),
  requestPurpose: required('A purpose for the request'),
  requestTiming: required('Timing for the request'),
  firstGift: z.enum(['yes', 'no'], { errorMap: () => ({ message: 'Let us know whether this would be a first gift.' }) }),
  website: honeypot
});

export type GrantApplication = z.infer<typeof grantApplicationSchema>;

export const RETURN_TIERS = ['market-or-above', 'below-market', 'angel-pri'] as const;
export const INVESTMENT_LEADERSHIP = ['poc-led', 'women-led', 'faith-led'] as const;
export const REDEMPTIVE_POINTS = ['exploitative', 'ethical', 'redemptive'] as const;

export const investmentApplicationSchema = z.object({
  entityName: required('A company or fund name'),
  primaryContact: required('A primary contact'),
  email,
  stage: required('Your stage'),
  revenue: required('Trailing revenue, even if approximate'),
  postRevenue: z.enum(['yes', 'no'], { errorMap: () => ({ message: 'Let us know whether you are post-revenue.' }) }),
  returnTier: z.enum(RETURN_TIERS, { errorMap: () => ({ message: 'Select the tier you are raising into.' }) }),
  personalCapital: required('The amount of your own capital in the deal'),
  institutionalCoInvestors: required('Institutional co-investors, or "none"'),
  communityCoInvestors: required('Community or local co-investors, or "none"'),
  leadership: z.array(z.enum(INVESTMENT_LEADERSHIP)).optional().default([]),
  distributionMechanism: required('A distribution mechanism'),
  pathToReturn: required('A path to returning capital'),
  structure: required('Your legal structure'),
  domicile: required('A domicile'),
  redemptiveStrategy: z.enum(REDEMPTIVE_POINTS, { errorMap: () => ({ message: 'Place your strategy on the spectrum.' }) }),
  redemptiveOperations: z.enum(REDEMPTIVE_POINTS, { errorMap: () => ({ message: 'Place your operations on the spectrum.' }) }),
  redemptiveLeadership: z.enum(REDEMPTIVE_POINTS, { errorMap: () => ({ message: 'Place your leadership on the spectrum.' }) }),
  redemptiveNotes: required('A few words on why you placed yourself there'),
  impactWhoBenefits: required('Who benefits'),
  impactEvidence: required('How the impact is evidenced'),
  impactBeneficiaryVoice: required('What beneficiaries themselves would say'),
  website: honeypot
});

export type InvestmentApplication = z.infer<typeof investmentApplicationSchema>;

/**
 * The changemaker's own profile, filled in by the person it describes.
 *
 * This is the mechanism behind the consent rule: the bio arrives in their own
 * words, and consent is a field they tick rather than something recorded on
 * their behalf. A submission lands unpublished — consent lets it render, staff
 * decide when it does.
 *
 * Note what is absent, and keep it absent: no demographics, no faith
 * alignment, no relationship to a grant or a holding. This describes a person
 * as they wish to be described, nothing more.
 */
export const PHOTO_MAX_BYTES = 4 * 1024 * 1024;
export const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

const optionalText = (max: number, label: string) =>
  z.string().trim().max(max, `${label} is too long.`).optional().default('');

export const profileSubmissionSchema = z.object({
  name: required('Your name'),
  email,
  role: optionalText(120, 'That line'),
  bio: z
    .string()
    .trim()
    .min(1, 'A short description is required.')
    .max(600, 'Please keep this to about three sentences — 600 characters or fewer.'),
  affiliation: optionalText(160, 'The organization name'),
  affiliationUrl: z
    .union([z.string().trim().url('That does not look like a web address.'), z.literal('')])
    .optional()
    .default(''),
  photoAlt: optionalText(200, 'The photo description'),
  consent: z.literal('yes', {
    errorMap: () => ({ message: 'We cannot publish anything about you without this.' })
  }),
  website: honeypot
});

export type ProfileSubmission = z.infer<typeof profileSubmissionSchema>;

/** Shape returned by the route handlers. */
export type ApplyResponse =
  | { ok: true }
  | { ok: false; reason: 'validation'; fieldErrors: Record<string, string[]> }
  | { ok: false; reason: 'server' };
