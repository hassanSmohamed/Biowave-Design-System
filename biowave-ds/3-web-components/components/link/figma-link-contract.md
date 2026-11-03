<!-- GENERATED from link.md @ 387af603b98a8c1a — do not edit; change the source and run: npm run contract -- web link -->
#  — Figma contract

> **Everything the Figma Agent needs to build Link in the Web Components file, with our variables and styles.** Read this file only. Generated from [`link.md`](link.md) (Parts A, B, D) and the Figma library index (`_sync/figma-library.json`, read 2026-11-02). Questions go to [D11 Execution log](link.md#d11-execution-log-filled-by-the-figma-agent) — never invent.

**Two phases, one review:** Phase 1 — build the component set (§7–§8). Phase 2 — as soon as Phase 1 is finished, the 12 documentation pages and the Components List card (§9).

| | |
|---|---|
| Target file | **Biowave DS — Web Components** · key `7nDhsPNntzIWlrjmuSmZ9l` · https://www.figma.com/design/7nDhsPNntzIWlrjmuSmZ9l |
| Page | `↳ Link` (one page per component) |
| Component | Link · رابط |
| Platform | Web · React + MUI |
| Version | 1.0 · 2026-10-21 |
| Source | [`link.md`](link.md) @ `387af603b98a8c1a` |

## 1. Library connections in this file

| | |
|---|---|
| Library | **Biowave DS — Foundations** · library key `lk-e00b31b21f924b36eeea820da99c4b306c460986c83e894f415a1c194ba5a2e670f3142c2fccca81280a80bcaee6a87bc47c9a9505d186d7b693aa9805ad7031` |
| Library file | Foundations · key `AyFaSmfDUlTax3GpKhRdHI` |
| Doc Kit library (Phase 2) | **Annotation (Biowave Doc Kit)** · file key `cBPWg6YZNqK8UIzgMQIpXl` — must be enabled in this file (Assets → Libraries) |
| Enabled here | ✓ verified from a component file: 7 collections, 281 variables reachable |

Import by key — never search by name, never copy:

```js
const v = await figma.variables.importVariableByKeyAsync('<variable key>');   // library reference, not a local copy
const s = await figma.importStyleByKeyAsync('<style key>');                   // text / effect style
const c = await figma.importComponentByKeyAsync('<component key>');           // Doc Kit / icon component
const set = await figma.importComponentSetByKeyAsync('<component set key>');
```

## 2. Component-token collections (bind layers to these)

Already in this file, created by the sync tooling from [`link.tokens.json`](link.tokens.json). **Bind component layers to these variables** and pick the option with the collection's explicit variable mode. Each value aliases the Foundations variable shown (key in §3).

| Collection | Modes | Variable | Alias target per mode |
|---|---|---|---|
| Link / Size | lg · md · sm | `height` | lg → 4. Size › `size/control/height/lg`<br>md → 4. Size › `size/control/height/md`<br>sm → 4. Size › `size/control/height/sm` |
| Link / Size | lg · md · sm | `padding-inline` | lg → 3. Spacing › `spacing/control/padding-inline/lg`<br>md → 3. Spacing › `spacing/control/padding-inline/md`<br>sm → 3. Spacing › `spacing/control/padding-inline/sm` |
| Link / Size | lg · md · sm | `padding-block` | lg → 3. Spacing › `spacing/none`<br>md → 3. Spacing › `spacing/none`<br>sm → 3. Spacing › `spacing/none` |
| Link / Size | lg · md · sm | `gap` | lg → 3. Spacing › `spacing/control/gap/lg`<br>md → 3. Spacing › `spacing/control/gap/md`<br>sm → 3. Spacing › `spacing/control/gap/sm` |
| Link / Size | lg · md · sm | `icon` | lg → 4. Size › `size/icon/lg`<br>md → 4. Size › `size/icon/md`<br>sm → 4. Size › `size/icon/sm` |
| Link / Size | lg · md · sm | `radius` | lg → 2. Radius › `radius/2xl`<br>md → 2. Radius › `radius/2xl`<br>sm → 2. Radius › `radius/2xl` |
| Link / Color | brand · secondary · success · error · warning · info · neutral · inverse | `label/default` | brand → 1. Themes › `color/text/role/brand`<br>secondary → 1. Themes › `color/text/role/secondary`<br>success → 1. Themes › `color/text/role/success`<br>error → 1. Themes › `color/text/role/error`<br>warning → 1. Themes › `color/text/role/warning`<br>info → 1. Themes › `color/text/role/info`<br>neutral → 1. Themes › `color/text/subtle`<br>inverse → 1. Themes › `color/text/inverse` |
| Link / Color | brand · secondary · success · error · warning · info · neutral · inverse | `label/hovered` | brand → 1. Themes › `color/text/role/brand`<br>secondary → 1. Themes › `color/text/role/secondary`<br>success → 1. Themes › `color/text/role/success`<br>error → 1. Themes › `color/text/role/error`<br>warning → 1. Themes › `color/text/role/warning`<br>info → 1. Themes › `color/text/role/info`<br>neutral → 1. Themes › `color/text/subtle`<br>inverse → 1. Themes › `color/text/inverse` |
| Link / Color | brand · secondary · success · error · warning · info · neutral · inverse | `label/pressed` | brand → 1. Themes › `color/text/role/brand`<br>secondary → 1. Themes › `color/text/role/secondary`<br>success → 1. Themes › `color/text/role/success`<br>error → 1. Themes › `color/text/role/error`<br>warning → 1. Themes › `color/text/role/warning`<br>info → 1. Themes › `color/text/role/info`<br>neutral → 1. Themes › `color/text/default`<br>inverse → 1. Themes › `color/text/inverse` |
| Link / Color | brand · secondary · success · error · warning · info · neutral · inverse | `label/disabled` | brand → 1. Themes › `color/text/disabled`<br>secondary → 1. Themes › `color/text/disabled`<br>success → 1. Themes › `color/text/disabled`<br>error → 1. Themes › `color/text/disabled`<br>warning → 1. Themes › `color/text/disabled`<br>info → 1. Themes › `color/text/disabled`<br>neutral → 1. Themes › `color/text/disabled`<br>inverse → 1. Themes › `color/text/disabled` |
| Link / Color | brand · secondary · success · error · warning · info · neutral · inverse | `icon/default` | brand → 1. Themes › `color/icon/role/brand`<br>secondary → 1. Themes › `color/icon/role/secondary`<br>success → 1. Themes › `color/icon/role/success`<br>error → 1. Themes › `color/icon/role/error`<br>warning → 1. Themes › `color/icon/role/warning`<br>info → 1. Themes › `color/icon/role/info`<br>neutral → 1. Themes › `color/icon/subtle`<br>inverse → 1. Themes › `color/icon/inverse` |
| Link / Color | brand · secondary · success · error · warning · info · neutral · inverse | `icon/hovered` | brand → 1. Themes › `color/icon/role/brand`<br>secondary → 1. Themes › `color/icon/role/secondary`<br>success → 1. Themes › `color/icon/role/success`<br>error → 1. Themes › `color/icon/role/error`<br>warning → 1. Themes › `color/icon/role/warning`<br>info → 1. Themes › `color/icon/role/info`<br>neutral → 1. Themes › `color/icon/subtle`<br>inverse → 1. Themes › `color/icon/inverse` |
| Link / Color | brand · secondary · success · error · warning · info · neutral · inverse | `icon/pressed` | brand → 1. Themes › `color/icon/role/brand`<br>secondary → 1. Themes › `color/icon/role/secondary`<br>success → 1. Themes › `color/icon/role/success`<br>error → 1. Themes › `color/icon/role/error`<br>warning → 1. Themes › `color/icon/role/warning`<br>info → 1. Themes › `color/icon/role/info`<br>neutral → 1. Themes › `color/icon/default`<br>inverse → 1. Themes › `color/icon/inverse` |
| Link / Color | brand · secondary · success · error · warning · info · neutral · inverse | `icon/disabled` | brand → 1. Themes › `color/icon/disabled`<br>secondary → 1. Themes › `color/icon/disabled`<br>success → 1. Themes › `color/icon/disabled`<br>error → 1. Themes › `color/icon/disabled`<br>warning → 1. Themes › `color/icon/disabled`<br>info → 1. Themes › `color/icon/disabled`<br>neutral → 1. Themes › `color/icon/disabled`<br>inverse → 1. Themes › `color/icon/disabled` |
| Link / Color | brand · secondary · success · error · warning · info · neutral · inverse | `container` | brand → 1. Themes › `color/background/transparent/default`<br>secondary → 1. Themes › `color/background/transparent/default`<br>success → 1. Themes › `color/background/transparent/default`<br>error → 1. Themes › `color/background/transparent/default`<br>warning → 1. Themes › `color/background/transparent/default`<br>info → 1. Themes › `color/background/transparent/default`<br>neutral → 1. Themes › `color/background/transparent/default`<br>inverse → 1. Themes › `color/background/transparent/default` |
| Link / Color | brand · secondary · success · error · warning · info · neutral · inverse | `border` | brand → 1. Themes › `color/border/default`<br>secondary → 1. Themes › `color/border/default`<br>success → 1. Themes › `color/border/default`<br>error → 1. Themes › `color/border/default`<br>warning → 1. Themes › `color/border/default`<br>info → 1. Themes › `color/border/default`<br>neutral → 1. Themes › `color/border/default`<br>inverse → 1. Themes › `color/border/default` |
| Link / Color | brand · secondary · success · error · warning · info · neutral · inverse | `focus-ring` | brand → 1. Themes › `color/border/focus`<br>secondary → 1. Themes › `color/border/focus`<br>success → 1. Themes › `color/border/focus`<br>error → 1. Themes › `color/border/focus`<br>warning → 1. Themes › `color/border/focus`<br>info → 1. Themes › `color/border/focus`<br>neutral → 1. Themes › `color/border/focus`<br>inverse → 1. Themes › `color/border/inverse` |

## 3. Foundations variables used (keys)

| Token | Figma variable | Key | Type | Scopes | Used by |
|---|---|---|---|---|---|
| `color-background-transparent-default` | 1. Themes › `color/background/transparent/default` | `7ded3d8bfead13a83fc2297ef9dc75a16f73857b` | COLOR | FRAME_FILL, SHAPE_FILL | component token |
| `color-border-default` | 1. Themes › `color/border/default` | `ad520e82898707a0d3112a12f6f9439566c6d6c4` | COLOR | STROKE_COLOR | component token |
| `color-border-focus` | 1. Themes › `color/border/focus` | `ef666d3badd2b63f18cb168d9987ead7fbc21480` | COLOR | STROKE_COLOR | component token |
| `color-border-inverse` | 1. Themes › `color/border/inverse` | `0e53944b3de77eca83b17b27c3e5d0b4fca582d8` | COLOR | STROKE_COLOR | component token |
| `color-icon-default` | 1. Themes › `color/icon/default` | `b0844bd913aafe8789a44bc7b647058cdae299df` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-disabled` | 1. Themes › `color/icon/disabled` | `708926473ca446a26d4a0891351f04692171f74f` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-inverse` | 1. Themes › `color/icon/inverse` | `f1c29644d88c107b8e40c4ba2dd9e5c8d9667fde` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-role-brand` | 1. Themes › `color/icon/role/brand` | `73d6989d2161d900c2070cd9b67f01653e54251d` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-role-error` | 1. Themes › `color/icon/role/error` | `e7e61106b7c9b1c60197d2c456ad055991cc545d` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-role-info` | 1. Themes › `color/icon/role/info` | `9bbd326956964ff857cb9e3a5f9e0f41883fe168` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-role-secondary` | 1. Themes › `color/icon/role/secondary` | `b3c3c18415370f381760224fd00a40f2816ffdb6` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-role-success` | 1. Themes › `color/icon/role/success` | `096b2f9e4c965c38f55d3dd051dbff93f36a33e5` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-role-warning` | 1. Themes › `color/icon/role/warning` | `3fa016bcd1409896b81681403e6a214dcc365fda` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-icon-subtle` | 1. Themes › `color/icon/subtle` | `fc66c13d6c036489bf774535cd8dbbf749795748` | COLOR | SHAPE_FILL, STROKE_COLOR | component token |
| `color-text-default` | 1. Themes › `color/text/default` | `4ea63d9ab5254c4df4eba4d26f771377a07929c4` | COLOR | TEXT_FILL | component token |
| `color-text-disabled` | 1. Themes › `color/text/disabled` | `f88c10f90f454d356c14cc3240da0f04eafbbedd` | COLOR | TEXT_FILL | component token |
| `color-text-inverse` | 1. Themes › `color/text/inverse` | `83e1f6c6d7ddf8376b1bc5d0b9d5f6cd13b68e9b` | COLOR | TEXT_FILL | component token |
| `color-text-role-brand` | 1. Themes › `color/text/role/brand` | `bf6f82d7545a8ae04bb4d55ee373397e5d16c45a` | COLOR | TEXT_FILL | component token |
| `color-text-role-error` | 1. Themes › `color/text/role/error` | `99d512c8b115971ff7f8045c6decd1cada845f37` | COLOR | TEXT_FILL | component token |
| `color-text-role-info` | 1. Themes › `color/text/role/info` | `f4c1549db7800b52c7614f14ca0e63b586f2e061` | COLOR | TEXT_FILL | component token |
| `color-text-role-secondary` | 1. Themes › `color/text/role/secondary` | `39d1b107af72de6e3b48156a5c5f3e7cb170b7de` | COLOR | TEXT_FILL | component token |
| `color-text-role-success` | 1. Themes › `color/text/role/success` | `4d99dc192c15bc4d84ab06b0d7dfa29a74768030` | COLOR | TEXT_FILL | component token |
| `color-text-role-warning` | 1. Themes › `color/text/role/warning` | `298f6713572958c933c408402deaaaefd3806679` | COLOR | TEXT_FILL | component token |
| `color-text-subtle` | 1. Themes › `color/text/subtle` | `dac97f2fd2a80ccffd6283bcc06c623f64ebe90a` | COLOR | TEXT_FILL | component token |
| `radius-2xl` | 2. Radius › `radius/2xl` | `be176bcdae178fc46f0c6f10d06b01a39445d6f6` | FLOAT | CORNER_RADIUS | component token |
| `size-control-height-lg` | 4. Size › `size/control/height/lg` | `14c0f56d2add6f7149374e67cf4d3a2656aeb5dc` | FLOAT | WIDTH_HEIGHT | component token |
| `size-control-height-md` | 4. Size › `size/control/height/md` | `cb6d23a09de76b9cea37c24579dbb2a9e6e6a079` | FLOAT | WIDTH_HEIGHT | component token |
| `size-control-height-sm` | 4. Size › `size/control/height/sm` | `1409647f4e12e37e76b49ed9ce1a78946e4250f4` | FLOAT | WIDTH_HEIGHT | component token |
| `size-icon-lg` | 4. Size › `size/icon/lg` | `e79bd86fedcce89547674c84c9127d0149e60061` | FLOAT | WIDTH_HEIGHT | component token |
| `size-icon-md` | 4. Size › `size/icon/md` | `eb459c673e6ca16e3c81b240f04b467717953a9a` | FLOAT | WIDTH_HEIGHT | component token |
| `size-icon-sm` | 4. Size › `size/icon/sm` | `2aa4b1f12a5ed0745f9a8b3251dc1fd9f7dd3476` | FLOAT | WIDTH_HEIGHT | component token |
| `spacing-control-gap-lg` | 3. Spacing › `spacing/control/gap/lg` | `c9e0925c6738c94acdf8f5220207a44c304e25f0` | FLOAT | GAP | component token |
| `spacing-control-gap-md` | 3. Spacing › `spacing/control/gap/md` | `e2e6fc01e3a1245e8c3584798b5d224742a9a6bc` | FLOAT | GAP | component token |
| `spacing-control-gap-sm` | 3. Spacing › `spacing/control/gap/sm` | `97daa7ac19168846d702cc8c210d1e162a484b41` | FLOAT | GAP | component token |
| `spacing-control-padding-inline-lg` | 3. Spacing › `spacing/control/padding-inline/lg` | `3dddd3d0ffa2e8c03e2ee62241d0b414f9c3f5b5` | FLOAT | GAP | component token |
| `spacing-control-padding-inline-md` | 3. Spacing › `spacing/control/padding-inline/md` | `ece071c90fd7557c56f2a8918944c46d2672718e` | FLOAT | GAP | component token |
| `spacing-control-padding-inline-sm` | 3. Spacing › `spacing/control/padding-inline/sm` | `fb323143873973f1548553562791a9983936aa5a` | FLOAT | GAP | component token |
| `spacing-none` | 3. Spacing › `spacing/none` | `4879183c164f25d975ac0a8664388a77a2073b80` | FLOAT | GAP | component token |

## 4. Text styles used (keys)

None named in B/D.

## 5. Effect styles used (keys)

None named in B/D.

## 6. Components to instance (keys)

Nested Biowave components (e.g. Button inside Split button) are instances of the sets **in this file** — build them first; never detach.

### Icons (keys) — Google · Material Symbols library (D-18)

No icon named in this spec. Icons come only from the Google · Material Symbols library (Style=Rounded).

## 7. Phase 1 — values (from Part B)

## 8. Phase 1 — build the component set (from Part D)

## 9. Phase 2 — documentation pages and Components List card

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

## 11. Rules

All rules in **D1** (§8), plus:

**Component tokens only (strict, D-13).** This file may contain exactly one kind of local variable: the `<Component> / <Group>` collections in §2. Never create a local primitive or semantic variable or any other collection; never copy or detach a library variable; never create a local text, effect, colour or grid style; bind layers to the component token when one exists for the property. Run `_sync/figma-read-tokens.js` (lint) **before Phase 1 and after each phase** — it must report 0 violations.

## 12. Acceptance criteria (the Reviewer checks exactly these)

- [ ] F-AC-L1 Lint (`figma-read-tokens.js`) = 0 violations before Phase 1, after Phase 1 and after Phase 2 (outputs attached in D11)
- [ ] F-AC-L2 Every variable, style and component used comes from §2–§6 by key — no new local variables except component tokens, no local styles

## 13. When you finish

1. Fill [D11 Execution log](link.md#d11-execution-log-filled-by-the-figma-agent) in `link.md` (stages, node IDs of the set, docs section and pages, lint outputs, deviations, questions).
2. Set **Figma build** to `Built` in the header of `link.md` and in `3-web-components/README.md`.
3. `npm run sync:done:web` — records this contract as built in the Web file.
4. Add one line to the root `CHANGELOG.md`.
