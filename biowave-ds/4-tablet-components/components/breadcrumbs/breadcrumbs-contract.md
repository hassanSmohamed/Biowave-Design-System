<!-- GENERATED from breadcrumbs.md @ 64972ed7ab92a6aa — do not edit; change the source and run: npm run contract -- tablet breadcrumbs -->
# Breadcrumbs · مسار التنقل — Tablet — code contract

> **Everything you need to build Breadcrumbs on Tablet, and nothing else.** Read this file only. Generated from [`breadcrumbs.md`](breadcrumbs.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](breadcrumbs.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Breadcrumbs · مسار التنقل |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Custom Flutter widget (`Wrap`-free single `Row` with `InkWell` items, M3 `MenuAnchor` for the collapsed items), styled from semantic tokens |
| Import | `BwBreadcrumbs` from `package:biowave_tablet/biowave_tablet.dart` |
| Version | 1.0 · 2026-11-13 |
| Source code | `lib/src/components/breadcrumbs/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`breadcrumbs.md`](breadcrumbs.md) @ `64972ed7ab92a6aa` |

## 1. What it is

Breadcrumbs show the path from the module to the current page — "Devices › Biometric terminals › Gate A-12" — and every step except the last is a link back up. On Web they sit in the App header's title area, so the user always knows where they are without a page title in the header. They are a secondary aid: Primary navigation is still how users move between sections.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `item` | Yes | A link to an ancestor page (module, section, record) |
| 2 | `separator` | Yes | Chevron between items; points in the reading direction |
| 3 | `overflow` | No | "…" item that opens a Menu with the collapsed ancestors |
| 4 | `current` | Yes | The current page: last item, not a link, shown on a neutral chip |

**Options** (names and values are the props in §2):

- 4.1 Number of items
- 4.2 `current`

## 2. API

### BwBreadcrumbs
| Parameter | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `items` | `List<BwBreadcrumbItem>` (`label`, `onTap`) | module first | — | ✓ | `item`; the last entry is the `current` page |
| `maxItems` | `int` | ≥ 3 | `4` (portrait `3`) | | More items than this collapse into `overflow` |
| `overflowLabel` | `String` | | `'Show path'` (localised) | | Semantics label of the "…" item |

**Invalid combinations** (`assert` in debug):
| Combination | Fallback |
|---|---|
| `onTap` on the last item | ignored |
| `maxItems` < 3 | `3` |

## 3. Dimensions

| Part | Property | Token |
|---|---|---|
| container | gap between items and separators | `spacing-xs` |
| item · overflow · current | height · padding-inline · radius | `size-control-height-md` · `spacing-md` · `radius-md` |
| item | hit area | `target-min` (min block size around the visual item) |
| item · current | text style | `label-md` (current: same style, default colour) |
| item | max label width | 24 characters, then "…" (A5) |
| separator | glyph · size | `chevron_right` (mirrored in RTL) · `size-icon-lg` |
| overflow | glyph · size | `more_horiz` · `size-icon-lg` |
| focus ring | width · offset · radius | `border-width-focus` · `border-focus-offset` · `radius-md` |

## 4. Tokens by part and state

Every value is a semantic token; there is no `breadcrumbs.tokens.json`.

| Part | Property | Default | Hovered | Pressed | Focused |
|---|---|---|---|---|---|
| item · overflow | fill | `color-background-transparent-default` | `color-background-transparent-hovered` | `color-background-transparent-pressed` | `color-background-transparent-default` |
| item · overflow | text · icon | `color-text-subtlest` | `color-text-default` | `color-text-default` | `color-text-subtlest` |
| item | focus ring | — | — | — | `color-border-focus` |
| current | fill · text | `color-background-neutral-default` · `color-text-default` | — | — | — |
| separator | icon | `color-icon-subtlest` | — | — | — |

Contrast (light): `color-text-subtlest` on `color-surface-subtle` (App header) 7.07:1 · on `color-surface-default` 7.57:1; current `color-text-default` on `color-background-neutral-default` 16.91:1. Dark theme: same tokens.

### 4.1 How to use each token on Tablet

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-focus-offset` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `border-width-focus` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `color-background-neutral-default` | `context.bw.colors.backgroundNeutralDefault` | #EDEDED | #292929 |
| `color-background-transparent-default` | `context.bw.colors.backgroundTransparentDefault` | #54545400 | #54545400 |
| `color-background-transparent-hovered` | `context.bw.colors.backgroundTransparentHovered` | #5454541A | #54545466 |
| `color-background-transparent-pressed` | `context.bw.colors.backgroundTransparentPressed` | #54545433 | #54545499 |
| `color-border-focus` | `context.bw.colors.borderFocus` | #254471 | #90A3BC |
| `color-icon-subtlest` | `context.bw.colors.iconSubtlest` | #545454 | #BDBDBD |
| `color-surface-default` | `context.bw.colors.surfaceDefault` | #FFFFFF | #141414 |
| `color-surface-subtle` | `context.bw.colors.surfaceSubtle` | #F7F7F7 | #292929 |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `color-text-subtlest` | `context.bw.colors.textSubtlest` | #545454 | #BDBDBD |
| `motion-duration-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 100 | 100 |
| `motion-easing-standard` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `size-control-height-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 40 | 40 |
| `size-icon-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `spacing-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `spacing-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |
| `target-min` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hovered / Pressed | pointer / tap | fill, text colour | `motion-duration-sm` | `motion-easing-standard` |
| Collapsed → Menu open | "…" activated | the Menu's own motion | — | — |

Reduced motion: instant.

## 6. RTL

| Part | In RTL |
|---|---|
| order | Reverses: the module is on the right, the current page on the left |
| separator | Mirrors (`chevron_right` points left) |
| overflow | `more_horiz` does not mirror |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | `Semantics(container: true, label: "Breadcrumb")`; each item a button with its label |
| Current page | `Semantics(selected: true)` and no `onTap` |
| Separators | `ExcludeSemantics` |
| Overflow | Button named `overflowLabel`, opens a Menu with the hidden items in order |
| Target size | `target-min` (48) hit area |

## 8. Examples

See the docs pages 03 and 07.

## 9. How to build it

### Goal

The Tablet Breadcrumbs matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- The App header (only its `title` content changes)
- Tabs, Pagination, Stepper (next in the navigation family)

### Approach

- **Base:** a `Row` of `InkWell` items (B2–B3 tokens, `target-min` constraints), `Icon(Icons.chevron_right, textDirection-aware)` separators, and an M3 `MenuAnchor` behind the "…" item.
- **Portrait:** read the orientation from `MediaQuery` and use `maxItems` 3 unless set.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
4-tablet-components/lib/src/components/breadcrumbs/bw_breadcrumbs.dart   new
4-tablet-components/test/breadcrumbs_test.dart · goldens
4-tablet-components/lib/biowave_tablet.dart   change: export
4-tablet-components/README.md · CHANGELOG.md
```

## 10. Tests

- [ ] Light + dark · en + ar: B2–B3 tokens
- [ ] More than `maxItems` collapses into first · "…" · last two; the Menu lists the hidden items in order
- [ ] The last item is the current page and is not interactive
- [ ] RTL reverses the order and mirrors the separators
- [ ] Long labels truncate with a Tooltip
- [ ] No raw values

Implement every item in B9, plus:
- [ ] The current page has no tap or click handler
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

1. Fill [C8 Execution log](breadcrumbs.md#c8-execution-log-filled-by-the-executor) in `breadcrumbs.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `breadcrumbs.md` and in the Components table of `4-tablet-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
