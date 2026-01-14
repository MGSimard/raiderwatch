import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: PageHome,
});

function PageHome() {
  return (
    <main className="relative h-screen w-screen grid place-items-center">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
        src="/assets/media/hero.mp4"
        poster="https://vda-global.lilithcdn.com/online_dragonfly_material/1658915262_0X520X4F0X4B0X5F0X6C0X750X6F0X6.jpg"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="z-1">
        <h1 className="text-7xl font-logo font-bold">
          Raider<span className="text-destructive animate-recording-pulse inline-block">.</span>Watch
        </h1>
      </div>
    </main>
  );
}
