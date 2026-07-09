import { useEffect, useState } from "react"
import { sv } from "react-day-picker/locale"
import { toast } from "sonner"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle,
} from "@/components/ui/empty"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
  Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle,
} from "@/components/ui/item"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Toaster } from "@/components/ui/sonner"
import { Switch } from "@/components/ui/switch"
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Anchor, BedDouble, Bird, BookOpen, ChevronDown, CloudSun, Compass, Copy, Layers,
  Moon, Mountain, Phone, Quote, Search, Send, Snowflake, Star, Sun, TrainFront, Trees, Waves,
} from "lucide-react"

/* ================================================================== */
/*  SKÅNELINJEN — a working site set in the Generalstaben 1951 theme.  */
/*  A fictional excursion bureau, laid out with the sheet's balance:   */
/*  sea-blue header, paper legend-strips, tinted field bands, one      */
/*  vermillion accent per view, boundary-green colophon.               */
/* ================================================================== */

const TURER = [
  {
    id: "soderasen",
    name: "Söderåsen",
    field: "bg-meadow",
    pattern: "",
    icon: Trees,
    badge: { variant: "meadow" as const, label: "0–25 m" },
    blurb:
      "Bokskog och rasbranter längs Skäralid. Avfärd från Klippan station, vandring om 14 km med rast vid Kopparhatten.",
    price: "4:50",
    line: "Söderåsbanan",
  },
  {
    id: "linderodsasen",
    name: "Linderödsåsen",
    field: "bg-apricot",
    pattern: "pattern-hatch",
    icon: Mountain,
    badge: { variant: "apricot" as const, label: "150–200 m" },
    blurb:
      "Höglandsturen över åsens rygg — landskapets tak. Urberg under fötterna och vida utsikter mot Kristianstadsslätten.",
    price: "6:25",
    line: "Gärdsbanan",
  },
  {
    id: "falsterbo",
    name: "Falsterbonäset",
    field: "bg-shallows",
    pattern: "pattern-marsh",
    icon: Bird,
    badge: { variant: "secondary" as const, label: "grundare än 5 m" },
    blurb:
      "Fågelsträck över revet och bad vid Kämpingebukten. Sandiga dyner, fyrplats och hela himlen över Måkläppen.",
    price: "3:75",
    line: "Vellingebanan",
  },
]

const AVGANGAR = {
  vastkust: [
    { tid: "08.12", ort: "Malmö C", mal: "Mölle", spar: "2", note: "stad" },
    { tid: "09.47", ort: "Helsingborg F", mal: "Arild", spar: "1", note: "stad" },
    { tid: "11.05", ort: "Ängelholm", mal: "Torekov", spar: "3", note: "koping" },
    { tid: "13.30", ort: "Båstad", mal: "Hovs hallar", spar: "1", note: "koping" },
  ],
  stambana: [
    { tid: "07.55", ort: "Malmö C", mal: "Hässleholm", spar: "4", note: "stad" },
    { tid: "10.20", ort: "Lund C", mal: "Höör", spar: "2", note: "stad" },
    { tid: "12.42", ort: "Eslöv", mal: "Sösdala", spar: "1", note: "koping" },
  ],
  osterlen: [
    { tid: "09.05", ort: "Ystad", mal: "Simrishamn", spar: "1", note: "stad" },
    { tid: "11.55", ort: "Tomelilla", mal: "Kivik", spar: "2", note: "koping" },
    { tid: "15.10", ort: "Simrishamn", mal: "Brantevik", spar: "1", note: "by" },
  ],
}

const PROFIL = [
  { ort: "Malmö", h: 4 },
  { ort: "Lund", h: 42 },
  { ort: "Ringsjön", h: 54 },
  { ort: "Höör", h: 78 },
  { ort: "Söderåsen", h: 124 },
  { ort: "Linderödsåsen", h: 196 },
  { ort: "Brösarp", h: 92 },
  { ort: "Kivik", h: 8 },
]

const profilConfig = {
  h: { label: "Höjd ö.h. (m)", color: "var(--chart-4)" },
} satisfies ChartConfig

/* the guest book — resenärernas omdömen, TripAdvisor anno 1951 */
const GASTBOK = [
  {
    initialer: "GL", namn: "Fru G. Lindqvist", ort: "Lund", betyg: 5,
    datum: "juli 1951", marke: "Verifierad resenär",
    text: "Kopparhatten i morgondis — värt vartenda öre. Matsäckslådan därtill förträfflig; kaffet höll sig varmt ända till Skäralid.",
  },
  {
    initialer: "EÅ", namn: "Hr E. Åkesson", ort: "Malmö", betyg: 4,
    datum: "juni 1951", marke: null,
    text: "Ångaren krängde betänkligt över sundet, men reseledare Sjögren höll humöret uppe med visor och pomerans.",
  },
  {
    initialer: "AN", namn: "Fröken A. Nilsson", ort: "Ystad", betyg: 5,
    datum: "augusti 1951", marke: "Verifierad resenär",
    text: "Fågelsträcket vid Falsterbo överträffar alla beskrivningar i resehandboken. Tag med kikare och tålamod!",
  },
  {
    initialer: "FP", namn: "Familjen Persson", ort: "Eslöv", betyg: 5,
    datum: "juli 1951", marke: "Återkommande gäst",
    text: "Barnen somnade lyckliga på kvällståget hem. Vi återkommer nästa sommar — då tager vi Linderödsåsen.",
  },
  {
    initialer: "TB", namn: "Hr T. Bergström", ort: "Hässleholm", betyg: 3,
    datum: "maj 1951", marke: null,
    text: "Regn hela dagen å åsen. Raststugans kamin dock ett ljus i mörkret, och torkrummet gjorde god tjänst.",
  },
]

const BETYG = [
  { stjarnor: 5, antal: 248 },
  { stjarnor: 4, antal: 41 },
  { stjarnor: 3, antal: 15 },
  { stjarnor: 2, antal: 6 },
  { stjarnor: 1, antal: 2 },
]

const VARDSHUS = [
  {
    icon: Trees, namn: "Gästgivaregården i Röstånga",
    badge: { variant: "meadow" as const, label: "Söderåsen" },
    blurb: "Vid åsens fot, tolv rum med kakelugn. Helpension med skånsk frukost.",
    pris: "9:50",
  },
  {
    icon: Anchor, namn: "Hotell Svea, Simrishamn",
    badge: { variant: "secondary" as const, label: "Österlen" },
    blurb: "Sjöutsikt över hamnen, tjugotvå rum. Fiskrätter i matsalen alla dagar.",
    pris: "11:75",
  },
  {
    icon: Mountain, namn: "Turisthotellet i Mölle",
    badge: { variant: "apricot" as const, label: "Kullaberg" },
    blurb: "Under Kullabergs klippor. Kallbadhus och serpentinväg upp till fyren.",
    pris: "13:25",
  },
]

/* installation — the three moves, kept copy-ready */
const REPO_URL = "https://github.com/maxberggren/generalstabens-litografiska-anstalt"
const FONTS_CMD =
  "npm install @fontsource-variable/bodoni-moda @fontsource-variable/archivo @fontsource-variable/archivo-narrow @fontsource-variable/jost @fontsource/courier-prime"

/* vermillion stars — the one vivid accent, spent on praise */
function Stjarnor({ betyg }: { betyg: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${betyg} av 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={
            n <= betyg
              ? "size-3.5 fill-primary text-primary"
              : "size-3.5 text-foreground/25"
          }
        />
      ))}
    </span>
  )
}

function kopiera(rad: string) {
  navigator.clipboard.writeText(rad)
  toast("AVSKRIFT TAGEN STOP", { description: "RADEN LIGGER Å URKLIPPSBORDET STOP" })
}

function Marker({ kind }: { kind: string }) {
  if (kind === "stad")
    return <span className="inline-block size-2 rounded-full bg-primary" />
  if (kind === "koping")
    return <span className="inline-block size-2 rounded-full border-[1.5px] border-primary" />
  return <span className="inline-block size-1.5 rounded-full bg-foreground" />
}

export default function Site() {
  const [dark, setDark] = useState(false)
  const [resdag, setResdag] = useState<Date | undefined>(new Date(1951, 6, 14))
  const [sallskap, setSallskap] = useState([4])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <div className="min-h-screen">
      <Toaster position="bottom-right" />

      {/* ============ RED OVERPRINT — every sheet states what it is ============ */}
      <div className="bg-primary text-primary-foreground">
        <div className="legend-text mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-6 py-2 text-xs sm:px-10">
          <span className="map-caps tracking-[0.18em]">Demonstrationsblad</span>
          <span className="opacity-90">
            Skånelinjen är en fiktiv byrå — allt härpå är{" "}
            <span className="font-semibold">SKÅNE 1951</span>, ett tema för shadcn/ui.
          </span>
          <span className="ml-auto flex items-center gap-4">
            <a href="#installation" className="underline underline-offset-4 hover:opacity-80">
              Så installeras temat
            </a>
            <a href="#components" className="underline underline-offset-4 hover:opacity-80">
              Alla komponenter
            </a>
          </span>
        </div>
      </div>

      {/* ============ THE SEA — header & hero on the open blue ============ */}
      <header className="relative bg-sea text-secondary-foreground dark:text-secondary-foreground">
        {/* shore-ripple, faded out under the lettering like the sheet's
            open water around ÖSTERSJÖN */}
        <div className="pattern-water pointer-events-none absolute inset-0 text-secondary-foreground/20 [mask-image:linear-gradient(105deg,transparent_35%,black_75%)]" />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
          {/* top rule bar */}
          <div className="flex items-center gap-4 border-b border-current/30 py-3">
            <a href="#site" className="map-caps text-sm font-semibold tracking-[0.3em]">
              Skånelinjen
            </a>
            <Badge variant="outline" className="hidden sm:inline-flex">Grundad 1897</Badge>
            <nav className="ml-auto hidden items-center gap-1 md:flex">
              <Button variant="ghost" size="sm">Turer</Button>
              <Button variant="ghost" size="sm">Tidtabell</Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="#components">Komponenter</a>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">Kartblad</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="legend-text">Serien 1:600 000</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Blad 1 · Skåne</DropdownMenuItem>
                  <DropdownMenuItem>Blad 2 · Halland</DropdownMenuItem>
                  <DropdownMenuItem>Blad 3 · Blekinge</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled>Blad 4 · Småland (utsålt)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
            <InputGroup className="hidden w-52 lg:flex">
              <InputGroupAddon><Search /></InputGroupAddon>
              <InputGroupInput placeholder="Sök ort…" />
              <InputGroupAddon align="inline-end">
                <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
              </InputGroupAddon>
            </InputGroup>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon-sm" onClick={() => setDark(!dark)}>
                  {dark ? <Sun /> : <Moon />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{dark ? "Dag — paper litho" : "Natt — night litho"}</TooltipContent>
            </Tooltip>
          </div>

          {/* hero */}
          <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr] md:py-18">
            <div>
              <div className="map-sea mb-5 text-sm text-secondary-foreground/80">
                Öresund · Skälderviken · Hanöbukten
              </div>
              <h1 className="font-heading text-4xl font-black tracking-[0.06em] text-balance sm:text-5xl lg:text-6xl">
                Sommaren ligger på Skånelinjen
              </h1>
              <p className="font-heading mt-4 max-w-md text-lg italic">
                Utflykter med tåg och ångare över slätt, ås och hav — efter 1951 års sommartidtabell.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg"><Send data-slot="icon" /> Boka utflykt</Button>
                <Button size="lg" variant="outline"><Compass data-slot="icon" /> Se kartbladet</Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Badge variant="sand">27 turer</Badge>
                <Badge variant="meadow">14 banor</Badge>
                <Badge variant="apricot">3 åsar</Badge>
                <Badge>1 halvö</Badge>
              </div>
            </div>

            {/* the legend box floating on the sea, framed by the sheet's
                double-rule neatline — the frame is the elevation, no shadow */}
            <Card className="frame-double m-2 self-start ring-0">
              <CardHeader>
                <CardTitle className="map-caps text-sm">Nästa avgång</CardTitle>
                <CardDescription className="legend-text">
                  Lördag 14 juli 1951 · Malmö C
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <TrainFront className="size-8 shrink-0" />
                  <div>
                    <div className="font-heading text-xl">Ångtåget mot Mölle</div>
                    <div className="legend-text text-sm text-muted-foreground">
                      Västkustbanan · spår 2 · avgår 08.12
                    </div>
                  </div>
                  <Badge className="ml-auto">08.12</Badge>
                </div>
                <Separator />
                <div className="space-y-1.5">
                  <div className="legend-text flex justify-between text-xs text-muted-foreground">
                    <span>Biljetter tecknade</span>
                    <span className="font-mono">86 av 120</span>
                  </div>
                  <Progress value={72} />
                </div>
                <div className="flex items-center gap-2">
                  <AvatarGroup>
                    <Avatar size="sm"><AvatarFallback>GA</AvatarFallback></Avatar>
                    <Avatar size="sm"><AvatarFallback>IM</AvatarFallback></Avatar>
                    <Avatar size="sm"><AvatarFallback>NS</AvatarFallback></Avatar>
                  </AvatarGroup>
                  <span className="legend-text text-xs text-muted-foreground">
                    Reseledare: Andersson, Mattsson &amp; Sjögren
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex-wrap gap-2">
                <Button size="sm">Teckna biljett</Button>
                <Button size="sm" variant="ghost">Hela tidtabellen</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </header>

      {/* ============ PAPER MARGIN — the figures strip ============ */}
      <section className="border-y-2 border-foreground/60 bg-paper">
        {/* hairline rules drawn per-cell so the register also reads right
            as a 2×2 grid on narrow sheets */}
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-6 sm:px-10 md:grid-cols-4">
          {[
            ["1 214 km", "räls i trafik"],
            ["68", "orter angörs"],
            ["1:600 000", "kartans skala"],
            ["42 118", "resande 1950"],
          ].map(([num, label]) => (
            <div
              key={label}
              className="border-border px-4 py-5 max-md:odd:pl-0 max-md:[&:nth-child(-n+2)]:border-b max-md:[&:nth-child(even)]:border-l md:first:pl-0 md:[&:not(:first-child)]:border-l"
            >
              <div className="font-mono text-xl sm:text-2xl">{num}</div>
              <div className="legend-text text-xs tracking-[0.08em] text-muted-foreground uppercase">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ THE LEGEND — what this sheet is, and how to print
          your own. Kept early: the reader should know they are holding a
          provtryck before they reach the timetable. ============ */}
      <section id="installation" className="border-b border-foreground/40 bg-lowland/70 dark:bg-lowland/45">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
          <div className="mb-8 flex items-baseline gap-4">
            <h2 className="map-caps text-lg">Teckenförklaring</h2>
            <div className="grow rule-railway text-foreground/60" />
            <span className="font-heading text-sm italic text-muted-foreground">
              så tas temat i bruk
            </span>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="font-heading text-xl italic leading-relaxed">
                Varje kort, tabell och blankett härpå är en shadcn/ui-komponent i
                temat <span className="font-black not-italic">SKÅNE 1951</span> —
                ritat efter Generalstabens kartblad över Skåne.
              </p>
              <p className="legend-text mt-4 text-sm text-muted-foreground">
                Bladet ni läser är själva provtrycket. Samma komponenter, samma
                API som stock shadcn — endast trycket är från 1951.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a href="#components">
                    <Layers data-slot="icon" /> Bläddra bland komponenterna
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={REPO_URL} target="_blank" rel="noreferrer">
                    <BookOpen data-slot="icon" /> Källorna på GitHub
                  </a>
                </Button>
              </div>
            </div>
            <Card className="frame-double m-2 ring-0">
              <CardHeader>
                <CardTitle className="map-caps text-sm">Installation i tre moment</CardTitle>
                <CardDescription className="legend-text">
                  för ett befintligt shadcn/ui-projekt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ItemGroup className="gap-2">
                  <Item variant="outline">
                    <ItemMedia><span className="font-mono text-lg">1</span></ItemMedia>
                    <ItemContent>
                      <ItemTitle className="legend-text">Hämta bladet</ItemTitle>
                      <ItemDescription className="font-mono text-xs break-all">
                        git clone {REPO_URL}
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost" size="icon-sm"
                            onClick={() => kopiera(`git clone ${REPO_URL}`)}
                          >
                            <Copy />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Tag avskrift</TooltipContent>
                      </Tooltip>
                    </ItemActions>
                  </Item>
                  <Item variant="outline">
                    <ItemMedia><span className="font-mono text-lg">2</span></ItemMedia>
                    <ItemContent>
                      <ItemTitle className="legend-text">Sätt stilen</ItemTitle>
                      <ItemDescription className="legend-text text-xs">
                        Kopiera temablocket ur{" "}
                        <span className="font-mono">src/index.css</span> till er
                        globala CSS och hämta stilarna med npm.
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost" size="icon-sm"
                            onClick={() => kopiera(FONTS_CMD)}
                          >
                            <Copy />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Tag avskrift å npm-raden</TooltipContent>
                      </Tooltip>
                    </ItemActions>
                  </Item>
                  <Item variant="outline">
                    <ItemMedia><span className="font-mono text-lg">3</span></ItemMedia>
                    <ItemContent>
                      <ItemTitle className="legend-text">Lägg komponenterna</ItemTitle>
                      <ItemDescription className="legend-text text-xs">
                        Kopiera <span className="font-mono">src/components/ui/</span>{" "}
                        över er egen katalog — samma API, befintlig kod fortsätter
                        att fungera.
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                </ItemGroup>
                <Collapsible className="mt-4">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="group">
                      <ChevronDown
                        data-slot="icon"
                        className="transition-transform group-data-[state=open]:rotate-180"
                      />
                      Hela receptet ur handboken
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="legend-text mt-3 space-y-2 text-sm text-muted-foreground">
                    <p>
                      Ur <span className="font-mono">src/index.css</span> tages:
                      fontimporterna, <span className="font-mono">@theme inline</span>-blocket,
                      tokenuppsättningarna <span className="font-mono">:root</span> och{" "}
                      <span className="font-mono">.dark</span> samt hela{" "}
                      <span className="font-mono">@layer utilities</span>{" "}
                      (.map-caps, .frame-double, .chamfer, .rule-railway,
                      .pattern-marsh, .texture-paper m.fl.).
                    </p>
                    <p>
                      Montera <span className="font-mono">&lt;Toaster /&gt;</span> en
                      gång vid appens rot; nattlitografin tänds med klassen{" "}
                      <span className="font-mono">dark</span> å{" "}
                      <span className="font-mono">&lt;html&gt;</span>. Fullständig
                      anvisning finnes i README.
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ============ THE MEADOW EDGE — excursions on a green field, so the
          legend's lowland beige above keeps its own register ============ */}
      <main className="texture-paper">
        <section className="bg-meadow/40 dark:bg-meadow/25">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#site">Skånelinjen</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#site">Sommarturer</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>1951</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-10 flex items-baseline gap-4">
            <h2 className="map-caps text-lg">Utflyktsmål</h2>
            <div className="grow rule-railway text-foreground/60" />
            <span className="font-heading text-sm italic text-muted-foreground">tre höjdlägen, tre biljettpriser</span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TURER.map((t) => (
              <Card key={t.id} className="pt-0">
                {/* hypsometric plate — the card's terrain; padding tracks
                    the card's own spacing so the lettering aligns with the
                    text below */}
                <div className={`${t.field} relative flex h-36 items-end px-(--card-spacing) py-4 text-foreground/85`}>
                  <div className={`${t.pattern} pointer-events-none absolute inset-0 text-foreground/30`} />
                  <t.icon className="absolute top-4 right-4 size-6" />
                  <div className="map-caps-wide relative text-lg">{t.name}</div>
                </div>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={t.badge.variant}>{t.badge.label}</Badge>
                    <Badge variant="ghost">{t.line}</Badge>
                  </div>
                  <p className="legend-text text-sm text-muted-foreground">{t.blurb}</p>
                </CardContent>
                <CardFooter className="justify-between">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link" className="px-0">Läs i resehandboken</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="legend-text w-64 text-sm">
                      <span className="map-caps text-xs">Ur resehandboken</span>
                      <p className="mt-2 text-muted-foreground">
                        „{t.name} nås bekvämast med {t.line}. Medtag matsäck; kaffeservering
                        förekommer endast söndagar.”
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                  <span className="font-mono text-lg">{t.price} kr</span>
                </CardFooter>
              </Card>
            ))}
          </div>
          </div>
        </section>

        {/* ============ TIDTABELL — census table on legend paper ============ */}
        <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
          <div className="mb-10 flex items-baseline gap-4">
            <h2 className="map-caps text-lg">Sommartidtabell</h2>
            <div className="grow rule-railway text-foreground/60" />
          </div>
          <Tabs defaultValue="vastkust" className="gap-0">
            <TabsList>
              <TabsTrigger value="vastkust">Västkustbanan</TabsTrigger>
              <TabsTrigger value="stambana">Södra stambanan</TabsTrigger>
              <TabsTrigger value="osterlen">Österlenbanan</TabsTrigger>
            </TabsList>
            {(Object.keys(AVGANGAR) as Array<keyof typeof AVGANGAR>).map((k) => (
              <TabsContent key={k} value={k}>
                <Card className="border border-t-0 border-foreground/60 ring-0">
                  <CardContent>
                    <Table>
                      <TableCaption>
                        Avgångar enligt 1951 års sommartidtabell — med reservation för ångarens humör.
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Avgång</TableHead>
                          <TableHead>Från</TableHead>
                          <TableHead>Mot</TableHead>
                          <TableHead className="text-right">Spår</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {AVGANGAR[k].map((a) => (
                          <TableRow key={a.tid + a.ort}>
                            <TableCell className="font-mono">{a.tid}</TableCell>
                            <TableCell>
                              <span className="flex items-center gap-2">
                                <Marker kind={a.note} />{a.ort}
                              </span>
                            </TableCell>
                            <TableCell>{a.mal}</TableCell>
                            <TableCell className="text-right font-mono">{a.spar}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <Alert variant="sand" className="max-w-md">
                        <CloudSun />
                        <AlertTitle className="legend-text font-semibold">Sommarkungörelse</AlertTitle>
                        <AlertDescription className="legend-text">
                          Extratåg insättes samtliga söndagar i juli månad.
                        </AlertDescription>
                      </Alert>
                      <Pagination className="mx-0 w-auto">
                        <PaginationContent>
                          <PaginationItem><PaginationLink href="#site" isActive>1</PaginationLink></PaginationItem>
                          <PaginationItem><PaginationLink href="#site">2</PaginationLink></PaginationItem>
                          <PaginationItem><PaginationLink href="#site">3</PaginationLink></PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* ============ THE SHALLOWS — profile chart band ============ */}
        <section className="border-y border-foreground/40 bg-shallows/80 dark:bg-shallows/45">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
            <div className="mb-8 flex items-baseline gap-4">
              <h2 className="map-caps text-lg">Profil över sträckningen</h2>
              <div className="grow rule-railway text-foreground/60" />
              <span className="map-water text-base text-secondary-foreground">
                Malmö — Kivik
              </span>
            </div>
            <Card className="frame-double m-2 ring-0">
              <CardContent>
                <ChartContainer config={profilConfig} className="h-56 w-full">
                  <AreaChart data={PROFIL} margin={{ left: -14, right: 12, top: 6 }}>
                    <CartesianGrid strokeDasharray="2 4" vertical={false} />
                    <XAxis dataKey="ort" tickLine={false} axisLine={{ strokeWidth: 1.5 }} fontSize={11} />
                    <YAxis tickLine={false} axisLine={false} fontSize={11} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      dataKey="h" type="monotone" fill="var(--color-h)" fillOpacity={0.55}
                      stroke="var(--foreground)" strokeWidth={1.5}
                    />
                  </AreaChart>
                </ChartContainer>
                <div className="legend-text mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>← Öresund</span>
                  <span>Höjdskala 0–200 m · överhöjd 25×</span>
                  <span>Östersjön →</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============ THE ORCHARD — the guest book on the apricot tint.
            Resenärernas omdömen: TripAdvisor anno 1951 — a tote board of
            betyg and a carousel of guest-book pages. ============ */}
        <section className="bg-apricot/50 dark:bg-apricot/35">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
            <div className="mb-8 flex items-baseline gap-4">
              <h2 className="map-caps text-lg">Ur gästboken</h2>
              <div className="grow rule-railway text-foreground/60" />
              <span className="font-heading text-sm italic text-foreground/70">
                resenärernas omdömen sedan 1897
              </span>
            </div>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
              {/* the tote board */}
              <Card className="frame-double m-2 self-start ring-0">
                <CardHeader>
                  <CardTitle className="map-caps text-sm">Säsongens betyg</CardTitle>
                  <CardDescription className="legend-text">
                    312 omdömen i gästboken
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-end gap-3">
                    <span className="font-heading text-5xl font-black">4,8</span>
                    <div className="pb-1.5">
                      <Stjarnor betyg={5} />
                      <div className="legend-text mt-1 text-xs text-muted-foreground">
                        av 5 möjliga
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {BETYG.map((b) => (
                      <div key={b.stjarnor} className="flex items-center gap-3">
                        <span className="legend-text w-7 shrink-0 text-right text-xs text-muted-foreground">
                          {b.stjarnor} ★
                        </span>
                        <Progress value={(b.antal / 312) * 100} className="grow" />
                        <span className="w-8 shrink-0 text-right font-mono text-xs">{b.antal}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Quote data-slot="icon" /> Skriv i gästboken
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="map-caps text-base">Skriv i gästboken</DialogTitle>
                        <DialogDescription className="legend-text">
                          Omdömet införes i nästa års resehandbok, om utrymmet så medger.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-2">
                        <div className="space-y-1.5">
                          <Label htmlFor="g-namn" className="legend-text">Namn och ort</Label>
                          <Input id="g-namn" placeholder="Fru G. Lindqvist, Lund" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="legend-text">Betyg</Label>
                          <Select defaultValue="5">
                            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {[5, 4, 3, 2, 1].map((n) => (
                                <SelectItem key={n} value={String(n)}>
                                  {"★".repeat(n)}{"☆".repeat(5 - n)} — {n} av 5
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="g-text" className="legend-text">Omdöme</Label>
                          <Textarea id="g-text" placeholder="Skriv kort och läsligt, med bläck…" />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="ghost">Avstå</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            onClick={() => toast("OMDÖME MOTTAGET STOP", {
                              description: "INFÖRES I RESEHANDBOKEN 1952 STOP",
                            })}
                          >
                            <Send data-slot="icon" /> Lämna omdöme
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>

              {/* the guest-book pages — arrows ride in the mx gutter */}
              <div className="min-w-0">
                <Carousel className="mx-12" opts={{ align: "start", loop: true }}>
                  <CarouselContent>
                    {GASTBOK.map((g) => (
                      <CarouselItem key={g.namn} className="md:basis-1/2">
                        <Card className="h-full">
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <Avatar><AvatarFallback>{g.initialer}</AvatarFallback></Avatar>
                              <div>
                                <CardTitle className="legend-text text-sm">{g.namn}</CardTitle>
                                <CardDescription className="legend-text text-xs">
                                  {g.ort} · {g.datum}
                                </CardDescription>
                              </div>
                              <Quote className="ml-auto size-5 shrink-0 text-foreground/25" />
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <Stjarnor betyg={g.betyg} />
                            <p className="font-heading text-sm italic leading-relaxed">
                              „{g.text}”
                            </p>
                            {g.marke && <Badge variant="outline">{g.marke}</Badge>}
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>
        </section>

        {/* ============ THE PAPER — värdshus & logi, rooms by wire ============ */}
        <section className="border-t border-foreground/40">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
            <div className="mb-8 flex items-baseline gap-4">
              <h2 className="map-caps text-lg">Värdshus &amp; logi</h2>
              <div className="grow rule-railway text-foreground/60" />
              <span className="font-heading text-sm italic text-muted-foreground">
                rum anvisas genom byrån · pris per dygn
              </span>
            </div>
            <ItemGroup className="gap-3">
              {VARDSHUS.map((v) => (
                <Item key={v.namn} variant="outline" className="bg-card">
                  <ItemMedia variant="icon"><v.icon /></ItemMedia>
                  <ItemContent>
                    <ItemTitle className="legend-text">
                      {v.namn} <Badge variant={v.badge.variant}>{v.badge.label}</Badge>
                    </ItemTitle>
                    <ItemDescription className="legend-text">{v.blurb}</ItemDescription>
                  </ItemContent>
                  <ItemActions className="gap-4">
                    <span className="font-mono text-lg">{v.pris} kr</span>
                    <ButtonGroup>
                      <Button
                        size="sm" variant="outline"
                        onClick={() => toast("RUM TINGAT STOP", {
                          description: `${v.namn.toUpperCase()} INVÄNTAR EDER STOP`,
                        })}
                      >
                        <BedDouble data-slot="icon" /> Tinga rum
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone data-slot="icon" /> Ring växeln
                      </Button>
                    </ButtonGroup>
                  </ItemActions>
                </Item>
              ))}
            </ItemGroup>
            {/* the off-season: an empty state, honestly declared */}
            <Empty className="mt-6 border border-dashed border-foreground/30">
              <EmptyHeader>
                <EmptyMedia variant="icon"><Snowflake /></EmptyMedia>
                <EmptyTitle className="map-caps text-sm">Vintersäsongen vilar</EmptyTitle>
                <EmptyDescription className="legend-text">
                  Inga logier förmedlas november–mars. Byrån öppnar åter i april,
                  då isarna släppt.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        </section>

        {/* ============ THE MEADOW — booking blankett band ============ */}
        <section className="bg-meadow/70 dark:bg-meadow/45">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
            <div className="mb-8 flex items-baseline gap-4">
              <h2 className="map-caps text-lg">Anmälan till utflykt</h2>
              <div className="grow rule-railway text-foreground/60" />
              <span className="font-heading text-sm italic text-foreground/70">Blankett 7 B</span>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <Card className="chamfer">
                <CardHeader>
                  <CardTitle className="map-caps text-sm">Reseanmälan</CardTitle>
                  <CardDescription className="legend-text">
                    Ifylles med bläck och insändes senast åtta dagar före avresa.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="s-name" className="legend-text">Fullständigt namn</Label>
                    <Input id="s-name" placeholder="Nils Holgersson" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="legend-text">Avresestation</Label>
                    <Select defaultValue="malmo">
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="malmo">Malmö C</SelectItem>
                        <SelectItem value="lund">Lund C</SelectItem>
                        <SelectItem value="hbg">Helsingborg F</SelectItem>
                        <SelectItem value="ystad">Ystad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label className="legend-text">Sällskapets storlek — {sallskap[0]} personer</Label>
                    <Slider value={sallskap} onValueChange={setSallskap} min={1} max={12} step={1} />
                  </div>
                  <RadioGroup defaultValue="tredje" className="gap-1.5">
                    <Label className="legend-text text-muted-foreground">Vagnklass</Label>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="andra" id="s-r2" />
                      <Label htmlFor="s-r2" className="legend-text">2:a klass</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="tredje" id="s-r3" />
                      <Label htmlFor="s-r3" className="legend-text">3:e klass</Label>
                    </div>
                  </RadioGroup>
                  <div className="space-y-3">
                    <Label className="legend-text text-muted-foreground">Tillval</Label>
                    <div className="flex items-center gap-2">
                      <Checkbox id="s-c1" defaultChecked />
                      <Label htmlFor="s-c1" className="legend-text">Matsäckslåda (1:25 kr)</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="s-c2" />
                      <Label htmlFor="s-c2" className="legend-text">Badbiljett, kallbadhus</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch id="s-tel" size="sm" defaultChecked />
                      <Label htmlFor="s-tel" className="legend-text">Telegrafisk bekräftelse</Label>
                    </div>
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="s-notes" className="legend-text">Särskilda önskemål</Label>
                    <Textarea
                      id="s-notes"
                      placeholder="Fönsterplats i rökfri kupé, om sådan finnes…"
                    />
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button onClick={() => toast("ANMÄLAN MOTTAGEN STOP", {
                    description: "BEKRÄFTELSE FÖLJER PER TELEGRAF INOM TVÅ DAGAR STOP",
                  })}>
                    <Send data-slot="icon" /> Insänd anmälan
                  </Button>
                  <Button variant="ghost">Rensa blanketten</Button>
                </CardFooter>
              </Card>

              {/* flex gap, not space-y: the card's own m-2 would override a
                  space-y margin, and the neatline prints 7px outside it */}
              <div className="flex flex-col gap-10">
                <Card size="sm" className="frame-double m-2 w-fit ring-0">
                  <CardHeader>
                    <CardTitle className="map-caps text-sm">Välj resdag</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      locale={sv}
                      defaultMonth={resdag}
                      selected={resdag}
                      onSelect={setResdag}
                      className="p-0"
                    />
                  </CardContent>
                </Card>
                <Alert variant="sea">
                  <Waves />
                  <AlertTitle className="legend-text font-semibold">Sjörapport</AlertTitle>
                  <AlertDescription className="legend-text">
                    Ångaren till Ven inställes vid hård västlig vind. Besked lämnas å kajen kl 07.30.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </section>

        {/* ============ THE SAND — questions on the dune tint ============ */}
        <section className="border-t border-foreground/40 bg-sand/60 dark:bg-sand/45">
          <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
            <div className="mb-8 flex items-baseline gap-4">
              <h2 className="map-caps text-lg">Ur frågelådan</h2>
              <div className="grow rule-railway text-foreground/60" />
            </div>
            <Accordion type="single" collapsible defaultValue="q1">
              <AccordionItem value="q1">
                <AccordionTrigger className="legend-text">Får cykel medtagas på tåget?</AccordionTrigger>
                <AccordionContent className="legend-text text-muted-foreground">
                  Ja, i resgodsvagnen mot en avgift om 75 öre. Tandemcykel räknas som två cyklar
                  och bör anmälas i förväg till stationsinspektoren.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger className="legend-text">Vad sker vid regn?</AccordionTrigger>
                <AccordionContent className="legend-text text-muted-foreground">
                  Utflykterna genomföras i alla väder. Regnkappa rekommenderas; vid Skäralid finnes
                  raststuga med kamin och torkrum.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger className="legend-text">Kan biljett återlösas?</AccordionTrigger>
                <AccordionContent className="legend-text text-muted-foreground">
                  Biljett återlöses till fullo intill tre dagar före avresan, därefter till halva
                  beloppet. Telegrafera <span className="font-mono">SKÅNELINJEN MALMÖ</span>.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      {/* ============ LÄNSGRÄNS GREEN — the colophon footer ============ */}
      {/* night litho: the colophon stays deep länsgräns green with pale
          lettering — never a bright block after dark */}
      <footer className="bg-boundary text-boundary-foreground dark:bg-[#22301F] dark:text-[#C9D8C6]">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
          <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div>
              <div className="map-caps text-base font-semibold tracking-[0.3em]">Skånelinjen</div>
              <p className="font-heading mt-3 max-w-xs text-sm italic opacity-80">
                Utflykter i Skåne sedan 1897 — i samtrafik med Statens Järnvägar och
                Landskrona–Ven ångfärjor.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <Anchor className="size-4 opacity-70" />
                <Waves className="size-4 opacity-70" />
                <TrainFront className="size-4 opacity-70" />
                <Separator orientation="vertical" className="h-4! bg-boundary-foreground/40" />
                <span className="legend-text text-xs opacity-70">Malmö · Lund · Kristianstad</span>
              </div>
            </div>
            {[
              {
                rubrik: "Byrån",
                rader: [
                  { rad: "Om Skånelinjen", href: "#site" },
                  { rad: "Reseledarna", href: "#site" },
                  { rad: "Årsberättelse 1950", href: "#site" },
                ],
              },
              {
                rubrik: "Trafiken",
                rader: [
                  { rad: "Sommartidtabell", href: "#site" },
                  { rad: "Kartblad", href: "#site" },
                  { rad: "Ångfärjor", href: "#site" },
                ],
              },
              {
                rubrik: "Temat",
                rader: [
                  { rad: "Komponentbiblioteket", href: "#components" },
                  { rad: "Installation", href: "#installation" },
                  { rad: "Källorna på GitHub", href: REPO_URL },
                ],
              },
            ].map((kol) => (
              <div key={kol.rubrik}>
                <div className="map-caps mb-4 text-xs opacity-70">{kol.rubrik}</div>
                <ul className="space-y-2">
                  {kol.rader.map(({ rad, href }) => (
                    <li key={rad}>
                      <a href={href} className="legend-text text-sm underline-offset-4 hover:underline">
                        {rad}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="my-8 bg-boundary-foreground/30" />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="legend-text text-xs opacity-70">
              För publicering godkänd i rikets allmänna kartverk den 22 oktober 1951.
            </span>
            <span className="map-caps-wide text-xs opacity-70">Generalstabens Litografiska Anstalt</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
