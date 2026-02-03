import { Button } from "@/_components/ui/button";
import { useTheme } from "@/_components/ThemeProvider";
import { cn } from "@/_lib/utils";
import { FireIcon, SnowflakeIcon } from "@phosphor-icons/react";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme: activeTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "bg-transparent text-primary/50 hover:bg-transparent hover:text-primary focus-visible:text-primary",
        className
      )}
      onClick={() => setTheme(activeTheme === "light" ? "dark" : "light")}>
      {activeTheme === "light" ? (
        <SnowflakeIcon className="size-5" aria-hidden />
      ) : (
        <FireIcon className="size-5" aria-hidden />
      )}
    </Button>
  );
}
