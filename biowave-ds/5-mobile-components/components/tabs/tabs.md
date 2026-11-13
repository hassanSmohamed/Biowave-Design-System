# Tabs · علامات التبويب — Mobile

> **One file for Tabs on Mobile:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- mobile tabs`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Tabs · علامات التبويب |
| Summary | Switches between views of the same content on one screen (Overview, Devices, Logs…) without leaving the page. |
| Summary (ar) | تبديل بين عروض المحتوى نفسه في الشاشة نفسها (نظرة عامة، الأجهزة، السجلات…) دون مغادرة الصفحة. |
| Parts | Container · tab · label · icon · badge · indicator · divider |
| Parts (ar) | الحاوية · علامة التبويب · التسمية · الأيقونة · الشارة · المؤشر · الخط الفاصل |
| Platform | Mobile · Flutter + Material 3 + Cupertino (adaptive, N-07) |
| Built on | Flutter adaptive (N-07): iOS → `CupertinoSlidingSegmentedControl` (iOS and iPadOS 27 Segmented Control look) for 2–4 views; Android → M3 `TabBar` (fixed, or scrollable above 4) |
| Import | `BwTabs`, `BwTab` from `package:biowave_mobile/biowave_mobile.dart` |
| Figma | **Biowave DS — Mobile Components** › `↳ Tabs` (page Typography mode `Mobile`) · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-11-13 |
| Plan | Finished |
| Code | Planned |
| Figma build | Built |
| Review | — |
| Source code | `lib/src/components/tabs/` — not built yet (the Executor creates it) |
| Tokens | No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly |
| Contracts | [`tabs-contract.md`](tabs-contract.md) · [`figma-tabs-contract.md`](figma-tabs-contract.md) — generated, never edited |
| Docs page | [`tabs.html`](tabs.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/tabs/tabs.md#b--spec) · [Tablet](../../../4-tablet-components/components/tabs/tabs.md#b--spec) · [Mobile](../../../5-mobile-components/components/tabs/tabs.md#b--spec) |
| Figma | `↳ Tabs` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** (`OS=iOS · Android`) |
| Version | 1.0 · 2026-11-13 |

### A1 Overview

Tabs split one screen into views of the same object — a device's Overview, Users, Logs and Settings — and let the user switch without leaving the page. The selected tab is marked with a brand underline (Primary) or a selected chip (Secondary). On Mobile they take each OS's form: the iOS segmented control and M3 tabs on Android.

### A2 Anatomy

```
Primary
  Overview    Users    Logs ③    Settings
  ‾‾‾‾‾‾‾‾                                       ④ indicator under the selected tab
─────────────────────────────────────────────    ⑤ divider
    ①           ②

Secondary                                        Mobile iOS (segmented control)
 (Overview)  Users   Logs                        ( [Overview] |  Users  |  Logs )
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `tab` | Yes | One view; the whole tab is the target |
| 2 | `label` | Yes | The view's name |
| 3 | `badge` | No | Count or dot for new items in that view |
| 4 | `indicator` | Yes | Marks the selected tab: underline (Primary, Android) · chip (Secondary) · raised segment (iOS) |
| 5 | `divider` | Primary | Line under the tab row |
| — | `icon` | No | Leading icon (Web, Tablet); all tabs or none |

### A3 Usage

**When to use**
- 2–7 views of the same object or list, all at the same level
- Primary for the main views of a page; Secondary for a lighter, second row of filters inside a view

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Moving between sections of the product | Primary navigation |
| Choosing a value in a form | Segmented button or Radio |
| Steps of a flow | Stepper |
| Filtering a list by several values at once | Chips |

### A4 Options

#### 4.1 `variant`
| Value | Looks like | Pick it when |
|---|---|---|
| `primary` | Labels on a divider, brand underline under the selected one | **Default.** The main views of a page |
| `secondary` | Pill chips, the selected one filled | A second level inside a view, or tabs inside a card |

#### 4.2 Layout
| Value | Pick it when |
|---|---|
| `fixed` | All tabs fit (Mobile Android: equal widths) |
| `scrollable` | More tabs than fit; the row scrolls sideways and the selected tab scrolls into view |

#### 4.3 `icon` · `badge`
Icons on all tabs or none. A Badge shows a count of new items in that view (99+).

**Combination rules**
- Never two rows of Primary tabs; the second row is Secondary
- Mobile iOS: 2–4 views use the segmented control; more than 4 use scrollable tabs (NV-07)

### A5 States and behavior

| State | What the user sees |
|---|---|
| Default | Grey label |
| Hovered | Light fill behind the tab, darker label |
| Pressed | Darker fill |
| Focused | Focus ring around the tab |
| Selected | Brand label and the indicator |
| Disabled | Faded label; not focusable |

**Behavior rules**
- Selecting a tab swaps the content below at once; the page does not scroll to the top
- Labels never wrap or truncate; if they do not fit, the row scrolls
- Arabic: the order reverses (first tab on the right); icons do not mirror

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| label | One or two words, a noun: "Overview", "Access logs" | 16 chars |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Overview · Users · Logs | نظرة عامة · المستخدمون · السجلات | View overview · Manage users |
| Settings | الإعدادات | Click for settings |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Keep tabs to views of the same object | Use tabs as the app navigation |
| Keep labels short and parallel | Mix icons on some tabs only |
| Use Secondary for a second level | Stack two rows of Primary tabs |

### A8 Platform notes — Mobile

| | iOS | Android |
|---|---|---|
| Form | iOS and iPadOS 27 Segmented Control (2–4 views): grey capsule track, selected segment raised | M3 primary tabs: fixed equal widths, brand underline under the label; scrollable above 4 |
| Size | `size-control-height-sm` segments in a capsule | `size-control-height-lg` |
| More than 4 views | Scrollable tabs (as Android) | Scrollable tabs |

### A9 Accessibility (design)

- The selected tab is shown by more than colour (indicator or raised segment)
- Each tab is announced with its position ("Users, tab, 2 of 4")
- Badges are part of the tab's name ("Logs, 3 new")

### A10 Related components

- [Badge](../badge/badge.md#a--guidelines) — counts on tabs
- [Top app bar](../top-app-bar/top-app-bar.md#a--guidelines) — tabs sit right under it on Tablet and Mobile
- [Primary navigation](../primary-navigation/primary-navigation.md#a--guidelines) — sections; tabs are views inside one page

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### BwTabs
| Parameter | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `tabs` | `List<BwTab>` (`label`, `badgeCount?`) | 2–7 | — | ✓ | `tab` |
| `selectedIndex` | `int` | | `0` | | Selected tab |
| `onChanged` | `ValueChanged<int>` | | — | ✓ | |
| `scrollable` | `bool?` | | auto (`tabs.length > 4`) | | Forces the scrollable form on both OSs |

**Invalid combinations** (`assert` in debug):
| Combination | Fallback |
|---|---|
| fewer than 2 tabs | assert |
| `badgeCount` on iOS segments | ignored (the segmented control has no badge) |

### B2 Dimensions

| Part | Property | iOS (segmented control) | Android (M3 tabs) |
|---|---|---|---|
| container | height · padding · gap | `size-control-height-sm` · `spacing-xxs` · `spacing-xs` | `size-control-height-lg` · none · none |
| container | radius · fill | `radius-full` · `color-background-neutral-default` | none · `color-surface-default` |
| tab | width | equal (fill) | equal (fill); scrollable: hug with `spacing-xl` padding |
| tab | radius | `radius-full` | none |
| label | text style | `label-md` | `label-lg` |
| indicator | | selected segment: `color-surface-raised` + `elevation-2` | underline under the label: height `border-width-strong`, label width, top corners `radius-xxs`, `color-border-brand` |
| divider | | — | `border-width-default` `color-border-subtle` |

### B3 Tokens by part and state

Every value is a semantic token; there is no `tabs.tokens.json`. Nested Badge and Icon carry their own.

| Part | Property | Default | Selected | Pressed |
|---|---|---|---|---|
| label (iOS) | colour | `color-text-subtle` | `color-text-default` | `color-text-default` |
| label (Android) | colour | `color-text-subtle` | `color-text-role-brand` | `color-text-default` |
| tab (Android) | fill | `color-background-transparent-default` | same | `color-background-transparent-pressed` |

Contrast (light): `color-text-subtle` on `color-surface-default` 14.55:1 · `color-text-role-brand` on `color-surface-default` 14.87:1 · on `color-background-selected-default` 12.54:1 · iOS `color-text-subtle` on `color-background-neutral-default` 12.43:1. Dark theme: same tokens.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hovered / Pressed | pointer / tap | fill, label colour | `motion-duration-sm` | `motion-easing-standard` |
| Tab A → Tab B | select | indicator slides to the new tab (iOS: the raised segment slides) | `motion-duration-md` | `motion-easing-standard` |

Reduced motion: the indicator jumps without sliding.

### B5 RTL

| Part | In RTL |
|---|---|
| order | Reverses: first tab on the right |
| indicator | Moves with the tab |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | iOS: segmented control (`Semantics(inMutuallyExclusiveGroup)`), Android: `TabBar` tabs |
| Selected | `Semantics(selected: true)` |
| Target size | `target-min` (48) per tab |
| Badge | Included in the tab's label: "Logs, 3 new" |

### B7 Examples

See the docs pages 03 and 07.

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: B2–B3 tokens
- [ ] Selecting a tab calls the handler and moves the indicator
- [ ] RTL reverses the order
- [ ] Tabs that do not fit scroll; the selected tab scrolls into view
- [ ] No raw values

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `tabs-contract.md`.

> Written by the Planner (Claude). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · 2026-11-13 |

### C1 Goal

The Mobile Tabs matches B1–B6 and passes B9 and C6.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- The tab panels' content
- Pagination, Stepper (next in the navigation family)

### C3 Approach

- **Base (N-07):** iOS and ≤ 4 tabs → `CupertinoSlidingSegmentedControl` themed (track `color-background-neutral-default`, thumb `color-surface-raised`); if the Flutter version draws the pre-iOS 26 look, keep it and report (O-07). Otherwise → M3 `TabBar` (fixed, or `isScrollable` above 4).

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
5-mobile-components/lib/src/components/tabs/bw_tabs.dart   new
5-mobile-components/test/tabs_test.dart · goldens (iOS + Android)
5-mobile-components/lib/biowave_mobile.dart   change: export
5-mobile-components/README.md · CHANGELOG.md
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Disabled tabs are skipped by the keyboard and not selectable
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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-tabs-contract.md`.

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Mobile set in **Biowave DS — Mobile Components**.

| Field | Value |
|---|---|
| Component | Tabs |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) — never the Foundations file |
| Page / section | `↳ Tabs` › sections `Tabs` and `Tabs — Documentation` |
| Mode | **Create new.** Foundations `↳ Tabs` (`Tab` On · Off, `Tabs` 2–8 tabs, `Tabs Chips`) is the content source; it stays untouched; iOS and iPadOS 27 `Segmented Control` and M3 `Tabs` measured as references |
| Depends on | Badge and Icon (Material Symbols) in this file |
| Plan version | 1 · 2026-11-13 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `figma-read-tokens.js` lint must report 0.
- **Typography mode:** on page `↳ Tabs` set the explicit variable mode **`Mobile · EN`** of `5. Typography` (Arabic variants and examples: **`Mobile · AR`**).
- Nested parts are instances of the sets already in this file (Badge, Icon) — never detached, never redrawn.

### D2 Component structure

```
❖ Tabs                           ← set: OS = iOS · Android × Language = EN · AR (BOOLEAN Tab 4)
  └─ ❖ .Tab                       ← private set: OS = iOS · Android × Selected = true · false (TEXT Label)
```

### D3 Layer tree and auto layout

```
Tabs (iOS)                 ↔ capsule · height size/control/height/sm · padding spacing/xxs · gap spacing/xs · radius/full · fill color/background/neutral/default · width 360 − 2 × spacing/xl sample
└── ◇ .Tab × 3–4           fill (equal) · radius/full · T label/md · selected: fill color/surface/raised + Elevation/2
Tabs (Android)             ↔ height size/control/height/lg · fill color/surface/default · stroke bottom color/border/subtle · width 360 sample
└── ◇ .Tab × 3–4           fill (equal) · T label/lg · selected: underline border/width/strong color/border/brand (label width)
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `OS` | VARIANT | `iOS` · `Android` | `iOS` | — | `Theme.platform` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Tab 4` | BOOLEAN | | `false` | `tabs.length` | |
| `.Tab` › `Label` | TEXT | | `Overview` | `tabs[].label` | |

### D5 Variants to generate

- `Tabs`: OS × Language = **4**; `.Tab`: OS × Selected = **4**

### D6 States, interactions and motion

No prototype interactions on the set. Hover, press, focus and the indicator moving between tabs are shown on doc page 04 with B4 timings written next to them.

### D7 RTL

`Language=AR` variants: Typography mode `Mobile · AR`, auto layout direction from the text, layout per B5; Arabic copy from A6. Tabs in reverse order; glyphs do not mirror.

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Tabs — Documentation`, frames `Tabs / 00 Component sheet` … `Tabs / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Tabs:
- 01: iOS segmented control and Android tabs under the top app bar on phone frames
- 03: 2 · 3 · 4 views; scrollable (more than 4)
- 07: iPhone and Android side by side
- 05 Usage: the A7 pairs, built with live instances

Component description: "Switches between views of the same content on one screen (Overview, Devices, Logs…) without leaving the page. Spec: 5-mobile-components/components/tabs/tabs.md".

### D9 Code Connect

- File: `5-mobile-components/lib/src/components/tabs/bw_tabs.figma.dart`
- Mapping: D4. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Tabs`, private components and layer names match D2–D3 and A2
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
| Node IDs | page `155:2` · `Tabs` `155:69` (4: OS × Language) · `.Tab` `155:16` (OS × Selected) · docs `156:2853` (00–09, 11) · card row `151:8569` |
| QA report | Unbound fills, strokes, padding and gaps: 0 · no local styles · page Typography mode set to the platform |

**Deviations:**
- iOS from the iOS and iPadOS 27 Segmented Control (track padding 2, gap 4, raised selected segment); Android from M3 primary tabs (indicator `border-width-strong` instead of 3 dp — no 3 px token)
- Scrollable tabs (more than 4 views) are documented, not a separate variant

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
