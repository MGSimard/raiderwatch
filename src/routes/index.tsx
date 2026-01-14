import { createFileRoute } from "@tanstack/react-router";
import { SearchUser } from "@/_components/SearchUser";
import { Separator } from "@/_components/ui/separator";

export const Route = createFileRoute("/")({
  component: PageHome,
});

function PageHome() {
  return (
    <main className="relative h-screen w-screen grid place-items-center text-center">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
        poster="/assets/media/hero.webp"
        autoPlay
        loop
        muted
        playsInline>
        <source src="/assets/media/hero.webm" type="video/webm" />
        <source src="/assets/media/hero.mp4" type="video/mp4" />
      </video>
      <div className="flex flex-col items-center gap-4 z-1">
        <h1 className="text-7xl font-logo font-bold">
          Raider<span className="text-destructive animate-recording-pulse inline-block">.</span>Watch
        </h1>
        <Separator orientation="horizontal" className="-mt-1" />
        <SearchUser />
      </div>
    </main>
  );
}
