// Regenerate docs/screenshots — viewport shots per showcase section.
// Usage: `npm run dev` in another terminal, then `npm run screenshots`.
// Needs a Chromium binary; override with CHROME_BIN=/path/to/chrome.
import { chromium } from 'playwright-core'

const OUT = new URL('../docs/screenshots', import.meta.url).pathname
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN ?? "/usr/bin/chromium" })

async function newPage(url, dark, width = 800, height = 537) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 })
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(700)
  if (dark) {
    // kill transitions first: headless Chromium freezes them mid-flight,
    // which would leave light-mode colors in the shot; a pre-paint class
    // would instead be stripped by the app's own mount effect
    await page.addStyleTag({ content: '* { transition: none !important; }' })
    await page.evaluate(() => document.documentElement.classList.add('dark'))
    await page.waitForTimeout(400)
  }
  // cmdk's CommandInput autofocuses on mount and scrolls the page — reset
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  await page.waitForTimeout(300)
  return page
}

async function scrollToHeading(page, text) {
  await page.evaluate((t) => {
    const h = [...document.querySelectorAll('h2')].find((el) => el.textContent.includes(t))
    const y = h.closest('div').getBoundingClientRect().top + window.scrollY - 20
    window.scrollTo({ top: y, behavior: 'instant' })
  }, text)
  await page.waitForTimeout(500)
}

const showcase = 'http://localhost:5173/'
const SECTIONS = [
  ['palette', 'Färgerna'],
  ['typography', 'Typograferna'],
  ['buttons', 'Knapparna'],
  ['forms', 'Blanketten'],
  ['badges-alerts', 'Beteckningar'],
  ['table', 'Tabellen'],
  ['chart-inks', 'Diagrammet'],
  ['patterns', 'Markslagen'],
  ['overlays', 'Apparaterna'],
  ['wayfinding', 'Registret'],
  ['signals', 'Posten'],
  ['almanac', 'Almanackan'],
  ['sheets-panes', 'Kartbladen'],
  ['desk-menus', 'Skrivbordet'],
  ['profile-chart', 'Profilen'],
]

// --- light showcase ---
let page = await newPage(showcase, false)
await page.screenshot({ path: `${OUT}/hero.png` })
for (const [name, heading] of SECTIONS) {
  await scrollToHeading(page, heading)
  await page.screenshot({ path: `${OUT}/${name}.png` })
}
// dialog open
await scrollToHeading(page, 'Apparaterna')
await page.getByRole('button', { name: /Öppna kartblad/ }).click()
await page.waitForTimeout(500)
await page.screenshot({ path: `${OUT}/dialog.png` })
await page.keyboard.press('Escape')
await page.waitForTimeout(300)
// telegram toast
await scrollToHeading(page, 'Posten')
await page.getByRole('button', { name: /Skicka telegram/ }).click()
await page.waitForTimeout(600)
await page.screenshot({ path: `${OUT}/telegram.png` })
await page.close()

// --- Skånelinjen site ---
page = await newPage('http://localhost:5173/#site', false, 1280, 860)
await page.screenshot({ path: `${OUT}/site-hero.png` })
await scrollToHeading(page, 'Utflyktsmål')
await page.screenshot({ path: `${OUT}/site-fields.png` })
await scrollToHeading(page, 'Anmälan till utflykt')
await page.screenshot({ path: `${OUT}/site-blankett.png` })
await page.close()

await browser.close()
console.log('done')
