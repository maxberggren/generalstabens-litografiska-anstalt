import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        /* blankett writing area: ruled lines that scroll with the text */
        "blankett-lines flex field-sizing-content min-h-[5.25rem] w-full rounded-none border-0 border-b border-dotted border-foreground/50 bg-transparent px-1 py-0 font-mono text-base transition-colors outline-none placeholder:font-sans placeholder:italic placeholder:text-muted-foreground focus-visible:border-solid focus-visible:border-primary focus-visible:bg-primary/5 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-0 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
