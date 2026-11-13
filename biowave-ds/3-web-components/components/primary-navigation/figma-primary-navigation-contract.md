<!-- GENERATED from primary-navigation.md @ 16fc08d71f684eaa — do not edit; change the source and run: npm run contract -- web primary-navigation -->
# Primary navigation · التنقل الرئيسي — Web — Figma contract

> **Everything the Figma Agent needs to build Primary navigation in the Web Components file, with our variables and styles.** Read this file only. Generated from [`primary-navigation.md`](primary-navigation.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-11-05). Questions go to [D11 Execution log](primary-navigation.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Web Components** · key `7nDhsPNntzIWlrjmuSmZ9l` · https://www.figma.com/design/7nDhsPNntzIWlrjmuSmZ9l |
| Page | `↳ Primary navigation` (one page per component) |
| Component | Primary navigation · التنقل الرئيسي |
| Platform | Web · React + MUI |
| Version | 1.0 · 2026-11-13 |
| Source | [`primary-navigation.md`](primary-navigation.md) @ `16fc08d71f684eaa` |

## 1. Library connections in this file

| | |
|---|---|
| Library | **Biowave DS — Foundations** · library key `lk-e00b31b21f924b36eeea820da99c4b306c460986c83e894f415a1c194ba5a2e670f3142c2fccca81280a80bcaee6a87bc47c9a9505d186d7b693aa9805ad7031` |
| Library file | Foundations · key `AyFaSmfDUlTax3GpKhRdHI` |
| Doc Kit library (Phase 2) | **Annotation (Biowave Doc Kit)** · file key `cBPWg6YZNqK8UIzgMQIpXl` — must be enabled in this file (Assets → Libraries) |
| Enabled here | ✓ verified from a component file: 7 collections, 282 variables reachable |

Import by key — never search by name, never copy:

```js
const v = await figma.variables.importVariableByKeyAsync('<variable key>');   // library reference, not a local copy
const s = await figma.importStyleByKeyAsync('<style key>');                   // text / effect style
const c = await figma.importComponentByKeyAsync('<component key>');           // Doc Kit / icon component
const set = await figma.importComponentSetByKeyAsync('<component set key>');
```

## 2. Component-token collections (bind layers to these)

None yet — this component has no component tokens. Bind to the Foundations variables in §3 and report it in D11 so the Planner adds component tokens.

## 3. Foundations variables used (keys)

| Token | Figma variable | Key | Type | Scopes | Used by |
|---|---|---|---|---|---|
| `border-width-default` | 7. Border › `border/width/default` | `9b62f24ecdfc438789ce3fa296e725ac14b1e08f` | FLOAT | STROKE_FLOAT | spec |
| `color-background-selected-default` | 1. Themes › `color/background/selected/default` | `9a67ec983a6fa63a98214e85d334481e961f7a14` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-transparent-hovered` | 1. Themes › `color/background/transparent/hovered` | `51354205cb02a343717bc6e5ca84b0e151af3de8` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-transparent-pressed` | 1. Themes › `color/background/transparent/pressed` | `830ae424ad770312d061208a89f7452569d643d8` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-border-default` | 1. Themes › `color/border/default` | `ad520e82898707a0d3112a12f6f9439566c6d6c4` | COLOR | STROKE_COLOR | spec |
| `color-border-focus` | 1. Themes › `color/border/focus` | `ef666d3badd2b63f18cb168d9987ead7fbc21480` | COLOR | STROKE_COLOR | spec |
| `color-border-subtle` | 1. Themes › `color/border/subtle` | `07f3e9a3d1ca641c7f05d37bf2e4383e4a8e6112` | COLOR | STROKE_COLOR | spec |
| `color-icon-default` | 1. Themes › `color/icon/default` | `b0844bd913aafe8789a44bc7b647058cdae299df` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-role-brand` | 1. Themes › `color/icon/role/brand` | `73d6989d2161d900c2070cd9b67f01653e54251d` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-subtle` | 1. Themes › `color/icon/subtle` | `fc66c13d6c036489bf774535cd8dbbf749795748` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-overlay-default` | 1. Themes › `color/overlay/default` | `3ecd2f2ffb4741abe966b362763abdda03333e76` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-surface-default` | 1. Themes › `color/surface/default` | `2013a1c60d84d2bac2524fd0c32229e20cc341a1` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-surface-raised` | 1. Themes › `color/surface/raised` | `92b71ada5e0cffef4eec84e17092c1f3d81da69f` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-surface-subtle` | 1. Themes › `color/surface/subtle` | `5963036a1ce77158a13d05d89008d80267f7be1f` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-text-default` | 1. Themes › `color/text/default` | `4ea63d9ab5254c4df4eba4d26f771377a07929c4` | COLOR | TEXT_FILL | spec |
| `color-text-role-brand` | 1. Themes › `color/text/role/brand` | `bf6f82d7545a8ae04bb4d55ee373397e5d16c45a` | COLOR | TEXT_FILL | spec |
| `color-text-subtle` | 1. Themes › `color/text/subtle` | `dac97f2fd2a80ccffd6283bcc06c623f64ebe90a` | COLOR | TEXT_FILL | spec |
| `layout-width-sidebar-start` | 6. Grid & Layout › `layout/width/sidebar-start` | `2c0b0aad9bd332d556d81b4796ad70cde49bedb0` | FLOAT | WIDTH_HEIGHT | spec |
| `layout-width-sidebar-start-collapsed` | 6. Grid & Layout › `layout/width/sidebar-start-collapsed` | `d8890bceeccdd3d861120adffe993c78fea21039` | FLOAT | WIDTH_HEIGHT | spec |
| `radius-4xl` | 2. Radius › `radius/4xl` | `a2d1c8c46c25b7c73e9257b28732ea9ec156c6bb` | FLOAT | CORNER_RADIUS | spec |
| `radius-full` | 2. Radius › `radius/full` | `cde1a4778562f488d8f32680d4d00f7957cc2a21` | FLOAT | CORNER_RADIUS | spec |
| `radius-md` | 2. Radius › `radius/md` | `0758e506cdfd4d7a4eef6369a4851133d7eab5a4` | FLOAT | CORNER_RADIUS | spec |
| `size-control-height-lg` | 4. Size › `size/control/height/lg` | `14c0f56d2add6f7149374e67cf4d3a2656aeb5dc` | FLOAT | WIDTH_HEIGHT | spec |
| `size-control-height-md` | 4. Size › `size/control/height/md` | `cb6d23a09de76b9cea37c24579dbb2a9e6e6a079` | FLOAT | WIDTH_HEIGHT | spec |
| `size-control-height-xl` | 4. Size › `size/control/height/xl` | `2d65685001b2cf5f0f050eddba6e298b104c97c4` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-lg` | 4. Size › `size/icon/lg` | `e79bd86fedcce89547674c84c9127d0149e60061` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-sm` | 4. Size › `size/icon/sm` | `2aa4b1f12a5ed0745f9a8b3251dc1fd9f7dd3476` | FLOAT | WIDTH_HEIGHT | spec |
| `spacing-3xl` | 3. Spacing › `spacing/3xl` | `5074b95f9af7de39e16a9c1f1796ca42e5d08925` | FLOAT | GAP | spec |
| `spacing-lg` | 3. Spacing › `spacing/lg` | `6976021b7dd1218f670faa6dd403943fbe7b2638` | FLOAT | GAP | spec |
| `spacing-md` | 3. Spacing › `spacing/md` | `58c93e3cec1b6ba603371a027483e101adcef4f0` | FLOAT | GAP | spec |
| `spacing-xl` | 3. Spacing › `spacing/xl` | `5fa0c2ce8ae034e9696038d2704e520fd8383e55` | FLOAT | GAP | spec |

Code-only tokens (no Figma variable by design — motion, layers): `elevation-4` · `motion-duration-instant` · `motion-duration-lg` · `motion-duration-md` · `motion-duration-sm` · `motion-easing-emphasized-decelerate` · `motion-easing-standard`. Use them only as written values in prototype settings and docs.

## 4. Text styles used (keys)

None named in B/D.

## 5. Effect styles used (keys)

None named in B/D.

## 6. Components to instance (keys)

Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.

### Icons (keys) — Google · Material Symbols library (D-18)

No icon named in this spec. Icons come only from the Google · Material Symbols library (Style=Rounded).

## 7. Phase 1 — values (from Part B)

### B1 API

### SideNavigation
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

`NavigationDrawer` is `SideNavigation variant="modal"` re-exported for clarity.

**Invalid combinations** (`console.warn` in development):
| Combination | Fallback |
|---|---|
| an item with both `count` and `badge` | warn; the badge wins |
| a `locked` module chosen | the switcher shows the upgrade message (not a warning) |
| `collapsed` with `variant="modal"` | ignored — the drawer is always open width |
| more than one item matching `selectedId` | warn; the first is selected |

### B2 Dimensions

```
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
| drawer (modal) | width · radius · elevation · scrim | `layout-width-sidebar-start` · `radius-4xl` on the inline-end corners · `elevation-4` · `color-overlay-default` |

### B3 Tokens by part and state

Every value is a semantic token; there is no `primary-navigation.tokens.json`.

| Part | Property | Default | Hover | Pressed | Selected |
|---|---|---|---|---|---|
| container | fill | `color-surface-default` | — | — | — |
| item | fill | transparent | `color-background-transparent-hovered` | `color-background-transparent-pressed` | `color-background-selected-default` (hover `-hovered`, pressed `-pressed`) |
| item | icon | `color-icon-default` | — | — | `color-icon-role-brand` (rail and bar: filled glyph) |
| item | label | `color-text-subtle` | `color-text-default` | — | `color-text-role-brand` |
| count | text | `color-text-subtle` | — | — | `color-text-subtle` |
| divider · border | stroke | `color-border-subtle` | — | — | — |
| drawer | fill · scrim | `color-surface-raised` · `color-overlay-default` | — | — | — |

Focus: the item keeps the foundations focus ring (`color-border-focus`). Dark theme: same tokens.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hover / Pressed | pointer / touch | item fill | `motion-duration-sm` | `motion-easing-standard` |
| Item → Selected | select | fill, icon glyph, label colour | `motion-duration-md` | `motion-easing-standard` |
| Open ↔ Collapsed (side navigation) | collapse button | width | `motion-duration-lg` | `motion-easing-emphasized-decelerate` |
| Drawer open / close | menu button / scrim, Esc, back | slide from the inline start, scrim fade | `motion-duration-lg` in · `motion-duration-md` out | `motion-easing-emphasized-decelerate` · `-accelerate` |

Reduced motion: all become `motion-duration-instant`.

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

| Requirement | Implementation |
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
| Esc | Closes the drawer |

## 8. Phase 1 — build the component set (from Part D)

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Primary navigation |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Primary navigation` › sections `Primary navigation` and `Primary navigation — Documentation` |
| Mode | **Create new.** Legacy Web `↳ Navigation Menu` (`Nav Item`, `Modules`, module dropdown) and Mobile `↳ Navigation Bar` (`Bars Icons`) are the content source; they stay in `_Deprecation Ground` untouched |
| Depends on | Badge, Tooltip, Icon Button, Avatar, Divider sets in this file; `.Scrim` from the Dialog page (drawer examples) |
| Plan version | 1 · 2026-11-13 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `figma-read-tokens.js` lint must report 0.
- Nested parts are instances of the sets already in this file (Button, Icon Button, Divider) — never detached, never redrawn.
- The `scrim` is a private base component `.Scrim` (one per file, shared by Dialog, Bottom sheet and Side sheet): a frame filled with `color/overlay/default`, no other properties. Examples place the overlay component on top of it inside a device frame.

### D2 Component structure

```
❖ Side navigation                ← set: State = Expanded · Collapsed · Language = EN · AR
  ├─ ❖ .Nav item                  ← private set: Form = Expanded · Collapsed × State = Default · Hovered · Selected (TEXT Label · Count, BOOLEAN Show count)
  ├─ ❖ .Module switcher           ← private set: Form = Expanded · Collapsed
  └─ ◇ .Collapse handle           ← private
```

### D3 Layer tree and auto layout

```
Side navigation            ↕ width layout/width/sidebar/start (Collapsed: …-collapsed) · height 896 sample · fill color/surface/subtle · stroke inline-end color/border/subtle
├── module-area            ↕ padding-block spacing/3xl · padding-inline spacing/md · ◇ .Module switcher (fill)
├── list                   ↕ padding-inline spacing/xl · gap spacing/md · ◇ .Nav item × 6 (Devices: All devices · Biometric terminal · Board controller · Tablet · Lock · Hub; one Selected)
└── collapse-handle        ◇ .Collapse handle (absolute, on the inline-end border)
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `State` | VARIANT | `Expanded` · `Collapsed` | `Expanded` | `collapsed` | `false` · `true` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | provider |
| `.Module switcher` › `Module` | TEXT | | `Devices` | `modules[moduleId].label` | |
| `.Nav item` › `Label` · `Count` · `Show count` | TEXT · TEXT · BOOLEAN | | | `items[]` | |

### D5 Variants to generate

- `Side navigation`: State × Language = **4**; `.Nav item`: Level × State (+ Expandable) private
- Modal drawer form: documented with an instance over `.Scrim` (page 07), not a separate set

### D6 States, interactions and motion

No prototype interactions on the set. Opening, dragging, the detents and closing are shown on doc page 04 with B4 timings written next to them.

### D7 RTL

`Language=AR` variants: Typography mode `Web · AR`, auto layout direction from the text, layout per B5; Arabic copy from A6. The `close` and `check` glyphs do not mirror; `arrow_back` mirrors.

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Primary navigation — Documentation`, frames `Primary navigation / 00 Component sheet` … `Primary navigation / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Primary navigation:
- 01: open and collapsed side navigation in a Desktop frame
- 03: open · collapsed (with Tooltip) · module Menu with locked modules · modal drawer below Desktop
- 07: Desktop + Web narrow (drawer)
- 05 Usage: the A7 pairs, built with live instances

Component description: "Moves the user between the top-level sections (modules) of the product: side navigation on Web, navigation rail on Tablet, navigation bar on Mobile, and a modal drawer when there is no room. Spec: 3-web-components/components/primary-navigation/primary-navigation.md".

### Doc Kit components (keys)

| Component | Key | Kind |
|---|---|---|
| `Doc/Logo` | `b0506262908cc9602fb86d1d2f2d1574b8797fb1` | COMPONENT |
| `Doc/Version chip` | `20beed5d39281d472c391a3a23650a34058cff6a` | COMPONENT |
| `Doc/Divider` | `719437f0bf3e0276b697f22b886be069e1e428aa` | COMPONENT_SET |
| `Doc/Section` | `f29dffabb982e9374b1b804639f45514a29146a2` | COMPONENT |
| `Doc/Code block` | `9bcc61d27ad9bf6c4d4a9e5a6e3e6ebd37af5028` | COMPONENT |
| `Doc/Property chip` | `8990d04a48fb07d7f8f1056307d1faf3dc0ded65` | COMPONENT |
| `Doc/Header` | `dd9347ba546590b632ae68976fe2733f3f7d340e` | COMPONENT |
| `Doc/Axis label` | `24a64b9f56bb95bffc1b5f1ce61e58205b3023fb` | COMPONENT_SET |
| `Doc/Bracket` | `b10364d75b1d8c84e235d63773c0c7870898354a` | COMPONENT_SET |
| `Doc/Callout` | `24c24d19f00001b99acb880c3101afb1842a64f6` | COMPONENT_SET |
| `Doc/Panel` | `b8b20494dcf5f71d3492d90a96498d510d490132` | COMPONENT_SET |
| `Doc/Tile` | `eb3bac08d98c62634cbbc8a6a0129a5fa1783836` | COMPONENT |
| `Doc/Change note` | `5cc8476dd2952640e8138cf21feeb637cfcfe73a` | COMPONENT |
| `Doc/Deprecated overlay` | `d75a185f612de5fa7daadaff9083edff16c42fc4` | COMPONENT |
| `Doc/Table cell` | `4b48bcab4faac402c079e941b30f8987159bfa3f` | COMPONENT_SET |
| `Doc/Table row` | `fb2c9fdd139f3be6860495d1d95a911275ed8224` | COMPONENT_SET |
| `Doc/Table` | `40980251551a20a72810037dc043c66e9271600b` | COMPONENT |
| `Doc/Timeline` | `81d060910749d01da7648f5ae3877e283d668377` | COMPONENT_SET |
| `Doc/Motion row` | `2072d9e2a11281879696f1f8c6ee6ef917b029ac` | COMPONENT |
| `Doc/Uses` | `25ed1809ed37c229827ee8019ec52fe129ec0d31` | COMPONENT |
| `Doc/Do` | `45fdac0674bae9a7d6502a0d2e7f76943d8ea4f1` | COMPONENT |
| `Doc/Dont` | `b6271df857b44407da2657601b4e388bf843b7e8` | COMPONENT |
| `Doc/Skeleton` | `cdb8f9c05ff039be8fda885a25e3ade2986da93b` | COMPONENT_SET |
| `Doc/Device frame` | `c7c9ec2e833fad1b54333707c2210744515d5339` | COMPONENT_SET |
| `Doc/Home header` | `e9c1ee6681300d4c2a04e8f563c308642a3db3df` | COMPONENT |
| `Doc/Title bar` | `2c79bbf4615cf2c6fc8ef6a14390a32d2832d48d` | COMPONENT |
| `Doc/Home card` | `bdd6e95450e128f7b3d3d5fa86b655a6986d2cfa` | COMPONENT |
| `Doc/Footer` | `dd342bd1d199a8c5f353c58125681fad6b6c09f2` | COMPONENT |

### Components List card

On page `Components List` of this file, add (or refresh) one `Doc/Home card`: preview = live instance of the default variant on the dot-grid tile, title = component name, link "View Component ↗" to the `↳` page of this component. Cards stay in alphabetical order.

### Page layouts (from the Doc Kit spec)

The 12 documentation pages every component gets (Part D8 lists them with their sources; this section is their one layout home).

Every page starts with the same header (`Doc/Header`):

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [logo] Biowave DS / Documentation                 {Platform} · v{version}  │
│                                                                            │
│ {Page title}                                                               │
│ {Page subtitle — one line}                                                 │
│ ────────────────────────────────────────────────────────────────────────── │
```

#### 00 Component sheet
The full variant matrix with axis labels. Columns = interaction states, rows grouped by the other axes. Built from the component set itself.

```
{Name}  (v1.0)
{one-line description}
──────────────────────────────────────────────────────────────────────────
                    State: Default   State: Hover   State: Pressed   State: Disabled
                   ┌──────────────┬──────────────┬───────────────┬────────────────┐
Size: MD │ Primary │ ▢ instance   │ ▢ instance   │ ▢ instance    │ ▢ instance     │
         │ Second. │ ▢            │ ▢            │ ▢             │ ▢              │
Size: SM │ Primary │ ▢            │ ▢            │ ▢             │ ▢              │
                   └──────────────┴──────────────┴───────────────┴────────────────┘
```
`Doc/Axis label` for every row and column (`property` small, `Value` bold). Invalid combinations are not shown.

#### 01 Introduction
Description paragraph, then the anatomy diagram twice: Light panel, then Dark panel (same instance, variable mode switched on the panel).

```
{Description from A1}

┌─ Doc/Panel (Light) ──────────────────────────────────────────────┐
│              title      counter                 trailing-item    │
│                 │          │                          │          │
│ leading-icon ─● ┌──────────────────────────────────────────────┐ │
│                 │ [◆] Title text (12)                     [⤓]  │ │
│ subtitle ─────● │     Subtitle text                            │ │
│                 │ ░░░░░░░░░░░░░░░░ slot ░░░░░░░░░░░░░░░░░░░░░░ │ ├─ slot
│                 └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
┌─ Doc/Panel (Dark) ── same diagram ───────────────────────────────┐
```
Callout labels = anatomy part names, exactly (`Doc/Callout`).

#### 02 Props and tokens
One `Doc/Table` per public sub-component (columns: Prop name · Description · Type · Prop values · Default; required props marked `*`). Then a reference instance and the token table.

```
Props [{Name}]                     Props [{Name}Header]
┌──────────┬─────────────┬──────┬──────────────┬─────────┐
│ Prop name│ Description │ Type │ Prop values  │ Default │
├──────────┼─────────────┼──────┼──────────────┼─────────┤
│ size *   │ …           │ enum │ • sm • md    │ md      │
└──────────┴─────────────┴──────┴──────────────┴─────────┘

Tokens            ┌ reference instance ┐
┌───────────────────┬─────────┬──────────────────────────────────────┐
│ Part · property   │ State   │ Token                                │
├───────────────────┼─────────┼──────────────────────────────────────┤
│ container · bg    │ Default │ color-background-neutral-default     │
└───────────────────┴─────────┴──────────────────────────────────────┘
```

#### 03 Variations
One block per property, in D4 order. Each value = one `Doc/Tile` with a live instance and caption `property = Value`. Other properties stay at default.

```
{property}
{one-line description from A4}
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   ▢ instance     │ │   ▢ instance     │ │   ▢ instance     │
│                  │ │                  │ │                  │
│ size = SM        │ │ size = MD        │ │ size = LG        │
└──────────────────┘ └──────────────────┘ └──────────────────┘
────────────────────────────────────────────────────────────── (Doc/Divider)
```

#### 04 States and motion
One `Doc/Motion row` per transition in B4.

```
States           Animation          Trigger    Timeline (ms)                    Transition properties
──────────────── ────────────────── ────────── ──────────────────────────────── ──────────────────────────────
Initial state    ┌──────────────┐               0  70  150  200  300  400  600  ┌────────────────────────────┐
 ▢ Default       │ prototype    │   Hover       ├──────┤                        │ duration: motion-duration-sm│
Final state      │ preview      │               └ 150 ┘                         │ easing:   motion-easing-std │
 ▢ Hover         └──────────────┘                                               └────────────────────────────┘
                                                                                [Background  ■ ▸ ■]
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```
Timeline bar length = the duration token's value. Property chip shows the from → to token swatches. Add a reduced-motion note at the end.

#### 05 Usage guidelines
"When to use" as a `Doc/Uses` card, then rule groups, each with a `Doc/Do` + `Doc/Dont` pair holding live, realistic compositions.

```
{Rule group title}
• {rule}
┌─ ✓ Do ──────────────────────────┐   ┌─ ✗ Don't ───────────────────────┐
│ • {rule}                        │   │ • {rule}                        │
│ ┌─────────────────────────────┐ │   │ ┌─────────────────────────────┐ │
│ │ realistic example (instance)│ │   │ │ wrong example (instance)    │ │
│ └─────────────────────────────┘ │   │ └─────────────────────────────┘ │
└─────────────────────────────────┘   └─────────────────────────────────┘
```

#### 06 Content guidelines
Same layout as 05, with copy rules from A6. Show EN and AR examples side by side in the Do card.

#### 07 Platform
One `Doc/Uses` card per layout context of this platform, each with a `Doc/Device frame` containing skeleton page content (`Doc/Skeleton`) and the component in place. Web: Desktop + narrow web. Tablet: Landscape + Portrait. Mobile: Phone. End with the platform differences table from A8.

```
Desktop
These are used on web apps / dashboards.
┌─ ★ Uses ───────────────────────────────────────────┐
│ {rule}                                             │
│ ┌─ Doc/Device frame ─────────────────────────────┐ │
│ │ ▬▬▬▬▬▬▬▬                                       │ │
│ │ ▢▢   ┌ component ┐   ▬▬▬▬▬▬▬▬                  │ │
│ │      └───────────┘   ▬▬▬▬▬▬                    │ │
│ └────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

#### 08 RTL
LTR and RTL instances side by side for each structurally different variant, with `Doc/Callout` on every mirrored and non-mirrored part (B5). Arabic sample copy.

```
LTR (en)                              RTL (ar)
┌──────────────────────────────┐      ┌──────────────────────────────┐
│ [◆] Title text          [▸]  │      │  [◂]          عنوان البطاقة [◆] │
└──────────────────────────────┘      └──────────────────────────────┘
  ◆ not mirrored · ▸ mirrored
```

#### 09 Accessibility
`Doc/Section` blocks: Use case · Keyboard (table from B6) · Screen reader output · Focus (instance in Focus state with ring callout) · Target size (overlay showing `target-min`) · Colors (contrast pairs).

#### 10 Changes from previous version
Only when the version is > 1.0. New (live instance, with `Doc/Change note` callouts) next to Previous (old instance or image, hatched with `Doc/Deprecated overlay`). Notes use strike-through for the old value and bold for the new one, e.g. ~~`spacing-lg` fixed~~ → **`spacing-md` variable**.

```
New                                          Previous
┌──────────────────────────┐ ◂ change note   ┌──────────────────────────┐
│ ▢ current instance       │                 │ ╱╱╱ old version ╱╱╱╱╱╱╱  │
└──────────────────────────┘                 └──────────────────────────┘
```

#### 11 Changelog
`Doc/Table` from the changelogs (Version · Date · Change · Breaking · Migration).

Component description field (Figma "Description"): one line from A1 + link to the spec.

## 10. Code Connect

- File: `3-web-components/src/components/primary-navigation/SideNavigation.figma.tsx`
- Mapping: D4. Publish after the code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component>` or `<Component> / <Axis>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Primary navigation`, private components and layer names match D2–D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant count = D5
- [ ] F-AC-4 Zero raw values: fills, radius, padding, gaps, widths, text and effects bound (lint 0)
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only)
- [ ] F-AC-6 AR variants per D7; Arabic copy fits without truncation
- [ ] F-AC-7 Component description filled; no prototype interactions on the set
- [ ] F-AC-8 Values match B2–B3 one by one (redline check)
- [ ] F-AC-9 Every documentation page in D8 exists, in order, built only from Doc Kit components with live instances

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](primary-navigation.md#d11-execution-log-filled-by-the-figma-agent) in `primary-navigation.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `primary-navigation.md` and in `3-web-components/README.md`.
3. `npm run sync:done:web` — records this contract as built in the Web file.
4. Add one line to the root `CHANGELOG.md`.
