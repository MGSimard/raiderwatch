import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/style-guide")({
  component: RouteComponent,
});

const BG_LIGHTMODE = "#ece2d0";
const BG_DARKMODE = "#130918";

const TEXT_LIGHTMODE = "#130918";
const TEXT_DARKMODE = "#ece2d0";

const BUTTON_PRIMARY = "#f1aa1c";

const ARC_BLUE = "#5fffff";
const ARC_GREEN = "#05ff74";
const ARC_YELLOW = "#ffea00";
const ARC_RED = "#ff0000";

function RouteComponent() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col p-8">
      <h1>ARC Raiders Style Guide</h1>
      <section>
        <h2>Colors - Duo Tone UI</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid h-16 place-items-center bg-[#ece2d0] px-2 py-1 text-[#130918]">
            <div>Background: {BG_LIGHTMODE}</div>
            <div>Text: {TEXT_LIGHTMODE}</div>
          </div>
          <div className="grid h-16 place-items-center bg-[#130918] px-2 py-1 text-[#ece2d0]">
            <div>Background: {BG_DARKMODE}</div>
            <div>Text: {TEXT_DARKMODE}</div>
          </div>
          <div className="col-span-2 grid h-16 place-items-center bg-[#f1aa1c] px-2 py-1 text-[#130918]">
            <div>Primary Button: {BUTTON_PRIMARY}</div>
          </div>
          <div className="grid h-16 place-items-center bg-[#5fffff] px-2 py-1 text-[#130918]">
            <div>ARC Blue: {ARC_BLUE}</div>
          </div>
          <div className="grid h-16 place-items-center bg-[#05ff74] px-2 py-1 text-[#130918]">
            <div>ARC Green: {ARC_GREEN}</div>
          </div>
          <div className="grid h-16 place-items-center bg-[#ffea00] px-2 py-1 text-[#130918]">
            <div>ARC Yellow: {ARC_YELLOW}</div>
          </div>
          <div className="grid h-16 place-items-center bg-[#ff0000] px-2 py-1 text-[#130918]">
            <div>ARC Red: {ARC_RED}</div>
          </div>
        </div>
      </section>
      <section>
        <h2>Typography</h2>
        <ul>
          <li>Logo: ITC Avant Garde or TeX Gyre Adventor</li>
          <li>Nav/Tabs & Headings: Urbanist</li>
          <li>Titles: Prompt</li>
          <li>Core Font: Barlow</li>
          <li>HUD (Compass, Timer): JetBrains Mono</li>
        </ul>
      </section>
    </main>
  );
}
