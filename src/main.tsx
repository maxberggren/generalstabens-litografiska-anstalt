import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { TooltipProvider } from '@/components/ui/tooltip'
import './index.css'
import App from './App.tsx'
import Site from './Site.tsx'

/* two sheets in the map cabinet: the Skånelinjen demo site (default) —
   the theme shown in use — and the component showcase (#components) */
function Root() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const sheet = hash === '#components' ? 'components' : 'site'

  // a fresh sheet always starts at the top margin — without this the
  // browser keeps the previous page's scroll offset across the swap.
  // Only on sheet changes, so in-page anchors still scroll normally.
  const prevSheet = useRef(sheet)
  useEffect(() => {
    if (prevSheet.current !== sheet) {
      prevSheet.current = sheet
      window.scrollTo(0, 0)
    }
  }, [sheet])

  return sheet === 'components' ? <App /> : <Site />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider delayDuration={200}>
      <Root />
    </TooltipProvider>
  </StrictMode>,
)
