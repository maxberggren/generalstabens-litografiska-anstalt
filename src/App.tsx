import { useEffect, useState } from "react"
import { sv } from "react-day-picker/locale"
import { toast } from "sonner"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ButtonGroup } from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel"
import {
  type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import {
  Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger,
} from "@/components/ui/menubar"
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Toaster } from "@/components/ui/sonner"
import { Spinner } from "@/components/ui/spinner"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  MapPin, Anchor, TrainFront, Moon, Sun, Landmark, Compass, Send, Mountain, Waves,
  Search, Plus, Minus, Ruler, ZoomIn, Printer, ChevronsUpDown, Trees,
} from "lucide-react"

/* ---------------------------------------------------------------- */

function SectionTitle({ no, children }: { no: string; children: React.ReactNode }) {
  return (
    <div className="mt-24 mb-10 flex items-baseline gap-4">
      <span className="font-heading text-2xl italic text-primary">{no}</span>
      <h2 className="map-caps text-lg text-foreground">{children}</h2>
      <div className="grow rule-railway text-foreground/60" />
    </div>
  )
}

function Swatch({ name, cssVar, note }: { name: string; cssVar: string; note?: string }) {
  return (
    <div className="flex flex-col">
      <div
        className="h-16 rounded-sm border border-foreground/30 shadow-[inset_0_0_0_2px_var(--card)]"
        style={{ background: `var(${cssVar})` }}
      />
      <div className="legend-text mt-1.5 text-sm leading-tight">{name}</div>
      <div className="font-mono text-[11px] text-muted-foreground">{cssVar}</div>
      {note && <div className="legend-text text-xs text-muted-foreground italic">{note}</div>}
    </div>
  )
}

const RAMP = [
  { v: "--dune", label: "150–200 m" },
  { v: "--apricot", label: "100–150 m" },
  { v: "--sand", label: "50–100 m" },
  { v: "--pasture", label: "25–50 m" },
  { v: "--meadow", label: "0–25 m" },
  { v: "--shallows", label: "grundare än 5 m" },
  { v: "--sea", label: "djupare än 5 m" },
]

const TOWNS = [
  { town: "Malmö", role: "Stad", line: "Södra stambanan", pop: "192 909", mark: "stad" },
  { town: "Kristianstad", role: "Residensstad", line: "Blekinge kustbana", pop: "27 207", mark: "stad" },
  { town: "Båstad", role: "Köping", line: "Västkustbanan", pop: "2 815", mark: "koping" },
  { town: "Kivik", role: "Municipalsamhälle", line: "Landsväg", pop: "1 102", mark: "by" },
  { town: "Mölle", role: "Fiskeläge", line: "Landsväg", pop: "743", mark: "by" },
]

const PROFILE = [
  { ort: "Öresund", h: 0 },
  { ort: "Ven", h: 32 },
  { ort: "Lund", h: 42 },
  { ort: "Ringsjön", h: 54 },
  { ort: "Söderåsen", h: 124 },
  { ort: "Linderödsåsen", h: 196 },
  { ort: "Brösarp", h: 92 },
  { ort: "Åspet", h: 2 },
]

const profileConfig = {
  h: { label: "Höjd ö.h. (m)", color: "var(--chart-4)" },
} satisfies ChartConfig

const HARADER = [
  "Bjäre härad", "Norra Åsbo härad", "Södra Åsbo härad", "Luggude härad", "Rönnebergs härad",
  "Onsjö härad", "Harjagers härad", "Frosta härad", "Färs härad", "Torna härad", "Bara härad",
  "Oxie härad", "Skytts härad", "Vemmenhögs härad", "Ljunits härad", "Herrestads härad",
  "Ingelstads härad", "Järrestads härad", "Albo härad", "Gärds härad", "Villands härad",
  "Östra Göinge härad", "Västra Göinge härad",
]

export default function App() {
  const [dark, setDark] = useState(false)
  const [progress, setProgress] = useState(20)
  const [almanac, setAlmanac] = useState<Date | undefined>(new Date(1951, 9, 22))

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  useEffect(() => {
    const t = setInterval(() => setProgress((p) => (p >= 100 ? 20 : p + 8)), 900)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="texture-paper min-h-screen">
      <Toaster position="bottom-right" />
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        {/* ============ SHEET HEADER — the map's title block ============ */}
        <header className="frame-double relative px-8 py-16 text-center">
          <div className="map-caps-wide mb-6 text-xs text-muted-foreground">
            Generalstabens Litografiska Anstalt · Stockholm
          </div>
          <h1 className="font-heading text-7xl font-black tracking-[0.08em] sm:text-8xl">
            SKÅNE
          </h1>
          <p className="font-heading mt-4 text-lg italic">
            Ett formspråk uppmätt och avritat efter 1951 års skolkarta
          </p>
          <p className="legend-text mt-2 text-sm text-muted-foreground">
            Skala 1:600 000 · För publicering godkänd i rikets allmänna kartverk
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Badge>Design System</Badge>
            <Badge variant="secondary">shadcn/ui</Badge>
            <Badge variant="outline">v1.0 · 1951</Badge>
          </div>
          <div className="absolute right-4 top-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setDark(!dark)}>
                  {dark ? <Sun /> : <Moon />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{dark ? "Dag — paper litho" : "Natt — night litho"}</TooltipContent>
            </Tooltip>
          </div>
        </header>

        {/* ============ 1 · PALETTE ============ */}
        <SectionTitle no="I.">Färgerna · The Litho Inks</SectionTitle>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          <Swatch name="Paper" cssVar="--background" note="aged wove stock" />
          <Swatch name="Ink" cssVar="--foreground" note="soft litho black" />
          <Swatch name="Stad-vermillion" cssVar="--primary" note="city dots, landskapsgräns" />
          <Swatch name="Öresund" cssVar="--secondary" note="open sea" />
          <Swatch name="Apricot" cssVar="--accent" note="ridge tint" />
          <Swatch name="Lowland" cssVar="--muted" note="sand plain" />
          <Swatch name="Länsgräns" cssVar="--boundary" note="county green" />
          <Swatch name="Card" cssVar="--card" note="legend-box paper" />
        </div>

        <Card className="chamfer mt-10">
          <CardHeader>
            <CardTitle className="map-caps text-sm">Landets höjd i meter över havet</CardTitle>
            <CardDescription className="legend-text">
              The hypsometric ramp, straight off the map legend — use it for sequential data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex overflow-hidden rounded-sm border border-foreground/40">
              {RAMP.map((r) => (
                <Tooltip key={r.v}>
                  <TooltipTrigger asChild>
                    <div className="h-14 grow" style={{ background: `var(${r.v})` }} />
                  </TooltipTrigger>
                  <TooltipContent className="font-mono text-xs">{`${r.label} · var(${r.v})`}</TooltipContent>
                </Tooltip>
              ))}
            </div>
            <div className="legend-text mt-2 flex justify-between text-xs text-muted-foreground">
              <span>← Linderödsåsen 150–200 m</span>
              <span>Vattendjup, Östersjön →</span>
            </div>
          </CardContent>
        </Card>

        {/* ============ 2 · TYPOGRAPHY ============ */}
        <SectionTitle no="II.">Typograferna · The Lettering</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="legend-text text-sm text-muted-foreground">
                Display — Bodoni Moda <span className="italic">(after the didone title lettering)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="font-heading text-6xl font-black">SKÅNE</div>
              <div className="font-heading text-3xl">Österlen &amp; Söderåsen</div>
              <div className="font-heading text-xl italic">Utarbetad av Isak Mattsson och Nils Sjögren</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="legend-text text-sm text-muted-foreground">
                Grotesque — Archivo <span className="italic">(after the Venus/Akzidenz map labels)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="map-caps text-base">Teckenförklaring</div>
              <div className="legend-text text-base">
                Köping och större municipalsamhälle — Archivo Narrow för förklaringar och tabeller.
              </div>
              <div className="font-mono text-sm">SKALA 1:600 000 · Courier Prime (1955)</div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="legend-text text-sm text-muted-foreground">
                Havets versaler — Josefin Sans{" "}
                <span className="italic">(after the hairline sea-name lettering; add .reverse-italic for the hydrographic backslant)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-secondary-foreground dark:text-secondary">
              <div className="map-caps-wide text-4xl">Östersjön</div>
              <div className="map-sea text-2xl">Öresund</div>
              <span className="legend-text text-sm text-muted-foreground block">
                .map-caps-wide — sea names, upright · .map-sea — the same lettering in reverse italic, as
                printed over open water · font-sea composes with reverse-italic for everything else.
              </span>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="legend-text text-sm text-muted-foreground">
                Vattnets kursiv — the hydrographic backslant{" "}
                <span className="italic">(reverse italic for water names, rebuilt with a 12° left skew)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-baseline gap-x-10 gap-y-3 text-secondary-foreground dark:text-secondary">
              <span className="map-water text-3xl">Skälderviken</span>
              <span className="map-water text-2xl">Hanöbukten</span>
              <span className="map-water text-xl">Helgeån</span>
              <span className="map-water text-xl">Ringsjön</span>
              <span className="reverse-italic legend-text text-base">
                Ivösjön — samma lutning på grotesken
              </span>
              <span className="legend-text text-sm text-muted-foreground">
                .map-water / .reverse-italic — use for anything liquid: streams of data, live feeds, flows.
              </span>
            </CardContent>
          </Card>
        </div>

        {/* ============ 3 · BUTTONS ============ */}
        <SectionTitle no="III.">Knapparna · Buttons</SectionTitle>
        <Card>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Button><MapPin data-slot="icon" /> Stad</Button>
            <Button variant="secondary"><Anchor data-slot="icon" /> Öresund</Button>
            <Button variant="outline"><TrainFront data-slot="icon" /> Järnväg</Button>
            <Button variant="ghost">Landsväg</Button>
            <Button variant="link">Sockengräns</Button>
            <Button variant="destructive">Riv upp rälsen</Button>
            <Separator orientation="vertical" className="h-8!" />
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" variant="outline"><Compass /></Button>
            <Button disabled>Nedlagd station</Button>
          </CardContent>
        </Card>

        {/* ============ 4 · FORMS ============ */}
        <SectionTitle no="IV.">Blanketten · Forms</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="chamfer">
            <CardHeader>
              <CardTitle className="map-caps text-sm">Resplan</CardTitle>
              <CardDescription className="legend-text">Anmälan till skolresa, vt 1951</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="legend-text">Fullständigt namn</Label>
                <Input id="name" placeholder="Nils Holgersson" />
              </div>
              <div className="space-y-1.5">
                <Label className="legend-text">Avresestation</Label>
                <Select defaultValue="malmo">
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="malmo">Malmö C</SelectItem>
                    <SelectItem value="lund">Lund</SelectItem>
                    <SelectItem value="ystad">Ystad</SelectItem>
                    <SelectItem value="simrishamn">Simrishamn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="notes" className="legend-text">Anteckningar</Label>
                <Textarea id="notes" placeholder="Medtag matsäck och regnkappa…" />
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button>Insänd</Button>
              <Button variant="ghost">Avbryt</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="map-caps text-sm">Kartinställningar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-2">
                <Checkbox id="c1" defaultChecked />
                <Label htmlFor="c1" className="legend-text">Visa häradsgräns</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="c2" />
                <Label htmlFor="c2" className="legend-text">Visa fyrar och fyrskepp</Label>
              </div>
              <RadioGroup defaultValue="600" className="space-y-1">
                <Label className="legend-text text-muted-foreground">Skala</Label>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="300" id="r1" /><Label htmlFor="r1" className="legend-text">1:300 000</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="600" id="r2" /><Label htmlFor="r2" className="legend-text">1:600 000</Label>
                </div>
              </RadioGroup>
              <div className="flex items-center gap-3">
                <Switch id="relief" defaultChecked />
                <Label htmlFor="relief" className="legend-text">Höjdskikt (hypsometri)</Label>
              </div>
              <div className="space-y-2">
                <Label className="legend-text">Vattendjup — 0 till 200 m</Label>
                <Slider defaultValue={[50]} max={200} step={25} />
              </div>
              <div className="space-y-2">
                <Label className="legend-text">Tryckning pågår…</Label>
                <Progress value={progress} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ============ 5 · BADGES & ALERTS ============ */}
        <SectionTitle no="V.">Beteckningar · Badges &amp; Alerts</SectionTitle>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge><span className="inline-block size-2 rounded-full bg-primary-foreground" />Stad</Badge>
            <Badge variant="secondary"><span className="inline-block size-2 rounded-full border-[1.5px] border-secondary-foreground" />Köping</Badge>
            <Badge variant="outline"><span className="inline-block size-1.5 rounded-full bg-foreground" />Municipalsamhälle</Badge>
            <Badge variant="destructive">Sanatorium</Badge>
            <Badge variant="ghost">Herresäte</Badge>
            <Badge variant="link">Kyrka</Badge>
          </div>
          <p className="legend-text text-sm text-muted-foreground">
            Beteckningar sätts som 1951: kvadratiskt, hårfin kontur, spärrad versal grotesk — fylld
            vermillion för stad, ring för köping, punkt för mindre ort.
          </p>
          <Alert>
            <Landmark />
            <AlertTitle className="legend-text font-semibold">För allmän trafik upplåten järnväg</AlertTitle>
            <AlertDescription className="legend-text">
              Tåget mot Simrishamn avgår från spår 2. Byte i Tomelilla för resande mot Sankt Olof.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <MapPin />
            <AlertTitle className="legend-text font-semibold">Mosse och sankmark</AlertTitle>
            <AlertDescription className="legend-text">
              Sankmark föreligger nordost om Hässleholm — framkomligheten är begränsad.
            </AlertDescription>
          </Alert>
        </div>

        {/* ============ 6 · TABLE ============ */}
        <SectionTitle no="VI.">Tabellen · Table</SectionTitle>
        <Card>
          <CardContent>
            <Table>
              <TableCaption className="legend-text">
                Orter efter 1951 års folkräkning — stadsmarkering i stad-vermillion.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="map-caps text-xs">Ort</TableHead>
                  <TableHead className="map-caps text-xs">Beteckning</TableHead>
                  <TableHead className="map-caps text-xs">Förbindelse</TableHead>
                  <TableHead className="map-caps text-xs text-right">Folkmängd</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TOWNS.map((t) => (
                  <TableRow key={t.town}>
                    <TableCell className="font-medium">
                      <span
                        className={
                          "mr-2 inline-block rounded-full " +
                          (t.mark === "stad"
                            ? "size-3 bg-primary"
                            : t.mark === "koping"
                              ? "size-2.5 border-2 border-primary bg-transparent"
                              : "size-1.5 bg-foreground")
                        }
                      />
                      {t.town}
                    </TableCell>
                    <TableCell className="legend-text">{t.role}</TableCell>
                    <TableCell className="legend-text italic">{t.line}</TableCell>
                    <TableCell className="text-right font-mono text-sm">{t.pop}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* ============ 7 · CHART INKS ============ */}
        <SectionTitle no="VII.">Diagrammet · Chart Inks</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle className="map-caps text-sm">Profil över sträckningen Ven — Ringsjön — Åspet</CardTitle>
            <CardDescription className="legend-text">chart-1 … chart-5 as litho spot inks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-40 items-end gap-3">
              {[
                { h: "35%", v: "--chart-3", l: "Öresund" },
                { h: "55%", v: "--chart-2", l: "Ven" },
                { h: "40%", v: "--chart-5", l: "Slätten" },
                { h: "78%", v: "--chart-4", l: "Söderåsen" },
                { h: "100%", v: "--chart-1", l: "Linderödsåsen" },
              ].map((b) => (
                <div key={b.l} className="flex grow flex-col items-center gap-1 self-stretch justify-end">
                  <div className="w-full rounded-t-sm border border-foreground/25" style={{ height: b.h, background: `var(${b.v})` }} />
                  <span className="legend-text text-[11px] text-muted-foreground">{b.l}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ============ 8 · SURFACES & PATTERNS ============ */}
        <SectionTitle no="VIII.">Markslagen · Patterns</SectionTitle>
        <div className="grid gap-6 sm:grid-cols-3">
          <Card className="pattern-marsh text-foreground/50">
            <CardHeader>
              <CardTitle className="legend-text text-sm text-foreground">Mosse och sankmark</CardTitle>
              <CardDescription className="legend-text text-muted-foreground">.pattern-marsh — dot stipple</CardDescription>
            </CardHeader>
          </Card>
          <Card className="pattern-hatch text-foreground/40">
            <CardHeader>
              <CardTitle className="legend-text text-sm text-foreground">Kolförande område</CardTitle>
              <CardDescription className="legend-text text-muted-foreground">.pattern-hatch — 45° hatch</CardDescription>
            </CardHeader>
          </Card>
          <Card className="chamfer">
            <CardHeader>
              <CardTitle className="legend-text text-sm">Teckenförklaring</CardTitle>
              <CardDescription className="legend-text text-muted-foreground">.chamfer — the legend box cut corner</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* ============ 9 · INTERACTIVE ============ */}
        <SectionTitle no="IX.">Apparaterna · Overlays</SectionTitle>
        <Card>
          <CardContent className="flex flex-wrap items-center gap-4">
            <Dialog>
              <DialogTrigger asChild><Button variant="outline">Öppna kartblad (Dialog)</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-heading text-2xl">Kartblad 12 — Österlen</DialogTitle>
                  <DialogDescription className="legend-text">
                    Detta blad omfattar kuststräckan Kivik–Sandhammaren med Stenshuvud nationalpark.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button>Beställ tryck</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline">Välj härad (Menu)</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="map-caps text-xs">Härader</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Bjäre härad</DropdownMenuItem>
                <DropdownMenuItem>Gärds härad</DropdownMenuItem>
                <DropdownMenuItem>Albo härad</DropdownMenuItem>
                <DropdownMenuItem>Villands härad</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Tooltip>
              <TooltipTrigger asChild><Button variant="ghost">Fyrskepp (Tooltip)</Button></TooltipTrigger>
              <TooltipContent className="legend-text">Falsterbo rev — fyrskepp sedan 1844</TooltipContent>
            </Tooltip>

            <div className="flex items-center gap-2">
              <Avatar><AvatarFallback className="bg-secondary text-secondary-foreground font-heading">IM</AvatarFallback></Avatar>
              <Avatar><AvatarFallback className="bg-accent text-accent-foreground font-heading">NS</AvatarFallback></Avatar>
              <span className="legend-text text-sm text-muted-foreground italic">Mattsson &amp; Sjögren</span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Tabs defaultValue="skane" className="gap-0">
            <TabsList>
              <TabsTrigger value="skane">Skåne</TabsTrigger>
              <TabsTrigger value="blekinge">Blekinge</TabsTrigger>
              <TabsTrigger value="halland">Halland</TabsTrigger>
              <TabsTrigger value="smaland" disabled>Småland</TabsTrigger>
            </TabsList>
            <TabsContent value="skane">
              <Card size="sm" className="border border-t-0 border-foreground/60 ring-0">
                <CardContent className="legend-text">
                  Skånes yta är 11 027 km² — slättland i sydväst, ås- och skogsbygd i nordost. Residensstäder:
                  Malmö och Kristianstad.
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="blekinge">
              <Card size="sm" className="border border-t-0 border-foreground/60 ring-0"><CardContent className="legend-text">Blekinge — med Karlskrona som residensstad och örlogsbas.</CardContent></Card>
            </TabsContent>
            <TabsContent value="halland">
              <Card size="sm" className="border border-t-0 border-foreground/60 ring-0"><CardContent className="legend-text">Halland — kustslätt längs Kattegatt, residensstad Halmstad.</CardContent></Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="a">
              <AccordionTrigger className="legend-text">Vad betyder de röda gränserna?</AccordionTrigger>
              <AccordionContent className="legend-text">
                Den grova röd-gröna bården är landskapsgräns; enkel röd linje är läns- och häradsgräns, tunn
                röd linje sockengräns.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger className="legend-text">Varför är höglandet orange?</AccordionTrigger>
              <AccordionContent className="legend-text">
                Hypsometrisk färgskala: havet blått, slätten gulvit, och stigande terräng allt varmare —
                Linderödsåsens topp når 150–200 m och trycks i den djupaste apricoten.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="c">
              <AccordionTrigger className="legend-text">Vem tryckte kartan?</AccordionTrigger>
              <AccordionContent className="legend-text">
                Generalstabens Litografiska Anstalt, Stockholm 1951, för P.A. Norstedt &amp; Söners Förlag.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* ============ 10 · WAYFINDING ============ */}
        <SectionTitle no="X.">Registret · Wayfinding</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="map-caps text-sm">Rutten &amp; kartbladen</CardTitle>
              <CardDescription className="legend-text">Breadcrumb as a plotted route, Pagination as the sheet index.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Breadcrumb>
                <BreadcrumbList className="legend-text">
                  <BreadcrumbItem><BreadcrumbLink href="#">Sverige</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator><span className="text-primary">»</span></BreadcrumbSeparator>
                  <BreadcrumbItem><BreadcrumbLink href="#">Malmöhus län</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator><span className="text-primary">»</span></BreadcrumbSeparator>
                  <BreadcrumbItem><BreadcrumbPage>Malmö</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Pagination className="justify-start">
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                  <PaginationItem><PaginationLink href="#">11</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#" isActive>12</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#">13</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationNext href="#" /></PaginationItem>
                </PaginationContent>
              </Pagination>
              <div className="legend-text flex items-center gap-2 text-sm text-muted-foreground">
                <KbdGroup><Kbd>Ctrl</Kbd><Kbd>K</Kbd></KbdGroup>
                öppnar ortregistret — tangenter satta som lösa typer.
              </div>
              <div className="space-y-2">
                <Label>Tryckta skikt (Toggle Group)</Label>
                <ToggleGroup type="multiple" defaultValue={["hojd", "jarnvag"]} variant="outline" className="gap-1.5">
                  <ToggleGroupItem value="hojd"><Mountain data-slot="icon" />Höjdskikt</ToggleGroupItem>
                  <ToggleGroupItem value="jarnvag"><TrainFront data-slot="icon" />Järnväg</ToggleGroupItem>
                  <ToggleGroupItem value="vatten"><Waves data-slot="icon" />Vattendjup</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardContent>
          </Card>
          <Card className="chamfer">
            <CardHeader>
              <CardTitle className="map-caps text-sm">Ortregistret (Command)</CardTitle>
              <CardDescription className="legend-text">Sök i 1951 års ortförteckning.</CardDescription>
            </CardHeader>
            <CardContent>
              <Command className="border border-foreground/40 bg-background">
                <CommandInput placeholder="Sök ort eller vatten…" />
                <CommandList>
                  <CommandEmpty className="legend-text">Vita fläckar — intet funnet.</CommandEmpty>
                  <CommandGroup heading="Städer">
                    <CommandItem><span className="mr-1 inline-block size-2.5 rounded-full bg-primary" />Malmö</CommandItem>
                    <CommandItem><span className="mr-1 inline-block size-2.5 rounded-full bg-primary" />Lund</CommandItem>
                    <CommandItem><span className="mr-1 inline-block size-2 rounded-full border-2 border-primary" />Båstad</CommandItem>
                  </CommandGroup>
                  <CommandGroup heading="Vatten">
                    <CommandItem><span className="map-water">Ringsjön</span></CommandItem>
                    <CommandItem><span className="map-water">Ivösjön</span></CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </CardContent>
          </Card>
        </div>

        {/* ============ 11 · SIGNALS & STATES ============ */}
        <SectionTitle no="XI.">Posten · Signals &amp; States</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="map-caps text-sm">Depescher</CardTitle>
              <CardDescription className="legend-text">Toasts arrive as telegrams; grave decisions get a stamped notice.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() =>
                  toast("Telegram anlänt", {
                    description: "MALMÖ C KL 14.32 STOP TÅGET I TID STOP INVÄNTA BESKED STOP",
                  })
                }
              >
                <Send data-slot="icon" /> Skicka telegram
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Makulera kartblad</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-heading text-2xl">Makulera kartblad 12?</AlertDialogTitle>
                    <AlertDialogDescription className="legend-text">
                      Bladet dras ur registret och sänds till pappersbruket. Åtgärden kan icke ångras.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Avbryt</AlertDialogCancel>
                    <AlertDialogAction onClick={() => toast.error("Kartblad 12 makulerat", { description: "SÄNT TILL PAPPERSBRUKET STOP" })}>
                      Makulera
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Sheet>
                <SheetTrigger asChild><Button variant="outline">Vik ut fliken (Sheet)</Button></SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="font-heading text-2xl">Teckenförklaring</SheetTitle>
                    <SheetDescription className="legend-text">
                      Den utvikta fliken — sidopanelen bär legendens innehåll.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="legend-text space-y-3 px-4 text-sm">
                    <div><span className="mr-2 inline-block size-3 rounded-full bg-primary" />Stad</div>
                    <div><span className="mr-2 inline-block size-2.5 rounded-full border-2 border-primary" />Köping</div>
                    <div><span className="mr-2 inline-block size-1.5 rounded-full bg-foreground" />Annan viktigare ort</div>
                    <div className="rule-railway text-foreground/60" />
                    <div>Järnväg för allmän trafik</div>
                  </div>
                </SheetContent>
              </Sheet>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link">I. Mattsson (HoverCard)</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-72">
                  <div className="flex gap-3">
                    <Avatar><AvatarFallback className="bg-secondary text-secondary-foreground font-heading">IM</AvatarFallback></Avatar>
                    <div>
                      <div className="font-heading text-base">Isak Mattsson</div>
                      <p className="legend-text text-sm text-muted-foreground">
                        Kartograf. Utarbetade Skånebladet 1951 tillsammans med Nils Sjögren.
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </CardContent>
          </Card>
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="map-caps text-sm">Under tryckning (Skeleton)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-7 w-2/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <div className="legend-text flex items-center gap-2 pt-1 text-sm text-muted-foreground">
                  <Spinner /> Stentrycket torkar — kompassen söker norr…
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Empty className="py-8">
                  <EmptyHeader>
                    <EmptyMedia variant="icon" className="rounded-full border border-foreground/40 bg-transparent">
                      <Compass className="text-primary" />
                    </EmptyMedia>
                    <EmptyTitle className="map-caps text-sm">Vita fläckar</EmptyTitle>
                    <EmptyDescription className="legend-text">
                      Här finns ännu intet kartlagt. Sänd en expedition.
                    </EmptyDescription>
                  </EmptyHeader>
                  <Button size="sm" variant="outline">Utrusta expedition</Button>
                </Empty>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ============ 12 · TIME & CODES ============ */}
        <SectionTitle no="XII.">Almanackan · Time &amp; Codes</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="chamfer">
            <CardHeader>
              <CardTitle className="map-caps text-sm">Oktober 1951 (Calendar)</CardTitle>
              <CardDescription className="legend-text">
                Den 22:a — dagen kartan godkändes för publicering.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                locale={sv}
                selected={almanac}
                onSelect={setAlmanac}
                defaultMonth={new Date(1951, 9)}
                className="mx-auto"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="map-caps text-sm">Smått &amp; gott</CardTitle>
              <CardDescription className="legend-text">InputOTP · Field · InputGroup · ButtonGroup · Item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Field>
                <FieldLabel htmlFor="depesch">Depeschkod (InputOTP)</FieldLabel>
                <InputOTP maxLength={6} id="depesch">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <FieldDescription className="legend-text">Sex tecken, mottagna per telegraf.</FieldDescription>
              </Field>
              <div className="flex flex-wrap items-end gap-4">
                <InputGroup className="w-56">
                  <InputGroupInput placeholder="Sök i registret…" />
                  <InputGroupAddon><Search /></InputGroupAddon>
                </InputGroup>
                <ButtonGroup>
                  <Button variant="outline" size="icon" aria-label="Zooma ut"><Minus /></Button>
                  <Button variant="outline" size="icon" aria-label="Zooma in"><Plus /></Button>
                </ButtonGroup>
              </div>
              <Item variant="outline">
                <ItemMedia variant="icon"><Trees /></ItemMedia>
                <ItemContent>
                  <ItemTitle className="legend-text font-semibold">Stenshuvud</ItemTitle>
                  <ItemDescription className="legend-text">Nationalpark sedan 1986 — på 1951 års blad: utsiktsberg.</ItemDescription>
                </ItemContent>
                <ItemActions><Button size="sm" variant="ghost">Visa</Button></ItemActions>
              </Item>
            </CardContent>
          </Card>
        </div>

        {/* ============ 13 · SHEETS & PANES ============ */}
        <SectionTitle no="XIII.">Kartbladen · Sheets &amp; Panes</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="map-caps text-sm">Bläddra i serien (Carousel)</CardTitle>
            </CardHeader>
            <CardContent>
              <Carousel className="mx-10">
                <CarouselContent>
                  {[
                    { n: "11", name: "Öresund", v: "--sea" },
                    { n: "12", name: "Slätten", v: "--sand" },
                    { n: "13", name: "Åsarna", v: "--apricot" },
                    { n: "14", name: "Skogsbygden", v: "--meadow" },
                  ].map((blad) => (
                    <CarouselItem key={blad.n} className="basis-1/2">
                      <div
                        className="flex h-36 flex-col items-center justify-center gap-1 border border-foreground/50"
                        style={{ background: `var(${blad.v})` }}
                      >
                        <span className="font-heading text-3xl font-black">{blad.n}</span>
                        <span className="map-caps text-xs">{blad.name}</span>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="map-caps text-sm">Land &amp; hav (Resizable)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResizablePanelGroup orientation="horizontal" className="h-36 border border-foreground/50">
                <ResizablePanel defaultSize={60}>
                  <div className="flex h-full items-center justify-center bg-lowland">
                    <span className="map-caps text-xs">Land</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={40}>
                  <div className="flex h-full items-center justify-center bg-sea">
                    <span className="map-caps-wide text-xs">Hav</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
              <p className="legend-text mt-2 text-xs text-muted-foreground">Dra i handtaget — kustlinjen är förhandlingsbar.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="map-caps text-sm">Häradsförteckning (ScrollArea + Collapsible)</CardTitle>
            </CardHeader>
            <CardContent>
              <Collapsible defaultOpen>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm"><ChevronsUpDown data-slot="icon" /> Skånes 23 härader</Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ScrollArea className="mt-2 h-40 border border-foreground/40 bg-background px-3 py-2">
                    <ul className="legend-text space-y-1 text-sm">
                      {HARADER.map((h) => (
                        <li key={h}><span className="mr-2 inline-block size-1.5 rounded-full bg-foreground align-middle" />{h}</li>
                      ))}
                    </ul>
                  </ScrollArea>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="map-caps text-sm">Kartfickan (Drawer)</CardTitle>
              <CardDescription className="legend-text">Bottenlådan där lösa blad förvaras.</CardDescription>
            </CardHeader>
            <CardContent>
              <Drawer>
                <DrawerTrigger asChild><Button variant="outline">Öppna kartfickan</Button></DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle className="font-heading text-2xl">Kartfickan</DrawerTitle>
                    <DrawerDescription className="legend-text">
                      Lösa blad, profiler och en bit snöre. Dra igen lådan när du är klar.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="mx-auto flex gap-3 pb-8">
                    <Badge variant="outline">Blad 11</Badge>
                    <Badge variant="outline">Blad 12</Badge>
                    <Badge variant="secondary">Profil Ven—Åspet</Badge>
                  </div>
                </DrawerContent>
              </Drawer>
            </CardContent>
          </Card>
        </div>

        {/* ============ 14 · DESK & MENUS ============ */}
        <SectionTitle no="XIV.">Skrivbordet · Desk &amp; Menus</SectionTitle>
        <Card>
          <CardContent className="flex flex-wrap items-center gap-6">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Arkiv</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Nytt kartblad</MenubarItem>
                  <MenubarItem><Printer data-slot="icon" /> Sänd till tryck</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem variant="destructive">Makulera</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Visa</MenubarTrigger>
                <MenubarContent>
                  <MenubarCheckboxItem checked>Höjdskikt</MenubarCheckboxItem>
                  <MenubarCheckboxItem>Sockengränser</MenubarCheckboxItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Kartor</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-56 gap-1 p-1">
                      <NavigationMenuLink href="#" className="legend-text">Skåne-bladet 1951</NavigationMenuLink>
                      <NavigationMenuLink href="#" className="legend-text">Blekinge-bladet 1949</NavigationMenuLink>
                      <NavigationMenuLink href="#" className="legend-text">Halland-bladet 1953</NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="map-caps px-2.5 text-xs">Register</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <ContextMenu>
              <ContextMenuTrigger asChild>
                <div className="legend-text flex h-20 grow items-center justify-center border border-dashed border-foreground/50 px-6 text-sm text-muted-foreground">
                  Högerklicka på kartan (ContextMenu)
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem><ZoomIn data-slot="icon" /> Zooma till härad</ContextMenuItem>
                <ContextMenuItem><MapPin data-slot="icon" /> Markera stad</ContextMenuItem>
                <ContextMenuItem><Ruler data-slot="icon" /> Mät avstånd</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem variant="destructive">Radera anteckning</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </CardContent>
        </Card>

        {/* ============ 15 · THE PROFILE CHART ============ */}
        <SectionTitle no="XV.">Profilen · Chart</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle className="map-caps text-sm">Profil över sträckningen Ven — Ringsjön — Åspet</CardTitle>
            <CardDescription className="legend-text">
              Recharts genom ChartContainer — höjdprofilen ur kartans nederkant, tryckt i dune-orange.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={profileConfig} className="h-56 w-full">
              <AreaChart data={PROFILE} margin={{ left: 0, right: 12, top: 8 }}>
                <CartesianGrid vertical={false} strokeDasharray="2 4" stroke="var(--foreground)" strokeOpacity={0.25} />
                <XAxis
                  dataKey="ort"
                  tickLine={false}
                  axisLine={{ stroke: "var(--foreground)", strokeOpacity: 0.6 }}
                  tick={{ fontFamily: "Courier Prime, monospace", fontSize: 11 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  width={36}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontFamily: "Courier Prime, monospace", fontSize: 11 }}
                  unit=" m"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  dataKey="h"
                  type="natural"
                  fill="var(--color-h)"
                  fillOpacity={0.55}
                  stroke="var(--foreground)"
                  strokeWidth={1.25}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* ============ FOOTER ============ */}
        <footer className="mt-20 border-t-2 border-foreground/70 pt-6 pb-10 text-center">
          <div className="rule-railway mx-auto mb-6 w-48 text-foreground/60" />
          <p className="legend-text text-sm text-muted-foreground">
            P.A. Norstedt &amp; Söners Förlag · För publicering godkänd i rikets allmänna kartverk den 22 oktober 1951
          </p>
          <p className="map-caps mt-2 text-xs text-muted-foreground">Generalstaben · Nittonhundrafemtioett</p>
        </footer>
      </div>
    </div>
  )
}
