# Skeleton · هيكل التحميل — Mobile

> **One file for Skeleton on Mobile:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- mobile skeleton`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Skeleton · هيكل التحميل |
| Summary | Low-contrast animated placeholder (`line`, `circle`, `block`) reusing existing subtle background tokens to preview layout while content loads. |
| Summary (ar) | عنصر نائب منخفض التباين (`line`، `circle`، `block`) يمهّد شكل المحتوى أثناء التحميل مع دعم تقليل الحركة. |
| Parts | Line · circle · block |
| Parts (ar) | سطر · دائرة · كتلة |
| Platform | Mobile · Flutter + Material 3 + Cupertino (adaptive, N-07) |
| Built on | Custom Flutter `BwSkeleton` shimmer/pulse widget driven by a single `AnimationController` and semantic tokens (FB-07) |
| Import | `import 'package:biowave_mobile/biowave_mobile.dart'; // BwSkeleton` |
| Figma | **Biowave DS — Mobile Components** › `↳ Skeleton` (page Typography mode `Mobile`) · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-11-14 |
| Plan | Finished |
| Code | Planned |
| Figma build | Built |
| Review | — |
| Source code | `lib/src/components/skeleton/` — not built yet (the Executor creates it) |
| Tokens | No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly |
| Contracts | [`skeleton-contract.md`](skeleton-contract.md) · [`figma-skeleton-contract.md`](figma-skeleton-contract.md) — generated, never edited |
| Docs page | [`skeleton.html`](skeleton.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---
## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/skeleton/skeleton.md#b--spec) · [Tablet](../../../4-tablet-components/components/skeleton/skeleton.md#b--spec) · [Mobile](../../../5-mobile-components/components/skeleton/skeleton.md#b--spec) |
| Figma | `↳ Skeleton` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** |
| Version | 1.0 · 2026-11-14 |

### A1 Overview

A skeleton is a low-contrast placeholder block that mirrors the approximate shape of text lines, avatars, cards or table rows while real data is loading (`aria-busy="true"`). It reassures users that the layout is stable without jumping once content arrives.

### A2 Anatomy

```
Line:     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   (radius-xs 4 px)

Circle:   ╭───╮                    (radius-full 9999 px)
          ╰───╯

Block:    ┌───────────────────────┐
          │ ░░░░░░░░░░░░░░░░░░░░░ │  (radius-md 8 px)
          └───────────────────────┘
```

| # | Part / Variant | Role |
|---|---|---|
| 1 | `line` | Placeholder bar matching a heading, body line or table cell height |
| 2 | `circle` | Circular placeholder matching an avatar, icon badge or status emblem |
| 3 | `block` | Rectangular placeholder matching a card, chart or media container |

### A3 Usage

**When to use**
- Initial page, card or Data table fetch taking longer than `300 ms` where the layout structure is already known

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Indeterminate action inside a Button or unknown duration | Progress (spinner / linear progress) |
| Data load completed with zero items | [Empty state](../empty-state/empty-state.md#a--guidelines) |
| Persistent warning about failed load | [Alert](../alert/alert.md#a--guidelines) |

### A4 Options

#### 4.1 `shape` (FB-07)
| Value | Radius | Pick it when |
|---|---|---|
| `line` | `radius-xs` (4) | **Default.** Replacing text strings (labels, headings, table cells) |
| `circle` | `radius-full` | Replacing circular avatars, emblems or icon badges |
| `block` | `radius-md` (8) or `radius-2xl` (16) | Replacing cards, thumbnails, banners or multi-row panels |

**Combination rules**
- Match placeholder shape and spacing tightly to the real component to avoid layout shift (CLS) when data swaps in
- Combine `line`, `circle` and `block` inside page/table/card loading compositions rather than creating dozens of rigid one-off skeleton sets

### A5 States and behavior

| State | Trigger | What the user sees |
|---|---|---|
| Animating | Standard motion preference | Gentle pulse/wave between `color-background-base-subtle` and `color-background-base-subtlest` |
| Static (reduced motion) | Reduced motion active | Static fill in `color-background-base-subtle` without shimmer movement |
| Resolved | Real data ready | Container `aria-busy` clears and real content replaces the skeleton |

**Behavior rules**
- Do not show skeletons for fast responses under `300 ms` (avoids distracting flash)
- Skeleton blocks never receive keyboard focus or interactive hover states

### A6 Content

Skeleton has no text strings or user-facing labels. Provide an accessible loading announcement (`"Loading…"` / `"جارٍ التحميل…"`) on the parent loading region (`aria-busy="true"`).

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Compose `line` + `circle` + `block` so loading previews match real layout proportions | Flash skeletons for < 200 ms instant fetches |
| Disable shimmer motion cleanly under `prefers-reduced-motion` | Animate bright white flashing bars in Dark theme |
| Reuse existing `color-background-base-subtle` / `subtlest` tokens (FB-07) | Hardcode raw grey hex fills per page |


### A8 Platform notes — Mobile

| | Mobile |
|---|---|
| Reduced motion | Respects `MediaQuery.disableAnimations` (static `color-background-base-subtle` fill without wave motion) |
| Layout | Composed inside mobile list rows, cards and detail headers |

### A9 Accessibility (design)

- Individual `Skeleton` primitives are decorative (`aria-hidden="true"` / `ExcludeSemantics`)
- The parent loading region carries `aria-busy="true"` (Web) or a single `"Loading"` semantic label (Flutter) so screen readers do not announce dozens of blank shapes

### A10 Related components

- [Empty state](../empty-state/empty-state.md#a--guidelines) — shown once loading finishes with zero items
- [Alert](../alert/alert.md#a--guidelines) — shown when the fetch fails
- Data table — uses `Skeleton` primitives in its `loading` state (Wave 10)

---
## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### BwSkeleton (Flutter)
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

### B2 Dimensions

| Shape | Radius token | Default sample size in Figma |
|---|---|---|
| `line` | `radius-xs` (4) | `width`: `size-container-xs` (384) · `height`: `spacing-xl` (16) |
| `circle` | `radius-full` (9999) | `width` = `height`: `size-control-height-md` (40) |
| `block` | `radius-md` (8) | `width`: `size-container-xxs` (320) · vertical padding `2 × size-control-height-xl` (112) |

### B3 Tokens by part and state

Reuses existing Foundations semantic tokens (FB-07); there is no `skeleton.tokens.json`.

| Property | Token | Light / Dark behaviour |
|---|---|---|
| base fill | `color-background-base-subtle` | `neutral.100` Light / `neutral.800` Dark |
| shimmer highlight peak | `color-background-base-subtlest` | `neutral.50` Light / `neutral.900` Dark |

Contrast note: Skeleton is a purely decorative non-text loading placeholder (`aria-hidden`) excluded from text contrast ratios.

### B4 States and transitions

| State | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Shimmer / pulse | Mounted while loading | background gradient / opacity sweep | `motion-duration-progress` (1000 ms loop) | `motion-easing-linear` |
| Reduced motion | `prefers-reduced-motion` / `disableAnimations` | static `color-background-base-subtle` fill | `motion-duration-instant` | — |

### B5 RTL

| Part | In RTL |
|---|---|
| `line` / `circle` / `block` | Shapes are symmetrical; directional shimmer wave (when used) sweeps right-to-left in RTL |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Semantics | Each `BwSkeleton` uses `ExcludeSemantics`; parent loading block provides a single localised `Semantics(label: ...)` |
| Focus | Non-focusable, non-interactive |

### B7 Examples

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

### B8 Figma

Structure, properties, Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark: binds `color-background-base-subtle` / `subtlest` tokens; no raw hex
- [ ] All 3 shapes (`line`, `circle`, `block`) render expected corner radii (`radius-xs`, `radius-full`, `radius-md`)
- [ ] Unequal circle dims fallback cleanly; reduced motion renders static fill
- [ ] Decorative `aria-hidden` / `ExcludeSemantics` verified
---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `skeleton-contract.md`.

> Written by the Planner (Antigravity). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · 2026-11-14 |

### C1 Goal

The Mobile `Skeleton` matches B1–B6 and passes B9 and C6.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Page-specific bespoke skeleton layouts (apps compose `Line`, `Circle`, `Block`)

### C3 Approach

- **Base:** Custom Flutter `BwSkeleton` using `AnimatedBuilder` + `LinearGradient` between `color-background-base-subtle` and `color-background-base-subtlest`, static when `MediaQuery.disableAnimations` is true.

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
5-mobile-components/lib/src/components/skeleton/bw_skeleton.dart · test/skeleton_test.dart   new
5-mobile-components/lib/biowave_mobile.dart · README.md · CHANGELOG.md   change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Light and Dark fills verified against Foundations semantic tokens
- [ ] Earlier tests still pass

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6
- [ ] AC-5 Tests in B9 and C6 exist and pass; `npm run test:mobile`, `flutter analyze`, `npm run docs:check` pass
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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-skeleton-contract.md`.

> Written by the Planner (Antigravity) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Mobile set in **Biowave DS — Mobile Components**.

| Field | Value |
|---|---|
| Component | Skeleton |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) — never the Foundations file |
| Page / section | `↳ Skeleton` › sections `Skeleton — Component` and `Skeleton — Documentation` |
| Mode | **Create new** in **Biowave DS — Mobile Components**. |
| Depends on | Foundations library variables only |
| Plan version | 1 · 2026-11-14 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `lint-component-section.js` must report 0 unbound values.
- Nested parts are instances of the sets already in this file (`.Button _en` / `.Button _ar` or `Button`, `Icon Button`) — never detached, never redrawn.

### D2 Component structure

```
❖ Skeleton                        ← set: Shape = Line · Circle · Block
  └─ shape surface                rectangle / circle / block bound to Foundations tokens
```

### D3 Layer tree and auto layout

```
Skeleton (Line)           □ width size/container/xs (384) · height spacing/xl (16) · radius/xs · fill color/background/base/subtle
Skeleton (Circle)         ● width size/control/height/md (40) · height size/control/height/md (40) · radius/full · fill color/background/base/subtle
Skeleton (Block)          □ width size/container/xxs (320) · vertical pad 2 × size/control/height/xl (112) · radius/md · fill color/background/base/subtle
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Shape` | VARIANT | `Line` · `Circle` · `Block` | `Line` | `shape` | `'line'` · `'circle'` · `'block'` |

### D5 Variants to generate

- `Skeleton`: `Shape` (3) = **3** variants (language-neutral; composed into loading rows/cards inside apps and Data table).

### D6 States, interactions and motion

No prototype interactions on the set. Shimmer animation timing (`motion-duration-progress` 1000 ms, linear) and reduced-motion static state are documented on page 04.

### D7 RTL

Shapes are language-neutral; loading compositions in RTL mirror the host layout (e.g., `Circle` avatar on the right of `Line` text rows).

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Skeleton — Documentation`, frames `Skeleton / 00 Component sheet` … `Skeleton / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Skeleton:
- 01: composed employee card & table-row skeleton preview using live instances of `Line`, `Circle`, `Block`
- 03: all 3 `Shape` variants (`Line · Circle · Block`) in Light and Dark
- 04: motion pulse vs reduced-motion static fill
- 08 RTL: composed card/list loading row mirrored in RTL

Component description: "Low-contrast animated placeholder (`line`, `circle`, `block`) reusing existing subtle background tokens to preview layout while content loads.. Spec: 5-mobile-components/components/skeleton/skeleton.md".

### D9 Code Connect

- File: `5-mobile-components/lib/src/components/skeleton/bw_skeleton.figma.dart`
- Mapping: D4 table. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [x] F-AC-1 Component set `Skeleton`, nested instances and layer names match D2–D3 and A2
- [x] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [x] F-AC-3 Variant count = D5
- [x] F-AC-4 Zero raw values: fills, radius, padding, gaps, sizes, text and effects bound (lint 0)
- [x] F-AC-5 Correct in Light and Dark (variable mode switch only)
- [x] F-AC-6 AR variants per D7; Arabic copy fits without truncation
- [x] F-AC-7 Component description filled; no prototype interactions on the set
- [x] F-AC-8 Values match B2–B3 one by one (redline check)
- [x] F-AC-9 Every documentation page in D8 exists, in order, built only from Doc Kit components with live instances

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | build · rtl · qa · document · review fixes (finding 8, round 3 R3-5) |
| Date | 2026-11-18 |
| Node IDs | page `181:16558` · component section `181:16559` · component set `181:16563` (3 variants) · docs section `181:27012` · pages `181:25526` (00) · `181:25584` (01) · `181:25686` (02) · `181:25978` (03) · `181:26070` (04) · `181:26168` (05) · `181:26267` (06) · `181:26492` (07) · `181:26648` (08) · `181:26715` (09) · `181:26899` (11) · Components List card `181:27311` |
| QA report | 3 variants in Set `181:16563` (`Shape = Line · Circle · Block`), 0 unbound tokens. R3-5 docs fitting fixed: all 11 doc page frames and row containers use vertical auto-layout HUG; Page 02 token code cell wrapped across lines (`size/container/xxs (320 dp)\n× 112 dp (pad size/control/height/xl)`); tile slot frames set to `clipsContent = true`; section pages arranged in clean 3-column grid with 120px inter-row gaps. Official review docs-fit check returned `{ edge: 0, spill: 0 }` across all 11 pages (0/0). Visual inspection of all screenshots (`mobile-skeleton-set.png`, `mobile-skeleton-docs.png`) confirmed zero overlap, no crossing of page boundaries or footers. Review lint: `issues: []` |

**Deviations:**
- none

**Questions for the Planner:**
- none

---

## E · Review

> One block per review round, newest first.

### E1 Summary

| Round | Date | Code verdict | Figma verdict |
|---|---|---|---|
| Round 3 | 2026-11-18 | — | Fixed (R3-5 docs fit 0/0, lint 0) |
| Round 2 | 2026-11-18 | — | Fixed (Finding 8 resolved, lint 0) |
| Round 1 | 2026-11-17 | — | Changes requested (2026-11-17-wave9-feedback-review.md) |

---

## F · Changelog

> Changes to this component on this platform. Every entry also gets one line in the root `CHANGELOG.md`.

### F0 Changes from previous version

None — first version.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-11-14 | Initial (Wave 9 Feedback brief, FB-01 … FB-07) | — | Planner (Antigravity) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-11-14 | Initial | No | — |
