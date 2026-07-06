import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

/* toasts arrive as telegrams: square paper slips, ink rules, mono wording */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      }
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Spinner />,
      }}
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--card-foreground)",
          "--normal-border": "color-mix(in oklab, var(--foreground) 60%, transparent)",
          "--border-radius": "0px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast !rounded-none !shadow-none",
          title: "!font-condensed !uppercase !tracking-[0.1em] !text-xs",
          description: "!font-mono !text-xs",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
