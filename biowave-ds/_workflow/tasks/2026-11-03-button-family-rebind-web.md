# Task: Button family rebind, Web

> **Executor:** Codex. **Author:** Claude (Planner), approved by Hassan on 2026-11-03.
> This brief **is** the Planner decision for this task (AGENTS.md §6). Change only what it lists. Every value is final.
> Read first: `AGENTS.md`, `_audits/figma-button-family-web-2026-11-02.md`, and Part B of `button.md`, `icon-button.md` and `split-button.md`.

## 0. Goal

Bring Icon button and Split button in **Biowave DS: Web Components** (`7nDhsPNntzIWlrjmuSmZ9l`) onto component tokens only. Add the general Menu collections. Close the two Button stroke gaps. Rename properties and values on all three so Figma matches code.

**Stay in Web.** Tablet and Mobile follow in a separate task after this one is reviewed.

## 1. Decisions

| # | Decision |
|---|---|
| 1 | **Figma names equal code on all three components.** Property names follow the D4 tables, and values use the code spelling. See section 5.0. Icon button also loses `Width` and `Shape`, and its sizes reduce to `sm · md · lg`. |
| 2 | **Split button** uses the same properties and styles as the existing Figma Button set. The only addition is `Show Menu Buttons`. |
| 3 | **Menu** gets general collections, `Menu / Container` and `Menu / Item`, because Menu will be a core component. |
| 4 | Button colours come from `Button / *`. New collections hold only what is unique to a component. |
| 5 | **Button group** is out of scope. Build nothing. |
| 6 | **Button is the base for the family.** `Variant` is `filled · outlined · text` on Button and Split button. Icon button has the same three plus `tonal`, as in code. **`Button / Tonal`** is used by Icon button only in Figma. |

## 2. Repo changes (do these first)

1. Create the two token files from section 6, exactly as written.
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

Do not change code, semantic tokens, primitives, Tablet or Mobile files.

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
| `Appearance` | `Style` | `Standard · Filled · Tonal · Outlined` | `Variant`: `filled · outlined · text · tonal` (`Standard → text`) |
| `Appearance` | `Color` | `Default · Brand · Secondary · Neutral · Success · Error · Warning · Info` | `brand · secondary · success · error · warning · info · neutral · inverse` |
| `Appearance` | `State` | `Default · Hovered · Focused · Pressed · Disabled` | `default · hovered · focused · pressed · disabled` |

- `Size` mapping: `XS → sm`, `S → md`, `M → lg`. `L` and `XL` are deleted, and their instances move to `lg`.
- `Color=Default` merges into `neutral`. Delete the `Default` variants and move their instances to `neutral`.
- `Variant=tonal` exists only with `brand · secondary · error`, as in code. Delete tonal variants in other colours and move their instances to `Variant=outlined` in the same colour.
- Add `Color=inverse` by cloning `neutral` variants.

Result: `Icon Button` has 9 variants, `Glyph` has 6 and `Appearance` has 135, which is 27 `Variant × Color` pairs × 5 states. Width equals height, as in Part B2.

### 3.2 Bindings

| Part | Collection | Mode or variable |
|---|---|---|
| Size, icon size, radius, border width | `Icon button / Size` | Same name as `Size` |
| `Variant=filled` | `Button / Filled` | Same name as `Color` |
| `Variant=tonal` | `Button / Tonal` | Same name as `Color` |
| `Variant=outlined` | `Button / Outlined` | Same name as `Color` |
| `Variant=text` | `Button / Text` | Same name as `Color` |
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
- the `Focus ring` stroke weight to the Foundations-derived focus width token. If no component variable exists for it, stop and report rather than binding a semantic variable

## 6. Token files

### `3-web-components/components/icon-button/icon-button.tokens.json`

```json
{
  "$schema": "component-tokens/v1",
  "$description": "Icon button component tokens (D-13). Selected colours, sizes and the temporary tooltip. Unselected colours and focus reuse Button / * collections. Every value aliases a semantic token.",
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
5. **Stop and report** if a value has no token, or a step would change anything outside this brief. Do not invent a token.

## 8. Done when

- [ ] `npm run component-tokens`, `npm run docs:check` and `npm run sync` pass
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
- Figma values with no code equivalent
- Button collections with modes in Figma that are missing from `button.tokens.json`
- Anything left unbound, and why
