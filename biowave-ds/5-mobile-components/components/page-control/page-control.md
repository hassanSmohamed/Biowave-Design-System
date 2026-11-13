# Page control · مؤشر الصفحات — Mobile

> **One file for Page control on Mobile:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- mobile page-control`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Page control · مؤشر الصفحات |
| Summary | Dots that show which page of a short carousel or onboarding is on screen; tapping a dot goes to that page. |
| Summary (ar) | نقاط توضّح أي صفحة معروضة في عرض دوّار قصير أو في التعريف بالتطبيق؛ والنقر على نقطة ينقل إلى صفحتها. |
| Parts | Container · dot · current dot · platter (iOS) |
| Parts (ar) | الحاوية · النقطة · النقطة الحالية · الخلفية (iOS) |
| Platform | Mobile · Flutter + Material 3 + Cupertino (adaptive, N-07) |
| Built on | Flutter adaptive (N-07): iOS → iOS and iPadOS 27 Page Control look (custom, `CupertinoPageControl`-style platter); Android → Biowave dots (M3 has no page control) |
| Import | `BwPageControl` from `package:biowave_mobile/biowave_mobile.dart` |
| Figma | **Biowave DS — Mobile Components** › `↳ Page control` (page Typography mode `Mobile`) · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-11-13 |
| Plan | Finished |
| Code | Planned |
| Figma build | Built |
| Review | — |
| Source code | `lib/src/components/page-control/` — not built yet (the Executor creates it) |
| Tokens | No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly |
| Contracts | [`page-control-contract.md`](page-control-contract.md) · [`figma-page-control-contract.md`](figma-page-control-contract.md) — generated, never edited |
| Docs page | [`page-control.html`](page-control.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/page-control/page-control.md#b--spec) · [Tablet](../../../4-tablet-components/components/page-control/page-control.md#b--spec) · [Mobile](../../../5-mobile-components/components/page-control/page-control.md#b--spec) |
| Figma | `↳ Page control` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** (`OS=iOS · Android`) |
| Version | 1.0 · 2026-11-13 |

### A1 Overview

A page control is a row of dots under a short carousel or onboarding flow. Each dot is a page; the current one is longer and in the brand colour. It shows how many pages there are and where the user is; tapping a dot jumps to it. On iOS it takes the iOS and iPadOS 27 Page Control form.

### A2 Anatomy

```
●  ━━━  ●  ●  ●          Biowave (Web, Tablet, Android)
①   ②                     ① dot · ② current dot (elongated)
( ●  ●  ●  ●  ● )        iOS 27 — dots on a capsule platter ③
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `dot` | Yes | One page |
| 2 | `current` | Yes | The page on screen |
| 3 | `platter` | iOS | Capsule behind the dots |

### A3 Usage

**When to use**
- Carousels and onboarding with 2–7 pages, swiped or stepped through

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Lists and tables | Pagination (Web, Tablet) · load more (Mobile) |
| Steps the user must complete in order | Stepper |
| More than 7 pages | Pagination or a counter ("3 of 12") |

### A4 Options

#### 4.1 Number of pages
2–7 dots. Above 7, iOS shrinks the outer dots; Biowave shows a counter instead.

**Combination rules**
- One page control per carousel, centred under it

### A5 States and behavior

| State | What the user sees |
|---|---|
| Default dot | Small neutral dot |
| Current | Elongated brand dot (iOS: opaque dot) |
| Focused (keyboard) | Focus ring around the row |

**Behavior rules**
- Swiping the carousel moves the current dot; tapping a dot goes to that page
- Arabic: the first page is on the right

### A6 Content

No text. The accessible name says the position: "Page 2 of 5".

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Page 2 of 5 | الصفحة 2 من 5 | Dot 2 |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Centre the dots under the carousel | Use dots for a long list |
| Keep 2–7 pages | Use dots as the only way to move (keep swipe and arrows) |

### A8 Platform notes — Mobile

| | iOS | Android |
|---|---|---|
| Form | iOS and iPadOS 27 Page Control: dots on a capsule platter, current dot opaque | Biowave dots (M3 has no page control): elongated brand current dot |
| Touch | Tap left / right of the current dot to step; drag along the control to scrub | Tap a dot |

### A9 Accessibility (design)

- The control is announced as "Page 2 of 5" and is adjustable (swipe up / down with a screen reader)
- The current dot differs by size or opacity, not only colour

### A10 Related components

- Pagination — pages of lists and tables (Web, Tablet)
- Stepper — steps of a flow

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

| Parameter | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `count` | `int` | 2–7 | — | ✓ | Pages |
| `current` | `int` | 0 … count − 1 | — | ✓ | |
| `onChange` | `ValueChanged<int>` | | — | | Tap / click on a dot |

### B2 Dimensions

Dot sizes use spacing tokens: there is no size token for 8 (`size-icon-*` starts at 12). Reported in C4.

| Part | Property | iOS | Android |
|---|---|---|---|
| platter | padding · radius · fill | `spacing-lg` / `spacing-md` · `radius-full` · `color-background-neutral-default` | — |
| dot | size · gap | `spacing-md` · `spacing-md` | `spacing-md` · `spacing-md` |
| current | size | `spacing-md` (same size, opaque) | width `spacing-3xl`, height `spacing-md` |
| dot | radius | `radius-full` | `radius-full` |

### B3 Tokens by part and state

| Part | iOS | Android |
|---|---|---|
| dot | `color-border-bold` | `color-border-bold` |
| current | `color-icon-default` | `color-background-brand-default` |

Contrast (light, non-text): dot `color-border-bold` 4.95:1 on `color-surface-default` (4.23:1 on the iOS platter) · current `color-background-brand-default` 12.85:1 · iOS current `color-icon-default` 16.91:1 on the platter. Focus ring: `border-width-focus` · `color-border-focus` around the row. Dark theme: same tokens.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Page n → m | swipe / tap | current dot width and colour move to the new dot | `motion-duration-md` | `motion-easing-standard` |

Reduced motion: instant.

### B5 RTL

| Part | In RTL |
|---|---|
| order | Reverses: the first page is the right-most dot |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | One adjustable `Semantics` node: value "Page 2 of 5", increase / decrease |
| Target size | `target-min` |

### B7 Examples

See the docs pages 03 and 07.

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: B2–B3 tokens
- [ ] Tapping a dot calls `onChange`; the current dot moves
- [ ] RTL reverses the order
- [ ] No raw values

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `page-control-contract.md`.

> Written by the Planner (Claude). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · 2026-11-13 |

### C1 Goal

The Mobile Page control matches B1–B6 and passes B9 and C6.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- The carousel itself
- Pagination, Stepper

### C3 Approach

- **Base (N-07):** iOS → custom platter + dots (iOS 27 look; Flutter has no Cupertino page control); Android → Biowave dots as Tablet.

### C4 Token gaps

Dot sizes use `spacing-md` / `spacing-3xl` because there is no size token below 12 (`size-icon-xs`). Proposal for Foundations: `size-indicator-sm` 8 · `size-indicator-lg` 24. Until then the spacing tokens are used.

### C5 Files to create / change

```
5-mobile-components/lib/src/components/page_control/bw_page_control.dart   new
5-mobile-components/test/page_control_test.dart · goldens
5-mobile-components/lib/biowave_mobile.dart   change: export
5-mobile-components/README.md · CHANGELOG.md
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Semantics value updates on page change
- [ ] Earlier tests still pass

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6 (focus in, trap, return; dismiss rules)
- [ ] AC-5 Tests in B9 and C6 exist and pass; `cd 5-mobile-components && flutter analyze && flutter test`, `npm run docs:check` pass
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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-page-control-contract.md`.

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Mobile set in **Biowave DS — Mobile Components**.

| Field | Value |
|---|---|
| Component | Page control |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) — never the Foundations file |
| Page / section | `↳ Page control` › sections `Page control` and `Page control — Documentation` |
| Mode | **Create new.** iOS and iPadOS 27 `Page Control` measured as the iOS reference |
| Depends on | none |
| Plan version | 1 · 2026-11-13 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `figma-read-tokens.js` lint must report 0.
- **Typography mode:** on page `↳ Page control` set the explicit variable mode **`Mobile · EN`** of `5. Typography` (Arabic variants and examples: **`Mobile · AR`**).
- Nested parts are instances of the sets already in this file (Button, Icon Button, Divider) — never detached, never redrawn.

### D2 Component structure

```
❖ Page control                   ← set: OS = iOS · Android × Pages = 3 · 5 × Language = EN · AR
  └─ ❖ .Dot                       ← private set: OS × Current = true · false
```

### D3 Layer tree and auto layout

```
Page control (iOS)         ↔ platter padding spacing/lg · spacing/md · radius/full · fill color/background/neutral/default · gap spacing/md
└── ◇ .Dot × n             spacing/md square · radius/full · current color/icon/default · other color/border/bold
Page control (Android)     ↔ gap spacing/md
└── ◇ .Dot × n             spacing/md · current width spacing/3xl color/background/brand/default
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `OS` | VARIANT | `iOS` · `Android` | `iOS` | — | platform |
| `Pages` | VARIANT | `3` · `5` | `5` | `count` | |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | order |

### D5 Variants to generate

- `Page control`: OS × Pages × Language = **8**; `.Dot`: **4**

### D6 States, interactions and motion

No prototype interactions on the set. Hover, press, focus and the page change are shown on doc page 04 with B4 timings written next to them.

### D7 RTL

`Language=AR` variants: Typography mode `Mobile · AR`, auto layout direction from the text, layout per B5; Arabic copy from A6. Dots in reverse order (the current dot is the second from the right).

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Page control — Documentation`, frames `Page control / 00 Component sheet` … `Page control / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Page control:
- 01: onboarding on iPhone and Android with the control under the content
- 03: 3 · 5 pages; current first / middle
- 07: iPhone and Android
- 05 Usage: the A7 pairs, built with live instances

Component description: "Dots that show which page of a short carousel or onboarding is on screen; tapping a dot goes to that page. Spec: 5-mobile-components/components/page-control/page-control.md".

### D9 Code Connect

- File: `5-mobile-components/lib/src/components/page_control/bw_page_control.figma.dart`
- Mapping: D4. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Page control`, private components and layer names match D2–D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant count = D5
- [ ] F-AC-4 Zero raw values: fills, radius, padding, gaps, widths, text and effects bound (lint 0)
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only)
- [ ] F-AC-6 AR variants per D7; Arabic copy fits without truncation
- [ ] F-AC-7 Component description filled; no prototype interactions on the set
- [ ] F-AC-8 Values match B2–B3 one by one (redline check)
- [ ] F-AC-9 Every documentation page in D8 exists, in order, built only from Doc Kit components with live instances

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | Claude · build · rtl · qa · document |
| Date | 2026-11-13 |
| Node IDs | page `158:2` · `Page control` `158:49` (8: OS × Pages × Language) · `.Dot` `158:8` (OS × Current) · docs `158:1910` · card row `151:8569` |
| QA report | Unbound fills, strokes, padding and gaps: 0 · no local styles · page Typography mode set to the platform |

**Deviations:**
- Inactive dots use `color-border-bold` (4.95:1): `color-border-default` was 1.38:1, below the 3:1 non-text minimum
- Dot sizes are bound to `spacing-md` / `spacing-3xl` (no size token below 12; C4 proposal)
- iOS from the iOS and iPadOS 27 Page Control (8 dots, gap 8, platter 12 / 8); the platter is `color-background-neutral-default` instead of the glass material

**Questions for the Planner:**
- none

---

## E · Review

> One block per review round, newest first.

### E1 Summary

| Round | Date | Code verdict | Figma verdict |
|---|---|---|---|
| — | — | not reviewed | not reviewed |

---

## F · Changelog

> Changes to this component on this platform. Every entry also gets one line in the root `CHANGELOG.md`.

### F0 Changes from previous version

None — first version.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-11-13 | Initial (navigation brief, NV-01 … NV-13) | — | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-11-13 | Initial | No | — |
