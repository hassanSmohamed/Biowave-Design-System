# Navigation family brief — every navigation component, all platforms

> Agent summary: the design lead asked (2026-11-13) for all navigation components next, without leaving any type out. This brief lists every navigation type, where it lives on Web, Tablet and Mobile, what we reuse (legacy Foundations sets, iOS and iPadOS 27 kit, Material 3 kit, components already built), and the open decisions **NV-01 … NV-10**. Nothing is built until they are answered. It replaces waves 10–12 of `2026-11-12-next-waves-plan.md` for the navigation parts (Tabs, Breadcrumbs, Top app bar, Primary navigation, Pagination, Stepper).

| Field | Value |
|---|---|
| Status | Approved · 2026-11-13 (NV-01 … NV-10 as proposed; Mobile Wave 8 first, then R-1, then navigation) |
| Native rule | N-01 / N-02: OS-owned chrome gets `OS=iOS · Android` on Mobile; iOS from the iOS and iPadOS 27 kit only; Android from Material 3 (Expressive) |
| Wave 8 | Web and Tablet done; Mobile (native Dialog, Bottom sheet) paused — see NV-10 |

## 1. Catalogue — every navigation type

Three levels: **app** (where am I in the product), **page** (where am I inside this screen or flow), **link-level** (already built).

| # | Component | What it does | Web | Tablet | Mobile | Native on Mobile (N-01) |
|---|---|---|---|---|---|---|
| 1 | **Primary navigation** — one guideline, four forms | Moves between the top-level sections (modules) | **Side navigation** (expanded · collapsed) | **Navigation rail** | **Navigation bar** (bottom) | iOS Tab bar · M3 Navigation bar |
| 2 | **Navigation drawer** (modal) | Holds the full section list when there is no room for the side navigation or rail; also "More" sections | Narrow windows | Portrait / more than 7 sections | Android only (M3 modal drawer) for more than 5 sections | M3 only; iOS uses a "More" tab instead |
| 3 | **Top app bar** | Title of the current screen, back, screen actions; on Web the app header (logo, search, notifications, profile) | App header | Small · large title | Small · large title | iOS Navigation bar (large title, back chevron + label) · M3 App bar (small · medium · large) |
| 4 | **Tabs** | Switch between views of the same content on one screen | Primary (underline) · secondary | Same | Same | iOS: Segmented control for 2–4 views · M3 Tabs (fixed · scrollable) |
| 5 | **Breadcrumbs** | Path from the module to the current page; jump back up | ● | ● | — (back button in the top app bar) | — |
| 6 | **Pagination** | Move through pages of a long list or table | Numbered + rows per page (table) | Numbered (compact) | — ("Load more" / endless list) | — |
| 7 | **Page control** (dots) | Position in a short carousel or onboarding | ● | ● | ● | iOS Page control · M3 has none (Biowave dots) |
| 8 | **Stepper** | Progress through a multi-step flow (request, onboarding, setup) | Horizontal · vertical | Horizontal · vertical | Compact ("Step 2 of 4" + progress) · vertical | — (M3 has none; iOS has none) |
| 9 | **Back button** | Part of the Top app bar on Tablet and Mobile; standalone "Back to …" link on Web | Link (built) | In top app bar | In top app bar (iOS chevron + label · Android arrow) | yes, through Top app bar |
| — | Already built, not redone | Link, Menu, Segmented button, Search field, Icon button, List item, Side sheet, Bottom sheet | | | | |

**Not in this family** (and why): Action bar / bottom toolbar (actions, not navigation — stays in the chrome wave), skip link (an a11y rule inside the Web app shell, not a component), table of contents / anchor nav (no product screen needs it yet).

## 2. What exists to reuse

| Source | What it has | Used for |
|---|---|---|
| Legacy Web `↳ Navigation Menu` | `Nav Item` (Selected · Unselected · Module dropdown; Type Default · Tab · Sub-tab; left / right icons, expand / collapse), `Modules` (11 product modules: Access Control, Attendance, Dashboard, Deposit Box, Device, Integrations …), `Row Icon` (lock) | Side navigation items, the real module list, two-level structure |
| Legacy Web `↳ Top Navigation Bar`, `↳ Breadcrumb` | `Breadcrumb` (1–6 items), `Breadcrumb Item` (Default · Current · Separator) | App header, Breadcrumbs |
| Legacy `↳ Tabs` (Web and Mobile) | `Tab` (On · Off), `Tabs` (2 · 3), `Tabs Chips` | Tabs anatomy |
| Legacy `↳ Pagination` | Page frames only | Pagination layout |
| Legacy Mobile `↳ Top App Bar` | `_Top app bar` (CTA · Default · Pages · Progress · Home) | Mobile top app bar content, the Progress form → Stepper compact |
| Legacy Mobile `↳ Navigation Bar` | `Bars Icons` (Position · Profile · Reports · Request · Dashboard), `Tab` (Active) | Mobile navigation bar destinations |
| iOS and iPadOS 27 kit | Tab Bar - iPhone / iPad, Toolbar - Top (navigation bar), Segmented Control, Page Control | iOS forms |
| Material 3 kit | Navigation Bar, Navigation Rail, Navigation Drawer, App bar, Tabs | Android forms, Tablet rail structure |
| Built components | Badge (counts on nav items), Tooltip (collapsed nav), Icon button, Avatar, Menu, Search field, Divider, List item, Progress | Nested parts |

## 3. Proposed shape (short)

- **Side navigation (Web):** expanded (`size-container-…` width from the grid, logo + module switcher at the top, items with icon + label + optional Badge, one level of sub-items that expand in place, profile at the bottom) and collapsed (icons only, Tooltip names each item). Below the Desktop breakpoint it becomes a Navigation drawer.
- **Navigation rail (Tablet):** icon + short label per destination, up to 7, optional menu button that opens the drawer; FAB slot not used.
- **Navigation bar (Mobile):** 3–5 destinations, icon + label, Badge; iOS = floating Tab bar (iOS 27 material), Android = M3 Navigation bar with the active indicator pill.
- **Top app bar:** Web app header (logo, global search, notifications with Badge, avatar menu); Tablet/Mobile small and large-title forms with back, title, up to 2 actions + overflow Menu; native forms on Mobile.
- **Tabs:** underline primary tabs (icon optional, Badge optional), secondary text tabs, scrollable when they do not fit; Mobile iOS uses the segmented control look for 2–4 views.
- **Breadcrumbs:** Link items with chevron separators that mirror in RTL; after 4 items the middle ones collapse into an overflow Menu; last item is the current page (not a link).
- **Pagination:** previous · numbers with ellipsis · next; table form adds "Rows per page" (Select) and "1–20 of 240"; compact form (previous · "Page 2 of 12" · next) for Tablet portrait.
- **Page control:** dots, current dot elongated; tap a dot to jump.
- **Stepper:** steps with number / check / error icon, label and optional description; horizontal and vertical; Mobile compact = "Step 2 of 4" + linear Progress.

## 4. Decisions to make

| ID | Question | Proposal |
|---|---|---|
| NV-01 | Scope | All 9 types in §1 (Primary navigation in 4 forms + Drawer, Top app bar, Tabs, Breadcrumbs, Pagination, Page control, Stepper, Back button inside Top app bar) |
| NV-02 | Order | Primary navigation + Drawer → Top app bar → Tabs → Breadcrumbs → Pagination + Page control → Stepper; each Web → Tablet → Mobile; stop for review after Primary navigation + Top app bar, then after the rest |
| NV-03 | Web side navigation levels | Two levels (module → page); a third level becomes Tabs on the page. Collapsed form shows icons with Tooltips |
| NV-04 | Module switcher | Keep the legacy "Module dropdown" at the top of the side navigation (switch between product modules), shown as a Menu |
| NV-05 | Tablet primary navigation | Navigation rail in both orientations; more than 7 sections → menu button opens the Navigation drawer |
| NV-06 | Mobile primary navigation | Navigation bar with 3–5 destinations; more → a "More" destination (iOS) or the M3 drawer (Android) |
| NV-07 | Mobile tabs on iOS | Segmented control look for 2–4 views; more than 4 → scrollable tabs on both OSs |
| NV-08 | Pagination on Mobile | None: lists load more as you scroll, with a "Load more" button fallback; Page control (dots) only for carousels and onboarding |
| NV-09 | Stepper on Mobile | Compact form ("Step 2 of 4" + Progress) in the top app bar area, like the legacy `Progress` top app bar; vertical form for review screens |
| NV-10 | Wave 8 Mobile (native Dialog, Bottom sheet) | Do it together with the Mobile navigation build (same native kits and session), before Wave 9 |

## 5. Review of the Web elements in use (2026-11-13)

The design lead pointed to the four Web elements the product uses (Foundations file): `Navbar` (`5412:4323`), `Breadcrump` (`3266:158`), `Side Menu` (`3730:899`) and the `Sidebar` section with real screens (`5412:1424`). The new components are rebuilt from them.

**Standard sizes — confirmed, all match tokens**

| Element | Measured | Token |
|---|---|---|
| App header height | 72 | `layout-height-app-bar` (Web) |
| Side menu open · collapsed | 248 · 96 | `layout-width-sidebar-start` · `layout-width-sidebar-start-collapsed` |
| Logo block in the header | 247 (≈ 248) | `layout-width-sidebar-start` — should be exactly 248 so it lines up with the menu |
| Nav item | 40 high · padding 16 · gap 8 · radius 8 · icon 16 | `size-control-height-md` · `spacing-xl` · `spacing-md` · `radius-md` · `size-icon-sm` |
| List | padding-inline 16 · gap 8 | `spacing-xl` · `spacing-md` |
| Module switcher | 48 high · padding 12 / 16 · radius 8 · area padding 24 / 8 | `size-control-height-lg` · `spacing-lg` / `spacing-xl` · `radius-md` · `spacing-3xl` / `spacing-md` |
| Module menu (Actions Menu) | 330 wide · padding 8 · rows 56 · radius 8 | Menu · `size-control-height-xl` |
| Collapse handle | 24 round | `size-icon-lg` · `radius-full` |
| Header icon buttons · avatar | 40 | `size-control-height-md` |

**Problems found**

| # | Problem | Where | Fix in the new components |
|---|---|---|---|
| 1 | Built as plain frames, not components; many raw hex fills and unstyled text (`#f6f7f8`, `#fafafa`, `#414346`, text "raw") | Side Menu, Navbar | New sets bound to Foundations variables and text styles |
| 2 | Collapsed Menu keeps the full-width children hidden inside (module switcher 247 wide, labels 160 wide in a 48 item) | `Collapsed Menu` | `Form=Collapsed` variants with icon-only layout |
| 3 | Badge counts written "+99" | Navbar inbox / notifications | Badge component shows "99+" (Badge spec, max + "+") |
| 4 | Hidden search field uses **Montserrat** (not a Biowave font) and placeholder "Modules" | Navbar `Field` | Search is optional in the App header and uses the Search field component |
| 5 | Side menu background is grey; colors.md lists Side navigation under `color-surface-default` (white) | Side Menu vs foundations | Kept the product look: `color-surface-subtle`; **decision NV-11 below** |
| 6 | Selected page uses a neutral grey fill; foundations say `color-background-selected-default` (light navy) + a non-colour cue | Side Menu | Uses `background-selected-default` + heavier label (`label-lg`) + brand icon; **NV-12** |
| 7 | Logo block 247 wide, side menu 248 — 1 px off | Navbar | Logo block bound to `layout-width-sidebar-start` |
| 8 | Frame name typo "Breadcrump" | Breadcrumb page | Component named Breadcrumbs (next phase) |
| 9 | Every nav item shows a count "12" as plain text | Side Menu | `count` is optional per item (`Show count`), off by default |

**Decisions (approved by the design lead 2026-11-13)**

| ID | Question | Proposal |
|---|---|---|
| NV-11 | Side menu and header background | Keep the product's grey (`color-surface-subtle`) and update colors.md to say so |
| NV-12 | Selected page fill | Follow the foundations: light navy `color-background-selected-default` with heavier label (the product's grey selection is the only place selection is neutral) |
| NV-13 | Navigation levels on Web | As the product: level 1 = module switcher, level 2 = the module's pages; no expandable sub-items |
