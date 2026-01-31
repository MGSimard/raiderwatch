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
  return <div>Hello "/(public)/style-guide"!</div>;
}
