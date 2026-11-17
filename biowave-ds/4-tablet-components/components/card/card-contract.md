<!-- GENERATED from card.md @ 317760d7c41f8922 — do not edit; change the source and run: npm run contract -- tablet card -->
# Card · بطاقة — Tablet — code contract

> **Everything you need to build Card on Tablet, and nothing else.** Read this file only. Generated from [`card.md`](card.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](card.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Card · بطاقة |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Flutter `Card` / Material 3 card styled with Biowave tokens |
| Import | `import 'package:biowave_tablet/biowave_tablet.dart';` |
| Version | 1.0 · 2026-11-15 |
| Source code | `lib/src/components/card/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`card.md`](card.md) @ `317760d7c41f8922` |

## 1. What it is

A card is a flexible surface container used to group related information, media, and interactive controls into a single entry point. Cards establish clear visual hierarchy across dashboards, grid views, and mobile feeds, supporting three visual variants: `Outlined`, `Elevated`, and `Filled`.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `header` | No | Optional leading avatar/icon, title, and subtitle row |
| 2 | `badge / action` | No | Optional trailing status badge or contextual icon button |
| 3 | `media` | No | Optional cover image, map preview, or chart container |
| 4 | `body` | Yes | Flexible container hosting primary content, text, or data fields |
| 5 | `footer` | No | Optional action button bar anchored at the bottom |

**Options** (names and values are the props in §2):

- 4.1 `variant`
- 4.2 `selected`

## 2. API

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'outlined' \| 'elevated' \| 'filled'` | `'outlined'` | Visual container styling |
| `selected` | `boolean` | `false` | Whether card is highlighted as selected |
| `interactive` | `boolean` | `false` | Whether card responds to hover and click |
| `onClick` | `() => void` | `undefined` | Click handler for interactive cards |
| `header` | `ReactNode` / `Widget` | `undefined` | Optional header area (title, avatar, badge) |
| `media` | `ReactNode` / `Widget` | `undefined` | Optional top cover media or image |
| `children` | `ReactNode` / `Widget` | `undefined` | Primary body content slot |
| `actions` | `ReactNode` / `Widget` | `undefined` | Optional footer action buttons |
| `disabled` | `boolean` | `false` | Whether interactive states are disabled |

## 3. Dimensions

| Part | Property | Token / Value |
|---|---|---|
| container | width | hug / fill / fixed (`size-container-xxs` 320 px) |
| container | border-radius | `radius-xl` (12) |
| container | border-width | `border-width-default` (1) on Outlined; `border-width-strong` (2) when Selected |
| container | padding | `spacing-2xl` (20) |
| container | gap | `spacing-xl` (16) |
| header | gap (avatar, title) | `spacing-lg` (12) |
| header | gap (title, subtitle) | `spacing-xs` (4) |
| body | gap | `spacing-lg` (12) |
| footer | gap (buttons) | `spacing-lg` (12) |
| title | text style | title/md |
| subtitle | text style | body/sm |
| body content | text style | body/md |

## 4. Tokens by part and state

Every value is a semantic token; there is no `card.tokens.json`.

| Part | Variant | Property | Default | Hovered (Interactive) | Selected |
|---|---|---|---|---|---|
| container | Outlined | fill | `color-surface-default` | `color-surface-subtle` | `color-surface-default` |
| container | Outlined | border | `color-border-default` | `color-border-strong` | `color-border-brand` |
| container | Outlined | shadow | `elevation-0` | `elevation-1` | `elevation-0` |
| container | Elevated | fill | `color-surface-default` | same | `color-surface-default` |
| container | Elevated | border | `color-border-subtle` | same | `color-border-brand` |
| container | Elevated | shadow | `elevation-1` | `elevation-2` | `elevation-1` |
| container | Filled | fill | `color-surface-subtle` | `color-surface-default` | `color-surface-subtle` |
| container | Filled | border | none | none | `color-border-brand` |
| title | All | text colour | `color-text-default` | same | same |
| subtitle | All | text colour | `color-text-subtle` | same | same |
| focus ring | All | border | `border-width-focus` · `color-border-focus` | — | — |

### 4.1 How to use each token on Tablet

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-width-default` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 1 | 1 |
| `border-width-focus` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `border-width-strong` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `color-border-brand` | `context.bw.colors.borderBrand` | #254471 | #607D9F |
| `color-border-default` | `context.bw.colors.borderDefault` | #DBDBDB | #404040 |
| `color-border-focus` | `context.bw.colors.borderFocus` | #254471 | #90A3BC |
| `color-border-strong` | `context.bw.colors.borderStrong` | #BDBDBD | #545454 |
| `color-border-subtle` | `context.bw.colors.borderSubtle` | #EDEDED | #292929 |
| `color-surface-default` | `context.bw.colors.surfaceDefault` | #FFFFFF | #141414 |
| `color-surface-subtle` | `context.bw.colors.surfaceSubtle` | #F7F7F7 | #292929 |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `color-text-subtle` | `context.bw.colors.textSubtle` | #292929 | #DBDBDB |
| `elevation-0` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0px 0px 0px 0px rgb(7 19 35 / 0%) | 0px 0px 0px 0px rgb(0 0 0 / 0%) |
| `elevation-1` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0px 1px 2px 0px rgb(7 19 35 / 5%) | 0px 1px 2px 0px rgb(0 0 0 / 12%) |
| `elevation-2` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0px 2px 16px 0px rgb(7 19 35 / 9%) | 0px 2px 16px 0px rgb(0 0 0 / 22%) |
| `motion-duration-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 100 | 100 |
| `motion-easing-standard` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 12 | 12 |
| `size-container-xxs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 320 | 320 |
| `spacing-2xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 20 | 20 |
| `spacing-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 12 | 12 |
| `spacing-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
| `spacing-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default ↔ Hovered | Pointer enter | Shadow / border colour | `motion-duration-sm` | `motion-easing-standard` |
| Unselected ↔ Selected | Click / select | Border colour & width | `motion-duration-sm` | `motion-easing-standard` |

Reduced motion: States switch instantly without elevation transitions.

## 6. RTL

| Part | In RTL |
|---|---|
| Header layout | Leading avatar on right, title and subtitle text aligned right, badge on left |
| Footer actions | Primary button aligned to start/end according to RTL button layout rules |
| Body alignment | Content aligns right according to RTL flow |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Semantic tag | `<article>` or `<div role="article">` for content cards |
| Interactive cards | Single actionable wrapper element with keyboard focus |
| Selected state | `aria-selected="true|false"` when functioning as a selectable card |
| Touch target | Action buttons inside card meet 48 dp minimum touch target |

## 8. Examples

See documentation page 03.

## 9. How to build it

### Goal

The Tablet `Card` matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Application-specific complex card contents (apps provide children slot widgets)

### Approach

- **Base:** Flutter `Card` / Material 3 card with Biowave tokens and touch targets on Tablet.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
4-tablet-components/lib/src/components/card/bw_card.dart · test/card_test.dart   new
4-tablet-components/lib/biowave_tablet.dart · README.md · CHANGELOG.md   change
```

## 10. Tests

- [ ] Outlined, Elevated, and Filled variants render correct tokens in Light and Dark
- [ ] Selected state applies `color-border-brand` border
- [ ] Interactive card responds to hover, active, and keyboard focus
- [ ] Header, media, body, and actions slots render correctly
- [ ] RTL mirrors header elements and action alignment
- [ ] No raw values in style bindings

Implement every item in B9, plus:
- [ ] Light and Dark fills verified against Foundations semantic tokens
- [ ] Earlier tests still pass

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6
- [ ] AC-5 Tests in B9 and C6 exist and pass; `npm run test:tablet`, `flutter analyze`, `npm run docs:check` pass
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

1. Fill [C8 Execution log](card.md#c8-execution-log-filled-by-the-executor) in `card.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `card.md` and in the Components table of `4-tablet-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
