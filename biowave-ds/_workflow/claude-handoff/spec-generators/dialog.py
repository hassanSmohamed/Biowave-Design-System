import sys; sys.path.insert(0, sys.path[0])
from common import *

C = dict(name='Dialog', ar='نافذة حوار', slug='dialog',
  summary='A modal window that asks the user to confirm a decision or complete a short focused task before going back to the page.',
  summary_ar='نافذة مشروطة تطلب من المستخدم تأكيد قرار أو إكمال مهمة قصيرة مركّزة قبل العودة إلى الصفحة.',
  parts='Scrim · container · title · close button · alert · body · footer',
  parts_ar='الطبقة المعتمة · الحاوية · العنوان · زر الإغلاق · التنبيه · المحتوى · التذييل',
  built_on={
    'web': 'MUI `Dialog` (portal, focus trap, scroll lock, `Fade` transition), styled only from semantic tokens; Biowave `Button` and `IconButton` for actions and close',
    'tablet': 'Flutter M3 `Dialog` shown with `showDialog`, styled from semantic tokens; `BwButton` and `BwIconButton` for actions and close',
    'mobile': 'Flutter `AlertDialog.adaptive` shown with `showAdaptiveDialog` (N-07): iOS renders `CupertinoAlertDialog`, Android renders the M3 `AlertDialog`; Biowave colours and type through the theme',
  },
  **{'import': {
    'web': "`import { Dialog } from '@biowave/web'`",
    'tablet': '`BwDialog`, `showBwDialog` from `package:biowave_tablet/biowave_tablet.dart`',
    'mobile': '`BwDialog`, `showBwDialog` from `package:biowave_mobile/biowave_mobile.dart`',
  }})

A8 = {
'web': """### A8 Platform notes — Web

| | Web |
|---|---|
| Available | ✓ all sizes |
| Layout | Centred in the window. When the window is narrower than the size, the dialog takes the window width minus the page margin on each side |
| Interaction | Pointer + keyboard. Esc and a click on the scrim close a dismissible dialog |
| Long content | The body scrolls inside the dialog; header and footer stay put |
| Not supported | Full-screen dialogs (use a page), dialogs stacked on dialogs |
""",
'tablet': """### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Available | ✓ all sizes |
| Layout | Centred on the screen. When the on-screen keyboard opens, the dialog moves up so the focused field stays visible; if it does not fit, the body scrolls |
| Interaction | Touch, plus hardware keyboard (Esc closes a dismissible dialog). A tap on the scrim closes a dismissible dialog |
| Pickers | Date, time and other pickers on Tablet open in a Dialog (decision IC-08) |
| Not supported | Full-screen dialogs (use a page or a Bottom sheet), dialogs stacked on dialogs |
""",
'mobile': """### A8 Platform notes — Mobile

On Mobile the dialog is the **native alert** of each OS (N-01), in Biowave colours and type. It is for short confirmations only: a title, one or two sentences and up to three actions. Anything with fields, lists or more text opens in a full-height [Bottom sheet](../bottom-sheet/bottom-sheet.md#a--guidelines) instead (O-03).

```
iOS (iOS and iPadOS 27 Alert)            Android (Material 3 Basic dialog)
      ┌───────────────────────┐           ┌──────────────────────────────┐
      │   Delete this shift?  │           │ Delete this shift?           │
      │ Staff will be told it │           │ Staff will be told it was    │
      │ was cancelled.        │           │ cancelled.                   │
      ├───────────┬───────────┤           │                              │
      │  Cancel   │  Delete   │           │            Cancel    Delete  │
      └───────────┴───────────┘           └──────────────────────────────┘
```

| | Mobile |
|---|---|
| Available | ✓ `basic` and `destructive`; no `size` (the OS sets the width) |
| iOS | Apple Alert from the **iOS and iPadOS 27** kit: centred title and message, full-width text actions in a row (two) or a stack (three); destructive action in the error colour; no close button, no alert slot |
| Android | Material 3 Basic dialog: start-aligned title and supporting text, text buttons at the end; destructive action in the error colour; no close button |
| Interaction | Touch. Android back gesture and a tap on the scrim close a dismissible dialog; iOS alerts close only through an action |
| Not supported | `size`, `alert`, `closeButton`, form fields or lists in the body (use a Bottom sheet) |
""",
}

A = """## A · Guidelines

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
| Long forms or more than one step | A page, or a [Side sheet](../side-sheet/side-sheet.md#a--guidelines) on Web and Tablet |
| Extra detail the user may read while working on the page | [Side sheet](../side-sheet/side-sheet.md#a--guidelines) |
| Choices or a short task on Mobile | [Bottom sheet](../bottom-sheet/bottom-sheet.md#a--guidelines) |
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

"""

A_tail = """### A9 Accessibility (design)

- Keyboard and screen reader users reach every part of the dialog and nothing behind it while it is open
- The title names the dialog; the body text is read after the title
- Focus starts inside the dialog: on the first field, or on the safe action for `destructive` dialogs; it goes back to the opening control on close
- Esc (and the Android back gesture) closes a dismissible dialog
- Actions keep the 4.5:1 text contrast; the destructive action is not shown by colour only — its label says what it does

### A10 Related components

- [Bottom sheet](../bottom-sheet/bottom-sheet.md#a--guidelines) — choices and short tasks on Mobile and Tablet, attached to the bottom edge
- [Side sheet](../side-sheet/side-sheet.md#a--guidelines) — longer forms and details that keep the page in view on Web and Tablet
- [Button](../button/button.md#a--guidelines) — the footer actions
- [Icon button](../icon-button/icon-button.md#a--guidelines) — the close button

---

"""

def guidelines(p):
    return A + A8[p] + "\n" + A_tail

# ---------------- B per platform ----------------
def B(p):
    if p == 'web':
        api = """#### Dialog
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `open` | boolean | | — | ✓ | Shows the dialog |
| `onClose` | `(reason: 'close-button' \\| 'escape' \\| 'scrim') => void` | | — | ✓ | Called for every way of closing that is not an action |
| `title` | string | plain text (A6) | — | ✓ | `title` |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.1 |
| `kind` | enum | `basic` · `destructive` | `basic` | | A4.2 — sets the main action colour and the first focus |
| `closeButton` | boolean | | `true` | | A4.3 |
| `dismissible` | boolean | | `true` | | A4.5 — Esc and scrim click call `onClose`; when `false` they do nothing |
| `alert` | `ReactNode` | one Biowave `Alert` | — | | A4.4 |
| `primaryAction` | `{ label: string; onClick: () => void; loading?: boolean; disabled?: boolean }` | | — | ✓ | Main action at the end of the footer |
| `secondaryAction` | `{ label: string; onClick: () => void }` | | — | | Usually "Cancel" |
| `tertiaryAction` | `{ label: string; onClick: () => void }` | | — | | Rare third action, at the start of the footer |
| `children` | `ReactNode` | text, list, form fields | — | ✓ | `body` |
| `initialFocusRef` | `RefObject<HTMLElement>` | | — | | Overrides the first focus (B6) |

Platform naming: web `children` = Flutter `content`; `onClick` = `onPressed`; `primaryAction` = `BwDialogAction`."""
        inv = """| Combination | Fallback |
|---|---|
| `closeButton={false}` and no `secondaryAction` | warn "Dialog needs a way out"; `closeButton` is shown |
| `tertiaryAction` without `secondaryAction` | warn; the tertiary action is rendered as the secondary |
| `alert` holding more than one element | warn; only the first is rendered |
| `primaryAction.loading` with `dismissible` | Esc and scrim click are ignored while loading (not a warning) |"""
        fl = ''
    else:
        api = """#### showBwDialog / BwDialog
`Future<T?> showBwDialog<T>({required BuildContext context, required BwDialog dialog})` opens the dialog over a modal route and returns the value passed to `Navigator.pop`.

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `title` | `String` | plain text (A6) | — | ✓ | `title` |
""" + ("""| `size` | `BwDialogSize` | `sm` · `md` · `lg` | `md` | | A4.1 |
""" if p == 'tablet' else '') + """| `kind` | `BwDialogKind` | `basic` · `destructive` | `basic` | | A4.2 |
""" + ("""| `closeButton` | `bool` | | `true` | | A4.3 |
| `alert` | `Widget?` | one `BwAlert` | — | | A4.4 |
| `content` | `Widget` | text, list, form fields | — | ✓ | `body` |
""" if p == 'tablet' else """| `message` | `String` | 1–3 sentences (A6) | — | ✓ | `body` — plain text only on Mobile (A8) |
""") + """| `dismissible` | `bool` | | `true` | | A4.5 — scrim tap, Esc and back |
| `primaryAction` | `BwDialogAction` | `label`, `onPressed`, `loading`, `enabled` | — | ✓ | Main action |
| `secondaryAction` | `BwDialogAction?` | | — | | Usually "Cancel" |
| `tertiaryAction` | `BwDialogAction?` | | — | | Rare third action |

Platform naming: web `children` = Flutter """ + ("`content`" if p == 'tablet' else "`message`") + "; `onClick` = `onPressed`." + ("" if p == 'tablet' else " The OS look is chosen by `Theme.of(context).platform` through the `.adaptive` constructors (N-07); there is no `os` param.")
        inv = """| Combination | Fallback |
|---|---|
""" + ("""| `closeButton: false` and no `secondaryAction` | assert "BwDialog needs a way out"; release shows the close button |
""" if p == 'tablet' else """| `message` longer than 3 sentences or containing line breaks | assert "Use a Bottom sheet for longer content"; release renders it |
""") + """| `tertiaryAction` without `secondaryAction` | assert; release renders it as the secondary |"""
    return api, inv

def dims(p):
    if p == 'web':
        return """```
             spacing-layout-container                  spacing-layout-container
            ├────┤                                              ├────┤
        ┬   ┌──────────────────────────────────────────────────────────┐   radius-3xl · elevation-4
        │   │    Disconnect LMS?                              [✕]      │   title heading-sm · gap spacing-xl
        │   │    ▒▒ alert ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒      │   ↕ spacing-xl
        │   │    Body text, list or form fields                        │   body-md
        │   │ ──────────────────────────────────────────────────────── │   divider only while the body scrolls
        │   │                              [ Cancel ][ Disconnect ]    │   Button md · gap spacing-md
        ┴   └──────────────────────────────────────────────────────────┘
            width sm size-container-xs · md size-container-md · lg size-container-xl
```

| Part | Property | Value |
|---|---|---|
| `scrim` | fill · stacking | `color-overlay-default` · `layer-modal` (below the container) |
| `container` | width | `sm` `size-container-xs` · `md` `size-container-md` · `lg` `size-container-xl`; never wider than the window minus `spacing-layout-container` on each side |
| `container` | max height | window height minus `spacing-layout-container` top and bottom |
| `container` | radius · elevation · stacking | `radius-3xl` · `elevation-4` · `layer-modal` |
| `container` | padding | `spacing-layout-container` on all sides (header, alert, body and footer share it) |
| `container` | gap between header, alert, body and footer | `spacing-xl` |
| `title` | text style | `heading-sm` (Web dialog title, typography.md) |
| `title` | wrapping | wraps, max 2 lines, never truncated |
| `close-button` | component | Icon button `variant=transparent` · `color=neutral` · `size=md`, icon `close`; aligned to the first line of the title; gap to the title `spacing-xl` |
| `alert` | component | one Alert, full width |
| `body` | text style | `body-md` for plain text |
| `body` | overflow | scrolls vertically; header, alert and footer stay fixed |
| `footer` | actions | Button `size=md`; secondary `variant=outlined color=neutral`, tertiary `variant=text color=neutral`, primary `variant=filled` `color=brand` (`basic`) or `color=error` (`destructive`); gap `spacing-md`; end-aligned; tertiary at the start |
| `footer` | stacking | when the actions do not fit in one row: stacked, full width, primary first, gap `spacing-md` |
| `footer` | divider | Divider (default emphasis) at the top of the footer and under the header, shown only while the body scrolls |

Layout rules: centred in the window both ways. Height hugs the content up to the max height."""
    if p == 'tablet':
        return """```
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
| `footer` | stacking | stacked, full width, primary first, when the row does not fit | `OverflowBar` overflow, `overflowDirection: VerticalDirection.up` |
| `footer` | divider | Divider default, shown only while the body scrolls | `BwDivider` toggled by the body's `ScrollMetrics` |

Layout rules: centred; height hugs the content up to the max height; moves above the keyboard."""
    return """```
iOS — iOS and iPadOS 27 Alert                 Android — M3 Basic dialog
   ┌─────────────────────────┐                ┌───────────────────────────────┐   radius-3xl · elevation-4
   │    Delete this shift?   │ heading-md     │ Delete this shift?            │   heading-md · start-aligned
   │  Staff will be told it  │ body-md        │ Staff will be told it was     │   body-md · color-text-subtle
   │  was cancelled.         │                │ cancelled.                    │
   ├────────────┬────────────┤ separators     │              Cancel   Delete  │   text buttons · gap spacing-md
   │   Cancel   │   Delete   │                └───────────────────────────────┘
   └────────────┴────────────┘                width: M3 280–560, inset spacing-layout-container
   width and padding from the OS
```

| Part | Property | iOS (`CupertinoAlertDialog`) | Android (M3 `AlertDialog`) |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` (`barrierColor`) | `color-overlay-default` (`barrierColor`) |
| `container` | width · padding | from the OS (Apple kit) | M3 min 280 / max 560 from the framework; `insetPadding: EdgeInsets.symmetric(horizontal: context.bw.layout.container)` |
| `container` | background | `color-surface-raised` at the OS translucency (`CupertinoTheme` `barBackgroundColor`) | `color-surface-raised`; `surfaceTintColor: Colors.transparent` |
| `container` | radius · elevation | from the OS | `radius-3xl` · `elevation-4` |
| `title` | text style | `heading-md` at the OS weight, centred | `heading-md`, start-aligned |
| `body` (`message`) | text style · colour | `body-md` · `color-text-subtle`, centred | `body-md` · `color-text-subtle` |
| `footer` | actions | `CupertinoDialogAction`; primary `isDefaultAction: true` in `color-text-role-brand`; destructive `isDestructiveAction: true` in `color-text-role-error`; separators `color-border-subtle` | `TextButton`s via `BwButton(variant: text)`; primary `brand`, destructive `error`; secondary `neutral`; gap `spacing-md`, end-aligned |
| `footer` | layout | two actions side by side; three stacked (OS rule) | in one row; stacked when they do not fit (`OverflowBar`) |

Fonts: IBM Plex Sans Arabic / Inter through `context.bw.text` on both OSes (Biowave identity); the OS keeps its layout, materials and separators."""

def tokens_table(p):
    if p == 'mobile':
        return """| Part | Property | Default | Pressed | Disabled |
|---|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | — | — |
| `container` | background | `color-surface-raised` | — | — |
| `title` | color | `color-text-default` | — | — |
| `body` | color | `color-text-subtle` | — | — |
| primary action (iOS) | label | `color-text-role-brand` | `color-background-transparent-pressed` row fill | `color-text-disabled` |
| destructive action (iOS) | label | `color-text-role-error` | `color-background-transparent-pressed` row fill | `color-text-disabled` |
| secondary action (iOS) | label | `color-text-role-brand` (regular weight) | `color-background-transparent-pressed` row fill | `color-text-disabled` |
| action separators (iOS) | stroke | `color-border-subtle` | — | — |
| actions (Android) | — | Button `text` B3 (`brand`, `error`, `neutral`) | Button B3 | Button B3 |

Dark theme: same tokens; no exceptions."""
    return """| Part | Property | Default | Notes |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | |
| `container` | background | `color-surface-raised` | |
| `container` | shadow | `elevation-4` | |
| `title` | color | `color-text-default` | |
| `body` | text colour (plain text) | `color-text-default` | slot content keeps its own tokens |
| `close-button` | — | Icon button B3 (`transparent`, `neutral`) | |
| `footer` | actions | Button B3 (`outlined neutral`, `text neutral`, `filled brand` / `filled error`) | |
| `footer` · header | divider | Divider B3 (`default`) | only while the body scrolls |

Dark theme: same tokens; the surface and overlay switch values. No hover, pressed or disabled state on the dialog itself — its actions keep their own states."""

def B_full(p):
    api, inv = B(p)
    flutter_motion = p != 'web'
    trans = """| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Closed → Open | `open` / `showBwDialog` | scrim and container opacity 0 → 1 | `motion-duration-lg` | `motion-easing-emphasized-decelerate` |
| Open → Closed | action, close button, Esc, back, scrim | opacity 1 → 0 | `motion-duration-md` | `motion-easing-emphasized-accelerate` |
| Body at top → scrolled | body scroll | dividers appear (no animation) | `motion-duration-instant` | — |
| Main action → working | `primaryAction.loading` | Button loading (Button B4) | Button B4 | Button B4 |"""
    if p == 'mobile':
        trans = """| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Closed → Open | `showBwDialog` | iOS: the OS alert entrance (fade + scale, framework) · Android: opacity 0 → 1 | iOS: framework · Android: `motion-duration-lg` | iOS: framework · Android: `motion-easing-emphasized-decelerate` |
| Open → Closed | action, back (Android), scrim (Android) | opacity 1 → 0 | iOS: framework · Android: `motion-duration-md` | iOS: framework · Android: `motion-easing-emphasized-accelerate` |
| Main action → working | `primaryAction.loading` | Android: Button loading · iOS: action disabled with a spinner in place of the label | Button B4 | Button B4 |

The iOS entrance keeps Apple's timing on purpose: the alert must feel native (N-05)."""
    rtl = """```
LTR  │ Disconnect LMS?                       [✕] │      │ [ Cancel ][ Disconnect ] │
RTL  │ [✕]                      فصل نظام إدارة التعلم؟ │      │ [ فصل ][ إلغاء ]          │
```

| Part | In RTL |
|---|---|
| layout | Mirrors: title at the start (right), close button at the end (left), actions end-aligned (left) with the main action last |
| `close-button` icon (`close`) | Does not mirror |
| body | Follows the reading direction; numbers and Latin names stay LTR inside Arabic text |"""
    if p == 'mobile':
        rtl = """| Part | In RTL |
|---|---|
| iOS | Title and message centred (no change); actions in a row swap order (Cancel on the right) — the framework mirrors them |
| Android | Title and text start-aligned (right); actions end-aligned (left), main action last |
| text | Arabic copy from A6; numbers and Latin names stay LTR |"""
    if p == 'web':
        a11y = """| Requirement | Implementation |
|---|---|
| Role / semantics | MUI `Dialog`: `role="dialog"`, `aria-modal="true"`; `role="alertdialog"` for `kind="destructive"` |
| Accessible name · description | `aria-labelledby` → `title`; `aria-describedby` → the body when it is plain text |
| Focus on open | `initialFocusRef` if given; else the first focusable field in the body; else the secondary action for `destructive`, the primary action for `basic` |
| Focus trap · return | MUI focus trap; on close focus returns to the element that had focus before opening |
| Page behind | `aria-hidden` and `inert` through MUI; body scroll locked |
| Close button | `IconButton label="Close"` / `"إغلاق"` (tooltip on) |
| Target size | Buttons ≥ 24px (Button B6) |
| Screen reader output | "Disconnect LMS?, dialog, Learners lose access to courses…" |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Moves through the dialog only (wraps) |
| Esc | Closes when `dismissible`; nothing while the main action is loading |
| Enter / Space | Activate the focused action; Enter inside a form field submits when the body is a `<form>` |"""
    else:
        a11y = """| Requirement | Implementation |
|---|---|
| Role / semantics | `Semantics(scopesRoute: true, namesRoute: true, explicitChildNodes: true, label: title)` from the dialog route""" + (""" (M3 `Dialog`)""" if p == 'tablet' else """ (both adaptive forms)""") + """ |
| Focus | Route focus scope; first field or, for `destructive`, the secondary action gets focus with a hardware keyboard; focus returns to the opener on close |
| Dismiss | `barrierDismissible: dismissible`; Esc via `DismissIntent` and Android back via `PopScope(canPop: dismissible && !loading)` |
| Close button""" + (""" | `BwIconButton` label "Close" / "إغلاق" |""" if p == 'tablet' else """ | none (A8) |""") + """
| Target size | ≥ 48dp (`meetsGuideline(androidTapTargetGuideline)` and iOS 44pt) |
| Screen reader output | "Delete this shift?, alert, Staff will be told it was cancelled." |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves through the dialog only |
| Esc | Closes when `dismissible` |
| Enter / Space | Activate the focused action |"""
    if p == 'web':
        ex = """```tsx
import { Dialog, Alert } from '@biowave/web';

<Dialog
  open={open} onClose={() => setOpen(false)}
  title="Disconnect LMS?" kind="destructive"
  alert={<Alert severity="warning">Learners lose access to courses until you connect again.</Alert>}
  secondaryAction={{ label: 'Cancel', onClick: () => setOpen(false) }}
  primaryAction={{ label: 'Disconnect', onClick: disconnect, loading: busy }}>
  Type DISCONNECT to confirm.
</Dialog>

// Arabic: same props, Arabic text; direction comes from the provider
<Dialog open={open} onClose={close} title="حذف هذه الوردية؟" size="sm" kind="destructive"
  secondaryAction={{ label: 'إلغاء', onClick: close }} primaryAction={{ label: 'حذف', onClick: remove }}>
  سيتم إبلاغ الموظفين بإلغائها.
</Dialog>
```"""
    else:
        pkg = 'biowave_' + p
        body = """content: const Text('Staff will be told it was cancelled.')""" if p == 'tablet' else """message: 'Staff will be told it was cancelled.'"""
        body_ar = """content: const Text('سيتم إبلاغ الموظفين بإلغائها.')""" if p == 'tablet' else """message: 'سيتم إبلاغ الموظفين بإلغائها.'"""
        ex = f"""```dart
import 'package:{pkg}/{pkg}.dart';

final ok = await showBwDialog<bool>(
  context: context,
  dialog: BwDialog(
    title: 'Delete this shift?',
    kind: BwDialogKind.destructive,
    {body},
    secondaryAction: BwDialogAction(label: 'Cancel', onPressed: () => Navigator.pop(context, false)),
    primaryAction: BwDialogAction(label: 'Delete', onPressed: () => Navigator.pop(context, true)),
  ),
);

// Arabic: same API; direction from the app locale
BwDialog(title: 'حذف هذه الوردية؟', kind: BwDialogKind.destructive, {body_ar},
  secondaryAction: BwDialogAction(label: 'إلغاء', onPressed: close),
  primaryAction: BwDialogAction(label: 'حذف', onPressed: remove));
```"""
    tests = """- [ ] Light + dark · en + ar: container, scrim, title, body and actions use exactly the B2–B3 tokens""" + (" for every `size`" if p != 'mobile' else " on iOS and Android (`debugDefaultTargetPlatformOverride`)") + """
- [ ] Every transition in B4 with the token durations and easings; reduced motion → `motion-duration-instant`""" + (" (Android form)" if p == 'mobile' else "") + """
- [ ] `kind="destructive"`: main action in the error colour; first focus on the secondary action""" + ("; `role=\"alertdialog\"`" if p == 'web' else "") + """
- [ ] `dismissible` on / off: scrim, Esc""" + (" and back" if p != 'web' else "") + """ close or do nothing; nothing closes while `primaryAction.loading`
- [ ] Focus moves into the dialog on open, stays inside (Tab wraps) and returns to the opener on close
- [ ] Long body scrolls with header and footer fixed; dividers only while scrolled""" + ("" if p == 'mobile' else """
- [ ] Footer stacks full width, primary first, when the actions do not fit (`sm` in Arabic)""") + """
- [ ] Every invalid combination in B1 warns / asserts and falls back
- [ ] a11y: """ + ("axe on `baseElement` with the dialog open (portal included), light/dark × en/ar" if p == 'web' else "`meetsGuideline` tap target and text contrast, semantics tree names the route") + """
- [ ] No raw values (lint over the component folder)"""
    return f"""## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

{api}

**Invalid combinations** ({'`console.warn` in development, then the fallback renders' if p == 'web' else '`assert` in debug, fallback in release'}):
{inv}

### B2 Dimensions

{dims(p)}

### B3 Tokens by part and state

Every value is a semantic token; there is no `dialog.tokens.json` (no component tokens — the nested Button, Icon button and Divider carry their own).

{tokens_table(p)}

### B4 States and transitions

{trans}

Reduced motion: opacity changes become `motion-duration-instant`{' (Android form; the iOS alert follows the OS Reduce Motion setting)' if p == 'mobile' else ''}.

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

def Cpart(p):
    if p == 'web':
        appr = """- **Base:** MUI `Dialog` with `TransitionComponent={Fade}`; `transitionDuration={{ enter: motion-duration-lg, exit: motion-duration-md }}` and the easings from `cssVars.motion`; `slotProps.backdrop` fill `color-overlay-default`; `PaperProps` background `color-surface-raised`, radius `radius-3xl`, shadow `elevation-4`, width from `size`, `maxWidth={false}`.
- **Structure:** `DialogTitle` (title + `IconButton`), the `alert` slot, `DialogContent` (body, `dividers` toggled by scroll position), `DialogActions` (Biowave `Button`s). No MUI colors.
- **First focus:** `disableAutoFocus` on MUI and a `useEffect` on enter that focuses `initialFocusRef`, the first focusable field, or the action B6 names.
- **Dismiss:** `onClose` from MUI maps `backdropClick` → `'scrim'`, `escapeKeyDown` → `'escape'`; ignored when `dismissible` is false or `primaryAction.loading` is true.
- **Footer stacking:** container query on the footer width; stacked layout uses `flex-direction: column-reverse` so the primary is first visually and last in tab order is not changed — keep DOM order secondary → primary.
- **Gotchas:** MUI `Dialog` adds `elevation` shadows from the MUI theme — override with `elevation-4`; set `PaperProps.elevation={0}` and apply the Biowave shadow."""
        files = """3-web-components/src/components/dialog/Dialog.tsx         new
3-web-components/src/components/dialog/Dialog.test.tsx    new
3-web-components/src/components/dialog/index.ts           new
3-web-components/src/index.ts                             change: export (alphabetical)
3-web-components/README.md                                change: Dialog row (Code)
CHANGELOG.md                                              change: one entry"""
        cmd = "`npm run test:web`, `npm run typecheck`, `npm run docs:check`"
        extra = """- [ ] Opening a second Dialog while one is open warns and does not open
- [ ] `onClose` receives the right reason for each way of closing"""
    else:
        pkg = 'biowave_' + p
        if p == 'tablet':
            appr = """- **Base:** `showBwDialog` calls `showDialog(barrierColor: overlayDefault, barrierDismissible: dismissible)`; the builder returns M3 `Dialog` with `backgroundColor: surfaceRaised`, `surfaceTintColor: Colors.transparent`, the B2 shape and shadow, `insetPadding` and a `ConstrainedBox` for `size`.
- **Motion:** pass `AnimationStyle(duration: BwDuration.lg, reverseDuration: BwDuration.md, curve: BwEasing.emphasizedDecelerate, reverseCurve: BwEasing.emphasizedAccelerate)` (`showDialog(animationStyle:)`); `context.bw.reduceMotion` → `BwDuration.instant`.
- **Structure:** `Column` of title row (`Text` + `BwIconButton`), `alert`, `Flexible(SingleChildScrollView(content))`, `OverflowBar` of `BwButton`s; dividers from a `ScrollController` listener.
- **Dismiss while loading:** `PopScope(canPop: dismissible && !primaryAction.loading)`.
- **Keyboard:** `MediaQuery.viewInsetsOf` added to the inset so the dialog rises above the keyboard."""
        else:
            appr = """- **Base (N-07):** `showBwDialog` calls `showAdaptiveDialog(barrierColor: overlayDefault, barrierDismissible: dismissible)`; the builder returns `AlertDialog.adaptive(title:, content: Text(message), actions:)`. On iOS the framework renders `CupertinoAlertDialog` (iOS and iPadOS 27 anatomy); on Android the M3 `AlertDialog`.
- **Actions:** `adaptiveAction()` helper: iOS → `CupertinoDialogAction(isDefaultAction: primary && basic, isDestructiveAction: destructive, child: Text(label, style: context.bw.text.actionMd))`; Android → `BwButton(variant: BwButtonVariant.text, color: brand | error | neutral)`.
- **Theme:** colours and fonts come from `BwMobileTheme` (`ThemeData.dialogTheme`, `CupertinoThemeData` with Biowave `primaryColor` and text theme). Nothing in the widget hard-codes the OS look.
- **Motion:** Android form `AnimationStyle` as Tablet; iOS keeps the framework animation (B4).
- **Gotcha:** `CupertinoAlertDialog` ignores `ThemeData` text styles — pass the Biowave `TextStyle`s to `title` and `content` explicitly."""
        files = f"""{SEC[p]}/lib/src/components/dialog/bw_dialog.dart   new (widget, showBwDialog, BwDialogAction, enums)
{SEC[p]}/test/dialog_test.dart                          new
{SEC[p]}/test/goldens/dialog/                           new goldens{' (iOS and Android)' if p == 'mobile' else ''}
{SEC[p]}/lib/{pkg}.dart                     change: export (alphabetical)
{SEC[p]}/README.md                                      change: Dialog row (Code)
CHANGELOG.md                                                      change: one entry"""
        cmd = f"`cd {SEC[p]} && flutter analyze && flutter test`, `npm run docs:check`"
        extra = """- [ ] The dialog rises above the on-screen keyboard and the focused field stays visible""" if p == 'tablet' else """- [ ] `TargetPlatform.iOS` renders `CupertinoAlertDialog`, `TargetPlatform.android` the M3 `AlertDialog` (golden each, en and ar)
- [ ] Biowave fonts on both OSes (title and message use `context.bw.text`)"""
    goal = {'web': '`Dialog` from `@biowave/web`', 'tablet': '`BwDialog` / `showBwDialog` from `package:biowave_tablet`', 'mobile': '`BwDialog` / `showBwDialog` from `package:biowave_mobile`, native on iOS and Android'}[p]
    return f"""## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `dialog-contract.md`.

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
- Alert (Wave 9); until it exists the `alert` slot takes any widget / node
- Full-screen dialogs, stacked dialogs, draggable dialogs
- Button, Icon button and Divider code (used as they are)

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

def Dpart(p):
    head = d_head(p, C, '**Create new.** No legacy Dialog set exists; the anatomy comes from the legacy product screen `LMS _Disconnect` (Web `↳ Inputs`) and ' + ('the iOS and iPadOS 27 `Alert` and the Material 3 `Basic dialog` kits linked in this file' if p == 'mobile' else 'the Material 3 `Basic dialog`'),
        'Button, Icon Button and Divider sets in this file' + (' (Alert slot uses a placeholder until Alert is built in Wave 9)' if p != 'mobile' else '; the iOS and iPadOS 27 kit (`Alert`) and the Material 3 Design Kit (`Basic dialog`) for reference only — never instanced inside the set'))
    if p == 'mobile':
        struct = """```
❖ Dialog                          ← component set (published)
  ├─ ◇ .Scrim                      ← private, shared with Bottom sheet
  ├─ ◇ .Dialog/ios-action          ← private: one iOS alert action (label + state)
  └─ ◇ .Dialog/body                ← private placeholder (not used on Mobile — text only)
```"""
        tree = """```
Dialog (OS=iOS)            ↕ vertical · width from the Apple kit · radius from the kit · fill color/surface/raised
├── header                 ↕ centred · padding from the kit
│   ├── title              T heading/md · centred · TEXT `Title`
│   └── body               T body/md · color/text/subtle · centred · TEXT `Message`
└── footer                 ↔ (2 actions) or ↕ (3) · separators color/border/subtle
    ├── secondary-action   ◇ .Dialog/ios-action · TEXT `Secondary label`
    └── primary-action     ◇ .Dialog/ios-action · TEXT `Primary label` · colour by Kind

Dialog (OS=Android)        ↕ vertical · width fixed 312 example (B2: framework 280–560) · padding spacing/layout/container · radius/3xl · Elevation/4 · fill color/surface/raised
├── title                  T heading/md · start · TEXT `Title`
├── body                   T body/md · color/text/subtle · TEXT `Message`
└── footer                 ↔ end-aligned · gap spacing/md
    ├── secondary-action   ◇ Button variant=text color=neutral size=md · TEXT
    └── primary-action     ◇ Button variant=text color=brand|error size=md · TEXT
```"""
        props = """| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `OS` | VARIANT | `iOS` · `Android` | `iOS` | — | `Theme.platform` (N-07) |
| `Kind` | VARIANT | `Basic` · `Destructive` | `Basic` | `kind` | `basic` · `destructive` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Title` | TEXT | | `Delete this shift?` | `title` | |
| `Message` | TEXT | | `Staff will be told it was cancelled.` | `message` | |
| `Primary label` | TEXT | | `Delete` | `primaryAction.label` | |
| `Secondary label` | TEXT | | `Cancel` | `secondaryAction.label` | |"""
        variants = "- Axes: `OS × Kind × Language` = 2 × 2 × 2 = **8** variants\n- Grid: rows = OS × Kind, columns = Language; gap `spacing/xl`"
        notes = """- 01 Introduction: Light + Dark panels, iOS and Android side by side over a phone screen with the scrim
- 03 Variations: OS × Kind; three-action iOS stack; long Arabic title
- 07 Platform: the A8 table; the O-03 rule with a phone showing a form opening in a Bottom sheet instead of a dialog
- 08 RTL: both OSes in Arabic (iOS actions swapped, Android actions on the left)"""
    else:
        struct = """```
❖ Dialog                          ← component set (published)
  ├─ ◇ .Scrim                      ← private, shared with Bottom sheet and Side sheet
  └─ ◇ .Dialog/body                ← private placeholder slot (swap for the real content)
```"""
        tree = f"""```
Dialog                     ↕ vertical · gap spacing/xl · padding spacing/layout/container · width FIXED bound to size/container/xs|md|xl (Size)
│                            height hug · radius/3xl · fill color/surface/raised · effect Elevation/4
├── header                 ↔ gap spacing/xl · counter-axis top
│   ├── title              T heading/{'sm' if p == 'web' else 'md'} · fill color/text/default · width fill · TEXT `Title`
│   └── close-button       ◇ Icon Button transparent · neutral · md · glyph close · BOOLEAN `Close button`
├── alert                  ◇ placeholder frame (Alert in Wave 9) · width fill · BOOLEAN `Alert`
├── body                   ◇ .Dialog/body · width fill · INSTANCE_SWAP `Body`
└── footer                 ↔ end-aligned · gap spacing/md
    ├── tertiary-action    ◇ Button text · neutral · md · BOOLEAN `Tertiary action`
    ├── spacer             (fill, only when tertiary is shown)
    ├── secondary-action   ◇ Button outlined · neutral · md · BOOLEAN `Secondary action`
    └── primary-action     ◇ Button filled · brand (Basic) | error (Destructive) · md
```

`.Dialog/body` = vertical auto layout, width fill, one text `body/md` · `color/text/default` · TEXT `Body`."""
        props = """| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` | `sm` · `md` · `lg` |
| `Kind` | VARIANT | `Basic` · `Destructive` | `Basic` | `kind` | `basic` · `destructive` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | provider / locale |
| `Title` | TEXT | | `Disconnect LMS?` | `title` | |
| `Close button` | BOOLEAN | | `true` | `closeButton` | |
| `Alert` | BOOLEAN | | `false` | `alert` | present / absent |
| `Body` | INSTANCE_SWAP | preferred: `.Dialog/body` | `.Dialog/body` | `children` / `content` | |
| `Secondary action` | BOOLEAN | | `true` | `secondaryAction` | present / absent |
| `Tertiary action` | BOOLEAN | | `false` | `tertiaryAction` | present / absent |"""
        variants = "- Axes: `Size × Kind × Language` = 3 × 2 × 2 = **12** variants\n- Grid: rows = Size × Kind, columns = Language; gap `spacing/xl`"
        notes = f"""- 01 Introduction: Light + Dark panels, an `MD` Destructive dialog over a {'Desktop' if p == 'web' else 'Tablet'} frame with the scrim
- 03 Variations: Size (SM confirmation, MD with alert, LG two-column form) · Kind · close button on / off
- 04 States and motion: opening, scrolled body with dividers, working (primary loading), error
- 07 Platform: the A8 table; {'window narrower than the size' if p == 'web' else 'dialog above the on-screen keyboard; a picker in a dialog (IC-08)'}"""
    return head + f"""
### D2 Component structure

{struct}

### D3 Layer tree and auto layout

{tree}

### D4 Properties

{props}

### D5 Variants to generate

{variants}

### D6 States, interactions and motion

No prototype interactions on the set. Opening, scrolled, working and closing are shown on doc page 04 with B4 timings written next to them.

### D7 RTL

`Language=AR` variants: Typography mode `{LBL[p]} · AR`, auto layout direction from the text, layout per B5; Arabic copy from A6 (`حذف هذه الوردية؟`, `فصل نظام إدارة التعلم؟`). The `close` glyph does not mirror.

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Dialog — Documentation`, frames `Dialog / 00 Component sheet` … `Dialog / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Dialog:
{notes}
- 05 Usage: the A7 pairs, built with live instances

Component description: "Modal window for a decision or a short task. Spec: {SEC[p]}/components/dialog/dialog.md".

### D9 Code Connect

- File: {'`3-web-components/src/components/dialog/Dialog.figma.tsx`' if p == 'web' else f'`{SEC[p]}/lib/src/components/dialog/bw_dialog.figma.dart`'}
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

for p in ['web', 'tablet', 'mobile']:
    write(p, 'dialog', header(p, C) + guidelines(p) + B_full(p) + Cpart(p) + Dpart(p) + tail(p, C))
print('ok')
