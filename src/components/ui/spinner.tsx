import { cn } from "@/lib/utils"
import { CompassIcon } from "lucide-react"

/* the surveyor's compass, slowly finding north */
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <CompassIcon data-slot="spinner" role="status" aria-label="Loading" className={cn("size-4 animate-[spin_2.5s_linear_infinite]", className)} {...props} />
  )
}

export { Spinner }
