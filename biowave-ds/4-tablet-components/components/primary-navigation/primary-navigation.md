# Primary navigation · التنقل الرئيسي — Tablet

> **One file for Primary navigation on Tablet:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- tablet primary-navigation`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Primary navigation · التنقل الرئيسي |
| Summary | Moves the user between the top-level sections (modules) of the product: side navigation on Web, navigation rail on Tablet, navigation bar on Mobile, and a modal drawer when there is no room. |
| Summary (ar) | ينقل المستخدم بين الأقسام الرئيسية (الوحدات) في المنتج: تنقل جانبي على الويب، وشريط تنقل جانبي على الجهاز اللوحي، وشريط تنقل سفلي على الجوال، ودرج منبثق عند ضيق المساحة. |
| Parts | Container · collapse handle · module switcher · item · icon · label · count · badge · drawer · scrim |
| Parts (ar) | الحاوية · زر الطي · مبدّل الوحدات · العنصر · الأيقونة · التسمية · العدد · الشارة · الدرج · الطبقة المعتمة |
| Platform | Tablet · Flutter + Material 3 |
| Built on | Flutter M3 `NavigationRail` (+ `NavigationDrawer` in `showModalBottomSheet`-free `Drawer` route for the modal drawer), styled from semantic tokens |
| Import | `BwNavigationRail`, `BwNavigationDrawer` from `package:biowave_tablet/biowave_tablet.dart` |
| Figma | **Biowave DS — Tablet Components** › `↳ Primary navigation` (page Typography mode `Tablet`) · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-11-13 |
| Plan | Finished |
| Code | Planned |
| Figma build | Built |
| Review | — |
| Source code | `lib/src/components/primary-navigation/` — not built yet (the Executor creates it) |
| Tokens | No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly |
| Contracts | [`primary-navigation-contract.md`](primary-navigation-contract.md) · [`figma-primary-navigation-contract.md`](figma-primary-navigation-contract.md) — generated, never edited |
| Docs page | [`primary-navigation.html`](primary-navigation.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/primary-navigation/primary-navigation.md#b--spec) · [Tablet](../../../4-tablet-components/components/primary-navigation/primary-navigation.md#b--spec) · [Mobile](../../../5-mobile-components/components/primary-navigation/primary-navigation.md#b--spec) |
| Figma | `↳ Primary navigation` in **Biowave DS — Web Components** (`Side navigation`) · **Tablet Components** (`Navigation rail`, `Navigation drawer`) · **Mobile Components** (`Navigation bar` with `OS=iOS · Android`, `Navigation drawer` Android) |
| Version | 1.0 · 2026-11-13 |
| Brief | `_workflow/tasks/2026-11-13-navigation-brief.md` (NV-01 … NV-10) |

### A1 Overview

Primary navigation is how people move between the main sections of Biowave — Dashboard, Attendance, Access control, Devices, Reports and the other modules. It is always there and always shows where the user is. One guideline, four forms that follow the screen: a **side navigation** on Web (open or collapsed to icons), a **navigation rail** on Tablet, a **navigation bar** at the bottom of Mobile (native on iOS and Android), and a **modal drawer** that holds the full list when the screen has no room for it.

### A2 Anatomy

```
Side navigation (Web)               Navigation rail (Tablet)     Navigation bar (Mobile)
┌──────────────────────┐◯①          ┌──────┐
│ ②[▣ Devices      ⇕] │            │ [≡]  │
│ ③▐⇄ All devices  12▌│            │ ▐③▌  │                     ┌─────────────────────────────┐
│   ▦ Biometric    ⑤12│            │ All  │                     │  ▐▦▌    ▤⁴    ▥    ◆    ●   │
│   ▦ Controllers   12│            │  ▦   │                     │ Home Requests Reports …     │
│   ▭ Tablets       12│            │Bio…  │                     └─────────────────────────────┘
│   🔒 Locks        12│            │  ▭   │
└──────────────────────┘            └──────┘
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `collapse-handle` | Web | Round button on the inline-end edge that collapses the side navigation to icons and opens it again |
| 2 | `module-switcher` | Web · drawer | The current module (Devices, Attendance, Access control…) with an unfold icon; opens the module Menu (locked modules show a lock) — level 1 (NV-03, NV-04) |
| 3 | `item` | Yes | One page of the current module (level 2): `icon` + `label`; the current one is selected |
| 4 | `badge` | No | Badge on an item for things to act on (rail and bar: on the icon) |
| 5 | `count` | No | Plain number at the end of a side-navigation item (how many records the page lists) |
| — | `label` | Yes | Short page name; on the collapsed side navigation it moves into a Tooltip |
| — | `drawer` · `scrim` | No | Modal form that holds the module switcher and the page list over a dimmed screen |

### A3 Usage

**When to use**
- Every product screen that belongs to the main sections shows the primary navigation in its platform form
- Between 3 and 7 top-level destinations (Mobile bar: 3–5); more go in the drawer or under "More"

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Views of the same content on one screen | Tabs |
| Steps of a flow | Stepper |
| Going back up the hierarchy | Back button in the Top app bar, or Breadcrumbs on Web |
| Actions (Add, Export) | Buttons in the page header or the Top app bar |
| Focused flows (sign-in, onboarding, a full-screen form) | Hide the primary navigation |

### A4 Options

#### 4.1 `form` (follows the platform — not a free choice)
| Value | Looks like | Platform |
|---|---|---|
| `side-navigation` | module switcher + the module's pages with labels and counts | Web, wide windows |
| `collapsed` | icons only, names in Tooltips | Web, chosen by the user (collapse button) |
| `rail` | icon over a short label, up to 7 | Tablet |
| `bar` | 3–5 icons with labels at the bottom | Mobile |
| `drawer` | the full list over a dimmed screen | Web narrow windows, Tablet "more", Android more than 5 sections |

#### 4.2 `badge` and `count` on an item
Both off by default. `badge` (Badge component) for things to act on, `count` (plain number) for how many records the page lists. Never both on one item.

#### 4.3 `module-switcher`
Shown on Web and in the drawer: the modules the user's licence includes; modules not in the licence show a lock and open an upgrade message.

**Combination rules**
- One selected item at a time
- Two levels only: module (switcher) → page (item); a third level becomes Tabs on the page (NV-03)
- The rail and the bar show the main destinations of the app, not the pages of one module
- The Mobile bar never scrolls and never shows more than 5 items

### A5 States and behavior

| State | When it happens | What the user sees |
|---|---|---|
| Default | | Icon (outlined) and label |
| Hover | Pointer over (Web) | Light fill |
| Pressed | Touch or click | Darker fill |
| Focus | Keyboard | Focus ring |
| Selected | Current page | Selected fill + heavier label + brand icon (never colour only) |
| Collapsed (Web) | Collapse button | Icons only; Tooltip names each item on hover and focus |

**Behavior rules**
- Labels are one line; long Arabic labels wrap in the side navigation and drawer, truncate with a Tooltip in the rail and the bar
- The selection follows the URL / route, also after back and refresh
- Collapsing is remembered per user

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| item label | The section name, one or two words, noun: "Attendance", "Access control" | 16 chars (bar and rail: 10) |
| module name | The module as sold: "Access control", "Attendance" | 20 chars |
| badge | Count of items to act on, 99+ above 99 | 3 chars |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Attendance | الحضور | Attendance management module |
| Requests | الطلبات | My pending requests list |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Keep the same order of sections on every platform | Reorder sections between Web and Mobile |
| Show the current page as selected with fill and a heavier label | Show selection with colour only |
| Use a badge for things the user must act on | Put a badge on every item |
| Put actions in the page header | Put "Add employee" in the navigation |

### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Forms | Navigation rail in both orientations (`layout-width-sidebar-start` = 80, NV-05); the menu button at the top opens the modal Navigation drawer with all sections, sub-pages and the footer |
| Items | 3–7 destinations, icon over a short label; selected = pill indicator behind the icon |
| Interaction | Touch, plus hardware keyboard |

### A9 Accessibility (design)

- The navigation is a landmark the user can jump to; the selected item is announced as current
- Every item has a visible label (or a Tooltip when collapsed); icons are not the only cue
- Badges have a text equivalent ("Requests, 5 new")
- Targets are at least the platform minimum; the drawer and the collapsed side navigation work with the keyboard

### A10 Related components

- [Top app bar](../top-app-bar/top-app-bar.md#a--guidelines) — title, back and actions of the current screen; opens the drawer
- [Badge](../badge/badge.md#a--guidelines) — counts on items
- [Tooltip](../tooltip/tooltip.md#a--guidelines) — names in the collapsed side navigation
- Tabs — views inside one section (navigation family, next)

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### BwNavigationRail
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `destinations` | `List<BwNavDestination>` | `label`, `icon`, `selectedIcon`, `badge` | — | ✓ | 3–7 |
| `selectedIndex` | `int` | | — | ✓ | |
| `onDestinationSelected` | `ValueChanged<int>` | | — | ✓ | |
| `onMenuPressed` | `VoidCallback?` | | — | | Shows the menu button that opens the drawer |

#### BwNavigationDrawer
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `modules` · `moduleId` · `onModuleChange` | | as Web | — | ✓ | Module switcher at the top |
| `items` | `List<BwNavDestination>` | pages of the current module | — | ✓ | |
| `selectedId` | `String` | | — | ✓ | |

**Invalid combinations** (`assert` in debug):
| Combination | Fallback |
|---|---|
| fewer than 3 or more than 7 `destinations` | assert; release renders them |

### B2 Dimensions

```
├ layout-width-sidebar-start (80 on Tablet) ┤          Drawer: width size-container-xxs · radius-4xl inline-end corners · elevation-4
┌──────────┐  fill color-surface-default · border-inline-end color-border-subtle
│   [≡]    │  menu Icon button · margin-block spacing-lg
│  ▐ ▦ ▌   │  indicator: height size-control-height-sm · padding-inline spacing-xl · radius-full · color-background-selected-default
│   Home   │  label label-md · gap spacing-xs
│    ◷     │  item gap spacing-lg
│   Time   │
└──────────┘
```

| Part | Property | Token | Flutter |
|---|---|---|---|
| container | width · fill | `layout-width-sidebar-start` · `color-surface-default` | `NavigationRail(minWidth: context.bw.layout.sidebarStart, backgroundColor: surfaceDefault)` |
| indicator | height · padding · radius · fill | `size-control-height-sm` · `spacing-xl` · `radius-full` · `color-background-selected-default` | `indicatorColor`, `indicatorShape: StadiumBorder()` |
| icon | size · colour | `size-icon-lg` · `color-icon-default`, selected `color-icon-role-brand` (filled glyph) | `selectedIcon` |
| label | style · colour | `label-md` · `color-text-subtle`, selected `color-text-role-brand` | `labelType: NavigationRailLabelType.all` |
| item | gap | `spacing-lg` between items, `spacing-xs` icon → label | |
| drawer | width · content | `size-container-xxs` · module switcher + page items as the Web side navigation | `NavigationDrawer` |

### B3 Tokens by part and state

Every value is a semantic token; there is no `primary-navigation.tokens.json`.

| Part | Property | Default | Hover | Pressed | Selected |
|---|---|---|---|---|---|
| container | fill | `color-surface-default` | — | — | — |
| item | fill | transparent | `color-background-transparent-hovered` | `color-background-transparent-pressed` | `color-background-selected-default` (hover `-hovered`, pressed `-pressed`) |
| item | icon | `color-icon-default` | — | — | `color-icon-role-brand` (rail and bar: filled glyph) |
| item | label | `color-text-subtle` | `color-text-default` | — | `color-text-role-brand` |
| count | text | `color-text-subtle` | — | — | `color-text-subtle` |
| divider · border | stroke | `color-border-subtle` | — | — | — |
| drawer | fill · scrim | `color-surface-raised` · `color-overlay-default` | — | — | — |

Focus: the item keeps the foundations focus ring (`color-border-focus`). Dark theme: same tokens.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover / Pressed | pointer / touch | item fill | `motion-duration-sm` | `motion-easing-standard` |
| Item → Selected | select | fill, icon glyph, label colour | `motion-duration-md` | `motion-easing-standard` |
| Drawer open / close | menu button / scrim, Esc, back | slide from the inline start, scrim fade | `motion-duration-lg` in · `motion-duration-md` out | `motion-easing-emphasized-decelerate` · `-accelerate` |

Reduced motion: all become `motion-duration-instant`.

### B5 RTL

| Part | In RTL |
|---|---|
| position | Side navigation, rail and drawer sit at the inline start (right); the drawer slides in from the right |
| item | Icon at the start (right), badge and chevron at the end (left) |
| icons | Directional glyphs (collapse handle, chevrons) mirror; page icons do not |
| collapse-handle | Sits on the inline-end border (the left edge of the menu in RTL) |
| bar (Mobile) | Order of destinations reverses (first destination on the right) |

### B6 Accessibility (implementation)

Design-level rules are in A9; this is how this platform meets them.

| Requirement | Implementation |
|---|---|
| Semantics | Each destination `Semantics(button: true, selected: …, label: label + badge text)`; the bar / rail is a `Semantics(container: true, explicitChildNodes: true)` |
| Target size | ≥ 48dp (`meetsGuideline`) |
| Drawer | Modal route, focus inside, back / Esc closes |
| Screen reader output | "Requests, 5 new, tab 2 of 5, selected" |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / arrows | Move between destinations |
| Enter / Space | Select |

### B7 Examples

See C3 for the structure; examples live in the docs page 03 Variations and 07 Platform.

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: every part uses the B2–B3 tokens
- [ ] Selected item: fill, filled icon and brand label; announced as current
- [ ] Badge text included in the accessible name
- [ ] RTL: the navigation sits at the inline start (right) and chevrons mirror
- [ ] Every invalid combination in B1 warns / asserts
- [ ] a11y: `meetsGuideline` tap target and contrast
- [ ] No raw values

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `primary-navigation-contract.md`.

> Written by the Planner (Claude). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · 2026-11-13 |

### C1 Goal

The Tablet forms of Primary navigation matches B1–B6 and passes B9 and C6.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Top app bar (its own spec) and the App shell layout
- Tabs, Breadcrumbs (next in the navigation family)

### C3 Approach

- **Base:** M3 `NavigationRail` themed from tokens; `BwNavigationDrawer` wraps M3 `NavigationDrawer` (module switcher header + `NavigationDrawerDestination` per page) in a modal `Drawer` route sliding from the inline start.

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
4-tablet-components/lib/src/components/primary_navigation/bw_navigation_rail.dart · bw_navigation_drawer.dart   new
4-tablet-components/test/primary_navigation_test.dart · goldens
4-tablet-components/lib/biowave_tablet.dart   change: export
4-tablet-components/README.md · CHANGELOG.md
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Selection survives a rebuild and RTL
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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-primary-navigation-contract.md`.

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Tablet set in **Biowave DS — Tablet Components**.

| Field | Value |
|---|---|
| Component | Primary navigation |
| Figma file | **Biowave DS — Tablet Components** (`_sync/figma-files.json` › `tablet`) — never the Foundations file |
| Page / section | `↳ Primary navigation` › sections `Primary navigation` and `Primary navigation — Documentation` |
| Mode | **Create new.** Legacy Web `↳ Navigation Menu` (`Nav Item`, `Modules`, module dropdown) and Mobile `↳ Navigation Bar` (`Bars Icons`) are the content source; they stay in `_Deprecation Ground` untouched; M3 `Navigation Rail` and `Navigation Drawer` as references |
| Depends on | Badge, Tooltip, Icon Button, Avatar, Divider sets in this file; `.Scrim` from the Dialog page (drawer examples) |
| Plan version | 1 · 2026-11-13 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `figma-read-tokens.js` lint must report 0.
- **Typography mode:** on page `↳ Primary navigation` set the explicit variable mode **`Tablet · EN`** of `5. Typography` (Arabic variants and examples: **`Tablet · AR`**).
- Nested parts are instances of the sets already in this file (Button, Icon Button, Divider) — never detached, never redrawn.
- The `scrim` is a private base component `.Scrim` (one per file, shared by Dialog, Bottom sheet and Side sheet): a frame filled with `color/overlay/default`, no other properties. Examples place the overlay component on top of it inside a device frame.

### D2 Component structure

```
❖ Navigation rail                ← set: Language = EN · AR
❖ Navigation drawer              ← set: Language = EN · AR
  ├─ ❖ .Rail item                 ← private: Selected = true · false
  └─ ❖ .Nav item                  ← private (as Web)
```

### D3 Layer tree and auto layout

```
Navigation rail            ↕ width layout/width/sidebar/start · height 640 sample · fill color/surface/default · stroke inline-end · padding-block spacing/lg · gap spacing/lg · centred
├── menu-button            ◇ Icon Button (menu)
└── items                  ◇ .Rail item × 5 (icon in indicator pill + label/md)
Navigation drawer          ↕ width size/container/xxs · radius/4xl inline-end · Elevation/4 · fill color/surface/raised · padding spacing/md
├── module-switcher        ◇ .Module switcher
└── items                  ◇ .Nav item × 6
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Menu button` | BOOLEAN | | `true` | `onMenuPressed` | |
| `.Rail item` › `Label` · `Icon` · `Selected` · `Badge` | | | | `destinations[]` | |

### D5 Variants to generate

- `Navigation rail`: Language = **2** · `Navigation drawer`: Language = **2**

### D6 States, interactions and motion

No prototype interactions on the set. Opening, dragging, the detents and closing are shown on doc page 04 with B4 timings written next to them.

### D7 RTL

`Language=AR` variants: Typography mode `Tablet · AR`, auto layout direction from the text, layout per B5; Arabic copy from A6. The `close` and `check` glyphs do not mirror; `arrow_back` mirrors.

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Primary navigation — Documentation`, frames `Primary navigation / 00 Component sheet` … `Primary navigation / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Primary navigation:
- 01: rail on a Tablet landscape frame
- 03: rail · rail with badge · drawer over the scrim
- 07: landscape and portrait
- 05 Usage: the A7 pairs, built with live instances

Component description: "Moves the user between the top-level sections (modules) of the product: side navigation on Web, navigation rail on Tablet, navigation bar on Mobile, and a modal drawer when there is no room. Spec: 4-tablet-components/components/primary-navigation/primary-navigation.md".

### D9 Code Connect

- File: `4-tablet-components/lib/src/components/primary_navigation/*.figma.dart`
- Mapping: D4. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Primary navigation`, private components and layer names match D2–D3 and A2
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
| Node IDs | page `188:346` · `Navigation rail` `188:968` (2) · `Navigation drawer` `188:1131` (2) · `.Rail item` `188:756` · `.Nav item` `188:785` (State × Direction) · `.Module switcher` `188:814` · docs `191:3432` · card row `192:1433` |
| QA report | Unbound fills, strokes, padding and gaps: 0 · no local styles · page modes Typography and Grid set to the platform |

**Deviations:**
- Rail destinations are the app modules (Home, Devices, Users, Attendance, Access); the drawer holds the module switcher + pages, as Web
- Drawer items are touch height (`size-control-height-lg`); private parts have `Direction` for RTL

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
