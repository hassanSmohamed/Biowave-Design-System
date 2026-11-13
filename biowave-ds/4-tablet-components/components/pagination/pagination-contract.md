<!-- GENERATED from pagination.md @ 55201985d536fcab — do not edit; change the source and run: npm run contract -- tablet pagination -->
# Pagination · ترقيم الصفحات — Tablet — code contract

> **Everything you need to build Pagination on Tablet, and nothing else.** Read this file only. Generated from [`pagination.md`](pagination.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](pagination.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Pagination · ترقيم الصفحات |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Custom Flutter widget (Row of Biowave Icon buttons and page items), styled from semantic tokens |
| Import | `BwPagination` from `package:biowave_tablet/biowave_tablet.dart` |
| Version | 1.0 · 2026-11-13 |
| Source code | `lib/src/components/pagination/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`pagination.md`](pagination.md) @ `55201985d536fcab` |

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

### BwPagination
| Parameter | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `page` · `count` | `int` | ≥ 1 | — | ✓ | |
| `onChanged` | `ValueChanged<int>` | | — | ✓ | |
| `compact` | `bool?` | | auto (portrait) | | Compact form |

**Invalid combinations** (`assert` in debug):
| Combination | Fallback |
|---|---|
| `page` > `count` | assert |

## 3. Dimensions

| Part | Property | Token |
|---|---|---|
| container | gap | `spacing-xs` |
| previous · next | | Icon button `md`, `chevron_left` · `chevron_right` |
| page item · ellipsis | height · min width · padding-inline · radius | `size-control-height-md` · `size-control-height-md` · `spacing-sm` · `radius-md` |
| page item | hit area | `target-min` |
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

### 4.1 How to use each token on Tablet

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-width-focus` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `color-background-selected-default` | `context.bw.colors.backgroundSelectedDefault` | #E8ECF2 | #193351 |
| `color-background-transparent-default` | `context.bw.colors.backgroundTransparentDefault` | #54545400 | #54545400 |
| `color-background-transparent-hovered` | `context.bw.colors.backgroundTransparentHovered` | #5454541A | #54545466 |
| `color-background-transparent-pressed` | `context.bw.colors.backgroundTransparentPressed` | #54545433 | #54545499 |
| `color-border-focus` | `context.bw.colors.borderFocus` | #254471 | #90A3BC |
| `color-surface-default` | `context.bw.colors.surfaceDefault` | #FFFFFF | #141414 |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `color-text-role-brand` | `context.bw.colors.textRoleBrand` | #132843 | #BEC9D9 |
| `color-text-subtle` | `context.bw.colors.textSubtle` | #292929 | #DBDBDB |
| `color-text-subtlest` | `context.bw.colors.textSubtlest` | #545454 | #BDBDBD |
| `motion-duration-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 100 | 100 |
| `motion-easing-standard` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `size-control-height-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 40 | 40 |
| `spacing-3xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `spacing-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 6 | 6 |
| `spacing-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |
| `target-min` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |

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
| Role | `Semantics(label: "Pagination")`; current `selected: true` |
| Names | "Previous page", "Next page", "Page 4" |
| Live range | `SemanticsService.announce` of the new page |
| Disabled | Previous on page 1 and next on the last page are disabled, not hidden |

## 8. Examples

See the docs pages 03 and 07.

## 9. How to build it

### Goal

The Tablet Pagination matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- The table itself
- Page control, Stepper

### Approach

- **Base:** `Row` of `BwIconButton` (previous / next) and page items (`InkWell`, tokens B2–B3); page-slot algorithm as Web (`siblingCount` 1, `boundaryCount` 1); compact form in portrait.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
4-tablet-components/lib/src/components/pagination/bw_pagination.dart   new
4-tablet-components/test/pagination_test.dart · goldens
4-tablet-components/lib/biowave_tablet.dart   change: export
4-tablet-components/README.md · CHANGELOG.md
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
- [ ] AC-5 Tests in B9 and C6 exist and pass; `cd 4-tablet-components && flutter analyze && flutter test`, `npm run docs:check` pass
- [ ] AC-6 Exported from the package entry file; README status updated; nothing outside C5 changed

## 12. Rules

1. Never edit generated files (`*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, any `*-contract.md`).
2. No raw values: no hex, px, ms or font names — only the tokens in §4. A missing value means stop and ask; tokens are added by the Planner.
3. Never use primitives (`primitive.*`, `BwPalette`).
4. RTL first: logical properties only (`EdgeInsetsDirectional`, `AlignmentDirectional`, `BorderRadiusDirectional`); mirror only directional icons (§6).
5. Light + dark and en + ar, always — and tested.
6. WCAG 2.2 AA: keyboard, visible focus (`color-border-focus`, 2px, 2px offset), labels, targets ≥ `target-min` (48dp), reduced motion.
7. Stay inside this contract; one component per task; do not refactor unrelated files.

## 13. Commands that must pass

```bash
cd 4-tablet-components && flutter analyze && flutter test
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](pagination.md#c8-execution-log-filled-by-the-executor) in `pagination.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `pagination.md` and in the Components table of `4-tablet-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
