# Task: Button family rebind, Web

> **Executor:** Codex. **Author:** Claude (Planner), approved by Hassan on 2026-11-03.
> This brief **is** the Planner decision for this task (AGENTS.md §6). Change only what it lists. Every value is final.
> Read first: `AGENTS.md`, `_audits/figma-button-family-web-2026-11-02.md`, and Part B of `button.md`, `icon-button.md` and `split-button.md`.

## 0. Goal

Bring Icon button and Split button in **Biowave DS: Web Components** (`7nDhsPNntzIWlrjmuSmZ9l`) onto component tokens only. Add the general Menu collections. Close the two Button stroke gaps. Rename properties and values on all three so Figma matches code.

**Figma work stays in Web.** Tablet and Mobile Figma files follow in a separate task after review. The Icon button code rename in section 2.1 covers all three platforms.

## 1. Decisions

| # | Decision |
|---|---|
| 1 | **Figma names equal code on all three components.** Property names follow the D4 tables, and values use the code spelling. See section 5.0. Icon button also loses `Width` and `Shape`, and its sizes reduce to `sm · md · lg`. |
| 2 | **Split button** uses the same properties and styles as the existing Figma Button set. The only addition is `Show Menu Buttons`. |
| 3 | **Menu** gets general collections, `Menu / Container` and `Menu / Item`, because Menu will be a core component. |
| 4 | Button colours come from `Button / *`. New collections hold only what is unique to a component. |
| 5 | **Button group** is out of scope. Build nothing. |
| 6 | **Button is the base for the family.** `Variant` is `filled · outlined · text` on Button and Split button, and `filled · outlined · tonal · transparent` on Icon button. `Color` and `State` are the same on all three. **`Button / Tonal`** and **`Button / Icon`** are used by Icon button only in Figma. |
| 7 | **Icon button code uses `transparent`, not `text`.** The value is renamed on Web, Tablet and Mobile so Figma and code use one name. Button keeps `text`. |

## 2. Repo changes (do these first)

1. Create the two token files from section 6, exactly as written.
   Also add this to `button.focus-ring.default` and `button.focus-ring.inverse` in `3-web-components/components/button/button.tokens.json`:

   ```json
   "width": { "$value": "{border.width.focus}" }
   ```

   `Button / Focus › width` already exists in the Web Figma file, so this records it in the repo. Tablet and Mobile inherit it through `$extends`. Do not add `focus-ring-radius`. It exists in Figma only, and its value is a separate decision.
2. Update Part D of `3-web-components/components/icon-button/icon-button.md`:
   - `Mode` becomes `**Rebind** the existing sets on page ↳ Icon Button`.
   - D2 to D5 describe the sets as they will be after section 3.
3. Update Part D of `3-web-components/components/split-button/split-button.md`:
   - `Mode` becomes `**Rebind** the existing sets on page ↳ Split Button`.
   - D2 to D5 describe the sets as they will be after section 4. Remove the old legacy mapping and the instruction to compose from Button and Icon Button instances.
4. Update the D4 tables in `button.md`, `icon-button.md` and `split-button.md` to the final names and values in sections 3, 4 and 5.0. Keep each code prop column correct, and note values with no code equivalent.
5. In the Icon button and Split button files, set the header row `Tokens` to the new `.tokens.json` file.
6. In Part B of `split-button.md`, add `spacing-xs` as the padding of `menu`, and state that `menu` tokens come from the general Menu collections.
7. Add a `Changes` entry to Part F of all three files, and a `CHANGELOG.md` entry.
8. Regenerate and check:

```bash
npm run component-tokens
npm run contract -- web button
npm run contract -- web icon-button
npm run contract -- web split-button
npm run docs:check
```

Do not change semantic tokens or primitives. Do not change code except section 2.1.

### 2.1 Icon button code rename

Rename the Icon button variant value `text` to `transparent`. Button keeps `text`.

**Web, `3-web-components/src/components/`:**

| File | Change |
|---|---|
| `icon-button/IconButton.tsx` | `IconButtonVariant` becomes `Exclude<ButtonVariant, 'text'> \| 'transparent'`. Default becomes `transparent`. Resolve `transparent` through the existing `text` entry of the Button token table |
| `icon-button/iconButton.tokens.ts` | `ToggleVariant` and the `text` key become `outlined \| transparent` and `transparent` |
| `text-field/FieldAction.tsx`, `text-field/FieldLabel.tsx`, `button-group/ButtonGroup.tsx` | Icon button callers use `variant="transparent"`. Leave `Button` callers alone |
| `icon-button/IconButton.test.tsx` | Update the values and add a test that `transparent` renders the same tokens the old `text` value did |

**Flutter, `4-tablet-components` and `5-mobile-components`:** add `BwIconButtonVariant` with `filled · tonal · outlined · transparent` in `bw_icon_button.dart`, make `transparent` the default, and update `bw_split_button.dart` and every other caller. Do not rename `BwButtonVariant.text`.

**Docs:**

- In `icon-button.md` on all three platforms, change `text` to `transparent` in Part A and in B1. Part A must stay identical.
- In Web Part B of `icon-button.md`, add this table under B3:

| Transparent, `Color` | `icon` |
|---|---|
| `brand · secondary · success · error · warning · info` | `color-icon-role-brand` · `color-icon-role-secondary` · `color-icon-role-success` · `color-icon-role-error` · `color-icon-role-warning` · `color-icon-role-info` |
| `neutral` | `color-icon-default` |
| `inverse` | `color-icon-on-brand` |
| Container, every colour | `color-background-transparent-default` |

Run `npm run typecheck` and `npm run test:web`. If the Flutter SDK is available, run `flutter analyze` and `flutter test` in both Flutter packages. If it is not, say so in the report.

## 3. Icon button in Figma

Page `↳ Icon Button`. Keep the three sets and their nesting: `Icon Button` `116:30310`, `Icon Button / Appearance` `116:28709`, `Icon Button / Glyph` `116:28678`.

### 3.1 Structure

| Set | Property | Before | After |
|---|---|---|---|
| `Icon Button`, `Glyph` | `Size` | `XS · S · M · L · XL` | `sm · md · lg` |
| `Icon Button` | `Type` | `Default · Toggle` | `Toggle`: `false · true` |
| `Icon Button`, `Glyph` | `Selected` | `N/A · False · True` | `false · true` (`N/A → false`) |
| `Icon Button` | `Width` | `Narrow · Default · Wide` | Removed. Keep the `Default` variants |
| `Icon Button` | `Shape` | `Round · Rounded square` | Removed. Keep the `Rounded square` variants |
| `Appearance` | `Style` | `Standard · Filled · Tonal · Outlined` | `Variant`: `filled · outlined · tonal · transparent` (`Standard → transparent`) |
| `Appearance` | `Color` | `Default · Brand · Secondary · Neutral · Success · Error · Warning · Info` | `brand · secondary · success · error · warning · info · neutral · inverse` |
| `Appearance` | `State` | `Default · Hovered · Focused · Pressed · Disabled` | `default · hovered · focused · pressed · disabled` |

- `Size` mapping: `XS → sm`, `S → md`, `M → lg`. `L` and `XL` are deleted, and their instances move to `lg`.
- `Color=Default` merges into `neutral`. Delete the `Default` variants and move their instances to `neutral`.
- `transparent` has no fill and no border at rest, so `Standard` instances keep their look.
- `Variant=tonal` exists only with `brand · secondary · error`, because `Button / Tonal` has only these modes. Delete tonal variants in other colours and move their instances to `Variant=outlined` in the same colour.
- The default variant is `Variant=transparent`, `Color=neutral`, `State=default`.
- Add `Color=inverse` by cloning `neutral` variants.

Result: `Icon Button` has 9 variants, `Glyph` has 6 and `Appearance` has 135, which is 27 `Variant × Color` pairs × 5 states. Width equals height, as in Part B2.

### 3.2 Bindings

| Part | Collection | Mode or variable |
|---|---|---|
| Size, icon size, radius, border width | `Icon button / Size` | Same name as `Size` |
| `Variant=filled` | `Button / Filled` | Same name as `Color` |
| `Variant=tonal` | `Button / Tonal` | Same name as `Color` |
| `Variant=transparent` | `Button / Icon` | Same name as `Color` |
| `Variant=outlined` | `Button / Outlined` | Same name as `Color` |
| `Selected=true` | `Icon button / Selected` | Same name as `Color` |
| Focus ring | `Button / Focus` | `default` or `inverse` |
| Tooltip layers | `Icon button / Tooltip` | `default` |
| `Show Menu Buttons` layers | `Menu / *` | `default` |

## 4. Split button in Figma

Page `↳ Split Button`. Keep `Split Button/EN` `116:23634` and `Split Button/AR` `116:25888`, so their keys stay the same.

### 4.1 Properties

Read the properties from `.Button _en` `116:5183` and match them exactly, after the renames in section 5.0.

| Property | Type | Values | Source |
|---|---|---|---|
| `Label` | TEXT | | Rename `Text` |
| `Leading icon` | BOOLEAN | | Rename `Leading Icon` |
| `Show Menu Buttons` | BOOLEAN | | Keep, unchanged. Figma only |
| `Variant` | VARIANT | `filled · outlined · text` | Same as Button after section 5.0 |
| `Color` | VARIANT | `brand · secondary · success · error · warning · info · neutral · inverse` | Same as Button after section 5.0 |
| `State` | VARIANT | `default · hovered · focused · pressed · disabled` | Same as Button after section 5.0 |
| `Size` | VARIANT | `sm · md · lg` | Same as Button after section 5.0 |

Do not add `Trailing icon`. The menu trigger occupies that position.

Result: 360 variants in each language set, the same count as Button. Clone existing variants to fill the matrix.

### 4.2 Mapping of old values

| Old | New |
|---|---|
| `Type=Brand` | `Variant=filled`, `Color=brand` |
| `Type=Secondary · Success · Error · Warning · Info · Neutral` | `Variant=filled`, same `Color` in lower case |
| `Type=Default` | `Variant=filled`, `Color=neutral` |
| `State=Default` | `State=default` |
| `State=Hover · Pressed · Focused · Disabled` | `State=hovered · pressed · focused · disabled` |
| `State=Ghost` | `Variant=outlined`, `State=default` |
| `Size=SM · M · XL` | `Size=sm · md · lg` |

### 4.3 Bindings

Copy the binding pattern from the matching Button variant, then read it back. For both `Action` and `Dropdown`:

| `Variant` | Collection |
|---|---|
| `filled` | `Button / Filled` |
| `outlined` | `Button / Outlined` |
| `text` | `Button / Text` |

Use the mode with the same name as `Color`.

| Part | Collection | Variable |
|---|---|---|
| Heights, padding, gap, icon | `Button / Size` | Same name as `Size` |
| Outer corners | `Split button / Part` | `outer-radius` |
| Inner corners | `Split button / Part` | `inner-radius` |
| Border on the inner sides | `Split button / Part` | `inner-border-width` |
| Gap between parts | `Split button / Part` | `gap` |
| `Divider` fill, width | `Split button / Part` | `divider/color`, `divider/width` |
| Focus ring | `Button / Focus` | `default` or `inverse` |
| Menu | `Menu / *` | `default` |

- Replace the pinned `Button size` mode with `Button / Size` modes.
- Use one divider colour for every variant.
- Bind every icon fill. Replace raw white fills.
- Give every text layer the same text style as the matching Button variant, or `body/md` for menu rows.

## 5. Menu and Button

### 5.0 Button names (do this first in Figma)

Rename these in place on `.Button _en` and `.Button _ar`. Keep the component keys and existing instances.

| Property before | Property after | Values before | Values after |
|---|---|---|---|
| `Type` | `Variant` | `Primary · Secondary · Tertiary` | `filled · outlined · text` |
| `Color` | `Color` | `Primary · Secondary · Success · Error · Warning · Info · Neutral · White` | `brand · secondary · success · error · warning · info · neutral · inverse` |
| `State` | `State` | `Idle · Hovered · Focused · Pressed · Disabled` | `default · hovered · focused · pressed · disabled` |
| `Size` | `Size` | `Small · Medium · XLarge` | `sm · md · lg` |
| `Leading Icon` | `Leading icon` | | |
| `Trailing Icon` | `Trailing icon` | | |

Read one variant per `Type` before renaming. If `Primary` is not on `Button / Filled`, `Secondary` on `Button / Outlined` and `Tertiary` on `Button / Text`, stop and report.

`success`, `warning` and `info` are not in the code `color` prop. Keep them in Figma, and list them in the report.

### 5.1 Menu

Bind the layer `Add Devices Menu Buttons` and the main component of `Row Icon`:

| Part | Variable |
|---|---|
| Menu fill, radius, padding, offset | `Menu / Container` · `background`, `radius`, `padding`, `offset` |
| Row height, padding, gap, icon | `Menu / Item` · `height`, `padding-inline`, `gap`, `icon-size` |
| Row hover and press | `Menu / Item` · `state-layer/hovered`, `state-layer/pressed` |
| Row text | `Menu / Item` · `label/default`, `label/disabled` |
| Row icon | `Menu / Item` · `icon/default` |
| Row focus ring | `Menu / Item` · `focus-ring` |

Keep effect style `Elevation/3` on the menu. Do not build a Menu component.

### 5.2 Button

On `.Button _en` and `.Button _ar`, bind:

- root `strokeWeight` to `Button / Size › border-width`
- the `Focus ring` stroke weight to `Button / Focus › width`

## 6. Token files

### `3-web-components/components/icon-button/icon-button.tokens.json`

```json
{
  "$schema": "component-tokens/v1",
  "$description": "Icon button component tokens (D-13). Transparent colours, selected colours, sizes and the temporary tooltip. Filled, outlined, tonal and focus reuse Button / * collections. Every value aliases a semantic token.",
  "icon-button": {
    "size": {
      "$extensions": {
        "figma": {
          "collection": "Icon button / Size",
          "modes": true
        }
      },
      "sm": {
        "size": {
          "$value": "{size.control.height.sm}"
        },
        "icon": {
          "$value": "{size.icon.sm}"
        },
        "radius": {
          "$value": "{radius.md}"
        },
        "border-width": {
          "$value": "{border.width.default}"
        }
      },
      "md": {
        "size": {
          "$value": "{size.control.height.md}"
        },
        "icon": {
          "$value": "{size.icon.md}"
        },
        "radius": {
          "$value": "{radius.md}"
        },
        "border-width": {
          "$value": "{border.width.default}"
        }
      },
      "lg": {
        "size": {
          "$value": "{size.control.height.lg}"
        },
        "icon": {
          "$value": "{size.icon.lg}"
        },
        "radius": {
          "$value": "{radius.md}"
        },
        "border-width": {
          "$value": "{border.width.default}"
        }
      }
    },
    "selected": {
      "$extensions": {
        "figma": {
          "collection": "Icon button / Selected",
          "modes": true
        }
      },
      "brand": {
        "container": {
          "selected": {
            "$value": "{color.background.brand.subtle}"
          },
          "disabled": {
            "$value": "{color.background.disabled}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "selected": {
            "$value": "{color.icon.role.brand}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        },
        "border": {
          "selected": {
            "$value": "{color.border.brand}"
          },
          "disabled": {
            "$value": "{color.border.disabled}"
          }
        }
      },
      "secondary": {
        "container": {
          "selected": {
            "$value": "{color.background.secondary.subtle}"
          },
          "disabled": {
            "$value": "{color.background.disabled}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "selected": {
            "$value": "{color.icon.role.secondary}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        },
        "border": {
          "selected": {
            "$value": "{color.border.secondary}"
          },
          "disabled": {
            "$value": "{color.border.disabled}"
          }
        }
      },
      "error": {
        "container": {
          "selected": {
            "$value": "{color.background.error.subtle}"
          },
          "disabled": {
            "$value": "{color.background.disabled}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "selected": {
            "$value": "{color.icon.role.error}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        },
        "border": {
          "selected": {
            "$value": "{color.border.error}"
          },
          "disabled": {
            "$value": "{color.border.disabled}"
          }
        }
      },
      "neutral": {
        "container": {
          "selected": {
            "$value": "{color.background.neutral.default}"
          },
          "disabled": {
            "$value": "{color.background.disabled}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "selected": {
            "$value": "{color.icon.default}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        },
        "border": {
          "selected": {
            "$value": "{color.border.strong}"
          },
          "disabled": {
            "$value": "{color.border.disabled}"
          }
        }
      },
      "inverse": {
        "container": {
          "selected": {
            "$value": "{color.background.inverse.default}"
          },
          "disabled": {
            "$value": "{color.background.disabled}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "selected": {
            "$value": "{color.icon.role.brand}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        },
        "border": {
          "selected": {
            "$value": "{color.border.inverse}"
          },
          "disabled": {
            "$value": "{color.border.disabled}"
          }
        }
      }
    },
    "tooltip": {
      "$extensions": {
        "figma": {
          "collection": "Icon button / Tooltip",
          "modes": true
        }
      },
      "default": {
        "background": {
          "$value": "{color.surface.inverse}"
        },
        "text": {
          "$value": "{color.text.inverse}"
        },
        "radius": {
          "$value": "{radius.sm}"
        },
        "padding-block": {
          "$value": "{spacing.xs}"
        },
        "padding-inline": {
          "$value": "{spacing.md}"
        },
        "offset": {
          "$value": "{spacing.xs}"
        }
      }
    },
    "transparent": {
      "$extensions": {
        "figma": {
          "collection": "Button / Icon",
          "modes": true
        }
      },
      "brand": {
        "container": {
          "default": {
            "$value": "{color.background.transparent.default}"
          },
          "disabled": {
            "$value": "{color.background.transparent.default}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "default": {
            "$value": "{color.icon.role.brand}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        }
      },
      "secondary": {
        "container": {
          "default": {
            "$value": "{color.background.transparent.default}"
          },
          "disabled": {
            "$value": "{color.background.transparent.default}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "default": {
            "$value": "{color.icon.role.secondary}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        }
      },
      "success": {
        "container": {
          "default": {
            "$value": "{color.background.transparent.default}"
          },
          "disabled": {
            "$value": "{color.background.transparent.default}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "default": {
            "$value": "{color.icon.role.success}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        }
      },
      "error": {
        "container": {
          "default": {
            "$value": "{color.background.transparent.default}"
          },
          "disabled": {
            "$value": "{color.background.transparent.default}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "default": {
            "$value": "{color.icon.role.error}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        }
      },
      "warning": {
        "container": {
          "default": {
            "$value": "{color.background.transparent.default}"
          },
          "disabled": {
            "$value": "{color.background.transparent.default}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "default": {
            "$value": "{color.icon.role.warning}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        }
      },
      "info": {
        "container": {
          "default": {
            "$value": "{color.background.transparent.default}"
          },
          "disabled": {
            "$value": "{color.background.transparent.default}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "default": {
            "$value": "{color.icon.role.info}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        }
      },
      "neutral": {
        "container": {
          "default": {
            "$value": "{color.background.transparent.default}"
          },
          "disabled": {
            "$value": "{color.background.transparent.default}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "default": {
            "$value": "{color.icon.default}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        }
      },
      "inverse": {
        "container": {
          "default": {
            "$value": "{color.background.transparent.default}"
          },
          "disabled": {
            "$value": "{color.background.transparent.default}"
          }
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "icon": {
          "default": {
            "$value": "{color.icon.on.brand}"
          },
          "disabled": {
            "$value": "{color.icon.disabled}"
          }
        }
      }
    }
  }
}
```

### `3-web-components/components/split-button/split-button.tokens.json`

Menu tokens live here until the Menu component exists. The collection names stay the same when they move.

```json
{
  "$schema": "component-tokens/v1",
  "$description": "Split button component tokens (D-13) plus the general Menu collections. Menu tokens stay here until the Menu component owns them; the collection names do not change when they move. Every value aliases a semantic token.",
  "split-button": {
    "part": {
      "$extensions": {
        "figma": {
          "collection": "Split button / Part",
          "modes": true
        }
      },
      "default": {
        "gap": {
          "$value": "{spacing.none}"
        },
        "inner-radius": {
          "$value": "{radius.none}"
        },
        "outer-radius": {
          "$value": "{radius.md}"
        },
        "inner-border-width": {
          "$value": "{border.width.none}"
        },
        "divider": {
          "width": {
            "$value": "{border.width.default}"
          },
          "color": {
            "$value": "{color.border.default}"
          }
        }
      }
    }
  },
  "menu": {
    "container": {
      "$extensions": {
        "figma": {
          "collection": "Menu / Container",
          "modes": true
        }
      },
      "default": {
        "background": {
          "$value": "{color.surface.raised}"
        },
        "radius": {
          "$value": "{radius.lg}"
        },
        "padding": {
          "$value": "{spacing.xs}"
        },
        "offset": {
          "$value": "{spacing.xs}"
        }
      }
    },
    "item": {
      "$extensions": {
        "figma": {
          "collection": "Menu / Item",
          "modes": true
        }
      },
      "default": {
        "height": {
          "$value": "{size.control.height.md}"
        },
        "padding-inline": {
          "$value": "{spacing.lg}"
        },
        "gap": {
          "$value": "{spacing.sm}"
        },
        "icon-size": {
          "$value": "{size.icon.md}"
        },
        "state-layer": {
          "hovered": {
            "$value": "{color.background.transparent.hovered}"
          },
          "pressed": {
            "$value": "{color.background.transparent.pressed}"
          }
        },
        "label": {
          "default": {
            "$value": "{color.text.default}"
          },
          "disabled": {
            "$value": "{color.text.disabled}"
          }
        },
        "icon": {
          "default": {
            "$value": "{color.icon.subtle}"
          }
        },
        "focus-ring": {
          "$value": "{color.border.focus}"
        }
      }
    }
  }
}
```

## 7. Safety rules

1. **List instances before deleting anything.** Search the whole file for instances of the variants you will remove, and remap them with sections 3.1 and 4.2. Never leave a broken instance. Report the count.
2. **Keep component keys** on the existing sets. Do not delete and recreate a set.
3. Do not pin any variant to a Light or Dark mode.
4. **No semantic, primitive or old collection bindings** in these sets. Text styles, effect styles and icons from the published library are allowed.
5. Sync `Button / Focus › width` in the Tablet and Mobile files too if `npm run sync` requires it. Make no other change in those files.
6. **Do not run the generated apply script as it is.** It moves variables missing from `tokens.json` to `_deprecated`, which would hit `Button / Size › focus-ring-radius` while layers still use it. Apply only the new collections in section 6 and `Button / Focus › width`. Leave `success · warning · info` modes and `focus-ring-radius` untouched. If `sync:verify-tokens` then fails on these known differences, report it and continue.
7. **Stop and report** if a value has no token, or a step would change anything outside this brief. Do not invent a token.

## 8. Done when

- [ ] `npm run component-tokens`, `npm run docs:check`, `npm run sync`, `npm run typecheck` and `npm run test:web` pass
- [ ] No Icon button code or docs use the variant value `text`
- [ ] The collections from section 6 exist in the Web file with correct aliases: run the sync verify step for component tokens
- [ ] A read-back script reports **0** bindings to `Color`, `Numbers`, `Button size`, `_Primitives`, `material/colors`, `1. Themes`, `2. Radius` and other library variables across the three Icon Button sets and both Split Button sets
- [ ] Every text layer in those sets has a text style, and no solid fill or stroke is unbound
- [ ] `Icon Button` has 9 variants, `Appearance` has 135, and each Split Button set has 360
- [ ] No Button or Split Button layer binds to `Button / Tonal`
- [ ] Property names and values on all Button, Icon Button and Split Button sets match sections 3.1, 4.1 and 5.0
- [ ] Split Button property names and values equal Button, plus `Show Menu Buttons`
- [ ] EN and AR sets match, and screenshots of Light and Dark look correct
- [ ] Library is published, then `npm run sync:library` is run and contracts are regenerated
- [ ] D11 Execution log is filled in on both components
- [ ] `CHANGELOG.md` is updated

Do not mark the Figma status `Approved`. That happens in review.

## 9. Report back

- Files changed and check results
- Instances remapped, by old value
- Icon button instances moved from tonal to `outlined`, per screen
- Flutter checks: run or not run
- Figma values with no code equivalent
- Button collections with modes or variables in Figma that are missing from `button.tokens.json`, including `success · warning · info` modes and `focus-ring-radius`. Report them, and do not change them
- Anything left unbound, and why
