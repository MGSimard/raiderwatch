import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/wp-admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="pointer-events-none fixed inset-0 h-full w-full overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/L8XbI9aJOXk?autoplay=1&mute=0&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=L8XbI9aJOXk&iv_load_policy=3"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "100vw",
          height: "100vh",
          border: "none",
          pointerEvents: "none",
        }}
        allow="autoplay; encrypted-media"
        title="No access"
      />
    </div>
  );
}
