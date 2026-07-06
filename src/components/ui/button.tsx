import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/* 1951 litho buttons: square-set letterpress plates. Hairline ink rules,
   spärrad condensed caps, no washes or elevation — hover deepens the ink,
   active presses the plate into the paper. */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border bg-clip-padding font-condensed text-sm font-medium tracking-[0.12em] uppercase whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /* vermillion plate with the paper inner rule — a miniature neatline */
        default:
          "border-primary bg-primary text-primary-foreground shadow-[inset_0_0_0_1px_var(--primary),inset_0_0_0_2px_var(--primary-foreground)] hover:bg-[color-mix(in_oklch,var(--primary),var(--foreground)_12%)] hover:border-[color-mix(in_oklch,var(--primary),var(--foreground)_12%)]",
        /* legend-box paper with an ink hairline */
        outline:
          "border-foreground/60 bg-card text-foreground hover:bg-muted aria-expanded:bg-muted dark:bg-card dark:hover:bg-muted",
        /* sea-blue plate, ink hairline */
        secondary:
          "border-foreground/60 bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_7%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        /* bare map lettering — ink appears on hover as a dotted sockengräns rule */
        ghost:
          "border-transparent text-foreground decoration-dotted underline-offset-4 hover:underline hover:text-foreground aria-expanded:bg-muted dark:hover:bg-transparent",
        /* red-ruled overprint, like the boundary lines */
        destructive:
          "border-destructive bg-transparent text-destructive hover:bg-destructive/10 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-transparent dark:hover:bg-destructive/15 dark:focus-visible:ring-destructive/40",
        /* a map reference: vermillion with dashed häradsgräns underline */
        link: "border-transparent text-primary underline decoration-dashed decoration-1 underline-offset-4 hover:decoration-solid",
      },
      size: {
        default:
          "h-8 gap-1.5 px-3.5 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-3 text-[0.8rem] has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-4.5 text-[0.9375rem] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
