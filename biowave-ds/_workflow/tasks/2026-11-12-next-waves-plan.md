# Plan — Badge · Divider · Tooltip, then Phase 2 complex components, plus native iOS / Android on Mobile

> Agent summary: build order, reuse sources and open decisions for the next Figma waves (2026-11-12). Figma-first, Web → Tablet → Mobile, same Doc Kit and checks as the input family. Mobile adds a native layer: iOS and Android (Material 3 Expressive) forms of the platform-chrome components, built with Biowave tokens. Decisions marked **N-xx** are open until the design lead answers.

| Field | Value |
|---|---|
| Status | Draft for review · 2026-11-12 |
| Figma files | Web `7nDhsPNntzIWlrjmuSmZ9l` · Tablet `KTlAsEow60qCiYyU3J90kp` · Mobile `249tIAxlZogRvgBBXjcIZ5` · Foundations (legacy) `AyFaSmfDUlTax3GpKhRdHI` |
| Native kits (added to the Mobile file) | **iOS and iPadOS 27** (Apple, community) · **Material 3 Design Kit** (Google, community) |

## 1. Reuse sources found

Legacy sets in the Foundations file (`▼ LEGACY Web Components` and `▼ LEGACY Mobile Components` pages) and the two native kits. Legacy = reference for anatomy, real product content and options; it is rebuilt on Biowave variables, not copied as is (same rule as the input family).

| Component | Legacy Biowave (Foundations file) | iOS 27 kit | Material 3 kit | Repo |
|---|---|---|---|---|
| Badge | `Badge` (3), `Check Badge` (2), `Badge / Web` (36) | — | `Badges` | spec + code ✓, Figma contract ✓ |
| Divider | `Divider` (Action Menu page) | — | — | spec + code ✓, Figma contract ✓ |
| Tooltip | `Tooltip` (12) | — | — | spec + code ✓, Figma contract ✓ |
| Dialog | — (only screens) | `Alert` | `Basic dialog`, `List dialog`, `Scrollable list dialog` | — |
| Bottom sheet | Mobile `Bottom Sheet` (5), `Bottom Sheet CTA` (2), `Header` (2) | `Sheet - iPhone`, `Action Sheet`, `Grabber` | `Bottom sheet` | — |
| Side sheet | `↳ Slide Out Panel` page (frames only) | `Sheet - iPad` | `Side Sheet` | — |
| Alert (banner) | `Status Banners` (3), `Status Banners / Mobile` (6) | — | — | — |
| Snackbar | Mobile `Notification Bar / Mobile` (24) | — (no iOS equivalent) | `Snackbar` | — |
| Tabs | `Tabs` (2), Mobile `↳ Tabs`, `Tabs Chips` (2) | `Segmented Control` | `Tabs` (primary · secondary) | — |
| Breadcrumbs | `Breadcrumb` (6), `Breadcrumb Item` (3) | — | — | — |
| Accordion | `Accordion` (2) | — | — | — |
| Action bar | `Actions Bar` (2), `/ Directional Content` (8), `/ Web` (4) | `Toolbar - Bottom - iPhone` | `Bottom app bar` | — |
| Pagination | `Pagination` | `Page Control` (dots) | — | — |
| Stepper | — | — | — | — |
| Empty state | `TableEmpty` only | — | — | — |
| Top app bar | Web `Top Navigation Bar` · Mobile `_Top app bar` (5) | `Toolbar - Top - iPhone` (navigation bar) | `App bar` (small · medium · large) | — |
| Primary navigation | Web `Nav Item` (5) · Mobile `Navigation Bar` tabs (2) | `Tab Bar - iPhone`, `Tab Bar - iPad` | `Navigation Bar`, `Navigation Rail`, `Navigation Drawer` | — |
| Data table | Full set: `Table/EN`, `Table/AR`, `Table/Row`, `Head`, `Toolbar`, `Footer`, `Empty`, `Loading`, 8 cell types × 3 | `Row`, `Row with Swipe Actions` (list, not table) | — | decision P-02 (MUI X DataGrid) |

Takeaways: the **Data table, Badge, Tooltip, Breadcrumb, Accordion, Action bar, Banners, Snackbar and Mobile Bottom sheet** have real legacy designs to start from. **Dialog, Stepper and Empty state** start from zero (plus the kits for Dialog).

## 2. Build order

Each wave: audit (legacy + kits + repo spec) → brief and open decisions → Web build + docs 00–09, 11 → review → Tablet → Mobile (with the native layer) → review.

| Wave | Components | Why this order |
|---|---|---|
| 7 | Badge · Divider · Tooltip | Specs, code and Figma contracts already exist; small; Badge is needed by Tabs and navigation, Divider by Menu, Accordion and sheets |
| 8 | Dialog · Bottom sheet · Side sheet (+ shared Scrim) | Replaces the hand-made Dialog and Bottom sheet frames on the 07 pages of the input family (24 pages × 2 platforms) |
| 9 | Alert · Snackbar · Empty state | Feedback family; Empty state is needed by Data table |
| 10 | Tabs · Breadcrumbs · Accordion | Page structure |
| 11 | Top app bar · Primary navigation · Action bar | App chrome; most of the native iOS / Android work lands here |
| 12 | Pagination · Stepper | Pagination is needed by Data table |
| 13 | Data table | Last: uses Checkbox, Menu, Chip, Pagination, Skeleton, Empty state |

Skeleton and Card (Phase 1, still missing) are not in the requested list; Data table needs Skeleton for its loading state. Proposed: add Skeleton to Wave 9 and Card to Wave 10 (see N-06).

## 3. Native layer on Mobile (iOS and Android)

Goal: on Mobile, components that the operating system owns (navigation chrome, sheets, alerts, system controls) look and behave like iOS on iPhone and like the latest Material 3 on Android, while keeping Biowave colours, type, radius and icons. Everything else (Button, fields, chips, lists…) stays one Biowave design on both.

**Proposed rule (N-01).** A component gets a native form only when the two operating systems differ in anatomy or behaviour that users rely on. Biowave tokens still drive colour, type, icons and content; the anatomy (sizes, positions, grabber, blur, back chevron, large title, tab-bar shape) follows the OS.

| Component | iOS form | Android form (M3) | Flutter |
|---|---|---|---|
| Primary navigation | Tab bar | Navigation bar | `CupertinoTabBar` · `NavigationBar` |
| Top app bar | Navigation bar (large title, back chevron + label) | App bar (small · medium · large) | `CupertinoNavigationBar` / `CupertinoSliverNavigationBar` · `AppBar` / `SliverAppBar` |
| Dialog | Alert (stacked or side-by-side actions) | Basic dialog | `CupertinoAlertDialog` · `AlertDialog` (`AlertDialog.adaptive`) |
| Bottom sheet | Sheet (grabber, detents) + Action sheet for choices | Bottom sheet (drag handle) | `showCupertinoModalPopup` / `CupertinoActionSheet` · `showModalBottomSheet` |
| Tabs (in page) | Segmented control | Tabs | `CupertinoSlidingSegmentedControl` · `TabBar` |
| Snackbar | Biowave toast at the top or bottom (iOS has no snackbar) | Snackbar | custom · `SnackBar` |
| Action bar | Bottom toolbar | Bottom app bar | `CupertinoToolbar` (custom) · `BottomAppBar` |
| Switch (already built) | iOS switch | M3 switch | `Switch.adaptive` |
| Progress spinner (already built) | iOS spinner | M3 circular | `CircularProgressIndicator.adaptive` |
| Date / Time picker (already built) | Wheel / compact picker in a sheet | M3 picker in a bottom sheet | `CupertinoDatePicker` · `showDatePicker` |
| Select on iOS (already built) | Pull-down menu or action sheet | Bottom sheet list | `CupertinoActionSheet` / `MenuAnchor` |

**Figma structure (N-02).** Proposed: one set per component with an `OS=iOS · Android` property on Mobile only (Web and Tablet sets have no such property), e.g. `.Navigation bar _en` → `OS=iOS, …`. Native anatomy is rebuilt with Biowave variables and uses the kits as measured references; the kits' own instances are used only for system chrome that we never restyle (status bar, home indicator, keyboard) inside doc frames.

**Docs.** Page 07 Platform on Mobile shows both OSs side by side (Phone frame for iPhone and for Android). Part B of each Mobile spec gets an "iOS / Android" table.

## 4. Changes to work already done

| # | Change | Where |
|---|---|---|
| R-1 | Swap the hand-made Dialog / Bottom sheet frames on 07 pages for the new components (Wave 8) | Tablet and Mobile, 24 pages each |
| R-2 | Tablet 07 pages: check the field width render issue found on Mobile (fill inside the device slot) and fix the same way | Tablet |
| R-3 | Native forms for already-built Mobile components: Switch, Progress spinner, Date / Time / Date range pickers, Select (and Segmented button vs iOS segmented control) — after N-01 / N-02 | Mobile |
| R-4 | `Button Group` page empty on Mobile — paste from Web | Mobile |
| R-5 | Legacy sets used as references move to `_Deprecation Ground` after each wave is approved (D-12 rule) | Foundations |
| R-6 | Repo: a foundation decision for the native layer (D-19) and a Mobile spec template section for iOS / Android; README Mobile line "Flutter + Material 3" updated | repo |
| R-7 | List item / State and Text field / State collections still hold a `hovered` mode with no variant using it on Tablet and Mobile — keep (code may use it for pointer) or remove | Tablet, Mobile |

## 5. Open decisions

| ID | Question | Proposal |
|---|---|---|
| N-01 | Which Mobile components get iOS / Android forms | Only the ones in §3 (OS-owned chrome, sheets, alerts, system controls) |
| N-02 | How the OS appears in Figma | `OS=iOS · Android` property on Mobile sets |
| N-03 | Native forms on Tablet too (iPadOS / Android tablet)? | Not now; Tablet stays one Biowave design; revisit with the iPad kit later |
| N-04 | Android target | Material 3 Expressive (the kit's 2025–26 components) |
| N-05 | iOS look | iOS 27 anatomy (Liquid Glass materials) with Biowave colours; blur only where iOS uses it (tab bar, navigation bar, sheets) |
| N-06 | Add Skeleton and Card (Phase 1 gaps) to Waves 9 and 10 | Yes |
| N-07 | Code: Flutter Cupertino widgets for iOS forms | Yes, through `.adaptive` constructors where Flutter has them, own widgets otherwise |
