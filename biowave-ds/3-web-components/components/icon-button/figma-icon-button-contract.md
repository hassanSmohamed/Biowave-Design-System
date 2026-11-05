<!-- GENERATED from icon-button.md @ f204e3b59d2ba89f — do not edit; change the source and run: npm run contract -- web icon-button -->
# Icon button · زر أيقونة — Web — Figma contract

> **Everything the Figma Agent needs to build Icon button in the Web Components file, with our variables and styles.** Read this file only. Generated from [`icon-button.md`](icon-button.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-11-05). Questions go to [D11 Execution log](icon-button.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Web Components** · key `7nDhsPNntzIWlrjmuSmZ9l` · https://www.figma.com/design/7nDhsPNntzIWlrjmuSmZ9l |
| Page | `↳ Icon button` (one page per component) |
| Component | Icon button · زر أيقونة |
| Platform | Web · React + MUI |
| Version | 1.1 · 2026-10-21 |
| Source | [`icon-button.md`](icon-button.md) @ `f204e3b59d2ba89f` |

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

Already in this file, created by the sync tooling from [`icon-button.tokens.json`](icon-button.tokens.json). **Bind component layers to these variables** and pick the option with the collection's explicit variable mode. Each value aliases the Foundations variable shown (key in §3).

| Collection | Modes | Variable | Alias target per mode |
|---|---|---|---|
| Icon button / Size | sm · md · lg | `size` | sm → 4. Size › `size/control/height/sm`<br>md → 4. Size › `size/control/height/md`<br>lg → 4. Size › `size/control/height/lg` |
| Icon button / Size | sm · md · lg | `icon-size` | sm → 4. Size › `size/icon/sm`<br>md → 4. Size › `size/icon/md`<br>lg → 4. Size › `size/icon/lg` |
| Icon button / Size | sm · md · lg | `radius` | sm → 2. Radius › `radius/md`<br>md → 2. Radius › `radius/md`<br>lg → 2. Radius › `radius/md` |
| Icon button / Size | sm · md · lg | `border-width` | sm → 7. Border › `border/width/default`<br>md → 7. Border › `border/width/default`<br>lg → 7. Border › `border/width/default` |
| Icon button / Selected | brand · secondary · error · neutral · inverse · success · warning · info | `container/selected` | brand → 1. Themes › `color/background/brand/subtle`<br>secondary → 1. Themes › `color/background/secondary/subtle`<br>error → 1. Themes › `color/background/error/subtle`<br>neutral → 1. Themes › `color/background/neutral/default`<br>inverse → 1. Themes › `color/background/inverse/default`<br>success → 1. Themes › `color/background/success/subtle`<br>warning → 1. Themes › `color/background/warning/subtle`<br>info → 1. Themes › `color/background/info/subtle` |
| Icon button / Selected | brand · secondary · error · neutral · inverse · success · warning · info | `container/disabled` | brand → 1. Themes › `color/background/disabled`<br>secondary → 1. Themes › `color/background/disabled`<br>error → 1. Themes › `color/background/disabled`<br>neutral → 1. Themes › `color/background/disabled`<br>inverse → 1. Themes › `color/background/disabled`<br>success → 1. Themes › `color/background/disabled`<br>warning → 1. Themes › `color/background/disabled`<br>info → 1. Themes › `color/background/disabled` |
| Icon button / Selected | brand · secondary · error · neutral · inverse · success · warning · info | `state-layer/hovered` | brand → 1. Themes › `color/background/transparent/hovered`<br>secondary → 1. Themes › `color/background/transparent/hovered`<br>error → 1. Themes › `color/background/transparent/hovered`<br>neutral → 1. Themes › `color/background/transparent/hovered`<br>inverse → 1. Themes › `color/background/transparent/hovered`<br>success → 1. Themes › `color/background/transparent/hovered`<br>warning → 1. Themes › `color/background/transparent/hovered`<br>info → 1. Themes › `color/background/transparent/hovered` |
| Icon button / Selected | brand · secondary · error · neutral · inverse · success · warning · info | `state-layer/pressed` | brand → 1. Themes › `color/background/transparent/pressed`<br>secondary → 1. Themes › `color/background/transparent/pressed`<br>error → 1. Themes › `color/background/transparent/pressed`<br>neutral → 1. Themes › `color/background/transparent/pressed`<br>inverse → 1. Themes › `color/background/transparent/pressed`<br>success → 1. Themes › `color/background/transparent/pressed`<br>warning → 1. Themes › `color/background/transparent/pressed`<br>info → 1. Themes › `color/background/transparent/pressed` |
| Icon button / Selected | brand · secondary · error · neutral · inverse · success · warning · info | `icon/selected` | brand → 1. Themes › `color/icon/role/brand`<br>secondary → 1. Themes › `color/icon/role/secondary`<br>error → 1. Themes › `color/icon/role/error`<br>neutral → 1. Themes › `color/icon/default`<br>inverse → 1. Themes › `color/icon/role/brand`<br>success → 1. Themes › `color/icon/role/success`<br>warning → 1. Themes › `color/icon/role/warning`<br>info → 1. Themes › `color/icon/role/info` |
| Icon button / Selected | brand · secondary · error · neutral · inverse · success · warning · info | `icon/disabled` | brand → 1. Themes › `color/icon/disabled`<br>secondary → 1. Themes › `color/icon/disabled`<br>error → 1. Themes › `color/icon/disabled`<br>neutral → 1. Themes › `color/icon/disabled`<br>inverse → 1. Themes › `color/icon/disabled`<br>success → 1. Themes › `color/icon/disabled`<br>warning → 1. Themes › `color/icon/disabled`<br>info → 1. Themes › `color/icon/disabled` |
| Icon button / Selected | brand · secondary · error · neutral · inverse · success · warning · info | `border/selected` | brand → 1. Themes › `color/border/brand`<br>secondary → 1. Themes › `color/border/secondary`<br>error → 1. Themes › `color/border/error`<br>neutral → 1. Themes › `color/border/strong`<br>inverse → 1. Themes › `color/border/inverse`<br>success → 1. Themes › `color/border/success`<br>warning → 1. Themes › `color/border/warning`<br>info → 1. Themes › `color/border/info` |
| Icon button / Selected | brand · secondary · error · neutral · inverse · success · warning · info | `border/disabled` | brand → 1. Themes › `color/border/disabled`<br>secondary → 1. Themes › `color/border/disabled`<br>error → 1. Themes › `color/border/disabled`<br>neutral → 1. Themes › `color/border/disabled`<br>inverse → 1. Themes › `color/border/disabled`<br>success → 1. Themes › `color/border/disabled`<br>warning → 1. Themes › `color/border/disabled`<br>info → 1. Themes › `color/border/disabled` |
| Button / Transparent | brand · secondary · success · error · warning · info · neutral · inverse | `container/default` | brand → 1. Themes › `color/background/transparent/default`<br>secondary → 1. Themes › `color/background/transparent/default`<br>success → 1. Themes › `color/background/transparent/default`<br>error → 1. Themes › `color/background/transparent/default`<br>warning → 1. Themes › `color/background/transparent/default`<br>info → 1. Themes › `color/background/transparent/default`<br>neutral → 1. Themes › `color/background/transparent/default`<br>inverse → 1. Themes › `color/background/transparent/default` |
| Button / Transparent | brand · secondary · success · error · warning · info · neutral · inverse | `container/disabled` | brand → 1. Themes › `color/background/transparent/default`<br>secondary → 1. Themes › `color/background/transparent/default`<br>success → 1. Themes › `color/background/transparent/default`<br>error → 1. Themes › `color/background/transparent/default`<br>warning → 1. Themes › `color/background/transparent/default`<br>info → 1. Themes › `color/background/transparent/default`<br>neutral → 1. Themes › `color/background/transparent/default`<br>inverse → 1. Themes › `color/background/transparent/default` |
| Button / Transparent | brand · secondary · success · error · warning · info · neutral · inverse | `state-layer/hovered` | brand → 1. Themes › `color/background/transparent/hovered`<br>secondary → 1. Themes › `color/background/transparent/hovered`<br>success → 1. Themes › `color/background/transparent/hovered`<br>error → 1. Themes › `color/background/transparent/hovered`<br>warning → 1. Themes › `color/background/transparent/hovered`<br>info → 1. Themes › `color/background/transparent/hovered`<br>neutral → 1. Themes › `color/background/transparent/hovered`<br>inverse → 1. Themes › `color/background/transparent/hovered` |
| Button / Transparent | brand · secondary · success · error · warning · info · neutral · inverse | `state-layer/pressed` | brand → 1. Themes › `color/background/transparent/pressed`<br>secondary → 1. Themes › `color/background/transparent/pressed`<br>success → 1. Themes › `color/background/transparent/pressed`<br>error → 1. Themes › `color/background/transparent/pressed`<br>warning → 1. Themes › `color/background/transparent/pressed`<br>info → 1. Themes › `color/background/transparent/pressed`<br>neutral → 1. Themes › `color/background/transparent/pressed`<br>inverse → 1. Themes › `color/background/transparent/pressed` |
| Button / Transparent | brand · secondary · success · error · warning · info · neutral · inverse | `icon/default` | brand → 1. Themes › `color/icon/role/brand`<br>secondary → 1. Themes › `color/icon/role/secondary`<br>success → 1. Themes › `color/icon/role/success`<br>error → 1. Themes › `color/icon/role/error`<br>warning → 1. Themes › `color/icon/role/warning`<br>info → 1. Themes › `color/icon/role/info`<br>neutral → 1. Themes › `color/icon/default`<br>inverse → 1. Themes › `color/icon/on/brand` |
| Button / Transparent | brand · secondary · success · error · warning · info · neutral · inverse | `icon/disabled` | brand → 1. Themes › `color/icon/disabled`<br>secondary → 1. Themes › `color/icon/disabled`<br>success → 1. Themes › `color/icon/disabled`<br>error → 1. Themes › `color/icon/disabled`<br>warning → 1. Themes › `color/icon/disabled`<br>info → 1. Themes › `color/icon/disabled`<br>neutral → 1. Themes › `color/icon/disabled`<br>inverse → 1. Themes › `color/icon/disabled` |

## 3. Foundations variables used (keys)

| Token | Figma variable | Key | Type | Scopes | Used by |
|---|---|---|---|---|---|
| `border-focus-offset` | 7. Border › `border/focus/offset` | `b90b6264cf3202aa473578d22cb211167afe775d` | FLOAT | GAP | spec |
| `border-width-default` | 7. Border › `border/width/default` | `9b62f24ecdfc438789ce3fa296e725ac14b1e08f` | FLOAT | STROKE_FLOAT | spec, component token |
| `border-width-focus` | 7. Border › `border/width/focus` | `d660bcb01777958134799fe11a99a63aaf1fbfca` | FLOAT | STROKE_FLOAT | spec |
| `color-background-brand-subtle` | 1. Themes › `color/background/brand/subtle` | `7e262abe296024e9b4a29951d5e061fee8f3f2d7` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-disabled` | 1. Themes › `color/background/disabled` | `3697f6cbec9ecaa8acf84032dbdb9f6a1607a6ff` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-error-subtle` | 1. Themes › `color/background/error/subtle` | `b408c27a651904c0bc3c5396b3e88319c4d4d6fe` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-info-subtle` | 1. Themes › `color/background/info/subtle` | `7a1efc88827df67abddac933a6d6785e946cceb1` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-inverse-default` | 1. Themes › `color/background/inverse/default` | `0d78c3b8e082ed200902a7d8eb44436e029d1a2c` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-neutral-default` | 1. Themes › `color/background/neutral/default` | `2dc9c39d4df7b490fd0d7ac7385b49fdaf0e973e` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-secondary-subtle` | 1. Themes › `color/background/secondary/subtle` | `6cfea2f9951f4815d9385c0029ee3dd3cc4eba6a` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-success-subtle` | 1. Themes › `color/background/success/subtle` | `5702d75c14273a310c63dfd9d27b5c1d7af2e9f8` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-transparent-default` | 1. Themes › `color/background/transparent/default` | `7ded3d8bfead13a83fc2297ef9dc75a16f73857b` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-transparent-hovered` | 1. Themes › `color/background/transparent/hovered` | `51354205cb02a343717bc6e5ca84b0e151af3de8` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-transparent-pressed` | 1. Themes › `color/background/transparent/pressed` | `830ae424ad770312d061208a89f7452569d643d8` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-background-warning-subtle` | 1. Themes › `color/background/warning/subtle` | `98f72131ce9a86bd1cdbe39edc82da47069da705` | COLOR | FRAME_FILL, SHAPE_FILL | spec, component token |
| `color-border-brand` | 1. Themes › `color/border/brand` | `50ddd3d7028ede7c14f73576869a28588b0c3b7d` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-disabled` | 1. Themes › `color/border/disabled` | `a6d557c3fa0bcb0e2e6b6592234d737ef80936bf` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-error` | 1. Themes › `color/border/error` | `28b0f15306faf6c8113f5acdf14ed8fc66e02c57` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-info` | 1. Themes › `color/border/info` | `df6d00488697e55fe6bd439d9ef9888d85c9a3d7` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-inverse` | 1. Themes › `color/border/inverse` | `0e53944b3de77eca83b17b27c3e5d0b4fca582d8` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-secondary` | 1. Themes › `color/border/secondary` | `7466169e60102e31827f59ddfe6eb94a9bbee577` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-strong` | 1. Themes › `color/border/strong` | `a12934eff6a447ebe30a4507b223c76e583e2701` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-success` | 1. Themes › `color/border/success` | `a6bc4e451961378013cbf0f536417a2a9fba0daa` | COLOR | STROKE_COLOR | spec, component token |
| `color-border-warning` | 1. Themes › `color/border/warning` | `d327d60eda883f8a19982118ed7843d57671a416` | COLOR | STROKE_COLOR | spec, component token |
| `color-icon-default` | 1. Themes › `color/icon/default` | `b0844bd913aafe8789a44bc7b647058cdae299df` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-disabled` | 1. Themes › `color/icon/disabled` | `708926473ca446a26d4a0891351f04692171f74f` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-on-brand` | 1. Themes › `color/icon/on/brand` | `7adf0bdf71942294bcca707ea3b88ab778741004` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-role-brand` | 1. Themes › `color/icon/role/brand` | `73d6989d2161d900c2070cd9b67f01653e54251d` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-role-error` | 1. Themes › `color/icon/role/error` | `e7e61106b7c9b1c60197d2c456ad055991cc545d` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-role-info` | 1. Themes › `color/icon/role/info` | `9bbd326956964ff857cb9e3a5f9e0f41883fe168` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-role-secondary` | 1. Themes › `color/icon/role/secondary` | `b3c3c18415370f381760224fd00a40f2816ffdb6` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-role-success` | 1. Themes › `color/icon/role/success` | `096b2f9e4c965c38f55d3dd051dbff93f36a33e5` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `color-icon-role-warning` | 1. Themes › `color/icon/role/warning` | `3fa016bcd1409896b81681403e6a214dcc365fda` | COLOR | SHAPE_FILL, STROKE_COLOR | spec, component token |
| `radius-md` | 2. Radius › `radius/md` | `0758e506cdfd4d7a4eef6369a4851133d7eab5a4` | FLOAT | CORNER_RADIUS | spec, component token |
| `size-control-height-lg` | 4. Size › `size/control/height/lg` | `14c0f56d2add6f7149374e67cf4d3a2656aeb5dc` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-control-height-md` | 4. Size › `size/control/height/md` | `cb6d23a09de76b9cea37c24579dbb2a9e6e6a079` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-control-height-sm` | 4. Size › `size/control/height/sm` | `1409647f4e12e37e76b49ed9ce1a78946e4250f4` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-icon-lg` | 4. Size › `size/icon/lg` | `e79bd86fedcce89547674c84c9127d0149e60061` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-icon-md` | 4. Size › `size/icon/md` | `eb459c673e6ca16e3c81b240f04b467717953a9a` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `size-icon-sm` | 4. Size › `size/icon/sm` | `2aa4b1f12a5ed0745f9a8b3251dc1fd9f7dd3476` | FLOAT | WIDTH_HEIGHT | spec, component token |
| `target-min` | 6. Grid & Layout › `target/min` | `db23ec2826d3bfa3e600e5a82801e0c7d37ba298` | FLOAT | WIDTH_HEIGHT | spec |

Code-only tokens (no Figma variable by design — motion, layers): `motion-duration-2xl` · `motion-duration-md` · `motion-duration-sm` · `motion-easing-standard` · `motion-easing-standard-accelerate` · `motion-easing-standard-decelerate`. Use them only as written values in prototype settings and docs.

## 4. Text styles used (keys)

None named in B/D.

## 5. Effect styles used (keys)

| Style | Key |
|---|---|
| `Elevation/3` | `a6ffc0d435b5e225dd534e3df14eee3e2dba22b0` |

## 6. Components to instance (keys)

Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.

### Icons (keys) — Google · Material Symbols library (D-18)

No icon named in this spec. Icons come only from the Google · Material Symbols library (Style=Rounded).

## 7. Phase 1 — values (from Part B)

### B1 API

### IconButton
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `icon` | `ReactNode` | a Material Symbols Rounded glyph (`icons.md`, D-18); selected = same glyph with `'FILL' 1` | — | ✓ | `icon` |
| `label` | string | | — | ✓ | Accessible name and tooltip text |
| `variant` | enum | `filled` · `tonal` · `outlined` · `transparent` | `transparent` | | A4.1 |
| `color` | enum | `brand` · `secondary` · `neutral` · `error` · `inverse` | `neutral` | | A4.2 |
| `size` | enum | `sm` · `md` · `lg` | `md` | | A4.3 |
| `toggle` | boolean | | `false` | | A4.4 |
| `selected` | boolean | | `false` | | Only with `toggle` |
| `selectedIcon` | `ReactNode` | filled glyph | — | with `toggle` | Shown when `selected` |
| `tooltip` | boolean | | `true` | | `false` only when the label is visible next to the button |
| `loading` · `loadingLabel` · `disabled` · `type` · `onClick` | | | | | Same as [Button B1](../button/button.md#b1-api) |

**Invalid combinations** (`console.warn` in development, then the fallback):
| Combination | Fallback |
|---|---|
| `variant="tonal"` with `neutral`/`inverse` | `outlined` |
| `toggle` with `filled` or `tonal` | `toggle` ignored |
| `toggle` without `selectedIcon` | uses `icon` for both states, warns |
| `label` empty | warns "IconButton needs a label" |

### B2 Dimensions

```
   ┬ ┌──────────────┐
   │ │     [◆]      │  radius-md
   │ └──────────────┘
   ┴ size-control-height-md (width = height)
          └ size-icon-md
```

| Part | Property | sm | md | lg |
|---|---|---|---|---|
| `container` | width = height | `size-control-height-sm` | `size-control-height-md` | `size-control-height-lg` |
| `container` | padding | none (icon centered) | | |
| `container` | radius | `radius-md` | `radius-md` | `radius-md` |
| `container` | border width (outlined) | `border-width-default` | same | same |
| `icon`, `spinner` | size | `size-icon-sm` | `size-icon-md` | `size-icon-lg` |
| `focus-ring` | width · offset | `border-width-focus` · `border-focus-offset` | | |

### B3 Tokens by part and state

### 3.1 Unselected
Exactly [Button B3.1–B3.5](../button/button.md#b3-tokens-by-part-and-state) for the same `variant` × `color`, with `icon` taking the Button's icon token.

| Transparent, `Color` | `icon` |
|---|---|
| `brand · secondary · success · error · warning · info` | `color-icon-role-brand` · `color-icon-role-secondary` · `color-icon-role-success` · `color-icon-role-error` · `color-icon-role-warning` · `color-icon-role-info` |
| `neutral` | `color-icon-default` |
| `inverse` | `color-icon-on-brand` |
| Container, every colour | `color-background-transparent-default` |

### 3.2 Selected (`toggle` + `selected`, transparent and outlined only)
| `color` | `container` background | State layer · Hover / Pressed | `icon` | `container` border (outlined) |
|---|---|---|---|---|
| `brand` | `color-background-brand-subtle` | `color-background-transparent-hovered` / `color-background-transparent-pressed` | `color-icon-role-brand` | `color-border-brand` |
| `secondary` | `color-background-secondary-subtle` | same | `color-icon-role-secondary` | `color-border-secondary` |
| `error` | `color-background-error-subtle` | same | `color-icon-role-error` | `color-border-error` |
| `neutral` | `color-background-neutral-default` | same | `color-icon-default` | `color-border-strong` |
| `inverse` | `color-background-inverse-default` | same | `color-icon-role-brand` | `color-border-inverse` |
| `success` | `color-background-success-subtle` | same | `color-icon-role-success` | `color-border-success` |
| `warning` | `color-background-warning-subtle` | same | `color-icon-role-warning` | `color-border-warning` |
| `info` | `color-background-info-subtle` | same | `color-icon-role-info` | `color-border-info` |
| Disabled | `color-background-disabled` | — | `color-icon-disabled` | `color-border-disabled` |

### 3.3 Focus
As Button B3.5: the ring follows `color`.

### 3.4 Tooltip (temporary, until Tooltip component)
As [Tooltip B3](../tooltip/tooltip.md). Figma uses the `Tooltip / Container` collection; the offset from the button is its `offset` variable.

### B4 States and transitions

As [Button B4](../button/button.md#b4-states-and-transitions), plus:
| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Unselected ↔ Selected | click / Enter / Space (toggle) | background, icon swap (cross-fade) | `motion-duration-sm` | `motion-easing-standard` |
| Tooltip hidden → shown | hover after `motion-duration-2xl` delay · keyboard focus immediately | opacity | `motion-duration-md` | `motion-easing-standard-decelerate` |
| Tooltip shown → hidden | pointer leave · blur · Esc | opacity | `motion-duration-sm` | `motion-easing-standard-accelerate` |

Reduced motion: instant; tooltip appears without fade.

### B5 RTL

| Part | In RTL |
|---|---|
| `icon` — directional (arrow_back, arrow_forward, chevron_left/right, undo, redo, logout, open_in_new) | Mirrors (same mechanism as Button B5) |
| `icon` — non-directional (close, edit, delete, more_vert, search, notifications) | Does not mirror |
| `tooltip` | Placement `top`; flips by the provider's direction when placed start/end |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role / semantics | Native `<button type="button">` |
| Accessible name | `aria-label={label}`; icons `aria-hidden="true"`; the tooltip does not add a second name (`describeChild={false}`, `title` used only for the visual tooltip) |
| Toggle | `aria-pressed={selected}` |
| Loading · disabled | As Button B6 |
| Focus | As Button B6 |
| Target size | `sm` (32) ≥ `target-min` (24) |
| Screen reader output | "Edit device, button" · toggle: "Pin, toggle button, pressed" |

| Key | Action |
|---|---|
| Tab / Shift+Tab | Moves focus (tooltip shows on focus) |
| Enter / Space | Activates / toggles |
| Esc | Hides the tooltip |

## 8. Phase 1 — build the component set (from Part D)

> Executed by the **Figma Agent**. Values come from the spec [Part B](#b--spec) B2–B4; never write values here.
> **One file per platform (D-12).** Builds the Web set in **Biowave DS — Web Components**.

| Field | Value |
|---|---|
| Component | Icon button |
| Figma file | **Biowave DS — Web Components** (`_sync/figma-files.json` › `web`) |
| Page / section | `↳ Icon Button` |
| Mode | **Rebind** the existing sets on page ↳ Icon Button |
| Depends on | Button Part D (Web) `Built` — reuses `.Button/Spinner` from the same file |
| Plan version | 1 · 2026-10-16 |

### D1 Rules for this build

Same as [Button D1](../button/button.md#d1-rules-for-this-build).

### D2 Component structure

Keep Icon Button (116:30310), Icon Button / Appearance (116:28709), and Icon Button / Glyph (116:28678), preserving their keys and nesting.

### D3 Layer tree and auto layout

Keep existing nesting and auto layout. Bind dimensions from B2 and colours from B3 using component tokens only. Focus ring is an inside stroke layer with no fill, bound to Button / Focus color and width. No effects except Elevation/3 on the menu.

| Part | Collection | Mode or variable |
|---|---|---|
| Size, icon size, radius, border width | `Icon button / Size` | Same name as `Size` |
| `Variant=filled` | `Button / Filled` | Same name as `Color` |
| `Variant=tonal` | `Button / Tonal` | Same name as `Color` |
| `Variant=transparent` | `Button / Transparent` | Same name as `Color` |
| `Variant=outlined` | `Button / Outlined` | Same name as `Color` |
| `Selected=true` | `Icon button / Selected` | Same name as `Color` |
| Focus ring | `Button / Focus` | `default` or `inverse` |
| Tooltip layers | `Tooltip / Container` | `default` |
| `Show Menu Buttons` layers | `Menu / *` | `default` |

### D4 Properties

| Figma property | Type | Values | Default | Code prop (web) | Code value |
|---|---|---|---|---|---|
| `Variant` | VARIANT | `filled` · `outlined` · `tonal` · `transparent` | `transparent` | `variant` | same spelling |
| `Color` | VARIANT | `brand` · `secondary` · `success` · `error` · `warning` · `info` · `neutral` · `inverse` | `neutral` | `color` | success, warning, info have no code equivalent |
| `State` | VARIANT | `default` · `hovered` · `focused` · `pressed` · `disabled` | `default` | `disabled` | Other values are interaction states |
| `Size` | VARIANT | `sm` · `md` · `lg` | `md` | `size` | same spelling |
| `Toggle` | VARIANT | `false` · `true` | `false` | `toggle` | boolean |
| `Selected` | VARIANT | `false` · `true` | `false` | `selected` | boolean, only with toggle |

Variant, Color and State belong to Appearance; Size, Toggle and Selected belong to the outer set. Glyph has Size and Selected. Preserve existing icon swaps and tooltip properties.

### D5 Variants to generate

Outer: 9 variants; Glyph: 6; Appearance: 135 (27 Variant × Color pairs × 5 states). Tonal is limited to brand, secondary, error. XS → sm, S → md, M/L/XL → lg; retain Default width and Rounded square shape. Default colour merges into neutral. Other tonal colours remap to outlined.

List and remap all affected instances before removing variants. Never delete and recreate a set.

### D6 States, interactions and motion

While hovering → Hovered; while pressing → Pressed (B4). On click for `Toggle=On`: Selected False ↔ True, smart animate `motion-duration-sm`.

### D7 RTL

No RTL variants. Docs page 08 shows `arrow_back`/`arrow_forward` mirrored and `close`/`edit` not mirrored.

## 9. Phase 2 — documentation pages and Components List card

### D8 Documentation pages

12 standard pages (template D8) in section `Icon Button — Documentation`; blocked until the Doc Kit exists. 03 Variations: Variant, Color, Size, Toggle. 09 Accessibility: target-size overlay on `SM`, tooltip example.

Component description: "Starts an action shown as an icon. Always has a label. Spec: 3-web-components/components/icon-button/icon-button.md".

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

`3-web-components/src/components/icon-button/IconButton.figma.tsx` — mapping D4. After both reviews are `Approved`.

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-1 Structure D2 with dot-prefixed private sets; layer names D3
- [ ] F-AC-2 Properties D4 exactly
- [ ] F-AC-3 Variant counts 168 / 9
- [ ] F-AC-4 Zero raw values (QA lint)
- [ ] F-AC-5 Light/Dark by mode only
- [ ] F-AC-6 Legacy mapping D5 in the review; zero local variables/styles in the file
- [ ] F-AC-7 Values match B2–B3 (redline)
- [ ] F-AC-8 Docs built or reported blocked

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](icon-button.md#d11-execution-log-filled-by-the-figma-agent) in `icon-button.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `icon-button.md` and in `3-web-components/README.md`.
3. `npm run sync:done:web` — records this contract as built in the Web file.
4. Add one line to the root `CHANGELOG.md`.
