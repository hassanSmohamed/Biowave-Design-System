# Snackbar · شريط إشعار — Web

> **One file for Snackbar on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web snackbar`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Snackbar · شريط إشعار |
| Summary | A brief, high-contrast inverse bar at `layer-toast` (1500) that confirms an action or offers a single follow-up (Undo, Retry) without interrupting the user. |
| Summary (ar) | شريط إشعار مؤقت عالي التباين يظهر أعلى المحتوى لتأكيد نتيجة إجراء أو إتاحة إجراء سريع واحد (تراجع، إعادة المحاولة) دون مقاطعة المستخدم. |
| Parts | Container · icon · message · action · close button |
| Parts (ar) | الحاوية · الأيقونة · الرسالة · إجراء · زر الإغلاق |
| Platform | Web · React + MUI |
| Built on | MUI `Snackbar` + styled inverse surface (`color-surface-inverse`, `Elevation/3`), using Biowave `Button` (`text`) and `IconButton` |
| Import | `import { Snackbar } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Snackbar` · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-11-14 |
| Plan | Finished |
| Code | Planned |
| Figma build | Built |
| Review | — |
| Source code | `src/components/snackbar/` — not built yet (the Executor creates it) |
| Tokens | No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly |
| Contracts | [`snackbar-contract.md`](snackbar-contract.md) · [`figma-snackbar-contract.md`](figma-snackbar-contract.md) — generated, never edited |
| Docs page | [`snackbar.html`](snackbar.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---
## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/snackbar/snackbar.md#b--spec) · [Tablet](../../../4-tablet-components/components/snackbar/snackbar.md#b--spec) · [Mobile](../../../5-mobile-components/components/snackbar/snackbar.md#b--spec) |
| Figma | `↳ Snackbar` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** (Mobile has `OS = Android · iOS`, FB-05) |
| Version | 1.0 · 2026-11-14 |

### A1 Overview

A snackbar is a brief, non-blocking transient bar at `layer-toast` (1500) that confirms the result of an action ("Changes saved", "Device removed — Undo") at the bottom of the screen without interrupting workflow. Unlike an Alert, it floats above the UI and dismisses automatically after a few seconds (unless an interactive action requires more time).

### A2 Anatomy

```
┌────────────────────────────────────────────────────────┐
│ [✓] ①  Device settings updated.          [Undo]  [✕]   │
└────────────────────────────────────────────────────────┘
       ②  ③                                   ④     ⑤
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | High-contrast inverse floating surface (`color-surface-inverse`) with `Elevation/3` shadow |
| 2 | `icon` | No | Optional leading status/context icon (`Show icon`), tinted `color-icon-inverse` |
| 3 | `message` | Yes | Concise 1–2 line confirmation of what just happened |
| 4 | `action` | No | Optional single text action (`Undo`, `Retry`, `View`) — maximum 1 button |
| 5 | `close-button` | No | Optional `✕` dismiss button for manual dismissal |

### A3 Usage

**When to use**
- Confirm a background or save action (`Changes saved`, `Employee added`, `Export ready`)
- Offer a quick reversible undo (`Item archived` + `Undo`) or single retry (`Failed to sync` + `Retry`)

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Persistent error or form summary that must stay visible | [Alert](../alert/alert.md#a--guidelines) |
| Blocking yes/no decision or destructive warning | [Dialog](../dialog/dialog.md#a--guidelines) |
| Multi-step feedback or empty view guidance | [Empty state](../empty-state/empty-state.md#a--guidelines) |

### A4 Options

#### 4.1 `action`
| Value | Looks like | Pick it when |
|---|---|---|
| `none` | `[icon] message [✕]` | **Default.** Simple status confirmation with no follow-up action |
| `withAction` | `[icon] message [Button] [✕]` | Single immediate follow-up (`Undo`, `Retry`, `View`) |

#### 4.2 Toggles
| Option | Default | Notes |
|---|---|---|
| `showIcon` | `false` (Web · Tablet · Mobile Android) · `true` (Mobile iOS toast) | Leading cue icon in `color-icon-inverse` |
| `dismissible` | `false` on short auto-dismiss; `true` when persistent or actionable | Trailing `✕` `Icon button` |

**Combination rules**
- Maximum one `action` button (`Undo`, `Retry`, `View`); never place two actions inside a Snackbar
- Never show more than one Snackbar at a time — queue or replace cleanly

### A5 States and behavior

| State | Trigger | What the user sees |
|---|---|---|
| Entering | User completes or triggers an action | Floats up / fades in above bottom navigation at `layer-toast` |
| Visible | Auto-timer running | Stays for 4–6 seconds when text-only; pauses timer on pointer hover or keyboard focus |
| Interactive timer | `action` is present | Persists ≥ 10 seconds (or until dismissed) so keyboard/screen-reader users can reach the action (WCAG 2.2.1) |
| Exiting | Timer ends, user activates action/dismiss | Fades/slides out cleanly |

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| message | Past-tense result + subject: "Shift schedule published." | 60 chars (1–2 lines) |
| action | Single verb: "Undo", "Retry", "View" | 1–2 words |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Employee added. | تم إضافة الموظف. | Success! The employee record has been successfully saved to the database. |
| Device removed. · Undo | تم حذف الجهاز. · تراجع | Deleted · Click to restore |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Use `color-surface-inverse` with `color-text-inverse` for 18:1+ contrast (FB-04) | Colour the bar solid green/blue with dark text (fails contrast) |
| Keep messages short enough to read within 4–5 seconds | Put multi-paragraph instructions or form errors inside a Snackbar |
| Give interactive snackbars extended / non-expiring focus time | Auto-hide an `Undo` action in 2 seconds before users can activate it |
| Show one snackbar at a time | Stack 3 snackbars vertically over screen content |


### A8 Platform notes — Web

| | Web |
|---|---|
| Placement | Floating bottom-end (`spacing-3xl` inset from viewport edge), `layer-toast` (1500) |
| Radius & type | `radius-md` (8), message `body-sm` |
| Width | Hugs content (`size-container-xs` 384 min → `size-container-sm` 480 max) |

### A9 Accessibility (design)

- Announce non-urgent messages via `aria-live="polite"` (`role="status"` on Web / `SemanticsService.announce` on Flutter)
- Actionable snackbars (`Undo` / `Retry`) pause auto-dismiss on focus/hover and allow ≥ 10 s or explicit dismiss (WCAG 2.2.1 Timing Adjustable)
- High-contrast `color-surface-inverse` + `color-text-inverse` satisfies WCAG AAA (`18.42:1` Light / `19.8:1` Dark)

### A10 Related components

- [Alert](../alert/alert.md#a--guidelines) — persistent inline status inside pages, forms and dialogs
- [Dialog](../dialog/dialog.md#a--guidelines) — blocking confirmations with primary + secondary choices
- [Button](../button/button.md#a--guidelines) — text action styling
- [Icon button](../icon-button/icon-button.md#a--guidelines) — optional `✕` dismiss control

---
## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### Snackbar (Web)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `open` | `boolean` | — | ✓ | Controls visibility |
| `message` | `string` | — | ✓ | 1–2 line status message |
| `icon` | `ReactNode` | `—` | | Optional leading icon (`color-icon-inverse`) |
| `action` | `{ label: string; onClick: () => void }` | `—` | | Optional single text action (`Undo`, `Retry`) |
| `onClose` | `() => void` | — | ✓ | Called on timeout, dismiss click or Esc |
| `autoHideDuration` | `number \| null` | `5000` (min `10000` when `action` present) | | Auto-dismiss delay in ms (`null` disables) |

**Invalid combinations** (`console.warn` in development):
| Combination | Fallback |
|---|---|
| `actionLabel` without callback | Ignores action button, warns |
| `autoHideDuration` < 4000 ms with an `action` | Clamps to 10 000 ms (WCAG 2.2.1) and warns |

### B2 Dimensions

| Part | Property | Token |
|---|---|---|
| `container` | width · min-height | min `size-container-xs` (384) · max `size-container-sm` (480) · `size-control-height-lg` (48) |
| `container` | radius · elevation | `radius-md` (8) · `Elevation/3` |
| `container` | padding-inline · padding-block | `spacing-xl` (16) · `spacing-md` (8) |
| `container` | gap `icon`–`message` · `content`–actions | `spacing-lg` (12) · `spacing-xl` (16) |
| leading `icon` | size | `size-icon-md` (20) |
| `message` | text style | `body-sm` |
| `action` · `close-button` | gap between them | `spacing-xs` (4) |

### B3 Tokens by part and state

Every value is a semantic token; there is no `snackbar.tokens.json` (FB-04).

| Part | Property | Token |
|---|---|---|
| `container` | surface fill | `color-surface-inverse` |
| `container` | shadow · z-index | `Elevation/3` · `layer-toast` (1500) |
| `message` | text fill | `color-text-inverse` |
| leading `icon` · `close-button` | icon fill | `color-icon-inverse` |
| `action` | button variant · colour | Text `Button` · `inverse` (`color-text-inverse`) |

Contrast (Light / Dark): `color-text-inverse` and `color-icon-inverse` on `color-surface-inverse` — **18.42:1 Light / 19.8:1 Dark**.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Hidden → Visible | Trigger fired | translateY (`16 → 0`), opacity `0 → 1` | `motion-duration-md` (200 ms) | `motion-easing-emphasized-decelerate` |
| Visible → Hidden | Timeout / Esc / close | opacity `1 → 0`, translateY (`0 → 8`) | `motion-duration-sm` (100 ms) | `motion-easing-standard-accelerate` |

Reduced motion: opacity fade only (`motion-duration-sm` / instant), no vertical slide.

### B5 RTL

| Part | In RTL |
|---|---|
| horizontal row | Leading `icon` at right edge; `message` right-aligned; `action` and `close-button` at left edge |
| icons | Status check/warning icons do not mirror |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | Floating live container `role="status"` (`aria-live="polite"`); pauses timer on `onMouseEnter` / `onFocus`; Esc dismisses |
| Focus | Optional action & close reachable by Tab without trapping focus inside the page |

### B7 Examples

```tsx
// EN — confirmation with Undo
<Snackbar open={open} message="Device settings updated." action={{ label: 'Undo', onClick: onUndo }} onClose={onClose} />

// AR — simple confirmation (direction comes from the provider)
<Snackbar open={open} message="تم إرسال الطلب." onClose={onClose} />
```

### B8 Figma

Structure, properties, Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: inverse surface/text/icon contrast tokens (`color-surface-inverse`, `color-text-inverse`)
- [ ] Single-line vs wrapped 2-line message; `action` callback fires and dismisses
- [ ] Auto-dismiss pauses on hover/focus and extends when `action` is present
- [ ] RTL horizontal mirroring works automatically
- [ ] Accessibility live-region announcement and touch/contrast checks pass
---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `snackbar-contract.md`.

> Written by the Planner (Antigravity). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · 2026-11-14 |

### C1 Goal

The Web `Snackbar` matches B1–B6 and passes B9 and C6.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Persistent inline banners (`Alert`)
- Multi-action prompts (`Dialog`)

### C3 Approach

- **Base:** MUI `Snackbar` + styled inverse surface (`color-surface-inverse`, `Elevation/3`, `layer-toast`), using Biowave `Button` (`text`, `inverse`) and `IconButton`.

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
3-web-components/src/components/snackbar/Snackbar.tsx · Snackbar.test.tsx · index.ts   new
3-web-components/src/index.ts · README.md · CHANGELOG.md   change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Contrast check passes in Light and Dark (`18.42:1` / `19.8:1`)
- [ ] Action timer clamps to ≥ 10 s and pauses on hover/focus
- [ ] Earlier tests still pass

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6
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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-snackbar-contract.md`.

> Written by the Planner (Antigravity) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Snackbar |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Snackbar` › sections `Snackbar — Component` and `Snackbar — Documentation` |
| Mode | **Create new** in **Biowave DS — Web Components**. |
| Depends on | `.Button _en` / `.Button _ar`, `Icon Button`, Icons & Foundations library variables |
| Plan version | 1 · 2026-11-14 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `lint-component-section.js` must report 0 unbound values.
- Nested parts are instances of the sets already in this file (`.Button _en` / `.Button _ar` or `Button`, `Icon Button`) — never detached, never redrawn.

### D2 Component structure

```
❖ Snackbar                        ← set: Action = None · With action × Language = EN · AR
  ├─ icon                         ◇ Material Symbols instance (rounded)
  ├─ message                      T text
  ├─ action                       ◇ instance .Button _en / _ar (Web) or Button (Tablet)
  └─ close-button                 ◇ instance Icon Button
```

### D3 Layer tree and auto layout

```
Snackbar                  ↔ horizontal · gap spacing/lg · pad-block spacing/md · pad-inline spacing/xl
│                           min-height size/control/height/lg · fill color/surface/inverse · Elevation/3 · radius B2
├── icon                  ◇ Icon · size size/icon/md · fill color/icon/inverse · BOOLEAN `Show icon`
├── message               T body/sm (Web) or body/md (Tablet/Mobile) · fill color/text/inverse · TEXT `Message`
├── action                ◇ Button (Text · Inverse) · visible in `Action=With action` · TEXT `Action label`
└── close-button          ◇ Icon Button (Inverse) · BOOLEAN `Close button`
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Action` | VARIANT | `None` · `With action` | `None` | `action` | absent / present |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Message` | TEXT | | `Device settings updated.` | `message` | |
| `Action label` | TEXT | | `Undo` / `تراجع` | `action.label` | |
| `Show icon` | BOOLEAN | | `false` | `icon` present | |
| `Close button` | BOOLEAN | | `true` | `onClose` / `showCloseButton` | |

### D5 Variants to generate

- `Snackbar`: `Action` (2) × `Language` (2) = **4** variants.

### D6 States, interactions and motion

No prototype interactions on the set. Enter/exit animations and timer pauses (B4) are shown on doc page 04.

### D7 RTL

`Language=AR`: Typography mode `Web · AR`, layout flips icon to right edge and action/close to left edge; Arabic copy uses A6 examples.

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Snackbar — Documentation`, frames `Snackbar / 00 Component sheet` … `Snackbar / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Snackbar:
- 01: bottom floating snackbar preview inside device viewport
- 03: `None` vs `With action`, leading icon on/off, Light + Dark inverse surface
- 05 Usage: A7 Do/Don't pairs with live instances
- 07 Platform: viewport bottom placement & width clamp

Component description: "A brief, high-contrast inverse bar at `layer-toast` (1500) that confirms an action or offers a single follow-up (Undo, Retry) without interrupting the user.. Spec: 3-web-components/components/snackbar/snackbar.md".

### D9 Code Connect

- File: `3-web-components/src/components/snackbar/Snackbar.figma.tsx`
- Mapping: D4 table. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Snackbar`, nested instances and layer names match D2–D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant count = D5
- [ ] F-AC-4 Zero raw values: fills, radius, padding, gaps, sizes, text and effects bound (lint 0)
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only)
- [ ] F-AC-6 AR variants per D7; Arabic copy fits without truncation
- [ ] F-AC-7 Component description filled; no prototype interactions on the set
- [ ] F-AC-8 Values match B2–B3 one by one (redline check)
- [ ] F-AC-9 Every documentation page in D8 exists, in order, built only from Doc Kit components with live instances

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | Figma Agent (Antigravity) · build · rtl · qa · document · review fixes (findings 2, 8, 11) |
| Date | 2026-11-17 |
| Node IDs | page `694:219747` · component section `694:219748` · component set `694:220191` · docs section `699:7445` · pages `699:4102` (`00`) … `699:7332` (`11`) · Components List card `700:14085` |
| QA report | 4 variants (`Action × Language`), 0 unbound tokens, button instances `minWidth = null` / `layoutSizingHorizontal = HUG`, message wraps 1 line (height 56px for EN and AR), docs unclipped. Review lint: `issues: []` |

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
| Round 2 | 2026-11-17 | — | Fixed (Findings 2, 8, 11 resolved, lint 0) |
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
