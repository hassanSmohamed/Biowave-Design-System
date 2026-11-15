<!-- GENERATED from alert.md @ aa4cc7e0b87cea06 — do not edit; change the source and run: npm run contract -- web alert -->
# Alert · تنبيه — Web — Figma contract

> **Everything the Figma Agent needs to build Alert in the Web Components file, with our variables and styles.** Read this file only. Generated from [`alert.md`](alert.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-11-13). Questions go to [D11 Execution log](alert.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Web Components** · key `7nDhsPNntzIWlrjmuSmZ9l` · https://www.figma.com/design/7nDhsPNntzIWlrjmuSmZ9l |
| Page | `↳ Alert` (one page per component) |
| Component | Alert · تنبيه |
| Platform | Web · React + MUI |
| Version | 1.0 · 2026-11-14 |
| Source | [`alert.md`](alert.md) @ `aa4cc7e0b87cea06` |

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
| `border-focus-offset` | 7. Border › `border/focus/offset` | `b90b6264cf3202aa473578d22cb211167afe775d` | FLOAT | GAP | spec |
| `border-width-default` | 7. Border › `border/width/default` | `9b62f24ecdfc438789ce3fa296e725ac14b1e08f` | FLOAT | STROKE_FLOAT | spec |
| `border-width-focus` | 7. Border › `border/width/focus` | `d660bcb01777958134799fe11a99a63aaf1fbfca` | FLOAT | STROKE_FLOAT | spec |
| `color-background-error-subtlest` | 1. Themes › `color/background/error/subtlest` | `911487c1c8126b7bae7dc7d34d75e1d5bfc69036` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-info-subtlest` | 1. Themes › `color/background/info/subtlest` | `0095149ccd0c639b4218e4b1054ec9c340dea25a` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-success-subtlest` | 1. Themes › `color/background/success/subtlest` | `58ef033cb8fdf8cbf05fef51018eb20801ff4bac` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-background-warning-subtlest` | 1. Themes › `color/background/warning/subtlest` | `b98870f4d062bfaf523703703b233798a2ec0c56` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-border-default` | 1. Themes › `color/border/default` | `ad520e82898707a0d3112a12f6f9439566c6d6c4` | COLOR | STROKE_COLOR | spec |
| `color-border-error` | 1. Themes › `color/border/error` | `28b0f15306faf6c8113f5acdf14ed8fc66e02c57` | COLOR | STROKE_COLOR | spec |
| `color-border-focus` | 1. Themes › `color/border/focus` | `ef666d3badd2b63f18cb168d9987ead7fbc21480` | COLOR | STROKE_COLOR | spec |
| `color-border-info` | 1. Themes › `color/border/info` | `df6d00488697e55fe6bd439d9ef9888d85c9a3d7` | COLOR | STROKE_COLOR | spec |
| `color-border-success` | 1. Themes › `color/border/success` | `a6bc4e451961378013cbf0f536417a2a9fba0daa` | COLOR | STROKE_COLOR | spec |
| `color-border-warning` | 1. Themes › `color/border/warning` | `d327d60eda883f8a19982118ed7843d57671a416` | COLOR | STROKE_COLOR | spec |
| `color-icon-role-error` | 1. Themes › `color/icon/role/error` | `e7e61106b7c9b1c60197d2c456ad055991cc545d` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-role-info` | 1. Themes › `color/icon/role/info` | `9bbd326956964ff857cb9e3a5f9e0f41883fe168` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-role-success` | 1. Themes › `color/icon/role/success` | `096b2f9e4c965c38f55d3dd051dbff93f36a33e5` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-role-warning` | 1. Themes › `color/icon/role/warning` | `3fa016bcd1409896b81681403e6a214dcc365fda` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-subtle` | 1. Themes › `color/icon/subtle` | `fc66c13d6c036489bf774535cd8dbbf749795748` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-surface-default` | 1. Themes › `color/surface/default` | `2013a1c60d84d2bac2524fd0c32229e20cc341a1` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-surface-subtle` | 1. Themes › `color/surface/subtle` | `5963036a1ce77158a13d05d89008d80267f7be1f` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-text-default` | 1. Themes › `color/text/default` | `4ea63d9ab5254c4df4eba4d26f771377a07929c4` | COLOR | TEXT_FILL | spec |
| `color-text-role-error` | 1. Themes › `color/text/role/error` | `99d512c8b115971ff7f8045c6decd1cada845f37` | COLOR | TEXT_FILL | spec |
| `color-text-role-info` | 1. Themes › `color/text/role/info` | `f4c1549db7800b52c7614f14ca0e63b586f2e061` | COLOR | TEXT_FILL | spec |
| `color-text-role-success` | 1. Themes › `color/text/role/success` | `4d99dc192c15bc4d84ab06b0d7dfa29a74768030` | COLOR | TEXT_FILL | spec |
| `color-text-role-warning` | 1. Themes › `color/text/role/warning` | `298f6713572958c933c408402deaaaefd3806679` | COLOR | TEXT_FILL | spec |
| `radius-md` | 2. Radius › `radius/md` | `0758e506cdfd4d7a4eef6369a4851133d7eab5a4` | FLOAT | CORNER_RADIUS | spec |
| `size-control-height-sm` | 4. Size › `size/control/height/sm` | `1409647f4e12e37e76b49ed9ce1a78946e4250f4` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-lg` | 4. Size › `size/icon/lg` | `e79bd86fedcce89547674c84c9127d0149e60061` | FLOAT | WIDTH_HEIGHT | spec |
| `spacing-lg` | 3. Spacing › `spacing/lg` | `6976021b7dd1218f670faa6dd403943fbe7b2638` | FLOAT | GAP | spec |
| `spacing-md` | 3. Spacing › `spacing/md` | `58c93e3cec1b6ba603371a027483e101adcef4f0` | FLOAT | GAP | spec |
| `spacing-xl` | 3. Spacing › `spacing/xl` | `5fa0c2ce8ae034e9696038d2704e520fd8383e55` | FLOAT | GAP | spec |
| `spacing-xs` | 3. Spacing › `spacing/xs` | `9ea993d003d5368c5100b038d51c7c8f3e95c115` | FLOAT | GAP | spec |

Code-only tokens (no Figma variable by design — motion, layers): `motion-duration-instant` · `motion-duration-md` · `motion-duration-sm` · `motion-easing-standard-accelerate` · `motion-easing-standard-decelerate`. Use them only as written values in prototype settings and docs.

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

### Alert (Web)
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `status` | `'info' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | `'info'` | | Visual tone and leading status icon (FB-01) |
| `title` | `string` | `—` | | Optional short heading; hides heading row when omitted (FB-02) |
| `children` | `ReactNode` | — | ✓ | Body message (`description`) |
| `action` | `{ label: string; onClick: () => void }` | `—` | | Optional single compact button |
| `onDismiss` | `() => void` | `—` | | When provided, renders trailing `✕` IconButton |
| `closeLabel` | `string` | `'Dismiss alert'` | | Accessible label for the close button |

**Invalid combinations** (`console.warn` in development):
| Combination | Fallback |
|---|---|
| `action` provided without handler | Ignores handlerless action button, warns |
| Empty `title` string `""` passed | Treats as omitted (`Show title = false`) |

### B2 Dimensions

| Part | Property | Token |
|---|---|---|
| container | radius · border width | `radius-md` (8) · `border-width-default` (1) |
| container | padding-block · padding-inline | `spacing-lg` (12) · `spacing-xl` (16) |
| container | gap `icon`–`content` · `content`–actions | `spacing-lg` (12) · `spacing-xl` (16) |
| leading `icon` | size | `size-icon-lg` (24) |
| `content` | gap `title`–`description` | `spacing-xs` (4) |
| `title` | text style | `title-md` |
| `description` | text style | `body-md` |
| `action` · `close-button` | target height · gap between them | `size-control-height-sm` (32) · `spacing-md` (8) |

### B3 Tokens by part and state

Every value is a semantic token; there is no `alert.tokens.json`.

| Part | `info` | `success` | `warning` | `error` | `neutral` |
|---|---|---|---|---|---|
| container fill | `color-background-info-subtlest` | `color-background-success-subtlest` | `color-background-warning-subtlest` | `color-background-error-subtlest` | `color-surface-subtle` |
| container border | `color-border-info` | `color-border-success` | `color-border-warning` | `color-border-error` | `color-border-default` |
| leading `icon` | `color-icon-role-info` | `color-icon-role-success` | `color-icon-role-warning` | `color-icon-role-error` | `color-icon-subtle` |
| `title` (FB-02) | `color-text-role-info` | `color-text-role-success` | `color-text-role-warning` | `color-text-role-error` | `color-text-default` |
| `description` (titled, FB-02) | `color-text-default` | `color-text-default` | `color-text-default` | `color-text-default` | `color-text-default` |
| `description` (single-line, FB-02) | `color-text-role-info` | `color-text-role-success` | `color-text-role-warning` | `color-text-role-error` | `color-text-default` |

Contrast (Light / Dark): role text/icon on subtlest — `info` 7.36:1 / 9.21:1 · `success` 5.73:1 / 10.02:1 · `warning` 7.68:1 / 8.85:1 · `error` 6.95:1 / 8.58:1 · `neutral` 18.48:1 / 13.58:1; body `color-text-default` on subtlest ≥ 12.47:1 across all statuses; border on `color-surface-default` ≥ 3.24:1 Light / ≥ 6.64:1 Dark.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Hidden → Visible | Mount / alert shown | opacity `0 → 1`, subtle expand | `motion-duration-md` (200 ms) | `motion-easing-standard-decelerate` |
| Visible → Dismissed | Close activated | opacity `1 → 0`, collapse | `motion-duration-sm` (100 ms) | `motion-easing-standard-accelerate` |

Reduced motion: instant (`motion-duration-instant`).

### B5 RTL

| Part | In RTL |
|---|---|
| horizontal layout | Leading `icon` moves to right edge; `action` and `close-button` move to left edge |
| `title` · `description` | Right-aligned (`text-align: start`) |
| status icons | Info, check, warning and error exclamation do not mirror |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | `role="status"` (`aria-live="polite"`) for `info`/`success`/`neutral`; `role="alert"` (`aria-live="assertive"`) for dynamically injected `warning`/`error` |
| Focus | Keyboard focus outline `border-width-focus` (`color-border-focus`) with `border-focus-offset` on action & close buttons |
| Target size | `size-control-height-sm` (32) |

## 8. Phase 1 — build the component set (from Part D)

> Written by the Planner (Antigravity) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Alert |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) — never the Foundations file |
| Page / section | `↳ Alert` › sections `Alert — Component` and `Alert — Documentation` |
| Mode | **Create new.** Legacy Foundations `Banner` (`3284:367`) and `Notification Toast` (`3567:1040`) stay untouched in Foundations. |
| Depends on | `.Button _en` / `.Button _ar`, `Icon Button`, Icons & Foundations library variables |
| Plan version | 1 · 2026-11-14 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `lint-component-section.js` must report 0 unbound values.
- Nested parts are instances of the sets already in this file (`.Button _en` / `.Button _ar` or `Button`, `Icon Button`) — never detached, never redrawn.

### D2 Component structure

```
❖ Alert                           ← set: Status = Info · Success · Warning · Error · Neutral × Language = EN · AR
  ├─ icon                         ◇ Material Symbols instance (rounded)
  ├─ content                      ↕ title + description
  ├─ action                       ◇ instance .Button _en / _ar (Web) or Button (Tablet/Mobile)
  └─ close-button                 ◇ instance Icon Button
```

### D3 Layer tree and auto layout

```
Alert                     ↔ horizontal · gap spacing/lg · pad-block spacing/lg · pad-inline spacing/xl
│                           radius/md · border/width/default · stroke color/border/{status} · fill B3
├── icon                  ◇ Icon · size size/icon/lg · fill color/icon/role/{status}
├── content               ↕ vertical (fill) · gap spacing/xs
│   ├── title             T title/md · fill color/text/role/{status} · BOOLEAN `Show title` · TEXT `Title`
│   └── description       T body/md (Web) or body/lg (Tablet/Mobile) · fill color/text/default · TEXT `Description`
├── action                ◇ Button (sm Web / touch target Tablet & Mobile) · BOOLEAN `Action`
└── close-button          ◇ Icon Button · BOOLEAN `Close button`
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Status` | VARIANT | `Info` · `Success` · `Warning` · `Error` · `Neutral` | `Info` | `status` | `'info'` … `'neutral'` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Title` | TEXT | | `Heads up` / `تنبيه` | `title` | |
| `Description` | TEXT | | message copy | `children` / `description` | |
| `Show title` | BOOLEAN | | `true` | `title` present | |
| `Action` | BOOLEAN | | `true` | `action` present | |
| `Close button` | BOOLEAN | | `true` | `onDismiss` present | |

### D5 Variants to generate

- `Alert`: `Status` (5) × `Language` (2) = **10** variants.
- Grid layout: rows = `Status`, columns = `EN · AR`; gap `spacing/xl`.

### D6 States, interactions and motion

No prototype interactions on the set. Visible/dismiss transition (B4) and action button states are shown on doc page 04.

### D7 RTL

`Language=AR`: Typography mode `Web · AR`, container flips icon to right edge and action/close to left edge; copy uses A6 Arabic examples.

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Alert — Documentation`, frames `Alert / 00 Component sheet` … `Alert / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Alert:
- 01: `Warning` titled alert above a sample form/dialog preview
- 03: all 5 statuses (`Info · Success · Warning · Error · Neutral`), single-line (`Show title=false`) and titled (`Show title=true`), with/without action & close
- 05 Usage: A7 Do/Don't pairs with live instances
- 07 Platform: desktop width and narrow panel wrap

Component description: "An inline banner that communicates important contextual status (info, success, warning, error, neutral) inside a page, section, form or dialog until the condition changes or it is dismissed.. Spec: 3-web-components/components/alert/alert.md".

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

- File: `3-web-components/src/components/alert/Alert.figma.tsx`
- Mapping: D4 table (Status · Show title · Action · Close button). Publish after the code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component>` or `<Component> / <Axis>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Alert`, nested instances and layer names match D2–D3 and A2
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

1. Fill [D11 Execution log](alert.md#d11-execution-log-filled-by-the-figma-agent) in `alert.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `alert.md` and in `3-web-components/README.md`.
3. `npm run sync:done:web` — records this contract as built in the Web file.
4. Add one line to the root `CHANGELOG.md`.
