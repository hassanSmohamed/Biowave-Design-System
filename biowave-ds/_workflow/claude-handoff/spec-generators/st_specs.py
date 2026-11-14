import sys; sys.path.insert(0, sys.path[0])
from common import *
from sheets import standard_tail, d_rest
from pg_specs import fixD

ST = dict(name='Stepper', ar='مؤشر الخطوات', slug='stepper',
  summary='Shows progress through a multi-step flow (a request, onboarding, device setup): which steps are done, which one is current and what comes next.',
  summary_ar='يوضّح التقدّم في مسار متعدد الخطوات (طلب، تعريف، إعداد جهاز): الخطوات المكتملة والخطوة الحالية وما يليها.',
  parts='Container · step · indicator · label · description · connector · compact header · progress',
  parts_ar='الحاوية · الخطوة · المؤشر · التسمية · الوصف · الخط الواصل · العنوان المختصر · شريط التقدّم',
  built_on={'web':'MUI `Stepper` + `Step` + `StepLabel` (`orientation`), with a custom `StepIcon` and `StepConnector` from semantic tokens',
            'tablet':'Custom Flutter widget (Flutter `Stepper` is not used: its layout cannot match B2), styled from semantic tokens',
            'mobile':'Custom Flutter widget: compact header (`Text` + Biowave linear Progress) and the vertical list; neither iOS nor Android has a native stepper'},
  **{'import':{'web':"`import { Stepper, Step } from '@biowave/web'`",'tablet':'`BwStepper` from `package:biowave_tablet/biowave_tablet.dart`','mobile':'`BwStepper`, `BwStepperCompact` from `package:biowave_mobile/biowave_mobile.dart`'}})

A = """## A · Guidelines

> What it is and when to use it — designers, PMs. Identical on Web, Tablet and Mobile except **A8** (checked by `npm run docs:check`).

| | |
|---|---|
| Specs | [Web](../../../3-web-components/components/stepper/stepper.md#b--spec) · [Tablet](../../../4-tablet-components/components/stepper/stepper.md#b--spec) · [Mobile](../../../5-mobile-components/components/stepper/stepper.md#b--spec) |
| Figma | `↳ Stepper` in **Biowave DS — Web Components** · **Tablet Components** · **Mobile Components** |
| Version | 1.0 · 2026-11-13 |

### A1 Overview

A stepper shows a flow broken into steps — "Device details › Network › Users › Review" — and where the user is in it. Done steps show a check, the current step is filled in the brand colour, and later steps are outlined. It does not replace the step's own content and buttons; it shows progress and, when allowed, lets the user go back to a finished step.

### A2 Anatomy

```
Horizontal   (✓)─────────(2)─────────( 3 )─────────( 4 )
             ①  Device    ② Network   Users          Review
                details   ③ Connect the terminal     ④ connector
Vertical     (✓) Device details
              │
             (2) Network
              │  Connect the terminal to your network      ⑤ description
             ( 3 ) Users
Mobile compact   Step 2 of 4 · Network
                 ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬──────────────────          ⑥ progress
```

| # | Part | Required | Role |
|---|---|---|---|
| 1 | `indicator` | Yes | Circle with the step number, a check (done) or "!" (error) |
| 2 | `label` | Yes | The step's name |
| 3 | `description` | No | One short line under the label |
| 4 | `connector` | Yes | Line between steps; brand colour once the step before it is done |
| 5 | vertical form | — | Steps stacked, connector under each indicator |
| 6 | `progress` | Mobile compact | Linear Progress under "Step n of total" |

### A3 Usage

**When to use**
- Flows of 3–6 steps that must be done in order: device setup, a new request, onboarding
- Vertical on review screens and narrow panels; horizontal above a wide form

**When not to use** (and what to use instead)
| Situation | Use instead |
|---|---|
| Views of the same content | Tabs |
| Pages of a list | Pagination |
| A single long form | Sections with headings |
| Progress of an upload or a task | Progress |

### A4 Options

#### 4.1 `orientation`
| Value | Pick it when |
|---|---|
| `horizontal` | **Default** on Web and Tablet landscape: above the step content |
| `vertical` | Review screens, side sheets, Tablet portrait, Mobile review |
| `compact` (Mobile) | Mobile flows: "Step 2 of 4" + Progress in the top area (NV-09) |

#### 4.2 Step state
`upcoming` · `current` · `completed` · `error`

**Combination rules**
- Exactly one current step
- Completed steps can be clickable (go back); upcoming steps are not, unless the flow is non-linear

### A5 States and behavior

| State | What the user sees |
|---|---|
| Upcoming | Outlined circle with the number, grey label |
| Current | Brand-filled circle with the number, bold label |
| Completed | Brand-filled circle with a check; connector after it in brand |
| Error | Error-filled circle with "!", label in the error colour, description says what is wrong |

**Behavior rules**
- Going back to a completed step keeps what the user entered
- Labels wrap to two lines in the horizontal form; never truncate
- Arabic: steps run right to left; numbers and the check do not mirror

### A6 Content

| Element | Rule | Max length |
|---|---|---|
| label | Noun phrase naming the step: "Network", "Review" | 20 chars |
| description | One line: "Connect the terminal to your network" | 48 chars |
| compact | "Step n of total" | — |

| ✓ EN | ✓ AR | ✗ Avoid |
|---|---|---|
| Device details · Network · Users · Review | تفاصيل الجهاز · الشبكة · المستخدمون · المراجعة | Step 1 · Step 2 · Step 3 |
| Step 2 of 4 | الخطوة 2 من 4 | 2/4 |

### A7 Do and don't

| ✓ Do | ✗ Don't |
|---|---|
| Name each step by what happens in it | Number-only steps |
| Keep 3–6 steps | Use a stepper for a two-screen flow |
| Show errors on the step that has them | Block the whole stepper for one error |

"""
A8 = {'web': """### A8 Platform notes — Web

| | Web |
|---|---|
| Forms | Horizontal (default), vertical |
| Size | Indicator `size-icon-xl` (32) |
| Interaction | Completed steps are links back; keyboard Tab / Enter |

""", 'tablet': """### A8 Platform notes — Tablet

| | Tablet |
|---|---|
| Forms | Horizontal (landscape), vertical (portrait, review) |
| Size | Indicator `size-icon-xl` (32) with a `target-min` hit area on clickable steps |

""", 'mobile': """### A8 Platform notes — Mobile

| | Mobile |
|---|---|
| Forms | Compact ("Step 2 of 4" + linear Progress) at the top of each step screen (NV-09); vertical on the review screen |
| Native | Neither iOS nor Android has a stepper; one Biowave design on both OSs |
| Back | The top app bar back button goes to the previous step |

"""}
A_tail = """### A9 Accessibility (design)

- Each step is announced with its position and state ("Network, step 2 of 4, current")
- Done and error are shown by an icon, not only colour
- The compact form's progress has a text equivalent ("Step 2 of 4")

### A10 Related components

- Progress — the compact form's bar
- [Tabs](../tabs/tabs.md#a--guidelines) — views, not steps
- [Top app bar](../top-app-bar/top-app-bar.md#a--guidelines) — Mobile compact sits under it

---

"""

def B(p):
    if p=='mobile':
        api="""#### BwStepperCompact
| Parameter | Type | Default | Required | Description |
|---|---|---|---|---|
| `current` · `count` | `int` | — | ✓ | "Step current of count" |
| `title` | `String` | — | ✓ | The current step's label |

#### BwStepper (vertical)
| Parameter | Type | Default | Required | Description |
|---|---|---|---|---|
| `steps` | `List<BwStep>` (`label`, `description?`, `state`) | — | ✓ | |
| `onStepTapped` | `ValueChanged<int>?` | — | | Completed steps only |"""
    else:
        api=("""#### Stepper
| Prop | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `activeStep` | `number` | 0 … n − 1 | — | ✓ | Current step |
| `orientation` | `'horizontal' \\| 'vertical'` | | `'horizontal'` | | |
| `children` | `Step[]` | 3–6 | — | ✓ | |
| `onStepClick` | `(index: number) => void` | | — | | Completed steps become links |

#### Step
| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | `label` |
| `description` | `string` | — | `description` |
| `error` | `string` | — | Error state; shown as the description |""" if p=='web' else """#### BwStepper
| Parameter | Type | Values | Default | Required | Description |
|---|---|---|---|---|---|
| `steps` | `List<BwStep>` (`label`, `description?`, `error?`) | 3–6 | — | ✓ | |
| `current` | `int` | | — | ✓ | |
| `axis` | `Axis` | horizontal · vertical | auto (orientation) | | |
| `onStepTapped` | `ValueChanged<int>?` | | — | | Completed steps only |""")
    common="""| indicator | size · radius | `size-icon-xl` · `radius-full` |
| indicator | number text · icon | `label-md` · `check` / `priority_high` `size-icon-sm` |
| label · description | text style | `label-lg` · `body-sm` |
| step (horizontal) | gap indicator–text · padding-inline | `spacing-md` · `spacing-md` |
| connector (horizontal) | thickness · min length · margin | `border-width-strong` · `spacing-3xl` · `spacing-md` each side |
| step (vertical) | gap indicator–text · gap between steps | `spacing-lg` · `spacing-md` (connector fills it) |
| connector (vertical) | thickness · margin | `border-width-strong` · `spacing-xs` above and below |"""
    if p=='mobile':
        dims=common+"""
| compact | step text · title · gap | `label-md` · `title-lg` · `spacing-xs` |
| compact | progress | Progress `linear` `md`, full width, `spacing-md` below the title |"""
    else: dims=common
    return f"""## B · Spec

> The contract — API, dimensions, tokens, states, RTL, accessibility. Code and Figma are both reviewed against this part.

### B1 API

{api}

**Invalid combinations** ({'`console.warn` in development' if p=='web' else '`assert` in debug'}):
| Combination | Fallback |
|---|---|
| no current step / more than one | the first not-completed step is current |
| fewer than 2 steps | renders, warns |

### B2 Dimensions

| Part | Property | Token |
|---|---|---|
{dims}

### B3 Tokens by part and state

Every value is a semantic token; there is no `stepper.tokens.json`.

| Part | Property | Upcoming | Current | Completed | Error |
|---|---|---|---|---|---|
| indicator | fill | `color-background-transparent-default` | `color-background-brand-default` | `color-background-brand-default` | `color-background-error-default` |
| indicator | border | `border-width-strong` `color-border-bold` | — | — | — |
| indicator | number · icon | `color-text-subtle` | `color-text-on-brand` | `color-icon-on-brand` | `color-icon-on-error` |
| label | colour · weight | `color-text-subtle` | `color-text-default` (`title-md`) | `color-text-default` | `color-text-role-error` |
| description | colour | `color-text-subtlest` | `color-text-subtlest` | `color-text-subtlest` | `color-text-role-error` |
| connector after | colour | `color-border-subtle` | `color-border-subtle` | `color-border-brand` | `color-border-subtle` |

Contrast (light): number `color-text-on-brand` on `color-background-brand-default` ≥ 12:1 · upcoming outline `color-border-bold` 4.95:1 · label `color-text-subtle` 14.55:1. Dark theme: same tokens.

### B4 States and transitions

| From → To | Trigger | Animated properties | Duration | Easing |
|---|---|---|---|---|
| Current → Completed | step finished | fill stays, number → check; connector colours in | `motion-duration-md` | `motion-easing-standard` |
| Upcoming → Current | next step | outline → fill | `motion-duration-md` | `motion-easing-standard` |

Reduced motion: instant.

### B5 RTL

| Part | In RTL |
|---|---|
| order | Reverses: the first step is on the right (horizontal); vertical keeps top-to-bottom with the indicator on the right |
| icons · numbers | Do not mirror |

### B6 Accessibility (implementation)

| Requirement | Implementation |
|---|---|
| Role | {'`<ol>` of steps; current `aria-current="step"`; completed steps are links when clickable' if p=='web' else 'Semantics per step: "label, step n of total, state"'} |
| Error | Description is the error message, linked to the step |
| Compact | {'—' if p!='mobile' else 'Progress has `Semantics(value: "Step 2 of 4")`'} |

### B7 Examples

See the docs pages 03 and 07.

### B8 Figma

Structure, properties, the Figma ↔ code mapping and Code Connect: [Part D](#d--figma-build).

### B9 Tests

- [ ] Light + dark · en + ar: B2–B3 tokens
- [ ] Exactly one current step; completed steps show a check
- [ ] Error state shows "!" and the message
- [ ] RTL reverses the horizontal order
- [ ] No raw values

---

"""

def C(p):
    if p=='web':
        appr="- **Base:** MUI `Stepper` (`alternativeLabel` off) with a custom `StepIcon` (B3 indicator) and `StepConnector` (B2 thickness, B3 colours); `orientation` prop."
        files="3-web-components/src/components/stepper/Stepper.tsx · Stepper.test.tsx · index.ts   new\n3-web-components/src/index.ts · README.md · CHANGELOG.md   change"
        cmd="`npm run test:web`, `npm run typecheck`, `npm run docs:check`"
    else:
        sec=SEC[p]
        appr=("- **Base:** custom `Row` / `Column` of step widgets with `Expanded` connectors; indicator `AnimatedContainer`." if p=='tablet' else
              "- **Compact:** `Column(Text('Step n of total'), Text(title), BwProgress.linear(value: n / total))`.\n- **Vertical:** as Tablet's vertical form.")
        files=f"{sec}/lib/src/components/stepper/bw_stepper.dart   new\n{sec}/test/stepper_test.dart · goldens\n{sec}/lib/biowave_{p}.dart   change: export\n{sec}/README.md · CHANGELOG.md"
        cmd=f"`cd {sec} && flutter analyze && flutter test`, `npm run docs:check`"
    return standard_tail(p, ST, cmd, files, "- [ ] Tapping a completed step calls the handler; upcoming steps do not", f"The {LBL[p]} Stepper", appr, "- The step screens' content and buttons\n- Progress (its own spec)")

def D(p):
    head=d_head(p, ST, '**Create new.** Legacy Mobile `_Top app bar` (Progress) is the compact form source; it stays untouched', ('Progress set (`.Progress _en` / `_ar`) in this file' if p=='mobile' else 'Icon (Material Symbols) in this file'))
    if p=='mobile':
        struct="```\n❖ Stepper                        ← set: Form = Compact · Vertical × Language = EN · AR\n  └─ ❖ .Step                      ← private set: State = Upcoming · Current · Completed · Error × Direction = LTR · RTL (vertical step)\n```"
        tree="```\nStepper (Compact)          ↕ gap spacing/xs · width 360 sample · padding spacing/xl\n├── T \"Step 2 of 4\"        label/md · color/text/subtle\n├── T \"Network\"            title/lg\n└── ◇ Progress linear md   full width, 50 %\nStepper (Vertical)         ↕ ◇ .Step × 4 (last without connector)\n```"
        props="| Figma property | Type | Values | Default | Code prop | Code value |\n|---|---|---|---|---|---|\n| `Form` | VARIANT | `Compact` · `Vertical` | `Compact` | component | |\n| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |\n| `.Step` › `Label` · `Description` · `Number` | TEXT | | | `steps[]` | |\n| `.Step` › `Show description` · `Connector` | BOOLEAN | | `true` | | |"
        variants="- `Stepper`: Form × Language = **4**; `.Step`: State × Direction = **8**"
        notes="- 01: compact under the top app bar on a phone frame\n- 03: compact · vertical review · error step\n- 07: iPhone and Android (same design)"
        cc='`5-mobile-components/lib/src/components/stepper/bw_stepper.figma.dart`'
    else:
        struct="```\n❖ Stepper                        ← set: Orientation = Horizontal · Vertical × Language = EN · AR\n  └─ ❖ .Step                      ← private set: Orientation × State = Upcoming · Current · Completed · Error × Direction = LTR · RTL\n                                     (TEXT Label · Description · Number · BOOLEAN Show description · Connector)\n```"
        tree="```\nStepper (Horizontal)       ↔ width 960 sample · ◇ .Step × 4 (fill) — each step: indicator + text + connector (fill)\nStepper (Vertical)         ↕ ◇ .Step × 4 — each step: [indicator ↕ connector (fill)] [label · description]\n.Step indicator            size/icon/xl circle · radius/full · number label/md or check / priority_high size/icon/sm\n```"
        props="| Figma property | Type | Values | Default | Code prop | Code value |\n|---|---|---|---|---|---|\n| `Orientation` | VARIANT | `Horizontal` · `Vertical` | `Horizontal` | `orientation` | |\n| `Language` | VARIANT | `EN` · `AR` | `EN` | — | locale |\n| `.Step` › `Label` · `Description` · `Number` | TEXT | | | `label` · `description` · index | |\n| `.Step` › `Show description` · `Connector` | BOOLEAN | | `true` · `true` | `description` · not last | |\n| `.Step` › `State` | VARIANT | Upcoming · Current · Completed · Error | | `activeStep` · `error` | |"
        variants="- `Stepper`: Orientation × Language = **4**; `.Step`: Orientation × State × Direction = **16**"
        notes=("- 01: horizontal stepper above a device setup form in a Desktop frame\n- 03: horizontal · vertical · error step · with descriptions\n- 07: Desktop and Web narrow (vertical)" if p=='web' else "- 01: horizontal stepper above a setup form on a Tablet frame\n- 03: horizontal · vertical · error step\n- 07: landscape (horizontal) and portrait (vertical)")
        cc=('`3-web-components/src/components/stepper/Stepper.figma.tsx`' if p=='web' else '`4-tablet-components/lib/src/components/stepper/bw_stepper.figma.dart`')
    return fixD(head+d_rest(p, ST, struct, tree, props, variants, notes, cc).replace("(Button, Icon Button, Divider)","(Icon, Progress)"),
        "Steps in reverse order (horizontal); `.Step` `Direction=RTL` puts the indicator on the right of the text; check, \"!\" and numbers do not mirror.")

for p in ['web','tablet','mobile']:
    t=tail(p,ST).replace('Initial (Wave 8 brief, decisions O-01 … O-06)','Initial (navigation brief, NV-01 … NV-13)')
    write(p,'stepper', header(p,ST)+A+A8[p]+A_tail+B(p)+C(p)+D(p)+t)
print('ok')
