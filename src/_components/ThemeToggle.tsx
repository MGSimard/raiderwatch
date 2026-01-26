import { Button } from "@/_components/ui/button";
import { useTheme } from "@/_components/ThemeProvider";

export function ThemeToggle() {
  const { theme: activeTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed right-4 bottom-4 z-10 bg-transparent text-primary/50 hover:bg-transparent hover:text-primary focus-visible:text-primary"
      onClick={() => setTheme(activeTheme === "light" ? "dark" : "light")}>
      {activeTheme === "light" ? (
        <IconBolt className="size-5" aria-hidden />
      ) : (
        <IconBoltSlash className="size-5" aria-hidden />
      )}
    </Button>
  );
}

function IconBolt(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
      />
    </svg>
  );
}

function IconBoltSlash(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.412 15.655 9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457 3 3m5.457 5.457 7.086 7.086m0 0L21 21"
      />
    </svg>
  );
}
