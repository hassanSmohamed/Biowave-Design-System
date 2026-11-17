#!/usr/bin/env python3
"""Generate Wave 10 specs (Accordion, Card) across Web, Tablet, Mobile."""

import os
import sys

ROOT = '/Users/hassansaid/Downloads/Biowave Design System/biowave-ds'
SEC = {'web': '3-web-components', 'tablet': '4-tablet-components', 'mobile': '5-mobile-components'}
LBL = {'web': 'Web', 'tablet': 'Tablet', 'mobile': 'Mobile'}
DATE = '2026-11-15'

PLAT_META = {
    'web': {'platform': 'Web · React + MUI', 'src': 'src/components'},
    'tablet': {'platform': 'Tablet · Flutter + Material 3', 'src': 'lib/src/components'},
    'mobile': {'platform': 'Mobile · Flutter + Material 3 + Cupertino (adaptive, N-07)', 'src': 'lib/src/components'},
}


def header(p, c):
    pm = PLAT_META[p]
    slug = c['slug']
    fig_suffix = ' (page Typography mode `Tablet`)' if p == 'tablet' else (' (page Typography mode `Mobile`)' if p == 'mobile' else '')
    return f"""# {c['name']} · {c['ar']} — {LBL[p]}

> **One file for {c['name']} on {LBL[p]}:** A Guidelines · B Spec · C Code plan · D Figma build · E Review · F Changelog. Written by the Planner. Builders do not read this file — they get the generated contracts (`npm run contract -- {p} {slug}`). Template: [`_templates/component.md`](../../../_templates/component.md).

| | |
|---|---|
| Component | {c['name']} · {c['ar']} |
| Summary | {c['summary']} |
| Summary (ar) | {c['summary_ar']} |
| Parts | {c['parts']} |
| Parts (ar) | {c['parts_ar']} |
| Platform | {c.get('platform', {}).get(p, pm['platform'])} |
| Built on | {c['built_on'][p]} |
| Import | `{c['import_line'][p]}` |
| Figma | **Biowave DS — {LBL[p]} Components** › `↳ {c['name']}`{fig_suffix} · [Part D](#d--figma-build) |
| Version | 1.0 · {DATE} |
| Plan | Finished |
| Code | Planned |
| Figma build | Planned |
| Review | — |
| Source code | `{pm['src']}/{slug}/` — not built yet (the Executor creates it) |
| Tokens | {c.get('tokens_note', 'No component tokens — every value is a semantic token (B3); Figma binds the Foundations variables directly')} |
| Contracts | [`{slug}-contract.md`]({slug}-contract.md) · [`figma-{slug}-contract.md`](figma-{slug}-contract.md) — generated, never edited |
| Docs page | [`{slug}.html`]({slug}.html) |

## Contents

[A · Guidelines](#a--guidelines) · [B · Spec](#b--spec) · [C · Code plan](#c--code-plan) · [D · Figma build](#d--figma-build) · [E · Review](#e--review) · [F · Changelog](#f--changelog)

---
"""


def guidelines_block(p, c):
    slug = c['slug']
    return f"""## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/{slug}/{slug}.md#b--spec) · [Tablet](../../../4-tablet-components/components/{slug}/{slug}.md#b--spec) · [Mobile](../../../5-mobile-components/components/{slug}/{slug}.md#b--spec) |
| Figma | `↳ {c['name']}` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components**{c.get('figma_top_note', '')} |
| Version | 1.0 · {DATE} |

{c['a1_to_a7']}

{c['a8'][p]}

{c['a9_to_a10']}

---
"""


def d_head(p, c, mode, depends):
    slug = c['slug']
    return f"""## D · Figma build

> How to build Part B in Figma. The Figma Agent receives this through the generated `figma-{slug}-contract.md`.

> Written by the Planner (Antigravity) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the {LBL[p]} set in **Biowave DS — {LBL[p]} Components**.

| Field | Value |
|---|---|
| Component | {c['name']} |
| Figma file | **Biowave DS — {LBL[p]} Components** (`_sync/figma-files.json` › `{p}`) — never the Foundations file |
| Page / section | `↳ {c['name']}` › sections `{c['name']} — Component` and `{c['name']} — Documentation` |
| Mode | {mode} |
| Depends on | {depends} |
| Plan version | 1 · {DATE} |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `lint-component-section.js` must report 0 unbound values.
- Nested parts are instances of the sets already in this file or imported from the library — never detached, never redrawn.
"""


def tail_block(p, c, goal, scope_extra, approach, files, extra_tests, d2, d3, d4, d5, d6, d7, d8_notes, desc, d9_map, d10_extra):
    slug = c['slug']
    if p == 'web':
        checks = '`npm run test:web`, `npm run typecheck`, `npm run docs:check`'
    else:
        checks = f'`npm run test:{p}`, `flutter analyze`, `npm run docs:check`'

    return f"""---

## C · Code plan

> How to build Part B in code. The code Executor receives this through the generated `{slug}-contract.md`.

> Written by the Planner (Antigravity). Executed by any agent. Reviewed by Claude against this file.
> **The spec (Part B in this folder) is the contract.** This plan does not repeat it; it says how to build it.

| Field | Value |
|---|---|
| Plan version | 1 · {DATE} |

### C1 Goal

{goal}

### C2 Scope

**In scope:** B1–B6, B9, C6.

**Out of scope** (do not build or change)
{scope_extra}

### C3 Approach

{approach}

### C4 Token gaps

None — every value in B2–B3 is an existing semantic token.

### C5 Files to create / change

```
{files}
```

### C6 Tests

Implement every item in B9, plus:
{extra_tests}
- [ ] Earlier tests still pass

### C7 Acceptance criteria (the Reviewer checks exactly these)

- [ ] AC-1 Public API matches B1 exactly (names, types, defaults, warnings / asserts)
- [ ] AC-2 Every value in B2–B3 comes from the listed token; no raw values, no primitives
- [ ] AC-3 Every transition in B4; reduced motion respected
- [ ] AC-4 RTL as B5; a11y as B6
- [ ] AC-5 Tests in B9 and C6 exist and pass; {checks} pass
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

{d_head(p, c, c['d_mode'][p], c['d_depends'][p])}
### D2 Component structure

```
{d2}
```

### D3 Layer tree and auto layout

```
{d3}
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
{d4}

### D5 Variants to generate

{d5}

### D6 States, interactions and motion

{d6}

### D7 RTL

{d7}

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `{c['name']} — Documentation`, frames `{c['name']} / 00 Component sheet` … `{c['name']} / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for {c['name']}:
{d8_notes}

Component description: "{desc}. Spec: {SEC[p]}/components/{slug}/{slug}.md".

### D9 Code Connect

- File: `{c['d9_file'][p]}`
- Mapping: {d9_map}. Publish after the code and Figma reviews are both `Approved`.

### D10 Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `{c['name']}`, nested instances and layer names match D2–D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant count = D5
- [ ] F-AC-4 Zero raw values: fills, radius, padding, gaps, sizes, text and effects bound (lint 0)
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only)
- [ ] F-AC-6 AR variants per D7; Arabic copy fits without truncation
- [ ] F-AC-7 Component description filled; no prototype interactions on the set
- [ ] F-AC-8 Values match B2–B3 one by one (redline check)
- [ ] F-AC-9 Every documentation page in D8 exists, in order, built only from Doc Kit components with live instances
{d10_extra}
---

### D11 Execution log (filled by the Figma Agent)

| Field | Value |
|---|---|
| Agent / stages run | build · rtl · qa · document |
| Date | |
| Node IDs | component set `—` · docs section `—` · pages `—` |
| QA report | pending |

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
| 1.0 | {DATE} | Initial (Wave 10 Structure brief, AC-01 … AC-03, CR-01 … CR-03) | — | Planner (Antigravity) |

### F2 Spec changelog

| Version | Date | Change | Breaking | Migration |
|---|---|---|---|---|
| 1.0 | {DATE} | Initial | No | — |
"""


def write_spec(p, slug, content):
    out_dir = os.path.join(ROOT, SEC[p], 'components', slug)
    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, f'{slug}.md')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'wrote {SEC[p]}/components/{slug}/{slug}.md')


# ==============================================================================
# 1. ACCORDION CONFIG & BUILDER
# ==============================================================================
ACCORDION_A1_A7 = """### A1 Overview

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
"""

ACCORDION_A8 = {
    'web': """### A8 Platform notes — Web

| | Web |
|---|---|
| Form | Full container width, responsive layout, hover states on trigger header |
| Keyboard | `Tab` focuses header, `Enter` or `Space` toggles open/close, `ArrowUp`/`ArrowDown` navigate between items |
| Library | Built on MUI `Accordion`, `AccordionSummary`, `AccordionDetails` |""",
    'tablet': """### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Form | Wide touch targets (48 dp minimum height), 2-column or list-detail container layouts |
| Touch | Entire header triggers expansion with immediate touch ripple |
| Library | Built on Flutter `ExpansionTile` or custom animated container |""",
    'mobile': """### A8 Platform notes — Mobile

| | Mobile |
|---|---|
| Form | Edge-to-edge with standard 16 dp page margin, 48 dp touch target height |
| Touch | Large tap target on header row, smooth height transition |
| Library | Built on Flutter `ExpansionTile` / Cupertino disclosure styling |""",
}

ACCORDION_A9_A10 = """### A9 Accessibility (design)

- Header trigger uses proper heading level (`<h3>` / `<h4>`) and discloses expansion state via `aria-expanded`.
- Visible focus indicator meets WCAG 2.1 AA focus appearance requirements (`border-width-focus`, `color-border-focus`).
- Icon and text contrast exceeds 4.5:1 against the surface background.

### A10 Related components

- [Tabs](../tabs/tabs.md#a--guidelines) — alternate view switcher
- [Card](../card/card.md#a--guidelines) — standalone content surface
- [Dialog](../dialog/dialog.md#a--guidelines) — modal action container
"""

ACCORDION_CFG = {
    'name': 'Accordion',
    'slug': 'accordion',
    'ar': 'أكورديون / قائمة قابلة للطي',
    'summary': 'Collapsible content panel with an interactive header trigger and expandable body container.',
    'summary_ar': 'لوحة محتوى قابلة للطي تحتوي على ترويسة تفاعلية وحاوية محتوى قابلة للتوسيع.',
    'parts': 'Container · header · title · subtitle · leading-icon · chevron · divider · body',
    'parts_ar': 'الحاوية · الترويسة · العنوان · العنوان الفرعي · الأيقونة البادئة · سهم التوسيع · الخط الفاصل · المحتوى',
    'built_on': {
        'web': 'MUI `Accordion` + `AccordionSummary` + `AccordionDetails` styled from semantic tokens',
        'tablet': 'Flutter `ExpansionTile` styled with Biowave tokens',
        'mobile': 'Flutter `ExpansionTile` / Cupertino disclosure with Biowave tokens',
    },
    'import_line': {
        'web': "import { Accordion, AccordionItem } from '@biowave/web'",
        'tablet': "import 'package:biowave_tablet/biowave_tablet.dart';",
        'mobile': "import 'package:biowave_mobile/biowave_mobile.dart';",
    },
    'd_mode': {
        'web': 'EN / light',
        'tablet': 'EN / light · page Typography mode Tablet',
        'mobile': 'EN / light · page Typography mode Mobile',
    },
    'd_depends': {
        'web': 'Foundations variables, icons (expand_more)',
        'tablet': 'Foundations variables, icons',
        'mobile': 'Foundations variables, icons',
    },
    'd9_file': {
        'web': '3-web-components/src/components/accordion/Accordion.figma.tsx',
        'tablet': '4-tablet-components/lib/src/components/accordion/accordion.figma.dart',
        'mobile': '5-mobile-components/lib/src/components/accordion/accordion.figma.dart',
    },
    'a1_to_a7': ACCORDION_A1_A7,
    'a8': ACCORDION_A8,
    'a9_to_a10': ACCORDION_A9_A10,
}


def accordion_part_b(p):
    return """## B · Spec

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
"""


def build_accordion(p):
    is_web = (p == 'web')
    files = (
        '3-web-components/src/components/accordion/Accordion.tsx · Accordion.test.tsx · index.ts   new\n'
        '3-web-components/src/index.ts · README.md · CHANGELOG.md   change'
        if is_web else
        f'{SEC[p]}/lib/src/components/accordion/bw_accordion.dart · test/accordion_test.dart   new\n'
        f'{SEC[p]}/lib/biowave_{p}.dart · README.md · CHANGELOG.md   change'
    )
    approach = (
        '- **Base:** MUI `Accordion`, `AccordionSummary`, `AccordionDetails` styled strictly with Biowave tokens.'
        if is_web else
        f'- **Base:** Flutter `ExpansionTile` or custom animated box styled with Biowave tokens and 48 dp touch target on {LBL[p]}.'
    )
    d2 = """❖ Accordion                       ← set: Expanded = false · true, Language = EN · AR
  ├─ ↳ header                     horizontal auto-layout (48 dp min height)
  │    ├─ [leading-icon]          optional Material Symbols icon
  │    ├─ ↳ text-group            vertical auto-layout (title + optional subtitle)
  │    └─ chevron                 expand_more icon (rotates 180° when expanded)
  ├─ [divider]                    1 px rule (visible only when Expanded = true)
  └─ [body]                       content slot frame (visible only when Expanded = true)"""

    d3 = """Accordion                       □ width fill container · radius/md · border 1 px color/border/default · fill color/surface/default
  header                        □ horizontal auto-layout · pad-x spacing/xl · pad-y spacing/xl · gap spacing/lg · center-aligned · min-height size/control/height/lg
    leading-icon                ● size-icon-md (20) · color/icon/subtle
    text-group                  □ vertical auto-layout · gap spacing/xs · fill width
      title                     T title/md · color/text/default
      subtitle                  T body/sm · color/text/subtle
    chevron                     ● size-icon-md (20) · color/icon/subtle · expand_more
  divider                       ― height 1 · fill color/border/subtle
  body                          □ vertical auto-layout · pad spacing/xl · gap spacing/lg · content slot"""

    d4 = """| `Expanded` | VARIANT | `false` · `true` | `false` | `expanded` | `false` · `true` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | layout direction |
| `Title` | TEXT | string | `"Section title"` | `title` | string |
| `Subtitle` | TEXT | string | `"Optional description"` | `subtitle` | string |
| `Show subtitle` | BOOLEAN | `false` · `true` | `false` | `showSubtitle` | boolean |
| `Leading icon` | BOOLEAN | `false` · `true` | `false` | `leadingIcon` | boolean |"""

    d5 = '- `Accordion`: `Expanded` (2) × `Language` (2) = **4** variants.'
    d6 = 'No prototype interactions on the set. Accordion height expansion (`motion-duration-md`) and chevron rotation (`motion-duration-sm`) are documented on page 04.'
    d7 = 'In RTL (`Language = AR`), chevron moves to the left, title and subtitle align right, leading icon is on the far right.'
    d8 = '- 01: composed FAQ and settings panel accordion preview using live instances\n- 03: all 4 variants in Light and Dark\n- 04: expand/collapse animation states and motion specs\n- 08 RTL: accordion items in Arabic layout'
    return (
        header(p, ACCORDION_CFG)
        + guidelines_block(p, ACCORDION_CFG)
        + accordion_part_b(p)
        + tail_block(
            p, ACCORDION_CFG,
            f'The {LBL[p]} `Accordion` matches B1–B6 and passes B9 and C6.',
            '- Full bespoke custom form layouts inside the body slot (apps provide slot children)',
            approach, files,
            '- [ ] Light and Dark fills verified against Foundations semantic tokens',
            d2, d3, d4, d5, d6, d7, d8, ACCORDION_CFG['summary'], 'D4 table', ''
        )
    )


# ==============================================================================
# 2. CARD CONFIG & BUILDER
# ==============================================================================
CARD_A1_A7 = """### A1 Overview

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
"""

CARD_A8 = {
    'web': """### A8 Platform notes — Web

| | Web |
|---|---|
| Form | Flexible responsive card layouts, hover elevation transitions on interactive cards |
| Grid | 12-column responsive layout integration (spans 3, 4, 6, or 12 cols) |
| Library | Built on MUI `Card`, `CardHeader`, `CardContent`, `CardActions` |""",
    'tablet': """### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Form | 2-column grid cards, list-detail card selections |
| Touch | Large tap target on interactive cards with Material ripple |
| Library | Built on Flutter `Card` / Material 3 card styling |""",
    'mobile': """### A8 Platform notes — Mobile

| | Mobile |
|---|---|
| Form | Full-width container (minus 16 dp screen margins), stacked feed cards |
| Touch | 48 dp minimum touch target on actions, smooth press response |
| Library | Built on Flutter `Card` / Cupertino-styled grouped container |""",
}

CARD_A9_A10 = """### A9 Accessibility (design)

- Interactive cards use semantic `<article>` or `<div role="article">` elements.
- When entire card is clickable, a single focusable link/button wraps the action without nested conflicting links.
- Selected state announces `aria-selected="true"`.
- Contrast ratio of all text against surface meets WCAG AA (minimum 4.5:1).

### A10 Related components

- [Accordion](../accordion/accordion.md#a--guidelines) — collapsible panel
- [Dialog](../dialog/dialog.md#a--guidelines) — modal container
- [Empty state](../empty-state/empty-state.md#a--guidelines) — zero data card
"""

CARD_CFG = {
    'name': 'Card',
    'slug': 'card',
    'ar': 'بطاقة',
    'summary': 'Foundational surface container grouping related information, media, and actions.',
    'summary_ar': 'حاوية أساسية تجمع المعلومات والوسائط والإجراءات المترابطة داخل بطاقة مستقلة.',
    'parts': 'Container · header · title · subtitle · leading-media · trailing-action · body · footer',
    'parts_ar': 'الحاوية · الترويسة · العنوان · العنوان الفرعي · الوسائط البادئة · الإجراء التابع · المحتوى · التذييل',
    'built_on': {
        'web': 'MUI `Card` + `CardHeader` + `CardContent` + `CardActions` styled from semantic tokens',
        'tablet': 'Flutter `Card` / Material 3 card styled with Biowave tokens',
        'mobile': 'Flutter `Card` / Cupertino-styled grouped container with Biowave tokens',
    },
    'import_line': {
        'web': "import { Card, CardHeader, CardContent, CardActions } from '@biowave/web'",
        'tablet': "import 'package:biowave_tablet/biowave_tablet.dart';",
        'mobile': "import 'package:biowave_mobile/biowave_mobile.dart';",
    },
    'd_mode': {
        'web': 'EN / light',
        'tablet': 'EN / light · page Typography mode Tablet',
        'mobile': 'EN / light · page Typography mode Mobile',
    },
    'd_depends': {
        'web': 'Foundations variables, Button',
        'tablet': 'Foundations variables, Button',
        'mobile': 'Foundations variables, Button',
    },
    'd9_file': {
        'web': '3-web-components/src/components/card/Card.figma.tsx',
        'tablet': '4-tablet-components/lib/src/components/card/card.figma.dart',
        'mobile': '5-mobile-components/lib/src/components/card/card.figma.dart',
    },
    'a1_to_a7': CARD_A1_A7,
    'a8': CARD_A8,
    'a9_to_a10': CARD_A9_A10,
}


def card_part_b(p):
    return """## B · Spec

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
"""


def build_card(p):
    is_web = (p == 'web')
    files = (
        '3-web-components/src/components/card/Card.tsx · Card.test.tsx · index.ts   new\n'
        '3-web-components/src/index.ts · README.md · CHANGELOG.md   change'
        if is_web else
        f'{SEC[p]}/lib/src/components/card/bw_card.dart · test/card_test.dart   new\n'
        f'{SEC[p]}/lib/biowave_{p}.dart · README.md · CHANGELOG.md   change'
    )
    approach = (
        '- **Base:** MUI `Card`, `CardHeader`, `CardContent`, `CardActions` styled with Biowave tokens.'
        if is_web else
        f'- **Base:** Flutter `Card` / Material 3 card with Biowave tokens and touch targets on {LBL[p]}.'
    )
    d2 = """❖ Card                            ← set: Variant = Outlined · Elevated · Filled, Selected = false · true, Language = EN · AR
  ├─ [header]                     horizontal auto-layout (avatar, title, subtitle)
  ├─ [media]                      cover media slot
  ├─ body                         content slot frame (flexible auto-layout)
  └─ [footer]                     action buttons bar (instances of Button)"""

    d3 = """Card                            □ width fill / fixed 320 · radius/xl (12) · padding spacing/2xl (20) · gap spacing/xl (16)
  header                        □ horizontal auto-layout · gap spacing/lg (12) · center-aligned
    leading-media               ● size-control-height-md (40) · avatar / icon
    text-group                  □ vertical auto-layout · gap spacing/xs (4) · fill width
      title                     T title/md · color/text/default
      subtitle                  T body/sm · color/text/subtle
  media                         □ height 100 · fill width · radius/sm (6) · media slot
  body                          □ vertical auto-layout · gap spacing/lg (12) · fill width · content slot
  footer                        □ horizontal auto-layout · gap spacing/lg (12) · button actions"""

    d4 = """| `Variant` | VARIANT | `Outlined` · `Elevated` · `Filled` | `Outlined` | `variant` | `'outlined'` · `'elevated'` · `'filled'` |
| `Selected` | VARIANT | `false` · `true` | `false` | `selected` | `false` · `true` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | layout direction |
| `Title` | TEXT | string | `"Card title"` | `title` | string |
| `Subtitle` | TEXT | string | `"Card description"` | `subtitle` | string |
| `Show header` | BOOLEAN | `false` · `true` | `true` | `showHeader` | boolean |
| `Show media` | BOOLEAN | `false` · `true` | `false` | `showMedia` | boolean |
| `Show footer` | BOOLEAN | `false` · `true` | `true` | `showFooter` | boolean |"""

    d5 = '- `Card`: `Variant` (3) × `Selected` (2) × `Language` (2) = **12** variants.'
    d6 = 'No prototype interactions on the set. Elevation change on hover (`elevation-1` → `elevation-2`) and focus ring states are documented on page 04.'
    d7 = 'In RTL (`Language = AR`), header text aligns right, leading avatar on right, trailing badge on left, actions align according to RTL flow.'
    d8 = '- 01: composed dashboard employee and project card preview using live instances\n- 03: all 12 variants across Outlined, Elevated, Filled in Light and Dark\n- 04: interactive hover elevation and selection states\n- 08 RTL: cards in Arabic layout'
    return (
        header(p, CARD_CFG)
        + guidelines_block(p, CARD_CFG)
        + card_part_b(p)
        + tail_block(
            p, CARD_CFG,
            f'The {LBL[p]} `Card` matches B1–B6 and passes B9 and C6.',
            '- Application-specific complex card contents (apps provide children slot widgets)',
            approach, files,
            '- [ ] Light and Dark fills verified against Foundations semantic tokens',
            d2, d3, d4, d5, d6, d7, d8, CARD_CFG['summary'], 'D4 table', ''
        )
    )


def main():
    builders = {
        'accordion': build_accordion,
        'card': build_card,
    }
    for p in ('web', 'tablet', 'mobile'):
        for slug, fn in builders.items():
            write_spec(p, slug, fn(p))


if __name__ == '__main__':
    main()
