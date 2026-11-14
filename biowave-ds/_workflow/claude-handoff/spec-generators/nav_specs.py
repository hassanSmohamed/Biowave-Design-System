import sys; sys.path.insert(0, sys.path[0])
from common import *
from sheets import standard_tail, d_rest

DATE='2026-11-13'
def fix_date(s): return s

# ====================== PRIMARY NAVIGATION ======================
PN = dict(name='Primary navigation', ar='التنقل الرئيسي', slug='primary-navigation',
  summary='Moves the user between the top-level sections (modules) of the product: side navigation on Web, navigation rail on Tablet, navigation bar on Mobile, and a modal drawer when there is no room.',
  summary_ar='ينقل المستخدم بين الأقسام الرئيسية (الوحدات) في المنتج: تنقل جانبي على الويب، وشريط تنقل جانبي على الجهاز اللوحي، وشريط تنقل سفلي على الجوال، ودرج منبثق عند ضيق المساحة.',
  parts='Container · collapse handle · module switcher · item · icon · label · count · badge · drawer · scrim',
  parts_ar='الحاوية · زر الطي · مبدّل الوحدات · العنصر · الأيقونة · التسمية · العدد · الشارة · الدرج · الطبقة المعتمة',
  built_on={'web':'Custom on MUI `Drawer` (`variant="permanent"` for the side navigation, `"temporary"` for the modal drawer) + MUI `List` / `ListItemButton`, styled from semantic tokens',
            'tablet':'Flutter M3 `NavigationRail` (+ `NavigationDrawer` in `showModalBottomSheet`-free `Drawer` route for the modal drawer), styled from semantic tokens',
            'mobile':'Flutter adaptive (N-07): iOS → `CupertinoTabBar` (iOS and iPadOS 27 floating tab bar look); Android → M3 `NavigationBar` and `NavigationDrawer`'},
  **{'import':{'web':"`import { SideNavigation, NavigationDrawer } from '@biowave/web'`",
               'tablet':'`BwNavigationRail`, `BwNavigationDrawer` from `package:biowave_tablet/biowave_tablet.dart`',
               'mobile':'`BwNavigationBar`, `BwNavigationDrawer` from `package:biowave_mobile/biowave_mobile.dart`'}})

PN_A = """## A · Guidelines

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

"""

PN_A8 = {
'web': """### A8 Platform notes — Web

| | Web |
|---|---|
| Forms | Side navigation open (`layout-width-sidebar-start`) or collapsed (`layout-width-sidebar-start-collapsed`) on wide windows; below the Desktop breakpoint it becomes the modal drawer opened from the App header menu button |
| Levels | Two (module section → page); a third level becomes Tabs on the page (NV-03) |
| Header | Logo and the collapse button; Module switcher under it (NV-04) |
| Interaction | Pointer + keyboard; collapsed items show their names in Tooltips |
""",
'tablet': """### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Forms | Navigation rail in both orientations (`layout-width-sidebar-start` = 80, NV-05); the menu button at the top opens the modal Navigation drawer with all sections, sub-pages and the footer |
| Items | 3–7 destinations, icon over a short label; selected = pill indicator behind the icon |
| Interaction | Touch, plus hardware keyboard |
""",
'mobile': """### A8 Platform notes — Mobile

The navigation bar is **native** on each OS (N-01) in Biowave colours and type (NV-06).

```
iOS — iOS and iPadOS 27 Tab bar                 Android — Material 3 Navigation bar
   ╭───────────────────────────────────╮        ┌──────────────────────────────────────┐
   │ (▦)   ▤⁵    ▥     ◆     ●        │        │ ▐ ▦ ▌   ▤⁵     ▥      ◆      ●      │
   │ Home Requests Reports Position …   │        │ Home  Requests Reports Position Prof │
   ╰───────────────────────────────────╯        └──────────────────────────────────────┘
   floating capsule above the home indicator    full width, pill indicator behind the icon
```

| | iOS | Android |
|---|---|---|
| Bar | Floating capsule tab bar; selected tab = highlighted pill, brand icon and label | M3 navigation bar; selected = pill indicator behind a filled icon, brand label |
| More than 5 sections | A "More" tab lists the rest | The menu button in the Top app bar opens the M3 Navigation drawer |
| Hidden | In focused flows, sheets and full-screen forms | Same |
"""}

PN_A_tail = """
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

"""

def pn_B(p):
    if p=='web':
        api="""#### SideNavigation
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `modules` | `NavModule[]` | `{ id, label, icon, locked?, items: NavItem[] }` | — | ✓ | Level 1 (module switcher) |
| `moduleId` | string | | — | ✓ | Current module |
| `onModuleChange` | `(id) => void` | | — | ✓ | |
| `items` | `NavItem[]` | `{ id, label, icon, href, count?, badge? }` — pages of the current module | — | ✓ | Level 2 |
| `selectedId` | string | | — | ✓ | Current page |
| `collapsed` | boolean | | `false` | | A4.1 `collapsed` |
| `onCollapsedChange` | `(collapsed) => void` | | — | | Collapse button |
| `variant` | enum | `permanent` · `modal` | `permanent` | | `modal` = the drawer form below the Desktop breakpoint |
| `open` · `onClose` | boolean · callback | | | with `modal` | Drawer open state |

`NavigationDrawer` is `SideNavigation variant="modal"` re-exported for clarity."""
        inv="""| Combination | Fallback |
|---|---|
| an item with both `count` and `badge` | warn; the badge wins |
| a `locked` module chosen | the switcher shows the upgrade message (not a warning) |
| `collapsed` with `variant="modal"` | ignored — the drawer is always open width |
| more than one item matching `selectedId` | warn; the first is selected |"""
    elif p=='tablet':
        api="""#### BwNavigationRail
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
| `selectedId` | `String` | | — | ✓ | |"""
        inv="""| Combination | Fallback |
|---|---|
| fewer than 3 or more than 7 `destinations` | assert; release renders them |"""
    else:
        api="""#### BwNavigationBar
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `destinations` | `List<BwNavDestination>` | `label`, `icon`, `selectedIcon`, `badge` | — | ✓ | 3–5 |
| `selectedIndex` | `int` | | — | ✓ | |
| `onDestinationSelected` | `ValueChanged<int>` | | — | ✓ | |

The OS form comes from `Theme.of(context).platform` (N-07): iOS → `CupertinoTabBar`; Android → M3 `NavigationBar`. No `os` param.

#### BwNavigationDrawer (Android)
Same API as Tablet; on iOS the extra sections go in a "More" destination instead (A8)."""
        inv="""| Combination | Fallback |
|---|---|
| fewer than 3 or more than 5 `destinations` | assert; release renders the first 5 |
| `BwNavigationDrawer` shown on iOS | assert "use a More tab on iOS"; release shows it |"""
    if p=='web':
        dims="""```
├──────── layout-width-sidebar-start 248 (open) · layout-width-sidebar-start-collapsed 96 ────────┤
┌───────────────────────────────┐◯  fill color-surface-subtle · border-inline-end color-border-subtle · collapse-handle size-icon-lg, radius-full
│ [▣ Devices              ⇕]  │   module area: padding-block spacing-3xl · padding-inline spacing-md
│                              │   module-switcher: height size-control-height-lg · padding spacing-lg / spacing-xl · radius-md · border color-border-default
│ ▐⇄ All devices          12▌ │   item: height size-control-height-md · padding-inline spacing-xl · gap spacing-md · radius-md · icon size-icon-sm
│   ▦ Biometric terminal  12  │   list: padding-inline spacing-xl · gap spacing-md
│   ▦ Board controller    12  │   count: body-md · color-text-subtle
└───────────────────────────────┘
```

| Part | Property | Token |
|---|---|---|
| container | width | `layout-width-sidebar-start` · collapsed `layout-width-sidebar-start-collapsed` |
| container | fill · border | `color-surface-subtle` (the product's grey menu) · inline-end `border-width-default` `color-border-subtle` |
| collapse-handle | size · radius · fill · border · icon | `size-icon-lg` · `radius-full` · `color-surface-default` · `color-border-default` · `left_panel_close` / `left_panel_open` `size-icon-sm` (mirrors); centred on the inline-end border, `spacing-3xl` below the top |
| module area | padding-block · padding-inline | `spacing-3xl` · `spacing-md` |
| module-switcher | height · padding-block · padding-inline · gap · radius · fill · border | `size-control-height-lg` · `spacing-lg` · `spacing-xl` · `spacing-md` · `radius-md` · `color-surface-default` · `color-border-default`; module icon `size-icon-lg`, label `label-lg`, `unfold_more` `size-icon-sm` |
| list | padding-inline · gap | `spacing-xl` · `spacing-md` |
| item | height · padding-inline · gap · radius | `size-control-height-md` · `spacing-xl` · `spacing-md` · `radius-md` |
| icon | size | `size-icon-sm` (Material Symbols Rounded) |
| label | text style | `body-md` (default) · `label-lg` (selected — the heavier weight is the non-colour cue) |
| count | text style | `body-md` · `color-text-subtle`, at the inline end |
| badge | | Badge `Count`, `Ring=Off`, at the inline end (instead of `count`) |
| collapsed | item | width `size-control-height-lg`, icon only, centred; module switcher icon + `unfold_more`; Tooltip with the label |
| module Menu | | Biowave Menu, rows `size-control-height-xl`; locked modules end with `lock` `size-icon-sm` `color-icon-subtle` |
| drawer (modal) | width · radius · elevation · scrim | `layout-width-sidebar-start` · `radius-4xl` on the inline-end corners · `elevation-4` · `color-overlay-default` |"""
    elif p=='tablet':
        dims="""```
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
| drawer | width · content | `size-container-xxs` · module switcher + page items as the Web side navigation | `NavigationDrawer` |"""
    else:
        dims="""```
iOS — iOS and iPadOS 27 Tab bar                      Android — M3 Navigation bar
   ╭───────────────────────────────────╮             ┌────────────────────────────────────┐  height layout-height-app-bar
   │ (▦)   ▤⁵    ▥     ◆     ●        │  radius-full │ ▐ ▦ ▌   ▤⁵     ▥      ◆      ●    │  fill color-surface-default
   │ Home Requests Reports Position …   │  elevation-2 │ Home  Requests Reports Position Prof│  border-top color-border-subtle
   ╰───────────────────────────────────╯             └────────────────────────────────────┘
   inset spacing-xl · padding spacing-xs             indicator size-control-height-sm × (icon + spacing-xl each side)
```

| Part | Property | iOS | Android |
|---|---|---|---|
| container | shape · fill | floating capsule, `radius-full`, inset `spacing-xl` from the screen sides and above the home indicator, `color-surface-raised` + `elevation-2` (the OS adds its glass material) | full width, `color-surface-default`, top border `color-border-subtle`, height `layout-height-app-bar` |
| item | layout | icon over label, equal width, padding-block `spacing-xs` | icon over label, equal width |
| selected | | pill `color-background-selected-default` around icon + label (`radius-full`), icon filled `color-icon-role-brand`, label `color-text-role-brand` | indicator pill behind the icon (`size-control-height-sm` high, `radius-full`, `color-background-selected-default`), icon filled `color-icon-role-brand`, label `color-text-role-brand` |
| icon | | `size-icon-lg` `color-icon-default` | `size-icon-lg` `color-icon-default` |
| label | | `label-sm` `color-text-subtle` | `label-md` `color-text-subtle` |
| badge | | Badge on the icon's top-end corner | same |
| drawer | | — ("More" tab) | M3 `NavigationDrawer`, width `size-container-xxs`, as Tablet |"""
    tokens="""| Part | Property | Default | Hover | Pressed | Selected |
|---|---|---|---|---|---|
| container | fill | `color-surface-default`""" + (" (iOS: `color-surface-raised`)" if p=='mobile' else "") + """ | — | — | — |
| item | fill | transparent | `color-background-transparent-hovered` | `color-background-transparent-pressed` | `color-background-selected-default` (hover `-hovered`, pressed `-pressed`) |
| item | icon | `color-icon-default` | — | — | `color-icon-role-brand` (rail and bar: filled glyph) |
| item | label | `color-text-subtle` | `color-text-default` | — | `color-text-role-brand` |
| count | text | `color-text-subtle` | — | — | `color-text-subtle` |
| divider · border | stroke | `color-border-subtle` | — | — | — |
| drawer | fill · scrim | `color-surface-raised` · `color-overlay-default` | — | — | — |

Focus: the item keeps the foundations focus ring (`color-border-focus`). Dark theme: same tokens."""
    if p=='web':
        a11y="""| Requirement | Implementation |
|---|---|
| Landmark | `<nav aria-label="Main">` |
| Current | Selected item `aria-current="page"` |
| Module switcher | `<button aria-haspopup="menu">` named "Module: Devices"; locked modules `aria-disabled` with "locked" in the name |
| Collapsed | Each item keeps `aria-label` = label; Tooltip on hover and focus |
| Drawer | `role="dialog"` modal, focus trapped, Esc closes, focus returns to the menu button |
| Skip link | The App shell provides "Skip to content" before the navigation |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Moves through the items |
| Enter / Space | Opens the item; on the switcher, opens the module Menu |
| Esc | Closes the drawer |"""
    else:
        a11y="""| Requirement | Implementation |
|---|---|
| Semantics | Each destination `Semantics(button: true, selected: …, label: label + badge text)`; the bar / rail is a `Semantics(container: true, explicitChildNodes: true)` |
| Target size | ≥ 48dp (`meetsGuideline`) |
| Drawer | Modal route, focus inside, back / Esc closes |
| Screen reader output | "Requests, 5 new, tab 2 of 5, selected" |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / arrows | Move between destinations |
| Enter / Space | Select |"""
    tests="""- [ ] Light + dark · en + ar: every part uses the B2–B3 tokens""" + (" on iOS and Android" if p=='mobile' else "") + """
- [ ] Selected item: fill, filled icon and brand label; announced as current
- [ ] Badge text included in the accessible name
- [ ] RTL: the navigation sits at the inline start (right) and chevrons mirror
- [ ] Every invalid combination in B1 warns / asserts
- [ ] a11y: """ + ("axe on the side navigation open, collapsed and as drawer" if p=='web' else "`meetsGuideline` tap target and contrast") + """
- [ ] No raw values"""
    return f"""## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

{api}

**Invalid combinations** ({'`console.warn` in development' if p=='web' else '`assert` in debug'}):
{inv}

### B2 Dimensions

{dims}

### B3 Tokens by part and state

Every value is a semantic token; there is no `primary-navigation.tokens.json`.

{tokens}

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover / Pressed | pointer / touch | item fill | `motion-duration-sm` | `motion-easing-standard` |
| Item → Selected | select | fill, icon glyph, label colour | `motion-duration-md` | `motion-easing-standard` |
""" + ("| Open ↔ Collapsed (side navigation) | collapse button | width | `motion-duration-lg` | `motion-easing-emphasized-decelerate` |\n" if p=='web' else "") + """| Drawer open / close | menu button / scrim, Esc, back | slide from the inline start, scrim fade | `motion-duration-lg` in · `motion-duration-md` out | `motion-easing-emphasized-decelerate` · `-accelerate` |

Reduced motion: all become `motion-duration-instant`.""" + (" iOS tab bar selection follows the OS." if p=='mobile' else "") + f"""

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

{a11y}

### B7 Examples

See C3 for the structure; examples live in the docs page 03 Variations and 07 Platform.

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

{tests}

---

"""

def pn_C(p):
    pkg='biowave_'+p
    if p=='web':
        appr="- **Base:** MUI `Drawer` `variant` permanent / temporary; content: module switcher (Biowave Menu trigger) + MUI `List` with `ListItemButton` per page (Biowave styles); Biowave `Tooltip` around collapsed items; width from the layout tokens; the collapse handle is a round control positioned on the inline-end border.\n- **Selection:** compare `selectedId` with item ids.\n- **Responsive:** the App shell decides permanent vs modal (`useMediaQuery` on the Desktop breakpoint); this component only renders what it is told."
        files="3-web-components/src/components/primary-navigation/SideNavigation.tsx   new (SideNavigation, NavigationDrawer)\n3-web-components/src/components/primary-navigation/SideNavigation.test.tsx\n3-web-components/src/components/primary-navigation/index.ts\n3-web-components/src/index.ts   change: export\n3-web-components/README.md · CHANGELOG.md"
        cmd="`npm run test:web`, `npm run typecheck`, `npm run docs:check`"
    else:
        appr=("- **Base:** M3 `NavigationRail` themed from tokens; `BwNavigationDrawer` wraps M3 `NavigationDrawer` (module switcher header + `NavigationDrawerDestination` per page) in a modal `Drawer` route sliding from the inline start." if p=='tablet' else
              "- **Base (N-07):** branch on `Theme.of(context).platform`: iOS → `CupertinoTabBar` themed with Biowave colours and `context.bw.text` (if the Flutter version still draws the pre-iOS 26 flat tab bar, keep it and report — decision O-07); Android → M3 `NavigationBar` themed from tokens.\n- **Drawer (Android):** M3 `NavigationDrawer` as Tablet.")
        files=f"{SEC[p]}/lib/src/components/primary_navigation/" + ("bw_navigation_rail.dart · bw_navigation_drawer.dart" if p=='tablet' else "bw_navigation_bar.dart · bw_navigation_drawer.dart") + f"   new\n{SEC[p]}/test/primary_navigation_test.dart · goldens\n{SEC[p]}/lib/{pkg}.dart   change: export\n{SEC[p]}/README.md · CHANGELOG.md"
        cmd=f"`cd {SEC[p]} && flutter analyze && flutter test`, `npm run docs:check`"
    return standard_tail(p, PN, cmd, files, "- [ ] Selection survives a rebuild and RTL", f"The {LBL[p]} forms of Primary navigation", appr,
        "- Top app bar (its own spec) and the App shell layout\n- Tabs, Breadcrumbs (next in the navigation family)")

def pn_D(p):
    head=d_head(p, PN, '**Create new.** Legacy Web `↳ Navigation Menu` (`Nav Item`, `Modules`, module dropdown) and Mobile `↳ Navigation Bar` (`Bars Icons`) are the content source; they stay in `_Deprecation Ground` untouched' + ('; iOS and iPadOS 27 `Tab Bar - iPhone` and M3 `Navigation Bar` measured as references' if p=='mobile' else ('; M3 `Navigation Rail` and `Navigation Drawer` as references' if p=='tablet' else '')),
        'Badge, Tooltip, Icon Button, Avatar, Divider sets in this file; `.Scrim` from the Dialog page (drawer examples)')
    if p=='web':
        struct="```\n❖ Side navigation                ← set: State = Expanded · Collapsed · Language = EN · AR\n  ├─ ❖ .Nav item                  ← private set: Form = Expanded · Collapsed × State = Default · Hovered · Selected (TEXT Label · Count, BOOLEAN Show count)\n  ├─ ❖ .Module switcher           ← private set: Form = Expanded · Collapsed\n  └─ ◇ .Collapse handle           ← private\n```"
        tree="""```
Side navigation            ↕ width layout/width/sidebar/start (Collapsed: …-collapsed) · height 896 sample · fill color/surface/subtle · stroke inline-end color/border/subtle
├── module-area            ↕ padding-block spacing/3xl · padding-inline spacing/md · ◇ .Module switcher (fill)
├── list                   ↕ padding-inline spacing/xl · gap spacing/md · ◇ .Nav item × 6 (Devices: All devices · Biometric terminal · Board controller · Tablet · Lock · Hub; one Selected)
└── collapse-handle        ◇ .Collapse handle (absolute, on the inline-end border)
```"""
        props="""| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `State` | VARIANT | `Expanded` · `Collapsed` | `Expanded` | `collapsed` | `false` · `true` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | provider |
| `.Module switcher` › `Module` | TEXT | | `Devices` | `modules[moduleId].label` | |
| `.Nav item` › `Label` · `Count` · `Show count` | TEXT · TEXT · BOOLEAN | | | `items[]` | |"""
        variants="- `Side navigation`: State × Language = **4**; `.Nav item`: Level × State (+ Expandable) private\n- Modal drawer form: documented with an instance over `.Scrim` (page 07), not a separate set"
        notes="- 01: open and collapsed side navigation in a Desktop frame\n- 03: open · collapsed (with Tooltip) · module Menu with locked modules · modal drawer below Desktop\n- 07: Desktop + Web narrow (drawer)"
    elif p=='tablet':
        struct="```\n❖ Navigation rail                ← set: Language = EN · AR\n❖ Navigation drawer              ← set: Language = EN · AR\n  ├─ ❖ .Rail item                 ← private: Selected = true · false\n  └─ ❖ .Nav item                  ← private (as Web)\n```"
        tree="""```
Navigation rail            ↕ width layout/width/sidebar/start · height 640 sample · fill color/surface/default · stroke inline-end · padding-block spacing/lg · gap spacing/lg · centred
├── menu-button            ◇ Icon Button (menu)
└── items                  ◇ .Rail item × 5 (icon in indicator pill + label/md)
Navigation drawer          ↕ width size/container/xxs · radius/4xl inline-end · Elevation/4 · fill color/surface/raised · padding spacing/md
├── module-switcher        ◇ .Module switcher
└── items                  ◇ .Nav item × 6
```"""
        props="""| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Menu button` | BOOLEAN | | `true` | `onMenuPressed` | |
| `.Rail item` › `Label` · `Icon` · `Selected` · `Badge` | | | | `destinations[]` | |"""
        variants="- `Navigation rail`: Language = **2** · `Navigation drawer`: Language = **2**"
        notes="- 01: rail on a Tablet landscape frame\n- 03: rail · rail with badge · drawer over the scrim\n- 07: landscape and portrait"
    else:
        struct="```\n❖ Navigation bar                 ← set: OS = iOS · Android · Language = EN · AR\n❖ Navigation drawer              ← set (Android): Language = EN · AR\n  ├─ ❖ .Tab item                  ← private: OS × Selected\n  └─ ❖ .Nav item                  ← private (drawer rows)\n```"
        tree="""```
Navigation bar (iOS)       ↔ capsule · radius/full · fill color/surface/raised · Elevation/2 · padding spacing/xs · width 360 − 2 × spacing/xl sample
└── ◇ .Tab item × 5        ↕ icon size/icon/lg + label/sm; selected pill color/background/selected/default radius/full
Navigation bar (Android)   ↔ full width · height layout/height/app-bar · fill color/surface/default · stroke top color/border/subtle
└── ◇ .Tab item × 5        ↕ indicator pill (size/control/height/sm, padding-inline spacing/xl) + label/md
Navigation drawer          as Tablet
```"""
        props="""| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `OS` | VARIANT | `iOS` · `Android` | `iOS` | — | `Theme.platform` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `.Tab item` › `Label` · `Icon` · `Selected` · `Badge` | | | | `destinations[]` | |"""
        variants="- `Navigation bar`: OS × Language = **4** · `Navigation drawer` (Android): Language = **2**"
        notes="- 01: iOS and Android bars on phone frames\n- 03: 3 · 4 · 5 destinations, badge, drawer (Android)\n- 07: iPhone and Android side by side"
    cc=('`3-web-components/src/components/primary-navigation/SideNavigation.figma.tsx`' if p=='web' else f'`{SEC[p]}/lib/src/components/primary_navigation/*.figma.dart`')
    return head + d_rest(p, PN, struct, tree, props, variants, notes, cc)

for p in ['web','tablet','mobile']:
    write(p,'primary-navigation', header(p,PN)+PN_A+PN_A8[p]+PN_A_tail+pn_B(p)+pn_C(p)+pn_D(p)+tail(p,PN))

# ====================== TOP APP BAR ======================
TB = dict(name='Top app bar', ar='شريط التطبيق العلوي', slug='top-app-bar',
  summary='The bar at the top of every screen: on Web the app header (search, notifications, profile); on Tablet and Mobile the screen title with back and screen actions.',
  summary_ar='الشريط أعلى كل شاشة: على الويب رأس التطبيق (البحث والإشعارات والملف الشخصي)، وعلى الجهاز اللوحي والجوال عنوان الشاشة مع الرجوع وإجراءات الشاشة.',
  parts='Container · leading button · title · subtitle · search · actions · notifications · profile',
  parts_ar='الحاوية · الزر البادئ · العنوان · العنوان الفرعي · البحث · الإجراءات · الإشعارات · الملف الشخصي',
  built_on={'web':'Custom on MUI `AppBar` + `Toolbar` (position static inside the App shell), Biowave Search field, Icon button, Badge, Avatar, Menu',
            'tablet':'Flutter M3 `AppBar` (small) and `SliverAppBar.large` (large title), styled from semantic tokens',
            'mobile':'Flutter adaptive (N-07): iOS → `CupertinoNavigationBar` / `CupertinoSliverNavigationBar` (large title); Android → M3 `AppBar` / `SliverAppBar.large`'},
  **{'import':{'web':"`import { AppHeader } from '@biowave/web'`",
               'tablet':'`BwTopAppBar` from `package:biowave_tablet/biowave_tablet.dart`',
               'mobile':'`BwTopAppBar` from `package:biowave_mobile/biowave_mobile.dart`'}})

TB_A = """## A · Guidelines

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

"""
TB_A8={
'web':"""### A8 Platform notes — Web

| | Web |
|---|---|
| Form | App header, height `layout-height-app-bar`, above the main content and beside the side navigation |
| Content | Logo block (`layout-width-sidebar-start`), Breadcrumbs, quick-add (+), inbox and notifications with Badges, profile menu; search optional |
| Narrow windows | Menu button opens the navigation drawer; search collapses to an Icon button |
""",
'tablet':"""### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Form | Small and Large (N-03: one Biowave design) |
| Leading | Back on inner screens; menu in portrait when the rail is hidden |
| Actions | Up to two + overflow |
""",
'mobile':"""### A8 Platform notes — Mobile

Native on each OS (N-01), Biowave colours and type.

```
iOS — iOS and iPadOS 27 navigation bar          Android — M3 App bar
 (‹)        Shift details        (✎ ⋮)           [←]  Shift details              [✎] [⋮]
 round back · centred title · grouped actions     arrow back · start title · icon actions
 Large: (‹)                       (✎ ⋮)           Large: [←]                     [✎] [⋮]
        Shift details  (big, start)                      Shift details (big)
```

| | iOS | Android |
|---|---|---|
| Small | Round back button, centred title, actions grouped in a capsule | Arrow back, start-aligned title, Icon buttons |
| Large | Large title under the bar, start-aligned; shrinks on scroll | M3 large app bar; collapses on scroll |
| Menu | — (no drawer on iOS) | Menu button opens the Navigation drawer |
"""}
TB_A_tail="""
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

"""

def tb_B(p):
    if p=='web':
        api="""#### AppHeader
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `title` | `ReactNode` | text now, Breadcrumbs later | — | ✓ | `title` |
| `logo` | `ReactNode` | | Biowave logo | | `logo` |
| `search` | `ReactNode` | a Biowave `SearchField` | — | | optional |
| `onQuickAdd` | `() => void` | | — | | (+) Icon button |
| `inbox` · `notifications` | `{ count: number; onClick }` | | — | | Icon buttons with Badges (`max` 99 → "99+") |
| `user` | `{ name: string; avatar?: string; menu: ReactNode }` | | — | | `profile` |
| `onMenuClick` | `() => void` | | — | | Shows the menu button (narrow windows) |"""
    else:
        api="""#### BwTopAppBar
| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `title` | `String` | | — | ✓ | |
| `size` | `BwTopAppBarSize` | `small` · `large` | `small` | | A4.1 |
| `leading` | `BwTopAppBarLeading` | `back` · `menu` · `none` | `none` | | A4.2 |
| `actions` | `List<BwAppBarAction>` | `icon`, `tooltip`, `onPressed` | `[]` | | A4.3 — more than 2 go to the overflow Menu |""" + ("\n\nOS form from `Theme.of(context).platform` (N-07)." if p=='mobile' else "")
    if p=='web':
        dims="""| Part | Property | Token |
|---|---|---|
| container | height · fill · padding-inline-end · gap | `layout-height-app-bar` · `color-surface-subtle` · `spacing-xl` · `spacing-xl` |
| container | border-bottom | `border-width-default` `color-border-subtle` (always on Web) |
| logo block | width · padding-inline | `layout-width-sidebar-start` · `spacing-xl` (lines up with the side navigation) |
| title | | Breadcrumbs (slot); until built, `label-lg` text |
| actions | gap | `spacing-lg` inside the group; `spacing-3xl` between the group and the profile |
| quick-add · inbox · notifications | | Icon button `md`; Badge `Count` on inbox and notifications (99+) |
| profile | | Avatar `md` + name `label-lg` + `expand_more` `size-icon-lg` · gap `spacing-lg` |"""
    elif p=='tablet':
        dims="""| Part | Property | Token | Flutter |
|---|---|---|---|
| container | height · fill · padding-inline · gap | `layout-height-app-bar` · `color-surface-default` · `spacing-md` · `spacing-md` | `toolbarHeight`, `backgroundColor`, `surfaceTintColor: transparent` |
| title (small) | style | `title-lg` | `titleTextStyle` |
| title (large) | style · padding | `heading-lg` · padding-inline `spacing-xl`, padding-bottom `spacing-xl` | `SliverAppBar.large` |
| leading · actions | | Icon button `transparent neutral md` | `BwIconButton` |
| scrolled | border-bottom | `color-border-subtle` | `scrolledUnderElevation: 0` + bottom border |"""
    else:
        dims="""| Part | Property | iOS | Android |
|---|---|---|---|
| container | height · fill | `layout-height-app-bar` · transparent over `color-surface-default` (OS material on scroll) | `layout-height-app-bar` · `color-surface-default` |
| leading | | round button `size-control-height-md`, `radius-full`, `color-background-transparent-hovered`, `chevron_left` | Icon button `transparent neutral md`, `arrow_back` |
| title (small) | | `title-lg`, centred | `title-lg`, start |
| title (large) | | `heading-lg`, start, below the bar, padding-inline `spacing-xl` | `heading-lg`, start, below the bar, padding-inline `spacing-xl` |
| actions | | grouped capsule (`radius-full`, `color-background-transparent-hovered`, gap `spacing-xs`) of icons `size-icon-lg` | Icon buttons, gap `spacing-xs` |
| padding-inline | | `spacing-xl` | `spacing-xs` |"""
    return f"""## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

{api}

**Invalid combinations** ({'`console.warn` in development' if p=='web' else '`assert` in debug'}):
| Combination | Fallback |
|---|---|
| """ + ("`onMenuClick` on wide windows | the App shell hides the menu button |" if p=='web' else "more than 2 `actions` | extra ones go to the overflow Menu (no warning) |\n| `leading: menu` on iOS" + (" | assert; release shows back or none |" if p=='mobile' else " | allowed |")) + f"""

### B2 Dimensions

{dims}

### B3 Tokens by part and state

Every value is a semantic token; there is no `top-app-bar.tokens.json`. Nested Icon button, Badge, Avatar and Search field carry their own.

| Part | Property | Default | Scrolled |
|---|---|---|---|
| container | fill | `color-surface-default` | same""" + (" (iOS: OS material)" if p=='mobile' else "") + """ |
| container | border-bottom | """ + ("`color-border-subtle`" if p=='web' else "none") + """ | `color-border-subtle` |
| title | colour | `color-text-default` | — |

Dark theme: same tokens.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Scrolled | content scrolls under the bar | border / material; large title shrinks into the bar | `motion-duration-md` | `motion-easing-standard` |

Reduced motion: instant.""" + (" iOS follows the OS." if p=='mobile' else "") + f"""

### B5 RTL

| Part | In RTL |
|---|---|
| layout | Mirrors: leading button and title on the right, actions on the left |
| back icon | Mirrors (`arrow_back` / `chevron_left` point right) |
| other icons | Do not mirror |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | """ + ("`<header>` (banner landmark); search `role=\"search\"`; `/` focuses search" if p=='web' else "`Semantics(header: true)` on the title; back button label \"Back\" / \"رجوع\"") + """ |
| Names | Every Icon button has a Tooltip / label |
| Notifications | "Notifications, 5 new" |
| Target size | ≥ platform minimum |

### B7 Examples

See the docs pages 03 and 07.

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: B2–B3 tokens""" + (" on iOS and Android" if p=='mobile' else "") + """
- [ ] Scrolled state shows the border (and Large collapses to Small)
- [ ] RTL mirrors the layout and the back icon
- [ ] Every icon has an accessible name
- [ ] No raw values

---

"""

def tb_C(p):
    pkg='biowave_'+p
    if p=='web':
        appr="- **Base:** MUI `AppBar position=\"static\" elevation={0}` + `Toolbar`, Biowave Search field, Icon buttons, Badge, Avatar + Menu.\n- **Shortcut:** `/` focuses the search unless focus is in a field."
        files="3-web-components/src/components/top-app-bar/AppHeader.tsx · AppHeader.test.tsx · index.ts   new\n3-web-components/src/index.ts · README.md · CHANGELOG.md   change"
        cmd="`npm run test:web`, `npm run typecheck`, `npm run docs:check`"
    else:
        appr=("- **Base:** M3 `AppBar` (small) and `SliverAppBar.large` themed from tokens; overflow with `MenuAnchor` + Biowave Menu." if p=='tablet' else
              "- **Base (N-07):** iOS → `CupertinoNavigationBar` / `CupertinoSliverNavigationBar` with Biowave colours and `context.bw.text` (keep the framework look if it is older than iOS 27 and report — O-07); Android → M3 `AppBar` / `SliverAppBar.large`.")
        files=f"{SEC[p]}/lib/src/components/top_app_bar/bw_top_app_bar.dart   new\n{SEC[p]}/test/top_app_bar_test.dart · goldens\n{SEC[p]}/lib/{pkg}.dart · README.md · CHANGELOG.md   change"
        cmd=f"`cd {SEC[p]} && flutter analyze && flutter test`, `npm run docs:check`"
    return standard_tail(p, TB, cmd, files, "- [ ] Overflow Menu receives the third and later actions", f"The {LBL[p]} Top app bar", appr, "- Breadcrumbs (next), Tabs under the bar\n- The App shell layout")

def tb_D(p):
    head=d_head(p, TB, '**Create new.** Legacy Web `↳ Top Navigation Bar` and Mobile `↳ Top App Bar` (`_Top app bar` 5 types) are the content source' + ('; iOS and iPadOS 27 `Toolbar - Top - iPhone` and M3 `App bar` measured as references' if p=='mobile' else ''),
        'Icon Button, Badge, Avatar' + (', Search field' if p=='web' else '') + ' sets in this file')
    if p=='web':
        struct="```\n❖ App header                     ← set: Language = EN · AR\n```"
        tree="""```
App header                 ↔ width 1440 sample · height layout/height/app-bar · padding-inline-end spacing/xl · gap spacing/xl · fill color/surface/subtle · stroke bottom color/border/subtle
├── logo-block             ↔ width layout/width/sidebar/start · padding-inline spacing/xl · BioWave logo
├── title                  ▢ SLOT `Title` (default T label/lg) — Breadcrumbs go here
├── spacer
├── actions                ↔ gap spacing/lg · ◇ Icon Button add · ◇ Icon Button mail + Badge · ◇ Icon Button notifications + Badge
└── profile                ↔ gap spacing/lg · ◇ Avatar md + T label/lg + expand_more
```"""
        props="| Figma property | Type | Values | Default | Code prop | Code value |\n|---|---|---|---|---|---|\n| `Language` | VARIANT | `EN` · `AR` | `EN` | — | |\n| `Title` | SLOT | text or Breadcrumbs | | `title` | |\n| `Quick add` · `Inbox` · `Notifications` | BOOLEAN | | `true` | `onQuickAdd` · `inbox` · `notifications` | |"
        variants="- Language = **2**"
        notes="- 01: app header above a page, with the side navigation\n- 03: full header · without quick-add · narrow (menu button opens the drawer)\n- 07: Desktop and Web narrow"
    else:
        os=p=='mobile'
        struct="```\n❖ Top app bar                    ← set: "+("OS = iOS · Android · " if os else "")+"Size = Small · Large · Language = EN · AR\n"+("  └─ ◇ .Top app bar/ios-button    ← private round button (back) and capsule (actions)\n" if os else "")+"```"
        tree="""```
Top app bar (Small)        ↔ height layout/height/app-bar · padding-inline spacing/md · gap spacing/md · fill color/surface/default
├── leading-button         ◇ Icon Button (arrow_back) · BOOLEAN `Leading`
├── title                  T title/lg · fill · TEXT `Title` (EN)
└── actions                ◇ Icon Button × 2 (edit, more_vert)
Top app bar (Large)        ↕ the Small row without title + T heading/lg title row (padding-inline spacing/xl, padding-bottom spacing/xl)
```""" + ("\niOS: leading = round `.Top app bar/ios-button`, title centred, actions in a capsule." if os else "")
        props="| Figma property | Type | Values | Default | Code prop | Code value |\n|---|---|---|---|---|---|\n"+("| `OS` | VARIANT | `iOS` · `Android` | `iOS` | — | `Theme.platform` |\n" if os else "")+"| `Size` | VARIANT | `Small` · `Large` | `Small` | `size` | |\n| `Language` | VARIANT | `EN` · `AR` | `EN` | — | |\n| `Title` | TEXT | | `Shift details` | `title` | EN variants |\n| `Leading` | BOOLEAN | | `true` | `leading` | back / none |"
        variants="- "+("OS × " if os else "")+"Size × Language = **"+("8" if os else "4")+"**"
        notes="- 01: small and large on a "+("phone (iOS and Android)" if os else "Tablet frame")+"\n- 03: small · large · scrolled · with menu\n- 07: "+("iPhone and Android" if os else "landscape and portrait")
    cc=('`3-web-components/src/components/top-app-bar/AppHeader.figma.tsx`' if p=='web' else f'`{SEC[p]}/lib/src/components/top_app_bar/bw_top_app_bar.figma.dart`')
    return head + d_rest(p, TB, struct, tree, props, variants, notes, cc)

for p in ['web','tablet','mobile']:
    write(p,'top-app-bar', header(p,TB)+TB_A+TB_A8[p]+TB_A_tail+tb_B(p)+tb_C(p)+tb_D(p)+tail(p,TB))
print('ok')
