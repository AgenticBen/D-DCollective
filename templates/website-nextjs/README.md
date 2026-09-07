# D+D Collective — website, wave 1

Next.js (App Router) + TypeScript + Tailwind. Two pages built: `/` and `/mission`, plus the shared shell.

`preview/index.html` and `preview/mission.html` are static, dependency-free renderings of the same two
pages, for looking at the design without installing anything. They mirror `app/globals.css`; the Next app is
the source of truth.

---

## Design plan

### Colour — six tokens, one hue

Declared once in `app/globals.css` under `:root`, surfaced to Tailwind as named colours in
`tailwind.config.ts`. Swapping the client's logo suite is an edit to six lines.

| Token | Value | Role |
| --- | --- | --- |
| `--ink` | `#12211F` | Text, and the ground of the vision spread. A green-black, not pure black: it sits under the teal instead of fighting it. |
| `--paper` | `#FFFFFF` | The default ground. Deliberately white, not cream. |
| `--field` | `#EDF3F2` | The one alternate light surface, held in reserve for later pages. |
| `--teal` | `#67AFB7` | Sampled from the client's existing logo artwork. Rules, the quote bar, focus on dark grounds. |
| `--teal-ink` | `#23646E` | The same hue darkened until it carries 16px type and links on white at ~6:1. |
| `--rule` | `#C9D9D8` | Hairline. The only structural device in the system. |

Reasoning: the client already has a teal identity, so the palette is *derived* rather than invented — two
tints of one measured hue plus an ink. One hue is also what keeps the vision spread loud: when nothing else
on the site is coloured, an ink field with white serif type at 3.5rem is the loudest thing available without
raising the volume anywhere else. No cream, no clay, no second accent.

### Type — two families, sharply divided by job

- **Newsreader** (300/400, real italics) — the *voice*. Used only for the vision paragraph, page titles,
  pathway verbs, and value terms. Literary rather than institutional; at 300 weight and large sizes it reads
  as writing, not branding.
- **DM Sans** (400/500) — the *interface and body*. Already the family in the client's internal documents,
  so this keeps continuity with the brand system. Body 17px/1.65, measure capped at 68ch.

Nothing is set in italic caps, nothing is tracked out, and there is no third size band between "reading" and
"the vision".

### Layout concept

One column of measured prose, cut by full-width hairlines. The three routes and the six values are *lists*
(`<ul>`, `<dl>`), so hanging terms in the serif do the work cards would otherwise do. Exactly one section
inverts to the ink ground.

```
/  (Home)
┌──────────────────────────────────────────────────────────┐
│ D+D Collective        Mission  How we work  Changemakers │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Expanding leadership                                    │  h1, Newsreader 300
│  pathways toward the                                     │  max 30ch
│  restoration of shalom.                                  │
│                                                          │
│  We are Eric and Michele Dudley. D+D Collective is …     │  68ch
│  Read the mission and values                             │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ We fund      │ Grants to organizations expanding …       │
│              │ What we look for in a grant               │
├──────────────────────────────────────────────────────────┤
│ We invest    │ Redemptive investments across funds …     │
│              │ See the portfolio and how it is read      │
├──────────────────────────────────────────────────────────┤
│ We convene   │ Dinners, book discussions, and small …    │
│              │ Ask to be invited                         │
├──────────────────────────────────────────────────────────┤
│  Whether this is a fit                                   │
│  ┌ Usually a fit ────────┬ Usually not ────────────────┐ │
│  │ Leaders from the …    │ A search for a large, fast… │ │
│  │ Work concentrated …   │ Pre-revenue companies …     │ │
│  └───────────────────────┴─────────────────────────────┘ │
│  Start a conversation                                    │
└──────────────────────────────────────────────────────────┘

/mission
┌──────────────────────────────────────────────────────────┐
│  Expanding leadership pathways …                         │
│  That sentence comes from the Praxis manifesto …         │
│  │ Shalom is a Hebrew word usually translated as peace…  │  teal hairline, left
├══════════════════════════════════════════════════════════┤
│██████████████████ ink ground ████████████████████████████│
│██                                                      ██│
│██  We envision a world where shalom is                 ██│  Newsreader 300
│██  restored and creative, redemptive                   ██│  clamp(1.9→3.5rem)
│██  innovation flourishes; where human                  ██│  max 34ch
│██  dignity and a diversity of thought …                ██│
│██                                                      ██│
│██  From the Praxis Capital Fellowship manifesto …      ██│
├══════════════════════════════════════════════════════════┤
│  Values                                                  │
│  Shalom            │ Holistic flourishing for …          │  <dl>, hanging terms
│  Dignity and …     │ Human dignity and a diversity …     │
│  Shared power      │ Mutual benefit is embraced …        │
│  …                                                       │
└──────────────────────────────────────────────────────────┘
```

### Three principles that make this specific

1. **One loud room.** The manifesto paragraph is the only element on the entire site allowed display scale
   and an inverted ground. Everything else — including the homepage h1 — stays a step below it. That
   hierarchy is the design; it is also why the site needs no photography.
2. **Lists, not cards.** Every group of things is a semantic list with a hairline, so terms hang in the serif
   and definitions sit in the sans. It reads as a document rather than a product page, and it is the reason
   the screen-reader experience is good by construction rather than by retrofit.
3. **The site is allowed to turn you away.** "Usually not" is a first-class column on the homepage, not a
   line of small print. Given that every visitor was sent here personally by Michele, the most useful thing
   the page can do in 90 seconds is let some of them leave.

### Self-critique of the plan, and what changed

Reviewed against "what would I produce for any nonprofit":

- **Three routes as three equal columns** was the default. Cut — they are now a stacked list with hairlines,
  which also reads better on a phone and puts the verbs in a vertical rhythm.
- **Values as a six-up card grid** was the default. Cut — definition list with hanging terms.
- **Serif display + warm off-white ground** was drifting toward the exact idiom to avoid. Ground held at pure
  white, and the alternate surface is a cool teal wash, not cream.
- **Eyebrow labels, interpunct metadata, and 01/02/03 numbering** are all habits of the client's *own*
  internal documents and of the design system in this project. They are excluded here on purpose. This is a
  real divergence from `readme.md` in the design-system root and should be a conscious decision, not a drift.
- **A hero image slot under the h1** was in the first sketch. Cut — with no photography at launch it would
  have been a grey rectangle, and once it exists it becomes obligatory.
- **"Read more →"** on every link. Cut; link text is a full phrase and carries no arrow.
- **Impact numbers.** Never included, per the brief, and the data layer has no counter type to tempt anyone.

---

## Structure

```
app/
  layout.tsx        shell, fonts, noindex metadata, skip link, landmarks
  globals.css       the six colour tokens, base type, focus, reduced-motion
  page.tsx                          /
  mission/page.tsx                  /mission
  how-we-work/page.tsx              /how-we-work
  changemakers/page.tsx             /changemakers
  changemakers/portfolio/page.tsx   /changemakers/portfolio
  gather/page.tsx                   /gather
  about/page.tsx                    /about
components/
  site-nav.tsx      header + primary nav
  site-footer.tsx   footer + secondary nav
  pathways.tsx      the three routes, as a list
  values-list.tsx   term + gloss definition list (values, levers, practices)
  entry-list.tsx    the same list with a term note, optional link, optional logo
  vision-statement.tsx  the one loud room
content/
  home.mdx, mission.mdx, how-we-work.mdx, changemakers.mdx,
  portfolio.mdx, gather.mdx, about.mdx
lib/
  data.ts           typed mock data + async accessors (Supabase swap point)
  flags.ts          undecided publishing questions, currently one
public/robots.txt   Disallow: /
next.config.js      MDX + X-Robots-Tag: noindex, nofollow
preview/            static HTML rendering of all seven pages
```

## Content pages, wave 2

All five reuse the existing tokens and the two list components. No new pattern was introduced: `ValuesList`
carries the levers and practices, and `EntryList` is the same hairline definition list with room for a small
note under the term, an optional outbound link, and an optional partner-supplied logo.

- **/how-we-work** — "What we fund" (four levers) and "How we work" (four practices), both as definition
  lists. No numbered markers: the source deck's 01–04 are categories, so they read as terms.
- **/changemakers** — grouped by geography, driven by `getOrganizationsByRegion()`. Entries render only when
  `consentReceivedAt` holds a date; two records in the mock data are deliberately left null so you can see
  the filter working. Two organizations sit in the data without appearing on the page.
- **/changemakers/portfolio** — plain-English definition of redemptive investing at the top, then the
  holdings. `returnPosture` is in the data and hidden behind `flags.showReturnPosture`, default `false`.
- **/gather** — events then resources. The empty state is an invitation with a teal rule, not a blank; it
  fires whenever `getEvents()` returns nothing, and past-dated events drop out automatically.
- **/about** — three paragraphs, then the credibility markers as a plain hairline list.

### What never renders

The internal screening taxonomy has **no field in the public data layer at all** — no leadership
demographics, no faith alignment, no giving level, no amounts. Filtering those at the component layer would
have been one `.map` away from a leak, so `Organization` and `PortfolioHolding` simply do not carry them.
When this moves to Supabase, select the columns typed here rather than `select('*')`.

Filenames are kebab-case so the design-system compiler in this project does not try to bundle the Next
components as design-system primitives.

### noindex, three ways

1. `metadata.robots = { index: false, follow: false }` in `app/layout.tsx`
2. `public/robots.txt` — `User-agent: * / Disallow: /`
3. `X-Robots-Tag: noindex, nofollow` on `/:path*` via `headers()` in `next.config.js`

### Data layer

`lib/data.ts` exports `Partner`, `PortfolioHolding`, `Gathering`, `Resource`, `Scholar` and async accessors
(`getPartners`, `getPortfolio`, `getGatherings`, `getResources`, `getScholars`). Every record carries a
`consented` flag and the public accessors filter on it, so an unapproved partner cannot reach a page even by
accident; `getAllPartnersForReview()` is the one accessor that returns everything, for an internal view.
`Gathering.invitationOnly` is typed as the literal `true` — there is no code path that produces a public RSVP.
Swapping to Supabase means replacing the bodies of those functions and nothing else.

## Not built yet

`/how-we-work`, `/changemakers` (partners · portfolio · scholars), `/gather`, `/apply`, `/about`. Nav and
footer link to them already.

## Install

```bash
cd site && npm install && npm run dev
```
