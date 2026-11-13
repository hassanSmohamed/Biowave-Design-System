# Bottom sheet · اللوحة السفلية — Mobile

> **One file for Bottom sheet on Mobile:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- mobile bottom-sheet`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Bottom sheet · اللوحة السفلية |
| Summary | A panel that slides up from the bottom of a touch screen to show choices, actions or a short task without leaving the screen. |
| Summary (ar) | لوحة تنزلق من أسفل شاشة اللمس لعرض خيارات أو إجراءات أو مهمة قصيرة دون مغادرة الشاشة. |
| Parts | Scrim · container · grabber · header · content · footer |
| Parts (ar) | الطبقة المعتمة · الحاوية · مقبض السحب · الرأس · المحتوى · التذييل |
| Platform | Mobile · Flutter + Material 3 + Cupertino (adaptive, N-07) |
| Built on | Flutter adaptive (N-07): Android → M3 `showModalBottomSheet` with drag handle; iOS → `CupertinoSheetRoute` (sheet with grabber and detents) and, for `type: action`, `CupertinoActionSheet` — the iOS and iPadOS 27 anatomy in Biowave colours and type |
| Import | `BwBottomSheet`, `showBwBottomSheet` from `package:biowave_mobile/biowave_mobile.dart` |
| Figma | **Biowave DS — Mobile Components** › `↳ Bottom sheet` (page Typography mode `Mobile`) · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-11-13 |
| Plan | Finished |
| Code | Planned |
| Figma build | Built |
| Review | — |
| Source code | `lib/src/components/bottom-sheet/` — not built yet (the Executor creates it) |
| Tokens | No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly |
| Contracts | [`bottom-sheet-contract.md`](bottom-sheet-contract.md) · [`figma-bottom-sheet-contract.md`](figma-bottom-sheet-contract.md) — generated, never edited |
| Docs page | [`bottom-sheet.html`](bottom-sheet.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Tablet](../../../4-tablet-components/components/bottom-sheet/bottom-sheet.md#b--spec) · [Mobile](../../../5-mobile-components/components/bottom-sheet/bottom-sheet.md#b--spec) — touch only; Web uses a [Dialog](../../../3-web-components/components/dialog/dialog.md#a--guidelines) or a [Side sheet](../../../3-web-components/components/side-sheet/side-sheet.md#a--guidelines) |
| Figma | `↳ Bottom sheet` in **Biowave DS — Tablet Components** · **Mobile Components** (Mobile has `OS=iOS · Android`, N-02) |
| Version | 1.0 · 2026-11-13 |

### A1 Overview

A bottom sheet slides up from the bottom edge of a touch screen and sits on top of it. It holds choices (filter by status, pick a member), a list of actions (take a photo, choose a file) or a short task (write a reason), and the user can still see the top of the screen behind it. The user closes it by finishing the task, tapping outside it or dragging it down.

### A2 Anatomy

```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ①
┌─────────────────────────────────────────┐ ②
│                 ③━━━━                    │
│ ④ Filter by status                  [✕] │
│ ─────────────────────────────────────── │
│ ⑤ ○ Pending                         12  │
│   ● Approved                         3  │
│   ○ Rejected                         1  │
│ ⑥ [              Apply               ]  │
└─────────────────────────────────────────┘
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `scrim` | Yes | Dims the screen behind and closes the sheet on tap |
| 2 | `container` | Yes | Raised surface attached to the bottom edge, rounded top corners only |
| 3 | `grabber` | Yes | Small bar that shows the sheet can be dragged; dragging it down closes the sheet or moves it between heights |
| 4 | `header` | No | The sheet title with a close button, or, on iOS, a row of round Close · title · Done buttons |
| 5 | `content` | Yes | The options, actions or task. Scrolls when it is taller than the sheet |
| 6 | `footer` | No | One full-width main action that applies the choice (Apply, Save). Stays at the bottom while the content scrolls |

### A3 Usage

**When to use**
- Choose from options on a touch screen: filters, Select, Autocomplete and Phone country lists (IC-16)
- Offer two to six actions for one thing (sources for File upload, actions on a row)
- A short task on Mobile that would be a Dialog on a bigger screen (write a rejection reason)
- Date and time pickers on Mobile (IC-08)

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| A yes / no confirmation | [Dialog](../../../3-web-components/components/dialog/dialog.md#a--guidelines) |
| Long forms or several steps | A full screen (page) |
| Side information on a Tablet in landscape | [Side sheet](../../../3-web-components/components/side-sheet/side-sheet.md#a--guidelines) |
| Telling the user an action worked | Snackbar |
| Navigation between top-level sections | Navigation bar |

### A4 Options

#### 4.1 `type`
| Value | Looks like | Pick it when |
|---|---|---|
| `standard` | header · any content · optional footer | **Default.** Filters, a short form, a picker |
| `list` | rows with a label and a check on the chosen one | One choice from a list (Select, Autocomplete, Phone country). Choosing a row closes the sheet |
| `action` | rows with an icon and a verb | Two to six actions for one thing. Choosing a row runs it and closes the sheet; on iOS this is the native Action sheet |

#### 4.2 `detent` (height)
| Value | Pick it when |
|---|---|
| `auto` | **Default.** The sheet is as tall as its content, up to about 90% of the screen |
| `full` | Long lists with search, or content that needs the whole screen; the user can drag it down to the half height first |

#### 4.3 `footer`
Off by default. Turn it on for `standard` sheets whose choices apply together (Apply, Save). `list` and `action` sheets have no footer — a tap on a row is the answer.

#### 4.4 `dismissible`
| Value | Pick it when |
|---|---|
| on | **Default.** Tap on the scrim, drag down and the back gesture close the sheet |
| off | The sheet holds unsaved input; dragging down shows "Discard changes?" instead of closing |

**Combination rules**
- `action` sheets have no header title on Android unless the actions need context ("Shift on 12 May"); on iOS the title and message are optional lines above the actions
- No sheet opens on top of another sheet; replace the content instead

### A5 States and behavior

| State | When it happens | What the user sees |
|---|---|---|
| Opening | The user taps the trigger | The scrim fades in and the sheet slides up |
| Open | | The screen behind is dimmed and does not respond |
| Dragging | The user drags the grabber or the header | The sheet follows the finger; releasing it snaps to the nearest height or closes it |
| Content scrolls | The content is taller than the sheet | A divider shows under the header; the footer stays at the bottom |
| Keyboard open | A field in the sheet gets focus | The sheet rises above the keyboard |
| Closing | Done, a row tap, the scrim, drag down or back | The sheet slides down and the scrim fades out; focus returns to the trigger |

**Behavior rules**
- Titles wrap to two lines; rows wrap and never truncate. Arabic is about 25% longer
- The sheet never covers the status bar; at `full` it stops below it

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| title | What is being chosen, sentence case: "Filter by status", "Choose a member" | 40 chars |
| row (`list`) | The option as the user knows it; counts at the end | 1 line preferred |
| row (`action`) | Verb first: "Take photo", "Choose from files" | 3 words |
| footer action | The outcome: "Apply", "Save reason" | 2 words |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Filter by status · Apply | تصفية حسب الحالة · تطبيق | Options · OK |
| Take photo | التقاط صورة | Camera |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Close a `list` sheet as soon as the user picks a row | Add an Apply button to a single-choice list |
| Keep a visible grabber so users know they can drag | Hide the grabber or make the sheet impossible to close |
| Use the native Action sheet for iOS action lists | Draw a custom action list on iOS |
| Keep one task per sheet | Open a sheet from a sheet |
| Ask before closing a sheet with unsaved input | Lose what the user typed on a drag down |

### A8 Platform notes — Mobile

On Mobile the bottom sheet is the **native sheet** of each OS (N-01) in Biowave colours and type. iOS forms come only from the **iOS and iPadOS 27** kit.

```
iOS — Sheet (standard / list)         iOS — Action sheet (action)        Android — M3 bottom sheet
╭─────────────────────────────╮        ╭───────────────────────────╮      ┌─────────────────────────────┐
│           ━━━━              │        │ Add attachment            │      │            ━━━━             │
│ (✕)  Filter by status   (✓) │        │ Choose where the file …   │      │ Filter by status        [✕] │
│ ☐ Pending               12  │        │ (     Take photo        ) │      │ ☐ Pending              12   │
│ ☐ Approved               3  │        │ (  Choose from files    ) │      │ ☐ Approved              3   │
╰─────────────────────────────╯        │ ( Remove attachment ) red │      │ [         Apply           ] │
  floats, inset from the edges         ╰───────────────────────────╯      └─────────────────────────────┘
```

| | iOS | Android |
|---|---|---|
| `standard` · `list` | Floating sheet with grabber and detents (medium · large); header row with round Close (✕) · title · Done (✓) buttons (Done replaces the footer action) | M3 modal bottom sheet with drag handle; title + close; footer action |
| `action` | Native Action sheet (iOS 27): title and message, capsule actions, destructive action with error text; tap outside closes | M3 bottom sheet with icon + label rows |
| `detent` | `auto` = medium, `full` = large | `auto` = content height, `full` = expanded |
| Dismiss | Swipe down, tap outside, Close (✕) | Drag down, tap outside, back gesture |

### A9 Accessibility (design)

- Screen reader users hear the sheet title when it opens and cannot reach the screen behind it
- Every way of closing that needs a drag also has a button or the back gesture (WCAG 2.5.7)
- Focus moves into the sheet on open and back to the trigger on close
- Rows are at least the touch target size; the chosen row is announced as selected, not shown by the check only

### A10 Related components

- [Dialog](../../../3-web-components/components/dialog/dialog.md#a--guidelines) — confirmations; on Mobile the native alert
- [Side sheet](../../../3-web-components/components/side-sheet/side-sheet.md#a--guidelines) — longer tasks beside the content on Web and Tablet
- [Button](../button/button.md#a--guidelines) — the footer action

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### showBwBottomSheet / BwBottomSheet
`Future<T?> showBwBottomSheet<T>({required BuildContext context, required BwBottomSheet sheet})` opens a modal sheet and returns the value passed to `Navigator.pop` (the chosen option or action).

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `type` | `BwBottomSheetType` | `standard` · `list` · `action` | `standard` | | A4.1 |
| `detent` | `BwBottomSheetDetent` | `auto` · `full` | `auto` | | A4.2 |
| `title` | `String?` | (A6) | — | | `header` title (iOS: centre of the Close · Title · Done row; Android: start) |
| `message` | `String?` | | — | | iOS Action sheet message line only |
| `doneLabel` | `String?` | | — | | Accessible name of the iOS Done (✓) button for `standard`; replaces the footer on iOS |
| `content` | `Widget?` | any | — | with `standard` | `content` for `standard` |
| `options` | `List<BwSheetOption<T>>` | `label`, `value`, `trailing`, `enabled` | — | with `list` | Rows for `list`; `selected` marks the chosen value |
| `selected` | `T?` | | — | | The chosen option in a `list` |
| `actions` | `List<BwSheetAction>` | `label`, `icon`, `destructive`, `onPressed` | — | with `action` | Rows for `action` (2–6) |
| `footerAction` | `BwDialogAction?` | | — | | A4.3 — full-width primary Button |
| `dismissible` | `bool` | | `true` | | A4.4 |
| `onDismissAttempt` | `Future<bool> Function()?` | | — | | Called when `dismissible` is false and the user drags down or taps the scrim; return `true` to close (e.g. after "Discard changes?") |

Platform naming: Web has no Bottom sheet (A8 of Dialog / Side sheet).

**Invalid combinations** (`assert` in debug, fallback in release):
| Combination | Fallback |
|---|---|
| `type: list` without `options`, or `type: action` without `actions` | assert; release shows an empty sheet with the title |
| `actions` fewer than 2 or more than 6 | assert "Use 2–6 actions"; release renders them |
| `footerAction` with `type: list` or `action` | assert; release ignores the footer |
| `doneLabel` and `footerAction` together | assert; iOS uses `doneLabel`, Android uses `footerAction` |

### B2 Dimensions

```
iOS — Sheet (iOS and iPadOS 27)              Android — M3 bottom sheet
╭───────────────────────────────────╮        ┌───────────────────────────────────┐  iOS radius-4xl all corners, inset spacing-sm
│               ━━━━                │        │               ━━━━                │  Android radius-4xl top · elevation-4
│ (✕)     Filter by status     (✓)  │        │ Filter by status              [✕] │  title-lg
│ ☐ Pending                    12   │        │ ☐ Pending                    12   │  rows: List item lg
│ ☐ Approved                    3   │        │ [             Apply             ] │  Button lg full width
╰───────────────────────────────────╯        └───────────────────────────────────┘
```

| Part | Property | iOS | Android |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | `color-overlay-default` |
| `container` | width | screen width minus `spacing-sm` each side (floating) | full screen width |
| `container` | background | `color-surface-raised` | `color-surface-raised`, `surfaceTintColor: Colors.transparent` |
| `container` | radius · elevation | `radius-4xl` all corners · `elevation-4` | `radius-4xl` top corners · `elevation-4` |
| `container` | heights | `auto` = medium detent · `full` = large detent | `auto` = content up to 90% · `full` = expanded below the status bar |
| `grabber` | | the OS grabber (`Grabber` in the Apple kit) | width `size-icon-xl` · height `spacing-xs` · `radius-full` · `color-border-default` |
| `header` | layout | round buttons `size-control-height-md`, `radius-full`: Close (✕, `color-background-transparent-hovered`, icon `color-icon-default`) · title (`title-lg`, centred) · Done (✓, `color-background-brand-default`, icon `color-icon-on-brand`; hidden on `list`); padding-inline `spacing-xl`, gap `spacing-xl` | title `title-lg` start + close Icon button (`transparent neutral md`) |
| row (`list`) | | List item lg (same rows as Android); chosen row `selected` with trailing `check` | `body-md`; chosen row trailing `check` `color-icon-role-brand`; min height `size-control-height-lg` |
| `action` | | iOS 27 Action Sheet card (`radius-4xl`, padding `spacing-xl`): title `title-lg`, message `label-md` `color-text-subtle`, capsule actions (`size-control-height-lg`, `radius-full`, `color-background-transparent-hovered`, label `action-md`), destructive label `color-text-role-error`; no separate Cancel group | rows with leading icon `size-icon-lg` `color-icon-default` + `body-md` label; destructive in `color-text-role-error` / `color-icon-role-error` |
| `footer` | | none — Done in the header (`doneLabel`) | padding `spacing-layout-container`; Button `filled brand lg` full width |
| padding | content | `spacing-layout-container` inline | `spacing-layout-container` inline |

Fonts: Biowave text styles (`context.bw.text`) on both OSes; the OS keeps its sheet shape and materials. The iOS grabber is the kit instance (system chrome, N-02).

### B3 Tokens by part and state

Every value is a semantic token; there is no `bottom-sheet.tokens.json` (nested Button, Icon button and Divider carry their own).

| Part | Property | Default | Pressed | Selected | Disabled |
|---|---|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | — | — | — |
| `container` | background | `color-surface-raised` | — | — | — |
| `container` | shadow | `elevation-4` (Android) | — | — | — |
| `grabber` | fill | `color-border-default` | — | — | — |
| title | color | `color-text-default` | — | — | — |
| row | background | transparent | `color-background-transparent-pressed` | — | — |
| row | label | `color-text-default` | — | `color-text-default` | `color-text-disabled` |
| row | check icon | — | — | `color-icon-role-brand` | — |
| row (`action`) | icon | `color-icon-default` | — | — | `color-icon-disabled` |
| destructive row | label · icon | `color-text-role-error` · `color-icon-role-error` | `color-background-transparent-pressed` | — | `color-text-disabled` |
| row separator · header divider | stroke | `color-border-subtle` | — | — | — |

Dark theme: same tokens; no exceptions.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Closed → Open | `showBwBottomSheet` | scrim opacity · sheet slides up from below the screen | `motion-duration-lg` | `motion-easing-emphasized-decelerate` |
| Open → Closed | row tap, footer / Done, scrim, back, drag release past half | sheet slides down · scrim fades | `motion-duration-md` | `motion-easing-emphasized-accelerate` |
| Dragging | finger on grabber or header | sheet follows the finger (no easing) | — | — |
| Release → snap | drag released | to the nearest detent | `motion-duration-md` | `motion-easing-standard` |
| Row pressed | touch down | row background | `motion-duration-sm` | `motion-easing-standard` |

On iOS the sheet and the Action sheet keep the OS timing (framework `CupertinoSheetRoute` / `showCupertinoModalPopup`), so they feel native (N-05); the table applies to Android.

Reduced motion: slide and fade become `motion-duration-instant`; dragging still follows the finger.

### B5 RTL

| Part | In RTL |
|---|---|
| layout | Mirrors: title at the start (right), close button at the end (left); iOS header Close on the right, Done on the left |
| rows | Label at the start, counts and check at the end (left) |
| icons | `check`, `close`, `photo_camera`, `attach_file` do not mirror; `arrow_back` / `chevron_forward` mirror |
| grabber | Centred (no change) |

### B6 Accessibility (implementation)

Design-level rules are in A9; this is how this platform meets them.

| Requirement | Implementation |
|---|---|
| Role / semantics | Modal route: `Semantics(scopesRoute: true, namesRoute: true, label: title)`; screen behind excluded |
| Focus | Focus moves into the sheet (first row or field); returns to the trigger on close |
| Drag alternative | Close button (all) and the back gesture; `dismissible: false` still offers Close (WCAG 2.5.7) |
| Rows | `Semantics(button: true, selected: chosen, inMutuallyExclusiveGroup: true)` for `list` |
| Target size | Rows ≥ `size-control-height-lg` (48dp), grabber area ≥ 48dp |
| Keyboard | `viewInsets` lift the sheet above the on-screen keyboard |
| Screen reader output | "Filter by status, sheet. Approved, selected, 2 of 3" |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves through the sheet only |
| Esc | Closes when `dismissible` (else `onDismissAttempt`) |
| Enter / Space | Activates the focused row or action |

### B7 Examples

```dart
import 'package:biowave_mobile/biowave_mobile.dart';

// list — picking a row returns it and closes the sheet
final status = await showBwBottomSheet<String>(
  context: context,
  sheet: BwBottomSheet(
    type: BwBottomSheetType.list,
    title: 'Filter by status',
    selected: current,
    options: const [
      BwSheetOption(label: 'Pending', value: 'pending', trailing: Text('12')),
      BwSheetOption(label: 'Approved', value: 'approved', trailing: Text('3')),
    ],
  ),
);

// action — Arabic, direction from the app locale
showBwBottomSheet(context: context, sheet: BwBottomSheet(
  type: BwBottomSheetType.action,
  actions: [
    BwSheetAction(label: 'التقاط صورة', icon: Symbols.photo_camera_rounded, onPressed: takePhoto),
    BwSheetAction(label: 'اختيار من الملفات', icon: Symbols.attach_file_rounded, onPressed: pickFile),
  ],
));
```

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: every part uses exactly the B2–B3 tokens on iOS and Android (`debugDefaultTargetPlatformOverride`)
- [ ] Every transition in B4 with token durations and easings; reduced motion → `motion-duration-instant`
- [ ] `list`: tapping a row pops with its value; the chosen row has the check and `selected` semantics
- [ ] `action`: 2–6 rows; destructive row in the error colours; iOS renders `CupertinoActionSheet`
- [ ] `detent: auto` hugs short content and stops at 90% of the screen; `full` expands below the status bar
- [ ] `dismissible: false`: drag down and scrim tap call `onDismissAttempt` and do not close on `false`
- [ ] The sheet rises above the on-screen keyboard
- [ ] Every invalid combination in B1 asserts and falls back
- [ ] a11y: `meetsGuideline` tap target and text contrast; semantics names the route; close works without dragging
- [ ] No raw values (lint over the component folder)

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `bottom-sheet-contract.md`.

> Written by the Planner (Claude). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · 2026-11-13 |

### C1 Goal

`BwBottomSheet` / `showBwBottomSheet` from `package:biowave_mobile`, native on iOS and Android matches B1–B6 and passes B9 and C6.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Non-modal (persistent) sheets
- Search inside the sheet (the Autocomplete component provides it as `content`)
- Select, Autocomplete, Phone and pickers switching to `BwBottomSheet` — their own follow-up plans (plan R-1, R-3)

### C3 Approach

- **Adaptive (N-07):** branch on `Theme.of(context).platform`.
  - **Android:** same as the Tablet plan (`showModalBottomSheet`, drag handle, Biowave shape, `AnimationStyle`), full screen width.
  - **iOS `standard` / `list`:** `Navigator.push(CupertinoSheetRoute(builder: …))` with a Biowave `CupertinoTheme`; header row = round Close (✕) button · title · round Done (✓) button (`doneLabel` as its semantics label); detents medium / large. If the Flutter version in use has no detents on `CupertinoSheetRoute`, use `DraggableScrollableSheet` inside it with the same snap sizes and record it in C8.
  - **iOS `action`:** `showCupertinoModalPopup(builder: (_) => CupertinoActionSheet(title:, message:, actions: [CupertinoActionSheetAction(isDestructiveAction: …)]))`. If the Flutter version still draws the pre-iOS 26 action sheet (separators, separate Cancel group), keep it and report in C8 › Questions (same rule as Dialog).
- **Theme:** colours and fonts from `BwMobileTheme` (`bottomSheetTheme`, `CupertinoThemeData`); pass `context.bw.text` styles explicitly to Cupertino widgets (they ignore `ThemeData` text).
- **Dismiss guard:** as Tablet; on iOS also `CupertinoSheetRoute` drag is disabled when `dismissible` is false.

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
5-mobile-components/lib/src/components/bottom_sheet/bw_bottom_sheet.dart   new (widget, showBwBottomSheet, BwSheetOption, BwSheetAction, enums)
5-mobile-components/test/bottom_sheet_test.dart                               new
5-mobile-components/test/goldens/bottom_sheet/                                new goldens (iOS and Android)
5-mobile-components/lib/biowave_mobile.dart                                change: export (alphabetical)
5-mobile-components/README.md                                                 change: Bottom sheet row (Code)
CHANGELOG.md                                                                 change: one entry
```

### C6 Tests

Implement every item in B9, plus:
- [ ] iOS: `standard` uses `CupertinoSheetRoute` with the Close · Title · Done header; `action` uses `CupertinoActionSheet` (goldens en/ar)
- [ ] Biowave fonts on both OSes
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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-bottom-sheet-contract.md`.

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Mobile set in **Biowave DS — Mobile Components**.

| Field | Value |
|---|---|
| Component | Bottom sheet |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) — never the Foundations file |
| Page / section | `↳ Bottom sheet` › sections `Bottom sheet` and `Bottom sheet — Documentation` |
| Mode | **Create new.** Reuse the legacy Mobile `Bottom Sheet` sets (Foundations `4131:10299`: header Cancel · Title · Reset, status / date / member / device content, Apply footer) for content and the iOS header; legacy sets stay in `_Deprecation Ground`, untouched, plus the iOS and iPadOS 27 `Sheet - iPhone`, `Action Sheet`, `Grabber` and the Material 3 `Bottom sheet` kits linked in this file |
| Depends on | Button, Icon Button and Divider sets in this file; `.Scrim` from the Dialog page (create it there first if Dialog is not built) |
| Plan version | 1 · 2026-11-13 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `figma-read-tokens.js` lint must report 0.
- **Typography mode:** on page `↳ Bottom sheet` set the explicit variable mode **`Mobile · EN`** of `5. Typography` (Arabic variants and examples: **`Mobile · AR`**).
- Nested parts are instances of the sets already in this file (Button, Icon Button, Divider) — never detached, never redrawn.
- The `scrim` is a private base component `.Scrim` (one per file, shared by Dialog, Bottom sheet and Side sheet): a frame filled with `color/overlay/default`, no other properties. Examples place the overlay component on top of it inside a device frame.

### D2 Component structure

```
❖ Bottom sheet                    ← component set (published)
  ├─ ❖ .Bottom sheet/ios-button    ← private set: round header button, Style = Close · Confirm
  ├─ ◇ .Bottom sheet/content       ← private slot for `Standard` (List item checkbox rows); `… AR` copy
  └─ uses ❖ .Dialog/ios-action (Dialog page) for the iOS Action Sheet capsules, and ❖ List item for rows
```

### D3 Layer tree and auto layout

```
Bottom sheet (OS=Android)  as Tablet D3, width = screen (fill in the device frame example; set fixed 360 for the set)
Bottom sheet (OS=iOS, Standard / List)
│                            width 360 sample · radius/4xl all corners · Elevation/4 · fill color/surface/raised · padding-bottom spacing/lg
├── grabber-area           ↕ padding-top spacing/sm · ◇ Grabber (iOS and iPadOS 27 kit instance, system chrome)
├── header                 ↔ padding-inline spacing/xl · gap spacing/xl · ◇ ios-button Close · T title/lg centred · ◇ ios-button Confirm (opacity 0 on List)
└── content                List item rows (padding-inline spacing/lg) | ◇ .Bottom sheet/content
Bottom sheet (OS=iOS, Action)   ↕ padding spacing/xl · gap spacing/xl · radius/4xl
├── header                 ↕ padding-inline spacing/md · T title/lg + T label/md color/text/subtle (message)
└── content                ↕ gap spacing/md · ◇ .Dialog/ios-action Style=Cancel × 2 + Style=Destructive (fill width)
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `OS` | VARIANT | `iOS` · `Android` | `iOS` | — | `Theme.platform` (N-07) |
| `Type` | VARIANT | `Standard` · `List` · `Action` | `Standard` | `type` | `standard` · `list` · `action` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Title` | TEXT | | `Filter by status` | `title` | |
| `Header` | BOOLEAN | | `true` | `title` | set / null — off when the content brings its own header (pickers) |
| `Footer` | BOOLEAN | | `true` | `footerAction` | Android `Standard` only |
| `Content` | SLOT | any content (default `.Bottom sheet/content`) — Standard only | | `content` | |

**Slots (R-1).** `Content` is a real Figma SLOT on the Standard variants: Select, Autocomplete, Phone and the pickers place their own content in it (07 pages). Turn `Header` and `Footer` off when that content brings its own title and actions.

### D5 Variants to generate

- Axes: `OS × Type × Language` = 2 × 3 × 2 = **12** variants
- Grid: rows = OS × Type, columns = Language; gap `spacing/xl`

### D6 States, interactions and motion

No prototype interactions on the set. Opening, dragging, the detents and closing are shown on doc page 04 with B4 timings written next to them.

### D7 RTL

`Language=AR` variants: Typography mode `Mobile · AR`, auto layout direction from the text, layout per B5; Arabic copy from A6. The `close` and `check` glyphs do not mirror; `arrow_back` mirrors.

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Bottom sheet — Documentation`, frames `Bottom sheet / 00 Component sheet` … `Bottom sheet / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Bottom sheet:
- 01 Introduction: Light + Dark panels, iOS and Android `List` sheets over phone frames with the scrim
- 03 Variations: OS × Type; detents (`auto` = medium, `full` = large); legacy content rebuilt (status with counts, date range, member picker)
- 07 Platform: the A8 table and wireframes; IC-08 / IC-16 (pickers and Select open here)
- 08 RTL: both OSes in Arabic (iOS Close on the right)
- 05 Usage: the A7 pairs, built with live instances

Component description: "A panel that slides up from the bottom of a touch screen to show choices, actions or a short task without leaving the screen. Spec: 5-mobile-components/components/bottom-sheet/bottom-sheet.md".

### D9 Code Connect

- File: `5-mobile-components/lib/src/components/bottom_sheet/bw_bottom_sheet.figma.dart`
- Mapping: D4. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Bottom sheet`, private components and layer names match D2–D3 and A2
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
| Node IDs | page `137:9` · set `138:3589` (12: OS × Type × Language) · `.Bottom sheet/ios-button` `138:2479` · `.Bottom sheet/content` `138:2480` · `… AR` `138:2542` · docs `141:4472` (00–09, 11) · card `141:6404` |
| QA report | Unbound fills, strokes, padding and gaps: 0 · no local styles · text uses library styles · Light and Dark by mode switch · page modes Mobile (typography) and Mobile (grid) |

**Deviations:**
- iOS from the iOS and iPadOS 27 kit: floating sheet, kit Grabber instance, round Close / Done buttons (not Cancel / Done text); Action Sheet with capsule actions and no separate Cancel group — A2 row 4, A8, B2, D2, D3 corrected on Mobile (A2 also on Tablet)
- Rows reuse List item (as Tablet); iOS Action Sheet reuses `.Dialog/ios-action`
- On `List` the iOS Done button keeps its place with opacity 0 so the title stays centred

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
