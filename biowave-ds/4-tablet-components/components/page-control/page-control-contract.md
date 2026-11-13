<!-- GENERATED from page-control.md @ 3c3d1dcfc1cc4c10 — do not edit; change the source and run: npm run contract -- tablet page-control -->
# Page control · مؤشر الصفحات — Tablet — code contract

> **Everything you need to build Page control on Tablet, and nothing else.** Read this file only. Generated from [`page-control.md`](page-control.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](page-control.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Page control · مؤشر الصفحات |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Custom Flutter widget (Row of `AnimatedContainer` dots), styled from semantic tokens |
| Import | `BwPageControl` from `package:biowave_tablet/biowave_tablet.dart` |
| Version | 1.0 · 2026-11-13 |
| Source code | `lib/src/components/page-control/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`page-control.md`](page-control.md) @ `3c3d1dcfc1cc4c10` |

## 1. What it is

A page control is a row of dots under a short carousel or onboarding flow. Each dot is a page; the current one is longer and in the brand colour. It shows how many pages there are and where the user is; tapping a dot jumps to it. On iOS it takes the iOS and iPadOS 27 Page Control form.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `dot` | Yes | One page |
| 2 | `current` | Yes | The page on screen |
| 3 | `platter` | iOS | Capsule behind the dots |

**Options** (names and values are the props in §2):

- 4.1 Number of pages

## 2. API

| Parameter | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `count` | `int` | 2–7 | — | ✓ | Pages |
| `current` | `int` | 0 … count − 1 | — | ✓ | |
| `onChange` | `ValueChanged<int>` | | — | | Tap / click on a dot |

## 3. Dimensions

Dot sizes use spacing tokens: there is no size token for 8 (`size-icon-*` starts at 12). Reported in C4.

| Part | Property | Token |
|---|---|---|
| dot | size · gap · radius | `spacing-md` · `spacing-md` · `radius-full` |
| current | width · height | `spacing-3xl` · `spacing-md` |
| row | hit area | `target-min` height

## 4. Tokens by part and state

| Part | Default | Current |
|---|---|---|
| dot | `color-border-bold` | `color-background-brand-default` |

Contrast (light, non-text): dot `color-border-bold` 4.95:1 on `color-surface-default` (4.23:1 on the iOS platter) · current `color-background-brand-default` 12.85:1 · iOS current `color-icon-default` 16.91:1 on the platter. Focus ring: `border-width-focus` · `color-border-focus` around the row. Dark theme: same tokens.

### 4.1 How to use each token on Tablet

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `border-width-focus` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 2 | 2 |
| `color-background-brand-default` | `context.bw.colors.backgroundBrandDefault` | #193351 | #607D9F |
| `color-border-bold` | `context.bw.colors.borderBold` | #707070 | #969696 |
| `color-border-focus` | `context.bw.colors.borderFocus` | #254471 | #90A3BC |
| `color-icon-default` | `context.bw.colors.iconDefault` | #0A0A0A | #F7F7F7 |
| `color-surface-default` | `context.bw.colors.surfaceDefault` | #FFFFFF | #141414 |
| `motion-duration-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 200 | 200 |
| `motion-easing-standard` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.2,0,0,1] | [0.2,0,0,1] |
| `radius-full` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 9999 | 9999 |
| `spacing-3xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 24 | 24 |
| `spacing-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `target-min` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Page n → m | swipe / tap | current dot width and colour move to the new dot | `motion-duration-md` | `motion-easing-standard` |

Reduced motion: instant.

## 6. RTL

| Part | In RTL |
|---|---|
| order | Reverses: the first page is the right-most dot |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | One adjustable `Semantics` node: value "Page 2 of 5", increase / decrease |
| Target size | `target-min` |

## 8. Examples

See the docs pages 03 and 07.

## 9. How to build it

### Goal

The Tablet Page control matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- The carousel itself
- Pagination, Stepper

### Approach

- **Base:** `Row` of `AnimatedContainer` dots in a `GestureDetector`.

### Token gaps

Dot sizes use `spacing-md` / `spacing-3xl` because there is no size token below 12 (`size-icon-xs`). Proposal for Foundations: `size-indicator-sm` 8 · `size-indicator-lg` 24. Until then the spacing tokens are used.

### Files to create / change

```
4-tablet-components/lib/src/components/page_control/bw_page_control.dart   new
4-tablet-components/test/page_control_test.dart · goldens
4-tablet-components/lib/biowave_tablet.dart   change: export
4-tablet-components/README.md · CHANGELOG.md
```

## 10. Tests

- [ ] Light + dark · en + ar: B2–B3 tokens
- [ ] Tapping a dot calls `onChange`; the current dot moves
- [ ] RTL reverses the order
- [ ] No raw values

Implement every item in B9, plus:
- [ ] Semantics value updates on page change
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

1. Fill [C8 Execution log](page-control.md#c8-execution-log-filled-by-the-executor) in `page-control.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `page-control.md` and in the Components table of `4-tablet-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
