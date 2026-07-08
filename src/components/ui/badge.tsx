import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/* 1951 litho "beteckning": square-set letterpress labels — hairline ink
   rules, letterspaced condensed caps, no pill radius, no tint washes. */
const badgeVariants = cva(
  "group/badge inline-flex h-[1.375rem] w-fit shrink-0 items-center justify-center gap-1.5 overflow-visible rounded-none border px-2.5 pt-px font-condensed text-[0.6875rem] font-medium tracking-[0.14em] uppercase whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        /* solid vermillion plate with the double-rule neatline inside */
        default:
          "border-primary bg-primary text-primary-foreground shadow-[inset_0_0_0_1px_var(--primary),inset_0_0_0_2px_var(--primary-foreground)] [a]:hover:bg-primary/90",
        /* sea-blue plate, ink hairline */
        secondary:
          "border-foreground/60 bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        /* red-ruled — like the map's red boundary overprint */
        destructive:
          "border-destructive bg-transparent text-destructive shadow-[inset_0_0_0_3px_transparent] [a]:hover:bg-destructive/10",
        /* the legend box: paper with an ink hairline */
        outline:
          "border-foreground/60 bg-card text-foreground [a]:hover:bg-muted",
        /* hypsometric plates — legend chips in the map's field tints */
        meadow:
          "border-foreground/60 bg-meadow text-foreground [a]:hover:bg-meadow/80",
        sand: "border-foreground/60 bg-sand text-foreground [a]:hover:bg-sand/80",
        apricot:
          "border-foreground/60 bg-apricot text-foreground [a]:hover:bg-apricot/80",
        /* unboxed map lettering */
        ghost:
          "border-transparent text-foreground hover:bg-muted dark:hover:bg-muted/50",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
