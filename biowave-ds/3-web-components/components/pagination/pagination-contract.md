<!-- GENERATED from pagination.md @ 6b3a211812f34d0a — do not edit; change the source and run: npm run contract -- web pagination -->
# Pagination · ترقيم الصفحات — Web — code contract

> **Everything you need to build Pagination on Web, and nothing else.** Read this file only. Generated from [`pagination.md`](pagination.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](pagination.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Pagination · ترقيم الصفحات |
| Platform | Web · React + MUI |
| Built on | MUI `Pagination` (`renderItem` with Biowave page items and Icon buttons) and, for tables, a custom footer with the Biowave Select |
| Import | `import { Pagination, TablePagination } from '@biowave/web'` |
| Version | 1.0 · 2026-11-13 |
| Source code | `src/components/pagination/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`pagination.md`](pagination.md) @ `6b3a211812f34d0a` |

## 1. What it is

Pagination splits a long list or table into pages and lets the user move between them. The numbered form shows previous, page numbers and next; the table form adds how many rows a page shows and which rows are on screen ("1–20 of 240"); the compact form fits narrow spaces ("Page 3 of 12").

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `previous` | Yes | Icon button, goes one page back; disabled on the first page |
| 2 | `page item` | Yes | A page number; goes to that page |
| 3 | `current` | Yes | The page on screen, selected |
| 4 | `ellipsis` | No | "…" for hidden page numbers; not interactive |
| 5 | `next` | Yes | Icon button, goes one page on; disabled on the last page |
| 6 | `rows per page` | Table | Select: 10 · 20 · 50 · 100 |
| 7 | `range` | Table | Which rows are shown: "1–20 of 240" |

**Options** (names and values are the props in §2):

- 4.1 `form`

## 2. API

### Pagination
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `page` · `count` | `number` | ≥ 1 | — | ✓ | Current page · number of pages |
| `onChange` | `(page: number) => void` | | — | ✓ | |
| `form` | `'numbered' \| 'compact'` | | `'numbered'` | | |

### TablePagination
| Prop | Type | Default | Description |
|---|---|---|---|
| `page` · `rowsPerPage` · `total` | `number` | — | |
| `rowsPerPageOptions` | `number[]` | `[10, 20, 50, 100]` | Select options |
| `onPageChange` · `onRowsPerPageChange` | functions | — | Changing rows goes back to page 1 |

**Invalid combinations** (`console.warn` in development):
| Combination | Fallback |
|---|---|
| `page` > `count` | `count` |

## 3. Dimensions

| Part | Property | Token |
|---|---|---|
| container | gap | `spacing-xs` |
| previous · next | | Icon button `sm`, `chevron_left` · `chevron_right` |
| page item · ellipsis | height · min width · padding-inline · radius | `size-control-height-sm` · `size-control-height-sm` · `spacing-sm` · `radius-md` |
| page item · range · compact text | text style | `label-md` |
| table form | gap between groups · width | `spacing-3xl` · fills the table width, groups at both ends |
| rows per page | | Select `sm`, width hugs the value |
| focus ring | | `border-width-focus` · `color-border-focus` · `radius-md` |

## 4. Tokens by part and state

Every value is a semantic token; there is no `pagination.tokens.json`. Icon button and Select carry their own.

| Part | Property | Default | Hovered | Pressed | Selected |
|---|---|---|---|---|---|
| page item | fill | `color-background-transparent-default` | `color-background-transparent-hovered` | `color-background-transparent-pressed` | `color-background-selected-default` |
| page item | text | `color-text-subtle` | `color-text-default` | `color-text-default` | `color-text-role-brand` |
| ellipsis | text | `color-text-subtlest` | — | — | — |
| range · compact · rows label | text | `color-text-subtle` | — | — | — |

Contrast (light): `color-text-subtle` on `color-surface-default` 14.55:1 · selected `color-text-role-brand` on `color-background-selected-default` 12.54:1. Dark theme: same tokens.

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `border-width-focus` | `var(--bw-border-width-focus)` · `cssVars.border.width.focus` | 2 | 2 |
| `color-background-selected-default` | `var(--bw-color-background-selected-default)` · `cssVars.color.background.selected.default` | #E8ECF2 | #193351 |
| `color-background-transparent-default` | `var(--bw-color-background-transparent-default)` · `cssVars.color.background.transparent.default` | #54545400 | #54545400 |
| `color-background-transparent-hovered` | `var(--bw-color-background-transparent-hovered)` · `cssVars.color.background.transparent.hovered` | #5454541A | #54545466 |
| `color-background-transparent-pressed` | `var(--bw-color-background-transparent-pressed)` · `cssVars.color.background.transparent.pressed` | #54545433 | #54545499 |
| `color-border-focus` | `var(--bw-color-border-focus)` · `cssVars.color.border.focus` | #254471 | #90A3BC |
| `color-surface-default` | `var(--bw-color-surface-default)` · `cssVars.color.surface.default` | #FFFFFF | #141414 |
| `color-text-default` | `var(--bw-color-text-default)` · `cssVars.color.text.default` | #0A0A0A | #F7F7F7 |
| `color-text-role-brand` | `var(--bw-color-text-role-brand)` · `cssVars.color.text.role.brand` | #132843 | #BEC9D9 |
| `color-text-subtle` | `var(--bw-color-text-subtle)` · `cssVars.color.text.subtle` | #292929 | #DBDBDB |
| `color-text-subtlest` | `var(--bw-color-text-subtlest)` · `cssVars.color.text.subtlest` | #545454 | #BDBDBD |
| `motion-duration-sm` | `var(--bw-motion-duration-sm)` · `cssVars.motion.duration.sm` | 100 | 100 |
| `motion-easing-standard` | `var(--bw-motion-easing-standard)` · `cssVars.motion.easing.standard` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-md` | `var(--bw-radius-md)` · `cssVars.radius.md` | 8 | 8 |
| `size-control-height-sm` | `var(--bw-size-control-height-sm)` · `cssVars.size.control.height.sm` | 32 | 32 |
| `spacing-3xl` | `var(--bw-spacing-3xl)` · `cssVars.spacing.3xl` | 24 | 24 |
| `spacing-sm` | `var(--bw-spacing-sm)` · `cssVars.spacing.sm` | 6 | 6 |
| `spacing-xs` | `var(--bw-spacing-xs)` · `cssVars.spacing.xs` | 4 | 4 |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hovered / Pressed | pointer / tap | fill, text | `motion-duration-sm` | `motion-easing-standard` |
| Page n → m | select | selection moves; no slide | — | — |

Reduced motion: no change (nothing slides).

## 6. RTL

| Part | In RTL |
|---|---|
| order | Reverses: previous on the right, numbers read right to left, next on the left |
| previous · next | Glyphs mirror (previous points right) |
| digits | Western digits, as in the product |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | `<nav aria-label="Pagination">`; current page `aria-current="page"` |
| Names | "Previous page", "Next page", "Page 4" |
| Live range | `aria-live="polite"` on the range text |
| Disabled | Previous on page 1 and next on the last page are disabled, not hidden |

## 8. Examples

See the docs pages 03 and 07.

## 9. How to build it

### Goal

The Web Pagination matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- The table itself
- Page control, Stepper

### Approach

- **Base:** MUI `Pagination` with `renderItem` → Biowave page item / Icon buttons; `siblingCount={1}`, `boundaryCount={1}`.
- **Table:** custom footer: Biowave Select (rows), range text, Pagination.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
3-web-components/src/components/pagination/Pagination.tsx · TablePagination.tsx · Pagination.test.tsx · index.ts   new
3-web-components/src/index.ts · README.md · CHANGELOG.md   change
```

## 10. Tests

- [ ] Light + dark · en + ar: B2–B3 tokens
- [ ] At most 7 page slots with "…" for the gaps
- [ ] Previous / next disabled on the first / last page
- [ ] RTL reverses the order and mirrors the chevrons
- [ ] No raw values

Implement every item in B9, plus:
- [ ] Page-slot algorithm: 1 … 4 [5] 6 … 12 for page 5 of 12
- [ ] Earlier tests still pass

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6 (focus in, trap, return; dismiss rules)
- [ ] AC-5 Tests in B9 and C6 exist and pass; `npm run test:web`, `npm run typecheck`, `npm run docs:check` pass
- [ ] AC-6 Exported from the package entry file; README status updated; nothing outside C5 changed

## 12. Rules

1. Never edit generated files (`*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, any `*-contract.md`).
2. No raw values: no hex, px, ms or font names — only the tokens in §4. A missing value means stop and ask; tokens are added by the Planner.
3. Never use primitives (`primitive.*`, `BwPalette`).
4. RTL first: logical properties only (`margin-inline-start`, `padding-inline`, `inset-inline-end`); mirror only directional icons (§6).
5. Light + dark and en + ar, always — and tested.
6. WCAG 2.2 AA: keyboard, visible focus (`color-border-focus`, 2px, 2px offset), labels, targets ≥ `target-min` (24px), reduced motion.
7. Stay inside this contract; one component per task; do not refactor unrelated files.

## 13. Commands that must pass

```bash
npm run typecheck
npm run test:web
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](pagination.md#c8-execution-log-filled-by-the-executor) in `pagination.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `pagination.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
