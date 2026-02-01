import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/style-guide")({
  component: RouteComponent,
});

// MISSING:
// Utility button background color
// Keybinding button opacity (BG is lightbg, text is text-darkmode, can probably just eyeball this)

function RouteComponent() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col bg-[url('https://images3.alphacoders.com/140/thumb-1920-1401749.jpg')] bg-cover bg-center p-8">
      <h1>ARC Raiders Style Guide</h1>
      <section>
        <h2>COLORS</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid h-16 place-items-center bg-arc-light px-2 py-1 text-arc-dark">
            <div>Background: #f9eedf</div>
            <div>Text: #090c19</div>
          </div>
          <div className="grid h-16 place-items-center bg-arc-dark px-2 py-1 text-arc-light">
            <div>Background: #090c19</div>
            <div>Text: #f9eedf</div>
          </div>
          <div className="col-span-2 grid h-16 place-items-center bg-arc-primary px-2 py-1 text-arc-dark">
            <div>Primary Button: #f1aa1c</div>
          </div>
          <div className="grid h-16 place-items-center bg-arc-blue px-2 py-1 text-arc-dark">
            <div>ARC Blue: #5fffff</div>
          </div>
          <div className="grid h-16 place-items-center bg-arc-green px-2 py-1 text-arc-dark">
            <div>ARC Green: #05ff74</div>
          </div>
          <div className="grid h-16 place-items-center bg-arc-yellow px-2 py-1 text-arc-dark">
            <div>ARC Yellow: #ffea00</div>
          </div>
          <div className="grid h-16 place-items-center bg-arc-red px-2 py-1 text-arc-dark">
            <div>ARC Red: #ff0000</div>
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
      <section>
        <h2>Interface Elements</h2>
        <button
          type="button"
          className="btn-ring rounded-full bg-[#f1aa1c] px-3.5 py-2 font-medium text-[#130918] uppercase">
          PRIMARY BUTTON
        </button>
        <button type="button">Secondary Button</button>
        {/* NOTES: Secondary Button is full opacity if light background, semi-transparent if dark background (opaque on hover) */}
        <div className="flex flex-col gap-2 bg-[#090c19]/83 p-4 backdrop-blur-xs">
          <button
            type="button"
            className="btn-ring flex items-center justify-between gap-4 rounded-full border border-[#5a5f6f] bg-[#090c19]/83 px-3.5 py-2 text-[#ece2d0] hover:bg-[#090c19] focus-visible:bg-[#090c19]">
            Fill Squad <span className="font-medium text-[#a4a5aa]">ON</span>
          </button>
          <button
            type="button"
            className="btn-ring flex items-center justify-between gap-4 rounded-full border border-[#5a5f6f] bg-[#090c19]/83 px-3.5 py-2 text-[#ece2d0] hover:bg-[#090c19] focus-visible:bg-[#090c19]">
            Solo vs. Squads <span className="font-medium text-[#a4a5aa]">OFF</span>
          </button>
        </div>
      </section>
    </main>
  );
}
