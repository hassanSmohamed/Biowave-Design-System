# Breadcrumbs · مسار التنقل — Web

> **One file for Breadcrumbs on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web breadcrumbs`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Breadcrumbs · مسار التنقل |
| Summary | Shows where the current page sits in the product (module › section › page) and lets the user jump back up one or more levels. |
| Summary (ar) | يوضّح مكان الصفحة الحالية في المنتج (الوحدة › القسم › الصفحة) ويتيح للمستخدم الرجوع مستوى أو أكثر بنقرة واحدة. |
| Parts | Container · item (link) · separator · overflow item · current page |
| Parts (ar) | الحاوية · العنصر (رابط) · الفاصل · عنصر المزيد · الصفحة الحالية |
| Platform | Web · React + MUI |
| Built on | Custom on MUI `Breadcrumbs` (`separator`, `maxItems` 4, `itemsBeforeCollapse` 1, `itemsAfterCollapse` 2) with Biowave Link items and a Biowave Menu for the collapsed items |
| Import | `import { Breadcrumbs } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Breadcrumbs` · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-11-13 |
| Plan | Finished |
| Code | Planned |
| Figma build | Built |
| Review | — |
| Source code | `src/components/breadcrumbs/` — not built yet (the Executor creates it) |
| Tokens | No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly |
| Contracts | [`breadcrumbs-contract.md`](breadcrumbs-contract.md) · [`figma-breadcrumbs-contract.md`](figma-breadcrumbs-contract.md) — generated, never edited |
| Docs page | [`breadcrumbs.html`](breadcrumbs.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---

## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web and Tablet except **A8** (checked by `npm run docs:check`). Mobile has no Breadcrumbs: the back button in the Top app bar does the job (NV-01).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/breadcrumbs/breadcrumbs.md#b--spec) · [Tablet](../../../4-tablet-components/components/breadcrumbs/breadcrumbs.md#b--spec) · Mobile — none (Top app bar back button) |
| Figma | `↳ Breadcrumbs` in **Biowave DS — Web Components** · **Tablet Components** |
| Version | 1.0 · 2026-11-13 |

### A1 Overview

Breadcrumbs show the path from the module to the current page — "Devices › Biometric terminals › Gate A-12" — and every step except the last is a link back up. On Web they sit in the App header's title area, so the user always knows where they are without a page title in the header. They are a secondary aid: Primary navigation is still how users move between sections.

### A2 Anatomy

```
Devices  ›  Biometric terminals  ›  [ Gate A-12 ]          up to 4 items
  ①      ②        ①              ②       ④

Devices  ›  [ … ]  ›  Terminal settings  ›  [ Network ]    5 or more: middle items collapse
  ①           ③              ①                 ④
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `item` | Yes | A link to an ancestor page (module, section, record) |
| 2 | `separator` | Yes | Chevron between items; points in the reading direction |
| 3 | `overflow` | No | "…" item that opens a Menu with the collapsed ancestors |
| 4 | `current` | Yes | The current page: last item, not a link, shown on a neutral chip |

### A3 Usage

**When to use**
- Pages two or more levels below a module (a record, its settings, a sub-page)
- On Web, always in the App header title area — the module alone is a one-item path

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Steps of a flow (first do A, then B) | Stepper |
| Switching views of the same page | Tabs |
| Mobile | Back button in the Top app bar |
| Moving between modules | Primary navigation (module switcher) |

### A4 Options

#### 4.1 Number of items
| Items | Looks like | Pick it when |
|---|---|---|
| 1–4 | all items visible | **Default.** Most pages |
| 5 or more | first item · "…" · last two items | Deep pages; the "…" Menu lists the hidden ancestors in order |

#### 4.2 `current`
Always the last item. It is never a link, and it is never left out (the header has no other page title).

**Combination rules**
- The first item is the module (the module switcher already shows it, but the link takes the user to the module's home)
- Items never wrap to a second line; they collapse instead

### A5 States and behavior

| State | Part | What the user sees |
|---|---|---|
| Default | item | Grey text, no underline |
| Hovered | item | Text turns default colour on a light hover fill |
| Pressed | item | Darker fill |
| Focused | item | Focus ring around the item |
| Current | current | Neutral chip, default text colour; not interactive |

**Behavior rules**
- An item label longer than 24 characters truncates with "…" and shows the full label in a Tooltip
- When the header is too narrow, items collapse into "…" from the middle out; the first item and the current page stay
- Arabic: the order reverses (module on the right) and the chevrons point left

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| item | The page's own name, as in the navigation: "Biometric terminals" | 24 chars |
| current | The page name, or the record's name: "Gate A-12" | 32 chars |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Devices › Biometric terminals › Gate A-12 | الأجهزة › أجهزة البصمة › البوابة A-12 | Home › Devices › Device › Details |
| Users › Arana Smith | المستخدمون › أرانا سميث | Users › User details page |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Start from the module the page belongs to | Start every path with "Home" |
| Show the current page as the last item | Make the current page a link |
| Collapse the middle of long paths | Let breadcrumbs wrap to two lines |

### A8 Platform notes — Web

| | Web |
|---|---|
| Place | App header `Title` slot (Top app bar), next to the logo block |
| Size | Items `size-control-height-sm`; mouse and keyboard |
| Narrow windows | Collapse earlier; below the Tablet breakpoint only the current page and "…" remain |

### A9 Accessibility (design)

- The current page is announced as the current page, not as a link
- The "…" item has a name ("Show path") and opens a Menu
- Separators are decoration, not read out

### A10 Related components

- [Top app bar](../top-app-bar/top-app-bar.md#a--guidelines) — Breadcrumbs fill the Web App header title
- [Primary navigation](../primary-navigation/primary-navigation.md#a--guidelines) — modules and pages
- [Link](../link/link.md#a--guidelines) — item styling and focus

---

## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### Breadcrumbs
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `items` | `{ label: string; href?: string; onClick?: () => void }[]` | ancestors, module first | — | ✓ | `item`; the last entry is the `current` page |
| `maxItems` | `number` | ≥ 3 | `4` | | More items than this collapse into `overflow` |
| `overflowLabel` | `string` | | `'Show path'` | | Accessible name of the "…" item |

**Invalid combinations** (`console.warn` in development):
| Combination | Fallback |
|---|---|
| `href` on the last item | ignored; the last item is the current page |
| `maxItems` < 3 | `3` |

### B2 Dimensions

| Part | Property | Token |
|---|---|---|
| container | gap between items and separators | `spacing-xs` |
| item · overflow · current | height · padding-inline · radius | `size-control-height-sm` · `spacing-md` · `radius-md` |
| item · current | text style | `label-md` (current: same style, default colour) |
| item | max label width | 24 characters, then "…" (A5) |
| separator | glyph · size | `chevron_right` (mirrored in RTL) · `size-icon-md` |
| overflow | glyph · size | `more_horiz` · `size-icon-md` |
| focus ring | width · offset · radius | `border-width-focus` · `border-focus-offset` · `radius-md` |

### B3 Tokens by part and state

Every value is a semantic token; there is no `breadcrumbs.tokens.json`.

| Part | Property | Default | Hovered | Pressed | Focused |
|---|---|---|---|---|---|
| item · overflow | fill | `color-background-transparent-default` | `color-background-transparent-hovered` | `color-background-transparent-pressed` | `color-background-transparent-default` |
| item · overflow | text · icon | `color-text-subtlest` | `color-text-default` | `color-text-default` | `color-text-subtlest` |
| item | focus ring | — | — | — | `color-border-focus` |
| current | fill · text | `color-background-neutral-default` · `color-text-default` | — | — | — |
| separator | icon | `color-icon-subtlest` | — | — | — |

Contrast (light): `color-text-subtlest` on `color-surface-subtle` (App header) 7.07:1 · on `color-surface-default` 7.57:1; current `color-text-default` on `color-background-neutral-default` 16.91:1. Dark theme: same tokens.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hovered / Pressed | pointer / tap | fill, text colour | `motion-duration-sm` | `motion-easing-standard` |
| Collapsed → Menu open | "…" activated | the Menu's own motion | — | — |

Reduced motion: instant.

### B5 RTL

| Part | In RTL |
|---|---|
| order | Reverses: the module is on the right, the current page on the left |
| separator | Mirrors (`chevron_right` points left) |
| overflow | `more_horiz` does not mirror |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | `<nav aria-label="Breadcrumb">` with an `<ol>`; each item an `<li>` |
| Current page | `aria-current="page"`, not a link |
| Separators | `aria-hidden="true"` |
| Overflow | Button named `overflowLabel`, opens a Menu with the hidden items in order |
| Target size | `target-min` (24) — the item height is above it |

### B7 Examples

See the docs pages 03 and 07.

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: B2–B3 tokens
- [ ] More than `maxItems` collapses into first · "…" · last two; the Menu lists the hidden items in order
- [ ] The last item is the current page and is not interactive
- [ ] RTL reverses the order and mirrors the separators
- [ ] Long labels truncate with a Tooltip
- [ ] No raw values

---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `breadcrumbs-contract.md`.

> Written by the Planner (Claude). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · 2026-11-13 |

### C1 Goal

The Web Breadcrumbs matches B1–B6 and passes B9 and C6.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- The App header (only its `title` content changes)
- Tabs, Pagination, Stepper (next in the navigation family)

### C3 Approach

- **Base:** MUI `Breadcrumbs` with `separator={<Icon name="chevron_right" mirrorInRtl />}`, `maxItems`, `itemsBeforeCollapse={1}`, `itemsAfterCollapse={2}`; replace MUI's collapse button with a Biowave "…" item that opens a Biowave Menu.
- **Items:** a styled `ButtonBase` (as a router link) with B2–B3 tokens; the last item is a `span` with `aria-current="page"`.
- **App header:** pass `<Breadcrumbs>` as `AppHeader`'s `title`.

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
3-web-components/src/components/breadcrumbs/Breadcrumbs.tsx · Breadcrumbs.test.tsx · index.ts   new
3-web-components/src/index.ts · README.md · CHANGELOG.md   change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] The current page has no tap or click handler
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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-breadcrumbs-contract.md`.

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Breadcrumbs |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Breadcrumbs` › sections `Breadcrumbs` and `Breadcrumbs — Documentation` |
| Mode | **Create new.** Foundations `Breadcrump` page (`Breadcrumb Item` Default · Current · Separator) and the legacy Web `↳ Breadcrumb` (1–6 items) are the content source; they stay untouched |
| Depends on | Icon (Material Symbols) and Tooltip in this file; Menu examples are drawn with the Doc Kit until the Menu component exists; the App header (`Top app bar`) receives a Breadcrumbs instance in its `Title` slot |
| Plan version | 1 · 2026-11-13 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `figma-read-tokens.js` lint must report 0.
- Nested parts are instances of the sets already in this file (Icon, Tooltip) — never detached, never redrawn.

### D2 Component structure

```
❖ Breadcrumbs                    ← set: Items = 2 · 3 · 4 · Collapsed × Language = EN · AR
  ├─ ❖ .Breadcrumb item           ← private set: State = Default · Hovered · Pressed · Focused · Current · Overflow (TEXT Label)
  └─ ❖ .Breadcrumb separator      ← private set: Direction = LTR · RTL
```

### D3 Layer tree and auto layout

```
Breadcrumbs                ↔ gap spacing/xs · hug · centred
├── ◇ .Breadcrumb item     ↔ height size/control/height/sm · padding-inline spacing/md · radius/md · T label/md (Default: Devices)
├── ◇ .Breadcrumb separator  chevron_right size/icon/md
├── …
└── ◇ .Breadcrumb item     State=Current (last)
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Items` | VARIANT | `2` · `3` · `4` · `Collapsed` | `3` | `items.length` / `maxItems` | Collapsed = more than `maxItems` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `.Breadcrumb item` › `Label` | TEXT | | `Devices` | `items[].label` | |
| `.Breadcrumb item` › `State` | VARIANT | `Default` · `Hovered` · `Pressed` · `Focused` · `Current` · `Overflow` | `Default` | interaction / last item | |

### D5 Variants to generate

- `Breadcrumbs`: Items × Language = **8**; `.Breadcrumb item`: **6**; `.Breadcrumb separator`: **2**

### D6 States, interactions and motion

No prototype interactions on the set. Hover, press and focus are shown on doc page 04 with B4 timings written next to them.

### D7 RTL

`Language=AR` variants: Typography mode `Web · AR`, auto layout direction from the text, layout per B5; Arabic copy from A6. Items in reverse order; `.Breadcrumb separator` `Direction=RTL` (chevron points left); `more_horiz` does not mirror.

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Breadcrumbs — Documentation`, frames `Breadcrumbs / 00 Component sheet` … `Breadcrumbs / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Breadcrumbs:
- 01: Breadcrumbs inside the App header above a page
- 03: 2 · 3 · 4 items · collapsed with the "…" Menu open
- 07: Desktop and Web narrow (collapsed)
- 05 Usage: the A7 pairs, built with live instances

Component description: "Shows where the current page sits in the product (module › section › page) and lets the user jump back up one or more levels. Spec: 3-web-components/components/breadcrumbs/breadcrumbs.md".

### D9 Code Connect

- File: `3-web-components/src/components/breadcrumbs/Breadcrumbs.figma.tsx`
- Mapping: D4. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Breadcrumbs`, private components and layer names match D2–D3 and A2
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
| Node IDs | page `651:33` · `Breadcrumbs` `651:244` (8) · `.Breadcrumb item` `651:52` (6) · `.Breadcrumb separator` `651:65` (2) · docs `652:2881` (00–09, 11) · card row `648:9907` · App header `647:485` Title slot now holds `Breadcrumbs` (Items=3) |
| QA report | Unbound fills, strokes, padding and gaps: 0 · no local styles · page Typography mode set to the platform |

**Deviations:**
- AR variants are separate layouts in reverse order (instances cannot reorder children); the separator has `Direction=RTL` (`chevron_left`)
- The "…" Menu example uses the `.Menu _en` set with two rows; the Menu component itself is unchanged

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
| 1.0 | 2026-11-13 | Initial (navigation brief, NV-01 … NV-13) | — | Planner (Claude) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-11-13 | Initial | No | — |
