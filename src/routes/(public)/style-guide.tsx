import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/style-guide")({
  component: RouteComponent,
});

// MISSING:
// Utility button background color
// Dark background button muted color (ON, OFF)
// Dark background button border color
// Keybinding button opacity (BG is lightbg, text is text-darkmode, can probably just eyeball this)

const BUTTON_PRIMARY = "#F1AA1C"; // Orange

const GAME_UI_LIGHT = "#f9eedf";
// Light background, card headers, light text, active page headers

const GAME_UI_DARK = "#090c19"; // Dark Blue
// Dark background, transparent & opaque cards, dark buttons, dark text (incl. card headers), active pagination dot & arrows

const GAME_UI_MUTED = "#a4a5aa";
// Inactive page headers, envelope icon, inactive pagination dot & arrows, Horizontal Separator in traders, setting (on, off)

const GAME_UI_BORDER = "#5a5f6f";
// Button border, trader rectangle border

const GAME_UI_MUTED2 = "#606576"; // Skill nodes
const UNFILLED_RADIAL_METER = "#3e4150"; // Radial meters

const ARC_BLUE = "#5fffff"; // Cyan
const ARC_GREEN = "#05ff74"; // Neon Green
const ARC_YELLOW = "#ffea00"; // Yellow
const ARC_RED = "#ff0000"; // Red

function RouteComponent() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col bg-[url('https://images3.alphacoders.com/140/thumb-1920-1401749.jpg')] bg-cover bg-center p-8">
      <h1>ARC Raiders Style Guide</h1>
      <section>
        <h2>COLORS</h2>
        <div className="grid grid-cols-2 gap-4">
          <div
            className="grid h-16 place-items-center px-2 py-1"
            style={{ backgroundColor: GAME_UI_LIGHT, color: GAME_UI_DARK }}>
            <div>Background: {GAME_UI_LIGHT}</div>
            <div>Text: {GAME_UI_DARK}</div>
          </div>
          <div
            className="grid h-16 place-items-center px-2 py-1"
            style={{ backgroundColor: GAME_UI_DARK, color: GAME_UI_LIGHT }}>
            <div>Background: {GAME_UI_DARK}</div>
            <div>Text: {GAME_UI_LIGHT}</div>
          </div>
          <div
            className="col-span-2 grid h-16 place-items-center px-2 py-1"
            style={{ backgroundColor: BUTTON_PRIMARY, color: GAME_UI_DARK }}>
            <div>Primary Button: {BUTTON_PRIMARY}</div>
          </div>
          <div
            className="grid h-16 place-items-center px-2 py-1"
            style={{ backgroundColor: ARC_BLUE, color: GAME_UI_DARK }}>
            <div>ARC Blue: {ARC_BLUE}</div>
          </div>
          <div
            className="grid h-16 place-items-center px-2 py-1"
            style={{ backgroundColor: ARC_GREEN, color: GAME_UI_DARK }}>
            <div>ARC Green: {ARC_GREEN}</div>
          </div>
          <div
            className="grid h-16 place-items-center px-2 py-1"
            style={{ backgroundColor: ARC_YELLOW, color: GAME_UI_DARK }}>
            <div>ARC Yellow: {ARC_YELLOW}</div>
          </div>
          <div
            className="grid h-16 place-items-center px-2 py-1"
            style={{ backgroundColor: ARC_RED, color: GAME_UI_DARK }}>
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
      <section>
        <h2>Interface Elements</h2>
        <button
          type="button"
          className="ring-btn rounded-full bg-[#f1aa1c] px-3.5 py-2 font-medium text-[#130918] uppercase">
          PRIMARY BUTTON
        </button>
        <button type="button">Secondary Button</button>
        {/* NOTES: Secondary Button is full opacity if light background, semi-transparent if dark background (opaque on hover) */}
        <div className="flex flex-col gap-2 bg-[#090c19]/83 p-4 backdrop-blur-xs">
          <button
            type="button"
            className="ring-btn flex items-center justify-between gap-4 rounded-full border border-[#5a5f6f] bg-[#090c19]/83 px-3.5 py-2 text-[#ece2d0] hover:bg-[#090c19] focus-visible:bg-[#090c19]">
            Fill Squad <span className="font-medium text-[#a4a5aa]">ON</span>
          </button>
          <button
            type="button"
            className="ring-btn flex items-center justify-between gap-4 rounded-full border border-[#5a5f6f] bg-[#090c19]/83 px-3.5 py-2 text-[#ece2d0] hover:bg-[#090c19] focus-visible:bg-[#090c19]">
            Solo vs. Squads <span className="font-medium text-[#a4a5aa]">OFF</span>
          </button>
        </div>
      </section>
    </main>
  );
}
