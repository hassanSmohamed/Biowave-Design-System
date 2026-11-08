# Input catalog and gap analysis — all input types × Web · Tablet · Mobile

> Agent summary: the full list of input types a product UI can need, checked against (1) the Gemini screen report `ui_input_inventory_and_gap_analysis_report.md` (product screens, 2026-11-08) and (2) what Biowave already has or has planned (`_audits/input-family.md` I-01 … I-14, ROADMAP §4–§8, the three Text field specs). For each type: where it lives in Biowave, its status, its platforms and its props. Ends with the gaps and the decisions **IC-01 … IC-12** (closed 2026-11-08). Read-only audit: no spec, token or Figma file was changed.

| Field | Value |
|---|---|
| Date | 2026-11-08 |
| Inputs | Gemini screen report (uploaded by the design lead) · `_audits/input-family.md` · `ROADMAP.md` v3 · `3-/4-/5-…/components/text-field/text-field.md` v1.2 · section README status tables |
| Platforms | **W** Web (React + MUI) · **T** Tablet (Flutter + M3) · **M** Mobile (Flutter + M3) — every input below targets all three unless the table says otherwise |
| Plan status | **Decisions closed** 2026-11-08 — all recommendations accepted by the design lead; IC-05 waits for a product answer |

## 1. Platform agreement

All input components ship on **W, T and M**, with one Part A (guidelines) per component copied to the three files (AGENTS rule 10). The only exceptions are listed in §3 (`—` in a platform column). Rules that already hold for every field (I-05, Text field A8):

| Rule | Web | Tablet | Mobile |
|---|---|---|---|
| Sizes | `sm` · `md` · `lg` | `md` · `lg` | `lg` only (48 touch target) |
| Default size | `md` | `lg` | `lg` |
| Hover state | ✓ | — (pointer optional) | — |
| Focus | Border → `color-border-focus` (I-04) | same | same |
| Keyboard | Physical; Tab order | Physical + on-screen | On-screen keyboard matched to the value (`inputMode` / `TextInputType`), action key Next / Done |
| Pickers (list, date, time) | Popover anchored to the field | Popover or dialog | **Bottom sheet** or full-screen dialog (IC-08) |
| Resize handle (multiline) | ✓ | — | — |
| Layout | Parent decides width; multi-column forms | 1–2 columns | Full width, one field per row |

## 2. Status today (from the section README tables, 2026-11-08)

| Input | Web | Tablet | Mobile |
|---|---|---|---|
| Text field (incl. Text area, password, prefix/suffix, counter) | Spec Finished · **Code Approved** · Figma Planned | Spec Finished · Code Planned | Spec Finished · Code Planned |
| Every other input type in §3 | No spec yet | No spec yet | No spec yet |

The roadmap scheduled Checkbox · Radio · Switch (Day 6), Select (Day 7), Verification code and Segmented button (Day 8). None of them has a spec yet, so the input family is the main open block of Phase 1.

## 3. Full catalog

Legend — **Status**: ✅ spec exists · 📅 on the roadmap (day) · 🗂 backlog (after 1.0) · ➕ new, needs a decision · ✗ not needed. **Screens**: ✓ seen in the Gemini report / legacy screens.

### 3.1 Text entry

| Input type | Screens | Biowave home | Status | W | T | M |
|---|:-:|---|---|:-:|:-:|:-:|
| Text field (single line) | ✓ | Text field | ✅ | ● | ● | ● |
| Text area (multiline + counter) | ✓ | Text field `multiline` (I-06) | ✅ | ● | ● | ● |
| Password (show/hide) | ✓ | Text field `type=password` + `passwordToggle` | ✅ | ● | ● | ● |
| Email · URL · plain number | ✓ | Text field `type` / `inputMode` | ✅ | ● | ● | ● |
| Prefix / suffix text (`http://`, `SAR`, `kg`) | ✓ legacy | Text field `prefix` · `suffix` (I-12) | ✅ | ● | ● | ● |
| Field + attached button (Copy) | ✓ legacy | Text field `endButton` (I-14) | ✅ | ● | ● | ● |
| Field with scan / custom action | ✓ | Text field `action` (I-13) | ✅ | ● | ● | ● |
| Typed confirmation (Disconnect integration) | ✓ | Pattern "Destructive actions" (Day 21) = Dialog + Text field + rule | 📅 21 | ● | ● | ● |
| Search field | ✓ legacy | Search field | 📅 13 | ● | ● | ● |
| Number field with stepper (− / +) | — | ➕ Text field option or own component (IC-02) | ➕ | ● | ● | ● |
| Masked / formatted text (national ID, IBAN, IP, duration) | ✓ (IP, time) | ➕ Text field `mask` (IC-03) | ➕ | ● | ● | ● |
| IP address (4 segments) | ✓ | ➕ Text field + mask, not a segmented component (IC-04) | ➕ | ● | ● | — ? |
| Chat / message composer | ✓ | ➕ Message composer (IC-05) | ➕ | ● | ● | ● |
| Rich text editor | — | Backlog | 🗂 | | | |
| Inline edit (click text to edit) | — | — | ✗ (use Text field in a Dialog / Side sheet) | | | |

### 3.2 Formatted and structured entry

| Input type | Screens | Biowave home | Status | W | T | M |
|---|:-:|---|---|:-:|:-:|:-:|
| Verification code / OTP / PIN (4 · 6 cells) | ✓ | Verification code (I-08) | 📅 8 | ● | ● | ● |
| Phone number (country Select + number) | ✓ | Phone field (I-07) | 📅 13 | ● | ● | ● |
| Date (field + calendar) | ✓ | Date picker | 📅 14 | ● | ● | ● |
| Time of day | ✓ | Time picker | 📅 15 | ● | ● | ● |
| Date range | — | Date range picker | 📅 15 | ● | ● | ● |
| Duration `00 : 00 : 00` (hours · min · sec) | ✓ | ➕ not covered by Time picker (IC-06) | ➕ | ● | ● | ● |
| Date + time together | — | Date picker + Time picker side by side (layout) | ✗ new component | | | |
| Month / year only | — | Date picker `views` option (decide on Day 14) | 📅 14 | ● | ● | ● |

### 3.3 Selection

| Input type | Screens | Biowave home | Status | W | T | M |
|---|:-:|---|---|:-:|:-:|:-:|
| Select (single, closed list) | ✓ | Select | 📅 7 | ● | ● | ● |
| Multi-select with chips | ✓ | Autocomplete `multiple` (I-01) | 📅 13 | ● | ● | ● |
| Autocomplete / combobox (search a long list) | ✓ legacy | Autocomplete | 📅 13 | ● | ● | ● |
| Free-entry tags (type and press Enter) | ✓ legacy | Autocomplete `freeSolo` + `multiple` | 📅 13 | ● | ● | ● |
| Checkbox (+ group) | ✓ | Checkbox | 📅 6 | ● | ● | ● |
| Radio group | ✓ | Radio | 📅 6 | ● | ● | ● |
| Switch / toggle | ✓ | Switch | 📅 6 | ● | ● | ● |
| Segmented control (single or multi, e.g. weekend days) | ✓ | Segmented button (incl. day picker, P-05) | 📅 8 | ● | ● | ● |
| Radio cards / visual selector (device model, fingerprint) | ✓ | Card `selectable` (P-05) — needs single **and** multi mode (IC-07) | 📅 5 | ● | ● | ● |
| Filter chips | — | Chip `filter` | 📅 4 | ● | ● | ● |
| Slider / range slider | — | Slider (designed in Figma) | 🗂 | | | |
| Rating | — | Backlog | 🗂 | | | |
| Color picker | — | — | ✗ | | | |
| Transfer list (two lists) | — | — | ✗ (use Autocomplete multi) | | | |

### 3.4 Uploads and media

| Input type | Screens | Biowave home | Status | W | T | M |
|---|:-:|---|---|:-:|:-:|:-:|
| File / document upload (dropzone + file list + progress) | ✓ | File upload | 📅 16 | ● | ● | ● |
| Avatar / photo upload | ✓ | File upload `variant=avatar` (P-05) | 📅 16 | ● | ● | ● |
| Camera capture (mobile) | — | File upload source option on T/M | 📅 16 | — | ● | ● |
| Location picker (field + map) | ✓ | Text field `action` (map icon) + Map in Dialog; Map is backlog (P-05) | 🗂 (IC-09) | ● | ● | ● |
| Fingerprint / biometric enrollment | ✓ | Biometric enrollment pattern | 🗂 | | | |
| Signature pad | — | — | ✗ | | | |

## 4. Gemini report — check item by item

| Report item | Verdict | Where it is handled |
|---|---|---|
| 1.1 Standard text, password, text area + counter | ✅ Already in Text field (B1: `passwordToggle`, `maxLength` + `showCounter`, `minRows`/`maxRows`, `resize`) | text-field.md |
| 1.1 Chat input | ➕ Gap | IC-05 |
| 1.1 Destructive confirmation input | ✅ Pattern, not a component — Text field + exact-match rule in a Dialog | ROADMAP Day 21 |
| 1.2 Phone · OTP | 📅 Phone field Day 13 · Verification code Day 8 | input-family I-07, I-08 |
| 1.2 IP address (4 boxes) | ➕ Gap — recommend a masked Text field, not 4 boxes (paste, screen readers, RTL) | IC-03, IC-04 |
| 1.2 Time & date with mask `00 : 00 : 00` | Date/time ✅ planned; the three-part **duration** is not | IC-06 |
| 1.3 Single / multi select, toggle, segmented, checkboxes | 📅 all planned (Day 6–8, 13) | ROADMAP |
| 1.3 Radio cards | 📅 Card selectable — confirm it covers single (radio) and multi (checkbox) | IC-07 |
| 1.4 File upload, avatar upload | 📅 File upload Day 16 incl. avatar variant | P-05 |
| 1.4 Location picker | 🗂 Map is backlog | IC-09 |
| 2.1 Missing states (hover, focus, disabled, error, success) | Hover · Focus · Disabled · Error · Read-only are already the field model (I-05). **Success is not** | IC-10 |
| 2.2 Required indicator inconsistent | Text field has `required` (asterisk). There is no `optional` marker yet | IC-01 |
| 2.2 "Placeholder" written as a value | ✅ Token exists: placeholder uses `color-text-subtlest`; content rule in Text field A6. Fix the product mockups | text-field A6 |
| 2.2 Upload looks like a text field | ✅ File upload will be a dropzone, not a field | Day 16 |
| 2.2 2–4 options hidden in a dropdown | ➕ Add as a "When not to use" rule in Select A3 | IC-11 |
| 2.2 Helper text vs "i" tooltip | ✅ Decided: help icon in the label row with a tooltip, supporting text for what everyone needs (I-11, Text field A4.3) | text-field A4.3 |
| 2.3 "Rest" → "Reset", "Remotely Work" → "Remote work" | Product copy, not the design system — send to the product team. Button labels follow `content.md` | — |
| 3.5 State matrix for IP, OTP, multi-select | Each component spec carries its own B4 States table and Figma `State` axis | per spec |

## 5. Props — shared field model

Every field component (Text field, Select, Autocomplete, Search field, Phone field, Verification code, Date / Time picker fields, Number field, File upload field) reuses the shared field parts from Text field (I-09: `.Field/Label`, `.Field/Container`, `.Field/Supporting text`). They all take these props, with the same names on every platform:

| Prop (code) | Figma property | Type | Notes |
|---|---|---|---|
| `label` · `hideLabel` | `Label` (text) · `Show label` | text · boolean | Static, above the field (I-02) |
| `required` | `Required` | boolean | Asterisk + native required |
| `optional` *(IC-01)* | `Optional` | boolean | "(Optional)" after the label — only if IC-01 keeps it |
| `helpText` · `helpLabel` | `Help icon` | text | Help icon + Tooltip in the label row (I-11) |
| `helperText` | `Supporting text` | text | Hint, or the error message when `error` |
| `error` | `Error` | boolean | Error border + icon before the message (not inside the field) |
| `size` | `Size` | `sm` · `md` · `lg` | Per §1 |
| `disabled` · `readOnly` | `State` = Disabled · Read-only | boolean | Disabled wins |
| — | `State` = Default · Hover · Focus | variant | Hover web only |
| — | `Filled` | boolean | Value vs placeholder (not a state, IG-02) |
| — | `Language` | `EN` · `AR` | B-04 |
| `fullWidth` | — | boolean | Default true |
| `id` · `name` · `value` · `defaultValue` · `onChange` · `onBlur` · `onFocus` | — | native | Flutter: `controller`, `focusNode`, `onChanged` |
| `placeholder` | `Placeholder` (text) | text | Format hint only, `color-text-subtlest` |

## 6. Props — by input type (only what each adds to §5)

### 6.1 Select (Day 7)
| Prop | Type | Notes |
|---|---|---|
| `options` | `{ value, label, icon?, avatar?, dot?, disabled? }[]` | Leading visual per option: icon · avatar · status dot (legacy Dropdown `Type`) |
| `value` / `onChange` | value | Single value only — multi goes to Autocomplete |
| `startAdornment` | icon | Leading icon in the closed field |
| `open` · `onOpen` · `onClose` | boolean · callbacks | Figma: `State=Open` (chevron rotated) |
| `emptyText` | text | Shown when there are no options |
| `renderValue` | function | Custom closed display (web) |
| Mobile | — | Opens a bottom sheet list (IC-08) |

### 6.2 Autocomplete — single, multi, tags (Day 13)
| Prop | Type | Notes |
|---|---|---|
| `options` · `getOptionLabel` | list · function | |
| `multiple` | boolean | Selected values shown as dismissible Chips inside the field |
| `freeSolo` | boolean | Lets the user add values not in the list (tags) |
| `limitTags` | number | Collapse to "+N" |
| `loading` · `loadingText` · `noOptionsText` | boolean · text | Async search (Progress inside the list) |
| `onInputChange` | callback | Server search |
| `disableCloseOnSelect` | boolean | Default on when `multiple` |
| Figma | `Selection` = Single · Multi · `Tags count` | |

### 6.3 Verification code (Day 8)
| Prop | Type | Notes |
|---|---|---|
| `length` | `4` · `6` | Figma `Digits` |
| `value` · `onChange` · `onComplete` | string · callbacks | `onComplete` fires when all cells are filled |
| `mask` | boolean | Hide digits (PIN) |
| `autoFocus` | boolean | |
| `inputMode` | `numeric` (default) | `autocomplete="one-time-code"` on web, SMS autofill on Flutter |
| Behavior | — | Auto-advance, Backspace goes back, paste fills all cells, digits always LTR + Western (D-10) |
| Figma per cell | `.Verification code/Cell` · `State` · `Filled` · `Error` | |

### 6.4 Phone field (Day 13)
| Prop | Type | Notes |
|---|---|---|
| `country` · `onCountryChange` · `defaultCountry` | ISO code | Country Select (flag + dial code) |
| `countries` | ISO list | Limit the list (e.g. GCC first) |
| `value` | E.164 string | Formatted per country while typing |
| Behavior | — | Number always LTR inside an RTL form; dial code part of the same field |

### 6.5 Search field (Day 13)
| Prop | Type | Notes |
|---|---|---|
| `onSearch` | callback | Enter / submit |
| `clearable` | boolean | Default on |
| `shortcut` | text | Web only (`⌘K`), visual hint |
| `loading` | boolean | Spinner replaces the search icon |
| `variant` | `field` · `bar` | `bar` = M3 Search bar on T/M |

### 6.6 Number field (IC-02)
| Prop | Type | Notes |
|---|---|---|
| `min` · `max` · `step` | number | |
| `stepper` | boolean | − / + Icon buttons at the ends |
| `precision` | number | Decimals |
| `prefix` · `suffix` | text | From Text field (`SAR`, `hrs`) |
| Behavior | — | Western digits (D-10), arrow keys on web, numeric keypad on T/M |

### 6.7 Masked text (IC-03) — Text field option
| Prop | Type | Notes |
|---|---|---|
| `mask` | pattern | e.g. `000.000.000.000` (IP), `00:00:00` (duration) |
| `unmask` | boolean | Return the raw value |
| Behavior | — | Fixed separators shown as placeholder, always LTR, paste is parsed |

### 6.8 Date picker · Time picker · Date range (Day 14–15)
| Prop | Type | Notes |
|---|---|---|
| `value` · `onChange` | date / time | |
| `minDate` · `maxDate` · `disabledDates` | date · function | |
| `format` | text | Display format; Western digits (D-10) |
| `views` | `day` · `month` · `year` | Month/year only pickers |
| `firstDayOfWeek` | number | Saturday / Sunday for the region |
| `ampm` · `minutesStep` · `seconds` | boolean · number · boolean | Time picker |
| `startLabel` · `endLabel` | text | Date range |
| Field part | — | Text field + calendar / clock `action`; typing allowed on web |

### 6.9 Duration field (IC-06)
| Prop | Type | Notes |
|---|---|---|
| `units` | `h:m` · `h:m:s` | |
| `value` | seconds (number) | |
| `max` | number | |
| Recommendation | — | Build as Text field + `mask` (IC-03), not a new component |

### 6.10 Checkbox · Radio · Switch (Day 6)
| Component | Props |
|---|---|
| Checkbox | `checked` · `indeterminate` · `onChange` · `label` · `description` · `disabled` · `error` · `size` · `value` · `name` |
| Checkbox group | `label` (legend) · `helperText` · `error` · `required` · `orientation` (`vertical` · `horizontal`) · `children` |
| Radio group | `label` (legend) · `value` · `onChange` · `options` / `children` · `orientation` · `helperText` · `error` · `required` · `disabled` |
| Radio | `value` · `label` · `description` · `disabled` |
| Switch | `checked` · `onChange` · `label` · `description` · `labelPlacement` (`start` · `end`) · `disabled` · `size` · `icon` (thumb icon on T/M) |
| Figma | `Checked` = Off · On · Indeterminate · `State` = Default · Hover · Focus · Pressed · Disabled · `Error` · `Label` · `Description` |

### 6.11 Segmented button (Day 8)
| Prop | Type | Notes |
|---|---|---|
| `options` | `{ value, label?, icon? }[]` | Icon-only needs `aria-label` |
| `value` · `onChange` | value or list | |
| `multiple` | boolean | Weekend days / day picker |
| `size` · `fullWidth` · `disabled` | | |
| Limit | 2–5 segments | More → Select or Chip filter |

### 6.12 Card selectable — radio cards (Day 5, IC-07)
| Prop | Type | Notes |
|---|---|---|
| `selectionMode` | `single` · `multiple` | Radio or Checkbox semantics |
| `selected` · `onSelect` | boolean · callback | |
| `media` | image · icon | Thumbnail (device model, finger) |
| `title` · `description` | text | |
| `indicator` | `radio` · `checkbox` · `check-badge` · `none` | Selected border always shown |
| `disabled` | boolean | |
| Group | `CardGroup` with `label`, `value`, `onChange`, `error`, `helperText` | So a card set behaves like a Radio group |

### 6.13 File upload (Day 16)
| Prop | Type | Notes |
|---|---|---|
| `variant` | `dropzone` · `field` · `avatar` | `avatar` = round, placeholder image, camera Icon button |
| `accept` · `maxSize` · `maxFiles` · `multiple` | | Shown as supporting text ("PDF, JPG · up to 5 MB") |
| `files` · `onChange` · `onRemove` | list · callbacks | File list rows with progress, error and delete |
| `status` per file | `uploading` · `done` · `error` | Progress (linear), retry |
| `sources` (T/M) | `files` · `camera` · `gallery` | Bottom sheet chooser |
| Behavior | — | Drag-and-drop on web only; whole dropzone is one button |

### 6.14 Message composer (IC-05)
| Prop | Type | Notes |
|---|---|---|
| `value` · `onChange` · `onSend` | | Enter sends on web, Shift+Enter new line |
| `maxRows` | number | Grows then scrolls |
| `onAttach` · `attachments` | callback · list | Attachment chips above the input |
| `emoji` | boolean | Emoji Icon button (prefix) |
| `sending` · `disabled` | boolean | |

## 7. Decisions (✅ confirmed by design lead 2026-11-08 — all recommendations accepted)

| ID | Question | Options | Decision |
|---|---|---|---|
| IC-01 | Required vs optional marking | (a) asterisk on required + one line "* Required" at form top; no Optional tag · (b) asterisk + `optional` prop for forms where most fields are required · (c) mark only optional | ✅ **(b)** — asterisk is the rule (report §3.1); add an `optional` boolean to the shared field parts for the edge case, never both on one form. Write it in the Forms pattern (Day 21) |
| IC-02 | Number field | (a) Text field `type=number` only · (b) Text field + `stepper` option · (c) own component | ✅ **(b)** — one option on Text field; no new Figma set, a `Stepper` boolean |
| IC-03 | Input mask | (a) `mask` option on Text field · (b) leave to apps | ✅ **(a)** — needed by IP, duration, national ID, IBAN; one implementation (web: `react-imask` or similar, Flutter: `mask_text_input_formatter`) |
| IC-04 | IP address | (a) one masked field · (b) four boxes like the screens | ✅ **(a)** — four boxes break paste, screen readers and RTL; the mask shows the dots |
| IC-05 | Chat / message composer | (a) new Phase 2 component · (b) backlog · (c) pattern from Text field + Icon buttons | ⏳ **(a)** if Live chat ships with 1.0, otherwise **(b)** — waiting for the product team; until then it is backlog |
| IC-06 | Duration `00:00:00` | (a) Text field + mask · (b) part of Time picker · (c) own component | ✅ **(a)** |
| IC-07 | Radio cards | Card selectable covers single and multi + a group wrapper | ✅ Add `selectionMode` + `CardGroup` to the Card spec |
| IC-08 | Select / Autocomplete / pickers on mobile | (a) bottom sheet · (b) anchored menu like web | ✅ **(a)** on Mobile, menu on Tablet and Web |
| IC-09 | Location picker | (a) wait for Map (backlog) · (b) Text field + action now, map later | ✅ **(b)** — the field works with address search (Autocomplete); the map Dialog comes with Map |
| IC-10 | Success / valid state | (a) green border state · (b) no success state; use a requirements checklist for passwords | ✅ **(b)** — fewer variants; green borders on every field add noise. The password rules list belongs to the Sign-in pattern (Day 23) |
| IC-11 | Select with 2–4 options | Rule in Select A3 "When not to use": 2–4 short options → Radio group or Segmented button | ✅ Add the rule — full text in §7.1 |
| IC-12 | Copy errors in product screens ("Rest", "Remotely Work") | Product team fixes; DS only owns `content.md` | ✅ Send to product |

### 7.1 IC-11 — rule text for Select A3 "When not to use"

Why: a Select hides its options until it is opened, and every choice costs two actions (open, pick) — plus a bottom sheet on Mobile. Radio and Segmented button show every option at once and pick in one action. This is a usage rule, not a code limit: Select still accepts two options.

| Situation | Use instead |
|---|---|
| 2–4 fixed options in a form question (e.g. Gender, request type with descriptions) | Radio group |
| 2–5 short options (1–2 words) that switch a view, filter or quick setting (e.g. Office · Remote · Hybrid, weekend days, Day · Week · Month) | Segmented button (`multiple` for days) |
| One on/off setting that applies at once | Switch |
| One agreement or yes/no in a form | Checkbox |
| More than about 10 options, or the user needs to search | Autocomplete |
| **Keep Select** when space is tight (table toolbar, table cell, dense filter row), the list comes from the API and may grow, or the field is secondary and rarely changed | Select |

Radio vs Segmented button: Radio is a form answer saved on submit and can carry long labels or descriptions; Segmented button is for short labels and usually applies at once. Arabic labels are longer: if a Segmented button does not fit in one row at the current width, use a vertical Radio group. Switch never replaces a two-option Radio (Male / Female is not on/off).

## 8. Suggested next steps

1. ✅ IC-01 … IC-12 closed 2026-11-08 (IC-05 waits for product).
2. Update `ROADMAP.md`: Number field and mask as Text field 1.3 options (IC-02, IC-03); Message composer row or backlog (IC-05); note the schedule — Day 6–8 inputs (Checkbox, Radio, Switch, Select, Verification code, Segmented button) have no spec yet.
3. Text field 1.3 (all three files): `optional`, `stepper`, `mask` if accepted.
4. Write specs in this order — each reuses the parts before it: **Checkbox · Radio · Switch → Select → Verification code → Segmented button → Card selectable → Search field · Autocomplete · Phone field → Date · Time pickers → File upload**.

## 9. Building blocks first — dependency map (added 2026-11-08, Draft)

Same approach as the button family: every component that appears **inside** an input is built first, with every option the inputs will need, so no input has to redraw or work around a missing part. Source: the design lead's input list (2026-11-08).

### 9.1 The design lead's list → Biowave component → what it is built from

| Input (design lead's list) | Biowave component | Built from |
|---|---|---|
| Text (default) | Text field | Field parts · Icon · Icon button · Tooltip (help) |
| Email | Text field `type=email` | same as Text |
| Password | Text field `type=password` | same + Icon button (show/hide) |
| Text area (details) | Text field `multiline` | same + counter |
| IP | Text field `mask` (IC-03, IC-04) | same + mask |
| Port | Text field `type=number` `min=0` `max=65535` (IC-02) — or IP `:` Port in one field (IC-13) | same |
| OTP | Verification code | Field parts (label, supporting text) · Cell |
| Phone number | Phone field | Text field · Select · Menu · List item · **Flag** |
| Dropdown list | Select | Field parts · Icon · **Menu** · **List item** · Avatar · Badge (dot) · **Bottom sheet** (Mobile) |
| Search + multi | Search field + Autocomplete `multiple` | Text field · **Chip** · Menu · List item · **Checkbox** · **Progress** |
| Multi inputs | ⚠ meaning to confirm (IC-14) | depends on the answer |
| Date | Date picker | Text field · Icon button · **Calendar** · **Popover** (W) / **Dialog** (T) / Bottom sheet (M) · Button |
| Time | Time picker | Text field · Icon button · **Time list / clock** · Popover / Dialog / Bottom sheet · Button |
| Color | Color picker (IC-15) — was ✗ in §3.3, back in scope | Text field (hex) · **Swatch** · Popover / Bottom sheet |
| Location | Text field + Autocomplete (address) + map `action` (IC-09) | Autocomplete · Icon button · Dialog · Map (backlog) |
| Chat | Message composer (IC-05 → in scope) | Text field `multiline` · Icon button (emoji, attach, send) · Chip (attachment) · Progress · Popover (emoji) |
| Upload file / image | File upload (`dropzone` · `field` · `avatar`) | Button · Icon button · **Progress** · **List item** / Chip (file) · Avatar · Alert (error) |

### 9.2 Building blocks — status and the options inputs need from them

| Block | Used by | Status (W · T · M code) | Options the inputs need (must be in its spec) |
|---|---|---|---|
| **Field parts** (`Label` · `Container` · `Add-on` · `Supporting text` · `Counter`) | Every field | W ✅ inside Text field · T/M ❌ (Text field code Planned) | Public in code as shared internals; private Figma components `.Field/*`; sizes `sm·md·lg`; error / disabled / read-only |
| Icon | All | ✅ W · ✅ T · ✅ M | — |
| Icon button | Trailing actions, steppers, chat, pickers | ✅ W · ✅ T · ✅ M | A size that fits inside each field size without covering the border (AD-1/AD-2 fixed on W) |
| Button | End button, pickers (OK / Cancel), upload | ✅ (Built) | `sm` attached segment (end button) |
| Tooltip | Help icon | ✅ W · T/M Planned | — |
| Avatar | Select options, upload avatar | ✅ W · T/M Planned | `xs`/`sm` to fit a list row and a chip |
| Badge | Status dot in Select options | ✅ W · T/M Planned | Dot variant |
| **Checkbox** | Multi-select rows, Card selectable | ❌ (Day 6) | Indeterminate ("select all"); size that fits a list row |
| **Radio** | Radio group, Card selectable | ❌ (Day 6) | — |
| **Chip** (input chip) | Multi-select, tags, attachments, uploaded file | ❌ (Day 4) | `sm` that fits inside `sm·md·lg` fields; remove button (×) with its own name; avatar / icon leading; disabled; error (invalid tag); truncate long text |
| **Progress** | Select / Autocomplete loading, upload, send | ❌ (Day 5) | Circular `sm` inside a field; linear inside a file row; determinate + indeterminate |
| **List item** | Every menu row, file list | ❌ (Day 8) | Leading icon · avatar · dot · checkbox; title + description; selected; disabled; dense size per field size |
| **Menu** | Select, Autocomplete, Phone, Search, Split button | ❌ (Day 10) | Anchored to a field, same width as the field; max height + scroll; empty, loading and "no results" rows; group headers; keyboard type-ahead |
| **Popover** (generic anchored surface) | Date, Time, Color, emoji | ❌ **not on the roadmap** (IC-16) | Anchored, flips in RTL and near edges, focus trap, Esc closes |
| **Dialog** | Date / Time on T, location map, typed confirmation | ❌ (Day 11) | — |
| **Bottom sheet** | Every picker and list on Mobile (IC-08) | ❌ (Day 12) | Search at top, list, sticky actions |
| **Calendar** | Date picker, Date range picker | ❌ part of Day 14 | Day · month · year views; range; disabled days; Saturday/Sunday week start |
| **Time list / clock** | Time picker | ❌ part of Day 15 | 12/24 h; minute step |
| **Swatch** | Color picker | ❌ new (IC-15) | Selected, disabled, sizes |
| **Flag** | Phone field country | ❌ new asset (IC-17) | Source of country flags (SVG set), square / round |

### 9.3 Proposed build order (replaces §8 step 4 once IC-13 … IC-17 are closed)

```
Wave 0  Field parts on T/M  ← Text field code on Tablet + Mobile (Web done)
Wave 1  Core blocks         Checkbox · Radio · Switch · Chip · Progress
Wave 2  Rows and surfaces   List item · Menu · Popover · Dialog · Bottom sheet
Wave 3  Simple inputs       Text field 1.3 (optional · stepper · mask → IP, Port, Duration)
                            Verification code · Segmented button · Card selectable
Wave 4  List inputs         Select · Search field · Autocomplete (single · multi · tags) · Phone field
Wave 5  Picker inputs       Calendar → Date picker · Date range · Time picker · Color picker
Wave 6  Rich inputs         File upload (dropzone · field · avatar) · Message composer · Location
```

This moves Select from Day 7 to after Menu (today Select is before Menu, List and Chip, so it would have to ship a placeholder list).

### 9.4 Open decisions

| ID | Question | Recommendation |
|---|---|---|
| IC-13 | Port: own field or `IP : Port` in one field | Separate Number field (`0–65535`) beside the IP field; one combined mask only if the screens always show them together |
| IC-14 | "Multi inputs" means: (a) multi-select · (b) repeatable rows ("+ Add another") · (c) several fields in one group (From – To) · (d) tags | Waiting for the design lead |
| IC-15 | Color picker scope | Preset swatch palette + optional hex field; no free colour wheel (fewer a11y and contrast problems) |
| IC-16 | Generic Popover component | Add to Phase 2 with Menu (Wave 2); Menu, Date, Time, Color and emoji all sit on it |
| IC-17 | Country flags source | One SVG flag set as a Foundations asset (not emoji: emoji flags do not render on Windows) |
| IC-05 | Message composer | Back in scope (Chat is on the design lead's list) — confirm with product |
