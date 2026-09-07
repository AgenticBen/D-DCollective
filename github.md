repo: AgenticBen/D-DCollective
branch: claude/push-artifact-repo-fn0j5x
path: website-content-brief.html

## Last sync
date: 2026-09-07T21:08:33Z

### Updated in this project
- Tokens lifted verbatim from the content brief's stylesheet (teals, neutrals, mist, hairline, gradient, caution).
- Logo palette added from the artwork the user supplied directly (#A4DBDA / #67AFB7).
- Recreated the brief as a UI kit surface: `ui_kits/internal-brief/`.
- Derived the public website kit from the brief's proposed site structure: `ui_kits/website/`.

## Screen map
| Screen | Built from |
| --- | --- |
| ui_kits/internal-brief/index.html | website-content-brief.html (full document) |
| ui_kits/website/* | website-content-brief.html (site structure + copy, §1–§5) |
| tokens/*.css | website-content-brief.html (`<style>` block) |
