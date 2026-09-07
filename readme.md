# D+D Collective — Design System

D+D Collective is an impact-investing foundation working with changemakers: leaders, scholars and
organizations from communities that have been marginalized, overlooked, or underestimated. Its work runs on
four levers — scholarships and educational support, empowerment, redemptive investing, and activation of
capital — across Charlotte / North Carolina, East Africa, and a national/global partner network. Grants and
investments are governed by explicit screens (a diverse board or leadership team is a hard requirement;
founder personal capital is the highest-weight investment signal), and the investment portfolio is read
through the Praxis redemptive framework.

The mission line the organization uses is: *"Expanding leadership pathways toward the restoration of shalom."*

## Sources this system was built from

| Source | What came from it |
| --- | --- |
| `AgenticBen/D-DCollective`, branch `claude/push-artifact-repo-fn0j5x` — `website-content-brief.html` (https://github.com/AgenticBen/D-DCollective) | The entire colour, type, spacing, radius and layout vocabulary, plus all verbatim copy. This is the only file in the repo and the only existing designed artifact. |
| Logo artwork supplied directly by the user (four PNG screenshots) | `assets/logo-lockup.png`, `logo-lockup-dark.png`, `logo-mark.png`, `logo-mark-dark.png`, and the two knocked-out transparent variants. The two authoritative brand teals were sampled from this artwork. |
| Website content brief text (pasted in chat) | Mission/vision/values wording, Praxis levers and practices, partner and portfolio tables, both screening forms, proposed site structure. |

Readers with access to the repository should read `website-content-brief.html` directly — it is short, and
every value in `tokens/` traces to its `<style>` block.

**Missing sources, flagged.** The uploaded `.ai` / `.eps` logo files never landed in the project filesystem
(`uploads/` was empty), so the logo assets here are trimmed PNG screenshots, not vector. No brand guide
document, photography library, or icon set was provided. There is no production website yet.

## Content fundamentals

The voice is that of a foundation run by two people who fund through relationship. It is plain, specific,
and unusually candid about constraints.

- **Sentence case everywhere.** Headings read like sentences: "Mission, vision, and values", "What we screen
  for — two separate forms", "Changemakers to feature". Title Case appears only in proper nouns.
- **"We", never "I".** Institutional first person: "We infuse racial, gender and disability justice into the
  following", "We envision a world where shalom is restored". The reader is addressed as "you" only inside
  forms and invitations ("what you're curious about").
- **Say the constraint out loud.** Copy names its own limits rather than smoothing them: "a hard requirement,
  not a preference"; "absence is near-disqualifying"; "Both forms are gates before a conversation, not full
  diligence"; "no dollar figures either way". This is the single most distinctive habit of the brand's writing
  and should be preserved in any new copy.
- **Correct rather than soften.** "Human dignity and a diversity of thought and experience are treasured,
  **not tolerated**." Precision about the difference is the point.
- **Compliance is stated, not hidden.** "4945(g) approval is still pending, and no scholarships should be
  awarded until it is received." Advisory language gets its own visual container (see `Note`).
- **Interpuncts carry structure.** Metadata and taxonomies are joined with ` · `: "Internal · Meeting prep",
  "POC · Male", "Direct · PRI", "Impact 35 · Business 35 · Risk 10 · Leadership 10 · Spiritual 10". Numbered
  items use the same separator: "01 · Scholarships & educational support".
- **Em dashes for the gloss.** A heading is often followed by a small dash-led clarifier: "Operational
  practices — how we work", "Leadership intent — recommend keeping internal".
- **Vocabulary to keep.** shalom · redemptive · changemakers · leadership pathways · levers · convene ·
  posture (concessionary / at market / above market) · faith-led vs. faith-integrated. "Redemptive investing"
  stays scoped to the investment portfolio and is not used as a general descriptor.
- **Vocabulary to avoid.** Beneficiary-as-object language, "the underprivileged", growth-marketing verbs
  ("unlock", "supercharge"), exclamation marks, and any phrasing that implies an open application while
  scholarship approval is pending.
- **No emoji.** None appear in any source, and none should be added.
- **Consent is a content rule.** No named partner, scholar or grantee copy ships without their approval; the
  Scholars surface is deliberately empty rather than populated with placeholder people.

## Visual foundations

**Overall character.** Quiet editorial document, not a marketing site. White page, one teal hue, generous
measure limits, hairline borders. The system is *border-led*: structure comes from 1px lines and filled mist
blocks, almost never from shadow.

**Colour.** Two palettes, kept distinct on purpose:
- *Logo teals* (authoritative, sampled from the artwork): `#A4DBDA` light, `#67AFB7` deep, `#9FE4E0` on dark
  grounds. Use for the mark, large fills, and `--grad-brand`.
- *Interface teals* (from the brief stylesheet): `#4BBFBF` `--teal` for borders and pill outlines, `#3BADB5`
  `--teal-mid` for hover, `#2A8FA8` `--teal-deep` for accent **text** and primary buttons — the logo teals are
  too light to carry small type on white.
Neutrals are three values only: `#0A0A0A` ink, `#2D3748` slate (body), `#5B6B78` muted (ledes, captions,
table headers). Surfaces: `#FFFFFF` page and card, `#F0F8F8` mist (the teal-tinted fill), `#D6E6E8` hairline.
The only non-teal accent in the entire system is the amber caution set (`#FFF6E8` / `#F2D29B` / `#8A5A00`).
A full dark theme exists (`[data-theme="dark"]`, plus `prefers-color-scheme`): near-black `#0A0A0A` page,
`#131F22` card, `#22383C` line, `#F2F6F7` ink.

**Gradient.** One gradient, used as an ornament rather than a background: `linear-gradient(135deg,#4BCECE,#2A8FA8)`.
It appears as the 56×2px section rule, as the small circular mark placeholder, and nowhere else. Never a
full-bleed gradient, never behind text.

**Type.** DM Sans for everything; DM Mono for metadata, dates, token values and rubric strings. Weights are
300 (pull quotes only), 400 body, 500 labels/pills/nav, 600 all headings. Sizes as authored: h1
`clamp(30px,4vw,44px)` at −0.02em, h2 26px at −0.015em, h3 17px, body 16px/1.6, tiles and inputs 15px, tables
14.5px, nav and metadata 14px, eyebrows 12px at 0.08em uppercase, pills 11.5px at 0.03em. Prose is capped at
68ch, ledes at 66ch. Headings use `text-wrap: balance`.

**Spacing.** Authored values, not a 4/8 grid — 6, 9, 14, 18 and 22 all appear and should be copied exactly:
tile padding `16px 18px`, card padding `20px 22px`, table cells `9px 12px` (headers `10px 12px`), grid gap 14px,
column gap 18px, section gap 56px, page container 1040px max with `40px 28px 80px` padding.

**Radii.** 10px notes, 12px tiles and table panels, 14px cards, 2px the gradient rule, 999px pills and buttons,
50% the circular mark. Nothing is square-cornered except the rule ends.

**Borders and shadows.** `1px solid #D6E6E8` is the workhorse. A 3px left teal bar marks pull quotes. Shadows
are effectively absent — `--shadow-overlay` exists for modals and `--shadow-focus` for focus rings, and that is
the whole shadow system. No inner shadows, no layered elevation, no protection gradients; captions and labels
sit on solid surfaces instead.

**Backgrounds and imagery.** No hero photography, illustration, pattern or texture exists in the sources. The
only "image" in the system is the logo. Where imagery is eventually needed (changemaker portraits, scholar
profiles), it should be real supplied photography — warm, documentary, people-first, unfiltered — and this
system deliberately ships no stand-ins. Full-bleed sections are done with the mist fill plus a hairline, not
with images.

**Transparency and blur.** Neither appears in the sources. Do not add glassmorphism, backdrop blur, or
alpha-muted text; the one alpha value in the system is inside `--shadow-focus`.

**Animation.** The source has no animation at all beyond CSS colour transitions on links. Keep motion to
120–180ms colour/border transitions on `cubic-bezier(.2,0,.2,1)`. No entrance animations, no bounces, no
parallax, no scroll reveals.

**States.** Hover changes *colour*, not size or shadow: nav links and TOC links grow a teal underline, teal
text moves from `--teal-deep` toward `--teal-mid`, and choice rows take a teal border with a mist fill.
Press states darken; nothing scales or lifts. Focus uses `--shadow-focus` (a 3px teal-deep halo). Disabled is
0.45 opacity with `not-allowed`.

**Layout rules.** Single 1040px centred column for documents; the website kit widens only its mist hero band
to full bleed. Nothing is sticky or fixed — the masthead scrolls with the page. Tables scroll horizontally
inside their rounded frame rather than shrinking type. Grids are `repeat(auto-fit,minmax(…,1fr))` with the
minmax floor set per content type (220px value tiles, 280px levers, 300px cards).

**Cards, formally.** Two containers with opposite construction, and mixing them is the most common mistake:
a `Tile` is a mist fill with **no** border and 12px radius, for one short idea; a `Card` is a white surface
with a **hairline** border, 14px radius, 20/22 padding and no fill, for headed, list-bearing content.
Neither has a shadow.

## Iconography

**There is no icon system in the sources, and none has been invented here.** The content brief uses zero
icons: hierarchy comes from type weight, uppercase eyebrows, the gradient rule, interpuncts, and numeric
prefixes ("01 · ", "1 · "). Arrows in link text are the plain unicode characters `→` and `↑`. No icon font, no
sprite sheet, no SVG set, and no emoji appear anywhere.

Consequently:
- Prefer no icon. A label, a pill, or a number is the brand-correct move.
- Arrow affordances use the unicode `→` inside the link text, as in "Read the full vision →".
- If a project genuinely needs a glyph set (a settings surface, a data tool), **Lucide** via CDN
  (`https://unpkg.com/lucide-static`) is the recommended substitute — 1.5–2px stroke, round caps, geometric,
  which matches the hairline weight of the brand. **This is a substitution, not a brand asset**; flag it to
  the client and set stroke colour to `--teal-deep` or `--text-body`.
- Never rebuild the logo mark as an inline SVG or use it as an icon. Render `assets/logo-mark*.png`.

## Font substitutions to confirm

- **DM Sans / DM Mono** are loaded from Google Fonts, exactly as the source document does. No self-hosted
  binaries were provided, so `tokens/fonts.css` keeps the CDN `@import`. If D+D licenses specific webfonts,
  send the files and this becomes a `@font-face` block.
- **The logo wordmark** is set in a light geometric sans that is *not* DM Sans (rounder bowls, single-width
  strokes — Poppins/Century Gothic family). It has not been identified, and no attempt is made to typeset the
  wordmark in live type anywhere: the artwork is always rendered as an image. **Please confirm the wordmark
  typeface**, or supply vector logo files.

## Index

Root files:
- `readme.md` — this guide
- `SKILL.md` — Agent Skills wrapper, for use in Claude Code
- `github.md` — source repository association and screen map
- `styles.css` — the one stylesheet consumers link; `@import` list only
- `thumbnail.html` — homepage tile

Directories:
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `radii.css`, `effects.css`, `motion.css`, `fonts.css`
- `assets/` — `logo-lockup.png`, `logo-lockup-dark.png`, `logo-lockup-transparent.png`, `logo-mark.png`,
  `logo-mark-dark.png`, `logo-mark-transparent.png`
- `guidelines/` — 22 foundation specimen cards (Brand, Colors, Type, Spacing)
- `components/` — see below
- `ui_kits/website/` — five-screen click-through of the public site
- `ui_kits/internal-brief/` — recreation of the source briefing document
- `templates/website-nextjs/` — the production Next.js website (wave 1: `/` and `/mission`), with its own
  design plan in `templates/website-nextjs/README.md` and dependency-free page previews in
  `templates/website-nextjs/preview/`. It lives under `templates/` so the design-system compiler does not
  try to bundle Next.js components as brand primitives. **Note:** that site deliberately drops the eyebrow,
  interpunct and 01/02/03 habits documented above, at the client’s direction.

### Components

`components/brand/`
- **Logo** — the supplied artwork, lockup or mark, light or dark ground
- **Eyebrow** — uppercase teal kicker
- **GradientRule** — the 56×2px section ornament
- **SectionHeader** — eyebrow + heading + rule + lede

`components/content/`
- **Tile** — mist fill, teal key line, one short idea
- **Card** — hairline panel with heading, for lists and longer content
- **Quote** — light 18px manifesto language behind a teal bar
- **Note** — the amber advisory block
- **Pill** — taxonomy capsule (posture, faith alignment, leadership)
- **DataTable** — rounded hairline listing table

`components/forms/`
- **Button** — pill button, primary / secondary / ghost, three sizes
- **Field** — label + control + hint wrapper
- **Input** — single-line text entry (exports `inputSkin`)
- **Textarea** — narrative screening answers
- **Select** — fixed taxonomies matching Airtable single-selects
- **ChoiceGroup** — radio or checkbox set as selectable hairline rows

`components/navigation/`
- **SiteHeader** — logo + text nav masthead
- **TocNav** — inline numbered document contents
- **SiteFooter** — mist footer with logo, note and link columns

**Intentional additions.** The source is a document, not an application, so it defines no form controls or
site chrome. `Button`, `Field`, `Input`, `Textarea`, `Select`, `ChoiceGroup`, `SiteHeader` and `SiteFooter`
were authored to serve the two screening forms and the five-page site the brief specifies. They are built
strictly from the document's own borders, radii, type sizes and teals — no new visual ideas were introduced.
Everything else (`Logo`, `Eyebrow`, `GradientRule`, `SectionHeader`, `Tile`, `Card`, `Quote`, `Note`, `Pill`,
`DataTable`, `TocNav`) is a direct lift from the source document.
