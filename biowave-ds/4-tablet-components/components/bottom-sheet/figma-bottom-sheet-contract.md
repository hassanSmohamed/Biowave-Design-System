<!-- GENERATED from bottom-sheet.md @ 07739c684d4570e4 — do not edit; change the source and run: npm run contract -- tablet bottom-sheet -->
# Bottom sheet · اللوحة السفلية — Tablet — Figma contract

> **Everything the Figma Agent needs to build Bottom sheet in the Tablet Components file, with our variables and styles.** Read this file only. Generated from [`bottom-sheet.md`](bottom-sheet.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-11-05). Questions go to [D11 Execution log](bottom-sheet.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Tablet Components** · key `KTlAsEow60qCiYyU3J90kp` · https://www.figma.com/design/KTlAsEow60qCiYyU3J90kp |
| Page | `↳ Bottom sheet` (one page per component) |
| Component | Bottom sheet · اللوحة السفلية |
| Platform | Tablet · Flutter + Material 3 |
| Version | 1.0 · 2026-11-13 |
| Source | [`bottom-sheet.md`](bottom-sheet.md) @ `07739c684d4570e4` |

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
| `color-background-transparent-pressed` | 1. Themes › `color/background/transparent/pressed` | `830ae424ad770312d061208a89f7452569d643d8` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-border-default` | 1. Themes › `color/border/default` | `ad520e82898707a0d3112a12f6f9439566c6d6c4` | COLOR | STROKE_COLOR | spec |
| `color-border-subtle` | 1. Themes › `color/border/subtle` | `07f3e9a3d1ca641c7f05d37bf2e4383e4a8e6112` | COLOR | STROKE_COLOR | spec |
| `color-icon-default` | 1. Themes › `color/icon/default` | `b0844bd913aafe8789a44bc7b647058cdae299df` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-disabled` | 1. Themes › `color/icon/disabled` | `708926473ca446a26d4a0891351f04692171f74f` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-role-brand` | 1. Themes › `color/icon/role/brand` | `73d6989d2161d900c2070cd9b67f01653e54251d` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-icon-role-error` | 1. Themes › `color/icon/role/error` | `e7e61106b7c9b1c60197d2c456ad055991cc545d` | COLOR | SHAPE_FILL, STROKE_COLOR | spec |
| `color-overlay-default` | 1. Themes › `color/overlay/default` | `3ecd2f2ffb4741abe966b362763abdda03333e76` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-surface-raised` | 1. Themes › `color/surface/raised` | `92b71ada5e0cffef4eec84e17092c1f3d81da69f` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-text-default` | 1. Themes › `color/text/default` | `4ea63d9ab5254c4df4eba4d26f771377a07929c4` | COLOR | TEXT_FILL | spec |
| `color-text-disabled` | 1. Themes › `color/text/disabled` | `f88c10f90f454d356c14cc3240da0f04eafbbedd` | COLOR | TEXT_FILL | spec |
| `color-text-role-error` | 1. Themes › `color/text/role/error` | `99d512c8b115971ff7f8045c6decd1cada845f37` | COLOR | TEXT_FILL | spec |
| `radius-4xl` | 2. Radius › `radius/4xl` | `a2d1c8c46c25b7c73e9257b28732ea9ec156c6bb` | FLOAT | CORNER_RADIUS | spec |
| `radius-full` | 2. Radius › `radius/full` | `cde1a4778562f488d8f32680d4d00f7957cc2a21` | FLOAT | CORNER_RADIUS | spec |
| `size-container-lg` | 4. Size › `size/container/lg` | `5a09aac48caad53bbc4ce3bdf3370a7cb4b2209c` | FLOAT | WIDTH_HEIGHT | spec |
| `size-control-height-lg` | 4. Size › `size/control/height/lg` | `14c0f56d2add6f7149374e67cf4d3a2656aeb5dc` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-lg` | 4. Size › `size/icon/lg` | `e79bd86fedcce89547674c84c9127d0149e60061` | FLOAT | WIDTH_HEIGHT | spec |
| `size-icon-xl` | 4. Size › `size/icon/xl` | `06927be084b4fad4d4203a7fe7b6922e446d1c84` | FLOAT | WIDTH_HEIGHT | spec |
| `spacing-layout-container` | 6. Grid & Layout › `spacing/layout/container` | `3bed90002d4c00acf31906a48972c1bf1c043e72` | FLOAT | GAP | spec |
| `spacing-lg` | 3. Spacing › `spacing/lg` | `6976021b7dd1218f670faa6dd403943fbe7b2638` | FLOAT | GAP | spec |
| `spacing-xl` | 3. Spacing › `spacing/xl` | `5fa0c2ce8ae034e9696038d2704e520fd8383e55` | FLOAT | GAP | spec |
| `spacing-xs` | 3. Spacing › `spacing/xs` | `9ea993d003d5368c5100b038d51c7c8f3e95c115` | FLOAT | GAP | spec |

Code-only tokens (no Figma variable by design — motion, layers): `elevation-4` · `motion-duration-instant` · `motion-duration-lg` · `motion-duration-md` · `motion-duration-sm` · `motion-easing-emphasized-accelerate` · `motion-easing-emphasized-decelerate` · `motion-easing-standard`. Use them only as written values in prototype settings and docs.

## 4. Text styles used (keys)

None named in B/D.

## 5. Effect styles used (keys)

| Style | Key |
|---|---|
| `Elevation/4` | `0918575e22aab65c62e4adf84b63a7d7761acc6d` |

## 6. Components to instance (keys)

Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.

### Icons (keys) — Google · Material Symbols library (D-18)

Library file **Google · Material Symbols** · key `RXlnhYgUKBBE6HveEr7e9C` — must be enabled in this file. Import the set, then use the **Style=Rounded** variant (`Fill=Filled` only for selected states). Colour the glyph by binding its vector fills to the icon colour token of the part.

| Icon | Set key | Rounded (unfilled) | Rounded (filled) |
|---|---|---|---|
| `attach_file` | ⏳ not indexed — Planner runs `npm run sync:icons:plan` | | |
| `photo_camera` | ⏳ not indexed — Planner runs `npm run sync:icons:plan` | | |

## 7. Phase 1 — values (from Part B)

### B1 API

### showBwBottomSheet / BwBottomSheet
`Future<T?> showBwBottomSheet<T>({required BuildContext context, required BwBottomSheet sheet})` opens a modal sheet and returns the value passed to `Navigator.pop` (the chosen option or action).

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `type` | `BwBottomSheetType` | `standard` · `list` · `action` | `standard` | | A4.1 |
| `detent` | `BwBottomSheetDetent` | `auto` · `full` | `auto` | | A4.2 |
| `title` | `String?` | (A6) | — | | `header` title; no header when null |
| `closeButton` | `bool` | | `true` | | Close button in the header |
| `content` | `Widget?` | any | — | with `standard` | `content` for `standard` |
| `options` | `List<BwSheetOption<T>>` | `label`, `value`, `trailing`, `enabled` | — | with `list` | Rows for `list`; `selected` marks the chosen value |
| `selected` | `T?` | | — | | The chosen option in a `list` |
| `actions` | `List<BwSheetAction>` | `label`, `icon`, `destructive`, `onPressed` | — | with `action` | Rows for `action` (2–6) |
| `footerAction` | `BwDialogAction?` | | — | | A4.3 — full-width primary Button |
| `dismissible` | `bool` | | `true` | | A4.4 |
| `onDismissAttempt` | `Future<bool> Function()?` | | — | | Called when `dismissible` is false and the user drags down or taps the scrim; return `true` to close (e.g. after "Discard changes?") |

Platform naming: Web has no Bottom sheet (A8 of Dialog / Side sheet).

**Invalid combinations** (`assert` in debug, fallback in release):
| Combination | Fallback |
|---|---|
| `type: list` without `options`, or `type: action` without `actions` | assert; release shows an empty sheet with the title |
| `actions` fewer than 2 or more than 6 | assert "Use 2–6 actions"; release renders them |
| `footerAction` with `type: list` or `action` | assert; release ignores the footer |

### B2 Dimensions

```
            ┌─────────────────── max width size-container-lg, centred ───────────────────┐
        ┬   │                         ━━━━  grabber                                      │  radius-4xl top corners
        │   │  Filter by status                                               [✕]       │  title-lg · padding spacing-layout-container
        │   │ ────────────────────────────────────────────────────────────────────────── │  divider while scrolled
        │   │  ○ Pending                                                       12        │  row min height size-control-height-lg
        │   │  [                            Apply                                     ]  │  Button lg full width
        ┴   └────────────────────────────────────────────────────────────────────────────┘
```

| Part | Property | Token | Flutter |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | `barrierColor: overlayDefault` |
| `container` | width | full width up to `size-container-lg`, centred | `constraints: BoxConstraints(maxWidth: BwSize.containerLg)` |
| `container` | max height | `auto`: content up to 90% of the screen · `full`: screen below the status bar | `isScrollControlled: true`; `DraggableScrollableSheet` for `full` |
| `container` | background · radius · elevation | `color-surface-raised` · `radius-4xl` top corners only · `elevation-4` | `backgroundColor`, `shape: RoundedRectangleBorder(borderRadius: BorderRadiusDirectional.vertical(top: Radius.circular(BwRadius.xl4)))`, shadow `e4`, `surfaceTintColor: Colors.transparent` |
| `grabber` | size · radius · fill | width `size-icon-xl` · height `spacing-xs` · `radius-full` · `color-border-default` | `showDragHandle: true`, `dragHandleSize: Size(BwSize.iconXl, BwSpacing.xs)`, `dragHandleColor: borderDefault` |
| `grabber` | area | padding-block `spacing-lg` | framework drag handle area (48dp target) |
| `header` | padding · gap | padding-inline `spacing-layout-container`, padding-block-end `spacing-lg` · gap `spacing-xl` | `EdgeInsetsDirectional` |
| `header` | title | `title-lg` · `color-text-default` | `context.bw.text.titleLg` |
| `header` | close button | Icon button `transparent` · `neutral` · `md`, icon `close` | `BwIconButton` |
| `content` | padding | padding-inline `spacing-layout-container` (`standard`); rows full width | |
| row (`list` · `action`) | layout | min height `size-control-height-lg` · padding-inline `spacing-layout-container` · padding-block `spacing-lg` · gap `spacing-xl` | `ListTile`-like `InkWell` row |
| row | text · icon | `body-md` · leading icon `size-icon-lg` (`action`) · trailing `check` `size-icon-lg` (`list`, chosen row) | |
| `footer` | layout | padding `spacing-layout-container`; Button `filled brand lg` full width | `BwButton(fullWidth: true, size: lg)` |
| divider | | Divider default under the header, only while the content scrolls | `BwDivider` |

### B3 Tokens by part and state

Every value is a semantic token; there is no `bottom-sheet.tokens.json` (nested Button, Icon button and Divider carry their own).

| Part | Property | Default | Pressed | Selected | Disabled |
|---|---|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | — | — | — |
| `container` | background | `color-surface-raised` | — | — | — |
| `container` | shadow | `elevation-4` | — | — | — |
| `grabber` | fill | `color-border-default` | — | — | — |
| title | color | `color-text-default` | — | — | — |
| row | background | transparent | `color-background-transparent-pressed` | — | — |
| row | label | `color-text-default` | — | `color-text-default` | `color-text-disabled` |
| row | check icon | — | — | `color-icon-role-brand` | — |
| row (`action`) | icon | `color-icon-default` | — | — | `color-icon-disabled` |
| destructive row | label · icon | `color-text-role-error` · `color-icon-role-error` | `color-background-transparent-pressed` | — | `color-text-disabled` |
| row separator · header divider | stroke | `color-border-subtle` | — | — | — |

Dark theme: same tokens; no exceptions.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Closed → Open | `showBwBottomSheet` | scrim opacity · sheet slides up from below the screen | `motion-duration-lg` | `motion-easing-emphasized-decelerate` |
| Open → Closed | row tap, footer / Done, scrim, back, drag release past half | sheet slides down · scrim fades | `motion-duration-md` | `motion-easing-emphasized-accelerate` |
| Dragging | finger on grabber or header | sheet follows the finger (no easing) | — | — |
| Release → snap | drag released | to the nearest detent | `motion-duration-md` | `motion-easing-standard` |
| Row pressed | touch down | row background | `motion-duration-sm` | `motion-easing-standard` |

Reduced motion: slide and fade become `motion-duration-instant`; dragging still follows the finger.

### B5 RTL

| Part | In RTL |
|---|---|
| layout | Mirrors: title at the start (right), close button at the end (left) |
| rows | Label at the start, counts and check at the end (left) |
| icons | `check`, `close`, `photo_camera`, `attach_file` do not mirror; `arrow_back` / `chevron_forward` mirror |
| grabber | Centred (no change) |

### B6 Accessibility (implementation)

Design-level rules are in A9; this is how this platform meets them.

| Requirement | Implementation |
|---|---|
| Role / semantics | Modal route: `Semantics(scopesRoute: true, namesRoute: true, label: title)`; screen behind excluded |
| Focus | Focus moves into the sheet (first row or field); returns to the trigger on close |
| Drag alternative | Close button (Android, Tablet) or Cancel (iOS) and the back gesture; `dismissible: false` still offers Cancel (WCAG 2.5.7) |
| Rows | `Semantics(button: true, selected: chosen, inMutuallyExclusiveGroup: true)` for `list` |
| Target size | Rows ≥ `size-control-height-lg` (48dp), grabber area ≥ 48dp |
| Keyboard | `viewInsets` lift the sheet above the on-screen keyboard |
| Screen reader output | "Filter by status, sheet. Approved, selected, 2 of 3" |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves through the sheet only |
| Esc | Closes when `dismissible` (else `onDismissAttempt`) |
| Enter / Space | Activates the focused row or action |

## 8. Phase 1 — build the component set (from Part D)

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Tablet set in **Biowave DS — Tablet Components**.

| Field | Value |
|---|---|
| Component | Bottom sheet |
| Figma file | **Biowave DS — Tablet Components** (`_sync/figma-files.json` › `tablet`) — never the Foundations file |
| Page / section | `↳ Bottom sheet` › sections `Bottom sheet` and `Bottom sheet — Documentation` |
| Mode | **Create new.** Reuse the legacy Mobile `Bottom Sheet` sets (Foundations `4131:10299`: header Cancel · Title · Reset, status / date / member / device content, Apply footer) for content and the iOS header; legacy sets stay in `_Deprecation Ground`, untouched, plus the Material 3 `Bottom sheet` |
| Depends on | Button, Icon Button and Divider sets in this file; `.Scrim` from the Dialog page (create it there first if Dialog is not built) |
| Plan version | 1 · 2026-11-13 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `figma-read-tokens.js` lint must report 0.
- **Typography mode:** on page `↳ Bottom sheet` set the explicit variable mode **`Tablet · EN`** of `5. Typography` (Arabic variants and examples: **`Tablet · AR`**).
- Nested parts are instances of the sets already in this file (Button, Icon Button, Divider) — never detached, never redrawn.
- The `scrim` is a private base component `.Scrim` (one per file, shared by Dialog, Bottom sheet and Side sheet): a frame filled with `color/overlay/default`, no other properties. Examples place the overlay component on top of it inside a device frame.

### D2 Component structure

```
❖ Bottom sheet                    ← component set (published)
  ├─ ◇ .Bottom sheet/row           ← private: one row (Type=List · Action, Selected, Destructive)
  └─ ◇ .Bottom sheet/content       ← private placeholder slot for `standard`
```

### D3 Layer tree and auto layout

```
Bottom sheet               ↕ vertical · width FIXED bound to size/container/lg · radius/4xl top-left + top-right only · fill color/surface/raised · Elevation/4
├── grabber-area           ↕ centred · padding-block spacing/lg
│   └── grabber            ▭ width size/icon/xl · height spacing/xs · radius/full · fill color/border/default
├── header                 ↔ padding-inline spacing/layout/container · gap spacing/xl · BOOLEAN `Header`
│   ├── title              T title/lg · color/text/default · fill · TEXT `Title`
│   └── close-button       ◇ Icon Button transparent · neutral · md · close
├── content                ↕ (Standard: ◇ .Bottom sheet/content, INSTANCE_SWAP `Content`; List / Action: 3–4 ◇ .Bottom sheet/row)
└── footer                 ↕ padding spacing/layout/container · BOOLEAN `Footer` (Standard only)
    └── footer-action      ◇ Button filled · brand · lg · width fill
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `Type` | VARIANT | `Standard` · `List` · `Action` | `Standard` | `type` | `standard` · `list` · `action` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Header` | BOOLEAN | | `true` | `title` | set / null |
| `Title` | TEXT | | `Filter by status` | `title` | |
| `Footer` | BOOLEAN | | `false` | `footerAction` | present / absent |
| `Content` | INSTANCE_SWAP | preferred: `.Bottom sheet/content` | | `content` | |

### D5 Variants to generate

- Axes: `Type × Language` = 3 × 2 = **6** variants (`detent` is shown on doc page 03 by resizing instances, not as an axis)
- Grid: rows = Type, columns = Language; gap `spacing/xl`

### D6 States, interactions and motion

No prototype interactions on the set. Opening, dragging, the detents and closing are shown on doc page 04 with B4 timings written next to them.

### D7 RTL

`Language=AR` variants: Typography mode `Tablet · AR`, auto layout direction from the text, layout per B5; Arabic copy from A6. The `close` and `check` glyphs do not mirror; `arrow_back` mirrors.

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Bottom sheet — Documentation`, frames `Bottom sheet / 00 Component sheet` … `Bottom sheet / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Bottom sheet:
- 01 Introduction: Light + Dark panels, a `List` sheet over a Tablet frame with the scrim
- 03 Variations: Type × detent (`auto`, `full`), footer on / off, legacy content rebuilt (status with counts, member picker)
- 07 Platform: the A8 table; landscape with the sheet centred
- 05 Usage: the A7 pairs, built with live instances

Component description: "A panel that slides up from the bottom of a touch screen to show choices, actions or a short task without leaving the screen. Spec: 4-tablet-components/components/bottom-sheet/bottom-sheet.md".

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

- File: `4-tablet-components/lib/src/components/bottom_sheet/bw_bottom_sheet.figma.dart`
- Mapping: D4. Publish after the code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component>` or `<Component> / <Axis>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Bottom sheet`, private components and layer names match D2–D3 and A2
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

1. Fill [D11 Execution log](bottom-sheet.md#d11-execution-log-filled-by-the-figma-agent) in `bottom-sheet.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `bottom-sheet.md` and in `4-tablet-components/README.md`.
3. `npm run sync:done:tablet` — records this contract as built in the Tablet file.
4. Add one line to the root `CHANGELOG.md`.
