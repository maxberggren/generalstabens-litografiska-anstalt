"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        /* the skala bar: hairline-ruled box filling with segmented ink */
        "relative flex h-2.5 w-full items-center overflow-x-hidden rounded-none border border-foreground/60 bg-card",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="size-full flex-1 bg-foreground transition-all [background-image:repeating-linear-gradient(90deg,transparent_0,transparent_11px,var(--card)_11px,var(--card)_12px)]"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
