<!-- GENERATED from skeleton.md @ a2303c9b41fb5b3a — do not edit; change the source and run: npm run contract -- web skeleton -->
# Skeleton · هيكل التحميل — Web — code contract

> **Everything you need to build Skeleton on Web, and nothing else.** Read this file only. Generated from [`skeleton.md`](skeleton.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](skeleton.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Skeleton · هيكل التحميل |
| Platform | Web · React + MUI |
| Built on | MUI `Skeleton` (`variant="text" | "circular" | "rectangular" | "rounded"`) themed with existing semantic tokens (FB-07) |
| Import | `import { Skeleton } from '@biowave/web'` |
| Version | 1.0 · 2026-11-14 |
| Source code | `src/components/skeleton/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`skeleton.md`](skeleton.md) @ `a2303c9b41fb5b3a` |

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

### Skeleton (Web)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `shape` | `'line' \| 'circle' \| 'block'` | `'line'` | | Geometric placeholder shape (FB-07) |
| `width` | `number \| string` | `'100%'` (`line`/`block`) · `40` (`circle`) | | Explicit width matching target content |
| `height` | `number \| string` | `16` (`line`) · `40` (`circle`) · `112` (`block`) | | Explicit height matching target line/media |
| `animation` | `'pulse' \| 'wave' \| false` | `'wave'` | | Disabled cleanly when `prefers-reduced-motion` matches |

**Invalid combinations** (`console.warn` in development):
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

### 4.1 How to use each token on Web

Values are for checking only — never paste a value.

| Token | CSS / TS | Light | Dark |
|---|---|---|---|
| `color-background-base-subtle` | `var(--bw-color-background-base-subtle)` · `cssVars.color.background.base.subtle` | #EDEDED | #292929 |
| `color-background-base-subtlest` | `var(--bw-color-background-base-subtlest)` · `cssVars.color.background.base.subtlest` | #F7F7F7 | #0A0A0A |
| `motion-duration-instant` | `var(--bw-motion-duration-instant)` · `cssVars.motion.duration.instant` | 0 | 0 |
| `motion-duration-progress` | `var(--bw-motion-duration-progress)` · `cssVars.motion.duration.progress` | 1000 | 1000 |
| `motion-easing-linear` | `var(--bw-motion-easing-linear)` · `cssVars.motion.easing.linear` | [0,0,1,1] | [0,0,1,1] |
| `radius-full` | `var(--bw-radius-full)` · `cssVars.radius.full` | 9999 | 9999 |
| `radius-md` | `var(--bw-radius-md)` · `cssVars.radius.md` | 8 | 8 |
| `radius-xs` | `var(--bw-radius-xs)` · `cssVars.radius.xs` | 4 | 4 |
| `size-container-xs` | `var(--bw-size-container-xs)` · `cssVars.size.container.xs` | 384 | 384 |
| `size-container-xxs` | `var(--bw-size-container-xxs)` · `cssVars.size.container.xxs` | 320 | 320 |
| `size-control-height-md` | `var(--bw-size-control-height-md)` · `cssVars.size.control.height.md` | 40 | 40 |
| `spacing-xl` | `var(--bw-spacing-xl)` · `cssVars.spacing.xl` | 16 | 16 |

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
| Semantics | Primitives render `aria-hidden="true"` `tabIndex={-1}`; wrapping loading container uses `aria-busy="true"` |
| Focus | Non-focusable, non-interactive |

## 8. Examples

```tsx
// EN / AR — language-neutral placeholder
<Stack spacing={1.5} aria-busy="true" aria-label="Loading card">
  <Skeleton shape="circle" width={40} height={40} />
  <Skeleton shape="line" width="75%" />
  <Skeleton shape="block" height={120} />
</Stack>
```

## 9. How to build it

### Goal

The Web `Skeleton` matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Page-specific bespoke skeleton layouts (apps compose `Line`, `Circle`, `Block`)

### Approach

- **Base:** MUI `Skeleton` styled cleanly with `color-background-base-subtle`, `color-background-base-subtlest` highlight, and `motion-duration-progress`.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
3-web-components/src/components/skeleton/Skeleton.tsx · Skeleton.test.tsx · index.ts   new
3-web-components/src/index.ts · README.md · CHANGELOG.md   change
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

1. Fill [C8 Execution log](skeleton.md#c8-execution-log-filled-by-the-executor) in `skeleton.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `skeleton.md` and in the Components table of `3-web-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
