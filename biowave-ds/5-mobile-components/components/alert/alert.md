# Alert · تنبيه — Mobile

> **One file for Alert on Mobile:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- mobile alert`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Alert · تنبيه |
| Summary | An inline banner that communicates important contextual status (info, success, warning, error, neutral) inside a page, section, form or dialog until the condition changes or it is dismissed. |
| Summary (ar) | شريط تنبيه مضمّن يعرض حالة سياقية مهمة (معلومات، نجاح، تحذير، خطأ، محايد) داخل الصفحة أو القسم أو النموذج أو نافذة الحوار حتى تتغير الحالة أو يُغلق. |
| Parts | Container · icon · title · description · action · close button |
| Parts (ar) | الحاوية · الأيقونة · العنوان · الوصف · إجراء · زر الإغلاق |
| Platform | Mobile · Flutter + Material 3 + Cupertino (adaptive, N-07) |
| Built on | Flutter custom `BwAlert` widget built with semantic tokens (FB-03: legacy `Status Banners / Mobile` stays untouched as request-status header), reusing `BwButton` and `BwIconButton` |
| Import | `import 'package:biowave_mobile/biowave_mobile.dart'; // BwAlert` |
| Figma | **Biowave DS — Mobile Components** › `↳ Alert` (page Typography mode `Mobile`) · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-11-14 |
| Plan | Finished |
| Code | Planned |
| Figma build | Built |
| Review | — |
| Source code | `lib/src/components/alert/` — not built yet (the Executor creates it) |
| Tokens | No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly |
| Contracts | [`alert-contract.md`](alert-contract.md) · [`figma-alert-contract.md`](figma-alert-contract.md) — generated, never edited |
| Docs page | [`alert.html`](alert.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---
## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/alert/alert.md#b--spec) · [Tablet](../../../4-tablet-components/components/alert/alert.md#b--spec) · [Mobile](../../../5-mobile-components/components/alert/alert.md#b--spec) |
| Figma | `↳ Alert` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** |
| Version | 1.0 · 2026-11-14 |

### A1 Overview

An alert is an inline status banner placed inside page, section, form or dialog content to surface important contextual information (`info`, `success`, `warning`, `error`, `neutral`). Unlike a snackbar, it stays in the layout until the underlying condition is resolved or the user explicitly dismisses it. Both single-line banners and multi-line titled alerts share one component.

### A2 Anatomy

```
Single-line:  ┌──────────────────────────────────────────────────────────┐
              │ [i] ① ②  Changes saved successfully.      [Action] [✕]   │
              └──────────────────────────────────────────────────────────┘
                         ④                                 ⑤        ⑥

Titled:       ┌──────────────────────────────────────────────────────────┐
              │ [!] ① ②  Connection issue              [Action] [✕]      │
              │          ③  Check your network settings and retry.       │
              └──────────────────────────────────────────────────────────┘
                         ④
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `container` | Yes | Tinted surface with a `1 px` role border and `8 px` rounded corners |
| 2 | `icon` | Yes | Leading status icon paired with role colour so status is never conveyed by colour alone |
| 3 | `title` | No | Optional short heading (`Show title`) when more than one line of context is needed |
| 4 | `description` | Yes | Clear statement of what happened and, for warnings/errors, what to do next |
| 5 | `action` | No | Optional single compact `Button` for immediate resolution (`Retry`, `View details`) |
| 6 | `close-button` | No | Optional `Icon button` (`✕`) when the banner is non-critical and user-dismissible |

### A3 Usage

**When to use**
- Form validation error summary anchored above form fields
- Contextual warnings, notices or status callouts inside a [Dialog](../dialog/dialog.md#a--guidelines), Side sheet or page section
- Persistent system or billing announcements (`neutral` for helpful tips, `warning` for upcoming limits)

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Brief confirmation after an action (`Saved`, `Request sent`) | Snackbar |
| Blocking yes/no decision or destructive confirmation | [Dialog](../dialog/dialog.md#a--guidelines) |
| Full section or table has zero items | Empty state |
| Short status pill next to a row title | Badge / Tag |

### A4 Options

#### 4.1 `status`
| Value | Icon cue | Pick it when |
|---|---|---|
| `info` | Info circle | **Default.** Helpful explanation, policy note or neutral-positive system context |
| `success` | Check circle | Persistent confirmation that an account, sync or setup condition is healthy |
| `warning` | Warning / exclamation | Attention needed soon, partial failure or risk before a user submits |
| `error` | Error circle | Validation failure, failed action or blocked operation requiring user fix |
| `neutral` | Hint / neutral icon | General tip or announcement without positive/negative urgency |

#### 4.2 Layout & actions
| Option | Default | Pick it when |
|---|---|---|
| `showTitle` | `true` (on when title provided) | Turn **off** for concise single-line announcements; keep **on** when explaining cause + next step |
| `action` | off | One actionable link/button (`Retry`, `Update`, `Learn more`). Maximum 1 action button |
| `dismissible` | `true` for non-blocking | Adds trailing `✕` close button (`Icon button`). Omit for blocking `error` summaries that clear on fix |

**Combination rules**
- Maximum one `action` per Alert; never show two side-by-side buttons inside an inline banner (use [Dialog](../dialog/dialog.md#a--guidelines) instead)
- Never put an `action` that says "Dismiss" or "Close" — use `dismissible` (`✕`) for dismissal

### A5 States and behavior

| State | Trigger | What the user sees |
|---|---|---|
| Visible | Page load, state update or form submit error | Banner sits inline in layout, pushing content below without overlaying it |
| Dismissed | User activates `✕` close button | Banner exits smoothly; focus moves logically to the container or next element |
| Wrapped | Narrow viewport or longer Arabic copy | `description` wraps cleanly onto multiple lines; container grows vertically |

**Behavior rules**
- Text wraps freely and never truncates with ellipsis
- Arabic text is ~25% longer; allow at least 2–3 wrapped lines cleanly

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| title | Short summary in sentence case: "Unable to save changes" | 48 chars |
| description | Plain explanation + action to take | 140 chars (1–2 sentences) |
| action | Concise verb or verb phrase: "Retry", "Review" | 2 words |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Connection lost · Check your network settings and try again. · Retry | انقطع الاتصال · تحقّق من إعدادات الشبكة وأعد المحاولة. · إعادة المحاولة | Error 504 · Something went wrong on the server. · Click here |
| Shifts updated for May. | تم تحديث مناوبات شهر مايو. | Success! |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Pair icon, border, fill and clear text so status is clear without colour | Convey alert status with border or fill colour alone |
| Keep single-line alerts without a title for simple announcements | Force a redundant title above a 5-word sentence |
| Place error alerts next to or directly above the affected form | Stack 3+ full-width banners at the top of every screen |
| Omit close (`✕`) on critical unresolved blockers | Allow users to dismiss a blocking validation error without fixing it |


### A8 Platform notes — Mobile

| | Mobile |
|---|---|
| Layout | Single column; `action` wraps below text when label exceeds one row so description never crushes into a narrow strip |
| Controls | Action and close `Icon button` enforce `48 × 48 dp` minimum touch targets |
| Legacy note | Legacy `Status Banners / Mobile` (approval status + approver avatar header strip) remains untouched as a domain header, not replaced by `Alert` (FB-03) |

### A9 Accessibility (design)

- Use `role="status"` (`aria-live="polite"`) for `info`, `success` and `neutral`; use `role="alert"` (`aria-live="assertive"`) when dynamically injecting urgent `warning` or `error` banners
- Icon + border + concise wording ensure status is accessible to colour-blind users
- Close button requires a clear accessible label (`"Dismiss alert"` / `"إغلاق التنبيه"`)

### A10 Related components

- [Dialog](../dialog/dialog.md#a--guidelines) — hosts an inline Alert slot for blocking warnings
- [Button](../button/button.md#a--guidelines) — reused for the optional banner action
- [Icon button](../icon-button/icon-button.md#a--guidelines) — reused for the optional close control
- [Snackbar](../snackbar/snackbar.md#a--guidelines) — transient auto-dismissing feedback

---
## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### BwAlert (Flutter)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `status` | `BwAlertStatus` (`info · success · warning · error · neutral`) | `BwAlertStatus.info` | | Visual tone and leading icon (FB-01) |
| `title` | `String?` | `null` | | Optional short heading; hides heading row when `null` (FB-02) |
| `description` | `String` | — | ✓ | Body message |
| `actionLabel` | `String?` | `null` | | Label for optional action button (requires `onAction`) |
| `onAction` | `VoidCallback?` | `null` | | Action callback |
| `onDismiss` | `VoidCallback?` | `null` | | Renders trailing `✕` `BwIconButton` when non-null |
| `closeSemanticLabel` | `String?` | localised `"Dismiss alert"` | | Screen-reader label for close button |

**Invalid combinations** (`assert` in development):
| Combination | Fallback |
|---|---|
| `action` provided without handler | Ignores handlerless action button, warns |
| Empty `title` string `""` passed | Treats as omitted (`Show title = false`) |

### B2 Dimensions

| Part | Property | Token |
|---|---|---|
| container | radius · border width | `radius-md` (8) · `border-width-default` (1) |
| container | padding-block · padding-inline | `spacing-lg` (12) · `spacing-xl` (16) |
| container | gap `icon`–`content` · `content`–actions | `spacing-lg` (12) · `spacing-xl` (16) |
| leading `icon` | size | `size-icon-lg` (24) |
| `content` | gap `title`–`description` | `spacing-xs` (4) |
| `title` | text style | `title-md` |
| `description` | text style | `body-lg` |
| `action` · `close-button` | target height · gap between them | `48 × 48 dp` (`size-control-height-lg`) · `spacing-md` (8) |

### B3 Tokens by part and state

Every value is a semantic token; there is no `alert.tokens.json`.

| Part | `info` | `success` | `warning` | `error` | `neutral` |
|---|---|---|---|---|---|
| container fill | `color-background-info-subtlest` | `color-background-success-subtlest` | `color-background-warning-subtlest` | `color-background-error-subtlest` | `color-surface-subtle` |
| container border | `color-border-info` | `color-border-success` | `color-border-warning` | `color-border-error` | `color-border-default` |
| leading `icon` | `color-icon-role-info` | `color-icon-role-success` | `color-icon-role-warning` | `color-icon-role-error` | `color-icon-subtle` |
| `title` (FB-02) | `color-text-role-info` | `color-text-role-success` | `color-text-role-warning` | `color-text-role-error` | `color-text-default` |
| `description` (titled, FB-02) | `color-text-default` | `color-text-default` | `color-text-default` | `color-text-default` | `color-text-default` |
| `description` (single-line, FB-02) | `color-text-role-info` | `color-text-role-success` | `color-text-role-warning` | `color-text-role-error` | `color-text-default` |

Contrast (Light / Dark): role text/icon on subtlest — `info` 7.36:1 / 9.21:1 · `success` 5.73:1 / 10.02:1 · `warning` 7.68:1 / 8.85:1 · `error` 6.95:1 / 8.58:1 · `neutral` 18.48:1 / 13.58:1; body `color-text-default` on subtlest ≥ 12.47:1 across all statuses; border on `color-surface-default` ≥ 3.24:1 Light / ≥ 6.64:1 Dark.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Hidden → Visible | Mount / alert shown | opacity `0 → 1`, subtle expand | `motion-duration-md` (200 ms) | `motion-easing-standard-decelerate` |
| Visible → Dismissed | Close activated | opacity `1 → 0`, collapse | `motion-duration-sm` (100 ms) | `motion-easing-standard-accelerate` |

Reduced motion: instant (`motion-duration-instant`).

### B5 RTL

| Part | In RTL |
|---|---|
| horizontal layout | Leading `icon` moves to right edge; `action` and `close-button` move to left edge |
| `title` · `description` | Right-aligned (`text-align: start`) |
| status icons | Info, check, warning and error exclamation do not mirror |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | `Semantics(liveRegion: true)` on dynamic banners; `Semantics(label: ...)` on icon-only close button; icon excluded (`ExcludeSemantics`) |
| Focus | Keyboard focus outline `border-width-focus` (`color-border-focus`) with `border-focus-offset` on action & close buttons |
| Target size | `48 × 48 dp` (`size-control-height-lg`) |

### B7 Examples

```dart
// EN
BwAlert(
  status: BwAlertStatus.error,
  title: 'Connection lost',
  description: 'Check your network settings and try again.',
  actionLabel: 'Retry',
  onAction: onRetry,
  onDismiss: onClose,
)

// AR (direction comes from Directionality / locale)
BwAlert(
  status: BwAlertStatus.info,
  description: 'يتم تطبيق التغييرات في المناوبة التالية.',
  onDismiss: onClose,
)
```

### B8 Figma

Structure, properties, Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: all 5 statuses (`info`, `success`, `warning`, `error`, `neutral`) bind B2–B3 semantic tokens
- [ ] Titled (`title` + `children`) vs single-line (`children` only) layout and colour rules (FB-02)
- [ ] `onDismiss` shows close button and triggers callback; `action` invokes callback
- [ ] RTL mirrors horizontal order without mirroring status icons
- [ ] Accessibility role/live-region and tap target / contrast checks pass
---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `alert-contract.md`.

> Written by the Planner (Antigravity). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · 2026-11-14 |

### C1 Goal

The Mobile `Alert` matches B1–B6 and passes B9 and C6.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Transient toast confirmations (`Snackbar`)
- Legacy Mobile `Status Banners / Mobile` approval header strip (FB-03)

### C3 Approach

- **Base:** Custom `BwAlert` Flutter `Container` + `Row`/`Wrap` using semantic token decoration (`radius-md`, `border-width-default`), reusing `BwButton` and `BwIconButton`.

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
5-mobile-components/lib/src/components/alert/bw_alert.dart · test/alert_test.dart   new
5-mobile-components/lib/biowave_mobile.dart · README.md · CHANGELOG.md   change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Single-line vs titled text colour difference (FB-02)
- [ ] Action + dismiss keyboard/focus behaviour
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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-alert-contract.md`.

> Written by the Planner (Antigravity) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Mobile set in **Biowave DS — Mobile Components**.

| Field | Value |
|---|---|
| Component | Alert |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) — never the Foundations file |
| Page / section | `↳ Alert` › sections `Alert — Component` and `Alert — Documentation` |
| Mode | **Create new** in **Biowave DS — Mobile Components** (`FB-03`: legacy Foundations `Status Banners / Mobile` stays untouched). |
| Depends on | `Button`, `Icon Button`, Icons & Foundations library variables |
| Plan version | 1 · 2026-11-14 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `lint-component-section.js` must report 0 unbound values.
- Nested parts are instances of the sets already in this file (`.Button _en` / `.Button _ar` or `Button`, `Icon Button`) — never detached, never redrawn.

### D2 Component structure

```
❖ Alert                           ← set: Status = Info · Success · Warning · Error · Neutral × Language = EN · AR
  ├─ icon                         ◇ Material Symbols instance (rounded)
  ├─ content                      ↕ title + description
  ├─ action                       ◇ instance .Button _en / _ar (Web) or Button (Tablet/Mobile)
  └─ close-button                 ◇ instance Icon Button
```

### D3 Layer tree and auto layout

```
Alert                     ↔ horizontal · gap spacing/lg · pad-block spacing/lg · pad-inline spacing/xl
│                           radius/md · border/width/default · stroke color/border/{status} · fill B3
├── icon                  ◇ Icon · size size/icon/lg · fill color/icon/role/{status}
├── content               ↕ vertical (fill) · gap spacing/xs
│   ├── title             T title/md · fill color/text/role/{status} · BOOLEAN `Show title` · TEXT `Title`
│   └── description       T body/md (Web) or body/lg (Tablet/Mobile) · fill color/text/default · TEXT `Description`
├── action                ◇ Button (sm Web / touch target Tablet & Mobile) · BOOLEAN `Action`
└── close-button          ◇ Icon Button · BOOLEAN `Close button`
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Status` | VARIANT | `Info` · `Success` · `Warning` · `Error` · `Neutral` | `Info` | `status` | `'info'` … `'neutral'` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Title` | TEXT | | `Heads up` / `تنبيه` | `title` | |
| `Description` | TEXT | | message copy | `children` / `description` | |
| `Show title` | BOOLEAN | | `true` | `title` present | |
| `Action` | BOOLEAN | | `true` | `action` present | |
| `Close button` | BOOLEAN | | `true` | `onDismiss` present | |

### D5 Variants to generate

- `Alert`: `Status` (5) × `Language` (2) = **10** variants.
- Grid layout: rows = `Status`, columns = `EN · AR`; gap `spacing/xl`.

### D6 States, interactions and motion

No prototype interactions on the set. Visible/dismiss transition (B4) and action button states are shown on doc page 04.

### D7 RTL

`Language=AR`: Typography mode `Mobile · AR`, container flips icon to right edge and action/close to left edge; copy uses A6 Arabic examples.

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Alert — Documentation`, frames `Alert / 00 Component sheet` … `Alert / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Alert:
- 01: `Warning` titled alert above a sample form/dialog preview
- 03: all 5 statuses (`Info · Success · Warning · Error · Neutral`), single-line (`Show title=false`) and titled (`Show title=true`), with/without action & close
- 05 Usage: A7 Do/Don't pairs with live instances
- 07 Platform: desktop width and narrow panel wrap

Component description: "An inline banner that communicates important contextual status (info, success, warning, error, neutral) inside a page, section, form or dialog until the condition changes or it is dismissed.. Spec: 5-mobile-components/components/alert/alert.md".

### D9 Code Connect

- File: `5-mobile-components/lib/src/components/alert/bw_alert.figma.dart`
- Mapping: D4 table (Status · Show title · Action · Close button). Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [x] F-AC-1 Component set `Alert`, nested instances and layer names match D2–D3 and A2
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
| Agent / stages run | build · rtl · qa · document · review fixes (findings 2, 5, 6, 8, round 3 R3-1, R3-5) |
| Date | 2026-11-18 |
| Node IDs | page `181:15576` · component section `181:15577` · component set `181:16391` (10 variants) · docs section `181:21193` · pages `181:16568` (00) · `181:17457` (01) · `181:17731` (02) · `181:18290` (03) · `181:19111` (04) · `181:19432` (05) · `181:19913` (06) · `181:20160` (07) · `181:20387` (08) · `181:20770` (09) · `181:21080` (11) · Components List card `181:27014` |
| QA report | 10 variants in Set `181:16391`. R3-1 fixed: mobile layout restructured at 328px width — row 1 contains leading icon, content (title + description, layoutSizingHorizontal = FILL), and close button (top-aligned, end); row 2 contains action button nested under content and aligned to start (layoutSizingHorizontal = HUG). Content is 206px wide, wrapping title and description cleanly with zero broken words in EN and AR. Variants placed in a 2-column grid (x: 40, x: 416) with 40px row gaps, set bounds 784 × 1080 with zero overlap. Close button vector fills bound to semantic token `VariableID:96:179326` (`transparent/icon/default`). R3-5 docs fitting fixed: all 11 doc page frames and row containers use vertical auto-layout HUG; row axis labels on Page 00 swapped to `Orientation=Row` with `clipsContent = true`; long token code cell on Page 02 shortened to `color/background/{role}/subtlest` (204px wide in 330px cell); tile slot frames set to `clipsContent = true`; section pages arranged in clean 3-column grid with 120px inter-row gaps. Official review docs-fit check returned `{ edge: 0, spill: 0 }` across all 11 pages (0/0). Visual inspection of all screenshots (`mobile-alert-set.png`, `mobile-alert-docs.png`) confirmed zero overlap, no crossing of page boundaries or footers. Review lint: `issues: []` |

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
| Round 3 | 2026-11-18 | — | Fixed (R3-1 layout & zero broken words, R3-5 docs fit 0/0, lint 0) |
| Round 2 | 2026-11-18 | — | Fixed (Findings 2, 5, 6, 8 resolved, lint 0) |
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
