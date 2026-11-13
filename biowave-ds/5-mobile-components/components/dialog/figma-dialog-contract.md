<!-- GENERATED from dialog.md @ 07864e8ad3be57b9 — do not edit; change the source and run: npm run contract -- mobile dialog -->
# Dialog · نافذة حوار — Mobile — Figma contract

> **Everything the Figma Agent needs to build Dialog in the Mobile Components file, with our variables and styles.** Read this file only. Generated from [`dialog.md`](dialog.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-11-05). Questions go to [D11 Execution log](dialog.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Mobile Components** · key `249tIAxlZogRvgBBXjcIZ5` · https://www.figma.com/design/249tIAxlZogRvgBBXjcIZ5 |
| Page | `↳ Dialog` (one page per component) |
| Component | Dialog · نافذة حوار |
| Platform | Mobile · Flutter + Material 3 + Cupertino (adaptive, N-07) |
| Version | 1.0 · 2026-11-13 |
| Source | [`dialog.md`](dialog.md) @ `07864e8ad3be57b9` |

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
| `color-border-subtle` | 1. Themes › `color/border/subtle` | `07f3e9a3d1ca641c7f05d37bf2e4383e4a8e6112` | COLOR | STROKE_COLOR | spec |
| `color-overlay-default` | 1. Themes › `color/overlay/default` | `3ecd2f2ffb4741abe966b362763abdda03333e76` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-surface-raised` | 1. Themes › `color/surface/raised` | `92b71ada5e0cffef4eec84e17092c1f3d81da69f` | COLOR | FRAME_FILL, SHAPE_FILL | spec |
| `color-text-default` | 1. Themes › `color/text/default` | `4ea63d9ab5254c4df4eba4d26f771377a07929c4` | COLOR | TEXT_FILL | spec |
| `color-text-disabled` | 1. Themes › `color/text/disabled` | `f88c10f90f454d356c14cc3240da0f04eafbbedd` | COLOR | TEXT_FILL | spec |
| `color-text-role-brand` | 1. Themes › `color/text/role/brand` | `bf6f82d7545a8ae04bb4d55ee373397e5d16c45a` | COLOR | TEXT_FILL | spec |
| `color-text-role-error` | 1. Themes › `color/text/role/error` | `99d512c8b115971ff7f8045c6decd1cada845f37` | COLOR | TEXT_FILL | spec |
| `color-text-subtle` | 1. Themes › `color/text/subtle` | `dac97f2fd2a80ccffd6283bcc06c623f64ebe90a` | COLOR | TEXT_FILL | spec |
| `radius-3xl` | 2. Radius › `radius/3xl` | `591d461e10b84f8ba353fe4d1c2b3deaa849aabb` | FLOAT | CORNER_RADIUS | spec |
| `spacing-md` | 3. Spacing › `spacing/md` | `58c93e3cec1b6ba603371a027483e101adcef4f0` | FLOAT | GAP | spec |

Code-only tokens (no Figma variable by design — motion, layers): `elevation-4` · `motion-duration-instant` · `motion-duration-lg` · `motion-duration-md` · `motion-easing-emphasized-accelerate` · `motion-easing-emphasized-decelerate`. Use them only as written values in prototype settings and docs.

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

### showBwDialog / BwDialog
`Future<T?> showBwDialog<T>({required BuildContext context, required BwDialog dialog})` opens the dialog over a modal route and returns the value passed to `Navigator.pop`.

| Param | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `title` | `String` | plain text (A6) | — | ✓ | `title` |
| `kind` | `BwDialogKind` | `basic` · `destructive` | `basic` | | A4.2 |
| `message` | `String` | 1–3 sentences (A6) | — | ✓ | `body` — plain text only on Mobile (A8) |
| `dismissible` | `bool` | | `true` | | A4.5 — scrim tap, Esc and back |
| `primaryAction` | `BwDialogAction` | `label`, `onPressed`, `loading`, `enabled` | — | ✓ | Main action |
| `secondaryAction` | `BwDialogAction?` | | — | | Usually "Cancel" |
| `tertiaryAction` | `BwDialogAction?` | | — | | Rare third action |

Platform naming: web `children` = Flutter `message`; `onClick` = `onPressed`. The OS look is chosen by `Theme.of(context).platform` through the `.adaptive` constructors (N-07); there is no `os` param.

**Invalid combinations** (`assert` in debug, fallback in release):
| Combination | Fallback |
|---|---|
| `message` longer than 3 sentences or containing line breaks | assert "Use a Bottom sheet for longer content"; release renders it |
| `tertiaryAction` without `secondaryAction` | assert; release renders it as the secondary |

### B2 Dimensions

```
iOS — iOS and iPadOS 27 Alert                 Android — M3 Basic dialog
   ┌─────────────────────────┐                ┌───────────────────────────────┐   radius-3xl · elevation-4
   │    Delete this shift?   │ heading-md     │ Delete this shift?            │   heading-md · start-aligned
   │  Staff will be told it  │ body-md        │ Staff will be told it was     │   body-md · color-text-subtle
   │  was cancelled.         │                │ cancelled.                    │
   ├────────────┬────────────┤ separators     │              Cancel   Delete  │   text buttons · gap spacing-md
   │   Cancel   │   Delete   │                └───────────────────────────────┘
   └────────────┴────────────┘                width: M3 280–560, inset spacing-layout-container
   width and padding from the OS
```

| Part | Property | iOS (`CupertinoAlertDialog`) | Android (M3 `AlertDialog`) |
|---|---|---|---|
| `scrim` | fill | `color-overlay-default` (`barrierColor`) | `color-overlay-default` (`barrierColor`) |
| `container` | width · padding | from the OS (Apple kit) | M3 min 280 / max 560 from the framework; `insetPadding: EdgeInsets.symmetric(horizontal: context.bw.layout.container)` |
| `container` | background | `color-surface-raised` at the OS translucency (`CupertinoTheme` `barBackgroundColor`) | `color-surface-raised`; `surfaceTintColor: Colors.transparent` |
| `container` | radius · elevation | from the OS | `radius-3xl` · `elevation-4` |
| `title` | text style | `heading-md` at the OS weight, centred | `heading-md`, start-aligned |
| `body` (`message`) | text style · colour | `body-md` · `color-text-subtle`, centred | `body-md` · `color-text-subtle` |
| `footer` | actions | `CupertinoDialogAction`; primary `isDefaultAction: true` in `color-text-role-brand`; destructive `isDestructiveAction: true` in `color-text-role-error`; separators `color-border-subtle` | `TextButton`s via `BwButton(variant: text)`; primary `brand`, destructive `error`; secondary `neutral`; gap `spacing-md`, end-aligned |
| `footer` | layout | two actions side by side; three stacked (OS rule) | in one row; stacked when they do not fit (`OverflowBar`) |

Fonts: IBM Plex Sans Arabic / Inter through `context.bw.text` on both OSes (Biowave identity); the OS keeps its layout, materials and separators.

### B3 Tokens by part and state

Every value is a semantic token; there is no `dialog.tokens.json` (no component tokens — the nested Button, Icon button and Divider carry their own).

| Part | Property | Default | Pressed | Disabled |
|---|---|---|---|---|
| `scrim` | fill | `color-overlay-default` | — | — |
| `container` | background | `color-surface-raised` | — | — |
| `title` | color | `color-text-default` | — | — |
| `body` | color | `color-text-subtle` | — | — |
| primary action (iOS) | label | `color-text-role-brand` | `color-background-transparent-pressed` row fill | `color-text-disabled` |
| destructive action (iOS) | label | `color-text-role-error` | `color-background-transparent-pressed` row fill | `color-text-disabled` |
| secondary action (iOS) | label | `color-text-role-brand` (regular weight) | `color-background-transparent-pressed` row fill | `color-text-disabled` |
| action separators (iOS) | stroke | `color-border-subtle` | — | — |
| actions (Android) | — | Button `text` B3 (`brand`, `error`, `neutral`) | Button B3 | Button B3 |

Dark theme: same tokens; no exceptions.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Closed → Open | `showBwDialog` | iOS: the OS alert entrance (fade + scale, framework) · Android: opacity 0 → 1 | iOS: framework · Android: `motion-duration-lg` | iOS: framework · Android: `motion-easing-emphasized-decelerate` |
| Open → Closed | action, back (Android), scrim (Android) | opacity 1 → 0 | iOS: framework · Android: `motion-duration-md` | iOS: framework · Android: `motion-easing-emphasized-accelerate` |
| Main action → working | `primaryAction.loading` | Android: Button loading · iOS: action disabled with a spinner in place of the label | Button B4 | Button B4 |

The iOS entrance keeps Apple's timing on purpose: the alert must feel native (N-05).

Reduced motion: opacity changes become `motion-duration-instant` (Android form; the iOS alert follows the OS Reduce Motion setting).

### B5 RTL

| Part | In RTL |
|---|---|
| iOS | Title and message centred (no change); actions in a row swap order (Cancel on the right) — the framework mirrors them |
| Android | Title and text start-aligned (right); actions end-aligned (left), main action last |
| text | Arabic copy from A6; numbers and Latin names stay LTR |

### B6 Accessibility (implementation)

Design-level rules are in A9; this is how this platform meets them.

| Requirement | Implementation |
|---|---|
| Role / semantics | `Semantics(scopesRoute: true, namesRoute: true, explicitChildNodes: true, label: title)` from the dialog route (both adaptive forms) |
| Focus | Route focus scope; first field or, for `destructive`, the secondary action gets focus with a hardware keyboard; focus returns to the opener on close |
| Dismiss | `barrierDismissible: dismissible`; Esc via `DismissIntent` and Android back via `PopScope(canPop: dismissible && !loading)` |
| Close button | none (A8) |
| Target size | ≥ 48dp (`meetsGuideline(androidTapTargetGuideline)` and iOS 44pt) |
| Screen reader output | "Delete this shift?, alert, Staff will be told it was cancelled." |

| Key (hardware keyboard) | Action |
|---|---|
| Tab / Shift+Tab | Moves through the dialog only |
| Esc | Closes when `dismissible` |
| Enter / Space | Activate the focused action |

## 8. Phase 1 — build the component set (from Part D)

> Written by the Planner (Claude) together with Part C. Executed by the **Figma Agent** (build → RTL → QA → document). Reviewed by Claude.
> Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Mobile set in **Biowave DS — Mobile Components**.

| Field | Value |
|---|---|
| Component | Dialog |
| Figma file | **Biowave DS — Mobile Components** (`_sync/figma-files.json` › `mobile`) — never the Foundations file |
| Page / section | `↳ Dialog` › sections `Dialog` and `Dialog — Documentation` |
| Mode | **Create new.** No legacy Dialog set exists; the anatomy comes from the legacy product screen `LMS _Disconnect` (Web `↳ Inputs`) and the iOS and iPadOS 27 `Alert` and the Material 3 `Basic dialog` kits linked in this file |
| Depends on | Button, Icon Button and Divider sets in this file; the iOS and iPadOS 27 kit (`Alert`) and the Material 3 Design Kit (`Basic dialog`) for reference only — never instanced inside the set |
| Plan version | 1 · 2026-11-13 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build): library first, every value bound to a Foundations variable, text style or effect style; no local variables or styles. This component has no component tokens, so layers bind the semantic variables named in B2–B3 directly; `figma-read-tokens.js` lint must report 0.
- **Typography mode:** on page `↳ Dialog` set the explicit variable mode **`Mobile · EN`** of `5. Typography` (Arabic variants and examples: **`Mobile · AR`**).
- Nested parts are instances of the sets already in this file (Button, Icon Button, Divider) — never detached, never redrawn.
- The `scrim` is a private base component `.Scrim` (one per file, shared by Dialog, Bottom sheet and Side sheet): a frame filled with `color/overlay/default`, no other properties. Examples place the overlay component on top of it inside a device frame.

### D2 Component structure

```
❖ Dialog                          ← component set (published)
  ├─ ◇ .Scrim                      ← private, shared with Bottom sheet
  ├─ ◇ .Dialog/ios-action          ← private: one iOS alert action (label + state)
  └─ ◇ .Dialog/body                ← private placeholder (not used on Mobile — text only)
```

### D3 Layer tree and auto layout

```
Dialog (OS=iOS)            ↕ vertical · width from the Apple kit · radius from the kit · fill color/surface/raised
├── header                 ↕ centred · padding from the kit
│   ├── title              T heading/md · centred · TEXT `Title`
│   └── body               T body/md · color/text/subtle · centred · TEXT `Message`
└── footer                 ↔ (2 actions) or ↕ (3) · separators color/border/subtle
    ├── secondary-action   ◇ .Dialog/ios-action · TEXT `Secondary label`
    └── primary-action     ◇ .Dialog/ios-action · TEXT `Primary label` · colour by Kind

Dialog (OS=Android)        ↕ vertical · width fixed 312 example (B2: framework 280–560) · padding spacing/layout/container · radius/3xl · Elevation/4 · fill color/surface/raised
├── title                  T heading/md · start · TEXT `Title`
├── body                   T body/md · color/text/subtle · TEXT `Message`
└── footer                 ↔ end-aligned · gap spacing/md
    ├── secondary-action   ◇ Button variant=text color=neutral size=md · TEXT
    └── primary-action     ◇ Button variant=text color=brand|error size=md · TEXT
```

### D4 Properties

| Figma property | Type | Values | Default | Code prop | Code value |
|---|---|---|---|---|---|
| `OS` | VARIANT | `iOS` · `Android` | `iOS` | — | `Theme.platform` (N-07) |
| `Kind` | VARIANT | `Basic` · `Destructive` | `Basic` | `kind` | `basic` · `destructive` |
| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |
| `Title` | TEXT | | `Delete this shift?` | `title` | |
| `Message` | TEXT | | `Staff will be told it was cancelled.` | `message` | |
| `Primary label` | TEXT | | `Delete` | `primaryAction.label` | |
| `Secondary label` | TEXT | | `Cancel` | `secondaryAction.label` | |

**Language and shared properties (Figma rule).** TEXT properties have one value for the whole set, so they are bound on the `EN` variants only; `AR` variants carry Arabic copy edited directly.

### D5 Variants to generate

- Axes: `OS × Kind × Language` = 2 × 2 × 2 = **8** variants
- Grid: rows = OS × Kind, columns = Language; gap `spacing/xl`

### D6 States, interactions and motion

No prototype interactions on the set. Opening, scrolled, working and closing are shown on doc page 04 with B4 timings written next to them.

### D7 RTL

`Language=AR` variants: Typography mode `Mobile · AR`, auto layout direction from the text, layout per B5; Arabic copy from A6 (`حذف هذه الوردية؟`, `فصل نظام إدارة التعلم؟`). The `close` glyph does not mirror.

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

All 12 standard pages (template D8 + [`2-foundations/figma-doc-kit.md` › Page layouts](../../../2-foundations/figma-doc-kit.md#page-layouts)) in section `Dialog — Documentation`, frames `Dialog / 00 Component sheet` … `Dialog / 11 Changelog` (skip `10`, version 1.0). Built only from the Doc Kit.

Page notes for Dialog:
- 01 Introduction: Light + Dark panels, iOS and Android side by side over a phone screen with the scrim
- 03 Variations: OS × Kind; three-action iOS stack; long Arabic title
- 07 Platform: the A8 table; the O-03 rule with a phone showing a form opening in a Bottom sheet instead of a dialog
- 08 RTL: both OSes in Arabic (iOS actions swapped, Android actions on the left)
- 05 Usage: the A7 pairs, built with live instances

Component description: "Modal window for a decision or a short task. Spec: 5-mobile-components/components/dialog/dialog.md".

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

- File: `5-mobile-components/lib/src/components/dialog/bw_dialog.figma.dart`
- Mapping: D4. Publish after the code and Figma reviews are both `Approved`.

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component>` or `<Component> / <Axis>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Component set `Dialog`, private components and layer names match D2–D3 and A2
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

1. Fill [D11 Execution log](dialog.md#d11-execution-log-filled-by-the-figma-agent) in `dialog.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `dialog.md` and in `5-mobile-components/README.md`.
3. `npm run sync:done:mobile` — records this contract as built in the Mobile file.
4. Add one line to the root `CHANGELOG.md`.
