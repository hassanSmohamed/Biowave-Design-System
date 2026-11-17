# Card · بطاقة — Web

> **One file for Card on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web card`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Card · بطاقة |
| Summary | Foundational surface container grouping related information, media, and actions. |
| Summary (ar) | حاوية أساسية تجمع المعلومات والوسائط والإجراءات المترابطة داخل بطاقة مستقلة. |
| Parts | Container · header · title · subtitle · leading-media · trailing-action · body · footer |
| Parts (ar) | الحاوية · الترويسة · العنوان · العنوان الفرعي · الوسائط البادئة · الإجراء التابع · المحتوى · التذييل |
| Platform | Web · React + MUI |
| Built on | MUI `Card` + `CardHeader` + `CardContent` + `CardActions` styled from semantic tokens |
| Import | `import { Card, CardHeader, CardContent, CardActions } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Card` · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-11-15 |
| Plan | Finished |
| Code | Planned |
| Figma build | Built |
| Review | — |
| Source code | `src/components/card/` — not built yet (the Executor creates it) |
| Tokens | No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly |
| Contracts | [`card-contract.md`](card-contract.md) · [`figma-card-contract.md`](figma-card-contract.md) — generated, never edited |
| Docs page | [`card.html`](card.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---
## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/card/card.md#b--spec) · [Tablet](../../../4-tablet-components/components/card/card.md#b--spec) · [Mobile](../../../5-mobile-components/components/card/card.md#b--spec) |
| Figma | `↳ Card` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** |
| Version | 1.0 · 2026-11-15 |

### A1 Overview

A card is a flexible surface container used to group related information, media, and interactive controls into a single entry point. Cards establish clear visual hierarchy across dashboards, grid views, and mobile feeds, supporting three visual variants: `Outlined`, `Elevated`, and `Filled`.

### A2 Anatomy

```
┌──────────────────────────────────────────────────────────┐
│ [Avatar] ①  Employee card                     [Badge] ②  │ Header slot
│             Software Engineering                         │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [ Cover Image / Illustration ] ③                        │ Media slot
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ④ Body content slot: descriptions, metadata pairs,      │ Body slot
│     metrics, key-value attributes.                       │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  [ Secondary button ]              [ Primary button ] ⑤  │ Footer actions
└──────────────────────────────────────────────────────────┘
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `header` | No | Optional leading avatar/icon, title, and subtitle row |
| 2 | `badge / action` | No | Optional trailing status badge or contextual icon button |
| 3 | `media` | No | Optional cover image, map preview, or chart container |
| 4 | `body` | Yes | Flexible container hosting primary content, text, or data fields |
| 5 | `footer` | No | Optional action button bar anchored at the bottom |

### A3 Usage

**When to use**
- Grouping content of varying types (photo, title, bio, actions) into a distinct card
- Dashboards with modular analytical widgets or KPI summaries
- Product or service grids where items are compared or selected

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Simple homogeneous list of text rows | List / Data table |
| Collapsible disclosure panel | Accordion |
| Temporary modal notification | Dialog |
| Inline callout status message | Alert |

### A4 Options

#### 4.1 `variant`
| Value | Looks like | Pick it when |
|---|---|---|
| `outlined` | Crisp 1 px border, flat surface fill | **Default.** Standard dashboard and form layouts with clear boundaries |
| `elevated` | Drop shadow (`elevation-1`), clean borderless surface | Emphasizing cards over neutral background surfaces |
| `filled` | Subtle surface fill (`color-surface-subtle`), no border/shadow | Nested cards inside an already outlined or elevated container |

#### 4.2 `selected`
| Value | Looks like | Pick it when |
|---|---|---|
| `false` | Standard variant border and fill | **Default.** Non-selected state |
| `true` | Highlighted with `color-border-brand` (2 px) | Card represents a selected option in a picker or multi-select grid |

### A5 States and behavior

| State | What the user sees |
|---|---|
| Default | Base surface fill, variant border or elevation |
| Hovered | When `interactive = true`, gains subtle border highlight or elevated shadow lift (`elevation-2`) |
| Pressed | Surface gains subtle pressed tint |
| Focused | Visible focus ring surrounding the entire card container |
| Selected | Highlighted border (`color-border-brand`) |
| Disabled | Lower opacity, interactive clicks disabled |

**Behavior rules**
- A card can be completely static (passive container) or interactive (entire card is clickable).
- Cards adapt gracefully to column grids (`1-col`, `2-col`, `3-col`, `4-col`).
- In RTL, header title and text align right, actions and avatars mirror positions.

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| title | Clear, scannable entity title | 40 chars |
| subtitle | Secondary context or department | 30 chars |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Active project | المشروع النشط | Details about the project currently in progress |
| Standard plan | الباقة الأساسية | Click to choose standard plan |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Maintain consistent card heights within the same row | Overcrowd cards with more than two primary actions |
| Use Outlined cards on complex, multi-section pages | Nest interactive cards inside other interactive cards |
| Support clear keyboard focus on interactive cards | Mix multiple card variants randomly in the same grid |


### A8 Platform notes — Web

| | Web |
|---|---|
| Form | Flexible responsive card layouts, hover elevation transitions on interactive cards |
| Grid | 12-column responsive layout integration (spans 3, 4, 6, or 12 cols) |
| Library | Built on MUI `Card`, `CardHeader`, `CardContent`, `CardActions` |

### A9 Accessibility (design)

- Interactive cards use semantic `<article>` or `<div role="article">` elements.
- When entire card is clickable, a single focusable link/button wraps the action without nested conflicting links.
- Selected state announces `aria-selected="true"`.
- Contrast ratio of all text against surface meets WCAG AA (minimum 4.5:1).

### A10 Related components

- [Accordion](../accordion/accordion.md#a--guidelines) — collapsible panel
- [Dialog](../dialog/dialog.md#a--guidelines) — modal container
- [Empty state](../empty-state/empty-state.md#a--guidelines) — zero data card


---
## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'outlined' \| 'elevated' \| 'filled'` | `'outlined'` | Visual container styling |
| `selected` | `boolean` | `false` | Whether card is highlighted as selected |
| `interactive` | `boolean` | `false` | Whether card responds to hover and click |
| `onClick` | `() => void` | `undefined` | Click handler for interactive cards |
| `header` | `ReactNode` / `Widget` | `undefined` | Optional header area (title, avatar, badge) |
| `media` | `ReactNode` / `Widget` | `undefined` | Optional top cover media or image |
| `children` | `ReactNode` / `Widget` | `undefined` | Primary body content slot |
| `actions` | `ReactNode` / `Widget` | `undefined` | Optional footer action buttons |
| `disabled` | `boolean` | `false` | Whether interactive states are disabled |

### B2 Dimensions

| Part | Property | Token / Value |
|---|---|---|
| container | width | hug / fill / fixed (`size-container-xxs` 320 px) |
| container | border-radius | `radius-xl` (12) |
| container | border-width | `border-width-default` (1) on Outlined; `border-width-strong` (2) when Selected |
| container | padding | `spacing-2xl` (20) |
| container | gap | `spacing-xl` (16) |
| header | gap (avatar, title) | `spacing-lg` (12) |
| header | gap (title, subtitle) | `spacing-xs` (4) |
| body | gap | `spacing-lg` (12) |
| footer | gap (buttons) | `spacing-lg` (12) |
| title | text style | title/md |
| subtitle | text style | body/sm |
| body content | text style | body/md |

### B3 Tokens by part and state

Every value is a semantic token; there is no `card.tokens.json`.

| Part | Variant | Property | Default | Hovered (Interactive) | Selected |
|---|---|---|---|---|---|
| container | Outlined | fill | `color-surface-default` | `color-surface-subtle` | `color-surface-default` |
| container | Outlined | border | `color-border-default` | `color-border-strong` | `color-border-brand` |
| container | Outlined | shadow | `elevation-0` | `elevation-1` | `elevation-0` |
| container | Elevated | fill | `color-surface-default` | same | `color-surface-default` |
| container | Elevated | border | `color-border-subtle` | same | `color-border-brand` |
| container | Elevated | shadow | `elevation-1` | `elevation-2` | `elevation-1` |
| container | Filled | fill | `color-surface-subtle` | `color-surface-default` | `color-surface-subtle` |
| container | Filled | border | none | none | `color-border-brand` |
| title | All | text colour | `color-text-default` | same | same |
| subtitle | All | text colour | `color-text-subtle` | same | same |
| focus ring | All | border | `border-width-focus` · `color-border-focus` | — | — |

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default ↔ Hovered | Pointer enter | Shadow / border colour | `motion-duration-sm` | `motion-easing-standard` |
| Unselected ↔ Selected | Click / select | Border colour & width | `motion-duration-sm` | `motion-easing-standard` |

Reduced motion: States switch instantly without elevation transitions.

### B5 RTL

| Part | In RTL |
|---|---|
| Header layout | Leading avatar on right, title and subtitle text aligned right, badge on left |
| Footer actions | Primary button aligned to start/end according to RTL button layout rules |
| Body alignment | Content aligns right according to RTL flow |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Semantic tag | `<article>` or `<div role="article">` for content cards |
| Interactive cards | Single actionable wrapper element with keyboard focus |
| Selected state | `aria-selected="true|false"` when functioning as a selectable card |
| Touch target | Action buttons inside card meet 48 dp minimum touch target |

### B7 Examples

See documentation page 03.

### B8 Figma

Structure, properties, and Figma ↔ code mapping: [Part D](#d--figma-build).

### B9 Tests

- [ ] Outlined, Elevated, and Filled variants render correct tokens in Light and Dark
- [ ] Selected state applies `color-border-brand` border
- [ ] Interactive card responds to hover, active, and keyboard focus
- [ ] Header, media, body, and actions slots render correctly
- [ ] RTL mirrors header elements and action alignment
- [ ] No raw values in style bindings
---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `card-contract.md`.

> Written by the Planner (Antigravity). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · 2026-11-15 |

### C1 Goal

The Web `Card` matches B1–B6 and passes B9 and C6.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Application-specific complex card contents (apps provide children slot widgets)

### C3 Approach

- **Base:** MUI `Card`, `CardHeader`, `CardContent`, `CardActions` styled with Biowave tokens.

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
3-web-components/src/components/card/Card.tsx · Card.test.tsx · index.ts   new
3-web-components/src/index.ts · README.md · CHANGELOG.md   change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] Light and Dark fills verified against Foundations semantic tokens
- [ ] Earlier tests still pass

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6
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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-card-contract.md`.

> Written by the Planner (Antigravity) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Card |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Card` › sections `Card — Component` and `Card — Documentation` |
| Mode | EN / light |
| Depends on | Foundations variables, Button |
| Plan version | 1 · 2026-11-15 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `lint-component-section.js` must report 0 unbound values.
- Nested parts are instances of the sets already in this file or imported from the library — never detached, never redrawn.

### D2 Component structure

```
❖ Card                            ← set: Variant = Outlined · Elevated · Filled, Selected = false · true, Language = EN · AR
  ├─ [header]                     horizontal auto-layout (avatar, title, subtitle)
  ├─ [media]                      cover media slot
  ├─ body                         content slot frame (flexible auto-layout)
  └─ [footer]                     action buttons bar (instances of Button)
```

### D3 Layer tree and auto layout

```
Card                            □ width fill / fixed 320 · radius/xl (12) · padding spacing/2xl (20) · gap spacing/xl (16)
  header                        □ horizontal auto-layout · gap spacing/lg (12) · center-aligned
    leading-media               ● size-control-height-md (40) · avatar / icon
    text-group                  □ vertical auto-layout · gap spacing/xs (4) · fill width
      title                     T title/md · color/text/default
      subtitle                  T body/sm · color/text/subtle
  media                         □ height 100 · fill width · radius/sm (6) · media slot
  body                          □ vertical auto-layout · gap spacing/lg (12) · fill width · content slot
  footer                        □ horizontal auto-layout · gap spacing/lg (12) · button actions
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Variant` | VARIANT | `Outlined` · `Elevated` · `Filled` | `Outlined` | `variant` | `'outlined'` · `'elevated'` · `'filled'` |
| `Selected` | VARIANT | `false` · `true` | `false` | `selected` | `false` · `true` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | layout direction |
| `Title` | TEXT | string | `"Card title"` | `title` | string |
| `Subtitle` | TEXT | string | `"Card description"` | `subtitle` | string |
| `Show header` | BOOLEAN | `false` · `true` | `true` | `showHeader` | boolean |
| `Show media` | BOOLEAN | `false` · `true` | `false` | `showMedia` | boolean |
| `Show footer` | BOOLEAN | `false` · `true` | `true` | `showFooter` | boolean |

### D5 Variants to generate

- `Card`: `Variant` (3) × `Selected` (2) × `Language` (2) = **12** variants.

### D6 States, interactions and motion

No prototype interactions on the set. Elevation change on hover (`elevation-1` → `elevation-2`) and focus ring states are documented on page 04.

### D7 RTL

In RTL (`Language = AR`), header text aligns right, leading avatar on right, trailing badge on left, actions align according to RTL flow.

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Card — Documentation`, frames `Card / 00 Component sheet` … `Card / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Card:
- 01: composed dashboard employee and project card preview using live instances
- 03: all 12 variants across Outlined, Elevated, Filled in Light and Dark
- 04: interactive hover elevation and selection states
- 08 RTL: cards in Arabic layout

Component description: "Foundational surface container grouping related information, media, and actions.. Spec: 3-web-components/components/card/card.md".

### D9 Code Connect

- File: `3-web-components/src/components/card/Card.figma.tsx`
- Mapping: D4 table. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Card`, nested instances and layer names match D2–D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant count = D5
- [ ] F-AC-4 Zero raw values: fills, radius, padding, gaps, sizes, text and effects bound (lint 0)
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only)
- [ ] F-AC-6 AR variants per D7; Arabic copy fits without truncation
- [ ] F-AC-7 Component description filled; no prototype interactions on the set
- [ ] F-AC-8 Values match B2–B3 one by one (redline check)
- [ ] F-AC-9 Every documentation page in D8 exists, in order, built only from Doc Kit components with live instances

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | build · rtl · qa · document |
| Date | 2026-11-16 |
| Node IDs | component set `738:7973` · docs section `706:27900` · page `706:22358` |
| QA report | 0 unbound tokens; 12 variants; 11 doc pages |

**Deviations:**
- none

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
| 1.0 | 2026-11-15 | Initial (Wave 10 Structure brief, AC-01 … AC-03, CR-01 … CR-03) | — | Planner (Antigravity) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-11-15 | Initial | No | — |
