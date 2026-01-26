import { Link, createFileRoute } from "@tanstack/react-router";
import { SearchUser } from "@/_components/SearchUser";
import { Button } from "@/_components/ui/button";
import { Separator } from "@/_components/ui/separator";
import { EyeIcon } from "@phosphor-icons/react";

export const Route = createFileRoute("/(public)/")({
  component: PageHome,
});

function PageHome() {
  return (
    <main className="relative grid min-h-dvh grow place-items-center text-center">
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4"
        nativeButton={false}
        aria-hidden
        tabIndex={-1}
        render={
          <Link to="/dashboard">
            <EyeIcon aria-hidden />
          </Link>
        }
      />
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 blur-sm select-none"
        poster="/assets/media/hero.webp"
        autoPlay
        loop
        muted
        playsInline>
        <source src="/assets/media/hero.webm" type="video/webm" />
        <source src="/assets/media/hero.mp4" type="video/mp4" />
      </video>
      <div className="z-1 flex flex-col items-center gap-4 px-4">
        <h1 className="font-logo text-7xl font-bold select-none">
          Raider<span className="animate-recording-pulse inline-block text-destructive">.</span>Watch
        </h1>
        <Separator orientation="horizontal" className="-mt-1" />
        <SearchUser />
      </div>
    </main>
  );
}
