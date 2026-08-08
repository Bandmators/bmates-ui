# Design rules audit — 2026-08-08

Audit of all 26 component stylesheets in `src/components/**/*.css` against
[docs/guide/design-rules.mdx](docs/guide/design-rules.mdx).

Rule IDs (`DR-x.y`) refer to that document.

## Status

| Finding | Status |
| ------- | ------ |
| A1 — control heights diverge | ✅ fixed — all 16 controls on 32/40/48 (**breaking**) |
| A2 — `Toggle` has no typography | ✅ fixed |
| A3 — menu primitives diverged | ✅ fixed — extracted to `src/styles/menu.css` |
| B1 — sub-pixel spacing | ✅ fixed — zero remaining |
| B2 — off-scale font sizes | ✅ fixed — only `.75/.875/1rem` remain |
| B3 — ad-hoc line heights | ✅ fixed — only `1.2` / `1.5` remain |
| C1 — outer margins | ✅ fixed except `Search__input` (needs visual check) |
| C2 — raw radius literals | ✅ fixed — added `--radius-xs` |
| C3 — raw durations | ✅ fixed — added `--transition-slow`, `--transition-bounce` |
| C4 — hardcoded colors | ✅ fixed |
| P3 — minor | ✅ fixed except `Switch` `xl` size |

Verified after the fixes: `tsc --noEmit` clean, `vite build` clean,
`vitest run` 49/49 passing, `stylelint` 0 problems, and
`scripts/check-control-heights.mjs` confirming all 16 controls land on the scale.

## Enforcement

The rules are now machine-checked, so these findings cannot silently return.

| Check | Command | Enforces |
| ----- | ------- | -------- |
| `stylelint-plugin-design-rules.mjs` | `pnpm lint:css` | DR-1.1, 1.3, 4.1, 5.1, 5.2, 5.3, 6.3, 8.1, 8.2, colour tokens |
| `scripts/check-control-heights.mjs` | `pnpm check:heights` | DR-2.1 across 16 controls |
| Specimen coverage guard | built into `pnpm report:visual` | every changed stylesheet has a before/after specimen |

`lint:css` runs on staged CSS via lint-staged. `prettier` is deliberately *not*
wired to CSS — the existing files do not follow its formatting, so adding it
would reformat every stylesheet wholesale and bury real diffs.

The linter paid for itself immediately: it found `DataTable/data-table.css`,
which the manual audit had missed entirely, and it flagged a `gap` rule in
`menu.css` that turned out to be a defect in **the written rule**, not the code
(see DR-1.2 — the 2px half-step now covers gaps between a component's own parts,
matching Tailwind's `gap-0.5`).

### Visual diff report

```
pnpm report:visual        # → report/index.html
pnpm report:visual --ref v1.1.4   # compare against any git ref
```

Renders 24 specimens twice — identical markup, `before.css` rebuilt from git
HEAD and `after.css` from the working tree — in paired iframes, so the two
stylesheets cannot leak into each other despite sharing class names. The build
fails if a changed stylesheet has no specimen.

Three toggles in the report:

- **4px grid overlay** — paints a 4px rule inside each frame; geometry landing
  between lines is off-grid.
- **Difference overlay** — stacks the panes with a difference blend. Anything
  pixel-identical turns white; every remaining mark is a real change.
- **Dark component theme** — verifies the tokenised colours (relevant to C4,
  where `Switch`'s knob was hardcoded `#fff`).

### Intentional visual changes

**Control heights (A1) — the breaking change.** Every interactive control now
resolves to 32 / 40 / 48px:

| Control | Before | After |
| ------- | ------ | ----- |
| `Button` sm / md / lg | 34 / 38 / 46 | 32 / 40 / 48 |
| `Input`, `FileInput` label | 38 | 40 |
| `Textarea` (min) | 36 | 40 |
| `Toggle` sm / md / lg | inherited (indeterminate) | 32 / 40 / 48 |
| `Tabs` track sm / md / lg | ~32 / 38 / 46 | 32 / 40 / 48 |
| `Pagination` link | 40 | 40 (now from the token) |
| `Search` input | ~34.1 | 32 |
| `DataTable` filter | 32 | 32 (now from the token) |

`Toggle` also gained horizontal padding — it was square-ish (`padding: .5rem`)
and now follows the DR-3.1 2:1 ratio like every other control.

The remaining changes below snap values to the scale without moving heights:

| Component | Change |
| --------- | ------ |
| Menu rows (Dropdown / Select / Search / ContextMenu) | padding-x `8.8px → 12px`, gap `9.6px → 8px`, font `13.6px → 14px`, row gap `1.6px → 2px` |
| Menu labels / shortcuts / descriptions | font `11.5–11.8px → 12px` |
| `Dropdown` items | now `font-weight: 500`, matching its three siblings |
| `Tooltip` | padding `6.4/9.6px → 6/10px`, font `12.8px → 12px` |
| `Badge` | font `75%` → fixed `12px`; gap `4.8px → 4px` |
| `Alert` | padding-x `14px → 16px`, gap `10px → 8px`, icon `18px → 16px` |
| `Table` | padding-x widened to hit the 2:1 density ratio (`10/12 → 10/16` at `md`) |
| `Accordion` | trailing `8px` below the last item is gone (margin → `gap`) |
| `Switch` | knob geometry re-gridded; `md` knob `19.2px → 20px`, insets now `2/4px` |
| `Toggle` | now declares `14px / 1.2`; previously inherited from the host page |
| `Toggle` disabled | opacity `.7 → .5`, matching `Button` |
| `Accordion` head disabled | opacity `.6 → .5` |
| `Pagination` | `line-height` `40px → 1.2` (flex centering already handled it) |
| `Tabs` `sm` | font `13px → 12px` |

`Toggle` is the one to eyeball first — it had no font sizing at all, so its
rendered size changes by however much the host page differed from 14px.

### Remaining work

1. **`Search__input` margin** (`search.css:5`). Removing the `.25rem` margin in
   favour of `Portal` padding needs a visual check — the input would sit flush
   against the result list, since `.bm-portal` is a gapless grid.
2. **`Switch` `xl` size.** Still the only `xl` in the library. Add `xl`
   across the control family or drop it.
3. **Screenshot regression.** The report still needs a human. Driving the
   specimens through Playwright would close the loop, but it catches symptoms
   where the linter catches causes — worth doing only if drift actually recurs.
4. **`package.json` `build` script** is `tsc && vite build --watch`, so it never
   exits. This is intentional — `buildOnce` is the one-shot equivalent and is
   what CI should call. Noted only because `npm run build` is the conventional
   name and will hang anyone who reaches for it first.

---

## P0 — Composition is broken

### A1. No two controls share a height (DR-2.1, DR-9.1)

The core promise of the system — a `Button`, `Input`, and `Select` in one row
forming an unbroken band — does not hold today. Computed heights at the
nominal `md` size:

| Component            | Declaration                                | Computed height |
| -------------------- | ------------------------------------------ | --------------- |
| `Button` `md`        | `padding: .5rem 1rem` + `line-height: 1.25rem` + 1px border | **38px** |
| `Input`              | `padding: .5rem .75rem` + `line-height: 1.25rem` + 1px border | **38px** |
| `FileInput` label    | `padding: .5rem 1rem` + `line-height: 1.25rem` + 1px border | **38px** |
| `Textarea`           | `min-height: 2.25rem`                      | **36px** |
| `Tabs` trigger `md`  | `min-height: 2rem`                         | **32px** |
| `Pagination` link    | `min-height: 2.5rem`                       | **40px** |
| `Search` input       | `padding: .45rem .55rem` + `line-height: 1.3` on `.85rem` | **~34.1px** |
| `Toggle` `md`        | `padding: .5rem`, **no line-height**       | **inherits — indeterminate** |

Eight components, five distinct heights, one of which is fractional and one of
which depends on the consumer's ambient `line-height`.

- `src/components/Button/button.css:71`
- `src/components/Input/input.css:2`
- `src/components/Textarea/textarea.css:10`
- `src/components/Tabs/tabs.css:3`
- `src/components/Pagination/pagination.css:4`
- `src/components/Search/search.css:26`
- `src/components/Toggle/toggle.css:2,10`

**Fix:** introduce a shared `--bm-control-h` (`sm 2rem / md 2.5rem / lg 3rem`),
set `min-height` from it on every control, and center content with flexbox.

> ⚠️ **This is a visual breaking change.** Adopting the 32/40/48 scale moves
> `Button md` 38→40, `Tabs md` 32→40, `Textarea` 36→40. Consumers with
> pixel-tuned layouts will see shifts. Recommend shipping as a minor with a
> migration note, or behind a `compact` density flag.

### A2. `Toggle` has no typography at all (DR-5.4)

`.bm-toggle` sets `font-weight` but never `font-size` or `line-height`, so its
size — and therefore its alignment against a neighbouring `Button` — is decided
by whatever the host page inherits. This is the single most fragile rule break
in the library.

`src/components/Toggle/toggle.css:2`

### A3. Menu item primitives have diverged (DR-3.3)

`Dropdown`, `Select`, `Search`, and `ContextMenu` items are the same
primitive, and are *nearly* identical — which is worse than clearly different,
because the drift is invisible in isolation and visible when two menus open
near each other.

All four share `padding: .5rem .55rem; font-size: .85rem; line-height: 1.3`
(all three off-scale), but:

- `Select`, `Search`, `ContextMenu` items add `font-weight: 500`;
  `Dropdown` does not — `src/components/Dropdown/dropdown.css:6`
- `Select` has a `--selected` state; `Search` and `Dropdown` do not
- `Select` hover is gated on `[aria-selected='false']`, the others are not

**Fix:** extract one `.bm-menu-item` class and have all four consume it.

---

## P1 — Off-grid and off-scale values

### B1. Fractional-pixel spacing (DR-1.3)

These fail the whole-pixel test (`value ÷ 0.0625` is not an integer) and render
with position-dependent rounding.

Note: `0.375rem` (6px), `0.625rem` (10px), and `0.875rem` (14px) appearing
elsewhere in the codebase are **legal** under DR-1.2 and are not listed here.

| Value      | px    | Locations |
| ---------- | ----- | --------- |
| `.55rem`   | 8.8   | menu item padding-x — dropdown:6,12 · select:6,16 · search:6,14,26 · context-menu:4 |
| `.6rem`    | 9.6   | menu item gap (same 4 files) · tooltip padding-x |
| `.4rem`    | 6.4   | `Button` icon gap (button.css:6) · menu label padding-y · tooltip padding-y |
| `.3rem`    | 4.8   | divider margin (3 files) · `Search` input margin · `Portal` padding |
| `.45rem`   | 7.2   | `Search` input padding-y (search.css:26) |
| `.1rem`    | 1.6   | menu list gap (3 files) · `Switch` knob offset |
| `.8rem`    | 12.8  | `Switch` sm knob size |
| `1.6rem` / `2.4rem` | 25.6 / 38.4 | `Switch` lg/xl knob size |

`Switch` is the densest offender — its entire knob geometry
(`switch.css:28–50`) is built on `.1/.15/.2/.3rem` offsets.

### B2. Off-scale font sizes (DR-5.1)

| Value    | px    | Location |
| -------- | ----- | -------- |
| `.85rem` | 13.6  | menu items ×4, `Search` input |
| `.74rem` | 11.84 | menu descriptions ×3 |
| `.72rem` | 11.52 | menu shortcuts ×3 |
| `.8rem`  | 12.8  | `Tooltip` (tooltip.css:4) |
| `.8125rem` | 13  | `Tabs` sm (tabs.css:10) |
| `75%`    | relative | `Badge` (badge.css:2) — resolves differently per context |

`Badge`'s `font-size: 75%` is the worst of these: a badge inside a heading and a
badge inside body text render at different sizes.

### B3. Ad-hoc line heights (DR-5.2)

Scale allows `1.2 / 1.5 / 1.7`. Currently in use: `1`, `1.25`, `1.25rem`,
`1.3`, `1.35`, `1.4`, `1.5`, `1rem`, `2.5rem` — nine distinct values.

`line-height: 1` (DR-5.3, clips descenders):
`Checkbox:2` · `Switch:2` · `Label:2` · `Dialog__title:10`

`Dialog__title` is the visible one — a dialog heading with a `g` or `y` will
clip.

---

## P2 — Encapsulation and tokens

### C1. Components carrying their own outer margin (DR-4.1)

| Location | Issue |
| -------- | ----- |
| `Accordion/accordion.css:4` | `.bm-accordion__item { margin-bottom: .5rem }` — consumer cannot control item spacing. Parent `.bm-accordion` is already `flex column`; move to `gap: .5rem`. |
| `Checkbox/checkbox.css:26` | `.bm-checkbox__label { margin-left: 1rem }` — should be `gap` on the root; 16px is also unusually wide for a checkbox label (8px is conventional). |
| `Switch/switch.css:14` | Same as above. |
| `Search/search.css:26` | `.bm-search__input { margin: .3rem }` — margin used to inset the input inside the popover; that inset belongs to the popover's padding. |
| `Card/card.css:6,8` | `__head`/`__footer` margins — acceptable under DR-4.2 as internal structure, but `gap` on `.bm-card` would be cleaner. |

Negative margins on dividers (`margin: .3rem -.3rem`, 3 files) are a legitimate
bleed-to-edge technique, but the magnitude must match the parent's padding —
currently it matches `Portal`'s `.3rem` padding by coincidence, not by
derivation. Use a shared custom property.

### C2. Raw radius literals (DR-6.3)

- `Avatar/avatar.css:2` — `border-radius: 50%` → `var(--radius-full)`
- `Checkbox/checkbox.css:14` — `border-radius: 4px` → `var(--radius-sm)` (or a
  new `--radius-xs`; 4px is not currently a token)
- `Switch/switch.css:18,20` — `border-radius: 50rem` → `var(--radius-full)`

### C3. Raw transition durations (DR-8.1)

- `Checkbox/checkbox.css:14` — `transition: all 150ms` — **also violates
  DR-8.2**; `all` on a bordered box animates layout
- `Switch/switch.css:18` — `transition: background-color ease .2s`
- `Switch/switch.css:20` — `transition: .2s` (unqualified — animates everything)
- `Accordion/accordion.css:18,22` — `200ms ease` ×3
- `Toast/toast.css:16` — `.25s cubic-bezier(...)` — arguably intentional
  (spring-like entrance); consider promoting to a `--transition-bounce` token

### C4. Hardcoded color (DR — tokens)

`Switch/switch.css:20` — `background: #fff` on the knob. In dark theme the knob
stays pure white against a dark track. Should be `var(--background)` or
`var(--primary-fg)`.

---

## P3 — Minor

- `Alert/alert.css:38` — icon `1.125rem` (18px). DR-9.2 specifies 16px or 20px.
- `Table/table.css` — wrapper uses `--radius`; as a bordered container surface
  DR-6.1 suggests `--radius-lg`.
- `Table` padding (`.375/.625rem`, `.625/.75rem`, `.875/1rem`) is legal under
  DR-1.2 (all 2px multiples) but does not follow the 2:1 density ratio of
  DR-3.1 — `md` is 10px/12px, nearly square.
- `Badge` sizes (`.125/.5`, `.25/.625`, `.375/.75rem`) are legal under DR-1.2;
  only the `font-size: 75%` (B2) is a violation.
- `Switch` exposes an `xl` size (96×48px) that no other component has. Either
  add `xl` across the control family or drop it.
- `Toggle` `--disabled` uses `opacity: .7` while `Button:disabled` uses `.5`
  and menu items use `.45`. Three disabled opacities; pick one.

---

## Suggested sequencing

1. **A2 + C4 + C3** — self-contained bug fixes, no visual coordination needed.
2. **A3** — extract `.bm-menu-item`; collapses ~40 duplicated declarations and
   fixes B1/B2 for four components at once.
3. **B3 + C1 + C2** — mechanical token substitution.
4. **A1** — the control height unification. Do last, alone, as its own release,
   since it is the only change with breaking visual impact.

Items 1–3 are non-breaking and fix roughly 70% of the findings.
