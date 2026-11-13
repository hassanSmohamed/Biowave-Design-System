<!-- GENERATED from breadcrumbs.md @ f677467d6624e100 — do not edit; change the source and run: npm run contract -- web breadcrumbs -->
# Breadcrumbs · مسار التنقل — Web — code contract

> **Everything you need to build Breadcrumbs on Web, and nothing else.** Read this file only. Generated from [`breadcrumbs.md`](breadcrumbs.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](breadcrumbs.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Breadcrumbs · مسار التنقل |
| Platform | Web · React + MUI |
| Built on | Custom on MUI `Breadcrumbs` (`separator`, `maxItems` 4, `itemsBeforeCollapse` 1, `itemsAfterCollapse` 2) with Biowave Link items and a Biowave Menu for the collapsed items |
| Import | `import { Breadcrumbs } from '@biowave/web'` |
| Version | 1.0 · 2026-11-13 |
| Source code | `src/components/breadcrumbs/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`breadcrumbs.md`](breadcrumbs.md) @ `f677467d6624e100` |

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

### Breadcrumbs
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `items` | `{ label: string; href?: string; onClick?: () => void }[]` | ancestors, module first | — | ✓ | `item`; the last entry is the `current` page |
| `maxItems` | `number` | ≥ 3 | `4` | | More items than this collapse into `overflow` |
| `overflowLabel` | `string` | | `'Show path'` | | Accessible name of the "…" item |

**Invalid combinations** (`console.warn` in development):
| Combination | Fallback |
|---|---|
| `href` on the last item | ignored; the last item is the current page |
| `maxItems` < 3 | `3` |

## 3. Dimensions

| Part | Property | Token |
|---|---|---|
| container | gap between items and separators | `spacing-xs` |
| item · overflow · current | height · padding-inline · radius | `size-control-height-sm` · `spacing-md` · `radius-md` |
| item · current | text style | `label-md` (current: same style, default colour) |
| item | max label width | 24 characters, then "…" (A5) |
| separator | glyph · size | `chevron_right` (mirrored in RTL) · `size-icon-md` |
| overflow | glyph · size | `more_horiz` · `size-icon-md` |
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

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `border-focus-offset` | `var(--bw-border-focus-offset)` · `cssVars.border.focus.offset` | 2 | 2 |
| `border-width-focus` | `var(--bw-border-width-focus)` · `cssVars.border.width.focus` | 2 | 2 |
| `color-background-neutral-default` | `var(--bw-color-background-neutral-default)` · `cssVars.color.background.neutral.default` | #EDEDED | #292929 |
| `color-background-transparent-default` | `var(--bw-color-background-transparent-default)` · `cssVars.color.background.transparent.default` | #54545400 | #54545400 |
| `color-background-transparent-hovered` | `var(--bw-color-background-transparent-hovered)` · `cssVars.color.background.transparent.hovered` | #5454541A | #54545466 |
| `color-background-transparent-pressed` | `var(--bw-color-background-transparent-pressed)` · `cssVars.color.background.transparent.pressed` | #54545433 | #54545499 |
| `color-border-focus` | `var(--bw-color-border-focus)` · `cssVars.color.border.focus` | #254471 | #90A3BC |
| `color-icon-subtlest` | `var(--bw-color-icon-subtlest)` · `cssVars.color.icon.subtlest` | #545454 | #BDBDBD |
| `color-surface-default` | `var(--bw-color-surface-default)` · `cssVars.color.surface.default` | #FFFFFF | #141414 |
| `color-surface-subtle` | `var(--bw-color-surface-subtle)` · `cssVars.color.surface.subtle` | #F7F7F7 | #292929 |
| `color-text-default` | `var(--bw-color-text-default)` · `cssVars.color.text.default` | #0A0A0A | #F7F7F7 |
| `color-text-subtlest` | `var(--bw-color-text-subtlest)` · `cssVars.color.text.subtlest` | #545454 | #BDBDBD |
| `motion-duration-sm` | `var(--bw-motion-duration-sm)` · `cssVars.motion.duration.sm` | 100 | 100 |
| `motion-easing-standard` | `var(--bw-motion-easing-standard)` · `cssVars.motion.easing.standard` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-md` | `var(--bw-radius-md)` · `cssVars.radius.md` | 8 | 8 |
| `size-control-height-sm` | `var(--bw-size-control-height-sm)` · `cssVars.size.control.height.sm` | 32 | 32 |
| `size-icon-md` | `var(--bw-size-icon-md)` · `cssVars.size.icon.md` | 20 | 20 |
| `spacing-md` | `var(--bw-spacing-md)` · `cssVars.spacing.md` | 8 | 8 |
| `spacing-xs` | `var(--bw-spacing-xs)` · `cssVars.spacing.xs` | 4 | 4 |
| `target-min` | `var(--bw-target-min)` · `cssVars.target.min` |  |  |

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
| Role | `<nav aria-label="Breadcrumb">` with an `<ol>`; each item an `<li>` |
| Current page | `aria-current="page"`, not a link |
| Separators | `aria-hidden="true"` |
| Overflow | Button named `overflowLabel`, opens a Menu with the hidden items in order |
| Target size | `target-min` (24) — the item height is above it |

## 8. Examples

See the docs pages 03 and 07.

## 9. How to build it

### Goal

The Web Breadcrumbs matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- The App header (only its `title` content changes)
- Tabs, Pagination, Stepper (next in the navigation family)

### Approach

- **Base:** MUI `Breadcrumbs` with `separator={<Icon name="chevron_right" mirrorInRtl />}`, `maxItems`, `itemsBeforeCollapse={1}`, `itemsAfterCollapse={2}`; replace MUI's collapse button with a Biowave "…" item that opens a Biowave Menu.
- **Items:** a styled `ButtonBase` (as a router link) with B2–B3 tokens; the last item is a `span` with `aria-current="page"`.
- **App header:** pass `<Breadcrumbs>` as `AppHeader`'s `title`.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
3-web-components/src/components/breadcrumbs/Breadcrumbs.tsx · Breadcrumbs.test.tsx · index.ts   new
3-web-components/src/index.ts · README.md · CHANGELOG.md   change
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

1. Fill [C8 Execution log](breadcrumbs.md#c8-execution-log-filled-by-the-executor) in `breadcrumbs.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `breadcrumbs.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
