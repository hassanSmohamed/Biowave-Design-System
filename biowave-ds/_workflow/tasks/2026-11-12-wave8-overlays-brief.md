# Wave 8 brief — Dialog · Bottom sheet · Side sheet (+ Scrim)

> Agent summary: audit and proposed decisions for the overlay family, before specs are written. Sources: legacy Foundations sets and product screens, the iOS 27 and Material 3 kits linked in the Mobile file, and the input family's hand-made 07 compositions. Decisions **O-01 … O-06** were approved by the design lead on 2026-11-13. Plan context: `2026-11-12-next-waves-plan.md` (Wave 8, native rule N-01/N-02).

| Field | Value |
|---|---|
| Status | Approved · 2026-11-13 (O-01 … O-06 as proposed) |
| Platforms | Dialog W · T · M (M: native iOS / Android) · Bottom sheet T · M (M: native) · Side sheet W · T · Scrim W · T · M |
| Tokens available | `color/overlay/default` (scrim, 60–70% grey) · `color/surface/raised` · `elevation/3` · `elevation/4` · `layer/drawer` 1200 · `layer/overlay` 1300 · `layer/modal` 1400 · `size/container/xs 384 · sm 480 · md 560 · lg 640 · xl 768` · `radius/xl 12 · 2xl 16` · motion `md 200 · lg 300` |

## 1. What exists

| Source | What it shows | Use |
|---|---|---|
| Legacy Mobile `Bottom Sheet` (5 types) + `Bottom Sheet CTA` + `Header` | Header slot (Cancel · Title · Reset), content slot (status list with counts, date range, calendar, member and device pickers with search), footer slot with a full-width Apply, home indicator | Anatomy and real content for the Mobile / Tablet bottom sheet; the Cancel · Title · Reset header is the iOS form |
| Legacy Web `↳ Slide Out Panel` (5 screens) | Floating right panel inset from the window edge with rounded corners: title + close, info banner, sectioned body (selectable cards), sticky footer with a full-width primary | Anatomy for the Side sheet |
| Legacy product screen `LMS _Disconnect` | Dialog ~560 wide: title + close, warning banner under the header, body text and list, typed confirmation field, footer with divider: Cancel (outlined) + destructive filled | Anatomy for Dialog, the Destructive pattern (Day 21) |
| Legacy product screen `Request Details_ Reject_ Edit Reason` | Mobile bottom panel with a message composer above the keyboard | Bottom sheet with an input (keyboard-aware) |
| iOS and iPadOS 27 kit (latest; the only iOS source) | `Alert`, `Action Sheet`, `Sheet - iPhone` (detents), `Grabber`, `Sheet - iPad` | Native iOS forms on Mobile |
| Material 3 kit | `Basic dialog`, `List dialog`, `Scrollable list dialog`, `Bottom sheet` (drag handle), `Side Sheet` (standard · modal) | Native Android forms on Mobile, structure reference |
| Input family 07 pages | Hand-made Dialog (Tablet pickers) and Bottom sheet (Tablet lists, all Mobile) frames | Replaced by instances after this wave (plan R-1) |

No legacy Dialog component exists; Dialog starts from the product screen and the kits.

## 2. Proposed components

### Scrim (shared, private `_Scrim`)
Full-bleed `color/overlay/default`; tap or click outside closes non-blocking overlays. One private component reused by all three.

### Dialog — W · T · M
```
┌───────────────────────────────────────┐
│ Title                            [✕]  │  header: title (title/md) + optional close Icon button
│ ▒ optional alert (Alert, Wave 9) ▒▒▒▒ │  banner slot
│ Body slot (text, list, form fields)   │  scrolls when taller than the window; dividers appear only while it scrolls
│ ───────────────────────────────────── │
│                 [Cancel] [Primary]    │  footer: Button group, end-aligned; stacked on narrow
└───────────────────────────────────────┘
```
- Sizes (O-01): `sm` 384 (confirmations) · `md` 560 (default, forms) · `lg` 768 (rich content) — `size/container/xs · md · xl`; max height = window − 2 × `spacing/2xl`.
- Kinds: `Basic` and `Destructive` (primary action uses the error colour; never pre-focused).
- Surface `color/surface/raised`, radius `radius/xl`, `elevation/4`, layer `modal`; enter fade + scale 0.96 → 1 (`motion/md`), exit fade (`motion/sm`).
- Tablet: same as Web, centred; pickers use it (already decided). Mobile: native forms (O-03).

### Bottom sheet — T · M
```
     ───                                     grabber (drag handle)
Cancel        Title             Reset        header: leading action · title · trailing action (iOS form)
──────────────────────────────────────────   or: title + close (Android form)
Content slot (list, filters, calendar…)
[              Apply              ]          optional sticky footer
```
- Types (O-02): `Standard` (content + optional footer) · `List` (options, used by Select / Autocomplete / Phone) · `Action` (2–6 actions with icons, e.g. File upload sources).
- Detents: `Auto` (hugs content up to 90% of the screen) · `Full` (full height for long lists / search).
- Surface `color/surface/raised`, top corners `radius/2xl`, `elevation/3`, scrim behind; enter slide-up `motion/lg`, exit `motion/md`; drag down to dismiss unless a change is pending.

### Side sheet — W · T
- Floating, inset from the window edge by `spacing/md` with `radius/xl` on all corners, like the legacy Slide Out Panel (O-04), or edge-attached like M3.
- Widths: `sm` 384 · `md` 480 (default) · `lg` 640.
- Modal (with scrim) by default; Standard (pushes content, no scrim) only on Web wide layouts.
- Header (title + close; optional back), body slot, optional sticky footer (full-width primary or Button group). Opens from the inline end (right in English, left in Arabic). Enter slide `motion/lg`.

## 3. Native forms on Mobile (N-01)

| | iOS | Android (M3) |
|---|---|---|
| Dialog | iOS Alert (title, message, stacked or side-by-side text buttons, 270 wide, blur material) — for confirmations only; forms go in a Sheet | M3 Basic dialog (title, supporting text, text buttons at end) |
| Bottom sheet | Sheet with grabber and detents; header Cancel · Title · Done; Action sheet for choices | M3 Bottom sheet with drag handle; title + content; actions in the content |
| Action list (File upload sources, Select on iOS) | Action sheet | Bottom sheet `List` / `Action` |

Biowave colours, type and icons stay; the anatomy follows the OS. iOS forms are taken only from the latest Apple kit linked in the Mobile file, **iOS and iPadOS 27** (library `lk-3167e7e1…`); older iOS kits or hand-drawn iOS parts are not used. When Apple ships a newer kit, the iOS forms are re-checked against it.

## 4. Decisions to make

| ID | Question | Proposal |
|---|---|---|
| O-01 | Dialog sizes | `sm` 384 · `md` 560 (default) · `lg` 768 |
| O-02 | Bottom sheet types | Standard · List · Action; detents Auto · Full |
| O-03 | Mobile Dialog | Native: iOS Alert / M3 Basic dialog for confirmations; anything with fields opens a full-height sheet instead of a dialog |
| O-04 | Side sheet look | Floating, inset `spacing/md`, all corners `radius/xl` (as the legacy panel) |
| O-05 | Tablet Bottom sheet header | The Android form (title + close, grabber) — Tablet stays one design (N-03) |
| O-06 | Spec versions | New components start at 1.0 with full A–D on all platforms, then Figma Web → Tablet → Mobile as in Wave 7 |

## 5. Order after approval

1. Specs (`components/dialog`, `bottom-sheet`, `side-sheet`, private `_scrim`) for each platform, `tokens.json` where a component collection is needed, contracts generated.
2. Figma Web (Dialog, Side sheet) → Tablet (all three) → Mobile (Dialog and Bottom sheet with `OS=iOS · Android`), docs 00–11, cards.
3. Replace the hand-made Dialog / Bottom sheet frames on the input family 07 pages (Tablet, Mobile) with instances (plan R-1).

## 6. Corrections while writing the specs (2026-11-13)

The Foundations guidelines already fix some values; the specs follow them instead of the brief's first guesses:

| Brief said | Spec uses | Source |
|---|---|---|
| Dialog `radius/xl` | `radius-3xl` | radius.md — dialogs and modal surfaces |
| Sheets `radius/2xl` (Bottom) · `radius/xl` (Side) | `radius-4xl` (Bottom: top corners only; Side: all corners, because it floats) | radius.md — sheets |
| Bottom sheet `elevation/3` | `elevation-4` | elevation.md — dialogs, drawers, bottom sheets |
| Dialog enter fade + scale 0.96 | fade only (`lg` in, `md` out, emphasized easings) | motion.md; a scale value would be a raw number |
| Dialog title `title/md` | Web `heading-sm` · Tablet / Mobile `heading-md`; sheet titles `title-lg` | typography.md |
| Padding | `spacing-layout-container` (24 · 24 · 16); Side sheet header `spacing-2xl` | spacing.md |
| Private `_scrim` spec folder | No separate spec: `scrim` is a part in each spec and a private `.Scrim` component in each Figma file | one fact one home |
