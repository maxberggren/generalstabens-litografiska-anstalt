import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        /* blankett writing line: dotted ink rule, typewritten entry */
        "h-8 w-full min-w-0 rounded-none border-0 border-b border-dotted border-foreground/50 bg-transparent px-1 py-1 font-mono text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:font-sans placeholder:italic placeholder:text-muted-foreground focus-visible:border-solid focus-visible:border-primary focus-visible:bg-primary/5 focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-0 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
