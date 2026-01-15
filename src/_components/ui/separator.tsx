import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cn } from "@/_lib/utils";

function Separator({ className, orientation = "horizontal", ...props }: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "bg-[linear-gradient(to_right,transparent,var(--border)_calc(0%+2rem),var(--border)_calc(100%-2rem),transparent)] shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
        className
      )}
      {...props}
    />
  );
}

export { Separator };
