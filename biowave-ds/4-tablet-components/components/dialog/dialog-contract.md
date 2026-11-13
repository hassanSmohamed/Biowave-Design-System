<!-- GENERATED from dialog.md @ 6e9e4035d0596e23 — do not edit; change the source and run: npm run contract -- tablet dialog -->
# Dialog · نافذة حوار — Tablet — code contract

> **Everything you need to build Dialog on Tablet, and nothing else.** Read this file only. Generated from [`dialog.md`](dialog.md) (Parts B and C). If something is unclear or impossible, stop and write it in [C8 Execution log → Questions](dialog.md#c8-execution-log-filled-by-the-executor) — never invent behaviour.

| | |
|---|---|
| Component | Dialog · نافذة حوار |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Flutter M3 `Dialog` shown with `showDialog`, styled from semantic tokens; `BwButton` and `BwIconButton` for actions and close |
| Import | `BwDialog`, `showBwDialog` from `package:biowave_tablet/biowave_tablet.dart` |
| Version | 1.0 · 2026-11-13 |
| Source code | `lib/src/components/dialog/` — not built yet (the Executor creates it) |
| Tokens | — |
| Source | [`dialog.md`](dialog.md) @ `6e9e4035d0596e23` |

## 1. What it is

A dialog is a window that opens on top of the page and blocks it until the user answers. It asks one clear question ("Delete this shift?") or holds one short task (rename a report, pick a date), and it always ends with the user choosing an action or closing it. Because it interrupts, use it only when the user must decide or act before going on.

**Part names** (use exactly these in code, class names and tests):

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `scrim` | Yes | Dims the page behind the dialog and blocks it |
| 2 | `container` | Yes | Raised surface with rounded corners that holds the parts below |
| 3 | `title` | Yes | The question or the task, in a few words |
| 4 | `close-button` | No | Icon button that closes the dialog without an action. Shown when closing is safe |
| 5 | `alert` | No | One Alert under the title for a warning the user must read before acting |
| 6 | `body` | Yes | The content: text, a short list or a few form fields. Scrolls when it is taller than the window |
| 7 | `footer` | Yes | One to three actions, the main action at the end. A divider shows above it while the body scrolls |

**Options** (names and values are the props in §2):

- 4.1 `size`
- 4.2 `kind`
- 4.3 `close-button`
- 4.4 `alert`
- 4.5 `dismissible`

## 2. API

### showBwDialog / BwDialog
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

## 3. Dimensions

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
| `footer` | stacking | stacked, full width, primary first, when the row does not fit | `OverflowBar` overflow, `overflowDirection: VerticalDirection.up` |
| `footer` | divider | Divider default, shown only while the body scrolls | `BwDivider` toggled by the body's `ScrollMetrics` |

Layout rules: centred; height hugs the content up to the max height; moves above the keyboard.

## 4. Tokens by part and state

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

### 4.1 How to use each token on Tablet

Values are for checking only — never paste a value.

| Token | Dart | Light | Dark |
|---|---|---|---|
| `color-overlay-default` | `context.bw.colors.overlayDefault` | #54545499 | #545454B3 |
| `color-surface-raised` | `context.bw.colors.surfaceRaised` | #FFFFFF | #292929 |
| `color-text-default` | `context.bw.colors.textDefault` | #0A0A0A | #F7F7F7 |
| `elevation-4` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0px 16px 48px -4px rgb(7 19 35 / 18%) | 0px 16px 48px -4px rgb(0 0 0 / 45%) |
| `motion-duration-instant` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 0 | 0 |
| `motion-duration-lg` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 300 | 300 |
| `motion-duration-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 200 | 200 |
| `motion-easing-emphasized-accelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.3,0,0.8,0.15] | [0.3,0,0.8,0.15] |
| `motion-easing-emphasized-decelerate` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | [0.05,0.7,0.1,1] | [0.05,0.7,0.1,1] |
| `radius-3xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 20 | 20 |
| `size-container-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 560 | 560 |
| `size-container-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 768 | 768 |
| `size-container-xs` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 384 | 384 |
| `spacing-layout-container` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` |  |  |
| `spacing-md` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 8 | 8 |
| `spacing-xl` | `context.bw` / `Bw*` constant in `bw_tokens.g.dart` | 16 | 16 |

## 5. States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Closed → Open | `open` / `showBwDialog` | scrim and container opacity 0 → 1 | `motion-duration-lg` | `motion-easing-emphasized-decelerate` |
| Open → Closed | action, close button, Esc, back, scrim | opacity 1 → 0 | `motion-duration-md` | `motion-easing-emphasized-accelerate` |
| Body at top → scrolled | body scroll | dividers appear (no animation) | `motion-duration-instant` | — |
| Main action → working | `primaryAction.loading` | Button loading (Button B4) | Button B4 | Button B4 |

Reduced motion: opacity changes become `motion-duration-instant`.

## 6. RTL

```
LTR  │ Disconnect LMS?                       [✕] │      │ [ Cancel ][ Disconnect ] │
RTL  │ [✕]                      فصل نظام إدارة التعلم؟ │      │ [ فصل ][ إلغاء ]          │
```

| Part | In RTL |
|---|---|
| layout | Mirrors: title at the start (right), close button at the end (left), actions end-aligned (left) with the main action last |
| `close-button` icon (`close`) | Does not mirror |
| body | Follows the reading direction; numbers and Latin names stay LTR inside Arabic text |

## 7. Accessibility (implementation)

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

## 8. Examples

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

## 9. How to build it

### Goal

`BwDialog` / `showBwDialog` from `package:biowave_tablet` matches B1–B6 and passes B9 and C6.

### Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Alert (Wave 9); until it exists the `alert` slot takes any widget / node
- Full-screen dialogs, stacked dialogs, draggable dialogs
- Button, Icon button and Divider code (used as they are)

### Approach

- **Base:** `showBwDialog` calls `showDialog(barrierColor: overlayDefault, barrierDismissible: dismissible)`; the builder returns M3 `Dialog` with `backgroundColor: surfaceRaised`, `surfaceTintColor: Colors.transparent`, the B2 shape and shadow, `insetPadding` and a `ConstrainedBox` for `size`.
- **Motion:** pass `AnimationStyle(duration: BwDuration.lg, reverseDuration: BwDuration.md, curve: BwEasing.emphasizedDecelerate, reverseCurve: BwEasing.emphasizedAccelerate)` (`showDialog(animationStyle:)`); `context.bw.reduceMotion` → `BwDuration.instant`.
- **Structure:** `Column` of title row (`Text` + `BwIconButton`), `alert`, `Flexible(SingleChildScrollView(content))`, `OverflowBar` of `BwButton`s; dividers from a `ScrollController` listener.
- **Dismiss while loading:** `PopScope(canPop: dismissible && !primaryAction.loading)`.
- **Keyboard:** `MediaQuery.viewInsetsOf` added to the inset so the dialog rises above the keyboard.

### Token gaps

None — every value in B2–B3 is an existing semantic token.

### Files to create / change

```
4-tablet-components/lib/src/components/dialog/bw_dialog.dart   new (widget, showBwDialog, BwDialogAction, enums)
4-tablet-components/test/dialog_test.dart                          new
4-tablet-components/test/goldens/dialog/                           new goldens
4-tablet-components/lib/biowave_tablet.dart                     change: export (alphabetical)
4-tablet-components/README.md                                      change: Dialog row (Code)
CHANGELOG.md                                                      change: one entry
```

## 10. Tests

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

Implement every item in B9, plus:
- [ ] The dialog rises above the on-screen keyboard and the focused field stays visible
- [ ] Earlier tests still pass

## 11. Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6 (focus in, trap, return; dismiss rules)
- [ ] AC-5 Tests in B9 and C6 exist and pass; `cd 4-tablet-components && flutter analyze && flutter test`, `npm run docs:check` pass
- [ ] AC-6 Exported from the package entry file; README status updated; nothing outside C5 changed

## 12. Rules

1. Never edit generated files (`*/generated/*`, `2-foundations/dist/`, `2-foundations/preview/`, `_sync/*.json`, any `*-contract.md`).
2. No raw values: no hex, px, ms or font names — only the tokens in §4. A missing value means stop and ask; tokens are added by the Planner.
3. Never use primitives (`primitive.*`, `BwPalette`).
4. RTL first: logical properties only (`EdgeInsetsDirectional`, `AlignmentDirectional`, `BorderRadiusDirectional`); mirror only directional icons (§6).
5. Light + dark and en + ar, always — and tested.
6. WCAG 2.2 AA: keyboard, visible focus (`color-border-focus`, 2px, 2px offset), labels, targets ≥ `target-min` (48dp), reduced motion.
7. Stay inside this contract; one component per task; do not refactor unrelated files.

## 13. Commands that must pass

```bash
cd 4-tablet-components && flutter analyze && flutter test
npm run component-tokens
npm run sync        # must end with READY
npm run docs:check
```

## 14. When you finish

1. Fill [C8 Execution log](dialog.md#c8-execution-log-filled-by-the-executor) in `dialog.md` (agent, date, files, deviations, questions).
2. Set **Code** to `Built` in the header of `dialog.md` and in the Components table of `4-tablet-components/README.md`.
3. Add one line to the root `CHANGELOG.md` (rule: every change is logged in the same task).
