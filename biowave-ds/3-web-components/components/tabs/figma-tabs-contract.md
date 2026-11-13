<!-- GENERATED from tabs.md @ 3f95cfed3323b87e — do not edit; change the source and run: npm run contract -- web tabs -->
# Tabs · علامات التبويب — Web — Figma contract

> **Everything the Figma Agent needs to build Tabs in the Web Components file, with our variables and styles.** Read this file only. Generated from [`tabs.md`](tabs.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-11-05). Questions go to [D11 Execution log](tabs.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Web Components** · key `7nDhsPNntzIWlrjmuSmZ9l` · https://www.figma.com/design/7nDhsPNntzIWlrjmuSmZ9l |
| Page | `↳ Tabs` (one page per component) |
| Component | Tabs · علامات التبويب |
| Platform | Web · React + MUI |
| Version | 1.0 · 2026-11-13 |
| Source | [`tabs.md`](tabs.md) @ `3f95cfed3323b87e` |

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
| `border-width-focus` | 7. Border › `border/width/focus` | `d660bcb01777958134799fe11a99a63aaf1fbfca` | FLOAT | STROKE_FLOAT | spec |
| `border-width-strong` | 7. Border › `border/width/strong` | `71439086700175c98e9cdf1952de74427c72063e` | FLOAT | STROKE_FLOAT | spec |
| `color-background-neutral-default` | 1. Themes › `color/background/neutral/default` | `2dc9c39d4df7b490fd0d7ac7385b49fdaf0e973e` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-selected-default` | 1. Themes › `color/background/selected/default` | `9a67ec983a6fa63a98214e85d334481e961f7a14` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-transparent-default` | 1. Themes › `color/background/transparent/default` | `7ded3d8bfead13a83fc2297ef9dc75a16f73857b` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-transparent-hovered` | 1. Themes › `color/background/transparent/hovered` | `51354205cb02a343717bc6e5ca84b0e151af3de8` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-transparent-pressed` | 1. Themes › `color/background/transparent/pressed` | `830ae424ad770312d061208a89f7452569d643d8` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-border-brand` | 1. Themes › `color/border/brand` | `50ddd3d7028ede7c14f73576869a28588b0c3b7d` | COLOR | STROKE_COLOR | spec |
| `color-border-focus` | 1. Themes › `color/border/focus` | `ef666d3badd2b63f18cb168d9987ead7fbc21480` | COLOR | STROKE_COLOR | spec |
| `color-border-subtle` | 1. Themes › `color/border/subtle` | `07f3e9a3d1ca641c7f05d37bf2e4383e4a8e6112` | COLOR | STROKE_COLOR | spec |
| `color-icon-default` | 1. Themes › `color/icon/default` | `b0844bd913aafe8789a44bc7b647058cdae299df` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-disabled` | 1. Themes › `color/icon/disabled` | `708926473ca446a26d4a0891351f04692171f74f` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-role-brand` | 1. Themes › `color/icon/role/brand` | `73d6989d2161d900c2070cd9b67f01653e54251d` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-subtle` | 1. Themes › `color/icon/subtle` | `fc66c13d6c036489bf774535cd8dbbf749795748` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-surface-default` | 1. Themes › `color/surface/default` | `2013a1c60d84d2bac2524fd0c32229e20cc341a1` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-text-default` | 1. Themes › `color/text/default` | `4ea63d9ab5254c4df4eba4d26f771377a07929c4` | COLOR | TEXT_FILL | spec |
| `color-text-disabled` | 1. Themes › `color/text/disabled` | `f88c10f90f454d356c14cc3240da0f04eafbbedd` | COLOR | TEXT_FILL | spec |
| `color-text-role-brand` | 1. Themes › `color/text/role/brand` | `bf6f82d7545a8ae04bb4d55ee373397e5d16c45a` | COLOR | TEXT_FILL | spec |
| `color-text-subtle` | 1. Themes › `color/text/subtle` | `dac97f2fd2a80ccffd6283bcc06c623f64ebe90a` | COLOR | TEXT_FILL | spec |
| `radius-full` | 2. Radius › `radius/full` | `cde1a4778562f488d8f32680d4d00f7957cc2a21` | FLOAT | CORNER_RADIUS | spec |
| `radius-md` | 2. Radius › `radius/md` | `0758e506cdfd4d7a4eef6369a4851133d7eab5a4` | FLOAT | CORNER_RADIUS | spec |
| `size-control-height-md` | 4. Size › `size/control/height/md` | `cb6d23a09de76b9cea37c24579dbb2a9e6e6a079` | FLOAT | WIDTH_HEIGHT | spec |
| `size-control-height-sm` | 4. Size › `size/control/height/sm` | `1409647f4e12e37e76b49ed9ce1a78946e4250f4` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-md` | 4. Size › `size/icon/md` | `eb459c673e6ca16e3c81b240f04b467717953a9a` | FLOAT | WIDTH_HEIGHT | spec |
| `spacing-3xl` | 3. Spacing › `spacing/3xl` | `5074b95f9af7de39e16a9c1f1796ca42e5d08925` | FLOAT | GAP | spec |
| `spacing-lg` | 3. Spacing › `spacing/lg` | `6976021b7dd1218f670faa6dd403943fbe7b2638` | FLOAT | GAP | spec |
| `spacing-md` | 3. Spacing › `spacing/md` | `58c93e3cec1b6ba603371a027483e101adcef4f0` | FLOAT | GAP | spec |
| `spacing-xl` | 3. Spacing › `spacing/xl` | `5fa0c2ce8ae034e9696038d2704e520fd8383e55` | FLOAT | GAP | spec |
| `target-min` | 6. Grid & Layout › `target/min` | `db23ec2826d3bfa3e600e5a82801e0c7d37ba298` | FLOAT | WIDTH_HEIGHT | spec |

Code-only tokens (no Figma variable by design — motion, layers): `motion-duration-md` · `motion-duration-sm` · `motion-easing-standard`. Use them only as written values in prototype settings and docs.

## 4. Text styles used (keys)

None named in B/D.

## 5. Effect styles used (keys)

None named in B/D.

## 6. Components to instance (keys)

Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.

### Icons (keys) — Google · Material Symbols library (D-18)

Library file **Google · Material Symbols** · key `RXlnhYgUKBBE6HveEr7e9C` — must be enabled in this file. Import the set, then use the **Style=Rounded** variant (`Fill=Filled` only for selected states). Colour the glyph by binding its vector fills to the icon colour token of the part.

| Icon | Set key | Rounded (unfilled) | Rounded (filled) |
|---|---|---|---|
| `dashboard` | ⏳ not indexed — Planner runs `npm run sync:icons:plan` | | |

## 7. Phase 1 — values (from Part B)

### B1 API

### Tabs
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `value` | `string` | a tab's `value` | — | ✓ | Selected tab |
| `onChange` | `(value: string) => void` | | — | ✓ | |
| `variant` | `'primary' \| 'secondary'` | | `'primary'` | | `variant` |
| `scrollable` | `boolean` | | `false` | | Scrolls with arrow buttons when tabs do not fit |
| `children` | `Tab[]` | 2–7 | — | ✓ | |

### Tab
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` · `label` | `string` | — | |
| `icon` | `IconName` | — | `icon` (all tabs or none) |
| `badgeCount` | `number` | — | `badge` (`max` 99) |
| `disabled` | `boolean` | `false` | |

**Invalid combinations** (`console.warn` in development):
| Combination | Fallback |
|---|---|
| `icon` on some tabs only | icons hidden on all |
| fewer than 2 tabs | renders, warns |

### B2 Dimensions

| Part | Property | Primary | Secondary |
|---|---|---|---|
| tab | height | `size-control-height-md` | `size-control-height-sm` |
| tab | padding-inline · gap (icon, label, badge) | `spacing-3xl` · `spacing-md` | `spacing-lg` · `spacing-md` |
| tab | radius | none | `radius-full` |
| container | gap between tabs | `spacing-xl` | `spacing-md` |
| label | text style | `label-lg` | `label-lg` |
| icon | size | `size-icon-md` | `size-icon-md` |
| badge | | Badge `Count` | Badge `Count` |
| indicator | | bottom border `border-width-strong` `color-border-brand`, full tab width | the selected tab's fill |
| divider | | container bottom border `border-width-default` `color-border-subtle` | none |
| focus ring | | `border-width-focus` · `color-border-focus` · `radius-md` | same, `radius-full` |

### B3 Tokens by part and state

Every value is a semantic token; there is no `tabs.tokens.json`. Nested Badge and Icon carry their own.

| Part | Property | Default | Hovered | Pressed | Selected | Disabled |
|---|---|---|---|---|---|---|
| tab | fill (Primary) | `color-background-transparent-default` | `color-background-transparent-hovered` | `color-background-transparent-pressed` | `color-background-transparent-default` | same as Default |
| tab | fill (Secondary) | `color-background-transparent-default` | `color-background-transparent-hovered` | `color-background-transparent-pressed` | `color-background-selected-default` | same as Default |
| label · icon | colour | `color-text-subtle` · `color-icon-subtle` | `color-text-default` · `color-icon-default` | same as Hovered | `color-text-role-brand` · `color-icon-role-brand` | `color-text-disabled` · `color-icon-disabled` |

Contrast (light): `color-text-subtle` on `color-surface-default` 14.55:1 · `color-text-role-brand` on `color-surface-default` 14.87:1 · on `color-background-selected-default` 12.54:1 · iOS `color-text-subtle` on `color-background-neutral-default` 12.43:1. Dark theme: same tokens.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Default → Hovered / Pressed | pointer / tap | fill, label colour | `motion-duration-sm` | `motion-easing-standard` |
| Tab A → Tab B | select | indicator slides to the new tab (iOS: the raised segment slides) | `motion-duration-md` | `motion-easing-standard` |

Reduced motion: the indicator jumps without sliding.

### B5 RTL

| Part | In RTL |
|---|---|
| order | Reverses: first tab on the right |
| icon · badge | Icon after the label's start edge (right), badge at the end (left); glyphs do not mirror |
| scroll arrows | Mirror |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | `role="tablist"` / `role="tab"` with `aria-selected`, `aria-controls`; panel `role="tabpanel"` |
| Keyboard | Arrow keys move and select; Home / End; Tab moves into the panel |
| Target size | Tab height ≥ `target-min` |
| Badge | Included in the tab's label: "Logs, 3 new" |

## 8. Phase 1 — build the component set (from Part D)

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Tabs |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Tabs` › sections `Tabs` and `Tabs — Documentation` |
| Mode | **Create new.** Foundations `↳ Tabs` (`Tab` On · Off, `Tabs` 2–8 tabs, `Tabs Chips`) is the content source; it stays untouched |
| Depends on | Badge and Icon (Material Symbols) in this file |
| Plan version | 1 · 2026-11-13 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `figma-read-tokens.js` lint must report 0.
- Nested parts are instances of the sets already in this file (Badge, Icon) — never detached, never redrawn.

### D2 Component structure

```
❖ Tabs                           ← set: Variant = Primary · Secondary × Language = EN · AR (BOOLEAN Tab 4 · Tab 5)
  └─ ❖ .Tab                       ← private set: Variant × State = Default · Hovered · Pressed · Focused · Selected · Disabled × Direction = LTR · RTL
                                     (TEXT Label · BOOLEAN Show icon · INSTANCE_SWAP Icon · BOOLEAN Show badge)
```

### D3 Layer tree and auto layout

```
Tabs (Primary)             ↔ gap spacing/xl · stroke bottom color/border/subtle border/width/default
└── ◇ .Tab × 3–5           ↔ height size/control/height/md · padding-inline spacing/3xl · gap spacing/md · [icon] T label/lg [badge] · Selected: stroke bottom border/width/strong color/border/brand
Tabs (Secondary)           ↔ gap spacing/md
└── ◇ .Tab × 3–5           ↔ height size/control/height/sm · padding-inline spacing/lg · radius/full · Selected: fill color/background/selected/default
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Variant` | VARIANT | `Primary` · `Secondary` | `Primary` | `variant` | |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Tab 4` · `Tab 5` | BOOLEAN | | `true` · `false` | `children.length` | |
| `.Tab` › `Label` | TEXT | | `Overview` | `label` | |
| `.Tab` › `Show icon` · `Icon` | BOOLEAN · INSTANCE_SWAP | | `false` · `dashboard` | `icon` | |
| `.Tab` › `Show badge` | BOOLEAN | | `false` | `badgeCount` | |
| `.Tab` › `State` | VARIANT | Default · Hovered · Pressed · Focused · Selected · Disabled | Default | interaction · `value` · `disabled` | |

### D5 Variants to generate

- `Tabs`: Variant × Language = **4**; `.Tab`: Variant × State × Direction = **24**

### D6 States, interactions and motion

No prototype interactions on the set. Hover, press, focus and the indicator moving between tabs are shown on doc page 04 with B4 timings written next to them.

### D7 RTL

`Language=AR` variants: Typography mode `Web · AR`, auto layout direction from the text, layout per B5; Arabic copy from A6. Tabs in reverse order (`.Tab` `Direction=RTL` puts the icon on the right and the badge on the left); glyphs do not mirror.

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Tabs — Documentation`, frames `Tabs / 00 Component sheet` … `Tabs / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Tabs:
- 01: Primary tabs under a page header in a Desktop frame
- 03: Primary · Secondary · with icons · with badges · scrollable
- 07: Desktop and Web narrow (scrollable)
- 05 Usage: the A7 pairs, built with live instances

Component description: "Switches between views of the same content on one screen (Overview, Devices, Logs…) without leaving the page. Spec: 3-web-components/components/tabs/tabs.md".

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

- File: `3-web-components/src/components/tabs/Tabs.figma.tsx`
- Mapping: D4. Publish after the code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component>` or `<Component> / <Axis>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Tabs`, private components and layer names match D2–D3 and A2
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

1. Fill [D11 Execution log](tabs.md#d11-execution-log-filled-by-the-figma-agent) in `tabs.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `tabs.md` and in `3-web-components/README.md`.
3. `npm run sync:done:web` — records this contract as built in the Web file.
4. Add one line to the root `CHANGELOG.md`.
