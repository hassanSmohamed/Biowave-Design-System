import sys; sys.path.insert(0, sys.path[0])
from common import *
from sheets import standard_tail, d_rest

BC = dict(name='Breadcrumbs', ar='مسار التنقل', slug='breadcrumbs',
  summary='Shows where the current page sits in the product (module › section › page) and lets the user jump back up one or more levels.',
  summary_ar='يوضّح مكان الصفحة الحالية في المنتج (الوحدة › القسم › الصفحة) ويتيح للمستخدم الرجوع مستوى أو أكثر بنقرة واحدة.',
  parts='Container · item (link) · separator · overflow item · current page',
  parts_ar='الحاوية · العنصر (رابط) · الفاصل · عنصر المزيد · الصفحة الحالية',
  built_on={'web':'Custom on MUI `Breadcrumbs` (`separator`, `maxItems` 4, `itemsBeforeCollapse` 1, `itemsAfterCollapse` 2) with Biowave Link items and a Biowave Menu for the collapsed items',
            'tablet':'Custom Flutter widget (`Wrap`-free single `Row` with `InkWell` items, M3 `MenuAnchor` for the collapsed items), styled from semantic tokens',
            'mobile':''},
  **{'import':{'web':"`import { Breadcrumbs } from '@biowave/web'`",
               'tablet':'`BwBreadcrumbs` from `package:biowave_tablet/biowave_tablet.dart`','mobile':''}})

A = """## A · Guidelines

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

"""

A8 = {'web': """### A8 Platform notes — Web

| | Web |
|---|---|
| Place | App header `Title` slot (Top app bar), next to the logo block |
| Size | Items `size-control-height-sm`; mouse and keyboard |
| Narrow windows | Collapse earlier; below the Tablet breakpoint only the current page and "…" remain |

""", 'tablet': """### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Place | Top of the page content, under the Top app bar (the bar shows the page title); landscape and portrait |
| Size | Items `size-control-height-md` with a `target-min` hit area (touch) |
| Portrait | Collapse from 4 items (first · "…" · last item) |

"""}

A_tail = """### A9 Accessibility (design)

- The current page is announced as the current page, not as a link
- The "…" item has a name ("Show path") and opens a Menu
- Separators are decoration, not read out

### A10 Related components

- [Top app bar](../top-app-bar/top-app-bar.md#a--guidelines) — Breadcrumbs fill the Web App header title
- [Primary navigation](../primary-navigation/primary-navigation.md#a--guidelines) — modules and pages
- [Link](../link/link.md#a--guidelines) — item styling and focus

---

"""

def B(p):
    h = 'size-control-height-sm' if p=='web' else 'size-control-height-md'
    icon = 'size-icon-md' if p=='web' else 'size-icon-lg'
    hit = '' if p=='web' else '\n| item | hit area | `target-min` (min block size around the visual item) |'
    api = ("""#### Breadcrumbs
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `items` | `{ label: string; href?: string; onClick?: () => void }[]` | ancestors, module first | — | ✓ | `item`; the last entry is the `current` page |
| `maxItems` | `number` | ≥ 3 | `4` | | More items than this collapse into `overflow` |
| `overflowLabel` | `string` | | `'Show path'` | | Accessible name of the "…" item |

**Invalid combinations** (`console.warn` in development):
| Combination | Fallback |
|---|---|
| `href` on the last item | ignored; the last item is the current page |
| `maxItems` < 3 | `3` |""" if p=='web' else """#### BwBreadcrumbs
| Parameter | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `items` | `List<BwBreadcrumbItem>` (`label`, `onTap`) | module first | — | ✓ | `item`; the last entry is the `current` page |
| `maxItems` | `int` | ≥ 3 | `4` (portrait `3`) | | More items than this collapse into `overflow` |
| `overflowLabel` | `String` | | `'Show path'` (localised) | | Semantics label of the "…" item |

**Invalid combinations** (`assert` in debug):
| Combination | Fallback |
|---|---|
| `onTap` on the last item | ignored |
| `maxItems` < 3 | `3` |""")
    return f"""## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

{api}

### B2 Dimensions

| Part | Property | Token |
|---|---|---|
| container | gap between items and separators | `spacing-xs` |
| item · overflow · current | height · padding-inline · radius | `{h}` · `spacing-md` · `radius-md` |{hit}
| item · current | text style | `label-md` (current: same style, default colour) |
| item | max label width | 24 characters, then "…" (A5) |
| separator | glyph · size | `chevron_right` (mirrored in RTL) · `{icon}` |
| overflow | glyph · size | `more_horiz` · `{icon}` |
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
| Role | {'`<nav aria-label="Breadcrumb">` with an `<ol>`; each item an `<li>`' if p=='web' else '`Semantics(container: true, label: "Breadcrumb")`; each item a button with its label'} |
| Current page | {'`aria-current="page"`, not a link' if p=='web' else '`Semantics(selected: true)` and no `onTap`'} |
| Separators | {'`aria-hidden="true"`' if p=='web' else '`ExcludeSemantics`'} |
| Overflow | Button named `overflowLabel`, opens a Menu with the hidden items in order |
| Target size | {'`target-min` (24) — the item height is above it' if p=='web' else '`target-min` (48) hit area'} |

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

"""

def C(p):
    if p=='web':
        appr="- **Base:** MUI `Breadcrumbs` with `separator={<Icon name=\"chevron_right\" mirrorInRtl />}`, `maxItems`, `itemsBeforeCollapse={1}`, `itemsAfterCollapse={2}`; replace MUI's collapse button with a Biowave \"…\" item that opens a Biowave Menu.\n- **Items:** a styled `ButtonBase` (as a router link) with B2–B3 tokens; the last item is a `span` with `aria-current=\"page\"`.\n- **App header:** pass `<Breadcrumbs>` as `AppHeader`'s `title`."
        files="3-web-components/src/components/breadcrumbs/Breadcrumbs.tsx · Breadcrumbs.test.tsx · index.ts   new\n3-web-components/src/index.ts · README.md · CHANGELOG.md   change"
        cmd="`npm run test:web`, `npm run typecheck`, `npm run docs:check`"
    else:
        appr="- **Base:** a `Row` of `InkWell` items (B2–B3 tokens, `target-min` constraints), `Icon(Icons.chevron_right, textDirection-aware)` separators, and an M3 `MenuAnchor` behind the \"…\" item.\n- **Portrait:** read the orientation from `MediaQuery` and use `maxItems` 3 unless set."
        files="4-tablet-components/lib/src/components/breadcrumbs/bw_breadcrumbs.dart   new\n4-tablet-components/test/breadcrumbs_test.dart · goldens\n4-tablet-components/lib/biowave_tablet.dart   change: export\n4-tablet-components/README.md · CHANGELOG.md"
        cmd="`cd 4-tablet-components && flutter analyze && flutter test`, `npm run docs:check`"
    return standard_tail(p, BC, cmd, files, "- [ ] The current page has no tap or click handler", f"The {LBL[p]} Breadcrumbs", appr,
        "- The App header (only its `title` content changes)\n- Tabs, Pagination, Stepper (next in the navigation family)")

def D(p):
    head = d_head(p, BC, '**Create new.** Foundations `Breadcrump` page (`Breadcrumb Item` Default · Current · Separator) and the legacy Web `↳ Breadcrumb` (1–6 items) are the content source; they stay untouched',
        'Icon (Material Symbols) and Tooltip in this file; Menu examples are drawn with the Doc Kit until the Menu component exists' + ('; the App header (`Top app bar`) receives a Breadcrumbs instance in its `Title` slot' if p=='web' else ''))
    struct = "```\n❖ Breadcrumbs                    ← set: Items = 2 · 3 · 4 · Collapsed × Language = EN · AR\n  ├─ ❖ .Breadcrumb item           ← private set: State = Default · Hovered · Pressed · Focused · Current · Overflow (TEXT Label)\n  └─ ❖ .Breadcrumb separator      ← private set: Direction = LTR · RTL\n```"
    h = 'size/control/height/sm' if p=='web' else 'size/control/height/md'
    tree = f"""```
Breadcrumbs                ↔ gap spacing/xs · hug · centred
├── ◇ .Breadcrumb item     ↔ height {h} · padding-inline spacing/md · radius/md · T label/md (Default: Devices)
├── ◇ .Breadcrumb separator  chevron_right {'size/icon/md' if p=='web' else 'size/icon/lg'}
├── …
└── ◇ .Breadcrumb item     State=Current (last)
```"""
    props = """| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Items` | VARIANT | `2` · `3` · `4` · `Collapsed` | `3` | `items.length` / `maxItems` | Collapsed = more than `maxItems` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `.Breadcrumb item` › `Label` | TEXT | | `Devices` | `items[].label` | |
| `.Breadcrumb item` › `State` | VARIANT | `Default` · `Hovered` · `Pressed` · `Focused` · `Current` · `Overflow` | `Default` | interaction / last item | |"""
    variants = "- `Breadcrumbs`: Items × Language = **8**; `.Breadcrumb item`: **6**; `.Breadcrumb separator`: **2**"
    notes = ("- 01: Breadcrumbs inside the App header above a page\n- 03: 2 · 3 · 4 items · collapsed with the \"…\" Menu open\n- 07: Desktop and Web narrow (collapsed)" if p=='web' else
             "- 01: Breadcrumbs under the Top app bar on a Tablet frame\n- 03: 2 · 3 · 4 items · collapsed with the Menu open\n- 07: landscape and portrait")
    cc = '`3-web-components/src/components/breadcrumbs/Breadcrumbs.figma.tsx`' if p=='web' else '`4-tablet-components/lib/src/components/breadcrumbs/bw_breadcrumbs.figma.dart`'
    s = head + d_rest(p, BC, struct, tree, props, variants, notes, cc)
    s = s.replace("- The `scrim` is a private base component `.Scrim` (one per file, shared by Dialog, Bottom sheet and Side sheet): a frame filled with `color/overlay/default`, no other properties. Examples place the overlay component on top of it inside a device frame.\n", "")
    s = s.replace("(Button, Icon Button, Divider)", "(Icon, Tooltip)")
    s = s.replace("Opening, dragging, the detents and closing are shown on doc page 04 with B4 timings written next to them.", "Hover, press and focus are shown on doc page 04 with B4 timings written next to them.")
    s = s.replace("The `close` and `check` glyphs do not mirror; `arrow_back` mirrors.", "Items in reverse order; `.Breadcrumb separator` `Direction=RTL` (chevron points left); `more_horiz` does not mirror.")
    return s

for p in ['web','tablet']:
    t = tail(p, BC).replace('Initial (Wave 8 brief, decisions O-01 … O-06)', 'Initial (navigation brief, NV-01 … NV-13)')
    write(p, 'breadcrumbs', header(p, BC) + A + A8[p] + A_tail + B(p) + C(p) + D(p) + t)
print('ok')
