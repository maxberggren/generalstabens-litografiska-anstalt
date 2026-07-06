import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      /* under tryckning: marsh-stipple placeholder ink */
      className={cn("pattern-marsh animate-pulse rounded-none bg-muted text-foreground/30", className)}
      {...props}
    />
  )
}

export { Skeleton }
