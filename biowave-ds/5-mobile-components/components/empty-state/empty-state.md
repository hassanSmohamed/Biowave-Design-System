# Empty state · حالة فراغ — Mobile

> **One file for Empty state on Mobile:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- mobile empty-state`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Empty state · حالة فراغ |
| Summary | Explains why a page, section, card or Data table has no items to show and offers a clear next action in `md` (page) or `sm` (compact) size. |
| Summary (ar) | يعرض سبب خلو الصفحة أو القسم أو الجدول أو البطاقة من البيانات ويقترح الخطوة التالية بحجم قياسي (`md`) أو مدمج (`sm`). |
| Parts | Visual badge · title · description · primary action · secondary action |
| Parts (ar) | الوسيط البصري · العنوان · الوصف · الإجراء الرئيسي · الإجراء الثانوي |
| Platform | Mobile · Flutter + Material 3 + Cupertino (adaptive, N-07) |
| Built on | Custom Flutter `BwEmptyState` widget composed from semantic tokens and Biowave `BwButton` |
| Import | `import 'package:biowave_mobile/biowave_mobile.dart'; // BwEmptyState` |
| Figma | **Biowave DS — Mobile Components** › `↳ Empty state` (page Typography mode `Mobile`) · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-11-14 |
| Plan | Finished |
| Code | Planned |
| Figma build | Built |
| Review | — |
| Source code | `lib/src/components/empty-state/` — not built yet (the Executor creates it) |
| Tokens | No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly |
| Contracts | [`empty-state-contract.md`](empty-state-contract.md) · [`figma-empty-state-contract.md`](figma-empty-state-contract.md) — generated, never edited |
| Docs page | [`empty-state.html`](empty-state.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---
## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/empty-state/empty-state.md#b--spec) · [Tablet](../../../4-tablet-components/components/empty-state/empty-state.md#b--spec) · [Mobile](../../../5-mobile-components/components/empty-state/empty-state.md#b--spec) |
| Figma | `↳ Empty state` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** |
| Version | 1.0 · 2026-11-14 |

### A1 Overview

An empty state fills an empty page, section, card, side sheet or data table with clear context explaining why nothing appears yet and offering the user a constructive next step ("Add employee", "Clear filters"). Sizes `md` (full-page / section) and `sm` (compact inside Data table, cards or panels) cover all contexts without drawing custom empty frames (FB-06).

### A2 Anatomy

```
      (  [◆]  )         ① visual (illustration or icon badge)
    No matching results ② title
Try adjusting your filters or search terms. ③ description
 [ Clear filters ]  [ Add employee ]        ④ actions (primary + optional secondary)
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `visual` | No | Spot illustration (`md`) or calm icon in a `color-surface-subtle` circle (`sm` / toggleable) |
| 2 | `title` | Yes | Short noun/statement explaining the empty condition |
| 3 | `description` | No | Concise guidance telling the user why it is empty and what to do next |
| 4 | `actions` | No | Optional primary `Button` (`Filled`) and optional secondary `Button` (`Outlined` or `Text`) |

### A3 Usage

**When to use**
- First-use / zero-data screens (`No shifts created yet` + `Create shift`)
- Search or filter queries returning zero results (`No matching employees` + `Clear filters`)
- Inline empty regions inside Data table (`sm`), Cards (`sm`) or Side sheets (`sm`)

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Content is currently fetching for > 300 ms | [Skeleton](../skeleton/skeleton.md#a--guidelines) |
| Failed API call blocking the page with retry action | [Alert](../alert/alert.md#a--guidelines) (`error`) + Empty state fallback if whole canvas failed |
| Confirmation before deleting data | [Dialog](../dialog/dialog.md#a--guidelines) |

### A4 Options

#### 4.1 `size` (FB-06)
| Value | Visual slot | Pick it when |
|---|---|---|
| `md` | Large illustration (`160 × 160` Web / `120 × 120` touch) or `48 px` icon badge | **Default.** Full page, tab canvas or primary module with no records yet |
| `sm` | Compact `40 px` icon badge (or hidden via `showVisual`) | Inside Data table body (`TableEmpty`), dashboard cards or Side sheets |

#### 4.2 Visual & action slots
| Option | Default | Notes |
|---|---|---|
| `showVisual` | `true` | Hide only when vertical space inside a tiny card/sheet cannot fit the badge |
| `primaryAction` | on when actionable | Highest-priority recovery/create CTA (`Filled` Button) |
| `secondaryAction` | off | Optional secondary recovery CTA (`Outlined` or `Text` Button, e.g. `Learn more`) |

**Combination rules**
- Maximum two actions (`primary` + `secondary`); never stack three or more buttons
- Never show `primaryAction` when the user has read-only permission with no next action

### A5 States and behavior

| State | Trigger | What the user sees |
|---|---|---|
| Default | Zero items in source | Centered visual, title, description and action buttons |
| Filtered empty | Active search/filter returns 0 rows | Helper copy suggests clearing filters with a `Clear filters` action |
| Narrow width | Panel or mobile viewport shrinks | Text wraps inside max container width; action pair wraps into a centered row or column |

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| title | What is missing, plain sentence case: "No employees yet", "No matching results" | 48 chars |
| description | Why it is empty + concrete next step | 120 chars (1–2 sentences) |
| action | Clear verb phrase: "Add employee", "Clear filters" | 2–3 words |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| No matching results · Try adjusting your search or filter settings. · Clear filters | لا توجد نتائج مطابقة · جرّب تعديل كلمات البحث أو الفلاتر. · مسح الفلاتر | Empty · Nothing here · Back |
| No requests yet · New attendance requests will appear here. · New request | لا توجد طلبات بعد · ستظهر طلبات الحضور الجديدة هنا. · طلب جديد | Error 404 |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Explain both why the area is empty and what action solves it | Display a bare "No data" string with no explanation |
| Use `sm` size inside Data table and dashboard cards (FB-06) | Drop a huge `160 px` empty-state illustration inside a `240 px` table body |
| Match empty state tone to Biowave calm neutral styling | Use bright error red for a harmless zero-results search |


### A8 Platform notes — Mobile

| | Mobile |
|---|---|
| Visual (`md`) | Illustration up to `120 × 120` (`illustration.md`) or `48 px` icon badge |
| Actions | Centered buttons wrap vertically to full width on narrow viewports with `48 × 48 dp` touch target |

### A9 Accessibility (design)

- Visual illustration/icon is decorative (`aria-hidden="true"` / `ExcludeSemantics`) unless it conveys unique information
- Title uses appropriate heading hierarchy (e.g. `<h2>` / `<h3>` depending on page section) so screen-reader landmarks make sense
- `color-text-default` (`19.8:1`), `color-text-subtle` (`14.55:1`) and `color-text-subtlest` (`7.57:1`) all exceed WCAG AA 4.5:1 in Light and Dark themes

### A10 Related components

- [Button](../button/button.md#a--guidelines) — primary and secondary call-to-action controls
- [Alert](../alert/alert.md#a--guidelines) — inline status/error banners rather than empty canvases
- [Skeleton](../skeleton/skeleton.md#a--guidelines) — shown before data arrives when loading takes > 300 ms
- Data table — hosts `Empty state` (`size="sm"`) in its zero-rows state (Wave 10)

---
## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

#### BwEmptyState (Flutter)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `size` | `BwEmptyStateSize` (`md · sm`) | `BwEmptyStateSize.md` | | Page/section (`md`) vs compact table/card (`sm`, FB-06) |
| `visual` | `Widget?` | default subtle icon badge | | Custom illustration/icon widget |
| `showVisual` | `bool` | `true` | | Hides visual slot when `false` |
| `title` | `String` | — | ✓ | Primary heading |
| `description` | `String?` | `null` | | Supporting explanation |
| `primaryActionLabel` | `String?` | `null` | | Primary button label |
| `onPrimaryAction` | `VoidCallback?` | `null` | | Primary button callback |
| `secondaryActionLabel` | `String?` | `null` | | Secondary button label |
| `onSecondaryAction` | `VoidCallback?` | `null` | | Secondary button callback |

**Invalid combinations** (`assert` in development):
| Combination | Fallback |
|---|---|
| `secondaryAction` without `primaryAction` | Promotes/renders single button cleanly or warns if mismatched hierarchy |
| Action label without handler | Ignores handlerless button and warns |

### B2 Dimensions

| Part | `size = md` (Page / Section) | `size = sm` (Compact) |
|---|---|---|
| container max width | `size-container-sm` (480) | `size-container-xs` (384) |
| container padding | `spacing-3xl` (24) | `spacing-xl` (16) |
| `visual` badge | icon `size-icon-3xl` (48) + `spacing-3xl` (24) pad (`radius-full`) | icon `size-icon-2xl` (40) + `spacing-xl` (16) pad (`radius-full`) |
| gap `visual`–text stack | `spacing-3xl` (24) | `spacing-xl` (16) |
| gap `title`–`description` | `spacing-md` (8) | `spacing-xs` (4) |
| `title` text style | `title-lg` | `title-md` |
| `description` text style | `body-lg` | `body-md` |
| gap text stack–`actions` | `spacing-2xl` (20) | `spacing-xl` (16) |
| gap between buttons | `spacing-md` (8) | `spacing-md` (8) |

### B3 Tokens by part and state

Every value is a semantic token; there is no `empty-state.tokens.json`.

| Part | Property | Token (`md` · `sm`) |
|---|---|---|
| `visual` badge background | fill | `color-surface-subtle` |
| `visual` icon | fill | `color-icon-subtlest` |
| `title` | text fill | `color-text-default` |
| `description` | text fill | `color-text-subtle` (`md`) · `color-text-subtlest` (`sm`) |
| `primaryAction` | Button | `Filled` · `brand` |
| `secondaryAction` | Button | `Outlined` · `neutral` |

Contrast (Light / Dark): `color-text-default` on `color-surface-default` — **19.8:1 / 17.2:1** · `color-text-subtle` — **14.55:1 / 13.31:1** · `color-text-subtlest` — **7.57:1 / 9.81:1**.

### B4 States and transitions

Static centered view. Entrance fade uses `motion-duration-md` (200 ms) `motion-easing-standard-decelerate`; instant under reduced motion.

### B5 RTL

| Part | In RTL |
|---|---|
| centered layout | Remains centered; secondary/primary button row flips right-to-left automatically |
| text alignment | Centered; mixed punctuation respects RTL direction |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Semantics | `visual` wrapped in `ExcludeSemantics`; `title` marked `Semantics(header: true)`; buttons enforce `48 × 48 dp` minimum target |
| Actions | Keyboard focusable (`border-width-focus` `color-border-focus`), clear verb labels |

### B7 Examples

```dart
// EN
BwEmptyState(
  size: BwEmptyStateSize.sm,
  title: 'No matching results',
  description: 'Try adjusting your filters or search terms.',
  primaryActionLabel: 'Clear filters',
  onPrimaryAction: onReset,
)

// AR (direction comes from Directionality / locale)
BwEmptyState(
  title: 'لا توجد بيانات بعد',
  description: 'ابدأ بإضافة أول موظف في هذا الفرع.',
  primaryActionLabel: 'إضافة موظف',
  onPrimaryAction: onAdd,
)
```

### B8 Figma

Structure, properties, Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: both `md` and `sm` render B2 dimensions and B3 tokens
- [ ] `visual = null` / `showVisual = false` collapses visual slot cleanly
- [ ] Optional `description`, `primaryAction`, `secondaryAction` render only when passed
- [ ] RTL layout and Arabic copy wrap cleanly within container width
- [ ] Accessibility decorative visual hiding and button contrast/targets pass
---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `empty-state-contract.md`.

> Written by the Planner (Antigravity). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · 2026-11-14 |

### C1 Goal

The Mobile `Empty state` matches B1–B6 and passes B9 and C6.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Loading placeholders (`Skeleton`)
- Full illustration asset pack authoring (`2-foundations/guidelines/illustration.md`)

### C3 Approach

- **Base:** Centered Flutter `Column` constrained by `ConstrainedBox` (`size-container-sm` / `xs`), circular badge in `color-surface-subtle`, reusing `BwButton`.

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
5-mobile-components/lib/src/components/empty_state/bw_empty_state.dart · test/empty_state_test.dart   new
5-mobile-components/lib/biowave_mobile.dart · README.md · CHANGELOG.md   change
```

### C6 Tests

Implement every item in B9, plus:
- [ ] `sm` renders compact inside constrained table/card height
- [ ] Dual action buttons wrap cleanly on narrow widths
- [ ] Earlier tests still pass

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6
- [ ] AC-5 Tests in B9 and C6 exist and pass; `npm run test:mobile`, `flutter analyze`, `npm run docs:check` pass
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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-empty-state-contract.md`.

> Written by the Planner (Antigravity) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Mobile set in **Biowave DS — Mobile Components**.

| Field | Value |
|---|---|
| Component | Empty state |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) — never the Foundations file |
| Page / section | `↳ Empty state` › sections `Empty state — Component` and `Empty state — Documentation` |
| Mode | **Create new** in **Biowave DS — Mobile Components**. |
| Depends on | `Button`, Icons & Foundations library variables |
| Plan version | 1 · 2026-11-14 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `lint-component-section.js` must report 0 unbound values.
- Nested parts are instances of the sets already in this file (`.Button _en` / `.Button _ar` or `Button`, `Icon Button`) — never detached, never redrawn.

### D2 Component structure

```
❖ Empty state                     ← set: Size = MD · SM × Language = EN · AR
  ├─ visual                       ● circular badge (`color-surface-subtle` + Icon)
  ├─ text-stack                   ↕ title + description
  └─ actions                      ↔ primary Button + secondary Button
```

### D3 Layer tree and auto layout

```
Empty state               ↕ vertical centered · gap spacing/3xl (MD) or spacing/xl (SM) · max-width B2
├── visual                ● circle pad spacing/3xl (MD) or spacing/xl (SM) · fill color/surface/subtle · radius/full · BOOLEAN `Show visual`
│   └── icon              ◇ Icon · size/icon/3xl (MD) or size/icon/2xl (SM) · fill color/icon/subtlest
├── text-stack            ↕ vertical centered · gap spacing/md (MD) or spacing/xs (SM)
│   ├── title             T title/lg (MD) or title/md (SM) · fill color/text/default · TEXT `Title`
│   └── description       T body/lg (MD) or body/md (SM) · fill color/text/subtle(st) · TEXT `Description`
└── actions               ↔ horizontal centered · gap spacing/md
    ├── primary           ◇ Button (Filled · Brand) · BOOLEAN `Primary action`
    └── secondary         ◇ Button (Outlined · Neutral) · BOOLEAN `Secondary action`
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Size` | VARIANT | `MD` · `SM` | `MD` | `size` | `'md'` · `'sm'` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Title` | TEXT | | `No matching results` | `title` | |
| `Description` | TEXT | | helper copy | `description` | |
| `Show visual` | BOOLEAN | | `true` | `visual` / `showVisual` | |
| `Primary action` | BOOLEAN | | `true` | `primaryAction` present | |
| `Secondary action` | BOOLEAN | | `true` | `secondaryAction` present | |

### D5 Variants to generate

- `Empty state`: `Size` (2) × `Language` (2) = **4** variants.

### D6 States, interactions and motion

No prototype interactions on the set. Action button hover/press/focus states follow `Button`.

### D7 RTL

`Language=AR`: Typography mode `Mobile · AR`; centered layout swaps button pair order (Primary on right in RTL); Arabic copy uses A6 examples.

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Empty state — Documentation`, frames `Empty state / 00 Component sheet` … `Empty state / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Empty state:
- 01: `MD` empty page example and `SM` compact card example
- 03: `Size = MD · SM`, with/without visual and secondary action
- 05 Usage: A7 Do/Don't pairs with live instances

Component description: "Explains why a page, section, card or Data table has no items to show and offers a clear next action in `md` (page) or `sm` (compact) size.. Spec: 5-mobile-components/components/empty-state/empty-state.md".

### D9 Code Connect

- File: `5-mobile-components/lib/src/components/empty_state/bw_empty_state.figma.dart`
- Mapping: D4 table. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [x] F-AC-1 Component set `Empty state`, nested instances and layer names match D2–D3 and A2
- [x] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [x] F-AC-3 Variant count = D5
- [x] F-AC-4 Zero raw values: fills, radius, padding, gaps, sizes, text and effects bound (lint 0)
- [x] F-AC-5 Correct in Light and Dark (variable mode switch only)
- [x] F-AC-6 AR variants per D7; Arabic copy fits without truncation
- [x] F-AC-7 Component description filled; no prototype interactions on the set
- [x] F-AC-8 Values match B2–B3 one by one (redline check)
- [x] F-AC-9 Every documentation page in D8 exists, in order, built only from Doc Kit components with live instances

---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | build · rtl · qa · document · review fixes (findings 2, 7, 8, round 3 R3-5) |
| Date | 2026-11-18 |
| Node IDs | page `181:16451` · component section `181:16452` · component set `181:16557` (4 variants) · docs section `181:25525` · pages `181:23219` (00) · `181:23385` (01) · `181:23571` (02) · `181:24077` (03) · `181:24310` (04) · `181:24436` (05) · `181:24644` (06) · `181:24891` (07) · `181:25064` (08) · `181:25165` (09) · `181:25412` (11) · Components List card `181:27226` |
| QA report | 4 variants in Set `181:16557` (`Size = MD · SM`, `Language = EN · AR`). Actions layout confirmed VERTICAL with `layoutSizingHorizontal = FILL`, primary action above secondary action, buttons set to FILL with `minWidth = null`. R3-5 docs fitting fixed: all 11 doc page frames and row containers use vertical auto-layout HUG; Page 00 axis labels set to `clipsContent = true`; Page 02 token code table cells wrapped across lines (`spacing/3xl`, `size/container/sm`, `body/lg`) fitting within cell boundaries with zero edge overflow; tile slot frames set to `clipsContent = true`; section pages arranged in clean 3-column grid with 120px inter-row gaps. Official review docs-fit check returned `{ edge: 0, spill: 0 }` across all 11 pages (0/0). Visual inspection of all screenshots (`mobile-empty-state-set.png`, `mobile-empty-state-docs.png`) confirmed zero overlap, no crossing of page boundaries or footers. Review lint: `issues: []` |

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
| Round 3 | 2026-11-18 | — | Fixed (R3-5 docs fit 0/0, lint 0) |
| Round 2 | 2026-11-18 | — | Fixed (Findings 2, 7, 8 resolved, lint 0) |
| Round 1 | 2026-11-17 | — | Changes requested (2026-11-17-wave9-feedback-review.md) |

---

## F · Changelog

> Changes to this component on this platform. Every entry also gets one line in the root `CHANGELOG.md`.

### F0 Changes from previous version

None — first version.

### F1 Guidelines changelog

| Version | Date | Change | Migration | Author |
|---|---|---|---|---|
| 1.0 | 2026-11-14 | Initial (Wave 9 Feedback brief, FB-01 … FB-07) | — | Planner (Antigravity) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | 2026-11-14 | Initial | No | — |
