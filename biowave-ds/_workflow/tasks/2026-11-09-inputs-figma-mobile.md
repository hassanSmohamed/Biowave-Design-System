# Task: Input family — Figma build, Mobile

> **Executor:** Figma Agent. **Author:** Claude (Planner), approved by Hassan on 2026-11-09.
> **Figma first:** this brief is the source of truth for the build. There is no `<name>.md` spec for most of these components yet; the Planner writes the specs and the component tokens files **from your build** after review. Do exactly what this brief says. If something is unclear or impossible, do the closest correct thing, and write it in the change-log table (§9) as a question. Never invent a new visual value.
> **Read first:** `biowave-ds/AGENTS.md` §2–§4, this brief, `biowave-ds/2-foundations/figma-doc-kit.md` (page layouts), `biowave-ds/5-mobile-components/components/text-field/figma-text-field-contract.md` (Wave 0) and `.../avatar/figma-avatar-contract.md` (Wave 1). Background: `biowave-ds/_audits/input-catalog.md`, `biowave-ds/_audits/input-family.md`.

| | |
|---|---|
| File | **Biowave DS — Mobile Components** · key `249tIAxlZogRvgBBXjcIZ5` |
| Foundations library | **Biowave DS — Foundations** `AyFaSmfDUlTax3GpKhRdHI` (variables, text styles, effect styles) — enabled in this file |
| Doc Kit library | **Annotation** `cBPWg6YZNqK8UIzgMQIpXl` (`Doc/*`) — enabled in this file |
| Icons library | **Google · Material Symbols** (Style = Rounded) — enabled in this file |
| Typography mode | `Mobile` |
| Sizes in this file | `lg` · default `lg` |
| Minimum target | 48 (`target-min`, mobile) |
| Picker surface | Bottom sheet |
| Work mode | **7 waves. Stop after every wave** and wait for Hassan's "go" (§10) |

---

## 0. Goal and scope

Build every input component and every building block the inputs need, in the **Mobile** components file, with the full documentation pages, so that a designer can build any Biowave form from this file only.

**In scope:** shared field parts · Text field + Text area · Avatar · Checkbox · Radio · Switch · Input chip · Progress · List item · Menu · Bottom sheet · Verification code · Segmented button · Select · Search field · Autocomplete · Phone field · Calendar · Date picker · Date range picker · Time picker · Color picker · File upload · Message composer.

**Out of scope:** Dialog, Card (selectable), Map, Slider, product screens, code, the repo `tokens.json` files (the Planner writes them after review), Code Connect.

**Never touch:** the legacy sets — in this file and in the Foundations file. This file has no legacy input sets. The legacy reference is in the Foundations file (§4). Hassan will decide when legacy is removed.

## 1. Decisions (final — do not reopen)

| # | Decision |
|---|---|
| 1 | Label is **static, above the field**, never floating. Fields are **outlined only** |
| 2 | Field focus = the field border becomes `border-width-focus` in `color-border-focus`, **no offset ring** (field exception, `a11y.md`). Every other control (checkbox, radio, switch, chip, list item, segment, calendar day, icon buttons) uses the normal ring: `border-width-focus`, `color-border-focus`, offset `border-focus-offset` |
| 3 | Required = red `*` after the label (`color-text-role-error`). `Optional` = "(Optional)" / "(اختياري)" after the label in `color-text-subtle`. Never both on one field |
| 4 | Help icon sits in the **label row**, opens a Tooltip, never inside the field. Error icon sits **before the supporting text**, never inside the field |
| 5 | Error never turns the leading or trailing icons red — only border, error icon and supporting text |
| 6 | No success / valid state on any field |
| 7 | IP and Port are ordinary **Text fields** (not new components). IP placeholder `000.000.000.000`; Port numeric `0–65535`. Their values are **always LTR with Western digits**, also in the Arabic set. Same for OTP digits, phone numbers, dates, times and hex colours (D-10) |
| 8 | Multi inputs = **Autocomplete** `multi` (pick from list) and `tags` (free entry). Selected values are Input chips inside the field |
| 9 | Color picker = **colour wheel + hex field** |
| 10 | Date range = **one field** that holds both dates: `DD/MM/YYYY – DD/MM/YYYY` |
| 11 | Location is **not a set**. It is an example of Autocomplete (leading `location_on`, trailing map action) shown on the Autocomplete docs |
| 12 | Country flags: one **SVG flag set** published from the Foundations file. Never emoji flags |
| 13 | Select with 2–4 options is a usage rule only (Radio / Segmented button instead) — goes on the Select docs page 05 |
| 14 | Avatar is a **core component**: build it in this file (Wave 1) from its contract and use that Avatar everywhere. Do not use the legacy `Avatar / Mobile` set from Foundations |

## 2. Build rules (every wave)

1. **Bind every visual value.** Fills, strokes, stroke widths, radius, padding, gap, width/height that have a token, text styles, effect styles, opacity. Zero raw values. The only exception is the colour-wheel gradient (Wave 5), which is content, like an image.
2. **Tokens.** Bind to an existing component collection when it covers the part. Existing in this file: `Button / *` · `Icon / Size` · `Icon / Color` · **`Text field / Size`** · **`Text field / State`** (no Menu collections yet — create them in Wave 2). For a new component, **create its component collections** `{Component} / {Group}` (for example `Checkbox / Size`, `Checkbox / State`). Every value is an **alias of a Foundations semantic variable** — never a primitive, never a raw value, never another component's variable. Names follow `biowave-ds/2-foundations/guidelines/tokens.md` (modes are prop values; variables are `{part}/{state}`). Never create local semantic or primitive variables or local styles. The Planner reviews every collection after each wave.
3. **Field-based components share one look.** Select, Search field, Autocomplete, Phone field, Date / Time / Date range / Color picker fields and the File upload `field` variant are built **from the `.Field / *` parts** (Wave 0) and bind to `Text field / Size` and `Text field / State`. They add their own collection only for parts that Text field does not have.
4. **Two sets per component, one per language** — same as `.Button _en` / `.Button _ar`: `.{Name} _en` and `.{Name} _ar`. The Arabic set uses Arabic sample copy and the auto layout mirrors (direction RTL). Values that stay LTR are listed in decision 7.
5. **Property naming** = future code props: variant values lowercase (`default · hovered · focused · pressed · disabled · read-only`, `sm · md · lg`, `false · true`); BOOLEAN and TEXT property names in sentence case (`Label`, `Show label`, `Supporting text`). Every TEXT property has a default EN or AR sample.
6. **Private parts** start with `_` (for example `_Field / Label`, `_Calendar / Day`). They live on the page `↳ Field parts` or on their component's page in a section `Bases`, are not documented, and are not published as components to use directly.
7. **Instances, never copies.** Use instances of: `.Button _en/_ar`, `Icon Button` (and its `/ Glyph`, `/ Appearance` bases), Material Symbols icons, the Avatar you build in Wave 1, and every component from an earlier wave. Never detach.
8. **Auto layout everywhere.** Text wraps for long Arabic; fields fill their parent width; nothing is sized for English only.
9. **Light and Dark** switch by the `1. Themes` variable mode. Check every set in both before closing a wave.
10. **Accessibility** (WCAG 2.2 AA): text 4.5:1 and borders / icons / focus 3:1 come from the semantic tokens below — do not swap in a lighter token. Every interactive part has a hit area of at least 48 (`target-min`, mobile). Disabled is the only state allowed below contrast.
11. **States columns.** Mobile has **no `hovered` state** anywhere (touch). Use `pressed` where a control needs press feedback.
12. **Component description** (Figma "Description" on each set): one line saying what it does + `Spec: Figma-first — see _workflow/tasks/2026-11-09-inputs-figma-mobile.md`.

## 3. Pages

Create these pages under `▼ Components`, after the existing ones, in this order:

```
────────── INPUTS ──────────        (divider page, name exactly "────────── INPUTS ──────────")
     ↳ Field parts                   private bases (Wave 0) — no docs
     ↳ Text field                    Text field + Text area
     ↳ Avatar
     ↳ Checkbox
     ↳ Radio
     ↳ Switch
     ↳ Chip
     ↳ Progress
     ↳ List item
     ↳ Menu
     ↳ Bottom sheet
     ↳ Verification code
     ↳ Segmented button
     ↳ Select
     ↳ Search field
     ↳ Autocomplete                  (+ Location example)
     ↳ Phone field
     ↳ Calendar
     ↳ Date picker                   (+ Date range picker)
     ↳ Time picker
     ↳ Color picker
     ↳ File upload
     ↳ Message composer
```

Each component page has two Figma sections, side by side:
- **`{Name} — Component`**: the `_en` and `_ar` sets and, if any, a section `Bases` with the private parts.
- **`{Name} — Documentation`**: the documentation pages from §5.

Add one card per component to the **Components List** page (`Doc/Home card`, preview = a live instance, link to the component page).

## 4. Legacy references (read only — look, do not reuse)

Open these in the Foundations file to match the established Biowave look. Rebuild clean; never copy-paste a legacy layer.

| Use it for | Foundations node |
|---|---|
| Field, label, supporting text, add-ons, dropdown, tags (web) | `Inputs` 4379:3155 · `Dropdown` 4379:3939 · `Textarea input field` 4392:29842 on page `↳ Inputs` 1268:1776 |
| Verification code (closest to final: `sm·md·lg`, `4·6` digits) | `Verification code input field` 4392:30109 |
| Mobile field parts, phone, PIN, search | `Title` 4131:6930 · `Container` 4131:6946 · `Supporting` 4131:6993 · `Phone Number` 4131:7389 · `PIN Input` 4131:7157 · `Search Input` 4131:7812 on page `↳ Inputs` 3991:1584 |
| Mobile text area | `Details input` 4131:10189 on page `↳ Text Area` 4131:10187 |
| Chips (input chip look) | `Assist Chip/Samll` 4131:14586 · `Filter Chip` 4131:14623 on page `↳ Chips` 4131:13556 · `Status` 4661:35036 |
| Bottom sheet, calendar, date cells, list rows, sheet header and CTA | page `↳ Bottom Sheet` 4131:10299: `Bottom Sheet` 4131:11454 · `Calendar` 4131:11650 · `Calendar Grid` 4131:11563 · `currentDateCell` 4131:11494 · `defaultDateCell` 4131:11501 · `List` 4131:11539 · `Header` 4131:11782 · `Bottom Sheet CTA` 4131:11508 |
| Product screens (real content and copy) | Web Components › `↳ Inputs` (2:9) frames: Login, Add employee, Add device, Add rule, Request forms, Live chat, LMS disconnect, Phone number + Select country, OTP |

## 5. Documentation (every public component)

Exactly the Doc Kit layouts in `2-foundations/figma-doc-kit.md`, built **only** from `Doc/*` instances and live component instances. Frames named `{Name} / 00 Component sheet` … `{Name} / 11 Changelog`. Page 10 is skipped (version 1.0).

### 5.1 Page 00 — Component sheet (same as the Button sheet)

```
┌ Doc/Header  Biowave DS / Component ─────────────────────────── biowave.ds ┐
│ {Name}                                                                    │
│ {one-line description}                                                    │
├───────────────────────────────────────────────────────────────────────────┤
│ {Name} — English                                                          │
│                 Doc/Axis label (Column) per column: State = default …     │
│ Doc/Axis label  ┌──────┬──────┬──────┬──────┐                             │
│ (Row) per level │  ▢   │  ▢   │  ▢   │  ▢   │   ← live instances           │
│ grouped rows    ├──────┼──────┼──────┼──────┤                             │
│ with Doc/Bracket│  ▢   │  ▢   │  ▢   │  ▢   │                             │
│                 └──────┴──────┴──────┴──────┘                             │
│ {Name} — Arabic   (same grid from the _ar set)                            │
│                              Doc/Logo + "Biowave DS"                      │
└───────────────────────────────────────────────────────────────────────────┘
```
- Width = `size/container/6xl` (Wide). Columns and row groups are given per component in §8 ("Sheet").
- Row labels use `Doc/Axis label` (`Property` small, `Value` bold), nested groups use `Doc/Bracket` — like the Button sheet (Variant → State → Size).
- Inverse or dark examples (if any) go in a last column on a `Doc/Panel` Dark, like the White column of the Button sheet.
- Invalid combinations are not shown.

### 5.2 Pages 01–11

| Page | Content |
|---|---|
| 01 Introduction | One-paragraph description, then the anatomy (`Doc/Callout` per part, names exactly as in §8 "Parts") on `Doc/Panel` Light and again on Dark |
| 02 Props and tokens | `Doc/Table`: Property · Type · Values · Default · Description (every Figma property). Second table: Part · State · Token (the variables you bound) |
| 03 Variations | One `Doc/Tile` per option (each size, each boolean on, each variant), caption = option name |
| 04 States and motion | Every state in order; `Doc/Motion row` for each transition with `Doc/Timeline` (`motion-duration-sm` for hover/press/toggle, `md` for menus/popovers, `lg` for sheets) |
| 05 Usage guidelines | `Doc/Uses` when to use / when not to use (§8 "Usage") + `Doc/Do` / `Doc/Dont` pairs with live examples |
| 06 Content guidelines | Label, placeholder, supporting and error copy rules with EN and AR examples |
| 07 Platform | `Doc/Device frame` `Phone` with `Doc/Skeleton` content and the component in place; end with a short table of what is different on Mobile |
| 08 RTL | LTR (en) and RTL (ar) side by side for each structurally different variant; callouts on mirrored and non-mirrored parts (decision 7 values stay LTR; chevrons and arrows mirror; check marks, clocks and media do not) |
| 09 Accessibility | Keyboard / screen reader / focus (instance in focused state with a callout on the ring or border) / target size overlay (48 (`target-min`, mobile)) / contrast pairs |
| 11 Changelog | `Doc/Table`: Version `1.0` · Date · "Created" |

## 6. Shared sizes and tokens

**Field sizes (Mobile):** `lg`. Field height = `size-control-height-{size}`; padding-inline = `spacing-control-padding-inline-{size}`; icon-to-text gap = `spacing-control-gap-{size}`; icon size = `size-icon-lg`; radius = `radius-md`; border = `border-width-default`.

**Field colours** — identical to Text field B3.2 and already in `Text field / State`; new field components reuse them. Priority: disabled → error → focused → hovered → default; a focused error keeps `color-border-error` at `border-width-focus`. Required `*` = `color-text-role-error` (`color-text-disabled` when disabled).

| Part | default | focused | error | disabled | read-only |
|---|---|---|---|---|---|
| container | `color-background-base-default` | `color-background-base-default` | `color-background-base-default` | `color-background-disabled` | `color-background-base-subtlest` |
| border | `color-border-bold` | `color-border-focus` @ `border-width-focus` | `color-border-error` (focused: same width as focus) | `color-border-disabled` | `color-border-default` |
| value | `color-text-default` | = | = | `color-text-disabled` | `color-text-default` |
| placeholder | `color-text-subtlest` | = | = | `color-text-disabled` | — |
| icons | `color-icon-subtlest` | `color-icon-default` | `color-icon-subtlest` (never red) | `color-icon-disabled` | `color-icon-subtlest` |
| label / supporting | `color-text-default` / `color-text-subtlest` | = | supporting + error icon: `color-text-role-error` / `color-icon-role-error` | `color-text-disabled` | = |
| prefix / suffix add-on | fill `color-background-neutral-default` · text `color-text-subtle` · divider = field border of the state | = | = | `color-background-disabled` · `color-text-disabled` | = |

**Text styles:** label `label/{size}`; value, placeholder, prefix and suffix `body/{size}`; supporting text and counter `caption/md`; error icon `size-icon-sm` with gap `spacing-xs`; menu and list rows `body/md`; descriptions `body/sm`; digits in OTP `data/lg`.
**Gaps:** label → field `spacing-sm`; field → supporting text `spacing-xs`.
**Floating surfaces** (Menu, Popover, Bottom sheet): fill `color-surface-raised`, border `border-width-default` `color-border-subtle`, effect `Elevation/2` (menu, popover) or `Elevation/4` (bottom sheet); scrim (docs only) `color-overlay-default`.
**Motion:** hover / press / toggle `motion-duration-sm`; menu, popover, tooltip `motion-duration-md`; bottom sheet `motion-duration-lg`; easing `motion-easing-standard`.

## 7. Waves overview

| Wave | Build | Uses |
|---|---|---|
| 0 | Field parts · Text field + Text area (with Optional, Stepper, IP / Port examples) | Icon, Icon Button, Button, Tooltip |
| 1 | Avatar · Checkbox · Radio · Switch · Input chip · Progress | Icon, Icon Button |
| 2 | List item · Menu · Bottom sheet | Wave 1 |
| 3 | Verification code · Segmented button | Wave 0 |
| 4 | Select · Search field · Autocomplete (+ Location example) · Phone field | Waves 0–2 · flag set |
| 5 | Calendar · Date picker · Date range picker · Time picker · Color picker | Waves 0–2 |
| 6 | File upload · Message composer | Waves 0–2 |

---

## 8. Components

Legend per component: **Parts** (layer names = anatomy names) · **Properties** · **Variants** (axes) · **Tokens** · **Sheet** (00 page columns / rows) · **Usage** (page 05 notes).

### WAVE 0 — Field parts and Text field

#### 8.0.1 Field parts (private, page `↳ Field parts`)

| Base | Variants | Contents |
|---|---|---|
| `_Field / Label` | `Size` `lg` × `State` `default · disabled` | `label` (TEXT) · `required` `*` (BOOLEAN `Required`) · `optional` "(Optional)" (BOOLEAN `Optional`) · `help` Icon Button transparent neutral, glyph `help` (BOOLEAN `Help icon`) |
| `_Field / Container` | `Size` `lg` × `State` `default` · `focused` · `disabled` · `read-only` × `Error` `false · true` | outlined box with slots: `prefix` · `leading-icon` · `input` · `trailing-icon` · `trailing-action` · `suffix` |
| `_Field / Add-on` | `Size` `lg` × `Position` `start · end` × `State` `default · disabled` | text segment with a divider on the inner side (`border-width-default`, colour = field border of the state), fill `color-background-neutral-default`, text `color-text-subtle` |
| `_Field / Action` | `Size` `lg` | Icon Button transparent neutral, sized to fit inside the border (visual box = field height − 2 × `spacing-xs`), hit area ≥ 48 (`target-min`, mobile) |
| `_Field / Supporting text` | `State` `default · error · disabled` | `error-icon` (`error`, visible only in `error`) · `supporting-text` · `counter` (BOOLEAN `Counter`) |

#### 8.0.2 Text field + Text area

Build exactly as `figma-text-field-contract.md` (Mobile) Phase 1 and Phase 2, with these additions (Text field 1.3):

| Addition | How |
|---|---|
| `Optional` | BOOLEAN on the label row (decision 3) |
| `Stepper` | BOOLEAN. Shows a `remove` Icon Button at the inline start and an `add` Icon Button at the inline end, inside the border, both `_Field / Action` size. For numbers only; never with prefix, suffix or trailing action |
| IP example | Not a property. Page 03 tile "IP address": Value `192.168.1.10`, placeholder `000.000.000.000`, supporting "Four numbers from 0 to 255", value LTR in the AR set |
| Port example | Page 03 tile "Port": Value `8080`, supporting "0–65535", value LTR in the AR set; no stepper |
| Email / Password examples | Page 03 tiles (`mail` leading icon; `visibility` trailing action) |

- **Sets:** `.Text field _en` · `.Text field _ar` (single line) and `.Text area _en` · `.Text area _ar` (multiline). The contract's `Language` and `Type` axes are dropped — language and type are separate sets. Ignore the contract's §13 repo steps; log in the change-log table instead (§9).
- **Variants (each set):** `Size` `lg` × `State` `default` · `focused` · `disabled` · `read-only` × `Filled` `false · true` × `Error` `false · true`; exclude `disabled × error=true`.
- **Sheet:** columns = `State`; rows = `Size` → `Filled` → `Error` (Text field, then Text area, each EN then AR).
- **Usage:** when not to use → Select (known list), Autocomplete (search a list), Phone field, Verification code, Search field.

### WAVE 1 — Building blocks

#### 8.1.1 Avatar (core)
Build exactly from `figma-avatar-contract.md` (Mobile), Phase 1 and Phase 2. Inputs use it at `xs` / `sm` (list rows, chips) and at the large size for the File upload `avatar` variant.

#### 8.1.2 Checkbox

**Accessibility sizing (decided by the Planner — build exactly this):** the visible box is never the hit area. `lg` only: box 24 = `size-icon-lg`, hit area 48 = `size-control-height-lg`. The **whole row** (box + label + description) is one click target. Unchecked border uses `color-border-bold` at `border-width-strong` (2 px) so the box edge passes 3:1. The check / dash glyph must pass 3:1 on the fill.

- **Parts:** `hit-area` (transparent, carries the state layer) · `box` · `glyph` (`check` or `remove`) · `label` · `description` · `focus-ring` (around the box)
- **Properties:** `Label` (TEXT) · `Show label` · `Description` (TEXT) · `Show description`
- **Variants:** `Checked` `false · true · indeterminate` × `State` `default` · `focused` · `pressed` · `disabled` × `Error` `false · true` × `Size` `lg` only; exclude `disabled × error=true`
- **Tokens:** box radius `radius-xs`; unchecked: border `color-border-bold`, fill `color-background-base-default`; checked / indeterminate: fill `color-background-brand-default` (pressed `-pressed`), glyph `color-icon-inverse`; state layer (hit area, `radius-full`): pressed `color-background-base-pressed`; error: border `color-border-error`, checked fill `color-background-error-default`; disabled: border `color-border-disabled`, fill `color-background-disabled`, glyph `color-icon-disabled`, text `color-text-disabled`; label `body/md` `color-text-default`; description `body/sm` `color-text-subtle`; box → label gap `spacing-lg`
- **Sheet:** columns = `State`; rows = `Checked` → `Error` → `Size`
- **Usage:** one agreement or a list of independent options; a group label (fieldset legend) above a group is shown on page 03 (`Checkbox group` example: legend `label/md`, 3 checkboxes, supporting / error text below)

#### 8.1.3 Radio
Same sizing, hit area, state layer and colours as Checkbox, with:
- **Parts:** `hit-area` · `ring` (`radius-full`) · `dot` (50 % of the ring, `radius-full`) · `label` · `description` · `focus-ring`
- **Variants:** `Selected` `false · true` × `State` `default` · `focused` · `pressed` · `disabled` × `Error` × `Size` `lg` only
- **Tokens:** unselected ring `color-border-bold` @ `border-width-strong`; selected ring `color-border-brand`, dot `color-background-brand-default`; error ring `color-border-error`, dot `color-background-error-default`; disabled `color-border-disabled` / `color-background-disabled`
- **Sheet:** columns = `State`; rows = `Selected` → `Error` → `Size`
- **Usage:** 2–4 fixed options in a form (decision 13). Page 03 shows a `Radio group` vertical and horizontal

#### 8.1.4 Switch
- **Sizing:** `lg` only: track 48 × 24 (`size-control-height-lg` × `size-icon-lg`), hit area 48. Thumb = track height − 2 × `spacing-xxs`.
- **Parts:** `hit-area` · `track` · `thumb` · `thumb-icon` (`check` when on, BOOLEAN `Thumb icon`) · `label` · `description` · `focus-ring`
- **Properties:** `Label` · `Show label` · `Description` · `Show description` · `Label placement` (VARIANT `end · start` — label after or before the switch)
- **Variants:** `Checked` `false · true` × `State` `default` · `focused` · `pressed` · `disabled` × `Size` `lg` only × `Label placement`
- **Tokens:** off: track `color-background-base-default` + border `color-border-bold` @ `border-width-strong`, thumb `color-icon-subtle`; on: track `color-background-brand-default`, thumb `color-icon-inverse`, thumb icon `color-icon-on-brand`; disabled: track `color-background-disabled`, border `color-border-disabled`, thumb `color-icon-disabled`; radius `radius-full`
- **Sheet:** columns = `State`; rows = `Checked` → `Size` → `Label placement`
- **Usage:** one setting that applies at once; never a two-option form answer (use Radio)

#### 8.1.5 Chip — input chip only
- **Sizes:** `md` 32 (`size-control-height-sm`) only; the remove button keeps a 48 hit area that may extend outside the chip.
- **Parts:** `container` · `leading` (none / Icon / Avatar xs) · `label` · `remove` (Icon `close`, its own hit area ≥ 48 (`target-min`, mobile), name "Remove {label}") · `focus-ring`
- **Properties:** `Label` (TEXT) · `Show remove` (BOOLEAN, default true)
- **Variants:** `Leading` `none · icon · avatar` × `Size` `md` × `State` `default` · `focused` · `pressed` · `disabled` · `selected` × `Error` `false · true`
- **Tokens:** radius `radius-sm`; padding-inline `spacing-md`; gap `spacing-xs`; fill `color-background-neutral-default` (pressed `-pressed`); selected (keyboard-highlighted before delete) `color-background-selected-default`; label `label/md` (`sm`: `label/sm`) `color-text-default`; remove icon `color-icon-subtle`; error: border `border-width-default` `color-border-error` + fill `color-background-error-subtlest`; disabled `color-background-disabled` / `color-text-disabled`
- **Sheet:** columns = `State`; rows = `Leading` → `Size` → `Error`
- **Usage:** values chosen in Autocomplete multi / tags, attachments in Message composer, uploaded file names. Not filter / assist / status chips (later, in the full Chip)

#### 8.1.6 Progress
- **Parts:** circular: `track` · `indicator`; linear: `track` · `indicator`
- **Variants:** `Type` `circular · linear` × `Mode` `determinate · indeterminate` × `Size` (circular: `sm` 16 = `size-icon-sm` · `md` 20 = `size-icon-md` · `lg` 24 = `size-icon-lg` · `xl` 48 = `size-icon-3xl`; linear: one height 4 = `spacing-xs`, width fill)
- **Properties:** `Value` (TEXT, sample `60%`, determinate only)
- **Tokens:** stroke `border-width-strong`; track `color-border-subtle` / linear `color-background-neutral-default`; indicator `color-border-brand` / linear `color-background-brand-default`; linear radius `radius-xxs`. Motion `motion-duration-progress`, `motion-easing-linear`
- **Sheet:** columns = `Size`; rows = `Type` → `Mode`
- **Usage:** loading inside Select / Autocomplete / Search, file upload rows, sending a message

### WAVE 2 — Lists and surfaces

#### 8.2.1 List item (menu row)
- **Sizes:** `lg` 48 — row height = `size-control-height-lg` (one line); two-line rows hug their content.
- **Parts:** `container` · `leading` · `title` · `description` · `trailing-text` · `trailing-icon` (`check` when selected in a single-select list) · `focus-ring` (inside the row: `border-width-focus` `color-border-focus`, no offset — rows sit flush in a menu)
- **Properties:** `Title` · `Description` · `Show description` · `Trailing text` · `Show trailing text` · `Trailing icon` (BOOLEAN + INSTANCE_SWAP)
- **Variants:** `Leading` `none · icon · avatar · dot · checkbox · radio` × `Lines` `one · two` × `State` `default · pressed · focused · selected · disabled` × `Size` `lg`
- **Tokens:** padding-inline `spacing-xl`; padding-block `spacing-md`; gap `spacing-lg`; fill transparent → pressed `color-background-base-pressed`, selected `color-background-selected-default`; title `body/md` `color-text-default`; description `body/sm` `color-text-subtle`; dot 8 = `spacing-md`, `radius-full`, colour `color-icon-role-success` sample (role colours swap); checkbox / radio leading = Wave 1 instances; disabled `color-text-disabled`
- **Sheet:** columns = `State`; rows = `Leading` → `Lines` → `Size`

#### 8.2.2 Menu
Create `Menu / Container` and `Menu / Item` collections (same names and parts as the Web file).
- **Parts:** `container` · `search` (Search field instance, Wave 4 — until then a `_Field / Container` with `search` icon) · `group-header` · `items` (List item instances) · `footer` · `scrollbar`
- **Properties:** `Show search` · `Show group header` · `Group header` (TEXT) · `Show footer`
- **Variants:** `Content` `options · loading · empty · no-results` × `Selection` `single · multi` × `Size` `lg`
  - `loading`: Progress circular `md` + "Loading…" `body/sm` `color-text-subtle`
  - `empty`: "No options" · `no-results`: "No results for “{query}”"
  - `multi`: rows with `Leading=checkbox`, and footer `Clear` (text Button) + `Apply` (filled brand Button)
- **Tokens:** §6 floating surface; radius `radius-lg`; padding `spacing-xs`; width = the field width (min `size-container-xxs` 320 is the **max** width for free menus); max visible rows 8 then scroll; group header `label/sm` `color-text-subtle`
- **Sheet:** columns = `Content`; rows = `Selection` → `Size`
- **Usage:** on Mobile the same content is shown inside a Bottom sheet (Select, Autocomplete, Phone field); the Menu set exists for menus anchored to icon buttons.

#### 8.2.3 Bottom sheet
Rebuild from the legacy `Bottom Sheet` (4131:11454) structure, clean and token-bound.
- **Parts:** `scrim` (docs only) · `container` · `handle` (32 × 4: `size-control-height-sm` × `spacing-xs`, `radius-full`, `color-border-bold`) · `header` (`title` `title/lg` + close Icon Button; optional leading back Icon Button) · `search` (BOOLEAN) · `content` (slot) · `footer` (sticky: one full-width filled brand Button, or `Cancel` + `Apply`)
- **Properties:** `Title` · `Show handle` · `Show header` · `Show search` · `Show footer` · `Footer` (VARIANT `one-button · two-buttons`)
- **Variants:** `Height` `half · full` × `Footer`
- **Tokens:** fill `color-surface-raised`; top corners `radius-4xl`, bottom corners `radius-none`; effect `Elevation/4`; padding-inline `spacing-xl`; footer top border `border-width-default` `color-border-subtle`; scrim `color-overlay-default`
- **Sheet:** columns = `Height`; rows = `Footer`
- **Usage:** every list and picker on Mobile: Select, Autocomplete, Phone country list, Date, Date range, Time, Color, upload source

### WAVE 3 — Simple inputs

#### 8.3.1 Verification code
Rebuild from legacy `Verification code input field` (4392:30109), token-bound.
- **Cell size (square):** `lg` 56 (`size-control-height-xl`) only; gap `spacing-md`; 6 digits = two groups of 3 with gap `spacing-xl` between groups.
- **Bases:** `_Verification code / Cell` — `State` `default · focused · disabled` × `Filled` × `Error` (same colours as §6; focused = field focus border). Digit `data/lg`, centred; `Mask` shows `•`.
- **Parts:** `label` (`_Field / Label`) · `cells` · `supporting-text` (`_Field / Supporting text`)
- **Properties:** `Label` · `Show label` · `Supporting text` · `Show supporting text` · `Mask` (BOOLEAN, PIN)
- **Variants:** `Digits` `4 · 6` × `Size` `lg` × `State` `default` · `focused` · `disabled` × `Filled` `empty · partial · full` × `Error`
- **RTL:** cells always run left to right, also in the `_ar` set (digits are LTR); label and supporting text mirror
- **Sheet:** columns = `State`; rows = `Digits` → `Size` → `Filled` → `Error`
- **Usage:** one-time codes and PINs only; Resend is a Link / text Button outside the component (shown in page 03 example)

#### 8.3.2 Segmented button
- **Bases:** `_Segmented button / Segment` — `Position` `start · middle · end` × `Selected` × `State` `default` · `focused` · `pressed` · `disabled` × `Content` `label · icon · label-icon`
- **Parts:** `segments` · each segment: `check` (selected, multi only) · `icon` · `label` · divider (`border-width-default` `color-border-bold`)
- **Variants (public set):** `Segments` `2 · 3 · 4 · 5 · 7` (7 = day picker) × `Selection` `single · multi` × `Size` `lg`
- **Tokens:** height `size-control-height-{size}`; padding-inline `spacing-control-padding-inline-{size}`; outer radius `radius-md`, inner `radius-none`; border `color-border-bold`; selected fill `color-background-selected-default`, label `color-text-role-brand`, check `color-icon-role-brand`; label `label/md`
- **Sheet:** columns = `Segments`; rows = `Selection` → `Size`; page 04 shows segment states
- **Usage:** 2–5 short options that switch a view or quick setting; 7 = weekend / work-day picker (`multi`). Labels must fit one row — otherwise Radio group (Arabic is longer: check the `_ar` set at the narrowest width shown on page 07)

### WAVE 4 — List inputs

All four are built from `.Field / *` parts (rule 2.3). Open state: the field (`focused`, chevron `expand_less`); the list itself is shown on docs pages 03–04 inside a Bottom sheet instance.

#### 8.4.1 Select
- **Parts:** field parts + `leading` (none / Icon / Avatar xs / dot) + `value` + `chevron` (`expand_more`, mirrored never)
- **Properties:** field parts properties + `Leading` (VARIANT, below)
- **Variants:** `Size` `lg` × `State` `default` · `focused` · `disabled` · `read-only` · `open` × `Filled` × `Error` × `Leading` `none · icon · avatar · dot`
- **Sheet:** columns = `State`; rows = `Leading` → `Size` → `Filled` → `Error`
- **Usage (page 05 — decision 13):** 2–4 fixed options in a form → Radio group; 2–5 short options that switch a view → Segmented button; one on/off setting → Switch; more than ~10 options or search → Autocomplete; keep Select when space is tight, the list comes from the API, or the field is secondary

#### 8.4.2 Search field
- **Parts:** `leading` (`search`, replaced by Progress circular `sm` when loading) · `input` · `clear` (`_Field / Action` `close`, when filled)
- **Properties:** `Placeholder` (default "Search" / "بحث") · `Loading` (BOOLEAN)
- **Variants:** `Variant` `field · bar` × `Size` `lg` × `State` `default` · `focused` · `disabled` × `Filled`  — `bar`: `radius-full`, fill `color-background-neutral-default`, no border, focus = ring
- **Sheet:** columns = `State`; rows = `Variant` → `Size` → `Filled`

#### 8.4.3 Autocomplete (+ Location example)
- **Parts:** field parts + `chips` (Input chip instances, size per §8.1.5) + `more` ("+N" chip) + `input` + `clear` + `chevron`
- **Variants:** `Selection` `single · multi · tags` × `Size` `lg` × `State` `default` · `focused` · `disabled` · `read-only` · `open` × `Filled` × `Error`
  - `multi` filled: 2 chips + "+3"; open menu = Menu `Selection=multi` (checkbox rows)
  - `tags` filled: 2 chips + caret; open menu row "Add “{text}”"
  - single open: Menu `single` with `loading` shown on page 04
- **Location example (page 03 + 07, not a set):** `single`, leading `location_on`, trailing action `map`, two-line address rows in the menu
- **Sheet:** columns = `State`; rows = `Selection` → `Size` → `Filled` → `Error`
- **Usage:** long or remote lists; multi-select; free tags

#### 8.4.4 Phone field
**Prerequisite:** the SVG flag set must be published in the Foundations file. If it is not, build everything else in this wave, leave Phone field, and write "blocked — flags" in the change log.
- **Parts:** field parts + `country` segment (flag 24 × 16 from the flag set, `radius-xxs` · dial code `+966` `body/md` · `expand_more`) + divider + `input` (number, LTR always)
- **Variants:** `Size` `lg` × `State` `default` · `focused` · `disabled` · `read-only` · `open` × `Filled` × `Error`
- **Open:** Bottom sheet with search + country rows (docs page 03–04)
- **RTL:** in the `_ar` set the whole field mirrors **except** the country segment content and the number, which stay `+966` and `55 123 4567` LTR
- **Sheet:** columns = `State`; rows = `Size` → `Filled` → `Error`

### WAVE 5 — Pickers

Panels open in: **Bottom sheet**. Footer = `Cancel` (text Button) + `Apply` (filled brand Button). All values LTR with Western digits.

#### 8.5.1 Calendar
Rebuild from legacy `Calendar` 4131:11650 / `Calendar Grid` 4131:11563 / date cells.
- **Bases:** `_Calendar / Day` — `State` `default · pressed · focused · today · selected · range-start · range-middle · range-end · outside-month · disabled`; size 48 (`size-control-height-lg`), `radius-full` (range-middle: square, fill spans the gap). `_Calendar / Cell` (month / year) — same states except range, `radius-md`, height 48 (`size-control-height-lg`).
- **Parts:** `header` (month-year `title/md` + previous / next Icon Buttons — chevrons **mirror** in `_ar`) · `weekdays` (`label/sm` `color-text-subtle`) · `grid`
- **Variants:** `View` `day · month · year` × `Selection` `single · range`
- **Tokens:** today: border `color-border-brand`; selected / range ends: fill `color-background-brand-default`, text `color-text-inverse`; range middle: fill `color-background-brand-subtlest`; outside month `color-text-subtlest`; disabled `color-text-disabled`; day `body/md`
- **Sheet:** columns = `View`; rows = `Selection`; page 04 shows all `_Calendar / Day` states
- **Usage:** inside Date and Date range pickers only. Sample week starts Sunday (EN) and Saturday (AR) — page 07 notes it is configurable

#### 8.5.2 Date picker
- **Parts:** field parts + `value` (`DD/MM/YYYY` placeholder) + trailing action `calendar_today`
- **Variants:** field: `Size` `lg` × `State` `default` · `focused` · `disabled` · `read-only` · `open` × `Filled` × `Error`. Open = field + Bottom sheet containing Calendar `day · single` + footer
- **Sheet:** columns = `State`; rows = `Size` → `Filled` → `Error`

#### 8.5.3 Date range picker (one field — decision 10)
- Same as Date picker; value `12/11/2026 – 18/11/2026`, placeholder `DD/MM/YYYY – DD/MM/YYYY`; calendar `day · range`; the en dash stays between the dates in AR (LTR value)
- Page 03 adds quick ranges (Today · This week · This month) as Chips above the calendar — example only

#### 8.5.4 Time picker
- **Parts:** field parts + `value` (`HH:MM`) + trailing action `schedule`
- **Panel:** two columns, hours and minutes, of List item rows (`selected` on the current value), plus a Segmented button `AM · PM` in 12 h
- **Variants:** field as Date picker × `Format` `24h · 12h`
- **Sheet:** columns = `State`; rows = `Format` → `Size` → `Filled`

#### 8.5.5 Color picker (colour wheel + hex — decision 9)
- **Bases:** `_Color picker / Swatch` — `Size` `sm` 16 · `md` 24 · `lg` 32 (`size-icon-sm/lg/xl`) × `Selected` × `State`; `radius-xs`; border `border-width-default` `color-border-default`; checkerboard behind transparent colours. `_Color picker / Handle` — 16 circle, border `border-width-strong` `color-border-inverse` + outer `color-border-bold`; `focused` adds the focus ring.
- **Field parts:** leading Swatch `md` (current colour) · `value` hex `#1A73E8` (LTR) · trailing action `palette`
- **Panel:** `wheel` (hue × saturation disk, the only raw gradient in this brief — content) with Handle · `brightness` track (linear gradient black → current colour, Handle) · `hex` Text field `sm` (`#` prefix) · `recent` row of 6 Swatches `md`
- **Variants:** field: `Size` `lg` × `State` `default` · `focused` · `disabled` · `read-only` · `open` × `Filled` × `Error`
- **Accessibility (page 09):** the hex field is the keyboard and screen-reader path; the handle moves with arrow keys and announces "Hue 210°, saturation 60%"
- **Sheet:** columns = `State`; rows = `Size` → `Filled` → `Error`

### WAVE 6 — Rich inputs

#### 8.6.1 File upload
- **Bases:** `_File upload / File item` — `Status` `uploading · done · error`: file-type icon (`description` / `image`) · name `body/md` (truncate middle) · size `caption/md` `color-text-subtle` · Progress linear (uploading) · status icon (`check_circle` `color-icon-role-success` / `error` `color-icon-role-error`) · actions: `close` (cancel / delete) and `refresh` (retry, error only) Icon Buttons
- **Variants:** `Variant` `dropzone · field · avatar` × `State` `default · focused · disabled · error`
  - `dropzone`: dashed border `border-width-default` `color-border-bold`, fill `color-background-base-subtlest`, `radius-xl`; content: `upload` icon `size-icon-xl` `color-icon-role-brand` · title "Upload files" · outlined Button `sm` "Browse files" · supporting "PDF, JPG · up to 5 MB"
  - `field`: Text field look; value = file name; trailing action `upload`
  - `avatar`: Avatar (largest size) + filled brand Icon Button `sm` with `photo_camera` at the bottom-end corner (mirrors to bottom-start in `_ar`)
- **Page 03:** file list of 3 File items under the dropzone; source chooser (Files · Camera · Gallery) as List items in a Bottom sheet
- **Sheet:** columns = `State`; rows = `Variant`
- **Usage:** documents and images; never a plain Text field for files

#### 8.6.2 Message composer (chat input)
- **Parts:** `attachments` (row of Input chips, BOOLEAN `Show attachments`) · `container` · `emoji` (Icon Button `mood`) · `input` (multiline, grows to 5 lines then scrolls; placeholder "Write a message" / "اكتب رسالة") · `attach` (Icon Button `attach_file`) · `send` (filled brand Icon Button `send` — glyph mirrors in `_ar`; disabled when empty; shows Progress circular `sm` while sending)
- **Variants:** `State` `default · focused · filled · sending · disabled` × `Size` `lg`
- **Tokens:** container `color-surface-default`, top border `border-width-default` `color-border-subtle`, padding `spacing-md`; input box radius `radius-xl`, border and fill from §6
- **Sheet:** columns = `State`; rows = `Size` → `Show attachments`

---

## 9. Change log (this is your execution log)

Use the change-log table in this file: page `Changelog` (1:3) › the change-log table. If the page has no table yet, copy the frame `_Change Log` from the Web Components file (node 377:6482), clear its body rows and use it. Columns: **Num** · **Change Log Description** · **Author**.

Add one row per finished item and one row at the end of each wave. Description format:

```
2026-11-09 · Wave 1 · Checkbox — _en 4:10, _ar 4:11, 72 variants each, collections Checkbox / Size, Checkbox / State; docs 00–11 built.
Question: <only if any>
```
Author = `Figma Agent`. Also log every token you could not find, every deviation from this brief, and every question. Never delete or change older rows.

## 10. Stop after every wave

1. Finish the wave: sets, bases, collections, docs pages, Components List cards, change-log rows.
2. Check: lint `_sync/figma-read-tokens.js` (0 violations) · Light and Dark · EN and AR · every property toggled once on a test instance.
3. Add the wave-end row: "Wave N done — waiting for review" with variant counts per set.
4. **Stop.** Tell Hassan the wave is ready. Do not start the next wave until Hassan says go. The Planner reviews and may add a fix list before the next wave.

## 11. Acceptance criteria (checked per wave)

- [ ] AC-1 Pages, sections and set names exactly as §3 and §8 (`.{Name} _en` / `.{Name} _ar`, bases with `_`)
- [ ] AC-2 Properties and variant axes exactly as §8; variant values lowercase; invalid combinations excluded; counts logged
- [ ] AC-3 Zero raw values (except the colour wheel gradient); every value bound to a component collection or a Foundations variable / style; lint = 0
- [ ] AC-4 New collections alias Foundations **semantic** variables only; named per `tokens.md`
- [ ] AC-5 Light and Dark correct; Typography mode `Mobile`
- [ ] AC-6 `_ar` sets mirror correctly; decision 7 values stay LTR with Western digits; Arabic copy wraps without clipping
- [ ] AC-7 Hit areas ≥ 48 (`target-min`, mobile); Checkbox / Radio / Switch sizes exactly §8.1; focus treatment per decision 2
- [ ] AC-8 Instances of Button, Icon Button, Avatar, icons and earlier-wave components — nothing detached or copied
- [ ] AC-9 Docs pages 00–09 and 11 for every public set, built only from `Doc/*` + live instances; page 00 matches the Button sheet layout; Components List card added
- [ ] AC-10 Legacy sets untouched (here and in Foundations)
- [ ] AC-11 Change-log rows for every item, every question and the wave end
