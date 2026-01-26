import { cn } from "@/_lib/utils";

function Card({ className, size = "default", ...props }: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "ring-foreground/10 bg-card/30 text-card-foreground group/card grid gap-4 rounded-none bg-size-[cover,100%_1rem] bg-position-[center,center_bottom] [background-repeat:no-repeat,no-repeat] py-4 text-xs/relaxed ring-1 backdrop-blur-[2px] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-2 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 dark:bg-[radial-gradient(at_center_-5rem,oklch(from_var(--foreground)_l_c_h/0.15)_20%,transparent_80%),radial-gradient(at_center_bottom,oklch(from_var(--primary)l_c_h/0.1),transparent_80%)] *:[img:first-child]:rounded-none *:[img:last-child]:rounded-none",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-none px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({
  className,
  disableGlow = false,
  gradientPosition = "center",
  ...props
}: React.ComponentProps<"div"> & { gradientPosition?: "left" | "center" | "right"; disableGlow?: boolean }) {
  const gradientClasses = {
    left: "bg-linear-to-r from-primary-derived/50 to-transparent border-t-2 border-l-0 border-r-0 border-b-2 [border-image:linear-gradient(to_right,var(--primary),transparent)1] [border-image-slice:1_0]",
    center:
      "bg-linear-to-r from-transparent via-primary-derived/50 to-transparent border-t-2 border-l-0 border-r-0 border-b-2 [border-image:linear-gradient(to_right,transparent,var(--primary),transparent)1] [border-image-slice:1_0]",
    right:
      "bg-linear-to-r from-transparent to-primary-derived/50 border-t-2 border-l-0 border-r-0 border-b-2 [border-image:linear-gradient(to_right,transparent,var(--primary))1] [border-image-slice:1_0]",
  };

  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-primary py-2 text-2xl font-medium group-data-[size=sm]/card:text-sm",
        !disableGlow &&
          "border-2 dark:shadow-lg dark:text-shadow-[0_0_0.2em_oklch(from_var(--primary)_calc(l-0.2)_c_h)]",
        !disableGlow && gradientClasses[gradientPosition],
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-description" className={cn("text-muted-foreground text-xs/relaxed", className)} {...props} />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex flex-col gap-2 px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center rounded-none px-4 pb-4 group-data-[size=sm]/card:p-3", className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
