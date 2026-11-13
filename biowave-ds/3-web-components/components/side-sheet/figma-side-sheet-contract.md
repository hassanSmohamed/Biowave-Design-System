<!-- GENERATED from side-sheet.md @ 61b7f11bf6bfed84 — do not edit; change the source and run: npm run contract -- web side-sheet -->
# Side sheet · اللوحة الجانبية — Web — Figma contract

> **Everything the Figma Agent needs to build Side sheet in the Web Components file, with our variables and styles.** Read this file only. Generated from [`side-sheet.md`](side-sheet.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-11-05). Questions go to [D11 Execution log](side-sheet.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Web Components** · key `7nDhsPNntzIWlrjmuSmZ9l` · https://www.figma.com/design/7nDhsPNntzIWlrjmuSmZ9l |
| Page | `↳ Side sheet` (one page per component) |
| Component | Side sheet · اللوحة الجانبية |
| Platform | Web · React + MUI |
| Version | 1.0 · 2026-11-13 |
| Source | [`side-sheet.md`](side-sheet.md) @ `61b7f11bf6bfed84` |

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
| `color-border-subtle` | 1. Themes › `color/border/subtle` | `07f3e9a3d1ca641c7f05d37bf2e4383e4a8e6112` | COLOR | STROKE_COLOR | spec |
| `color-overlay-default` | 1. Themes › `color/overlay/default` | `3ecd2f2ffb4741abe966b362763abdda03333e76` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-surface-raised` | 1. Themes › `color/surface/raised` | `92b71ada5e0cffef4eec84e17092c1f3d81da69f` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-text-default` | 1. Themes › `color/text/default` | `4ea63d9ab5254c4df4eba4d26f771377a07929c4` | COLOR | TEXT_FILL | spec |
| `radius-4xl` | 2. Radius › `radius/4xl` | `a2d1c8c46c25b7c73e9257b28732ea9ec156c6bb` | FLOAT | CORNER_RADIUS | spec |
| `radius-none` | 2. Radius › `radius/none` | `e8421984adf95aa6c48895673eac13c0a62604e1` | FLOAT | CORNER_RADIUS | spec |
| `size-container-lg` | 4. Size › `size/container/lg` | `5a09aac48caad53bbc4ce3bdf3370a7cb4b2209c` | FLOAT | WIDTH_HEIGHT | spec |
| `size-container-sm` | 4. Size › `size/container/sm` | `edd85e82814be068c25597db8fc83994752e0a7c` | FLOAT | WIDTH_HEIGHT | spec |
| `size-container-xs` | 4. Size › `size/container/xs` | `b9fcef135f2275525eb20e99c3a9b64033f7b4f3` | FLOAT | WIDTH_HEIGHT | spec |
| `spacing-2xl` | 3. Spacing › `spacing/2xl` | `a7775480bb9a7d53f9f512cbf08b5854451df564` | FLOAT | GAP | spec |
| `spacing-layout-container` | 6. Grid & Layout › `spacing/layout/container` | `3bed90002d4c00acf31906a48972c1bf1c043e72` | FLOAT | GAP | spec |
| `spacing-layout-stack` | 6. Grid & Layout › `spacing/layout/stack` | `f6d13576769b6086fbc33c22693c11cf898fb3df` | FLOAT | GAP | spec |
| `spacing-md` | 3. Spacing › `spacing/md` | `58c93e3cec1b6ba603371a027483e101adcef4f0` | FLOAT | GAP | spec |

Code-only tokens (no Figma variable by design — motion, layers): `elevation-4` · `layer-modal` · `layer-raised` · `motion-duration-instant` · `motion-duration-lg` · `motion-duration-md` · `motion-easing-emphasized-accelerate` · `motion-easing-emphasized-decelerate` · `motion-easing-standard`. Use them only as written values in prototype settings and docs.

## 4. Text styles used (keys)

None named in B/D.

## 5. Effect styles used (keys)

| Style | Key |
|---|---|
| `Elevation/4` | `0918575e22aab65c62e4adf84b63a7d7761acc6d` |

## 6. Components to instance (keys)

Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.

### Icons (keys) — Google · Material Symbols library (D-18)

No icon named in this spec. Icons come only from the Google · Material Symbols library (Style=Rounded).

## 7. Phase 1 — values (from Part B)

### B1 API

### SideSheet
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `open` | boolean | | — | ✓ | Shows the sheet |
| `onClose` | `(reason: 'close-button' \| 'escape' \| 'scrim') => void` | | — | ✓ | Every way of closing that is not an action |
| `title` | string | (A6) | — | ✓ | `title` |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.1 |
| `mode` | enum | `modal` · `standard` | `modal` | | A4.2 |
| `onBack` | `() => void` | | — | | Shows the `back-button` (A4.3) |
| `footer` | `ReactNode` | one full-width `Button` or a `ButtonGroup` | — | | A4.4 |
| `children` | `ReactNode` | | — | ✓ | `body` |
| `initialFocusRef` | `RefObject<HTMLElement>` | | — | | First focus override |

**Invalid combinations** (`console.warn` in development, then the fallback renders):
| Combination | Fallback |
|---|---|
| `mode="standard"` below the Desktop breakpoint | renders `modal` (no warning — A8) |
| `footer` with more than one primary Button | warn; renders as given |

### B2 Dimensions

```
                                         ┌──── width sm size-container-xs · md size-container-sm · lg size-container-lg ────┐
   page (dimmed)                    ┬    ┌────────────────────────────────────────────┐ ┬ spacing-md
                                    │    │ [←]  Edit device                     [✕]   │   header padding spacing-2xl · title-lg
                                    │    │ ────────────────────────────────────────── │   divider while scrolled
                                    │    │  body · padding spacing-layout-container   │   radius-4xl all corners · elevation-4
                                    │    │  sections gap spacing-layout-stack         │
                                    │    │  [               Save changes           ]  │   footer padding spacing-layout-container
                                    ┴    └────────────────────────────────────────────┘ ┴ spacing-md
                                                                                       ├──┤ spacing-md
```

| Part | Property | Token |
|---|---|---|
| `scrim` | fill | `color-overlay-default` (modal only) |
| `container` | width | `sm` `size-container-xs` · `md` `size-container-sm` · `lg` `size-container-lg`; never wider than the window minus the inset on both sides |
| `container` | inset from the window (modal) | `spacing-md` on the top, bottom and inline end |
| `container` | background · radius · elevation (modal) | `color-surface-raised` · `radius-4xl` all corners (floating, O-04) · `elevation-4` |
| `container` | standard mode (Web) | no inset, full height, `radius-none`, no shadow; border-inline-start `border-width-default` `color-border-subtle`; the page width shrinks by the sheet width |
| `container` | stacking | `layer-modal` (modal) · `layer-raised` (standard) |
| `header` | padding · gap | `spacing-2xl` (side sheet header, spacing.md) · gap `spacing-md` |
| `title` | text style | `title-lg` · `color-text-default`; wraps to 2 lines |
| `back-button · close-button` | component | Icon button `transparent` · `neutral` · `md`; icons `arrow_back` (mirrors) · `close` |
| `body` | padding · overflow | padding-inline `spacing-layout-container`, padding-block-end `spacing-layout-container` · scrolls |
| `body` | gap between sections | `spacing-layout-stack` |
| `footer` | padding · actions | `spacing-layout-container` · one Button `filled brand lg` full width, or Button group end-aligned |
| `divider` |  | Divider default under the header and above the footer, only while the body scrolls |

Layout rules: height = window height minus the inset; header and footer hug; body fills and scrolls.

### B3 Tokens by part and state

Every value is a semantic token; there is no `side-sheet.tokens.json`.

| Part | Property | Default | Notes |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | modal |
| `container` | background | `color-surface-raised` | |
| `container` | shadow | `elevation-4` | modal; none in standard |
| `container` | border-inline-start | `color-border-subtle` | standard only (Web) |
| `title` | color | `color-text-default` | |
| `back-button` · `close-button` | — | Icon button B3 (`transparent`, `neutral`) | |
| `footer` | actions | Button B3 | |
| divider | stroke | Divider B3 (`default`) | while scrolled |

Dark theme: same tokens; no exceptions.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Closed → Open | `open` / `showBwSideSheet` | sheet slides in from the inline end · scrim opacity 0 → 1 (modal) · page width (standard) | `motion-duration-lg` | `motion-easing-emphasized-decelerate` |
| Open → Closed | close, Esc, scrim, action | slides out · scrim fades | `motion-duration-md` | `motion-easing-emphasized-accelerate` |
| View → second view | `onBack` set / content change | body cross-fade | `motion-duration-md` | `motion-easing-standard` |

Reduced motion: slide and fade become `motion-duration-instant`.

### B5 RTL

```
LTR  page ……………………  │ [←] Edit device              [✕] │   ← slides in from the right
RTL  │ [✕]              تعديل الجهاز [→] │  …………………… page   ← slides in from the left
```

| Part | In RTL |
|---|---|
| position | Opens from the inline end: right in LTR, left in RTL; slides from that edge |
| header | Back button at the start, close at the end (mirrored order) |
| `back-button` icon | Mirrors (`arrow_back` points right in RTL) |
| `close-button` icon | Does not mirror |
| standard border | On the inline start of the sheet |

### B6 Accessibility (implementation)

Design-level rules are in A9; this is how this platform meets them.

| Requirement | Implementation |
|---|---|
| Role / semantics | Modal: `role="dialog"` `aria-modal="true"` `aria-labelledby` → title. Standard: `<aside aria-labelledby>` (complementary landmark), no focus trap |
| Focus | Modal: `initialFocusRef`, else the first focusable field, else the close button; trapped; returns to the opener on close. Standard: focus moves to the title on open, not trapped |
| Page behind | Modal: `inert` / `aria-hidden` through MUI, scroll locked |
| Buttons | Close "Close" / "إغلاق"; back "Back" / "رجوع" (Icon button tooltips) |
| Screen reader output | "Edit device, dialog" |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Modal: inside the sheet only. Standard: normal page order |
| Esc | Closes (modal and standard) |
| Enter / Space | Activate the focused control |

## 8. Phase 1 — build the component set (from Part D)

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Side sheet |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Side sheet` › sections `Side sheet` and `Side sheet — Documentation` |
| Mode | **Create new.** The anatomy comes from the legacy Web `↳ Slide Out Panel` screens (frames such as `3741:4340`; floating, inset, rounded); they stay in `_Deprecation Ground`, untouched |
| Depends on | Button, Icon Button and Divider sets in this file; `.Scrim` from the Dialog page |
| Plan version | 1 · 2026-11-13 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `figma-read-tokens.js` lint must report 0.
- Nested parts are instances of the sets already in this file (Button, Icon Button, Divider) — never detached, never redrawn.
- The `scrim` is a private base component `.Scrim` (one per file, shared by Dialog, Bottom sheet and Side sheet): a frame filled with `color/overlay/default`, no other properties. Examples place the overlay component on top of it inside a device frame.

### D2 Component structure

```
❖ Side sheet                      ← component set (published)
  └─ ◇ .Side sheet/body            ← private placeholder slot (sections of text, banner, fields)
```

### D3 Layer tree and auto layout

```
Side sheet                 ↕ vertical · width FIXED bound to size/container/xs|sm|lg (Size) · height 720 example (fills the device frame in docs)
│                            Modal: radius/4xl all corners · fill color/surface/raised · Elevation/4
│                            Standard: radius/none · stroke-left color/border/subtle border/width/default · no effect
├── header                 ↔ padding spacing/2xl · gap spacing/md · counter-axis centre
│   ├── back-button        ◇ Icon Button transparent · neutral · md · arrow_back · BOOLEAN `Back button`
│   ├── title              T title/lg · color/text/default · fill · TEXT `Title`
│   └── close-button       ◇ Icon Button transparent · neutral · md · close
├── body                   ◇ .Side sheet/body · fill both · padding-inline spacing/layout/container · INSTANCE_SWAP `Body`
└── footer                 ↕ padding spacing/layout/container · BOOLEAN `Footer`
    └── footer-action      ◇ Button filled · brand · lg · width fill · TEXT via nested label
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Size` | VARIANT | `SM` · `MD` · `LG` | `MD` | `size` | `sm` · `md` · `lg` |
| `Mode` | VARIANT | `Modal` · `Standard` | `Modal` | `mode` | `modal` · `standard` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Title` | TEXT | | `Edit device` | `title` | |
| `Back button` | BOOLEAN | | `false` | `onBack` | set / null |
| `Footer` | BOOLEAN | | `true` | `footer` | present / absent |
| `Body` | INSTANCE_SWAP | preferred: `.Side sheet/body` | | `children` / `content` | |

### D5 Variants to generate

- Axes: `Size × Mode × Language` = 3 × 2 × 2 = **12** variants
- Grid: rows = Size × Mode, columns = Language; gap `spacing/xl`

### D6 States, interactions and motion

No prototype interactions on the set. Opening, dragging, the detents and closing are shown on doc page 04 with B4 timings written next to them.

### D7 RTL

`Language=AR` variants: Typography mode `Web · AR`, auto layout direction from the text, layout per B5; Arabic copy from A6. The `close` and `check` glyphs do not mirror; `arrow_back` mirrors.

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Side sheet — Documentation`, frames `Side sheet / 00 Component sheet` … `Side sheet / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Side sheet:
- 01 Introduction: Light + Dark panels, an `MD` modal sheet over a Desktop frame with the scrim, legacy content rebuilt (info banner, sectioned cards, Save)
- 03 Variations: Size; Mode (modal floating vs standard attached beside a table); back button on a second view; footer on / off
- 07 Platform: the A8 table; standard falls back to modal below Desktop
- 08 RTL: the sheet on the left in Arabic, back arrow mirrored
- 05 Usage: the A7 pairs, built with live instances

Component description: "A panel that slides in from the side of the window to show details or a longer task while the page stays in view. Spec: 3-web-components/components/side-sheet/side-sheet.md".

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

- File: `3-web-components/src/components/side-sheet/SideSheet.figma.tsx`
- Mapping: D4. Publish after the code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component>` or `<Component> / <Axis>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Side sheet`, private components and layer names match D2–D3 and A2
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

1. Fill [D11 Execution log](side-sheet.md#d11-execution-log-filled-by-the-figma-agent) in `side-sheet.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `side-sheet.md` and in `3-web-components/README.md`.
3. `npm run sync:done:web` — records this contract as built in the Web file.
4. Add one line to the root `CHANGELOG.md`.
