<!-- GENERATED from skeleton.md @ de4c7698c7b5d5e2 — do not edit; change the source and run: npm run contract -- tablet skeleton -->
# Skeleton · هيكل التحميل — Tablet — code contract

> **Everything you need to build Skeleton on Tablet, and nothing else.** Read this file only. Generated from [`skeleton.md`](skeleton.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](skeleton.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Skeleton · هيكل التحميل |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Custom Flutter `BwSkeleton` shimmer/pulse widget driven by a single `AnimationController` and semantic tokens (FB-07) |
| Import | `import 'package:biowave_tablet/biowave_tablet.dart'; // BwSkeleton` |
| Version | 1.0 · 2026-11-14 |
| Source code | `lib/src/components/skeleton/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`skeleton.md`](skeleton.md) @ `de4c7698c7b5d5e2` |

## 1. What it is

A skeleton is a low-contrast placeholder block that mirrors the approximate shape of text lines, avatars, cards or table rows while real data is loading (`aria-busy="true"`). It reassures users that the layout is stable without jumping once content arrives.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `line` | Placeholder bar matching a heading, body line or table cell height |
| 2 | `circle` | Circular placeholder matching an avatar, icon badge or status emblem |
| 3 | `block` | Rectangular placeholder matching a card, chart or media container |

**Options** (names and values are the props in §2):

- 4.1 `shape` (FB-07)

## 2. API

### BwSkeleton (Flutter)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `shape` | `BwSkeletonShape` (`line · circle · block`) | `BwSkeletonShape.line` | | Geometric placeholder shape (FB-07) |
| `width` | `double?` | `double.infinity` (`line`/`block`) · `40` (`circle`) | | Width in logical pixels |
| `height` | `double?` | `16` (`line`) · `40` (`circle`) · `112` (`block`) | | Height in logical pixels |
| `animate` | `bool` | `true` | | Static when `false` or `MediaQuery.disableAnimations` is true |

**Invalid combinations** (`assert` in development):
| Combination | Fallback |
|---|---|
| Negative `width` or `height` | Clamps to `>= 0`, warns |
| `shape = 'circle'` with unequal `width` and `height` | Uses `width` for both axes to keep circle round, warns |

## 3. Dimensions

| Shape | Radius token | Default sample size in Figma |
|---|---|---|
| `line` | `radius-xs` (4) | `width`: `size-container-xs` (384) · `height`: `spacing-xl` (16) |
| `circle` | `radius-full` (9999) | `width` = `height`: `size-control-height-md` (40) |
| `block` | `radius-md` (8) | `width`: `size-container-xxs` (320) · vertical padding `2 × size-control-height-xl` (112) |

## 4. Tokens by part and state

Reuses existing Foundations semantic tokens (FB-07); there is no `skeleton.tokens.json`.

| Property | Token | Light / Dark behaviour |
|---|---|---|
| base fill | `color-background-base-subtle` | `neutral.100` Light / `neutral.800` Dark |
| shimmer highlight peak | `color-background-base-subtlest` | `neutral.50` Light / `neutral.900` Dark |

Contrast note: Skeleton is a purely decorative non-text loading placeholder (`aria-hidden`) excluded from text contrast ratios.

### 4.1 How to use each token on Tablet

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `color-background-base-subtle` | `context.bw.colors.backgroundBaseSubtle` | #EDEDED | #292929 |
| `color-background-base-subtlest` | `context.bw.colors.backgroundBaseSubtlest` | #F7F7F7 | #0A0A0A |
| `motion-duration-instant` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0 | 0 |
| `motion-duration-progress` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 1000 | 1000 |
| `motion-easing-linear` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0,0,1,1] | [0,0,1,1] |
| `radius-full` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 9999 | 9999 |
| `radius-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `radius-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 4 | 4 |
| `size-container-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 384 | 384 |
| `size-container-xxs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 320 | 320 |
| `size-control-height-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 40 | 40 |
| `spacing-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |

## 5. States and transitions

| State | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Shimmer / pulse | Mounted while loading | background gradient / opacity sweep | `motion-duration-progress` (1000 ms loop) | `motion-easing-linear` |
| Reduced motion | `prefers-reduced-motion` / `disableAnimations` | static `color-background-base-subtle` fill | `motion-duration-instant` | — |

## 6. RTL

| Part | In RTL |
|---|---|
| `line` / `circle` / `block` | Shapes are symmetrical; directional shimmer wave (when used) sweeps right-to-left in RTL |

## 7. Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Semantics | Each `BwSkeleton` uses `ExcludeSemantics`; parent loading block provides a single localised `Semantics(label: ...)` |
| Focus | Non-focusable, non-interactive |

## 8. Examples

```dart
Semantics(
  label: 'Loading',
  child: Column(
    children: const [
      BwSkeleton(shape: BwSkeletonShape.circle, width: 40, height: 40),
      SizedBox(height: 12),
      BwSkeleton(shape: BwSkeletonShape.line, width: 240),
      SizedBox(height: 12),
      BwSkeleton(shape: BwSkeletonShape.block, height: 112),
    ],
  ),
)
```

## 9. How to build it

### Goal

The Tablet `Skeleton` matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Page-specific bespoke skeleton layouts (apps compose `Line`, `Circle`, `Block`)

### Approach

- **Base:** Custom Flutter `BwSkeleton` using `AnimatedBuilder` + `LinearGradient` between `color-background-base-subtle` and `color-background-base-subtlest`, static when `MediaQuery.disableAnimations` is true.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
4-tablet-components/lib/src/components/skeleton/bw_skeleton.dart · test/skeleton_test.dart   new
4-tablet-components/lib/biowave_tablet.dart · README.md · CHANGELOG.md   change
```

## 10. Tests

- [ ] Light + dark: binds `color-background-base-subtle` / `subtlest` tokens; no raw hex
- [ ] All 3 shapes (`line`, `circle`, `block`) render expected corner radii (`radius-xs`, `radius-full`, `radius-md`)
- [ ] Unequal circle dims fallback cleanly; reduced motion renders static fill
- [ ] Decorative `aria-hidden` / `ExcludeSemantics` verified

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

1. Fill [C8 Execution log](skeleton.md#c8-execution-log-filled-by-the-executor) in `skeleton.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `skeleton.md` and in the Components table of `4-tablet-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
