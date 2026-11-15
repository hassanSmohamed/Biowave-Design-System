<!-- GENERATED from empty-state.md @ f35abde3ec1873cd — do not edit; change the source and run: npm run contract -- web empty-state -->
# Empty state · حالة فراغ — Web — Figma contract

> **Everything the Figma Agent needs to build Empty state in the Web Components file, with our variables and styles.** Read this file only. Generated from [`empty-state.md`](empty-state.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-11-13). Questions go to [D11 Execution log](empty-state.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Web Components** · key `7nDhsPNntzIWlrjmuSmZ9l` · https://www.figma.com/design/7nDhsPNntzIWlrjmuSmZ9l |
| Page | `↳ Empty state` (one page per component) |
| Component | Empty state · حالة فراغ |
| Platform | Web · React + MUI |
| Version | 1.0 · 2026-11-14 |
| Source | [`empty-state.md`](empty-state.md) @ `f35abde3ec1873cd` |

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
| `border-width-focus` | 7. Border › `border/width/focus` | `d660bcb01777958134799fe11a99a63aaf1fbfca` | FLOAT | STROKE_FLOAT | spec |
| `color-border-focus` | 1. Themes › `color/border/focus` | `ef666d3badd2b63f18cb168d9987ead7fbc21480` | COLOR | STROKE_COLOR | spec |
| `color-icon-subtlest` | 1. Themes › `color/icon/subtlest` | `22b53651f4efa195f0dfb625922d0279003534eb` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-surface-default` | 1. Themes › `color/surface/default` | `2013a1c60d84d2bac2524fd0c32229e20cc341a1` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-surface-subtle` | 1. Themes › `color/surface/subtle` | `5963036a1ce77158a13d05d89008d80267f7be1f` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-text-default` | 1. Themes › `color/text/default` | `4ea63d9ab5254c4df4eba4d26f771377a07929c4` | COLOR | TEXT_FILL | spec |
| `color-text-subtle` | 1. Themes › `color/text/subtle` | `dac97f2fd2a80ccffd6283bcc06c623f64ebe90a` | COLOR | TEXT_FILL | spec |
| `color-text-subtlest` | 1. Themes › `color/text/subtlest` | `8ff5fe7707ac2ac866b453191dea9cdd680d0c8d` | COLOR | TEXT_FILL | spec |
| `radius-full` | 2. Radius › `radius/full` | `cde1a4778562f488d8f32680d4d00f7957cc2a21` | FLOAT | CORNER_RADIUS | spec |
| `size-container-sm` | 4. Size › `size/container/sm` | `edd85e82814be068c25597db8fc83994752e0a7c` | FLOAT | WIDTH_HEIGHT | spec |
| `size-container-xs` | 4. Size › `size/container/xs` | `b9fcef135f2275525eb20e99c3a9b64033f7b4f3` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-2xl` | 4. Size › `size/icon/2xl` | `5d82d1a47d232577418f3cff87dbefe1d0a02765` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-3xl` | 4. Size › `size/icon/3xl` | `160abf1bfcc5ce1bec8193ea16a9df21e4c6b387` | FLOAT | WIDTH_HEIGHT | spec |
| `spacing-2xl` | 3. Spacing › `spacing/2xl` | `a7775480bb9a7d53f9f512cbf08b5854451df564` | FLOAT | GAP | spec |
| `spacing-3xl` | 3. Spacing › `spacing/3xl` | `5074b95f9af7de39e16a9c1f1796ca42e5d08925` | FLOAT | GAP | spec |
| `spacing-md` | 3. Spacing › `spacing/md` | `58c93e3cec1b6ba603371a027483e101adcef4f0` | FLOAT | GAP | spec |
| `spacing-xl` | 3. Spacing › `spacing/xl` | `5fa0c2ce8ae034e9696038d2704e520fd8383e55` | FLOAT | GAP | spec |
| `spacing-xs` | 3. Spacing › `spacing/xs` | `9ea993d003d5368c5100b038d51c7c8f3e95c115` | FLOAT | GAP | spec |

Code-only tokens (no Figma variable by design — motion, layers): `motion-duration-md` · `motion-easing-standard-decelerate`. Use them only as written values in prototype settings and docs.

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

### EmptyState (Web)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `size` | `'md' \| 'sm'` | `'md'` | | `md` page/section vs `sm` compact card/table (FB-06) |
| `visual` | `ReactNode \| null` | default search icon badge | | Illustration or icon node; pass `null` to hide |
| `title` | `string` | — | ✓ | Primary heading |
| `description` | `string` | `—` | | Supporting explanation |
| `primaryAction` | `{ label: string; onClick: () => void }` | `—` | | Optional filled primary `Button` |
| `secondaryAction` | `{ label: string; onClick: () => void }` | `—` | | Optional outlined secondary `Button` |

**Invalid combinations** (`console.warn` in development):
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
| Semantics | Root container `<section>` or `<div role="status">`; decorative `visual` marked `aria-hidden="true"`; `title` renders heading |
| Actions | Keyboard focusable (`border-width-focus` `color-border-focus`), clear verb labels |

## 8. Phase 1 — build the component set (from Part D)

> Written by the Planner (Antigravity) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Empty state |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Empty state` › sections `Empty state — Component` and `Empty state — Documentation` |
| Mode | **Create new** in **Biowave DS — Web Components** (replaces ad-hoc Foundations `TableEmpty` / `Table/Empty` frames; Foundations frames stay untouched). |
| Depends on | `.Button _en` / `.Button _ar`, Icons & Foundations library variables |
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

`Language=AR`: Typography mode `Web · AR`; centered layout swaps button pair order (Primary on right in RTL); Arabic copy uses A6 examples.

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Empty state — Documentation`, frames `Empty state / 00 Component sheet` … `Empty state / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Empty state:
- 01: `MD` empty page example and `SM` compact card example
- 03: `Size = MD · SM`, with/without visual and secondary action
- 05 Usage: A7 Do/Don't pairs with live instances

Component description: "Explains why a page, section, card or Data table has no items to show and offers a clear next action in `md` (page) or `sm` (compact) size.. Spec: 3-web-components/components/empty-state/empty-state.md".

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

- File: `3-web-components/src/components/empty-state/EmptyState.figma.tsx`
- Mapping: D4 table. Publish after the code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component>` or `<Component> / <Axis>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Empty state`, nested instances and layer names match D2–D3 and A2
- [ ] F-AC-2 Properties match D4 exactly (names, types, values, defaults)
- [ ] F-AC-3 Variant count = D5
- [ ] F-AC-4 Zero raw values: fills, radius, padding, gaps, sizes, text and effects bound (lint 0)
- [ ] F-AC-5 Correct in Light and Dark (variable mode switch only)
- [ ] F-AC-6 AR variants per D7; Arabic copy fits without truncation
- [ ] F-AC-7 Component description filled; no prototype interactions on the set
- [ ] F-AC-8 Values match B2–B3 one by one (redline check)
- [ ] F-AC-9 Every documentation page in D8 exists, in order, built only from Doc Kit components with live instances

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](empty-state.md#d11-execution-log-filled-by-the-figma-agent) in `empty-state.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `empty-state.md` and in `3-web-components/README.md`.
3. `npm run sync:done:web` — records this contract as built in the Web file.
4. Add one line to the root `CHANGELOG.md`.
