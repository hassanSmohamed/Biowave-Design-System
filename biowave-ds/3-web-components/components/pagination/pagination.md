# Pagination · ترقيم الصفحات — Web

> **One file for Pagination on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web pagination`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Pagination · ترقيم الصفحات |
| Summary | Moves through the pages of a long list or table: previous, page numbers and next; the table form adds rows per page and the range shown. |
| Summary (ar) | التنقل بين صفحات قائمة أو جدول طويل: السابق وأرقام الصفحات والتالي؛ ونموذج الجدول يضيف عدد الصفوف في الصفحة والنطاق المعروض. |
| Parts | Container · previous · page item · ellipsis · next · rows per page · range |
| Parts (ar) | الحاوية · السابق · رقم الصفحة · علامة الحذف · التالي · عدد الصفوف · النطاق |
| Platform | Web · React + MUI |
| Built on | MUI `Pagination` (`renderItem` with Biowave page items and Icon buttons) and, for tables, a custom footer with the Biowave Select |
| Import | `import { Pagination, TablePagination } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Pagination` · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-11-13 |
| Plan | Finished |
| Code | Planned |
| Figma build | Built |
| Review | — |
| Source code | `src/components/pagination/` — not built yet (the Executor creates it) |
| Tokens | No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly |
| Contracts | [`pagination-contract.md`](pagination-contract.md) · [`figma-pagination-contract.md`](figma-pagination-contract.md) — generated, never edited |
| Docs page | [`pagination.html`](pagination.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web and Tablet except **A8** (checked by `npm run docs:check`). Mobile has no Pagination: lists load more as you scroll, with a "Load more" button fallback (NV-08).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/pagination/pagination.md#b--spec) · [Tablet](../../../4-tablet-components/components/pagination/pagination.md#b--spec) · Mobile — none (load more, NV-08) |
| Figma | `↳ Pagination` in **Biowave DS — Web Components** · **Tablet Components** |
| Version | 1.0 · 2026-11-13 |

### A1 Overview

Pagination splits a long list or table into pages and lets the user move between them. The numbered form shows previous, page numbers and next; the table form adds how many rows a page shows and which rows are on screen ("1–20 of 240"); the compact form fits narrow spaces ("Page 3 of 12").

### A2 Anatomy

```
Numbered      ‹   1   2  [3]  4   5   …   12   ›
              ①   ②       ③           ④         ⑤
Table         Rows per page [20 ▾]   1–20 of 240          ‹ 1 2 [3] 4 5 … 12 ›
                    ⑥                    ⑦
Compact       ‹   Page 3 of 12   ›
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `previous` | Yes | Icon button, goes one page back; disabled on the first page |
| 2 | `page item` | Yes | A page number; goes to that page |
| 3 | `current` | Yes | The page on screen, selected |
| 4 | `ellipsis` | No | "…" for hidden page numbers; not interactive |
| 5 | `next` | Yes | Icon button, goes one page on; disabled on the last page |
| 6 | `rows per page` | Table | Select: 10 · 20 · 50 · 100 |
| 7 | `range` | Table | Which rows are shown: "1–20 of 240" |

### A3 Usage

**When to use**
- Tables and lists with more rows than fit, where the user needs to know where they are or jump to a page
- Table form under every data table that pages

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Feeds and Mobile lists | Load more as you scroll (NV-08) |
| Carousels and onboarding | Page control |
| Steps of a flow | Stepper |

### A4 Options

#### 4.1 `form`
| Value | Looks like | Pick it when |
|---|---|---|
| `numbered` | ‹ 1 2 3 … 12 › | **Default.** Lists and card grids |
| `table` | rows per page · range · numbers | Under data tables (Web) |
| `compact` | ‹ Page 3 of 12 › | Narrow spaces: Tablet portrait, side sheets |

**Combination rules**
- At most 7 page slots: first, last, the current page with one neighbour each side, and "…" for the gaps
- Changing rows per page goes back to page 1

### A5 States and behavior

| State | Part | What the user sees |
|---|---|---|
| Default | page item | Grey number |
| Hovered · Pressed | page item | Light / darker fill |
| Focused | page item | Focus ring |
| Selected | current | Brand number on the selected fill |
| Disabled | previous / next | Faded on the first / last page |

**Behavior rules**
- Moving to another page keeps the filters and the sort; the list scrolls to its top
- Arabic: previous is on the right and points right; numbers stay Western digits as in the rest of the product

### A6 Content

| Element | Rule | Example |
|---|---|---|
| range | "first–last of total" with an en dash | 1–20 of 240 |
| compact | "Page n of total" | Page 3 of 12 |
| rows per page | Label + Select | Rows per page |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| 1–20 of 240 | 1–20 من 240 | Showing 1 to 20 out of 240 entries |
| Page 3 of 12 | صفحة 3 من 12 | 3/12 |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Show where the user is (current page, range) | Show every page number of a long list |
| Keep the table form under the table, full width | Put pagination at the top and the bottom |
| Use the compact form when space is short | Wrap page numbers to two lines |

### A8 Platform notes — Web

| | Web |
|---|---|
| Forms | Numbered, Table, Compact |
| Size | Page items and Icon buttons `size-control-height-sm` |
| Keyboard | Tab through previous, page items, next; Enter / Space |

### A9 Accessibility (design)

- The current page is announced as the current page
- Previous and next have names ("Previous page", "Next page")
- The range text is announced when the page changes

### A10 Related components

- [Icon button](../icon-button/icon-button.md#a--guidelines) — previous and next
- Select — rows per page
- [Page control](../page-control/page-control.md#a--guidelines) — dots for carousels

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### Pagination
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `page` · `count` | `number` | ≥ 1 | — | ✓ | Current page · number of pages |
| `onChange` | `(page: number) => void` | | — | ✓ | |
| `form` | `'numbered' \| 'compact'` | | `'numbered'` | | |

#### TablePagination
| Prop | Type | Default | Description |
|---|---|---|---|
| `page` · `rowsPerPage` · `total` | `number` | — | |
| `rowsPerPageOptions` | `number[]` | `[10, 20, 50, 100]` | Select options |
| `onPageChange` · `onRowsPerPageChange` | functions | — | Changing rows goes back to page 1 |

**Invalid combinations** (`console.warn` in development):
| Combination | Fallback |
|---|---|
| `page` > `count` | `count` |

### B2 Dimensions

| Part | Property | Token |
|---|---|---|
| container | gap | `spacing-xs` |
| previous · next | | Icon button `sm`, `chevron_left` · `chevron_right` |
| page item · ellipsis | height · min width · padding-inline · radius | `size-control-height-sm` · `size-control-height-sm` · `spacing-sm` · `radius-md` |
| page item · range · compact text | text style | `label-md` |
| table form | gap between groups · width | `spacing-3xl` · fills the table width, groups at both ends |
| rows per page | | Select `sm`, width hugs the value |
| focus ring | | `border-width-focus` · `color-border-focus` · `radius-md` |

### B3 Tokens by part and state

Every value is a semantic token; there is no `pagination.tokens.json`. Icon button and Select carry their own.

| Part | Property | Default | Hovered | Pressed | Selected |
|---|---|---|---|---|---|
| page item | fill | `color-background-transparent-default` | `color-background-transparent-hovered` | `color-background-transparent-pressed` | `color-background-selected-default` |
| page item | text | `color-text-subtle` | `color-text-default` | `color-text-default` | `color-text-role-brand` |
| ellipsis | text | `color-text-subtlest` | — | — | — |
| range · compact · rows label | text | `color-text-subtle` | — | — | — |

Contrast (light): `color-text-subtle` on `color-surface-default` 14.55:1 · selected `color-text-role-brand` on `color-background-selected-default` 12.54:1. Dark theme: same tokens.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hovered / Pressed | pointer / tap | fill, text | `motion-duration-sm` | `motion-easing-standard` |
| Page n → m | select | selection moves; no slide | — | — |

Reduced motion: no change (nothing slides).

### B5 RTL

| Part | In RTL |
|---|---|
| order | Reverses: previous on the right, numbers read right to left, next on the left |
| previous · next | Glyphs mirror (previous points right) |
| digits | Western digits, as in the product |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | `<nav aria-label="Pagination">`; current page `aria-current="page"` |
| Names | "Previous page", "Next page", "Page 4" |
| Live range | `aria-live="polite"` on the range text |
| Disabled | Previous on page 1 and next on the last page are disabled, not hidden |

### B7 Examples

See the docs pages 03 and 07.

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: B2–B3 tokens
- [ ] At most 7 page slots with "…" for the gaps
- [ ] Previous / next disabled on the first / last page
- [ ] RTL reverses the order and mirrors the chevrons
- [ ] No raw values

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `pagination-contract.md`.

> Written by the Planner (Claude). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · 2026-11-13 |

### C1 Goal

The Web Pagination matches B1–B6 and passes B9 and C6.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- The table itself
- Page control, Stepper

### C3 Approach

- **Base:** MUI `Pagination` with `renderItem` → Biowave page item / Icon buttons; `siblingCount={1}`, `boundaryCount={1}`.
- **Table:** custom footer: Biowave Select (rows), range text, Pagination.

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
3-web-components/src/components/pagination/Pagination.tsx · TablePagination.tsx · Pagination.test.tsx · index.ts   new
3-web-components/src/index.ts · README.md · CHANGELOG.md   change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Page-slot algorithm: 1 … 4 [5] 6 … 12 for page 5 of 12
- [ ] Earlier tests still pass

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6 (focus in, trap, return; dismiss rules)
- [ ] AC-5 Tests in B9 and C6 exist and pass; `npm run test:web`, `npm run typecheck`, `npm run docs:check` pass
- [ ] AC-6 Exported from the package entry file; README status updated; nothing outside C5 changed

---

### C8 Execution log (filled by the Executor)

| Field | Value |
|---|---|
| Agent | |
| Date | |
| Files changed | |

**Deviations from the plan or spec:**
- none

**Questions for the Planner:**
- none

---

## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-pagination-contract.md`.

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Pagination |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Pagination` › sections `Pagination` and `Pagination — Documentation` |
| Mode | **Create new.** Legacy `↳ Pagination` (page frames only) is the layout source; it stays untouched |
| Depends on | Icon Button and Select sets in this file |
| Plan version | 1 · 2026-11-13 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `figma-read-tokens.js` lint must report 0.
- Nested parts are instances of the sets already in this file (Button, Icon Button, Divider) — never detached, never redrawn.

### D2 Component structure

```
❖ Pagination                     ← set: Form = Numbered · Table · Compact × Language = EN · AR
  └─ ❖ .Page item                 ← private set: State = Default · Hovered · Pressed · Focused · Selected · Ellipsis (TEXT Label)
```

### D3 Layer tree and auto layout

```
Pagination (Numbered)      ↔ gap spacing/xs · centred
├── ◇ Icon Button          sm · chevron_left (RTL: chevron_right)
├── ◇ .Page item × 7       ↔ height size/control/height/sm · min width size/control/height/sm · padding-inline spacing/sm · radius/md · T label/md
└── ◇ Icon Button          chevron_right
Pagination (Table)        ↔ width 960 sample · space-between · [T "Rows per page" + ◇ Select sm] [T "1–20 of 240"] [Numbered]
Pagination (Compact)      ↔ gap spacing/md · Icon Button · T "Page 3 of 12" label/md · Icon Button
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Form` | VARIANT | Numbered · Table · Compact | `Numbered` | component / `form` | |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `.Page item` › `Label` | TEXT | | `1` | page number | |
| `.Page item` › `State` | VARIANT | Default · Hovered · Pressed · Focused · Selected · Ellipsis | Default | interaction · `page` | |

### D5 Variants to generate

- `Pagination`: Form × Language = **6**; `.Page item`: **6**

### D6 States, interactions and motion

No prototype interactions on the set. Hover, press, focus and the page change are shown on doc page 04 with B4 timings written next to them.

### D7 RTL

`Language=AR` variants: Typography mode `Web · AR`, auto layout direction from the text, layout per B5; Arabic copy from A6. Previous / next and the page items in reverse order; previous uses `chevron_right`, next `chevron_left`; digits stay Western.

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Pagination — Documentation`, frames `Pagination / 00 Component sheet` … `Pagination / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Pagination:
- 01: table form under a data table in a Desktop frame
- 03: numbered · table · compact · first page (previous disabled)
- 07: Desktop and Web narrow (compact)
- 05 Usage: the A7 pairs, built with live instances

Component description: "Moves through the pages of a long list or table: previous, page numbers and next; the table form adds rows per page and the range shown. Spec: 3-web-components/components/pagination/pagination.md".

### D9 Code Connect

- File: `3-web-components/src/components/pagination/Pagination.figma.tsx`
- Mapping: D4. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Pagination`, private components and layer names match D2–D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant count = D5
- [ ] F-AC-4 Zero raw values: fills, radius, padding, gaps, widths, text and effects bound (lint 0)
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only)
- [ ] F-AC-6 AR variants per D7; Arabic copy fits without truncation
- [ ] F-AC-7 Component description filled; no prototype interactions on the set
- [ ] F-AC-8 Values match B2–B3 one by one (redline check)
- [ ] F-AC-9 Every documentation page in D8 exists, in order, built only from Doc Kit components with live instances

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | Claude · build · rtl · qa · document |
| Date | 2026-11-13 |
| Node IDs | page `658:2` · `Pagination` `658:822` (6) · `.Page item` `658:16` (6) · docs `659:3009` · card row `648:9907` |
| QA report | Unbound fills, strokes, padding and gaps: 0 · no local styles · page Typography mode set to the platform |

**Deviations:**
- Previous / next are the Icon Button with the Material Symbols chevron swapped in; disabled (first / last page) uses the Icon Button's exposed `Appearance › State = disabled`, shown on doc page 03 ("First page")
- Table form: rows per page is the `.Select _en` / `_ar` (`sm`, 96 wide)

**Questions for the Planner:**
- none

---

## E · Review

> One block per review round, newest first.

### E1 Summary

| Round | Date | Code verdict | Figma verdict |
|---|---|---|---|
| — | — | not reviewed | not reviewed |

---

## F · Changelog

> Changes to this component on this platform. Every entry also gets one line in the root `CHANGELOG.md`.

### F0 Changes from previous version

None — first version.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-11-13 | Initial (navigation brief, NV-01 … NV-13) | — | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-11-13 | Initial | No | — |
