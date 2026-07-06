# Generalstabens Litografiska Anstalt

**A shadcn/ui theme drawn from a 1951 Swedish school wall map of Skåne.**

Reverse-engineered from *SKÅNE* (utarbetad av Isak Mattsson och Nils Sjögren,
P.A. Norstedt & Söners Förlag), printed by **Generalstabens Litografiska
Anstalt, Stockholm**, and approved for publication in rikets allmänna kartverk
on 22 October 1951. The palette and lettering were sampled from photographs of
the sheet and white-balanced against the paper stock. This is the reference:

![The 1951 SKÅNE sheet — the reference](docs/skane-1951-reference.jpg)

The look in one sentence: **soft litho inks on aged wove paper — a didone
title voice, letterspaced grotesque capitals, hairline black rules, and a warm
hypsometric ramp from sea-blue to ridge-apricot, punctuated by one vivid
vermillion.**

![The sheet header](docs/screenshots/hero.png)

## The voice

- **Nothing floats — everything is laid on the desk.** Overlays are paper
  slips with hairline ink rules and flat *offset print shadows* (a second
  sheet beneath), never a blur.
- **Print has no rounded corners.** `--radius: 0` everywhere.
- **Color is spot ink.** Large calm fields of paper, sea and sand; one
  vermillion accent per view, used like the map's city dots.
- **Letterspaced capitals do the work bold does in modern UIs.**
- **Forms are blanketter** — dotted writing lines, typewritten entries,
  captions in condensed spärrad small caps.

## Typography

| Role | Face | Why |
|---|---|---|
| Display | **Bodoni Moda** | The didone title lettering of *SKÅNE* |
| UI / labels | **Archivo** | The Venus/Akzidenz-style grotesque map labels (SMÅLAND, TECKENFÖRKLARING) |
| Sea & water names | **Jost** | The hairline geometric sea capitals (Ö S T E R S J Ö N) and the light monoline water italics (*Falsterbo rev*) |
| Legend / tables | **Archivo Narrow** | The condensed legend lettering |
| Figures / code | **Courier Prime** | Courier was drawn in 1955 — period-correct |

Plus the **hydrographic backslant** (`.reverse-italic`): the left-leaning
cartographic italic the sheet uses over water, rebuilt with a 12° skew.
`.map-caps-wide` sets the letterspaced sea capitals upright, `.map-sea` is the
same lettering backslanted, and `.map-water` backslants the lowercase water
voice — all matched against the photographed sheet.

## Palette

Paper `#F2EDDE` · Ink `#26231C` · Stad-vermillion `#BE3A2B` · Öresund
`#A9C8CF` · Apricot `#EAC094` · Länsgräns green `#47694F` — and the full
hypsometric ramp off the legend, exposed as CSS variables:
`--sea → --shallows → --meadow → --pasture → --lowland → --sand → --apricot → --dune`.

Two modes: **paper litho** (day) and **night litho** (the map cabinet after
dark — ink field, cream lettering).

![Night litho](docs/screenshots/hero-dark.png)

The full spec — sampled values, semantic token mapping, ornament utilities,
component doctrine — lives in [DESIGN.md](DESIGN.md).

---

## The components

### I · Färgerna — the litho inks
Semantic tokens as swatches, plus the hypsometric elevation ramp for
sequential data.

![Palette](docs/screenshots/palette.png)

### II · Typograferna — the lettering
Bodoni Moda display, Archivo grotesques, Jost sea capitals, Courier Prime
figures, and the reverse-italic water lettering.

![Typography](docs/screenshots/typography.png)

### III · Knapparna — buttons as letterpress plates
Square plates with hairline rules: vermillion with an inner paper neatline,
sea-blue, legend paper, red-ruled destructive. Ghost gains a dotted
*sockengräns* underline; `:active` presses the plate into the paper.

![Buttons](docs/screenshots/buttons.png)

### IV · Blanketten — forms
Dotted writing lines, typewritten entries, italic placeholder "pencil notes",
ruled textarea, printed tick-boxes, köping-ring radios, signal-lever switch,
stad-dot slider, and the skala-bar progress.

![Forms](docs/screenshots/forms.png)
![Forms, night litho](docs/screenshots/forms-dark.png)

### V · Beteckningar — badges & alerts
Badges are square-set legend labels; alerts are marginal notices with a heavy
left rule (ink for information, vermillion for warnings).

![Badges & Alerts](docs/screenshots/badges-alerts.png)

### VI · Tabellen — the census table
Heavy double rule under condensed-caps column heads, hairline ink row rules,
mono figures, italic serif caption, legend markers per row.

![Table](docs/screenshots/table.png)

### VII · Diagrammet — chart inks
`--chart-1…5` as litho spot inks.

![Chart inks](docs/screenshots/chart-inks.png)

### VIII · Markslagen — patterns
The marsh dot-stipple, the 45° coal hatch, and the legend box's chamfered
corner as utilities.

![Patterns](docs/screenshots/patterns.png)

### IX · Apparaterna — overlays
Dialogs, menus, tooltips, hover cards: paper slips with ink hairlines and
offset print shadows over a flat ink-wash backdrop. Tabs are kartblad
register folder-tabs; the active tab joins its sheet.

![Overlays](docs/screenshots/overlays.png)
![Dialog](docs/screenshots/dialog.png)

### X · Registret — wayfinding
Breadcrumb as a plotted route, pagination as the sheet index, kbd as
letterpress type sorts, toggle-group as layer levers, and a Command
*ortregister* with backslanted water names.

![Wayfinding](docs/screenshots/wayfinding.png)

### XI · Posten — signals & states
Toasts arrive as telegrams (mono STOP-wording), alert-dialogs are stamped
notices, sheets are fold-out map flaps, skeletons are *under tryckning*
stipple, the spinner is a surveyor's compass, and empty states are *vita
fläckar* — the map's uncharted blanks.

![Signals](docs/screenshots/signals.png)
![Telegram toast](docs/screenshots/telegram.png)

### XII · Almanackan — time & codes
The calendar as a Swedish almanac (open on the month the map was approved,
the 22nd printed as a vermillion plate); InputOTP as telegraph code cells;
Field, InputGroup, ButtonGroup and Item in the same grammar.

![Almanac](docs/screenshots/almanac.png)

### XIII · Kartbladen — sheets & panes
Carousel flips through the kartblad series, Resizable splits land from sea
with a paper batten, ScrollArea rules the häradsförteckning, Drawer is the
map cabinet's bottom drawer.

![Sheets & Panes](docs/screenshots/sheets-panes.png)

### XIV · Skrivbordet — desk & menus
Menubar as the print-desk bar, NavigationMenu in condensed caps, ContextMenu
with surveyor's tools on right-click.

![Desk & Menus](docs/screenshots/desk-menus.png)

### XV · Profilen — the chart
The sheet-edge terrain profile as a Recharts area chart: dune-orange under an
ink stroke, dotted grid, Courier axis figures.

![Profile chart](docs/screenshots/profile-chart.png)
![Profile chart, night litho](docs/screenshots/profile-chart-dark.png)

---

## Install

### Run the showcase

```bash
git clone https://github.com/maxberggren/generalstabens-litografiska-anstalt
cd generalstabens-litografiska-anstalt
npm install
npm run dev          # or: npm run build && serve dist/
```

### Use the theme in your own shadcn/ui app

The theme is a Vite + Tailwind CSS v4 + shadcn/ui (radix base) project. To
adopt it in an existing shadcn app:

1. **Fonts** — install the period faces:

   ```bash
   npm install @fontsource-variable/bodoni-moda @fontsource-variable/archivo \
     @fontsource-variable/archivo-narrow @fontsource-variable/jost \
     @fontsource/courier-prime
   ```

2. **Tokens & utilities** — copy the theme block from
   [`src/index.css`](src/index.css) into your global CSS: the font imports,
   the `@theme inline` font/color declarations, the `:root` and `.dark`
   token sets, and the `@layer utilities` block (`.map-caps`,
   `.map-caps-wide`, `.frame-double`, `.chamfer`, `.rule-railway`,
   `.pattern-marsh`, `.pattern-hatch`, `.texture-paper`, `.reverse-italic`,
   `.map-water`, `.map-sea`, `.legend-text`, `.blankett-lines`).

3. **Components** — copy [`src/components/ui/`](src/components/ui) over your
   own `components/ui` directory. These are stock shadcn (radix-nova base)
   components with the 1951 restyling applied — same APIs, so existing code
   keeps working. Component-level dependencies (radix-ui, cva, lucide-react,
   sonner, vaul, embla, recharts, react-day-picker, input-otp,
   react-resizable-panels, cmdk) are listed in [`package.json`](package.json).

4. **Mount the telegram office** — add `<Toaster />` (from
   `components/ui/sonner`) once at your app root, and toggle night litho by
   setting the `dark` class on `<html>`.

The showcase itself is one file — [`src/App.tsx`](src/App.tsx) — and doubles
as usage documentation for every component.

## License

MIT. The fonts are loaded via [Fontsource](https://fontsource.org) under the
SIL Open Font License. The original 1951 map that inspired this theme was
published by P.A. Norstedt & Söners Förlag and printed by Generalstabens
Litografiska Anstalt, Stockholm — this project is an homage, unaffiliated
with either.
