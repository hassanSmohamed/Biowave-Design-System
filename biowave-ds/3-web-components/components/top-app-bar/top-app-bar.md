# Top app bar · شريط التطبيق العلوي — Web

> **One file for Top app bar on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web top-app-bar`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Top app bar · شريط التطبيق العلوي |
| Summary | The bar at the top of every screen: on Web the app header (search, notifications, profile); on Tablet and Mobile the screen title with back and screen actions. |
| Summary (ar) | الشريط أعلى كل شاشة: على الويب رأس التطبيق (البحث والإشعارات والملف الشخصي)، وعلى الجهاز اللوحي والجوال عنوان الشاشة مع الرجوع وإجراءات الشاشة. |
| Parts | Container · leading button · title · subtitle · search · actions · notifications · profile |
| Parts (ar) | الحاوية · الزر البادئ · العنوان · العنوان الفرعي · البحث · الإجراءات · الإشعارات · الملف الشخصي |
| Platform | Web · React + MUI |
| Built on | Custom on MUI `AppBar` + `Toolbar` (position static inside the App shell), Biowave Search field, Icon button, Badge, Avatar, Menu |
| Import | `import { AppHeader } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Top app bar` · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-11-13 |
| Plan | Finished |
| Code | Planned |
| Figma build | Built |
| Review | — |
| Source code | `src/components/top-app-bar/` — not built yet (the Executor creates it) |
| Tokens | No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly |
| Contracts | [`top-app-bar-contract.md`](top-app-bar-contract.md) · [`figma-top-app-bar-contract.md`](figma-top-app-bar-contract.md) — generated, never edited |
| Docs page | [`top-app-bar.html`](top-app-bar.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/top-app-bar/top-app-bar.md#b--spec) · [Tablet](../../../4-tablet-components/components/top-app-bar/top-app-bar.md#b--spec) · [Mobile](../../../5-mobile-components/components/top-app-bar/top-app-bar.md#b--spec) |
| Figma | `↳ Top app bar` in **Biowave DS — Web Components** (`App header`) · **Tablet Components** · **Mobile Components** (`OS=iOS · Android`) |
| Version | 1.0 · 2026-11-13 |

### A1 Overview

The top app bar sits at the top of every screen. On Web it is the **app header**: where the user is, global search, notifications and the profile menu. On Tablet and Mobile it names the current **screen**, offers back (or the menu that opens the navigation drawer) and up to two screen actions. On Mobile it is the native bar of each OS.

### A2 Anatomy

```
Web — App header
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ ⓪BioWave    ②Dashboard › Devices › [All devices]        ④(+) ⑤(✉⁵)(🔔⁹⁹⁺)  ⑥(AS) Arana S. ⌄ │
└──────────────────────────────────────────────────────────────────────────────────────────┘
Tablet / Mobile — Small and Large
┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
│ ①[←]   ②Shift details      ④[✎] [⋮] │     │ ①[←]                     ④[✎] [⋮] │
└──────────────────────────────────────┘     │ ②Shift details                       │
                                             └──────────────────────────────────────┘
```

| # | Part | Required | Role |
|---|---|---|---|
| 0 | `logo` | Web | Product logo, in a block as wide as the side navigation so both line up |
| 1 | `leading-button` | No | Back on inner screens; menu (opens the drawer) on top-level screens without a side navigation |
| 2 | `title` | Yes | The screen name; on Web the Breadcrumbs (module › section › current page) |
| 3 | `search` | No | Global search (Web, optional — off in the current product) |
| 4 | `actions` | No | Up to two screen actions as Icon buttons, the rest in an overflow Menu; on Web the global quick-add (+) |
| 5 | `notifications` | No | Inbox and notifications Icon buttons with Badges (Web) |
| 6 | `profile` | No | Avatar and name that open the account Menu (Web) |

### A3 Usage

**When to use**
- Every screen has one top app bar
- Tablet and Mobile: Small on most screens; Large title on top-level screens and long lists

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| More than two screen actions | Overflow Menu in the bar, or actions in the page |
| Moving between sections | Primary navigation |
| Filters and views of the content | Tabs or Chips under the bar |

### A4 Options

#### 4.1 `size` (Tablet and Mobile)
| Value | Looks like | Pick it when |
|---|---|---|
| `small` | title in the bar | **Default.** Detail and form screens |
| `large` | title below the bar, bigger | Top-level screens and long lists; it shrinks to small when the content scrolls |

#### 4.2 `leading-button`
| Value | Pick it when |
|---|---|
| `back` | Inner screens (one level down) |
| `menu` | Top-level screens on Tablet portrait or Android, to open the drawer |
| none | Top-level screens with a rail, side navigation or bottom bar |

#### 4.3 `actions`
0–2 Icon buttons with Tooltips; a third and more go in the overflow (⋮) Menu.

**Combination rules**
- Back and menu are never shown together
- The Web app header has no back button (Breadcrumbs and the browser handle it)

### A5 States and behavior

| State | When it happens | What the user sees |
|---|---|---|
| Default | | Bar on the page colour, no shadow |
| Scrolled | Content scrolled under the bar | Bottom border appears (Web, Android) / material blur (iOS); Large shrinks to Small |
| Search focused (Web) | Click or "/" | Search field focused |

**Behavior rules**
- Titles are one line and truncate with "…"; the full title is the page heading
- Arabic: the bar mirrors; back points right

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| title | The screen name, not the app name: "Shift details" | 32 chars |
| action Tooltip | Verb: "Edit shift" | 3 words |
| search placeholder | What can be searched: "Search employees, devices…" | 40 chars |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Shift details | تفاصيل الوردية | Biowave |
| Requests | الطلبات | Requests page |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Name the current screen in the title | Put the product name in every title |
| Keep at most two actions visible | Fill the bar with icons |
| Use Large title for top-level lists | Use Large title on a form |

### A8 Platform notes — Web

| | Web |
|---|---|
| Form | App header, height `layout-height-app-bar`, above the main content and beside the side navigation |
| Content | Logo block (`layout-width-sidebar-start`), Breadcrumbs, quick-add (+), inbox and notifications with Badges, profile menu; search optional |
| Narrow windows | Menu button opens the navigation drawer; search collapses to an Icon button |

### A9 Accessibility (design)

- The title is the screen's name for assistive technology
- Back, menu and every icon action have names (Tooltips)
- Search can be reached with the keyboard ("/" on Web)

### A10 Related components

- [Primary navigation](../primary-navigation/primary-navigation.md#a--guidelines) — sections; the bar's menu opens its drawer
- [Icon button](../icon-button/icon-button.md#a--guidelines) — leading and actions
- [Badge](../badge/badge.md#a--guidelines) — notification counts
- Breadcrumbs — the Web title area (next in the navigation family)

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### AppHeader
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `title` | `ReactNode` | text now, Breadcrumbs later | — | ✓ | `title` |
| `logo` | `ReactNode` | | Biowave logo | | `logo` |
| `search` | `ReactNode` | a Biowave `SearchField` | — | | optional |
| `onQuickAdd` | `() => void` | | — | | (+) Icon button |
| `inbox` · `notifications` | `{ count: number; onClick }` | | — | | Icon buttons with Badges (`max` 99 → "99+") |
| `user` | `{ name: string; avatar?: string; menu: ReactNode }` | | — | | `profile` |
| `onMenuClick` | `() => void` | | — | | Shows the menu button (narrow windows) |

**Invalid combinations** (`console.warn` in development):
| Combination | Fallback |
|---|---|
| `onMenuClick` on wide windows | the App shell hides the menu button |

### B2 Dimensions

| Part | Property | Token |
|---|---|---|
| container | height · fill · padding-inline-end · gap | `layout-height-app-bar` · `color-surface-subtle` · `spacing-xl` · `spacing-xl` |
| container | border-bottom | `border-width-default` `color-border-subtle` (always on Web) |
| logo block | width · padding-inline | `layout-width-sidebar-start` · `spacing-xl` (lines up with the side navigation) |
| title | | Breadcrumbs (slot); until built, `label-lg` text |
| actions | gap | `spacing-lg` inside the group; `spacing-3xl` between the group and the profile |
| quick-add · inbox · notifications | | Icon button `md`; Badge `Count` on inbox and notifications (99+) |
| profile | | Avatar `md` + name `label-lg` + `expand_more` `size-icon-lg` · gap `spacing-lg` |

### B3 Tokens by part and state

Every value is a semantic token; there is no `top-app-bar.tokens.json`. Nested Icon button, Badge, Avatar and Search field carry their own.

| Part | Property | Default | Scrolled |
|---|---|---|---|
| container | fill | `color-surface-default` | same |
| container | border-bottom | `color-border-subtle` | `color-border-subtle` |
| title | colour | `color-text-default` | — |

Dark theme: same tokens.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Scrolled | content scrolls under the bar | border / material; large title shrinks into the bar | `motion-duration-md` | `motion-easing-standard` |

Reduced motion: instant.

### B5 RTL

| Part | In RTL |
|---|---|
| layout | Mirrors: leading button and title on the right, actions on the left |
| back icon | Mirrors (`arrow_back` / `chevron_left` point right) |
| other icons | Do not mirror |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | `<header>` (banner landmark); search `role="search"`; `/` focuses search |
| Names | Every Icon button has a Tooltip / label |
| Notifications | "Notifications, 5 new" |
| Target size | ≥ platform minimum |

### B7 Examples

See the docs pages 03 and 07.

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: B2–B3 tokens
- [ ] Scrolled state shows the border (and Large collapses to Small)
- [ ] RTL mirrors the layout and the back icon
- [ ] Every icon has an accessible name
- [ ] No raw values

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `top-app-bar-contract.md`.

> Written by the Planner (Claude). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · 2026-11-13 |

### C1 Goal

The Web Top app bar matches B1–B6 and passes B9 and C6.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Breadcrumbs (next), Tabs under the bar
- The App shell layout

### C3 Approach

- **Base:** MUI `AppBar position="static" elevation={0}` + `Toolbar`, Biowave Search field, Icon buttons, Badge, Avatar + Menu.
- **Shortcut:** `/` focuses the search unless focus is in a field.

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
3-web-components/src/components/top-app-bar/AppHeader.tsx · AppHeader.test.tsx · index.ts   new
3-web-components/src/index.ts · README.md · CHANGELOG.md   change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Overflow Menu receives the third and later actions
- [ ] Earlier tests still pass

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6 (focus in, trap, return; dismiss rules)
- [ ] AC-5 Tests in B9 and C6 exist and pass; `npm run test:web`, `npm run typecheck`, `npm run docs:check` pass
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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-top-app-bar-contract.md`.

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Top app bar |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Top app bar` › sections `Top app bar` and `Top app bar — Documentation` |
| Mode | **Create new.** Legacy Web `↳ Top Navigation Bar` and Mobile `↳ Top App Bar` (`_Top app bar` 5 types) are the content source |
| Depends on | Icon Button, Badge, Avatar, Search field sets in this file |
| Plan version | 1 · 2026-11-13 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `figma-read-tokens.js` lint must report 0.
- Nested parts are instances of the sets already in this file (Button, Icon Button, Divider) — never detached, never redrawn.
- The `scrim` is a private base component `.Scrim` (one per file, shared by Dialog, Bottom sheet and Side sheet): a frame filled with `color/overlay/default`, no other properties. Examples place the overlay component on top of it inside a device frame.

### D2 Component structure

```
❖ App header                     ← set: Language = EN · AR
```

### D3 Layer tree and auto layout

```
App header                 ↔ width 1440 sample · height layout/height/app-bar · padding-inline-end spacing/xl · gap spacing/xl · fill color/surface/subtle · stroke bottom color/border/subtle
├── logo-block             ↔ width layout/width/sidebar/start · padding-inline spacing/xl · BioWave logo
├── title                  ▢ SLOT `Title` (default T label/lg) — Breadcrumbs go here
├── spacer
├── actions                ↔ gap spacing/lg · ◇ Icon Button add · ◇ Icon Button mail + Badge · ◇ Icon Button notifications + Badge
└── profile                ↔ gap spacing/lg · ◇ Avatar md + T label/lg + expand_more
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | |
| `Title` | SLOT | text or Breadcrumbs | | `title` | |
| `Quick add` · `Inbox` · `Notifications` | BOOLEAN | | `true` | `onQuickAdd` · `inbox` · `notifications` | |

### D5 Variants to generate

- Language = **2**

### D6 States, interactions and motion

No prototype interactions on the set. Opening, dragging, the detents and closing are shown on doc page 04 with B4 timings written next to them.

### D7 RTL

`Language=AR` variants: Typography mode `Web · AR`, auto layout direction from the text, layout per B5; Arabic copy from A6. The `close` and `check` glyphs do not mirror; `arrow_back` mirrors.

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Top app bar — Documentation`, frames `Top app bar / 00 Component sheet` … `Top app bar / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Top app bar:
- 01: app header above a page, with the side navigation
- 03: full header · without quick-add · narrow (menu button opens the drawer)
- 07: Desktop and Web narrow
- 05 Usage: the A7 pairs, built with live instances

Component description: "The bar at the top of every screen: on Web the app header (search, notifications, profile); on Tablet and Mobile the screen title with back and screen actions. Spec: 3-web-components/components/top-app-bar/top-app-bar.md".

### D9 Code Connect

- File: `3-web-components/src/components/top-app-bar/AppHeader.figma.tsx`
- Mapping: D4. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Top app bar`, private components and layer names match D2–D3 and A2
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
| Node IDs | page `646:287` · `App header` `647:485` (2) · docs `648:6775` (00–09, 11) · card row `648:9907` |
| QA report | Unbound fills, strokes, padding and gaps: 0 · no local styles · measurements match the product elements (Foundations › Sidebar, Navbar) |

**Deviations:**
- `Logo` and `Title` are SLOT properties: Foundations has no published Logo component yet (logos.md: assets pending), and Breadcrumbs is the next component — both drop into the slots
- Search is not in the set (off in the product); the spec keeps it optional

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
