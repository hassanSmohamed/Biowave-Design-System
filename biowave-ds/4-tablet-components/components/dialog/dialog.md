# Dialog · نافذة حوار — Tablet

> **One file for Dialog on Tablet:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- tablet dialog`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Dialog · نافذة حوار |
| Summary | A modal window that asks the user to confirm a decision or complete a short focused task before going back to the page. |
| Summary (ar) | نافذة مشروطة تطلب من المستخدم تأكيد قرار أو إكمال مهمة قصيرة مركّزة قبل العودة إلى الصفحة. |
| Parts | Scrim · container · title · close button · alert · body · footer |
| Parts (ar) | الطبقة المعتمة · الحاوية · العنوان · زر الإغلاق · التنبيه · المحتوى · التذييل |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Flutter M3 `Dialog` shown with `showDialog`, styled from semantic tokens; `BwButton` and `BwIconButton` for actions and close |
| Import | `BwDialog`, `showBwDialog` from `package:biowave_tablet/biowave_tablet.dart` |
| Figma | **Biowave DS — Tablet Components** › `↳ Dialog` (page Typography mode `Tablet`) · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-11-13 |
| Plan | Finished |
| Code | Planned |
| Figma build | Built |
| Review | — |
| Source code | `lib/src/components/dialog/` — not built yet (the Executor creates it) |
| Tokens | No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly |
| Contracts | [`dialog-contract.md`](dialog-contract.md) · [`figma-dialog-contract.md`](figma-dialog-contract.md) — generated, never edited |
| Docs page | [`dialog.html`](dialog.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/dialog/dialog.md#b--spec) · [Tablet](../../../4-tablet-components/components/dialog/dialog.md#b--spec) · [Mobile](../../../5-mobile-components/components/dialog/dialog.md#b--spec) |
| Figma | `↳ Dialog` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** (one set per platform file, D-12; Mobile has `OS=iOS · Android`, N-02) |
| Version | 1.0 · 2026-11-13 |

### A1 Overview

A dialog is a window that opens on top of the page and blocks it until the user answers. It asks one clear question ("Delete this shift?") or holds one short task (rename a report, pick a date), and it always ends with the user choosing an action or closing it. Because it interrupts, use it only when the user must decide or act before going on.

### A2 Anatomy

```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ①
░░  ②┌──────────────────────────────────────────┐  ░░
░░   │ ③Disconnect LMS?                    ④[✕] │  ░░
░░   │ ⑤▒ Learners lose access to courses. ▒▒▒▒ │  ░░
░░   │ ⑥Body text, list or form fields          │  ░░
░░   │ ──────────────────────────────────────── │  ░░
░░   │ ⑦                  [ Cancel ][ Disconnect]│  ░░
░░   └──────────────────────────────────────────┘  ░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `scrim` | Yes | Dims the page behind the dialog and blocks it |
| 2 | `container` | Yes | Raised surface with rounded corners that holds the parts below |
| 3 | `title` | Yes | The question or the task, in a few words |
| 4 | `close-button` | No | Icon button that closes the dialog without an action. Shown when closing is safe |
| 5 | `alert` | No | One Alert under the title for a warning the user must read before acting |
| 6 | `body` | Yes | The content: text, a short list or a few form fields. Scrolls when it is taller than the window |
| 7 | `footer` | Yes | One to three actions, the main action at the end. A divider shows above it while the body scrolls |

### A3 Usage

**When to use**
- Confirm an action that is destructive or hard to undo (delete, disconnect, publish)
- A short task that needs the user's full attention and fits on one screen (rename, choose a date, enter a reason)
- Pick a date, time or option on Tablet (IC-08)

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Long forms or more than one step | A page, or a [Side sheet](../../../4-tablet-components/components/side-sheet/side-sheet.md#a--guidelines) on Web and Tablet |
| Extra detail the user may read while working on the page | [Side sheet](../../../4-tablet-components/components/side-sheet/side-sheet.md#a--guidelines) |
| Choices or a short task on Mobile | [Bottom sheet](../../../4-tablet-components/components/bottom-sheet/bottom-sheet.md#a--guidelines) |
| Telling the user an action worked | Snackbar |
| A warning that does not block the task | Alert on the page |
| The action is easy to undo | Do it at once and offer Undo in a Snackbar |

### A4 Options

#### 4.1 `size`
Web and Tablet only. On Mobile the OS sets the width (A8).

| Value | Pick it when |
|---|---|
| `sm` | Short confirmations: a title, one or two sentences, two actions |
| `md` | **Default.** Confirmations with an alert or a list, short forms (up to about four fields) |
| `lg` | Rich content that needs width: a small table, a preview, two columns of fields |

#### 4.2 `kind`
| Value | Looks like | Pick it when |
|---|---|---|
| `basic` | `[ Cancel ][■ Save ■]` | **Default.** Any decision that is safe or easy to undo |
| `destructive` | `[ Cancel ][■ Delete ■]` in the error colour | The main action deletes data or cannot be undone. The main action never gets focus first |

#### 4.3 `close-button`
| Value | Pick it when |
|---|---|
| shown | **Default** on Web and Tablet. Closing without an action is safe |
| hidden | The user must choose one of the actions (for example "Keep editing" or "Discard"). Also hidden on Mobile |

#### 4.4 `alert`
Off by default. Turn it on when the user must read a warning before acting (Disconnect LMS: "Learners lose access to courses"). One alert at most. Not on Mobile.

#### 4.5 `dismissible`
| Value | Pick it when |
|---|---|
| on | **Default.** A tap or click on the scrim, Esc and the Android back gesture close the dialog like Cancel |
| off | The dialog holds unsaved input or the action is in progress; the user closes it only through the actions |

**Combination rules**
- `destructive` with three actions: the destructive action is never the middle one
- `close-button` hidden needs at least one action that closes the dialog
- No dialog opens on top of another dialog

### A5 States and behavior

| State | When it happens | What the user sees |
|---|---|---|
| Opening | The user starts the action | The scrim and the dialog fade in; focus moves into the dialog |
| Open | | The page behind is dimmed and does not respond; Tab stays inside the dialog |
| Body scrolls | The body is taller than the window | Dividers appear above the footer and under the title; header and footer stay put |
| Working | The user chose the main action and it takes time | The main action shows its spinner; the dialog cannot be dismissed until it ends |
| Error | The action failed | The dialog stays open with an alert or field error explaining what to do |
| Closing | An action, the close button, Esc, back or the scrim | The dialog fades out; focus returns to the control that opened it |

**Behavior rules**
- Title wraps to two lines; never truncated. Arabic text is about 25% longer, so test `sm` dialogs in Arabic
- Actions that do not fit in one row stack, full width, main action first
- The dialog never closes on its own; it waits for the user

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| `title` | A question or a short task, sentence case, no full stop. Names the thing: "Delete this shift?" not "Are you sure?" | 60 chars |
| `body` | Says what happens and what cannot be undone. One or two sentences for confirmations | 3 sentences for confirmations |
| main action | Verb that repeats the title's action: "Delete", "Disconnect", "Save" | 3 words |
| other action | "Cancel" when it only closes; a real verb ("Keep editing") when it does something | 3 words |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Delete this shift? · Delete | حذف هذه الوردية؟ · حذف | Are you sure? · OK |
| Disconnect LMS? · Disconnect | فصل نظام إدارة التعلم؟ · فصل | Warning! · Yes / No |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Name the action in the title and on the main button | Ask "Are you sure?" with "Yes" and "No" |
| Use one main action at the end of the footer | Put two filled buttons side by side |
| Keep the dialog to one short task | Put long forms or several steps in a dialog |
| Use `destructive` for delete and other actions that cannot be undone | Use the error colour for safe actions |
| Return focus to the control that opened the dialog | Open a dialog on top of another dialog |

### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Available | ✓ all sizes |
| Layout | Centred on the screen. When the on-screen keyboard opens, the dialog moves up so the focused field stays visible; if it does not fit, the body scrolls |
| Interaction | Touch, plus hardware keyboard (Esc closes a dismissible dialog). A tap on the scrim closes a dismissible dialog |
| Pickers | Date, time and other pickers on Tablet open in a Dialog (decision IC-08) |
| Not supported | Full-screen dialogs (use a page or a Bottom sheet), dialogs stacked on dialogs |

### A9 Accessibility (design)

- Keyboard and screen reader users reach every part of the dialog and nothing behind it while it is open
- The title names the dialog; the body text is read after the title
- Focus starts inside the dialog: on the first field, or on the safe action for `destructive` dialogs; it goes back to the opening control on close
- Esc (and the Android back gesture) closes a dismissible dialog
- Actions keep the 4.5:1 text contrast; the destructive action is not shown by colour only — its label says what it does

### A10 Related components

- [Bottom sheet](../../../4-tablet-components/components/bottom-sheet/bottom-sheet.md#a--guidelines) — choices and short tasks on Mobile and Tablet, attached to the bottom edge
- [Side sheet](../../../4-tablet-components/components/side-sheet/side-sheet.md#a--guidelines) — longer forms and details that keep the page in view on Web and Tablet
- [Button](../button/button.md#a--guidelines) — the footer actions
- [Icon button](../icon-button/icon-button.md#a--guidelines) — the close button

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### showBwDialog / BwDialog
`Future<T?> showBwDialog<T>({required BuildContext context, required BwDialog dialog})` opens the dialog over a modal route and returns the value passed to `Navigator.pop`.

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `title` | `String` | plain text (A6) | — | ✓ | `title` |
| `size` | `BwDialogSize` | `sm` · `md` · `lg` | `md` | | A4.1 |
| `kind` | `BwDialogKind` | `basic` · `destructive` | `basic` | | A4.2 |
| `closeButton` | `bool` | | `true` | | A4.3 |
| `alert` | `Widget?` | one `BwAlert` | — | | A4.4 |
| `content` | `Widget` | text, list, form fields | — | ✓ | `body` |
| `dismissible` | `bool` | | `true` | | A4.5 — scrim tap, Esc and back |
| `primaryAction` | `BwDialogAction` | `label`, `onPressed`, `loading`, `enabled` | — | ✓ | Main action |
| `secondaryAction` | `BwDialogAction?` | | — | | Usually "Cancel" |
| `tertiaryAction` | `BwDialogAction?` | | — | | Rare third action |

Platform naming: web `children` = Flutter `content`; `onClick` = `onPressed`.

**Invalid combinations** (`assert` in debug, fallback in release):
| Combination | Fallback |
|---|---|
| `closeButton: false` and no `secondaryAction` | assert "BwDialog needs a way out"; release shows the close button |
| `tertiaryAction` without `secondaryAction` | assert; release renders it as the secondary |

### B2 Dimensions

```
             spacing-layout-container                  spacing-layout-container
            ├────┤                                              ├────┤
        ┬   ┌──────────────────────────────────────────────────────────┐   radius-3xl · elevation-4
        │   │    Pick a date                                  [✕]      │   title heading-md · gap spacing-xl
        │   │    Body: calendar, list or form fields                   │   body-md
        │   │ ──────────────────────────────────────────────────────── │   divider only while the body scrolls
        │   │                                   [ Cancel ][ Apply ]    │   Button md · gap spacing-md
        ┴   └──────────────────────────────────────────────────────────┘
```

| Part | Property | Token | Flutter |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | `barrierColor: context.bw.colors.overlayDefault` |
| `container` | width | `sm` `size-container-xs` · `md` `size-container-md` · `lg` `size-container-xl`; never wider than the screen minus `spacing-layout-container` each side | `BoxConstraints(maxWidth: BwSize.containerXs / containerMd / containerXl)` · `insetPadding: EdgeInsets.all(context.bw.layout.container)` |
| `container` | max height | screen height minus `spacing-layout-container` top and bottom, minus the keyboard | `insetPadding` + `MediaQuery.viewInsets` |
| `container` | background · radius · elevation | `color-surface-raised` · `radius-3xl` · `elevation-4` | `backgroundColor: surfaceRaised`, `shape: RoundedRectangleBorder(BorderRadius.circular(BwRadius.xl3))`, shadow from `context.bw.elevation.e4`; `surfaceTintColor: Colors.transparent` |
| `container` | padding · gap | `spacing-layout-container` · `spacing-xl` | `EdgeInsetsDirectional.all(context.bw.layout.container)` · `BwSpacing.xl` |
| `title` | text style | `heading-md` (Tablet dialog title) | `context.bw.text.headingMd`, max 2 lines |
| `close-button` | component | Icon button `transparent` · `neutral` · `md`, icon `close` | `BwIconButton(icon: Symbols.close_rounded, label: 'Close' / 'إغلاق')` |
| `alert` | component | one Alert | `BwAlert` |
| `body` | text style · overflow | `body-md` · scrolls | `context.bw.text.bodyMd` · `SingleChildScrollView` |
| `footer` | actions | Button `md`: secondary `outlined neutral`, tertiary `text neutral`, primary `filled` `brand` / `error`; gap `spacing-md`; end-aligned | `BwButton`; `OverflowBar(spacing: BwSpacing.md, overflowSpacing: BwSpacing.md, alignment: MainAxisAlignment.end)` |
| `footer` | `sm` | secondary and primary share the row width equally (Button minimum width removed) so both fit at `size-container-xs` | `Expanded` children in a `Row` |
| `footer` | stacking | stacked, full width, primary first, when the row does not fit | `OverflowBar` overflow, `overflowDirection: VerticalDirection.up` |
| `footer` | divider | Divider default, shown only while the body scrolls | `BwDivider` toggled by the body's `ScrollMetrics` |

Layout rules: centred; height hugs the content up to the max height; moves above the keyboard.

### B3 Tokens by part and state

Every value is a semantic token; there is no `dialog.tokens.json` (no component tokens — the nested Button, Icon button and Divider carry their own).

| Part | Property | Default | Notes |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | |
| `container` | background | `color-surface-raised` | |
| `container` | shadow | `elevation-4` | |
| `title` | color | `color-text-default` | |
| `body` | text colour (plain text) | `color-text-default` | slot content keeps its own tokens |
| `close-button` | — | Icon button B3 (`transparent`, `neutral`) | |
| `footer` | actions | Button B3 (`outlined neutral`, `text neutral`, `filled brand` / `filled error`) | |
| `footer` · header | divider | Divider B3 (`default`) | only while the body scrolls |

Dark theme: same tokens; the surface and overlay switch values. No hover, pressed or disabled state on the dialog itself — its actions keep their own states.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Closed → Open | `open` / `showBwDialog` | scrim and container opacity 0 → 1 | `motion-duration-lg` | `motion-easing-emphasized-decelerate` |
| Open → Closed | action, close button, Esc, back, scrim | opacity 1 → 0 | `motion-duration-md` | `motion-easing-emphasized-accelerate` |
| Body at top → scrolled | body scroll | dividers appear (no animation) | `motion-duration-instant` | — |
| Main action → working | `primaryAction.loading` | Button loading (Button B4) | Button B4 | Button B4 |

Reduced motion: opacity changes become `motion-duration-instant`.

### B5 RTL

```
LTR  │ Disconnect LMS?                       [✕] │      │ [ Cancel ][ Disconnect ] │
RTL  │ [✕]                      فصل نظام إدارة التعلم؟ │      │ [ فصل ][ إلغاء ]          │
```

| Part | In RTL |
|---|---|
| layout | Mirrors: title at the start (right), close button at the end (left), actions end-aligned (left) with the main action last |
| `close-button` icon (`close`) | Does not mirror |
| body | Follows the reading direction; numbers and Latin names stay LTR inside Arabic text |

### B6 Accessibility (implementation)

Design-level rules are in A9; this is how this platform meets them.

| Requirement | Implementation |
|---|---|
| Role / semantics | `Semantics(scopesRoute: true, namesRoute: true, explicitChildNodes: true, label: title)` from the dialog route (M3 `Dialog`) |
| Focus | Route focus scope; first field or, for `destructive`, the secondary action gets focus with a hardware keyboard; focus returns to the opener on close |
| Dismiss | `barrierDismissible: dismissible`; Esc via `DismissIntent` and Android back via `PopScope(canPop: dismissible && !loading)` |
| Close button | `BwIconButton` label "Close" / "إغلاق" |
| Target size | ≥ 48dp (`meetsGuideline(androidTapTargetGuideline)` and iOS 44pt) |
| Screen reader output | "Delete this shift?, alert, Staff will be told it was cancelled." |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves through the dialog only |
| Esc | Closes when `dismissible` |
| Enter / Space | Activate the focused action |

### B7 Examples

```dart
import 'package:biowave_tablet/biowave_tablet.dart';

final ok = await showBwDialog<bool>(
  context: context,
  dialog: BwDialog(
    title: 'Delete this shift?',
    kind: BwDialogKind.destructive,
    content: const Text('Staff will be told it was cancelled.'),
    secondaryAction: BwDialogAction(label: 'Cancel', onPressed: () => Navigator.pop(context, false)),
    primaryAction: BwDialogAction(label: 'Delete', onPressed: () => Navigator.pop(context, true)),
  ),
);

// Arabic: same API; direction from the app locale
BwDialog(title: 'حذف هذه الوردية؟', kind: BwDialogKind.destructive, content: const Text('سيتم إبلاغ الموظفين بإلغائها.'),
  secondaryAction: BwDialogAction(label: 'إلغاء', onPressed: close),
  primaryAction: BwDialogAction(label: 'حذف', onPressed: remove));
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: container, scrim, title, body and actions use exactly the B2–B3 tokens for every `size`
- [ ] Every transition in B4 with the token durations and easings; reduced motion → `motion-duration-instant`
- [ ] `kind="destructive"`: main action in the error colour; first focus on the secondary action
- [ ] `dismissible` on / off: scrim, Esc and back close or do nothing; nothing closes while `primaryAction.loading`
- [ ] Focus moves into the dialog on open, stays inside (Tab wraps) and returns to the opener on close
- [ ] Long body scrolls with header and footer fixed; dividers only while scrolled
- [ ] Footer stacks full width, primary first, when the actions do not fit (`sm` in Arabic)
- [ ] Every invalid combination in B1 warns / asserts and falls back
- [ ] a11y: `meetsGuideline` tap target and text contrast, semantics tree names the route
- [ ] No raw values (lint over the component folder)

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `dialog-contract.md`.

> Written by the Planner (Claude). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · 2026-11-13 |

### C1 Goal

`BwDialog` / `showBwDialog` from `package:biowave_tablet` matches B1–B6 and passes B9 and C6.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Alert (Wave 9); until it exists the `alert` slot takes any widget / node
- Full-screen dialogs, stacked dialogs, draggable dialogs
- Button, Icon button and Divider code (used as they are)

### C3 Approach

- **Base:** `showBwDialog` calls `showDialog(barrierColor: overlayDefault, barrierDismissible: dismissible)`; the builder returns M3 `Dialog` with `backgroundColor: surfaceRaised`, `surfaceTintColor: Colors.transparent`, the B2 shape and shadow, `insetPadding` and a `ConstrainedBox` for `size`.
- **Motion:** pass `AnimationStyle(duration: BwDuration.lg, reverseDuration: BwDuration.md, curve: BwEasing.emphasizedDecelerate, reverseCurve: BwEasing.emphasizedAccelerate)` (`showDialog(animationStyle:)`); `context.bw.reduceMotion` → `BwDuration.instant`.
- **Structure:** `Column` of title row (`Text` + `BwIconButton`), `alert`, `Flexible(SingleChildScrollView(content))`, `OverflowBar` of `BwButton`s; dividers from a `ScrollController` listener.
- **Dismiss while loading:** `PopScope(canPop: dismissible && !primaryAction.loading)`.
- **Keyboard:** `MediaQuery.viewInsetsOf` added to the inset so the dialog rises above the keyboard.

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
4-tablet-components/lib/src/components/dialog/bw_dialog.dart   new (widget, showBwDialog, BwDialogAction, enums)
4-tablet-components/test/dialog_test.dart                          new
4-tablet-components/test/goldens/dialog/                           new goldens
4-tablet-components/lib/biowave_tablet.dart                     change: export (alphabetical)
4-tablet-components/README.md                                      change: Dialog row (Code)
CHANGELOG.md                                                      change: one entry
```

### C6 Tests

Implement every item in B9, plus:
- [ ] The dialog rises above the on-screen keyboard and the focused field stays visible
- [ ] Earlier tests still pass

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6 (focus in, trap, return; dismiss rules)
- [ ] AC-5 Tests in B9 and C6 exist and pass; `cd 4-tablet-components && flutter analyze && flutter test`, `npm run docs:check` pass
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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-dialog-contract.md`.

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Tablet set in **Biowave DS — Tablet Components**.

| Field | Value |
|---|---|
| Component | Dialog |
| Figma file | **Biowave DS — Tablet Components** (`_sync/figma-files.json` › `tablet`) — never the Foundations file |
| Page / section | `↳ Dialog` › sections `Dialog` and `Dialog — Documentation` |
| Mode | **Create new.** No legacy Dialog set exists; the anatomy comes from the legacy product screen `LMS _Disconnect` (Web `↳ Inputs`) and the Material 3 `Basic dialog` |
| Depends on | Button, Icon Button and Divider sets in this file (Alert slot uses a placeholder until Alert is built in Wave 9) |
| Plan version | 1 · 2026-11-13 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `figma-read-tokens.js` lint must report 0.
- **Typography mode:** on page `↳ Dialog` set the explicit variable mode **`Tablet · EN`** of `5. Typography` (Arabic variants and examples: **`Tablet · AR`**).
- Nested parts are instances of the sets already in this file (Button, Icon Button, Divider) — never detached, never redrawn.
- The `scrim` is a private base component `.Scrim` (one per file, shared by Dialog, Bottom sheet and Side sheet): a frame filled with `color/overlay/default`, no other properties. Examples place the overlay component on top of it inside a device frame.

### D2 Component structure

```
❖ Dialog                          ← component set (published)
  ├─ ◇ .Scrim                      ← private, shared with Bottom sheet and Side sheet
  └─ ◇ .Dialog/body                ← private placeholder slot (swap for the real content)
```

### D3 Layer tree and auto layout

```
Dialog                     ↕ vertical · gap spacing/xl · padding spacing/layout/container · width FIXED bound to size/container/xs|md|xl (Size)
│                            height hug · radius/3xl · fill color/surface/raised · effect Elevation/4
├── header                 ↔ gap spacing/xl · counter-axis top
│   ├── title              T heading/md · fill color/text/default · width fill · TEXT `Title`
│   └── close-button       ◇ Icon Button transparent · neutral · md · glyph close · BOOLEAN `Close button`
├── alert                  ◇ placeholder frame (Alert in Wave 9) · width fill · BOOLEAN `Alert`
├── body                   ▢ SLOT `Body` (default content ◇ .Dialog/body) · width fill
└── footer                 ↔ end-aligned · gap spacing/md
    ├── tertiary-action    ◇ Button text · neutral · md · BOOLEAN `Tertiary action`
    ├── spacer             (fill, only when tertiary is shown)
    ├── secondary-action   ◇ Button outlined · neutral · md · BOOLEAN `Secondary action`
    └── primary-action     ◇ Button filled · brand (Basic) | error (Destructive) · md
```

`.Dialog/body` = vertical auto layout, width fill, one text `body/md` · `color/text/default` · TEXT `Body`.

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` | `sm` · `md` · `lg` |
| `Kind` | VARIANT | `Basic` · `Destructive` | `Basic` | `kind` | `basic` · `destructive` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | provider / locale |
| `Title` | TEXT | | `Disconnect LMS?` | `title` | |
| `Close button` | BOOLEAN | | `true` | `closeButton` | |
| `Alert` | BOOLEAN | | `false` | `alert` | present / absent |
| `Body` | SLOT | any content (default `.Dialog/body`) | `.Dialog/body` | `children` / `content` | |
| `Secondary action` | BOOLEAN | | `true` | `secondaryAction` | present / absent |
| `Tertiary action` | BOOLEAN | | `false` | `tertiaryAction` | present / absent |

**Language and shared properties (Figma rule).** A TEXT property has one value for the whole set, so `Title` is bound on the `EN` variants only; `AR` variants carry Arabic sample copy that designers edit directly.

**Slots (R-1).** `Body` is a real Figma SLOT shared by all variants: drop any content in (form fields, a Calendar, a list) without detaching. The 07 pages of the pickers use it.

### D5 Variants to generate

- Axes: `Size × Kind × Language` = 3 × 2 × 2 = **12** variants
- Grid: rows = Size × Kind, columns = Language; gap `spacing/xl`

### D6 States, interactions and motion

No prototype interactions on the set. Opening, scrolled, working and closing are shown on doc page 04 with B4 timings written next to them.

### D7 RTL

`Language=AR` variants: Typography mode `Tablet · AR`, auto layout direction from the text, layout per B5; Arabic copy from A6 (`حذف هذه الوردية؟`, `فصل نظام إدارة التعلم؟`). The `close` glyph does not mirror.

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Dialog — Documentation`, frames `Dialog / 00 Component sheet` … `Dialog / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Dialog:
- 01 Introduction: Light + Dark panels, an `MD` Destructive dialog over a Tablet frame with the scrim
- 03 Variations: Size (SM confirmation, MD with alert, LG two-column form) · Kind · close button on / off
- 04 States and motion: opening, scrolled body with dividers, working (primary loading), error
- 07 Platform: the A8 table; dialog above the on-screen keyboard; a picker in a dialog (IC-08)
- 05 Usage: the A7 pairs, built with live instances

Component description: "Modal window for a decision or a short task. Spec: 4-tablet-components/components/dialog/dialog.md".

### D9 Code Connect

- File: `4-tablet-components/lib/src/components/dialog/bw_dialog.figma.dart`
- Mapping: D4. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Dialog`, private components and layer names match D2–D3 and A2
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
| Node IDs | page `175:12` · set `175:3671` (12) · `.Scrim` `175:2465` (shared by Bottom sheet and Side sheet) · `.Dialog/body` `175:2466` · docs `180:3988` (00–09, 11) · card `181:5995` |
| QA report | Unbound fills, strokes, padding and gaps: 0 · no local styles · text uses library styles · Light and Dark by mode switch |

**Deviations:**
- `Title` bound on EN variants only (D4 note); AR buttons use `.Button _ar`
- `sm`: actions share the footer width (B2)
- Alert slot is a dashed placeholder frame until Alert (Wave 9)

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
