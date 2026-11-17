# Accordion · أكورديون / قائمة قابلة للطي — Web

> **One file for Accordion on Web:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- web accordion`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | Accordion · أكورديون / قائمة قابلة للطي |
| Summary | Collapsible content panel with an interactive header trigger and expandable body container. |
| Summary (ar) | لوحة محتوى قابلة للطي تحتوي على ترويسة تفاعلية وحاوية محتوى قابلة للتوسيع. |
| Parts | Container · header · title · subtitle · leading-icon · chevron · divider · body |
| Parts (ar) | الحاوية · الترويسة · العنوان · العنوان الفرعي · الأيقونة البادئة · سهم التوسيع · الخط الفاصل · المحتوى |
| Platform | Web · React + MUI |
| Built on | MUI `Accordion` + `AccordionSummary` + `AccordionDetails` styled from semantic tokens |
| Import | `import { Accordion, AccordionItem } from '@biowave/web'` |
| Figma | **Biowave DS — Web Components** › `↳ Accordion` · [Part D](#d--figma-build) |
| Version | 1.0 · 2026-11-15 |
| Plan | Finished |
| Code | Planned |
| Figma build | Built |
| Review | — |
| Source code | `src/components/accordion/` — not built yet (the Executor creates it) |
| Tokens | No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly |
| Contracts | [`accordion-contract.md`](accordion-contract.md) · [`figma-accordion-contract.md`](figma-accordion-contract.md) — generated, never edited |
| Docs page | [`accordion.html`](accordion.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---
## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/accordion/accordion.md#b--spec) · [Tablet](../../../4-tablet-components/components/accordion/accordion.md#b--spec) · [Mobile](../../../5-mobile-components/components/accordion/accordion.md#b--spec) |
| Figma | `↳ Accordion` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** |
| Version | 1.0 · 2026-11-15 |

### A1 Overview

An accordion is a vertically stacked set of interactive headings that each expand to reveal a section of associated content. Accordions let users scan high-level section titles and selectively expand the details they need, reducing vertical clutter in dense settings (settings panels, FAQs, complex forms, inspection checklists).

### A2 Anatomy

```
Collapsed:  ┌──────────────────────────────────────────────────────────┐
            │ [★] ①  Personal information             (Optional) ② [v] ③│
            └──────────────────────────────────────────────────────────┘
                      ④

Expanded:   ┌──────────────────────────────────────────────────────────┐
            │ [★] ①  Personal information             (Optional) ② [^] ③│
            ├──────────────────────────────────────────────────────────┤ ⑤
            │                                                          │
            │  ⑥ Content slot (forms, tables, lists, descriptive text) │
            │                                                          │
            └──────────────────────────────────────────────────────────┘
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `leading-icon` | No | Optional leading category icon paired with section topic |
| 2 | `subtitle` | No | Optional secondary hint or metadata label |
| 3 | `chevron` | Yes | Expand indicator icon (`expand_more` / `expand_less`) |
| 4 | `header` | Yes | Interactive trigger container toggling expanded state on tap/click |
| 5 | `divider` | Yes | Subtle horizontal rule separating header and open panel |
| 6 | `body` | Yes | Collapsible content container hosting arbitrary child widgets |

### A3 Usage

**When to use**
- Grouping related form fields or settings that users only occasionally need to edit
- Frequently Asked Questions (FAQ) sections
- Step-by-step review sections or collapsible inspection audit logs

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Switching between distinct primary views of a page | Tabs |
| Temporary overlay blocking background interaction | Dialog |
| Dismissible contextual notification banner | Alert |
| Short toggle of a single boolean setting | Switch / Toggle |

### A4 Options

#### 4.1 `expanded`
| Value | Looks like | Pick it when |
|---|---|---|
| `false` | Header row only with trailing downward chevron | **Default.** Collapsed state saving vertical space |
| `true` | Header row with upward chevron + divider + open body slot | Active section currently being viewed or edited |

#### 4.2 `leadingIcon` · `subtitle`
Optional leading icon reinforces categorization. Subtitle surfaces summary status or optional tag without opening the item.

### A5 States and behavior

| State | What the user sees |
|---|---|
| Default | Crisp border, surface background, dark title, subtle chevron |
| Hovered | Trigger header gains subtle hover background tint |
| Pressed | Trigger header gains pressed background tint |
| Focused | Visible focus ring hugging the header trigger container |
| Expanded | Chevron flips 180°, divider appears, body animates open |
| Disabled | Opacity reduced, pointer events disabled, no toggle action |

**Behavior rules**
- Accordions can allow single-panel expansion (accordion mode) or multi-panel expansion (disclosure mode).
- Collapsing an item hides the body content from both visual display and screen reader navigation.
- In RTL, chevron mirrors to the left edge and text flows right-to-left.

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| title | Clear, scannable section title | 40 chars |
| subtitle | Helpful secondary hint or status | 30 chars |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Personal information | المعلومات الشخصية | Click here to open and edit your personal details |
| Security settings | إعدادات الأمان | Section 2: Security |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Keep header titles concise and self-explanatory | Hide critical error alerts inside collapsed accordions |
| Use clear expand chevron indicators | Put primary submit buttons inside collapsed panels |
| Support full keyboard navigation (Enter / Space) | Nest accordions within accordions |


### A8 Platform notes — Web

| | Web |
|---|---|
| Form | Full container width, responsive layout, hover states on trigger header |
| Keyboard | `Tab` focuses header, `Enter` or `Space` toggles open/close, `ArrowUp`/`ArrowDown` navigate between items |
| Library | Built on MUI `Accordion`, `AccordionSummary`, `AccordionDetails` |

### A9 Accessibility (design)

- Header trigger uses proper heading level (`<h3>` / `<h4>`) and discloses expansion state via `aria-expanded`.
- Visible focus indicator meets WCAG 2.1 AA focus appearance requirements (`border-width-focus`, `color-border-focus`).
- Icon and text contrast exceeds 4.5:1 against the surface background.

### A10 Related components

- [Tabs](../tabs/tabs.md#a--guidelines) — alternate view switcher
- [Card](../card/card.md#a--guidelines) — standalone content surface
- [Dialog](../dialog/dialog.md#a--guidelines) — modal action container


---
## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Section title (required) |
| `subtitle` | `string` | `undefined` | Optional secondary description |
| `leadingIcon` | `IconName` | `undefined` | Optional leading Material Symbols icon |
| `expanded` | `boolean` | `false` | Whether the accordion panel is open |
| `defaultExpanded` | `boolean` | `false` | Initial expansion state in uncontrolled mode |
| `onChange` | `(expanded: boolean) => void` | `undefined` | Callback fired when expanded state changes |
| `disabled` | `boolean` | `false` | When true, panel cannot be toggled |
| `children` | `ReactNode` / `Widget` | `undefined` | Content rendered inside the collapsible body |

### B2 Dimensions

| Part | Property | Token / Value |
|---|---|---|
| container | width | hug / fill container |
| container | border-radius | `radius-md` (8) |
| container | border-width | `border-width-default` (1) |
| header | min-height | `size-control-height-lg` (48) |
| header | padding-inline | `spacing-xl` (16) |
| header | padding-block | `spacing-xl` (16) |
| header | gap (icon, title) | `spacing-lg` (12) |
| header | gap (title, subtitle) | `spacing-xs` (4) |
| divider | border-width | `border-width-default` (1) |
| body | padding-inline | `spacing-xl` (16) |
| body | padding-block | `spacing-xl` (16) |
| body | gap | `spacing-lg` (12) |
| chevron | size | `size-icon-md` (20) |
| title | text style | title/md |
| subtitle | text style | body/sm |
| body content | text style | body/md |

### B3 Tokens by part and state

Every value is a semantic token; there is no `accordion.tokens.json`.

| Part | Property | Default | Hovered | Pressed | Disabled |
|---|---|---|---|---|---|
| container | fill | `color-surface-default` | same | same | `color-surface-subtle` |
| container | border | `color-border-default` | same | same | `color-border-disabled` |
| header | fill | `color-background-transparent-default` | `color-background-transparent-hovered` | `color-background-transparent-pressed` | `color-background-transparent-default` |
| title | text colour | `color-text-default` | same | same | `color-text-disabled` |
| subtitle | text colour | `color-text-subtle` | same | same | `color-text-disabled` |
| chevron | icon colour | `color-icon-subtle` | same | same | `color-icon-subtle` |
| divider | border colour | `color-border-subtle` | same | same | `color-border-subtle` |
| body | fill | `color-surface-default` | same | same | `color-surface-subtle` |
| focus ring | border | `border-width-focus` · `color-border-focus` | — | — | — |

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Collapsed ↔ Expanded | Tap / click | Height of body container | `motion-duration-md` | `motion-easing-standard` |
| Collapsed ↔ Expanded | Tap / click | Chevron rotation (0° ↔ 180°) | `motion-duration-sm` | `motion-easing-standard` |
| Default ↔ Hovered | Pointer enter | Header fill | `motion-duration-sm` | `motion-easing-standard` |

Reduced motion: Height and rotation snap immediately with 0 ms duration.

### B5 RTL

| Part | In RTL |
|---|---|
| Header order | Leading icon on right, title and subtitle text aligned right, chevron on far left |
| Chevron rotation | Maintains 180° vertical inversion; horizontal direction is neutral |
| Body alignment | Content aligns right according to RTL flow |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Trigger role | `<button>` or `role="button"` on header with `aria-expanded="true|false"` |
| Controls relation | `aria-controls="accordion-panel-{id}"` pointing to body panel id |
| Panel role | `role="region"` with `aria-labelledby="accordion-header-{id}"` |
| Keyboard | `Enter` / `Space` toggles; `ArrowDown` / `ArrowUp` move between accordion headers |
| Touch target | Header trigger height meets 48 dp touch target requirement |

### B7 Examples

See documentation page 03.

### B8 Figma

Structure, properties, and Figma ↔ code mapping: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark themes render correct surface, border, and text tokens
- [ ] Clicking header toggles expanded state and fires `onChange`
- [ ] In collapsed state, body is hidden; in expanded state, body is visible
- [ ] Disabled accordion cannot be toggled via click or keyboard
- [ ] RTL reverses layout order (chevron on left, text aligned right)
- [ ] No raw values in style bindings
---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `accordion-contract.md`.

> Written by the Planner (Antigravity). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · 2026-11-15 |

### C1 Goal

The Web `Accordion` matches B1–B6 and passes B9 and C6.

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
- Full bespoke custom form layouts inside the body slot (apps provide slot children)

### C3 Approach

- **Base:** MUI `Accordion`, `AccordionSummary`, `AccordionDetails` styled strictly with Biowave tokens.

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
3-web-components/src/components/accordion/Accordion.tsx · Accordion.test.tsx · index.ts   new
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

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-accordion-contract.md`.

> Written by the Planner (Antigravity) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Accordion |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Accordion` › sections `Accordion — Component` and `Accordion — Documentation` |
| Mode | EN / light |
| Depends on | Foundations variables, icons (expand_more) |
| Plan version | 1 · 2026-11-15 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `lint-component-section.js` must report 0 unbound values.
- Nested parts are instances of the sets already in this file or imported from the library — never detached, never redrawn.

### D2 Component structure

```
❖ Accordion                       ← set: Expanded = false · true, Language = EN · AR
  ├─ ↳ header                     horizontal auto-layout (48 dp min height)
  │    ├─ [leading-icon]          optional Material Symbols icon
  │    ├─ ↳ text-group            vertical auto-layout (title + optional subtitle)
  │    └─ chevron                 expand_more icon (rotates 180° when expanded)
  ├─ [divider]                    1 px rule (visible only when Expanded = true)
  └─ [body]                       content slot frame (visible only when Expanded = true)
```

### D3 Layer tree and auto layout

```
Accordion                       □ width fill container · radius/md · border 1 px color/border/default · fill color/surface/default
  header                        □ horizontal auto-layout · pad-x spacing/xl · pad-y spacing/xl · gap spacing/lg · center-aligned · min-height size/control/height/lg
    leading-icon                ● size-icon-md (20) · color/icon/subtle
    text-group                  □ vertical auto-layout · gap spacing/xs · fill width
      title                     T title/md · color/text/default
      subtitle                  T body/sm · color/text/subtle
    chevron                     ● size-icon-md (20) · color/icon/subtle · expand_more
  divider                       ― height 1 · fill color/border/subtle
  body                          □ vertical auto-layout · pad spacing/xl · gap spacing/lg · content slot
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Expanded` | VARIANT | `false` · `true` | `false` | `expanded` | `false` · `true` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | layout direction |
| `Title` | TEXT | string | `"Section title"` | `title` | string |
| `Subtitle` | TEXT | string | `"Optional description"` | `subtitle` | string |
| `Show subtitle` | BOOLEAN | `false` · `true` | `false` | `showSubtitle` | boolean |
| `Leading icon` | BOOLEAN | `false` · `true` | `false` | `leadingIcon` | boolean |

### D5 Variants to generate

- `Accordion`: `Expanded` (2) × `Language` (2) = **4** variants.

### D6 States, interactions and motion

No prototype interactions on the set. Accordion height expansion (`motion-duration-md`) and chevron rotation (`motion-duration-sm`) are documented on page 04.

### D7 RTL

In RTL (`Language = AR`), chevron moves to the left, title and subtitle align right, leading icon is on the far right.

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Accordion — Documentation`, frames `Accordion / 00 Component sheet` … `Accordion / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Accordion:
- 01: composed FAQ and settings panel accordion preview using live instances
- 03: all 4 variants in Light and Dark
- 04: expand/collapse animation states and motion specs
- 08 RTL: accordion items in Arabic layout

Component description: "Collapsible content panel with an interactive header trigger and expandable body container.. Spec: 3-web-components/components/accordion/accordion.md".

### D9 Code Connect

- File: `3-web-components/src/components/accordion/Accordion.figma.tsx`
- Mapping: D4 table. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Accordion`, nested instances and layer names match D2–D3 and A2
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
| Node IDs | component set `732:4818` · docs section `733:7075` · page `706:22199` |
| QA report | 0 unbound tokens; 4 variants; 11 doc pages |

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
