import os
P=os.path.join(os.path.dirname(os.path.abspath(__file__)),'nav_specs.py')
s=open(P).read()
def rep(a,b):
    global s
    if a in s: s=s.replace(a,b); return
    ea=a.replace('\n','\\n'); eb=b.replace('\n','\\n')
    if ea in s: s=s.replace(ea,eb); return
    if b in s or eb in s: return
    raise AssertionError('MISSING: '+a[:90])
rep("""Side navigation (Web)               Navigation rail (Tablet)     Navigation bar (Mobile)
┌──────────────────────┐            ┌──────┐
│ ①Biowave       [⇤]  │            │ [≡]  │
│ ②[▦ Workforce   ⇕]  │            │ ▐③▌  │                     ┌─────────────────────────────┐
│ ③▐▦ Dashboard▐      │            │ Home │                     │  ▐▦▌    ▤⁵    ▥    ◆    ●   │
│  ◷ Attendance   ⌃   │            │  ◷   │                     │ Home Requests Reports …     │
│   ⑥ Shifts          │            │ Time │                     └─────────────────────────────┘
│   ⑥ Timesheets  ④12 │            │  ⚿   │
│  ⚿ Access control   │            │Access│
│ ──────────────────── │
│ ⑦ ⚙ Settings  (AS)  │
└──────────────────────┘            └──────┘""",
"""Side navigation (Web)               Navigation rail (Tablet)     Navigation bar (Mobile)
┌──────────────────────┐◯①          ┌──────┐
│ ②[▣ Devices      ⇕] │            │ [≡]  │
│ ③▐⇄ All devices  12▌│            │ ▐③▌  │                     ┌─────────────────────────────┐
│   ▦ Biometric    ⑤12│            │ All  │                     │  ▐▦▌    ▤⁴    ▥    ◆    ●   │
│   ▦ Controllers   12│            │  ▦   │                     │ Home Requests Reports …     │
│   ▭ Tablets       12│            │Bio…  │                     └─────────────────────────────┘
│   🔒 Locks        12│            │  ▭   │
└──────────────────────┘            └──────┘""")
rep("""| 1 | `header` | Web | Product logo and the collapse button |
| 2 | `module-switcher` | No | Switches between Biowave products / workspaces (legacy Module dropdown, NV-04); opens a Menu |
| 3 | `item` | Yes | One destination: `icon` + `label`; the current one is selected (fill + filled icon) |
| 4 | `badge` | No | Count or dot on an item (Badge) for new things to act on |
| 5 | `label` | Yes | Short destination name; on the collapsed side navigation it moves into a Tooltip |
| 6 | `sub-item` | No | Second level (Web side navigation and drawer only, NV-03); expands in place under its item |
| 7 | `footer` | No | Settings, help and the signed-in user (Web side navigation and drawer) |
| — | `drawer` · `scrim` | No | Modal form that holds the same list over a dimmed screen |""",
"""| 1 | `collapse-handle` | Web | Round button on the inline-end edge that collapses the side navigation to icons and opens it again |
| 2 | `module-switcher` | Web · drawer | The current module (Devices, Attendance, Access control…) with an unfold icon; opens the module Menu (locked modules show a lock) — level 1 (NV-03, NV-04) |
| 3 | `item` | Yes | One page of the current module (level 2): `icon` + `label`; the current one is selected |
| 4 | `badge` | No | Badge on an item for things to act on (rail and bar: on the icon) |
| 5 | `count` | No | Plain number at the end of a side-navigation item (how many records the page lists) |
| — | `label` | Yes | Short page name; on the collapsed side navigation it moves into a Tooltip |
| — | `drawer` · `scrim` | No | Modal form that holds the module switcher and the page list over a dimmed screen |""")
rep("| `side-navigation` | full list with labels, two levels, header and footer | Web, wide windows |","| `side-navigation` | module switcher + the module's pages with labels and counts | Web, wide windows |")
rep("""#### 4.2 `badge` on an item
Off by default. A count for things to act on (pending requests), a dot for something new.

#### 4.3 `module-switcher`
Shown when the user has more than one product or workspace (Web side navigation and drawer).""",
"""#### 4.2 `badge` and `count` on an item
Both off by default. `badge` (Badge component) for things to act on, `count` (plain number) for how many records the page lists. Never both on one item.

#### 4.3 `module-switcher`
Shown on Web and in the drawer: the modules the user's licence includes; modules not in the licence show a lock and open an upgrade message.""")
rep("""- One selected item at a time; a selected sub-item also marks its parent
- Sub-items only on Web and in the drawer; the rail and the bar have one level""","""- One selected item at a time
- Two levels only: module (switcher) → page (item); a third level becomes Tabs on the page (NV-03)
- The rail and the bar show the main destinations of the app, not the pages of one module""")
rep("| Selected | Current section | Fill + filled icon + brand label (never colour only) |\n| Expanded | Item with sub-items opened | Chevron up, sub-items shown |","| Selected | Current page | Selected fill + heavier label + brand icon (never colour only) |")
rep("| sub-item label | The page name inside the section | 24 chars |\n","| module name | The module as sold: \"Access control\", \"Attendance\" | 20 chars |\n")
rep("| Show the current section as selected with a filled icon | Show selection with colour only |","| Show the current page as selected with fill and a heavier label | Show selection with colour only |")
rep("| `items` | `NavItem[]` | `{ id, label, icon, href, badge?, children?: NavItem[] }` | — | ✓ | Destinations, two levels max |","| `modules` | `NavModule[]` | `{ id, label, icon, locked?, items: NavItem[] }` | — | ✓ | Level 1 (module switcher) |\n| `moduleId` | string | | — | ✓ | Current module |\n| `onModuleChange` | `(id) => void` | | — | ✓ | |\n| `items` | `NavItem[]` | `{ id, label, icon, href, count?, badge? }` — pages of the current module | — | ✓ | Level 2 |")
rep("| `moduleSwitcher` | `ReactNode` | a Menu trigger | — | | A4.3 |\n| `footer` | `ReactNode` | settings, help, user | — | | `footer` |\n","")
rep("| `children` deeper than one level | warn; deeper levels are ignored (NV-03) |","| an item with both `count` and `badge` | warn; the badge wins |\n| a `locked` module chosen | the switcher shows the upgrade message (not a warning) |")
rep("""├────────── layout-width-sidebar-start (open) · layout-width-sidebar-start-collapsed (collapsed) ──────────┤
┌───────────────────────────────┐   fill color-surface-default · border-inline-end border-width-default color-border-subtle
│ Biowave                  [⇤] │   header: height layout-height-app-bar · padding-inline spacing-xl
│ [▦ Workforce            ⇕]  │   module-switcher: height size-control-height-lg · radius-md · border color-border-default
│ ▐▦ Dashboard               ▌ │   item: height size-control-height-md · padding-inline spacing-lg · gap spacing-lg · radius-md
│  ◷ Attendance            ⌃  │   list: padding-inline spacing-md · gap spacing-xxs
│      Shifts                  │   sub-item: padding-inline-start = icon + gap (aligns with the label)
│ ──────────────────────────── │
│ ⚙ Settings   (AS) Ahmed S. ⋮│   footer
└───────────────────────────────┘""",
"""├──────── layout-width-sidebar-start 248 (open) · layout-width-sidebar-start-collapsed 96 ────────┤
┌───────────────────────────────┐◯  fill color-surface-subtle · border-inline-end color-border-subtle · collapse-handle size-icon-lg, radius-full
│ [▣ Devices              ⇕]  │   module area: padding-block spacing-3xl · padding-inline spacing-md
│                              │   module-switcher: height size-control-height-lg · padding spacing-lg / spacing-xl · radius-md · border color-border-default
│ ▐⇄ All devices          12▌ │   item: height size-control-height-md · padding-inline spacing-xl · gap spacing-md · radius-md · icon size-icon-sm
│   ▦ Biometric terminal  12  │   list: padding-inline spacing-xl · gap spacing-md
│   ▦ Board controller    12  │   count: body-md · color-text-subtle
└───────────────────────────────┘""")
rep("""| container | fill · border | `color-surface-default` · inline-end `border-width-default` `color-border-subtle` |
| header | height · padding-inline | `layout-height-app-bar` · `spacing-xl` |
| list | padding · gap | `spacing-md` · `spacing-xxs` |
| item / sub-item | height · padding-inline · gap · radius | `size-control-height-md` · `spacing-lg` · `spacing-lg` · `radius-md` |
| icon | size | `size-icon-md` (Material Symbols Rounded; selected = filled) |
| label | text style | `label-lg` (item) · `label-md` (sub-item) |
| badge | | Badge `Count`, `Ring=Off`, at the inline end |
| module-switcher | height · radius · border · padding-inline | `size-control-height-lg` · `radius-md` · `color-border-default` · `spacing-lg` |
| footer | padding · border-top | `spacing-md` · `color-border-subtle` |""",
"""| container | fill · border | `color-surface-subtle` (the product's grey menu) · inline-end `border-width-default` `color-border-subtle` |
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
| module Menu | | Biowave Menu, rows `size-control-height-xl`; locked modules end with `lock` `size-icon-sm` `color-icon-subtle` |""")
rep("| item | icon | `color-icon-default` (outlined glyph) | — | — | `color-icon-role-brand` (filled glyph) |","| item | icon | `color-icon-default` | — | — | `color-icon-role-brand` (rail and bar: filled glyph) |")
rep("| sub-item | label | `color-text-subtle` | `color-text-default` | — | `color-text-role-brand` |\n","| count | text | `color-text-subtle` | — | — | `color-text-subtle` |\n")
rep("| Sub-items | Parent is a `<button aria-expanded>`; children in a nested `<ul>` |","| Module switcher | `<button aria-haspopup=\"menu\">` named \"Module: Devices\"; locked modules `aria-disabled` with \"locked\" in the name |")
rep("| Enter / Space | Opens the item or expands its sub-items |","| Enter / Space | Opens the item; on the switcher, opens the module Menu |")
rep("| Collapsed ↔ Expanded sub-items | expand | sub-items height, chevron rotation | `motion-duration-md` | `motion-easing-standard` |\n","")
rep("| icons | Directional glyphs (collapse `left_panel_close`, chevrons) mirror; section icons do not |","| icons | Directional glyphs (collapse handle, chevrons) mirror; page icons do not |\n| collapse-handle | Sits on the inline-end border (the left edge of the menu in RTL) |")
rep("""- **Base:** MUI `Drawer` `variant` permanent / temporary; content is MUI `List` with `ListItemButton` per item (Biowave styles), `Collapse` for sub-items; Biowave `Tooltip` around collapsed items; width from the layout tokens.\\n- **Selection:** compare `selectedId` with item ids; a parent of the selected sub-item renders `expanded` by default.""",
"""- **Base:** MUI `Drawer` `variant` permanent / temporary; content: module switcher (Biowave Menu trigger) + MUI `List` with `ListItemButton` per page (Biowave styles); Biowave `Tooltip` around collapsed items; width from the layout tokens; the collapse handle is a round control positioned on the inline-end border.\\n- **Selection:** compare `selectedId` with item ids.""")
rep("""  ├─ ❖ .Nav item                  ← private set: Level = Item · Sub · Collapsed, State = Default · Hovered · Selected, Expandable
  └─ ◇ .Module switcher           ← private""","""  ├─ ❖ .Nav item                  ← private set: Form = Expanded · Collapsed × State = Default · Hovered · Selected (TEXT Label · Count, BOOLEAN Show count)
  ├─ ❖ .Module switcher           ← private set: Form = Expanded · Collapsed
  └─ ◇ .Collapse handle           ← private""")
rep("""Side navigation            ↕ width layout/width/sidebar/start (Collapsed: …-collapsed) · height 760 sample · fill color/surface/default · stroke inline-end color/border/subtle
├── header                 ↔ height layout/height/app-bar · padding-inline spacing/xl · logo text + ◇ Icon Button (left_panel_close)
├── module-switcher        ◇ .Module switcher · margin-inline spacing/md
├── list                   ↕ padding spacing/md · gap spacing/xxs · ◇ .Nav item × 7 (one Selected, one expanded with 3 Sub)
└── footer                 ↕ padding spacing/md · border-top · ◇ .Nav item (Settings) · user row (◇ Avatar + name)""",
"""Side navigation            ↕ width layout/width/sidebar/start (Collapsed: …-collapsed) · height 896 sample · fill color/surface/subtle · stroke inline-end color/border/subtle
├── module-area            ↕ padding-block spacing/3xl · padding-inline spacing/md · ◇ .Module switcher (fill)
├── list                   ↕ padding-inline spacing/xl · gap spacing/md · ◇ .Nav item × 6 (Devices: All devices · Biometric terminal · Board controller · Tablet · Lock · Hub; one Selected)
└── collapse-handle        ◇ .Collapse handle (absolute, on the inline-end border)""")
rep("| `Module switcher` | BOOLEAN | | `true` | `moduleSwitcher` | |\n| `Footer` | BOOLEAN | | `true` | `footer` | |\n| `.Nav item` › `Label` · `Icon` · `Badge` | TEXT · INSTANCE_SWAP · BOOLEAN | | | `items[]` | |",
    "| `.Module switcher` › `Module` | TEXT | | `Devices` | `modules[moduleId].label` | |\n| `.Nav item` › `Label` · `Count` · `Show count` | TEXT · TEXT · BOOLEAN | | | `items[]` | |")
rep("- 03: open · collapsed (with Tooltip) · modal drawer below Desktop · module switcher · badge","- 03: open · collapsed (with Tooltip) · module Menu with locked modules · modal drawer below Desktop")
rep("| `sections` | `List<BwNavSection>` | `title?`, `items` (with `children`) | — | ✓ | Full list, two levels |\n| `selectedId` | `String` | | — | ✓ | |\n| `header` · `footer` | `Widget?` | module switcher · settings and user | — | | |",
    "| `modules` · `moduleId` · `onModuleChange` | | as Web | — | ✓ | Module switcher at the top |\n| `items` | `List<BwNavDestination>` | pages of the current module | — | ✓ | |\n| `selectedId` | `String` | | — | ✓ | |")
rep("| drawer | width · item · sections | `size-container-xxs` · items as Web side navigation · section label `label-md` `color-text-subtle` | `NavigationDrawer` |","| drawer | width · content | `size-container-xxs` · module switcher + page items as the Web side navigation | `NavigationDrawer` |")
rep("- **Base:** M3 `NavigationRail` themed from tokens; `BwNavigationDrawer` wraps M3 `NavigationDrawer` (sections, `NavigationDrawerDestination`, `ExpansionTile`-style sub-items) in a modal `Drawer` route sliding from the inline start.","- **Base:** M3 `NavigationRail` themed from tokens; `BwNavigationDrawer` wraps M3 `NavigationDrawer` (module switcher header + `NavigationDrawerDestination` per page) in a modal `Drawer` route sliding from the inline start.")
rep("├── header                 module switcher · ├── sections (label/md subtle + ◇ .Nav item) · └── footer","├── module-switcher        ◇ .Module switcher\n└── items                  ◇ .Nav item × 6")
rep("│ [≡]① ②Shifts              ③[🔍 Search employees, devices…]       ⑤[🔔⁵] [?]   ⑥(AS) Ahmed ⌄ │","│ ⓪BioWave    ②Dashboard › Devices › [All devices]        ④(+) ⑤(✉⁵)(🔔⁹⁹⁺)  ⑥(AS) Arana S. ⌄ │")
rep("| 1 | `leading-button` | No | Back on inner screens; menu (opens the drawer) on top-level screens without a side navigation |","| 0 | `logo` | Web | Product logo, in a block as wide as the side navigation so both line up |\n| 1 | `leading-button` | No | Back on inner screens; menu (opens the drawer) on top-level screens without a side navigation |")
rep("| 2 | `title` | Yes | The screen or section name (later: Breadcrumbs on Web) |\n| 3 | `search` | No | Global search (Web) |","| 2 | `title` | Yes | The screen name; on Web the Breadcrumbs (module › section › current page) |\n| 3 | `search` | No | Global search (Web, optional — off in the current product) |")
rep("| 4 | `actions` | No | Up to two screen actions as Icon buttons, the rest in an overflow Menu |\n| 5 | `notifications` | No | Icon button with a Badge (Web) |","| 4 | `actions` | No | Up to two screen actions as Icon buttons, the rest in an overflow Menu; on Web the global quick-add (+) |\n| 5 | `notifications` | No | Inbox and notifications Icon buttons with Badges (Web) |")
rep("| Content | Title (Breadcrumbs when built), global search, notifications, help, profile menu |","| Content | Logo block (`layout-width-sidebar-start`), Breadcrumbs, quick-add (+), inbox and notifications with Badges, profile menu; search optional |")
rep("""| `search` | `ReactNode` | a Biowave `SearchField` | — | | `search` |
| `notifications` | `{ count: number; onClick }` | | — | | Icon button with Badge |
| `help` | `{ onClick }` | | — | | Icon button |""","""| `logo` | `ReactNode` | | Biowave logo | | `logo` |
| `search` | `ReactNode` | a Biowave `SearchField` | — | | optional |
| `onQuickAdd` | `() => void` | | — | | (+) Icon button |
| `inbox` · `notifications` | `{ count: number; onClick }` | | — | | Icon buttons with Badges (`max` 99 → "99+") |""")
rep("""| container | height · fill · padding-inline · gap | `layout-height-app-bar` · `color-surface-default` · `spacing-layout-container` · `spacing-xl` |
| container | border-bottom | `border-width-default` `color-border-subtle` (always on Web) |
| title | style | `heading-sm` · `color-text-default` |
| search | | Search field `md`, width `size-container-xs`, centred in the free space |
| notifications · help | | Icon button `transparent neutral md`; Badge `Count` on notifications |
| profile | | Avatar `sm` + name `label-lg` + `expand_more` · gap `spacing-md` |""","""| container | height · fill · padding-inline-end · gap | `layout-height-app-bar` · `color-surface-subtle` · `spacing-xl` · `spacing-xl` |
| container | border-bottom | `border-width-default` `color-border-subtle` (always on Web) |
| logo block | width · padding-inline | `layout-width-sidebar-start` · `spacing-xl` (lines up with the side navigation) |
| title | | Breadcrumbs (slot); until built, `label-lg` text |
| actions | gap | `spacing-lg` inside the group; `spacing-3xl` between the group and the profile |
| quick-add · inbox · notifications | | Icon button `md`; Badge `Count` on inbox and notifications (99+) |
| profile | | Avatar `md` + name `label-lg` + `expand_more` `size-icon-lg` · gap `spacing-lg` |""")
rep("""├── leading-button         ◇ Icon Button (menu) · BOOLEAN `Menu button` (off)
├── title                  ▢ SLOT `Title` (default T heading/sm) — Breadcrumbs go here later
├── search                 ◇ Search field · width size/container/xs · BOOLEAN `Search`
├── spacer
├── notifications          ◇ Icon Button (notifications) + ◇ Badge Count
├── help                   ◇ Icon Button (help) · BOOLEAN `Help`
└── profile                ↔ gap spacing/md · ◇ Avatar sm + T label/lg + expand_more""","""├── logo-block             ↔ width layout/width/sidebar/start · padding-inline spacing/xl · BioWave logo
├── title                  ▢ SLOT `Title` (default T label/lg) — Breadcrumbs go here
├── spacer
├── actions                ↔ gap spacing/lg · ◇ Icon Button add · ◇ Icon Button mail + Badge · ◇ Icon Button notifications + Badge
└── profile                ↔ gap spacing/lg · ◇ Avatar md + T label/lg + expand_more""")
rep("| `Menu button` · `Search` · `Help` | BOOLEAN | | `false` · `true` · `true` | `onMenuClick` · `search` · `help` | |","| `Quick add` · `Inbox` · `Notifications` | BOOLEAN | | `true` | `onQuickAdd` · `inbox` · `notifications` | |")
rep("- 03: with / without search, narrow (menu button)","- 03: full header · without quick-add · narrow (menu button opens the drawer)")
rep("App header                 ↔ width 1200 sample · height layout/height/app-bar · padding-inline spacing/layout/container · gap spacing/xl · fill color/surface/default · stroke bottom color/border/subtle","App header                 ↔ width 1440 sample · height layout/height/app-bar · padding-inline-end spacing/xl · gap spacing/xl · fill color/surface/subtle · stroke bottom color/border/subtle")
open(P,'w').write(s); print('edited')
