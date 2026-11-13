# Stepper · مؤشر الخطوات — Mobile

> **One file for Stepper on Mobile:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- mobile stepper`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Stepper · مؤشر الخطوات |
| Summary | Shows progress through a multi-step flow (a request, onboarding, device setup): which steps are done, which one is current and what comes next. |
| Summary (ar) | يوضّح التقدّم في مسار متعدد الخطوات (طلب، تعريف، إعداد جهاز): الخطوات المكتملة والخطوة الحالية وما يليها. |
| Parts | Container · step · indicator · label · description · connector · compact header · progress |
| Parts (ar) | الحاوية · الخطوة · المؤشر · التسمية · الوصف · الخط الواصل · العنوان المختصر · شريط التقدّم |
| Platform | Mobile · Flutter + Material 3 + Cupertino (adaptive, N-07) |
| Built on | Custom Flutter widget: compact header (`Text` + Biowave linear Progress) and the vertical list; neither iOS nor Android has a native stepper |
| Import | `BwStepper`, `BwStepperCompact` from `package:biowave_mobile/biowave_mobile.dart` |
| Figma | **Biowave DS — Mobile Components** › `↳ Stepper` (page Typography mode `Mobile`) · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-11-13 |
| Plan | Finished |
| Code | Planned |
| Figma build | Built |
| Review | — |
| Source code | `lib/src/components/stepper/` — not built yet (the Executor creates it) |
| Tokens | No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly |
| Contracts | [`stepper-contract.md`](stepper-contract.md) · [`figma-stepper-contract.md`](figma-stepper-contract.md) — generated, never edited |
| Docs page | [`stepper.html`](stepper.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/stepper/stepper.md#b--spec) · [Tablet](../../../4-tablet-components/components/stepper/stepper.md#b--spec) · [Mobile](../../../5-mobile-components/components/stepper/stepper.md#b--spec) |
| Figma | `↳ Stepper` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** |
| Version | 1.0 · 2026-11-13 |

### A1 Overview

A stepper shows a flow broken into steps — "Device details › Network › Users › Review" — and where the user is in it. Done steps show a check, the current step is filled in the brand colour, and later steps are outlined. It does not replace the step's own content and buttons; it shows progress and, when allowed, lets the user go back to a finished step.

### A2 Anatomy

```
Horizontal   (✓)─────────(2)─────────( 3 )─────────( 4 )
             ①  Device    ② Network   Users          Review
                details   ③ Connect the terminal     ④ connector
Vertical     (✓) Device details
              │
             (2) Network
              │  Connect the terminal to your network      ⑤ description
             ( 3 ) Users
Mobile compact   Step 2 of 4 · Network
                 ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬──────────────────          ⑥ progress
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `indicator` | Yes | Circle with the step number, a check (done) or "!" (error) |
| 2 | `label` | Yes | The step's name |
| 3 | `description` | No | One short line under the label |
| 4 | `connector` | Yes | Line between steps; brand colour once the step before it is done |
| 5 | vertical form | — | Steps stacked, connector under each indicator |
| 6 | `progress` | Mobile compact | Linear Progress under "Step n of total" |

### A3 Usage

**When to use**
- Flows of 3–6 steps that must be done in order: device setup, a new request, onboarding
- Vertical on review screens and narrow panels; horizontal above a wide form

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Views of the same content | Tabs |
| Pages of a list | Pagination |
| A single long form | Sections with headings |
| Progress of an upload or a task | Progress |

### A4 Options

#### 4.1 `orientation`
| Value | Pick it when |
|---|---|
| `horizontal` | **Default** on Web and Tablet landscape: above the step content |
| `vertical` | Review screens, side sheets, Tablet portrait, Mobile review |
| `compact` (Mobile) | Mobile flows: "Step 2 of 4" + Progress in the top area (NV-09) |

#### 4.2 Step state
`upcoming` · `current` · `completed` · `error`

**Combination rules**
- Exactly one current step
- Completed steps can be clickable (go back); upcoming steps are not, unless the flow is non-linear

### A5 States and behavior

| State | What the user sees |
|---|---|
| Upcoming | Outlined circle with the number, grey label |
| Current | Brand-filled circle with the number, bold label |
| Completed | Brand-filled circle with a check; connector after it in brand |
| Error | Error-filled circle with "!", label in the error colour, description says what is wrong |

**Behavior rules**
- Going back to a completed step keeps what the user entered
- Labels wrap to two lines in the horizontal form; never truncate
- Arabic: steps run right to left; numbers and the check do not mirror

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| label | Noun phrase naming the step: "Network", "Review" | 20 chars |
| description | One line: "Connect the terminal to your network" | 48 chars |
| compact | "Step n of total" | — |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Device details · Network · Users · Review | تفاصيل الجهاز · الشبكة · المستخدمون · المراجعة | Step 1 · Step 2 · Step 3 |
| Step 2 of 4 | الخطوة 2 من 4 | 2/4 |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Name each step by what happens in it | Number-only steps |
| Keep 3–6 steps | Use a stepper for a two-screen flow |
| Show errors on the step that has them | Block the whole stepper for one error |

### A8 Platform notes — Mobile

| | Mobile |
|---|---|
| Forms | Compact ("Step 2 of 4" + linear Progress) at the top of each step screen (NV-09); vertical on the review screen |
| Native | Neither iOS nor Android has a stepper; one Biowave design on both OSs |
| Back | The top app bar back button goes to the previous step |

### A9 Accessibility (design)

- Each step is announced with its position and state ("Network, step 2 of 4, current")
- Done and error are shown by an icon, not only colour
- The compact form's progress has a text equivalent ("Step 2 of 4")

### A10 Related components

- Progress — the compact form's bar
- [Tabs](../tabs/tabs.md#a--guidelines) — views, not steps
- [Top app bar](../top-app-bar/top-app-bar.md#a--guidelines) — Mobile compact sits under it

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### BwStepperCompact
| Parameter | Type | Default | Required | Description |
|---|---|---|---|---|
| `current` · `count` | `int` | — | ✓ | "Step current of count" |
| `title` | `String` | — | ✓ | The current step's label |

#### BwStepper (vertical)
| Parameter | Type | Default | Required | Description |
|---|---|---|---|---|
| `steps` | `List<BwStep>` (`label`, `description?`, `state`) | — | ✓ | |
| `onStepTapped` | `ValueChanged<int>?` | — | | Completed steps only |

**Invalid combinations** (`assert` in debug):
| Combination | Fallback |
|---|---|
| no current step / more than one | the first not-completed step is current |
| fewer than 2 steps | renders, warns |

### B2 Dimensions

| Part | Property | Token |
|---|---|---|
| indicator | size · radius | `size-icon-xl` · `radius-full` |
| indicator | number text · icon | `label-md` · `check` / `priority_high` `size-icon-sm` |
| label · description | text style | `label-lg` · `body-sm` |
| step (horizontal) | gap indicator–text · padding-inline | `spacing-md` · `spacing-md` |
| connector (horizontal) | thickness · min length · margin | `border-width-strong` · `spacing-3xl` · `spacing-md` each side |
| step (vertical) | gap indicator–text · gap between steps | `spacing-lg` · `spacing-md` (connector fills it) |
| connector (vertical) | thickness · margin | `border-width-strong` · `spacing-xs` above and below |
| compact | step text · title · gap | `label-md` · `title-lg` · `spacing-xs` |
| compact | progress | Progress `linear` `md`, full width, `spacing-md` below the title |

### B3 Tokens by part and state

Every value is a semantic token; there is no `stepper.tokens.json`.

| Part | Property | Upcoming | Current | Completed | Error |
|---|---|---|---|---|---|
| indicator | fill | `color-background-transparent-default` | `color-background-brand-default` | `color-background-brand-default` | `color-background-error-default` |
| indicator | border | `border-width-strong` `color-border-bold` | — | — | — |
| indicator | number · icon | `color-text-subtle` | `color-text-on-brand` | `color-icon-on-brand` | `color-icon-on-error` |
| label | colour · weight | `color-text-subtle` | `color-text-default` (`title-md`) | `color-text-default` | `color-text-role-error` |
| description | colour | `color-text-subtlest` | `color-text-subtlest` | `color-text-subtlest` | `color-text-role-error` |
| connector after | colour | `color-border-subtle` | `color-border-subtle` | `color-border-brand` | `color-border-subtle` |

Contrast (light): number `color-text-on-brand` on `color-background-brand-default` ≥ 12:1 · upcoming outline `color-border-bold` 4.95:1 · label `color-text-subtle` 14.55:1. Dark theme: same tokens.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Current → Completed | step finished | fill stays, number → check; connector colours in | `motion-duration-md` | `motion-easing-standard` |
| Upcoming → Current | next step | outline → fill | `motion-duration-md` | `motion-easing-standard` |

Reduced motion: instant.

### B5 RTL

| Part | In RTL |
|---|---|
| order | Reverses: the first step is on the right (horizontal); vertical keeps top-to-bottom with the indicator on the right |
| icons · numbers | Do not mirror |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | Semantics per step: "label, step n of total, state" |
| Error | Description is the error message, linked to the step |
| Compact | Progress has `Semantics(value: "Step 2 of 4")` |

### B7 Examples

See the docs pages 03 and 07.

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: B2–B3 tokens
- [ ] Exactly one current step; completed steps show a check
- [ ] Error state shows "!" and the message
- [ ] RTL reverses the horizontal order
- [ ] No raw values

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `stepper-contract.md`.

> Written by the Planner (Claude). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · 2026-11-13 |

### C1 Goal

The Mobile Stepper matches B1–B6 and passes B9 and C6.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- The step screens' content and buttons
- Progress (its own spec)

### C3 Approach

- **Compact:** `Column(Text('Step n of total'), Text(title), BwProgress.linear(value: n / total))`.
- **Vertical:** as Tablet's vertical form.

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
5-mobile-components/lib/src/components/stepper/bw_stepper.dart   new
5-mobile-components/test/stepper_test.dart · goldens
5-mobile-components/lib/biowave_mobile.dart   change: export
5-mobile-components/README.md · CHANGELOG.md
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Tapping a completed step calls the handler; upcoming steps do not
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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-stepper-contract.md`.

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Mobile set in **Biowave DS — Mobile Components**.

| Field | Value |
|---|---|
| Component | Stepper |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) — never the Foundations file |
| Page / section | `↳ Stepper` › sections `Stepper` and `Stepper — Documentation` |
| Mode | **Create new.** Legacy Mobile `_Top app bar` (Progress) is the compact form source; it stays untouched |
| Depends on | Progress set (`.Progress _en` / `_ar`) in this file |
| Plan version | 1 · 2026-11-13 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `figma-read-tokens.js` lint must report 0.
- **Typography mode:** on page `↳ Stepper` set the explicit variable mode **`Mobile · EN`** of `5. Typography` (Arabic variants and examples: **`Mobile · AR`**).
- Nested parts are instances of the sets already in this file (Button, Icon Button, Divider) — never detached, never redrawn.

### D2 Component structure

```
❖ Stepper                        ← set: Form = Compact · Vertical × Language = EN · AR
  └─ ❖ .Step                      ← private set: State = Upcoming · Current · Completed · Error × Direction = LTR · RTL (vertical step)
```

### D3 Layer tree and auto layout

```
Stepper (Compact)          ↕ gap spacing/xs · width 360 sample · padding spacing/xl
├── T "Step 2 of 4"        label/md · color/text/subtle
├── T "Network"            title/lg
└── ◇ Progress linear md   full width, 50 %
Stepper (Vertical)         ↕ ◇ .Step × 4 (last without connector)
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Form` | VARIANT | `Compact` · `Vertical` | `Compact` | component | |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `.Step` › `Label` · `Description` · `Number` | TEXT | | | `steps[]` | |
| `.Step` › `Show description` · `Connector` | BOOLEAN | | `true` | | |

### D5 Variants to generate

- `Stepper`: Form × Language = **4**; `.Step`: State × Direction = **8**

### D6 States, interactions and motion

No prototype interactions on the set. Hover, press, focus and the page change are shown on doc page 04 with B4 timings written next to them.

### D7 RTL

`Language=AR` variants: Typography mode `Mobile · AR`, auto layout direction from the text, layout per B5; Arabic copy from A6. Steps in reverse order (horizontal); `.Step` `Direction=RTL` puts the indicator on the right of the text; check, "!" and numbers do not mirror.

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Stepper — Documentation`, frames `Stepper / 00 Component sheet` … `Stepper / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Stepper:
- 01: compact under the top app bar on a phone frame
- 03: compact · vertical review · error step
- 07: iPhone and Android (same design)
- 05 Usage: the A7 pairs, built with live instances

Component description: "Shows progress through a multi-step flow (a request, onboarding, device setup): which steps are done, which one is current and what comes next. Spec: 5-mobile-components/components/stepper/stepper.md".

### D9 Code Connect

- File: `5-mobile-components/lib/src/components/stepper/bw_stepper.figma.dart`
- Mapping: D4. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Stepper`, private components and layer names match D2–D3 and A2
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
| Node IDs | page `160:33` · `Stepper` `160:216` (4: Form × Language) · `.Step` `160:123` (8) · docs `161:2897` · card row `151:8569` |
| QA report | Unbound fills, strokes, padding and gaps: 0 · no local styles · page Typography mode set to the platform |

**Deviations:**
- Vertical steps: text padding-bottom `spacing-3xl` so the connector reads between indicators (B2 said the gap is filled by the connector)
- Compact uses `.Progress _en` / `_ar` (linear, md, determinate) at its sample value

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
