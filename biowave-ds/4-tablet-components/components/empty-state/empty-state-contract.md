<!-- GENERATED from empty-state.md @ 46b942790db26836 — do not edit; change the source and run: npm run contract -- tablet empty-state -->
# Empty state · حالة فراغ — Tablet — code contract

> **Everything you need to build Empty state on Tablet, and nothing else.** Read this file only. Generated from [`empty-state.md`](empty-state.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](empty-state.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Empty state · حالة فراغ |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Custom Flutter `BwEmptyState` widget composed from semantic tokens and Biowave `BwButton` |
| Import | `import 'package:biowave_tablet/biowave_tablet.dart'; // BwEmptyState` |
| Version | 1.0 · 2026-11-14 |
| Source code | `lib/src/components/empty-state/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`empty-state.md`](empty-state.md) @ `46b942790db26836` |

## 1. What it is

An empty state fills an empty page, section, card, side sheet or data table with clear context explaining why nothing appears yet and offering the user a constructive next step ("Add employee", "Clear filters"). Sizes `md` (full-page / section) and `sm` (compact inside Data table, cards or panels) cover all contexts without drawing custom empty frames (FB-06).

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `visual` | No | Spot illustration (`md`) or calm icon in a `color-surface-subtle` circle (`sm` / toggleable) |
| 2 | `title` | Yes | Short noun/statement explaining the empty condition |
| 3 | `description` | No | Concise guidance telling the user why it is empty and what to do next |
| 4 | `actions` | No | Optional primary `Button` (`Filled`) and optional secondary `Button` (`Outlined` or `Text`) |

**Options** (names and values are the props in §2):

- 4.1 `size` (FB-06)
- 4.2 Visual & action slots

## 2. API

### BwEmptyState (Flutter)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `size` | `BwEmptyStateSize` (`md · sm`) | `BwEmptyStateSize.md` | | Page/section (`md`) vs compact table/card (`sm`, FB-06) |
| `visual` | `Widget?` | default subtle icon badge | | Custom illustration/icon widget |
| `showVisual` | `bool` | `true` | | Hides visual slot when `false` |
| `title` | `String` | — | ✓ | Primary heading |
| `description` | `String?` | `null` | | Supporting explanation |
| `primaryActionLabel` | `String?` | `null` | | Primary button label |
| `onPrimaryAction` | `VoidCallback?` | `null` | | Primary button callback |
| `secondaryActionLabel` | `String?` | `null` | | Secondary button label |
| `onSecondaryAction` | `VoidCallback?` | `null` | | Secondary button callback |

**Invalid combinations** (`assert` in development):
| Combination | Fallback |
|---|---|
| `secondaryAction` without `primaryAction` | Promotes/renders single button cleanly or warns if mismatched hierarchy |
| Action label without handler | Ignores handlerless button and warns |

## 3. Dimensions

| Part | `size = md` (Page / Section) | `size = sm` (Compact) |
|---|---|---|
| container max width | `size-container-sm` (480) | `size-container-xs` (384) |
| container padding | `spacing-3xl` (24) | `spacing-xl` (16) |
| `visual` badge | icon `size-icon-3xl` (48) + `spacing-3xl` (24) pad (`radius-full`) | icon `size-icon-2xl` (40) + `spacing-xl` (16) pad (`radius-full`) |
| gap `visual`–text stack | `spacing-3xl` (24) | `spacing-xl` (16) |
| gap `title`–`description` | `spacing-md` (8) | `spacing-xs` (4) |
| `title` text style | `title-lg` | `title-md` |
| `description` text style | `body-lg` | `body-md` |
| gap text stack–`actions` | `spacing-2xl` (20) | `spacing-xl` (16) |
| gap between buttons | `spacing-md` (8) | `spacing-md` (8) |

## 4. Tokens by part and state

Every value is a semantic token; there is no `empty-state.tokens.json`.

| Part | Property | Token (`md` · `sm`) |
|---|---|---|
| `visual` badge background | fill | `color-surface-subtle` |
| `visual` icon | fill | `color-icon-subtlest` |
| `title` | text fill | `color-text-default` |
| `description` | text fill | `color-text-subtle` (`md`) · `color-text-subtlest` (`sm`) |
| `primaryAction` | Button | `Filled` · `brand` |
| `secondaryAction` | Button | `Outlined` · `neutral` |

Contrast (Light / Dark): `color-text-default` on `color-surface-default` — **19.8:1 / 17.2:1** · `color-text-subtle` — **14.55:1 / 13.31:1** · `color-text-subtlest` — **7.57:1 / 9.81:1**.

### 4.1 How to use each token on Tablet

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-width-focus` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `color-border-focus` | `context.bw.colors.borderFocus` | #254471 | #90A3BC |
| `color-icon-subtlest` | `context.bw.colors.iconSubtlest` | #545454 | #BDBDBD |
| `color-surface-default` | `context.bw.colors.surfaceDefault` | #FFFFFF | #141414 |
| `color-surface-subtle` | `context.bw.colors.surfaceSubtle` | #F7F7F7 | #292929 |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `color-text-subtle` | `context.bw.colors.textSubtle` | #292929 | #DBDBDB |
| `color-text-subtlest` | `context.bw.colors.textSubtlest` | #545454 | #BDBDBD |
| `motion-duration-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 200 | 200 |
| `motion-easing-standard-decelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0,0,0,1] | [0,0,0,1] |
| `radius-full` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 9999 | 9999 |
| `size-container-sm` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 480 | 480 |
| `size-container-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 384 | 384 |
| `size-icon-2xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 40 | 40 |
| `size-icon-3xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 48 | 48 |
| `spacing-2xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 20 | 20 |
| `spacing-3xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `spacing-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `spacing-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |
| `spacing-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |

## 5. States and transitions

Static centered view. Entrance fade uses `motion-duration-md` (200 ms) `motion-easing-standard-decelerate`; instant under reduced motion.

## 6. RTL

| Part | In RTL |
|---|---|
| centered layout | Remains centered; secondary/primary button row flips right-to-left automatically |
| text alignment | Centered; mixed punctuation respects RTL direction |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Semantics | `visual` wrapped in `ExcludeSemantics`; `title` marked `Semantics(header: true)`; buttons enforce `48 × 48 dp` minimum target |
| Actions | Keyboard focusable (`border-width-focus` `color-border-focus`), clear verb labels |

## 8. Examples

```dart
// EN
BwEmptyState(
  size: BwEmptyStateSize.sm,
  title: 'No matching results',
  description: 'Try adjusting your filters or search terms.',
  primaryActionLabel: 'Clear filters',
  onPrimaryAction: onReset,
)

// AR (direction comes from Directionality / locale)
BwEmptyState(
  title: 'لا توجد بيانات بعد',
  description: 'ابدأ بإضافة أول موظف في هذا الفرع.',
  primaryActionLabel: 'إضافة موظف',
  onPrimaryAction: onAdd,
)
```

## 9. How to build it

### Goal

The Tablet `Empty state` matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Loading placeholders (`Skeleton`)
- Full illustration asset pack authoring (`2-foundations/guidelines/illustration.md`)

### Approach

- **Base:** Centered Flutter `Column` constrained by `ConstrainedBox` (`size-container-sm` / `xs`), circular badge in `color-surface-subtle`, reusing `BwButton`.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
4-tablet-components/lib/src/components/empty_state/bw_empty_state.dart · test/empty_state_test.dart   new
4-tablet-components/lib/biowave_tablet.dart · README.md · CHANGELOG.md   change
```

## 10. Tests

- [ ] Light + dark · en + ar: both `md` and `sm` render B2 dimensions and B3 tokens
- [ ] `visual = null` / `showVisual = false` collapses visual slot cleanly
- [ ] Optional `description`, `primaryAction`, `secondaryAction` render only when passed
- [ ] RTL layout and Arabic copy wrap cleanly within container width
- [ ] Accessibility decorative visual hiding and button contrast/targets pass

Implement every item in B9, plus:
- [ ] `sm` renders compact inside constrained table/card height
- [ ] Dual action buttons wrap cleanly on narrow widths
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

1. Fill [C8 Execution log](empty-state.md#c8-execution-log-filled-by-the-executor) in `empty-state.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `empty-state.md` and in the Components table of `4-tablet-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
