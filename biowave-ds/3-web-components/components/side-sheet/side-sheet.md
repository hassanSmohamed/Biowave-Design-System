# Side sheet · اللوحة الجانبية — Web

> **One file for Side sheet on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web side-sheet`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Side sheet · اللوحة الجانبية |
| Summary | A panel that slides in from the side of the window to show details or a longer task while the page stays in view. |
| Summary (ar) | لوحة تنزلق من جانب النافذة لعرض التفاصيل أو مهمة أطول مع بقاء الصفحة ظاهرة. |
| Parts | Scrim · container · header · back button · title · close button · body · footer |
| Parts (ar) | الطبقة المعتمة · الحاوية · الرأس · زر الرجوع · العنوان · زر الإغلاق · المحتوى · التذييل |
| Platform | Web · React + MUI |
| Built on | MUI `Drawer` (`variant="temporary"` for modal, `"persistent"` for standard; portal, focus trap, `Slide` transition), styled from semantic tokens |
| Import | `import { SideSheet } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Side sheet` · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-11-13 |
| Plan | Finished |
| Code | Planned |
| Figma build | Planned |
| Review | — |
| Source code | `src/components/side-sheet/` — not built yet (the Executor creates it) |
| Tokens | No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly |
| Contracts | [`side-sheet-contract.md`](side-sheet-contract.md) · [`figma-side-sheet-contract.md`](figma-side-sheet-contract.md) — generated, never edited |
| Docs page | [`side-sheet.html`](side-sheet.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/side-sheet/side-sheet.md#b--spec) · [Tablet](../../../4-tablet-components/components/side-sheet/side-sheet.md#b--spec) — not on Mobile (use a [Bottom sheet](../../../5-mobile-components/components/bottom-sheet/bottom-sheet.md#a--guidelines) or a full screen) |
| Figma | `↳ Side sheet` in **Biowave DS — Web Components** · **Tablet Components** |
| Version | 1.0 · 2026-11-13 |

### A1 Overview

A side sheet is a panel that slides in from the end of the window (the right in English, the left in Arabic) and floats above the page with a small gap from the edge. It shows the details of something on the page or holds a task that is too long for a dialog — edit a device, set up an integration, review a request — while the page stays visible behind it. It replaces the legacy Slide Out Panel.

### A2 Anatomy

```
┌──────────────────────────────────────┬──────────────────────────┐
│ page (dimmed by ① scrim)             │ ②┌─────────────────────┐ │
│                                      │  │③④[←] ⑤Edit device ⑥[✕]│ │
│                                      │  │ ⑦ body: banner,      │ │
│                                      │  │   sections, fields   │ │
│                                      │  │                      │ │
│                                      │  │ ⑧[      Save       ] │ │
│                                      │  └─────────────────────┘ │
└──────────────────────────────────────┴──────────────────────────┘
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `scrim` | Modal only | Dims the page and closes the sheet on click or tap |
| 2 | `container` | Yes | Raised surface, inset from the window edge, all corners rounded |
| 3 | `header` | Yes | Holds the back button, title and close button; stays at the top |
| 4 | `back-button` | No | Goes back one level when the sheet has more than one view |
| 5 | `title` | Yes | What the sheet is about: "Edit device", "Request details" |
| 6 | `close-button` | Yes | Closes the sheet |
| 7 | `body` | Yes | The content; scrolls under the header and above the footer |
| 8 | `footer` | No | The main action full width, or a Button group (Cancel + Save); stays at the bottom |

### A3 Usage

**When to use**
- Show the details of a row or a card without leaving the list (request details, a member's profile)
- Edit or create something with more fields than a dialog holds (edit device, integration setup)
- Filters with many groups on Web and Tablet

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| A yes / no decision | [Dialog](../../../3-web-components/components/dialog/dialog.md#a--guidelines) |
| Choices on a touch phone | [Bottom sheet](../../../5-mobile-components/components/bottom-sheet/bottom-sheet.md#a--guidelines) |
| App navigation | Navigation drawer (Primary navigation) |
| A whole workflow with many steps | A page |

### A4 Options

#### 4.1 `size`
| Value | Pick it when |
|---|---|
| `sm` | Details and short forms |
| `md` | **Default.** Edit forms, request details, filters |
| `lg` | Content that needs width: a small table, two columns of fields, a preview |

#### 4.2 `mode`
| Value | Looks like | Pick it when |
|---|---|---|
| `modal` | floating over a dimmed page | **Default.** The user works only in the sheet until it closes |
| `standard` | attached beside the page, which narrows to make room | Web only, wide windows: the user compares the sheet with the page (a details panel next to a table) |

#### 4.3 `back-button`
Off by default. Turn it on when the sheet shows a second view (Request details → Edit reason). The first view never has it.

#### 4.4 `footer`
On when the sheet edits something (Save, or Cancel + Save). Off for read-only details.

**Combination rules**
- One side sheet at a time; a second view replaces the content and shows the back button
- `standard` only on Web at window widths where the page keeps its own layout (A8)

### A5 States and behavior

| State | When it happens | What the user sees |
|---|---|---|
| Opening | The user opens a row, card or button | The sheet slides in from the end; the scrim fades in (modal) or the page narrows (standard) |
| Open | | Modal: the page behind does not respond. Standard: the page still works |
| Body scrolls | The content is taller than the sheet | A divider shows under the header and above the footer |
| Second view | The user opens a deeper level | The content changes; the back button appears |
| Unsaved changes | The user tries to close with edits | A Dialog asks "Discard changes?" |
| Closing | Close, Esc, scrim, or the main action | The sheet slides out; focus returns to the control that opened it |

**Behavior rules**
- Title wraps to two lines, never truncated; Arabic is about 25% longer
- The footer stays visible; long forms scroll in the body

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| `title` | The object or the task: "Edit device", "Request details" | 40 chars |
| footer action | The outcome: "Save changes", "Connect" | 3 words |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Edit device · Save changes | تعديل الجهاز · حفظ التغييرات | Details · Submit |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Keep the page visible so the user remembers where they are | Fill the whole window with a side sheet |
| Put the main action in the footer, always visible | Hide the save button at the end of a long body |
| Use the back button for a second view | Open a second side sheet or a dialog on top for the next step |
| Ask before discarding edits | Close and lose the user's changes |

### A8 Platform notes — Web

| | Web |
|---|---|
| Available | ✓ `sm` · `md` · `lg`; `modal` · `standard` |
| `standard` | Only when the window is at least the Desktop breakpoint; below it the sheet opens as `modal` |
| Narrow windows | When the window is narrower than the sheet plus a margin, the sheet takes the window width minus the inset |
| Interaction | Pointer + keyboard; Esc closes |

### A9 Accessibility (design)

- The title names the sheet; screen reader users hear it when the sheet opens
- Modal sheets keep focus inside until closed; standard sheets are a landmark the user can move to and from
- Every close action is reachable by keyboard and does not need a swipe
- Focus returns to the control that opened the sheet

### A10 Related components

- [Dialog](../../../3-web-components/components/dialog/dialog.md#a--guidelines) — short decisions; also the "Discard changes?" confirmation
- [Bottom sheet](../../../5-mobile-components/components/bottom-sheet/bottom-sheet.md#a--guidelines) — the touch-phone answer to the same need
- [Button](../button/button.md#a--guidelines) · [Icon button](../icon-button/icon-button.md#a--guidelines) — footer and header actions

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### SideSheet
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `open` | boolean | | — | ✓ | Shows the sheet |
| `onClose` | `(reason: 'close-button' \| 'escape' \| 'scrim') => void` | | — | ✓ | Every way of closing that is not an action |
| `title` | string | (A6) | — | ✓ | `title` |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.1 |
| `mode` | enum | `modal` · `standard` | `modal` | | A4.2 |
| `onBack` | `() => void` | | — | | Shows the `back-button` (A4.3) |
| `footer` | `ReactNode` | one full-width `Button` or a `ButtonGroup` | — | | A4.4 |
| `children` | `ReactNode` | | — | ✓ | `body` |
| `initialFocusRef` | `RefObject<HTMLElement>` | | — | | First focus override |

**Invalid combinations** (`console.warn` in development, then the fallback renders):
| Combination | Fallback |
|---|---|
| `mode="standard"` below the Desktop breakpoint | renders `modal` (no warning — A8) |
| `footer` with more than one primary Button | warn; renders as given |

### B2 Dimensions

```
                                         ┌──── width sm size-container-xs · md size-container-sm · lg size-container-lg ────┐
   page (dimmed)                    ┬    ┌────────────────────────────────────────────┐ ┬ spacing-md
                                    │    │ [←]  Edit device                     [✕]   │   header padding spacing-2xl · title-lg
                                    │    │ ────────────────────────────────────────── │   divider while scrolled
                                    │    │  body · padding spacing-layout-container   │   radius-4xl all corners · elevation-4
                                    │    │  sections gap spacing-layout-stack         │
                                    │    │  [               Save changes           ]  │   footer padding spacing-layout-container
                                    ┴    └────────────────────────────────────────────┘ ┴ spacing-md
                                                                                       ├──┤ spacing-md
```

| Part | Property | Token |
|---|---|---|
| `scrim` | fill | `color-overlay-default` (modal only) |
| `container` | width | `sm` `size-container-xs` · `md` `size-container-sm` · `lg` `size-container-lg`; never wider than the window minus the inset on both sides |
| `container` | inset from the window (modal) | `spacing-md` on the top, bottom and inline end |
| `container` | background · radius · elevation (modal) | `color-surface-raised` · `radius-4xl` all corners (floating, O-04) · `elevation-4` |
| `container` | standard mode (Web) | no inset, full height, `radius-none`, no shadow; border-inline-start `border-width-default` `color-border-subtle`; the page width shrinks by the sheet width |
| `container` | stacking | `layer-modal` (modal) · `layer-raised` (standard) |
| `header` | padding · gap | `spacing-2xl` (side sheet header, spacing.md) · gap `spacing-md` |
| `title` | text style | `title-lg` · `color-text-default`; wraps to 2 lines |
| `back-button · close-button` | component | Icon button `transparent` · `neutral` · `md`; icons `arrow_back` (mirrors) · `close` |
| `body` | padding · overflow | padding-inline `spacing-layout-container`, padding-block-end `spacing-layout-container` · scrolls |
| `body` | gap between sections | `spacing-layout-stack` |
| `footer` | padding · actions | `spacing-layout-container` · one Button `filled brand lg` full width, or Button group end-aligned |
| `divider` |  | Divider default under the header and above the footer, only while the body scrolls |

Layout rules: height = window height minus the inset; header and footer hug; body fills and scrolls.

### B3 Tokens by part and state

Every value is a semantic token; there is no `side-sheet.tokens.json`.

| Part | Property | Default | Notes |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | modal |
| `container` | background | `color-surface-raised` | |
| `container` | shadow | `elevation-4` | modal; none in standard |
| `container` | border-inline-start | `color-border-subtle` | standard only (Web) |
| `title` | color | `color-text-default` | |
| `back-button` · `close-button` | — | Icon button B3 (`transparent`, `neutral`) | |
| `footer` | actions | Button B3 | |
| divider | stroke | Divider B3 (`default`) | while scrolled |

Dark theme: same tokens; no exceptions.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Closed → Open | `open` / `showBwSideSheet` | sheet slides in from the inline end · scrim opacity 0 → 1 (modal) · page width (standard) | `motion-duration-lg` | `motion-easing-emphasized-decelerate` |
| Open → Closed | close, Esc, scrim, action | slides out · scrim fades | `motion-duration-md` | `motion-easing-emphasized-accelerate` |
| View → second view | `onBack` set / content change | body cross-fade | `motion-duration-md` | `motion-easing-standard` |

Reduced motion: slide and fade become `motion-duration-instant`.

### B5 RTL

```
LTR  page ……………………  │ [←] Edit device              [✕] │   ← slides in from the right
RTL  │ [✕]              تعديل الجهاز [→] │  …………………… page   ← slides in from the left
```

| Part | In RTL |
|---|---|
| position | Opens from the inline end: right in LTR, left in RTL; slides from that edge |
| header | Back button at the start, close at the end (mirrored order) |
| `back-button` icon | Mirrors (`arrow_back` points right in RTL) |
| `close-button` icon | Does not mirror |
| standard border | On the inline start of the sheet |

### B6 Accessibility (implementation)

Design-level rules are in A9; this is how this platform meets them.

| Requirement | Implementation |
|---|---|
| Role / semantics | Modal: `role="dialog"` `aria-modal="true"` `aria-labelledby` → title. Standard: `<aside aria-labelledby>` (complementary landmark), no focus trap |
| Focus | Modal: `initialFocusRef`, else the first focusable field, else the close button; trapped; returns to the opener on close. Standard: focus moves to the title on open, not trapped |
| Page behind | Modal: `inert` / `aria-hidden` through MUI, scroll locked |
| Buttons | Close "Close" / "إغلاق"; back "Back" / "رجوع" (Icon button tooltips) |
| Screen reader output | "Edit device, dialog" |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Modal: inside the sheet only. Standard: normal page order |
| Esc | Closes (modal and standard) |
| Enter / Space | Activate the focused control |

### B7 Examples

```tsx
import { SideSheet, Button } from '@biowave/web';

<SideSheet open={open} onClose={close} title="Edit device"
  footer={<Button fullWidth size="lg" onClick={save}>Save changes</Button>}>
  <DeviceForm />
</SideSheet>

// Arabic, standard mode next to a table
<SideSheet open={open} onClose={close} title="تفاصيل الطلب" mode="standard" size="lg">
  <RequestDetails />
</SideSheet>
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: every part uses exactly the B2–B3 tokens for each `size` and `mode`
- [ ] Every transition in B4; reduced motion → `motion-duration-instant`
- [ ] Opens from the right in LTR and the left in RTL; back icon mirrors, close does not
- [ ] Modal: focus in, trapped, returned; Esc and scrim call `onClose` with the right reason
- [ ] Standard: page content narrows by the sheet width; no focus trap; `aside` landmark; falls back to modal below Desktop
- [ ] Body scrolls with header and footer fixed; dividers only while scrolled
- [ ] Every invalid combination in B1 warns and falls back
- [ ] a11y: axe on `baseElement` with the sheet open, light/dark × en/ar, both modes
- [ ] No raw values (lint over the component folder)

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `side-sheet-contract.md`.

> Written by the Planner (Claude). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · 2026-11-13 |

### C1 Goal

`SideSheet` from `@biowave/web` matches B1–B6 and passes B9 and C6.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Navigation drawer (Primary navigation, Wave 12)
- Resizable or pinned sheets
- The "Discard changes?" dialog itself (the consumer opens a Dialog in `onClose` / `onDismissAttempt`)

### C3 Approach

- **Base:** MUI `Drawer` `anchor="right"` (MUI flips it to the left under the RTL theme), `variant` from `mode` (`temporary` · `persistent`); `SlideProps` timing from the motion tokens; `PaperProps` with the B2 inset (`margin`), radius, background and shadow; `slotProps.backdrop` fill `color-overlay-default`.
- **Standard mode:** the consumer layout gets a `SideSheetLayout` wrapper that reserves the sheet width (`padding-inline-end`) with the same transition; `useMediaQuery` on the Desktop breakpoint switches to modal.
- **Structure:** header (`IconButton` back · title · `IconButton` close), scroll body with scroll-driven dividers, footer.
- **Gotcha:** MUI `Drawer` paper uses `elevation={16}` — set `elevation={0}` and apply `elevation-4`.

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
3-web-components/src/components/side-sheet/SideSheet.tsx        new (SideSheet, SideSheetLayout)
3-web-components/src/components/side-sheet/SideSheet.test.tsx   new
3-web-components/src/components/side-sheet/index.ts             new
3-web-components/src/index.ts                                   change: export (alphabetical)
3-web-components/README.md                                      change: Side sheet row (Code)
CHANGELOG.md                                                    change: one entry
```

### C6 Tests

Implement every item in B9, plus:
- [ ] `SideSheetLayout` reserves exactly the sheet width in standard mode and releases it on close
- [ ] Earlier tests still pass

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6 (focus in, trap, return; dismiss rules)
- [ ] AC-5 Tests in B9 and C6 exist and pass; `npm run test:web`, `npm run typecheck`, `npm run docs:check` pass
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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-side-sheet-contract.md`.

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Side sheet |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Side sheet` › sections `Side sheet` and `Side sheet — Documentation` |
| Mode | **Create new.** The anatomy comes from the legacy Web `↳ Slide Out Panel` screens (frames such as `3741:4340`; floating, inset, rounded); they stay in `_Deprecation Ground`, untouched |
| Depends on | Button, Icon Button and Divider sets in this file; `.Scrim` from the Dialog page |
| Plan version | 1 · 2026-11-13 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `figma-read-tokens.js` lint must report 0.
- Nested parts are instances of the sets already in this file (Button, Icon Button, Divider) — never detached, never redrawn.
- The `scrim` is a private base component `.Scrim` (one per file, shared by Dialog, Bottom sheet and Side sheet): a frame filled with `color/overlay/default`, no other properties. Examples place the overlay component on top of it inside a device frame.

### D2 Component structure

```
❖ Side sheet                      ← component set (published)
  └─ ◇ .Side sheet/body            ← private placeholder slot (sections of text, banner, fields)
```

### D3 Layer tree and auto layout

```
Side sheet                 ↕ vertical · width FIXED bound to size/container/xs|sm|lg (Size) · height 720 example (fills the device frame in docs)
│                            Modal: radius/4xl all corners · fill color/surface/raised · Elevation/4
│                            Standard: radius/none · stroke-left color/border/subtle border/width/default · no effect
├── header                 ↔ padding spacing/2xl · gap spacing/md · counter-axis centre
│   ├── back-button        ◇ Icon Button transparent · neutral · md · arrow_back · BOOLEAN `Back button`
│   ├── title              T title/lg · color/text/default · fill · TEXT `Title`
│   └── close-button       ◇ Icon Button transparent · neutral · md · close
├── body                   ◇ .Side sheet/body · fill both · padding-inline spacing/layout/container · INSTANCE_SWAP `Body`
└── footer                 ↕ padding spacing/layout/container · BOOLEAN `Footer`
    └── footer-action      ◇ Button filled · brand · lg · width fill · TEXT via nested label
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` | `sm` · `md` · `lg` |
| `Mode` | VARIANT | `Modal` · `Standard` | `Modal` | `mode` | `modal` · `standard` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Title` | TEXT | | `Edit device` | `title` | |
| `Back button` | BOOLEAN | | `false` | `onBack` | set / null |
| `Footer` | BOOLEAN | | `true` | `footer` | present / absent |
| `Body` | INSTANCE_SWAP | preferred: `.Side sheet/body` | | `children` / `content` | |

### D5 Variants to generate

- Axes: `Size × Mode × Language` = 3 × 2 × 2 = **12** variants
- Grid: rows = Size × Mode, columns = Language; gap `spacing/xl`

### D6 States, interactions and motion

No prototype interactions on the set. Opening, dragging, the detents and closing are shown on doc page 04 with B4 timings written next to them.

### D7 RTL

`Language=AR` variants: Typography mode `Web · AR`, auto layout direction from the text, layout per B5; Arabic copy from A6. The `close` and `check` glyphs do not mirror; `arrow_back` mirrors.

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Side sheet — Documentation`, frames `Side sheet / 00 Component sheet` … `Side sheet / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Side sheet:
- 01 Introduction: Light + Dark panels, an `MD` modal sheet over a Desktop frame with the scrim, legacy content rebuilt (info banner, sectioned cards, Save)
- 03 Variations: Size; Mode (modal floating vs standard attached beside a table); back button on a second view; footer on / off
- 07 Platform: the A8 table; standard falls back to modal below Desktop
- 08 RTL: the sheet on the left in Arabic, back arrow mirrored
- 05 Usage: the A7 pairs, built with live instances

Component description: "A panel that slides in from the side of the window to show details or a longer task while the page stays in view. Spec: 3-web-components/components/side-sheet/side-sheet.md".

### D9 Code Connect

- File: `3-web-components/src/components/side-sheet/SideSheet.figma.tsx`
- Mapping: D4. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Side sheet`, private components and layer names match D2–D3 and A2
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
| Agent / stages run | |
| Date | |
| Node IDs | |
| QA report | |

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
| — | — | not reviewed | not reviewed |

---

## F · Changelog

> Changes to this component on this platform. Every entry also gets one line in the root `CHANGELOG.md`.

### F0 Changes from previous version

None — first version.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-11-13 | Initial (Wave 8 brief, decisions O-01 … O-06) | — | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-11-13 | Initial | No | — |
