# GENERALSTABEN 1951 — Design Spec

A design system reverse-engineered from a 1951 school wall map of **Skåne**
(*Utarbetad av Isak Mattsson och Nils Sjögren*, published by P.A. Norstedt &
Söners Förlag, printed by **Generalstabens Litografiska Anstalt, Stockholm**,
approved for publication 22 October 1951). The palette below was sampled from
photographs of the sheet and white-balanced against the paper stock.

The look in one sentence: **soft litho inks on aged wove paper — a didone title
voice, letterspaced grotesque capitals, hairline black rules, and a warm
hypsometric ramp from sea-blue to ridge-apricot, punctuated by one vivid
vermillion.**

---

## 1 · Typography

The sheet mixes three distinct letterings; each gets a close, freely licensed
web match:

| Role on the map | Original lettering | Web match | Why |
|---|---|---|---|
| Sheet title **SKÅNE** | Hand-drawn didone capitals (Nordisk Antikva / Bodoni tradition): extreme thick–thin contrast, hairline serifs, vertical stress | **Bodoni Moda** (variable, incl. italic) | Truest widely-available didone; at black weight in caps it is near-identical to the title |
| Credit line *"Utarbetad av …"* | Bold didone italic | **Bodoni Moda Italic** | Same voice, same sheet |
| Map labels, TECKENFÖRKLARING | Early German/Swedish grotesque (Venus-Grotesk / Akzidenz family), often letterspaced caps | **Archivo** | A grotesque drawn from the same 19th-century lineage; neutral, slightly squarish |
| Sea names, **ÖSTERSJÖN** | Hairline monoline geometric caps, hand-lettered at enormous tracking over open water | **Jost** (variable, wght ≈300) | Matched against a photograph of the sheet: same hairline monoline stroke and round geometric caps in the Futura tradition, with the hooked descending J |
| Legend entries, tables, small text | Condensed grotesque | **Archivo Narrow** | The condensed cut of the same family |
| Figures, scale statements, code | (n/a — era flavour) | **Courier Prime** | Courier was drawn in 1955; period-correct typewriter voice for numerals/code |

**The hydrographic backslant (reverse italic)**

Water names on the sheet are lettered in the cartographic *motlutande kursiv* —
an italic that leans **left**. No web font ships one, so the theme rebuilds it
with a 12° left skew of the upright font (`transform: skewX(12deg)`;
positive skewX leans left in screen coordinates):

- `.reverse-italic` — bare backslant, composes with any font utility
  (`font-sea reverse-italic`, `map-caps-wide reverse-italic`, …).
- `.map-water` — the water-label preset: backslanted light Jost with
  `0.06em` tracking, matching the sheet's monoline water italics
  (*Falsterbo rev*, *Malmö redd*). Use it for anything liquid: streams of
  data, live feeds, flows.
- `.map-sea` — the sea-label preset: the hairline sea capitals (Jost,
  `font-sea`) at `0.4em` tracking in the reverse italic — the full
  ÖSTERSJÖN treatment, as lettered over open water. Upright variant:
  `.map-caps-wide`.

**Rules of use**

- Display headings: Bodoni Moda, weight 700–900, tracking `+0.08em`, caps for
  title moments, italic for subtitles/flavour.
- The signature texture of the map is **letterspaced capitals**:
  `.map-caps` (Archivo, tracking `0.35em`) for section headings,
  `.map-caps-wide` (Jost hairline, `0.4em`) for "sea names" — big
  quiet labels.
- Body and UI: Archivo. Legend/table text: Archivo Narrow (`.legend-text`).
- Italic serif (Bodoni Moda italic) is the credit-line voice — use it for
  asides and captions.

## 2 · Palette — the litho inks

Sampled from the sheet (white-balanced to paper = `#F4EFE1`):

| Ink | Hex | Sampled from |
|---|---|---|
| Paper | `#F2EDDE` | sheet margin |
| Legend paper (brighter) | `#F8F4E7` | legend box |
| Litho ink (near-black) | `#26231C` | title strokes |
| Stad-vermillion | `#BE3A2B` | city dots, landskapsgräns |
| Sea | `#A6C4CB` | Östersjön |
| Shallows | `#C7DCE0` | vattendjup < 5 m |
| Meadow green | `#B3BF8F` | 0–25 m |
| Pasture olive | `#CFD0A3` | 25–50 m |
| Lowland cream | `#E7DFBD` | plain tint |
| Sand yellow | `#EFDBA9` | 50–100 m |
| Apricot | `#ECC398` | 100–150 m |
| Dune orange | `#E2A873` | 150–200 m |
| Länsgräns green | `#47694F` | county boundary |
| Border/rule beige | `#CFC5A6` | frame tints |

### Semantic tokens (shadcn), light — "paper litho"

| Token | Value | Note |
|---|---|---|
| `--background` / `--foreground` | `#F2EDDE` / `#26231C` | paper & ink |
| `--card`, `--popover` | `#F8F4E7` | legend-box paper |
| `--primary` | `#BE3A2B` | the one loud ink — use sparingly, like city dots |
| `--secondary` | `#A9C8CF` | Öresund blue |
| `--accent` | `#EAC094` | ridge apricot |
| `--muted` | `#E9E2C8` / fg `#6E6650` | lowland sand |
| `--destructive` | `#9E2F21` | deep boundary red |
| `--border`, `--input` | `#CFC5A6` | warm hairline |
| `--ring` | `#BE3A2B` | vermillion focus |
| `--chart-1…5` | `#BE3A2B` `#47694F` `#8FB6BF` `#DFA470` `#D8C285` | spot inks |
| `--radius` | `0.3rem` | crisp print corners |

Plus a named **hypsometric ramp** for sequential data:
`--sea → --shallows → --meadow → --pasture → --lowland → --sand → --apricot → --dune`.

### Dark — "night litho"

The map cabinet after dark: the ink becomes the field, the paper becomes the
lettering. Background `#211F18`, foreground `#EDE6D0`, vermillion brightened to
`#D25A43`, sea desaturated to `#4E6C74`, ramp values dimmed to lamplight.

## 3 · Ornament & texture

Signature details lifted straight off the sheet, provided as utilities in
`src/index.css`:

- `.frame-double` — the double-rule **neatline** that frames the sheet (thin
  inner rule + offset double outer rule). Use on hero/header blocks.
- `.chamfer` — the legend box's **cut corner** (top-left 45° chamfer). Use on
  featured cards.
- `.rule-railway` — a railway line as a horizontal rule: solid line with
  cross-ticks. Use as section dividers.
- `.pattern-marsh` — the *mosse och sankmark* dot stipple.
- `.pattern-hatch` — the *kolförande område* 45° hatch.
- `.texture-paper` — faint SVG fractal grain over the background.
- `.map-caps`, `.map-caps-wide`, `.legend-text` — see typography.

Marker conventions (from the teckenförklaring): filled vermillion dot = primary
item (*stad*); vermillion ring = secondary (*köping*); small ink dot = tertiary
(*annan viktigare ort*). Used for list bullets and table row markers.

**Forms are blanketter.** Inputs are writing lines, not boxes: a dotted ink
rule to write on, caption printed above in condensed spärrad small caps
(Label), and the *entry itself typewritten* in Courier Prime while
placeholders stay italic like a clerk's pencil note. Focus turns the rule
solid vermillion with a faint ink wash — no glow rings. Textareas carry ruled
writing lines that scroll with the text (`.blankett-lines`). Checkboxes are
square printed tick-boxes; radios are köping-rings that fill to a stad dot;
the switch is a square signal lever; the slider is a stad dot riding a drawn
line; and Progress is the map's *skala bar* — a hairline-ruled box filling
with segmented ink.

**Spacing is period-generous.** Print corners are square everywhere
(`--radius: 0`), cards are legend boxes with hairline ink rules and roomy
`1.5rem` padding, and sections breathe with wide margins under their
railway-rule dividers.

**Tabs are a kartblad register.** Paper folder-tabs standing on an ink
baseline, labels in spärrad condensed caps. The active tab is the pulled
card: taller, brighter paper, ink-ruled on three sides and joined seamlessly
to the sheet below (its bottom rule is erased). Inactive tabs sit sunken on
the baseline; disabled ones are faded entries. Pair with a content card
carrying `border border-t-0 border-foreground/60 ring-0` and `gap-0` on the
Tabs root so tab and sheet meet. A `line` variant keeps a vermillion
underline for lighter contexts.

**Buttons are letterpress plates.** Same grammar as the badges, sized for the
hand: square corners, condensed caps with `0.12em` tracking, no washes and no
elevation. `default` is a vermillion plate with a paper rule printed just
inside the edge (a miniature neatline); `secondary` a sea-blue plate with an
ink hairline; `outline` legend-box paper; `destructive` a red-ruled overprint;
`ghost` is bare map lettering that gains a dotted *sockengräns* underline on
hover; `link` carries a dashed *häradsgräns* underline that turns solid.
Hover deepens the ink; `:active` presses the plate one pixel into the paper.

**Badges are beteckningar.** They are set as 1951 print labels, not modern
pills: square corners, hairline rules, letterspaced condensed caps (Archivo
Narrow, `0.14em` tracking). The default variant is a solid vermillion plate
with a paper inner rule (a miniature neatline); `secondary` is a sea-blue
plate with an ink hairline; `outline` is legend-box paper; `destructive` is a
red-ruled overprint. Pair with the marker dots above for legend semantics.

**The rest of the registry, in the same voice:**

- **Breadcrumb** — a plotted route; separators are vermillion `»`.
- **Pagination** — the kartblad sheet index; the active sheet is the
  ink-ruled paper plate.
- **Kbd** — loose letterpress type sorts: square metal, ink rule, mono face.
- **Toggle / ToggleGroup** — layer levers on the print desk; pressed = the
  overlay prints as a sea-blue plate.
- **Command** — the *ortregister*: town entries carry their legend markers,
  water entries are set in the hydrographic backslant.
- **Sonner toasts** — telegrams: square paper slips, condensed-caps heading,
  mono body (write descriptions in STOP-style caps for full effect).
- **AlertDialog** — the stamped official notice for grave decisions.
- **Sheet** — the fold-out map flap for side panels.
- **HoverCard** — a small map inset on hover.
- **Skeleton** — *under tryckning*: marsh-stipple placeholder ink.
- **Spinner** — the surveyor's compass, slowly finding north.
- **Empty** — *vita fläckar*, the map's uncharted blanks.

**And the long tail, completing the registry:**

- **Calendar** — the 1951 almanac (Swedish locale, Monday-first); the chosen
  day is a stad-vermillion plate.
- **InputOTP** — telegraph code boxes: one dotted writing cell per character,
  active cell rules solid vermillion.
- **Carousel** — flipping through the kartblad series; sheets are
  hypsometric plates.
- **Resizable** — land and sea panes; the handle is a paper-and-ink batten.
- **ScrollArea** — ink scrollbar over a ruled register.
- **Collapsible** — a folding legend section.
- **Drawer** — the *kartfickan*, the map cabinet's bottom drawer, with an
  ink grab-rule.
- **Menubar** — the print-desk menu bar: ink-hairline card, condensed-caps
  triggers.
- **NavigationMenu** — condensed-caps wayfinding with paper flyouts.
- **ContextMenu** — surveyor's tools on right-click (zoom, mark, measure).
- **Chart** — Recharts through ChartContainer; the reference piece is the
  sheet-edge terrain profile: dune-orange fill under an ink stroke, dotted
  grid, Courier axis figures.
- **Field / InputGroup / ButtonGroup / Item** — structural wrappers; they
  inherit the blankett and plate idioms.

Deliberately excluded, with reasons: **sidebar** (an app-shell scaffold, not
a showcase element — adopt the legend-box tokens when an app needs it),
**form** (react-hook-form logic wrapper, no visual surface), **aspect-ratio**
(purely structural).

**Overlay doctrine — nothing floats, everything is laid on the desk.** All
floating surfaces (dialogs, menus, popovers, selects, hover cards, chart
tooltips) are paper slips: square, `ring-foreground/50–60` ink hairlines, and
a flat **offset print shadow** (`3px 3px 0` for slips, `6px 6px 0` for
dialogs) — a second sheet beneath, never a blur. Backdrops are a flat ink
wash (`#26231C` at 40%), no backdrop blur. Tooltips are ink stamps: square,
condensed lettering on the litho black. Tables print like a census: a heavy
double rule under the header, hairline ink row rules, condensed-caps column
heads, mono figures, an italic serif caption. Alerts are marginal notices —
square with a heavy left rule, ink for information, vermillion for warnings.
Accordions are legend entries on ink hairlines; separators and avatar rings
are ink; the command palette's search field is a blankett writing line.

## 4 · Voice

Borders are hairline and ink-colored, never gray-on-gray. Shadows are nearly
absent — print has no elevation; separation comes from paper tone and rules.
Color is deployed like spot ink: large calm fields of paper/sea/sand, one
vermillion accent per view. Letterspaced caps do the work that bold weight does
in modern UIs.

---

*Files: theme in `src/index.css`, showcase in `src/App.tsx`.
Run `npm install && npm run dev`, or `npm run build` and serve `dist/`.*
