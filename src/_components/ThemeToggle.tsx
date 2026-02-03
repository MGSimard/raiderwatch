import { Button } from "@/_components/ui/button";
import { useTheme } from "@/_components/ThemeProvider";
import { cn } from "@/_lib/utils";
import { Flame, Snowflake } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme: activeTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "bg-transparent text-primary/50 hover:bg-transparent hover:text-primary focus-visible:text-primary",
        className
      )}
      onClick={() => setTheme(activeTheme === "light" ? "dark" : "light")}>
      {!mounted ? (
        <Flame className="size-5" aria-hidden />
      ) : activeTheme === "light" ? (
        <Snowflake className="size-5" aria-hidden />
      ) : (
        <Flame className="size-5" aria-hidden />
      )}
    </Button>
  );
}
