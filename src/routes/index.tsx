import { Link, createFileRoute } from "@tanstack/react-router";
import { SearchUser } from "@/_components/SearchUser";
import { Button } from "@/_components/ui/button";
import { Separator } from "@/_components/ui/separator";
import { EyeIcon } from "@phosphor-icons/react";

export const Route = createFileRoute("/")({
  component: PageHome,
});

function PageHome() {
  return (
    <main className="relative grow grid place-items-center text-center min-h-dvh">
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4"
        nativeButton={false}
        aria-hidden
        tabIndex={-1}
        render={
          <Link to="/dashboard" viewTransition={false}>
            <EyeIcon aria-hidden />
          </Link>
        }
      />
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm select-none pointer-events-none"
        poster="/assets/media/hero.webp"
        autoPlay
        loop
        muted
        playsInline>
        <source src="/assets/media/hero.webm" type="video/webm" />
        <source src="/assets/media/hero.mp4" type="video/mp4" />
      </video>
      <div className="flex flex-col items-center gap-4 z-1 px-4">
        <h1 className="text-7xl font-logo font-bold select-none">
          Raider<span className="text-destructive animate-recording-pulse inline-block">.</span>Watch
        </h1>
        <Separator orientation="horizontal" className="-mt-1" />
        <SearchUser />
      </div>
    </main>
  );
}
