import sys; sys.path.insert(0, sys.path[0])
from common import *

def standard_tail(p, c, cmd, files, extra, goal, appr, outscope):
    return f"""## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `{c['slug']}-contract.md`.

> Written by the Planner (Claude). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · {DATE} |

### C1 Goal

{goal} matches B1–B6 and passes B9 and C6.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
{outscope}

### C3 Approach

{appr}

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
{files}
```

### C6 Tests

Implement every item in B9, plus:
{extra}
- [ ] Earlier tests still pass

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6 (focus in, trap, return; dismiss rules)
- [ ] AC-5 Tests in B9 and C6 exist and pass; {cmd} pass
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

"""

def d_rest(p, c, struct, tree, props, variants, notes, codeconnect):
    return f"""
### D2 Component structure

{struct}

### D3 Layer tree and auto layout

{tree}

### D4 Properties

{props}

### D5 Variants to generate

{variants}

### D6 States, interactions and motion

No prototype interactions on the set. Opening, dragging, the detents and closing are shown on doc page 04 with B4 timings written next to them.

### D7 RTL

`Language=AR` variants: Typography mode `{LBL[p]} · AR`, auto layout direction from the text, layout per B5; Arabic copy from A6. The `close` and `check` glyphs do not mirror; `arrow_back` mirrors.

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `{c['name']} — Documentation`, frames `{c['name']} / 00 Component sheet` … `{c['name']} / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for {c['name']}:
{notes}
- 05 Usage: the A7 pairs, built with live instances

Component description: "{c['summary']} Spec: {SEC[p]}/components/{c['slug']}/{c['slug']}.md".

### D9 Code Connect

- File: {codeconnect}
- Mapping: D4. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `{c['name']}`, private components and layer names match D2–D3 and A2
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

"""

# =================== BOTTOM SHEET ===================
BS = dict(name='Bottom sheet', ar='اللوحة السفلية', slug='bottom-sheet',
  summary='A panel that slides up from the bottom of a touch screen to show choices, actions or a short task without leaving the screen.',
  summary_ar='لوحة تنزلق من أسفل شاشة اللمس لعرض خيارات أو إجراءات أو مهمة قصيرة دون مغادرة الشاشة.',
  parts='Scrim · container · grabber · header · content · footer',
  parts_ar='الطبقة المعتمة · الحاوية · مقبض السحب · الرأس · المحتوى · التذييل',
  built_on={'tablet': 'Flutter M3 `showModalBottomSheet` (`showDragHandle: true`), styled from semantic tokens',
            'mobile': 'Flutter adaptive (N-07): Android → M3 `showModalBottomSheet` with drag handle; iOS → `CupertinoSheetRoute` (sheet with grabber and detents) and, for `type: action`, `CupertinoActionSheet` — the iOS and iPadOS 27 anatomy in Biowave colours and type'},
  **{'import': {'tablet': '`BwBottomSheet`, `showBwBottomSheet` from `package:biowave_tablet/biowave_tablet.dart`',
                'mobile': '`BwBottomSheet`, `showBwBottomSheet` from `package:biowave_mobile/biowave_mobile.dart`'}})

BS_A = """## A · Guidelines

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
| 4 | `header` | No | The sheet title with a close button, or, on iOS, a leading action · title · trailing action row (Cancel · Title · Done) |
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

"""

BS_A8 = {
'tablet': """### A8 Platform notes — Tablet

Tablet uses one Biowave design (N-03) with the Material header: grabber, title and close button (O-05).

| | Tablet |
|---|---|
| Available | ✓ `standard` · `list` · `action`; `auto` · `full` |
| Width | Centred at the bottom with a max width; the screen shows on both sides in landscape |
| Interaction | Touch, plus hardware keyboard (Esc closes a dismissible sheet) |
| Header | Title + close button (no iOS Cancel · Title · Done row) |
| Not supported | Sheets that stay open while the user works on the screen (non-modal) |
""",
'mobile': """### A8 Platform notes — Mobile

On Mobile the bottom sheet is the **native sheet** of each OS (N-01) in Biowave colours and type. iOS forms come only from the **iOS and iPadOS 27** kit.

```
iOS — Sheet (standard / list)         iOS — Action sheet (action)        Android — M3 bottom sheet
┌─────────────────────────────┐        ┌───────────────────────────┐      ┌─────────────────────────────┐
│           ━━━━              │        │      Add attachment       │      │            ━━━━             │
│ Cancel  Filter by status Done│       │ Take photo                │      │ Filter by status        [✕] │
│ ─────────────────────────── │        │ Choose from files         │      │ ○ Pending              12   │
│ Pending                 12 ✓│        └───────────────────────────┘      │ ● Approved              3   │
│ Approved                 3  │        ┌───────────────────────────┐      │ [         Apply           ] │
└─────────────────────────────┘        │          Cancel           │      └─────────────────────────────┘
                                       └───────────────────────────┘
```

| | iOS | Android |
|---|---|---|
| `standard` · `list` | Sheet with grabber and detents (medium · large); header row Cancel · Title · Done (Done replaces the footer action) | M3 modal bottom sheet with drag handle; title + close; footer action |
| `action` | Native Action sheet: optional title, actions in a group, Cancel separate below | M3 bottom sheet with icon + label rows |
| `detent` | `auto` = medium, `full` = large | `auto` = content height, `full` = expanded |
| Dismiss | Swipe down, tap outside, Cancel | Drag down, tap outside, back gesture |
""",
}

BS_A_tail = """
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

"""

def bs_B(p):
    if p == 'tablet':
        api_extra_params = """| `title` | `String?` | (A6) | — | | `header` title; no header when null |
| `closeButton` | `bool` | | `true` | | Close button in the header |"""
    else:
        api_extra_params = """| `title` | `String?` | (A6) | — | | `header` title (iOS: centre of the Cancel · Title · Done row; Android: start) |
| `message` | `String?` | | — | | iOS Action sheet message line only |
| `doneLabel` | `String?` | | — | | iOS header trailing action for `standard`; replaces the footer on iOS |"""
    api = f"""#### showBwBottomSheet / BwBottomSheet
`Future<T?> showBwBottomSheet<T>({{required BuildContext context, required BwBottomSheet sheet}})` opens a modal sheet and returns the value passed to `Navigator.pop` (the chosen option or action).

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `type` | `BwBottomSheetType` | `standard` · `list` · `action` | `standard` | | A4.1 |
| `detent` | `BwBottomSheetDetent` | `auto` · `full` | `auto` | | A4.2 |
{api_extra_params}
| `content` | `Widget?` | any | — | with `standard` | `content` for `standard` |
| `options` | `List<BwSheetOption<T>>` | `label`, `value`, `trailing`, `enabled` | — | with `list` | Rows for `list`; `selected` marks the chosen value |
| `selected` | `T?` | | — | | The chosen option in a `list` |
| `actions` | `List<BwSheetAction>` | `label`, `icon`, `destructive`, `onPressed` | — | with `action` | Rows for `action` (2–6) |
| `footerAction` | `BwDialogAction?` | | — | | A4.3 — full-width primary Button |
| `dismissible` | `bool` | | `true` | | A4.4 |
| `onDismissAttempt` | `Future<bool> Function()?` | | — | | Called when `dismissible` is false and the user drags down or taps the scrim; return `true` to close (e.g. after "Discard changes?") |

Platform naming: Web has no Bottom sheet (A8 of Dialog / Side sheet)."""
    inv = """| Combination | Fallback |
|---|---|
| `type: list` without `options`, or `type: action` without `actions` | assert; release shows an empty sheet with the title |
| `actions` fewer than 2 or more than 6 | assert "Use 2–6 actions"; release renders them |
| `footerAction` with `type: list` or `action` | assert; release ignores the footer |""" + ("""
| `doneLabel` and `footerAction` together | assert; iOS uses `doneLabel`, Android uses `footerAction` |""" if p == 'mobile' else "")
    if p == 'tablet':
        dims = """```
            ┌─────────────────── max width size-container-lg, centred ───────────────────┐
        ┬   │                         ━━━━  grabber                                      │  radius-4xl top corners
        │   │  Filter by status                                               [✕]       │  title-lg · padding spacing-layout-container
        │   │ ────────────────────────────────────────────────────────────────────────── │  divider while scrolled
        │   │  ○ Pending                                                       12        │  row min height size-control-height-lg
        │   │  [                            Apply                                     ]  │  Button lg full width
        ┴   └────────────────────────────────────────────────────────────────────────────┘
```

| Part | Property | Token | Flutter |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | `barrierColor: overlayDefault` |
| `container` | width | full width up to `size-container-lg`, centred | `constraints: BoxConstraints(maxWidth: BwSize.containerLg)` |
| `container` | max height | `auto`: content up to 90% of the screen · `full`: screen below the status bar | `isScrollControlled: true`; `DraggableScrollableSheet` for `full` |
| `container` | background · radius · elevation | `color-surface-raised` · `radius-4xl` top corners only · `elevation-4` | `backgroundColor`, `shape: RoundedRectangleBorder(borderRadius: BorderRadiusDirectional.vertical(top: Radius.circular(BwRadius.xl4)))`, shadow `e4`, `surfaceTintColor: Colors.transparent` |
| `grabber` | size · radius · fill | width `size-icon-xl` · height `spacing-xs` · `radius-full` · `color-border-default` | `showDragHandle: true`, `dragHandleSize: Size(BwSize.iconXl, BwSpacing.xs)`, `dragHandleColor: borderDefault` |
| `grabber` | area | padding-block `spacing-lg` | framework drag handle area (48dp target) |
| `header` | padding · gap | padding-inline `spacing-layout-container`, padding-block-end `spacing-lg` · gap `spacing-xl` | `EdgeInsetsDirectional` |
| `header` | title | `title-lg` · `color-text-default` | `context.bw.text.titleLg` |
| `header` | close button | Icon button `transparent` · `neutral` · `md`, icon `close` | `BwIconButton` |
| `content` | padding | padding-inline `spacing-layout-container` (`standard`); rows full width | |
| row (`list` · `action`) | layout | min height `size-control-height-lg` · padding-inline `spacing-layout-container` · padding-block `spacing-lg` · gap `spacing-xl` | `ListTile`-like `InkWell` row |
| row | text · icon | `body-md` · leading icon `size-icon-lg` (`action`) · trailing `check` `size-icon-lg` (`list`, chosen row) | |
| `footer` | layout | padding `spacing-layout-container`; Button `filled brand lg` full width | `BwButton(fullWidth: true, size: lg)` |
| divider | | Divider default under the header, only while the content scrolls | `BwDivider` |"""
    else:
        dims = """```
iOS — Sheet (iOS and iPadOS 27)              Android — M3 bottom sheet
┌───────────────────────────────────┐        ┌───────────────────────────────────┐  radius-4xl top · elevation-4
│               ━━━━                │        │               ━━━━                │  grabber (both)
│ Cancel    Filter by status   Done │        │ Filter by status              [✕] │  title-lg
│ ───────────────────────────────── │        │ ○ Pending                    12   │  rows size-control-height-lg
│ Pending                      12 ✓ │        │ [             Apply             ] │  Button lg full width
└───────────────────────────────────┘        └───────────────────────────────────┘
```

| Part | Property | iOS | Android |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | `color-overlay-default` |
| `container` | width | full screen width | full screen width |
| `container` | background | `color-surface-raised` | `color-surface-raised`, `surfaceTintColor: Colors.transparent` |
| `container` | radius · elevation | from the OS sheet (Apple kit) | `radius-4xl` top corners · `elevation-4` |
| `container` | heights | `auto` = medium detent · `full` = large detent | `auto` = content up to 90% · `full` = expanded below the status bar |
| `grabber` | | the OS grabber (`Grabber` in the Apple kit) | width `size-icon-xl` · height `spacing-xs` · `radius-full` · `color-border-default` |
| `header` | layout | Cancel (leading, `action-md`, `color-text-role-brand`) · title (`title-lg`, centred) · Done (trailing, `action-md` semibold weight from the kit, `color-text-role-brand`) | title `title-lg` start + close Icon button (`transparent neutral md`) |
| row (`list`) | | `body-md`; chosen row trailing `check` in `color-icon-role-brand`; separators `color-border-subtle` inset to the text | `body-md`; chosen row trailing `check` `color-icon-role-brand`; min height `size-control-height-lg` |
| `action` | | `CupertinoActionSheet`: actions `action-md` `color-text-role-brand`, destructive `color-text-role-error`, Cancel in its own group | rows with leading icon `size-icon-lg` `color-icon-default` + `body-md` label; destructive in `color-text-role-error` / `color-icon-role-error` |
| `footer` | | none — Done in the header (`doneLabel`) | padding `spacing-layout-container`; Button `filled brand lg` full width |
| padding | content | `spacing-layout-container` inline | `spacing-layout-container` inline |

Fonts: Biowave text styles (`context.bw.text`) on both OSes; the OS keeps its sheet, materials and separators."""
    tokens = """| Part | Property | Default | Pressed | Selected | Disabled |
|---|---|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | — | — | — |
| `container` | background | `color-surface-raised` | — | — | — |
| `container` | shadow | `elevation-4`""" + (" (Android)" if p == 'mobile' else "") + """ | — | — | — |
| `grabber` | fill | `color-border-default` | — | — | — |
| title | color | `color-text-default` | — | — | — |
| row | background | transparent | `color-background-transparent-pressed` | — | — |
| row | label | `color-text-default` | — | `color-text-default` | `color-text-disabled` |
| row | check icon | — | — | `color-icon-role-brand` | — |
| row (`action`) | icon | `color-icon-default` | — | — | `color-icon-disabled` |
| destructive row | label · icon | `color-text-role-error` · `color-icon-role-error` | `color-background-transparent-pressed` | — | `color-text-disabled` |
| row separator · header divider | stroke | `color-border-subtle` | — | — | — |

Dark theme: same tokens; no exceptions."""
    trans = """| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Closed → Open | `showBwBottomSheet` | scrim opacity · sheet slides up from below the screen | `motion-duration-lg` | `motion-easing-emphasized-decelerate` |
| Open → Closed | row tap, footer / Done, scrim, back, drag release past half | sheet slides down · scrim fades | `motion-duration-md` | `motion-easing-emphasized-accelerate` |
| Dragging | finger on grabber or header | sheet follows the finger (no easing) | — | — |
| Release → snap | drag released | to the nearest detent | `motion-duration-md` | `motion-easing-standard` |
| Row pressed | touch down | row background | `motion-duration-sm` | `motion-easing-standard` |""" + ("""

On iOS the sheet and the Action sheet keep the OS timing (framework `CupertinoSheetRoute` / `showCupertinoModalPopup`), so they feel native (N-05); the table applies to Android.""" if p == 'mobile' else "")
    rtl = """| Part | In RTL |
|---|---|
| layout | Mirrors: title at the start (right), close button at the end (left)""" + ("; iOS header Cancel on the right, Done on the left" if p == 'mobile' else "") + """ |
| rows | Label at the start, counts and check at the end (left) |
| icons | `check`, `close`, `photo_camera`, `attach_file` do not mirror; `arrow_back` / `chevron_forward` mirror |
| grabber | Centred (no change) |"""
    a11y = """| Requirement | Implementation |
|---|---|
| Role / semantics | Modal route: `Semantics(scopesRoute: true, namesRoute: true, label: title)`; screen behind excluded |
| Focus | Focus moves into the sheet (first row or field); returns to the trigger on close |
| Drag alternative | Close button (Android, Tablet) or Cancel (iOS) and the back gesture; `dismissible: false` still offers Cancel (WCAG 2.5.7) |
| Rows | `Semantics(button: true, selected: chosen, inMutuallyExclusiveGroup: true)` for `list` |
| Target size | Rows ≥ `size-control-height-lg` (48dp), grabber area ≥ 48dp |
| Keyboard | `viewInsets` lift the sheet above the on-screen keyboard |
| Screen reader output | "Filter by status, sheet. Approved, selected, 2 of 3" |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves through the sheet only |
| Esc | Closes when `dismissible` (else `onDismissAttempt`) |
| Enter / Space | Activates the focused row or action |"""
    pkg = 'biowave_' + p
    ex = f"""```dart
import 'package:{pkg}/{pkg}.dart';

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
```"""
    tests = """- [ ] Light + dark · en + ar: every part uses exactly the B2–B3 tokens""" + (" on iOS and Android (`debugDefaultTargetPlatformOverride`)" if p == 'mobile' else "") + """
- [ ] Every transition in B4 with token durations and easings; reduced motion → `motion-duration-instant`
- [ ] `list`: tapping a row pops with its value; the chosen row has the check and `selected` semantics
- [ ] `action`: 2–6 rows; destructive row in the error colours""" + ("; iOS renders `CupertinoActionSheet` with a separate Cancel" if p == 'mobile' else "") + """
- [ ] `detent: auto` hugs short content and stops at 90% of the screen; `full` expands below the status bar
- [ ] `dismissible: false`: drag down and scrim tap call `onDismissAttempt` and do not close on `false`
- [ ] The sheet rises above the on-screen keyboard
- [ ] Every invalid combination in B1 asserts and falls back
- [ ] a11y: `meetsGuideline` tap target and text contrast; semantics names the route; close works without dragging
- [ ] No raw values (lint over the component folder)"""
    return f"""## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

{api}

**Invalid combinations** (`assert` in debug, fallback in release):
{inv}

### B2 Dimensions

{dims}

### B3 Tokens by part and state

Every value is a semantic token; there is no `bottom-sheet.tokens.json` (nested Button, Icon button and Divider carry their own).

{tokens}

### B4 States and transitions

{trans}

Reduced motion: slide and fade become `motion-duration-instant`; dragging still follows the finger.

### B5 RTL

{rtl}

### B6 Accessibility (implementation)

Design-level rules are in A9; this is how this platform meets them.

{a11y}

### B7 Examples

{ex}

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

{tests}

---

"""

def bs_C(p):
    pkg = 'biowave_' + p
    if p == 'tablet':
        appr = """- **Base:** `showModalBottomSheet(isScrollControlled: true, useSafeArea: true, showDragHandle: true, barrierColor: overlayDefault, backgroundColor: surfaceRaised, constraints: BoxConstraints(maxWidth: BwSize.containerLg), sheetAnimationStyle: AnimationStyle(duration: BwDuration.lg, reverseDuration: BwDuration.md, curve: BwEasing.emphasizedDecelerate, reverseCurve: BwEasing.emphasizedAccelerate))`.
- **Detents:** `auto` → `ConstrainedBox(maxHeight: 0.9 × screen)` around the content; `full` → `DraggableScrollableSheet(initialChildSize: 1, minChildSize: 0.5, snap: true, snapSizes: [0.5, 1])`.
- **Rows:** private `_BwSheetRow` (InkWell + Row), shared by `list` and `action`.
- **Dismiss guard:** `PopScope(canPop: dismissible, onPopInvokedWithResult:)` + `enableDrag: dismissible`; when blocked call `onDismissAttempt`."""
    else:
        appr = """- **Adaptive (N-07):** branch on `Theme.of(context).platform`.
  - **Android:** same as the Tablet plan (`showModalBottomSheet`, drag handle, Biowave shape, `AnimationStyle`), full screen width.
  - **iOS `standard` / `list`:** `Navigator.push(CupertinoSheetRoute(builder: …))` with a Biowave `CupertinoTheme`; header row = `CupertinoButton` Cancel · title · `CupertinoButton` Done (`doneLabel`); detents medium / large. If the Flutter version in use has no detents on `CupertinoSheetRoute`, use `DraggableScrollableSheet` inside it with the same snap sizes and record it in C8.
  - **iOS `action`:** `showCupertinoModalPopup(builder: (_) => CupertinoActionSheet(title:, message:, actions: [CupertinoActionSheetAction(isDestructiveAction: …)], cancelButton: CupertinoActionSheetAction(child: Text('Cancel' / 'إلغاء'))))`.
- **Theme:** colours and fonts from `BwMobileTheme` (`bottomSheetTheme`, `CupertinoThemeData`); pass `context.bw.text` styles explicitly to Cupertino widgets (they ignore `ThemeData` text).
- **Dismiss guard:** as Tablet; on iOS also `CupertinoSheetRoute` drag is disabled when `dismissible` is false."""
    files = f"""{SEC[p]}/lib/src/components/bottom_sheet/bw_bottom_sheet.dart   new (widget, showBwBottomSheet, BwSheetOption, BwSheetAction, enums)
{SEC[p]}/test/bottom_sheet_test.dart                               new
{SEC[p]}/test/goldens/bottom_sheet/                                new goldens{' (iOS and Android)' if p == 'mobile' else ''}
{SEC[p]}/lib/{pkg}.dart                                change: export (alphabetical)
{SEC[p]}/README.md                                                 change: Bottom sheet row (Code)
CHANGELOG.md                                                                 change: one entry"""
    extra = "- [ ] Landscape: the sheet is centred at `BwSize.containerLg`" if p == 'tablet' else "- [ ] iOS: `standard` uses `CupertinoSheetRoute` with the Cancel · Title · Done header; `action` uses `CupertinoActionSheet` (goldens en/ar)\n- [ ] Biowave fonts on both OSes"
    out = """- Non-modal (persistent) sheets
- Search inside the sheet (the Autocomplete component provides it as `content`)
- Select, Autocomplete, Phone and pickers switching to `BwBottomSheet` — their own follow-up plans (plan R-1, R-3)"""
    return standard_tail(p, BS, f"`cd {SEC[p]} && flutter analyze && flutter test`, `npm run docs:check`", files, extra,
        f"`BwBottomSheet` / `showBwBottomSheet` from `package:{pkg}`" + (", native on iOS and Android" if p == 'mobile' else ''), appr, out)

def bs_D(p):
    head = d_head(p, BS, '**Create new.** Reuse the legacy Mobile `Bottom Sheet` sets (Foundations `4131:10299`: header Cancel · Title · Reset, status / date / member / device content, Apply footer) for content and the iOS header; legacy sets stay in `_Deprecation Ground`, untouched' + (', plus the iOS and iPadOS 27 `Sheet - iPhone`, `Action Sheet`, `Grabber` and the Material 3 `Bottom sheet` kits linked in this file' if p == 'mobile' else ', plus the Material 3 `Bottom sheet`'),
        'Button, Icon Button and Divider sets in this file; `.Scrim` from the Dialog page (create it there first if Dialog is not built)')
    if p == 'tablet':
        struct = """```
❖ Bottom sheet                    ← component set (published)
  ├─ ◇ .Bottom sheet/row           ← private: one row (Type=List · Action, Selected, Destructive)
  └─ ◇ .Bottom sheet/content       ← private placeholder slot for `standard`
```"""
        tree = """```
Bottom sheet               ↕ vertical · width FIXED bound to size/container/lg · radius/4xl top-left + top-right only · fill color/surface/raised · Elevation/4
├── grabber-area           ↕ centred · padding-block spacing/lg
│   └── grabber            ▭ width size/icon/xl · height spacing/xs · radius/full · fill color/border/default
├── header                 ↔ padding-inline spacing/layout/container · gap spacing/xl · BOOLEAN `Header`
│   ├── title              T title/lg · color/text/default · fill · TEXT `Title`
│   └── close-button       ◇ Icon Button transparent · neutral · md · close
├── content                ↕ (Standard: ◇ .Bottom sheet/content, INSTANCE_SWAP `Content`; List / Action: 3–4 ◇ .Bottom sheet/row)
└── footer                 ↕ padding spacing/layout/container · BOOLEAN `Footer` (Standard only)
    └── footer-action      ◇ Button filled · brand · lg · width fill
```"""
        props = """| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Type` | VARIANT | `Standard` · `List` · `Action` | `Standard` | `type` | `standard` · `list` · `action` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Header` | BOOLEAN | | `true` | `title` | set / null |
| `Title` | TEXT | | `Filter by status` | `title` | |
| `Footer` | BOOLEAN | | `false` | `footerAction` | present / absent |
| `Content` | INSTANCE_SWAP | preferred: `.Bottom sheet/content` | | `content` | |"""
        variants = "- Axes: `Type × Language` = 3 × 2 = **6** variants (`detent` is shown on doc page 03 by resizing instances, not as an axis)\n- Grid: rows = Type, columns = Language; gap `spacing/xl`"
        notes = """- 01 Introduction: Light + Dark panels, a `List` sheet over a Tablet frame with the scrim
- 03 Variations: Type × detent (`auto`, `full`), footer on / off, legacy content rebuilt (status with counts, member picker)
- 07 Platform: the A8 table; landscape with the sheet centred"""
    else:
        struct = """```
❖ Bottom sheet                    ← component set (published)
  ├─ ◇ .Bottom sheet/row           ← private: one Android row (Type=List · Action, Selected, Destructive)
  ├─ ◇ .Bottom sheet/ios-row       ← private: one iOS sheet row (separator, check)
  ├─ ◇ .Bottom sheet/ios-action    ← private: one iOS Action sheet button
  └─ ◇ .Bottom sheet/content       ← private placeholder slot for `Standard`
```"""
        tree = """```
Bottom sheet (OS=Android)  as Tablet D3, width = screen (fill in the device frame example; set fixed 360 for the set)
Bottom sheet (OS=iOS, Standard / List)
├── grabber                ◇ Grabber from the iOS and iPadOS 27 kit (reference shape; rebuilt bound: color/border/default)
├── header                 ↔ Cancel (T action/md · color/text/role/brand) · title (T title/lg · centred) · Done (T action/md · color/text/role/brand)
├── content                ◇ .Bottom sheet/ios-row × 3–4  |  ◇ .Bottom sheet/content
Bottom sheet (OS=iOS, Action)
├── group                  ↕ radius from the kit · fill color/surface/raised
│   ├── title · message    T label/md · color/text/subtle · centred (optional)
│   └── actions            ◇ .Bottom sheet/ios-action × 2–4 · separators color/border/subtle
└── cancel                 ◇ .Bottom sheet/ios-action (Cancel) in its own group
```"""
        props = """| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `OS` | VARIANT | `iOS` · `Android` | `iOS` | — | `Theme.platform` (N-07) |
| `Type` | VARIANT | `Standard` · `List` · `Action` | `Standard` | `type` | `standard` · `list` · `action` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Title` | TEXT | | `Filter by status` | `title` | |
| `Footer` | BOOLEAN | | `false` | `footerAction` | Android `Standard` only |
| `Content` | INSTANCE_SWAP | preferred: `.Bottom sheet/content` | | `content` | |"""
        variants = "- Axes: `OS × Type × Language` = 2 × 3 × 2 = **12** variants\n- Grid: rows = OS × Type, columns = Language; gap `spacing/xl`"
        notes = """- 01 Introduction: Light + Dark panels, iOS and Android `List` sheets over phone frames with the scrim
- 03 Variations: OS × Type; detents (`auto` = medium, `full` = large); legacy content rebuilt (status with counts, date range, member picker)
- 07 Platform: the A8 table and wireframes; IC-08 / IC-16 (pickers and Select open here)
- 08 RTL: both OSes in Arabic (iOS Cancel on the right)"""
    cc = f'`{SEC[p]}/lib/src/components/bottom_sheet/bw_bottom_sheet.figma.dart`'
    return head + d_rest(p, BS, struct, tree, props, variants, notes, cc)

if __name__=='__main__':
  for p in ['tablet', 'mobile']:
    write(p, 'bottom-sheet', header(p, BS) + BS_A + BS_A8[p] + BS_A_tail + bs_B(p) + bs_C(p) + bs_D(p) + tail(p, BS))

# =================== SIDE SHEET ===================
SS = dict(name='Side sheet', ar='اللوحة الجانبية', slug='side-sheet',
  summary='A panel that slides in from the side of the window to show details or a longer task while the page stays in view.',
  summary_ar='لوحة تنزلق من جانب النافذة لعرض التفاصيل أو مهمة أطول مع بقاء الصفحة ظاهرة.',
  parts='Scrim · container · header · back button · title · close button · body · footer',
  parts_ar='الطبقة المعتمة · الحاوية · الرأس · زر الرجوع · العنوان · زر الإغلاق · المحتوى · التذييل',
  built_on={'web': 'MUI `Drawer` (`variant="temporary"` for modal, `"persistent"` for standard; portal, focus trap, `Slide` transition), styled from semantic tokens',
            'tablet': 'Custom: `showGeneralDialog` with a `SlideTransition` from the inline end (Flutter M3 has no side sheet widget); `BwIconButton`, `BwButton`'},
  **{'import': {'web': "`import { SideSheet } from '@biowave/web'`",
                'tablet': '`BwSideSheet`, `showBwSideSheet` from `package:biowave_tablet/biowave_tablet.dart`'}})

SS_A = """## A · Guidelines

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

"""

SS_A8 = {
'web': """### A8 Platform notes — Web

| | Web |
|---|---|
| Available | ✓ `sm` · `md` · `lg`; `modal` · `standard` |
| `standard` | Only when the window is at least the Desktop breakpoint; below it the sheet opens as `modal` |
| Narrow windows | When the window is narrower than the sheet plus a margin, the sheet takes the window width minus the inset |
| Interaction | Pointer + keyboard; Esc closes |
""",
'tablet': """### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Available | ✓ `sm` · `md` · `lg`; `modal` only (N-03) |
| Portrait | `lg` is not used; the sheet is never wider than the screen minus the inset |
| Interaction | Touch, plus hardware keyboard (Esc closes). Swipe towards the edge closes the sheet |
| Keyboard | The body scrolls so the focused field stays above the on-screen keyboard |
""",
}

SS_A_tail = """
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

"""

def ss_B(p):
    if p == 'web':
        api = """#### SideSheet
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `open` | boolean | | — | ✓ | Shows the sheet |
| `onClose` | `(reason: 'close-button' \\| 'escape' \\| 'scrim') => void` | | — | ✓ | Every way of closing that is not an action |
| `title` | string | (A6) | — | ✓ | `title` |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.1 |
| `mode` | enum | `modal` · `standard` | `modal` | | A4.2 |
| `onBack` | `() => void` | | — | | Shows the `back-button` (A4.3) |
| `footer` | `ReactNode` | one full-width `Button` or a `ButtonGroup` | — | | A4.4 |
| `children` | `ReactNode` | | — | ✓ | `body` |
| `initialFocusRef` | `RefObject<HTMLElement>` | | — | | First focus override |"""
        inv = """| Combination | Fallback |
|---|---|
| `mode="standard"` below the Desktop breakpoint | renders `modal` (no warning — A8) |
| `footer` with more than one primary Button | warn; renders as given |"""
    else:
        api = """#### showBwSideSheet / BwSideSheet
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `title` | `String` | (A6) | — | ✓ | `title` |
| `size` | `BwSideSheetSize` | `sm` · `md` · `lg` | `md` | | A4.1 |
| `onBack` | `VoidCallback?` | | — | | Shows the `back-button` |
| `footer` | `Widget?` | one `BwButton(fullWidth: true)` or a `BwButtonGroup` | — | | A4.4 |
| `content` | `Widget` | | — | ✓ | `body` |
| `dismissible` | `bool` | | `true` | | Scrim tap, Esc, swipe to the edge |
| `onDismissAttempt` | `Future<bool> Function()?` | | — | | Called when `dismissible` is false (unsaved changes) |

Platform naming: web `children` = Flutter `content`; Tablet has no `mode` (modal only, A8)."""
        inv = """| Combination | Fallback |
|---|---|
| `size: lg` in portrait | assert-free: uses `md` (A8) |"""
    tok = 'Token' if p == 'web' else 'Token | Flutter'
    sep = '---' if p == 'web' else '---|---'
    def row(part, prop, token, fl=''):
        return f"| `{part}` | {prop} | {token} |" + ('' if p == 'web' else f" {fl} |")
    rows = [
      row('scrim', 'fill', '`color-overlay-default` (modal only)', '`barrierColor: overlayDefault`'),
      row('container', 'width', '`sm` `size-container-xs` · `md` `size-container-sm` · `lg` `size-container-lg`; never wider than the window minus the inset on both sides', '`BoxConstraints(maxWidth: BwSize.containerXs / containerSm / containerLg)`'),
      row('container', 'inset from the window (modal)', '`spacing-md` on the top, bottom and inline end', '`EdgeInsetsDirectional.all(BwSpacing.md)` + `SafeArea`'),
      row('container', 'background · radius · elevation (modal)', '`color-surface-raised` · `radius-4xl` all corners (floating, O-04) · `elevation-4`', '`DecoratedBox` + `BorderRadiusDirectional.all(Radius.circular(BwRadius.xl4))` + `context.bw.elevation.e4`'),
      row('container', 'standard mode (Web)', 'no inset, full height, `radius-none`, no shadow; border-inline-start `border-width-default` `color-border-subtle`; the page width shrinks by the sheet width', '—'),
      row('container', 'stacking', '`layer-modal` (modal) · `layer-raised` (standard)', 'route above the page'),
      row('header', 'padding · gap', '`spacing-2xl` (side sheet header, spacing.md) · gap `spacing-md`', '`EdgeInsetsDirectional.all(BwSpacing.xl2)`'),
      row('title', 'text style', '`title-lg` · `color-text-default`; wraps to 2 lines', '`context.bw.text.titleLg`'),
      row('back-button · close-button', 'component', 'Icon button `transparent` · `neutral` · `md`; icons `arrow_back` (mirrors) · `close`', '`BwIconButton`'),
      row('body', 'padding · overflow', 'padding-inline `spacing-layout-container`, padding-block-end `spacing-layout-container` · scrolls', '`SingleChildScrollView`'),
      row('body', 'gap between sections', '`spacing-layout-stack`', '`context.bw.layout.stack`'),
      row('footer', 'padding · actions', '`spacing-layout-container` · one Button `filled brand lg` full width, or Button group end-aligned', '`BwButton(fullWidth: true)` / `BwButtonGroup`'),
      row('divider', '', 'Divider default under the header and above the footer, only while the body scrolls', '`BwDivider`'),
    ]
    dims = """```
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

| Part | Property | """ + tok + """ |
|---|---|""" + sep + """|
""" + '\n'.join(rows)
    tokens = """| Part | Property | Default | Notes |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | modal |
| `container` | background | `color-surface-raised` | |
| `container` | shadow | `elevation-4` | modal; none in standard |
| `container` | border-inline-start | `color-border-subtle` | standard only (Web) |
| `title` | color | `color-text-default` | |
| `back-button` · `close-button` | — | Icon button B3 (`transparent`, `neutral`) | |
| `footer` | actions | Button B3 | |
| divider | stroke | Divider B3 (`default`) | while scrolled |

Dark theme: same tokens; no exceptions."""
    trans = """| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Closed → Open | `open` / `showBwSideSheet` | sheet slides in from the inline end · scrim opacity 0 → 1 (modal) · page width (standard) | `motion-duration-lg` | `motion-easing-emphasized-decelerate` |
| Open → Closed | close, Esc, scrim, action""" + (", swipe to the edge" if p == 'tablet' else "") + """ | slides out · scrim fades | `motion-duration-md` | `motion-easing-emphasized-accelerate` |
| View → second view | `onBack` set / content change | body cross-fade | `motion-duration-md` | `motion-easing-standard` |"""
    rtl = """```
LTR  page ……………………  │ [←] Edit device              [✕] │   ← slides in from the right
RTL  │ [✕]              تعديل الجهاز [→] │  …………………… page   ← slides in from the left
```

| Part | In RTL |
|---|---|
| position | Opens from the inline end: right in LTR, left in RTL; slides from that edge |
| header | Back button at the start, close at the end (mirrored order) |
| `back-button` icon | Mirrors (`arrow_back` points right in RTL) |
| `close-button` icon | Does not mirror |
| standard border | On the inline start of the sheet |"""
    if p == 'web':
        a11y = """| Requirement | Implementation |
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
| Enter / Space | Activate the focused control |"""
        ex = """```tsx
import { SideSheet, Button } from '@biowave/web';

<SideSheet open={open} onClose={close} title="Edit device"
  footer={<Button fullWidth size="lg" onClick={save}>Save changes</Button>}>
  <DeviceForm />
</SideSheet>

// Arabic, standard mode next to a table
<SideSheet open={open} onClose={close} title="تفاصيل الطلب" mode="standard" size="lg">
  <RequestDetails />
</SideSheet>
```"""
        tests = """- [ ] Light + dark · en + ar: every part uses exactly the B2–B3 tokens for each `size` and `mode`
- [ ] Every transition in B4; reduced motion → `motion-duration-instant`
- [ ] Opens from the right in LTR and the left in RTL; back icon mirrors, close does not
- [ ] Modal: focus in, trapped, returned; Esc and scrim call `onClose` with the right reason
- [ ] Standard: page content narrows by the sheet width; no focus trap; `aside` landmark; falls back to modal below Desktop
- [ ] Body scrolls with header and footer fixed; dividers only while scrolled
- [ ] Every invalid combination in B1 warns and falls back
- [ ] a11y: axe on `baseElement` with the sheet open, light/dark × en/ar, both modes
- [ ] No raw values (lint over the component folder)"""
    else:
        a11y = """| Requirement | Implementation |
|---|---|
| Role / semantics | Modal route `Semantics(scopesRoute: true, namesRoute: true, label: title)` |
| Focus | First field, else the close button, with a hardware keyboard; returns to the opener |
| Swipe alternative | Close button and Esc (WCAG 2.5.7) |
| Target size | ≥ 48dp |
| Screen reader output | "Edit device, sheet" |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Inside the sheet only |
| Esc | Closes when `dismissible` (else `onDismissAttempt`) |"""
        ex = """```dart
import 'package:biowave_tablet/biowave_tablet.dart';

showBwSideSheet(context: context, sheet: BwSideSheet(
  title: 'Edit device',
  content: const DeviceForm(),
  footer: BwButton(fullWidth: true, size: BwButtonSize.lg, onPressed: save, child: const Text('Save changes')),
));

// Arabic — opens from the left
showBwSideSheet(context: context, sheet: BwSideSheet(title: 'تفاصيل الطلب', size: BwSideSheetSize.lg, content: const RequestDetails()));
```"""
        tests = """- [ ] Light + dark · en + ar: every part uses exactly the B2–B3 tokens for each `size`
- [ ] Every transition in B4; reduced motion → `BwDuration.instant`
- [ ] Opens from the right in LTR and the left in RTL; back icon mirrors, close does not
- [ ] Scrim tap, Esc and swipe to the edge close when `dismissible`; otherwise call `onDismissAttempt`
- [ ] `lg` in portrait renders `md`; never wider than the screen minus the inset
- [ ] Body scrolls with header and footer fixed; the focused field stays above the keyboard
- [ ] a11y: `meetsGuideline` tap target and contrast; semantics names the route
- [ ] No raw values (lint over the component folder)"""
    return f"""## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

{api}

**Invalid combinations** ({'`console.warn` in development, then the fallback renders' if p == 'web' else '`assert` in debug, fallback in release'}):
{inv}

### B2 Dimensions

{dims}

Layout rules: height = window height minus the inset; header and footer hug; body fills and scrolls.

### B3 Tokens by part and state

Every value is a semantic token; there is no `side-sheet.tokens.json`.

{tokens}

### B4 States and transitions

{trans}

Reduced motion: slide and fade become `motion-duration-instant`.

### B5 RTL

{rtl}

### B6 Accessibility (implementation)

Design-level rules are in A9; this is how this platform meets them.

{a11y}

### B7 Examples

{ex}

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

{tests}

---

"""

def ss_C(p):
    if p == 'web':
        appr = """- **Base:** MUI `Drawer` `anchor="right"` (MUI flips it to the left under the RTL theme), `variant` from `mode` (`temporary` · `persistent`); `SlideProps` timing from the motion tokens; `PaperProps` with the B2 inset (`margin`), radius, background and shadow; `slotProps.backdrop` fill `color-overlay-default`.
- **Standard mode:** the consumer layout gets a `SideSheetLayout` wrapper that reserves the sheet width (`padding-inline-end`) with the same transition; `useMediaQuery` on the Desktop breakpoint switches to modal.
- **Structure:** header (`IconButton` back · title · `IconButton` close), scroll body with scroll-driven dividers, footer.
- **Gotcha:** MUI `Drawer` paper uses `elevation={16}` — set `elevation={0}` and apply `elevation-4`."""
        files = """3-web-components/src/components/side-sheet/SideSheet.tsx        new (SideSheet, SideSheetLayout)
3-web-components/src/components/side-sheet/SideSheet.test.tsx   new
3-web-components/src/components/side-sheet/index.ts             new
3-web-components/src/index.ts                                   change: export (alphabetical)
3-web-components/README.md                                      change: Side sheet row (Code)
CHANGELOG.md                                                    change: one entry"""
        cmd = "`npm run test:web`, `npm run typecheck`, `npm run docs:check`"
        extra = "- [ ] `SideSheetLayout` reserves exactly the sheet width in standard mode and releases it on close"
        goal = "`SideSheet` from `@biowave/web`"
    else:
        appr = """- **Base:** `showGeneralDialog(barrierColor: overlayDefault, barrierDismissible: dismissible, transitionDuration: BwDuration.lg, transitionBuilder:)` with a `SlideTransition` from `Offset(±1, 0)` by `Directionality` and `CurvedAnimation(curve: BwEasing.emphasizedDecelerate, reverseCurve: BwEasing.emphasizedAccelerate)`; reverse duration `BwDuration.md` through a custom `PageRoute` if `showGeneralDialog` cannot set it (record in C8).
- **Layout:** `Align(alignment: AlignmentDirectional.centerEnd)` → `SafeArea` → `Padding(BwSpacing.md)` → `ConstrainedBox(maxWidth:)` → `Material(color: surfaceRaised, shape:, elevation shadow)`.
- **Swipe:** horizontal drag towards the edge closes (`GestureDetector` on the container).
- **Dismiss guard:** `PopScope` + `onDismissAttempt` as Bottom sheet."""
        files = """4-tablet-components/lib/src/components/side_sheet/bw_side_sheet.dart   new
4-tablet-components/test/side_sheet_test.dart                         new
4-tablet-components/test/goldens/side_sheet/                          new goldens
4-tablet-components/lib/biowave_tablet.dart                           change: export (alphabetical)
4-tablet-components/README.md                                         change: Side sheet row (Code)
CHANGELOG.md                                                          change: one entry"""
        cmd = "`cd 4-tablet-components && flutter analyze && flutter test`, `npm run docs:check`"
        extra = "- [ ] Portrait and landscape goldens (en, ar)"
        goal = "`BwSideSheet` / `showBwSideSheet` from `package:biowave_tablet`"
    out = """- Navigation drawer (Primary navigation, Wave 12)
- Resizable or pinned sheets
- The "Discard changes?" dialog itself (the consumer opens a Dialog in `onClose` / `onDismissAttempt`)"""
    return standard_tail(p, SS, cmd, files, extra, goal, appr, out)

def ss_D(p):
    head = d_head(p, SS, '**Create new.** The anatomy comes from the legacy Web `↳ Slide Out Panel` screens (frames such as `3741:4340`; floating, inset, rounded); they stay in `_Deprecation Ground`, untouched',
        'Button, Icon Button and Divider sets in this file; `.Scrim` from the Dialog page')
    struct = """```
❖ Side sheet                      ← component set (published)
  └─ ◇ .Side sheet/body            ← private placeholder slot (sections of text, banner, fields)
```"""
    tree = """```
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
```"""
    modes = "`Modal` · `Standard`" if p == 'web' else "`Modal`"
    props = f"""| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` | `sm` · `md` · `lg` |
""" + ("| `Mode` | VARIANT | `Modal` · `Standard` | `Modal` | `mode` | `modal` · `standard` |\n" if p == 'web' else "") + """| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Title` | TEXT | | `Edit device` | `title` | |
| `Back button` | BOOLEAN | | `false` | `onBack` | set / null |
| `Footer` | BOOLEAN | | `true` | `footer` | present / absent |
| `Body` | INSTANCE_SWAP | preferred: `.Side sheet/body` | | `children` / `content` | |"""
    variants = ("- Axes: `Size × Mode × Language` = 3 × 2 × 2 = **12** variants\n- Grid: rows = Size × Mode, columns = Language; gap `spacing/xl`" if p == 'web'
                else "- Axes: `Size × Language` = 3 × 2 = **6** variants (modal only)\n- Grid: rows = Size, columns = Language; gap `spacing/xl`")
    notes = f"""- 01 Introduction: Light + Dark panels, an `MD` modal sheet over a {'Desktop' if p == 'web' else 'Tablet landscape'} frame with the scrim, legacy content rebuilt (info banner, sectioned cards, Save)
- 03 Variations: Size; {'Mode (modal floating vs standard attached beside a table); ' if p == 'web' else ''}back button on a second view; footer on / off
- 07 Platform: the A8 table{'; standard falls back to modal below Desktop' if p == 'web' else '; portrait vs landscape'}
- 08 RTL: the sheet on the left in Arabic, back arrow mirrored"""
    cc = '`3-web-components/src/components/side-sheet/SideSheet.figma.tsx`' if p == 'web' else '`4-tablet-components/lib/src/components/side_sheet/bw_side_sheet.figma.dart`'
    return head + d_rest(p, SS, struct, tree, props, variants, notes, cc)

if __name__=='__main__':
  for p in ['web', 'tablet']:
    write(p, 'side-sheet', header(p, SS) + SS_A + SS_A8[p] + SS_A_tail + ss_B(p) + ss_C(p) + ss_D(p) + tail(p, SS))
print('ok')
