import { cn } from "@/_lib/utils";

export function LoaderBlocks({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="loader-blocks"
      className={cn(
        "*:bg-card/30 *:animation-duration-[1.5s] grid size-48 grid-cols-3 gap-4 *:animate-pulse *:border *:backdrop-blur-sm *:[animation-delay:calc(var(--i)*0.15s+sin(var(--i)*1rad)*0.3s)]",
        className
      )}
      {...props}>
      <span className="[--i:0]" />
      <span className="[--i:1]" />
      <span className="[--i:2]" />
      <span className="[--i:3]" />
      <span className="[--i:4]" />
      <span className="[--i:5]" />
      <span className="[--i:6]" />
      <span className="[--i:7]" />
      <span className="[--i:8]" />
    </div>
  );
}
