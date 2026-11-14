import sys; sys.path.insert(0, sys.path[0])
from common import *
from sheets import standard_tail, d_rest

def fixD(s, extra_rtl):
    s=s.replace("- The `scrim` is a private base component `.Scrim` (one per file, shared by Dialog, Bottom sheet and Side sheet): a frame filled with `color/overlay/default`, no other properties. Examples place the overlay component on top of it inside a device frame.\n","")
    s=s.replace("Opening, dragging, the detents and closing are shown on doc page 04 with B4 timings written next to them.","Hover, press, focus and the page change are shown on doc page 04 with B4 timings written next to them.")
    s=s.replace("The `close` and `check` glyphs do not mirror; `arrow_back` mirrors.", extra_rtl)
    return s

# ============ PAGINATION (web, tablet) ============
PG = dict(name='Pagination', ar='ترقيم الصفحات', slug='pagination',
  summary='Moves through the pages of a long list or table: previous, page numbers and next; the table form adds rows per page and the range shown.',
  summary_ar='التنقل بين صفحات قائمة أو جدول طويل: السابق وأرقام الصفحات والتالي؛ ونموذج الجدول يضيف عدد الصفوف في الصفحة والنطاق المعروض.',
  parts='Container · previous · page item · ellipsis · next · rows per page · range',
  parts_ar='الحاوية · السابق · رقم الصفحة · علامة الحذف · التالي · عدد الصفوف · النطاق',
  built_on={'web':'MUI `Pagination` (`renderItem` with Biowave page items and Icon buttons) and, for tables, a custom footer with the Biowave Select',
            'tablet':'Custom Flutter widget (Row of Biowave Icon buttons and page items), styled from semantic tokens','mobile':''},
  **{'import':{'web':"`import { Pagination, TablePagination } from '@biowave/web'`",'tablet':'`BwPagination` from `package:biowave_tablet/biowave_tablet.dart`','mobile':''}})

PG_A = """## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web and Tablet except **A8** (checked by `npm run docs:check`). Mobile has no Pagination: lists load more as you scroll, with a "Load more" button fallback (NV-08).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/pagination/pagination.md#b--spec) · [Tablet](../../../4-tablet-components/components/pagination/pagination.md#b--spec) · Mobile — none (load more, NV-08) |
| Figma | `↳ Pagination` in **Biowave DS — Web Components** · **Tablet Components** |
| Version | 1.0 · 2026-11-13 |

### A1 Overview

Pagination splits a long list or table into pages and lets the user move between them. The numbered form shows previous, page numbers and next; the table form adds how many rows a page shows and which rows are on screen ("1–20 of 240"); the compact form fits narrow spaces ("Page 3 of 12").

### A2 Anatomy

```
Numbered      ‹   1   2  [3]  4   5   …   12   ›
              ①   ②       ③           ④         ⑤
Table         Rows per page [20 ▾]   1–20 of 240          ‹ 1 2 [3] 4 5 … 12 ›
                    ⑥                    ⑦
Compact       ‹   Page 3 of 12   ›
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `previous` | Yes | Icon button, goes one page back; disabled on the first page |
| 2 | `page item` | Yes | A page number; goes to that page |
| 3 | `current` | Yes | The page on screen, selected |
| 4 | `ellipsis` | No | "…" for hidden page numbers; not interactive |
| 5 | `next` | Yes | Icon button, goes one page on; disabled on the last page |
| 6 | `rows per page` | Table | Select: 10 · 20 · 50 · 100 |
| 7 | `range` | Table | Which rows are shown: "1–20 of 240" |

### A3 Usage

**When to use**
- Tables and lists with more rows than fit, where the user needs to know where they are or jump to a page
- Table form under every data table that pages

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Feeds and Mobile lists | Load more as you scroll (NV-08) |
| Carousels and onboarding | Page control |
| Steps of a flow | Stepper |

### A4 Options

#### 4.1 `form`
| Value | Looks like | Pick it when |
|---|---|---|
| `numbered` | ‹ 1 2 3 … 12 › | **Default.** Lists and card grids |
| `table` | rows per page · range · numbers | Under data tables (Web) |
| `compact` | ‹ Page 3 of 12 › | Narrow spaces: Tablet portrait, side sheets |

**Combination rules**
- At most 7 page slots: first, last, the current page with one neighbour each side, and "…" for the gaps
- Changing rows per page goes back to page 1

### A5 States and behavior

| State | Part | What the user sees |
|---|---|---|
| Default | page item | Grey number |
| Hovered · Pressed | page item | Light / darker fill |
| Focused | page item | Focus ring |
| Selected | current | Brand number on the selected fill |
| Disabled | previous / next | Faded on the first / last page |

**Behavior rules**
- Moving to another page keeps the filters and the sort; the list scrolls to its top
- Arabic: previous is on the right and points right; numbers stay Western digits as in the rest of the product

### A6 Content

| Element | Rule | Example |
|---|---|---|
| range | "first–last of total" with an en dash | 1–20 of 240 |
| compact | "Page n of total" | Page 3 of 12 |
| rows per page | Label + Select | Rows per page |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| 1–20 of 240 | 1–20 من 240 | Showing 1 to 20 out of 240 entries |
| Page 3 of 12 | صفحة 3 من 12 | 3/12 |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Show where the user is (current page, range) | Show every page number of a long list |
| Keep the table form under the table, full width | Put pagination at the top and the bottom |
| Use the compact form when space is short | Wrap page numbers to two lines |

"""
PG_A8={'web':"""### A8 Platform notes — Web

| | Web |
|---|---|
| Forms | Numbered, Table, Compact |
| Size | Page items and Icon buttons `size-control-height-sm` |
| Keyboard | Tab through previous, page items, next; Enter / Space |

""",'tablet':"""### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Forms | Numbered (landscape), Compact (portrait) |
| Size | Page items and Icon buttons `size-control-height-md` with a `target-min` hit area |
| Gestures | None — pages change only with the controls |

"""}
PG_tail="""### A9 Accessibility (design)

- The current page is announced as the current page
- Previous and next have names ("Previous page", "Next page")
- The range text is announced when the page changes

### A10 Related components

- [Icon button](../icon-button/icon-button.md#a--guidelines) — previous and next
- Select — rows per page
- [Page control](../page-control/page-control.md#a--guidelines) — dots for carousels

---

"""
def PG_B(p):
    h='size-control-height-sm' if p=='web' else 'size-control-height-md'
    ib='`sm`' if p=='web' else '`md`'
    api=("""#### Pagination
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `page` · `count` | `number` | ≥ 1 | — | ✓ | Current page · number of pages |
| `onChange` | `(page: number) => void` | | — | ✓ | |
| `form` | `'numbered' \\| 'compact'` | | `'numbered'` | | |

#### TablePagination
| Prop | Type | Default | Description |
|---|---|---|---|
| `page` · `rowsPerPage` · `total` | `number` | — | |
| `rowsPerPageOptions` | `number[]` | `[10, 20, 50, 100]` | Select options |
| `onPageChange` · `onRowsPerPageChange` | functions | — | Changing rows goes back to page 1 |

**Invalid combinations** (`console.warn` in development):
| Combination | Fallback |
|---|---|
| `page` > `count` | `count` |""" if p=='web' else """#### BwPagination
| Parameter | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `page` · `count` | `int` | ≥ 1 | — | ✓ | |
| `onChanged` | `ValueChanged<int>` | | — | ✓ | |
| `compact` | `bool?` | | auto (portrait) | | Compact form |

**Invalid combinations** (`assert` in debug):
| Combination | Fallback |
|---|---|
| `page` > `count` | assert |""")
    return f"""## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

{api}

### B2 Dimensions

| Part | Property | Token |
|---|---|---|
| container | gap | `spacing-xs` |
| previous · next | | Icon button {ib}, `chevron_left` · `chevron_right` |
| page item · ellipsis | height · min width · padding-inline · radius | `{h}` · `{h}` · `spacing-sm` · `radius-md` |{'' if p=='web' else chr(10)+'| page item | hit area | `target-min` |'}
| page item · range · compact text | text style | `label-md` |
| table form | gap between groups · width | `spacing-3xl` · fills the table width, groups at both ends |
| rows per page | | Select `sm`, width hugs the value |
| focus ring | | `border-width-focus` · `color-border-focus` · `radius-md` |

### B3 Tokens by part and state

Every value is a semantic token; there is no `pagination.tokens.json`. Icon button and Select carry their own.

| Part | Property | Default | Hovered | Pressed | Selected |
|---|---|---|---|---|---|
| page item | fill | `color-background-transparent-default` | `color-background-transparent-hovered` | `color-background-transparent-pressed` | `color-background-selected-default` |
| page item | text | `color-text-subtle` | `color-text-default` | `color-text-default` | `color-text-role-brand` |
| ellipsis | text | `color-text-subtlest` | — | — | — |
| range · compact · rows label | text | `color-text-subtle` | — | — | — |

Contrast (light): `color-text-subtle` on `color-surface-default` 14.55:1 · selected `color-text-role-brand` on `color-background-selected-default` 12.54:1. Dark theme: same tokens.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hovered / Pressed | pointer / tap | fill, text | `motion-duration-sm` | `motion-easing-standard` |
| Page n → m | select | selection moves; no slide | — | — |

Reduced motion: no change (nothing slides).

### B5 RTL

| Part | In RTL |
|---|---|
| order | Reverses: previous on the right, numbers read right to left, next on the left |
| previous · next | Glyphs mirror (previous points right) |
| digits | Western digits, as in the product |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | {'`<nav aria-label="Pagination">`; current page `aria-current="page"`' if p=='web' else '`Semantics(label: "Pagination")`; current `selected: true`'} |
| Names | "Previous page", "Next page", "Page 4" |
| Live range | {'`aria-live="polite"` on the range text' if p=='web' else '`SemanticsService.announce` of the new page'} |
| Disabled | Previous on page 1 and next on the last page are disabled, not hidden |

### B7 Examples

See the docs pages 03 and 07.

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: B2–B3 tokens
- [ ] At most 7 page slots with "…" for the gaps
- [ ] Previous / next disabled on the first / last page
- [ ] RTL reverses the order and mirrors the chevrons
- [ ] No raw values

---

"""
def PG_C(p):
    if p=='web':
        appr="- **Base:** MUI `Pagination` with `renderItem` → Biowave page item / Icon buttons; `siblingCount={1}`, `boundaryCount={1}`.\n- **Table:** custom footer: Biowave Select (rows), range text, Pagination."
        files="3-web-components/src/components/pagination/Pagination.tsx · TablePagination.tsx · Pagination.test.tsx · index.ts   new\n3-web-components/src/index.ts · README.md · CHANGELOG.md   change"
        cmd="`npm run test:web`, `npm run typecheck`, `npm run docs:check`"
    else:
        appr="- **Base:** `Row` of `BwIconButton` (previous / next) and page items (`InkWell`, tokens B2–B3); page-slot algorithm as Web (`siblingCount` 1, `boundaryCount` 1); compact form in portrait."
        files="4-tablet-components/lib/src/components/pagination/bw_pagination.dart   new\n4-tablet-components/test/pagination_test.dart · goldens\n4-tablet-components/lib/biowave_tablet.dart   change: export\n4-tablet-components/README.md · CHANGELOG.md"
        cmd="`cd 4-tablet-components && flutter analyze && flutter test`, `npm run docs:check`"
    return standard_tail(p, PG, cmd, files, "- [ ] Page-slot algorithm: 1 … 4 [5] 6 … 12 for page 5 of 12", f"The {LBL[p]} Pagination", appr, "- The table itself\n- Page control, Stepper")
def PG_D(p):
    head=d_head(p, PG, '**Create new.** Legacy `↳ Pagination` (page frames only) is the layout source; it stays untouched', 'Icon Button and Select sets in this file')
    h='size/control/height/sm' if p=='web' else 'size/control/height/md'
    forms='Numbered · Table · Compact' if p=='web' else 'Numbered · Compact'
    n=6 if p=='web' else 4
    struct=f"```\n❖ Pagination                     ← set: Form = {forms} × Language = EN · AR\n  └─ ❖ .Page item                 ← private set: State = Default · Hovered · Pressed · Focused · Selected · Ellipsis (TEXT Label)\n```"
    tree=f"""```
Pagination (Numbered)      ↔ gap spacing/xs · centred
├── ◇ Icon Button          {'sm' if p=='web' else 'md'} · chevron_left (RTL: chevron_right)
├── ◇ .Page item × 7       ↔ height {h} · min width {h} · padding-inline spacing/sm · radius/md · T label/md
└── ◇ Icon Button          chevron_right
{'Pagination (Table)        ↔ width 960 sample · space-between · [T "Rows per page" + ◇ Select sm] [T "1–20 of 240"] [Numbered]'+chr(10) if p=='web' else ''}Pagination (Compact)      ↔ gap spacing/md · Icon Button · T "Page 3 of 12" label/md · Icon Button
```"""
    props="""| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Form` | VARIANT | """+forms+""" | `Numbered` | component / `form` | |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `.Page item` › `Label` | TEXT | | `1` | page number | |
| `.Page item` › `State` | VARIANT | Default · Hovered · Pressed · Focused · Selected · Ellipsis | Default | interaction · `page` | |"""
    variants=f"- `Pagination`: Form × Language = **{n}**; `.Page item`: **6**"
    notes=("- 01: table form under a data table in a Desktop frame\n- 03: numbered · table · compact · first page (previous disabled)\n- 07: Desktop and Web narrow (compact)" if p=='web' else "- 01: numbered under a list on a Tablet frame\n- 03: numbered · compact\n- 07: landscape (numbered) and portrait (compact)")
    cc='`3-web-components/src/components/pagination/Pagination.figma.tsx`' if p=='web' else '`4-tablet-components/lib/src/components/pagination/bw_pagination.figma.dart`'
    return fixD(head+d_rest(p, PG, struct, tree, props, variants, notes, cc).replace("(Button, Icon Button, Divider)","(Icon Button, Select)"),
        "Previous / next and the page items in reverse order; previous uses `chevron_right`, next `chevron_left`; digits stay Western.")

# ============ PAGE CONTROL (web, tablet, mobile) ============
PC = dict(name='Page control', ar='مؤشر الصفحات', slug='page-control',
  summary='Dots that show which page of a short carousel or onboarding is on screen; tapping a dot goes to that page.',
  summary_ar='نقاط توضّح أي صفحة معروضة في عرض دوّار قصير أو في التعريف بالتطبيق؛ والنقر على نقطة ينقل إلى صفحتها.',
  parts='Container · dot · current dot · platter (iOS)', parts_ar='الحاوية · النقطة · النقطة الحالية · الخلفية (iOS)',
  built_on={'web':'Custom (a `role="tablist"` row of buttons), styled from semantic tokens','tablet':'Custom Flutter widget (Row of `AnimatedContainer` dots), styled from semantic tokens',
            'mobile':'Flutter adaptive (N-07): iOS → iOS and iPadOS 27 Page Control look (custom, `CupertinoPageControl`-style platter); Android → Biowave dots (M3 has no page control)'},
  **{'import':{'web':"`import { PageControl } from '@biowave/web'`",'tablet':'`BwPageControl` from `package:biowave_tablet/biowave_tablet.dart`','mobile':'`BwPageControl` from `package:biowave_mobile/biowave_mobile.dart`'}})
PC_A="""## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/page-control/page-control.md#b--spec) · [Tablet](../../../4-tablet-components/components/page-control/page-control.md#b--spec) · [Mobile](../../../5-mobile-components/components/page-control/page-control.md#b--spec) |
| Figma | `↳ Page control` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** (`OS=iOS · Android`) |
| Version | 1.0 · 2026-11-13 |

### A1 Overview

A page control is a row of dots under a short carousel or onboarding flow. Each dot is a page; the current one is longer and in the brand colour. It shows how many pages there are and where the user is; tapping a dot jumps to it. On iOS it takes the iOS and iPadOS 27 Page Control form.

### A2 Anatomy

```
●  ━━━  ●  ●  ●          Biowave (Web, Tablet, Android)
①   ②                     ① dot · ② current dot (elongated)
( ●  ●  ●  ●  ● )        iOS 27 — dots on a capsule platter ③
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `dot` | Yes | One page |
| 2 | `current` | Yes | The page on screen |
| 3 | `platter` | iOS | Capsule behind the dots |

### A3 Usage

**When to use**
- Carousels and onboarding with 2–7 pages, swiped or stepped through

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Lists and tables | Pagination (Web, Tablet) · load more (Mobile) |
| Steps the user must complete in order | Stepper |
| More than 7 pages | Pagination or a counter ("3 of 12") |

### A4 Options

#### 4.1 Number of pages
2–7 dots. Above 7, iOS shrinks the outer dots; Biowave shows a counter instead.

**Combination rules**
- One page control per carousel, centred under it

### A5 States and behavior

| State | What the user sees |
|---|---|
| Default dot | Small neutral dot |
| Current | Elongated brand dot (iOS: opaque dot) |
| Focused (keyboard) | Focus ring around the row |

**Behavior rules**
- Swiping the carousel moves the current dot; tapping a dot goes to that page
- Arabic: the first page is on the right

### A6 Content

No text. The accessible name says the position: "Page 2 of 5".

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Page 2 of 5 | الصفحة 2 من 5 | Dot 2 |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Centre the dots under the carousel | Use dots for a long list |
| Keep 2–7 pages | Use dots as the only way to move (keep swipe and arrows) |

"""
PC_A8={'web':"""### A8 Platform notes — Web

| | Web |
|---|---|
| Form | Biowave dots; carousel arrows do the stepping, dots also click |
| Keyboard | ← / → move between dots |

""",'tablet':"""### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Form | Biowave dots under onboarding and dashboard carousels |
| Touch | The row has a `target-min` hit area; tapping either side of the current dot steps |

""",'mobile':"""### A8 Platform notes — Mobile

| | iOS | Android |
|---|---|---|
| Form | iOS and iPadOS 27 Page Control: dots on a capsule platter, current dot opaque | Biowave dots (M3 has no page control): elongated brand current dot |
| Touch | Tap left / right of the current dot to step; drag along the control to scrub | Tap a dot |

"""}
PC_tail="""### A9 Accessibility (design)

- The control is announced as "Page 2 of 5" and is adjustable (swipe up / down with a screen reader)
- The current dot differs by size or opacity, not only colour

### A10 Related components

- Pagination — pages of lists and tables (Web, Tablet)
- Stepper — steps of a flow

---

"""
def PC_B(p):
    if p=='mobile':
        dims="""| Part | Property | iOS | Android |
|---|---|---|---|
| platter | padding · radius · fill | `spacing-lg` / `spacing-md` · `radius-full` · `color-background-neutral-default` | — |
| dot | size · gap | `spacing-md` · `spacing-md` | `spacing-md` · `spacing-md` |
| current | size | `spacing-md` (same size, opaque) | width `spacing-3xl`, height `spacing-md` |
| dot | radius | `radius-full` | `radius-full` |"""
        toks="""| Part | iOS | Android |
|---|---|---|
| dot | `color-border-default` | `color-border-default` |
| current | `color-icon-default` | `color-background-brand-default` |"""
    else:
        dims="""| Part | Property | Token |
|---|---|---|
| dot | size · gap · radius | `spacing-md` · `spacing-md` · `radius-full` |
| current | width · height | `spacing-3xl` · `spacing-md` |
| row | hit area | """+('pointer: each dot a `target-min` button' if p=='web' else '`target-min` height')
        toks="""| Part | Default | Current |
|---|---|---|
| dot | `color-border-default` | `color-background-brand-default` |"""
    return f"""## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

| {'Prop' if p=='web' else 'Parameter'} | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `count` | {'`number`' if p=='web' else '`int`'} | 2–7 | — | ✓ | Pages |
| `current` | {'`number`' if p=='web' else '`int`'} | 0 … count − 1 | — | ✓ | |
| `onChange` | {'`(index: number) => void`' if p=='web' else '`ValueChanged<int>`'} | | — | | Tap / click on a dot |

### B2 Dimensions

Dot sizes use spacing tokens: there is no size token for 8 (`size-icon-*` starts at 12). Reported in C4.

{dims}

### B3 Tokens by part and state

{toks}

Focus ring: `border-width-focus` · `color-border-focus` around the row. Dark theme: same tokens.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Page n → m | swipe / tap | current dot width and colour move to the new dot | `motion-duration-md` | `motion-easing-standard` |

Reduced motion: instant.

### B5 RTL

| Part | In RTL |
|---|---|
| order | Reverses: the first page is the right-most dot |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | {'`role="tablist"` of buttons, `aria-label="Page 2 of 5"`, `aria-selected`' if p=='web' else 'One adjustable `Semantics` node: value "Page 2 of 5", increase / decrease'} |
| Target size | `target-min` |

### B7 Examples

See the docs pages 03 and 07.

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: B2–B3 tokens
- [ ] Tapping a dot calls `onChange`; the current dot moves
- [ ] RTL reverses the order
- [ ] No raw values

---

"""
def PC_C(p):
    sec=SEC[p]
    if p=='web':
        appr="- **Base:** a row of `button`s (tokens B2–B3), the current one wider; `transition` on width and colour."
        files="3-web-components/src/components/page-control/PageControl.tsx · PageControl.test.tsx · index.ts   new\n3-web-components/src/index.ts · README.md · CHANGELOG.md   change"
        cmd="`npm run test:web`, `npm run typecheck`, `npm run docs:check`"
    else:
        appr=("- **Base:** `Row` of `AnimatedContainer` dots in a `GestureDetector`." if p=='tablet' else "- **Base (N-07):** iOS → custom platter + dots (iOS 27 look; Flutter has no Cupertino page control); Android → Biowave dots as Tablet.")
        files=f"{sec}/lib/src/components/page_control/bw_page_control.dart   new\n{sec}/test/page_control_test.dart · goldens\n{sec}/lib/biowave_{p}.dart   change: export\n{sec}/README.md · CHANGELOG.md"
        cmd=f"`cd {sec} && flutter analyze && flutter test`, `npm run docs:check`"
    s=standard_tail(p, PC, cmd, files, "- [ ] Semantics value updates on page change", f"The {LBL[p]} Page control", appr, "- The carousel itself\n- Pagination, Stepper")
    return s.replace("None — every value in B2–B3 is an existing semantic token.","Dot sizes use `spacing-md` / `spacing-3xl` because there is no size token below 12 (`size-icon-xs`). Proposal for Foundations: `size-indicator-sm` 8 · `size-indicator-lg` 24. Until then the spacing tokens are used.")
def PC_D(p):
    head=d_head(p, PC, '**Create new.**'+(' iOS and iPadOS 27 `Page Control` measured as the iOS reference' if p=='mobile' else ''), 'none')
    if p=='mobile':
        struct="```\n❖ Page control                   ← set: OS = iOS · Android × Pages = 3 · 5 × Language = EN · AR\n  └─ ❖ .Dot                       ← private set: OS × Current = true · false\n```"
        tree="```\nPage control (iOS)         ↔ platter padding spacing/lg · spacing/md · radius/full · fill color/background/neutral/default · gap spacing/md\n└── ◇ .Dot × n             spacing/md square · radius/full · current color/icon/default · other color/border/default\nPage control (Android)     ↔ gap spacing/md\n└── ◇ .Dot × n             spacing/md · current width spacing/3xl color/background/brand/default\n```"
        props="| Figma property | Type | Values | Default | Code prop | Code value |\n|---|---|---|---|---|---|\n| `OS` | VARIANT | `iOS` · `Android` | `iOS` | — | platform |\n| `Pages` | VARIANT | `3` · `5` | `5` | `count` | |\n| `Language` | VARIANT | `EN` · `AR` | `EN` | — | order |"
        variants="- `Page control`: OS × Pages × Language = **8**; `.Dot`: **4**"
        notes="- 01: onboarding on iPhone and Android with the control under the content\n- 03: 3 · 5 pages; current first / middle\n- 07: iPhone and Android"
        cc='`5-mobile-components/lib/src/components/page_control/bw_page_control.figma.dart`'
    else:
        struct="```\n❖ Page control                   ← set: Pages = 3 · 5 · 7 × Language = EN · AR\n  └─ ❖ .Dot                       ← private set: Current = true · false\n```"
        tree="```\nPage control               ↔ gap spacing/md · centred\n└── ◇ .Dot × n             height spacing/md · width spacing/md (current spacing/3xl) · radius/full\n```"
        props="| Figma property | Type | Values | Default | Code prop | Code value |\n|---|---|---|---|---|---|\n| `Pages` | VARIANT | `3` · `5` · `7` | `5` | `count` | |\n| `Language` | VARIANT | `EN` · `AR` | `EN` | — | order |"
        variants="- `Page control`: Pages × Language = **6**; `.Dot`: **2**"
        notes="- 01: under a carousel / onboarding card\n- 03: 3 · 5 · 7 pages\n- 07: "+("Desktop" if p=='web' else "landscape and portrait")
        cc=f"`{SEC[p]}/"+("src/components/page-control/PageControl.figma.tsx`" if p=='web' else "lib/src/components/page_control/bw_page_control.figma.dart`")
    return fixD(head+d_rest(p, PC, struct, tree, props, variants, notes, cc), "Dots in reverse order (the current dot is the second from the right).")

if __name__=='__main__':
    for p in ['web','tablet']:
        t=tail(p,PG).replace('Initial (Wave 8 brief, decisions O-01 … O-06)','Initial (navigation brief, NV-01 … NV-13)')
        write(p,'pagination', header(p,PG)+PG_A+PG_A8[p]+PG_tail+PG_B(p)+PG_C(p)+PG_D(p)+t)
    for p in ['web','tablet','mobile']:
        t=tail(p,PC).replace('Initial (Wave 8 brief, decisions O-01 … O-06)','Initial (navigation brief, NV-01 … NV-13)')
        write(p,'page-control', header(p,PC)+PC_A+PC_A8[p]+PC_tail+PC_B(p)+PC_C(p)+PC_D(p)+t)
    print('ok')
