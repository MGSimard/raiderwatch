import { useSyncExternalStore } from "react";
import { cn } from "@/_lib/utils";

const utcFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatUtc(date: Date) {
  const parts = utcFormatter.formatToParts(date);
  const lookup: Record<string, string> = {};

  for (const part of parts) {
    if (part.type !== "literal") {
      lookup[part.type] = part.value;
    }
  }

  const month = lookup.month;
  const day = lookup.day;
  const hour = lookup.hour;
  const minute = lookup.minute;

  if (!month || !day || !hour || !minute) {
    return utcFormatter.format(date);
  }

  return `${month} ${day}, ${hour}:${minute}`;
}

const utcStore = (() => {
  let current = "";
  let timer: ReturnType<typeof setInterval> | null = null;
  const subscribers = new Set<() => void>();

  const update = () => {
    current = formatUtc(new Date());
    for (const callback of subscribers) {
      callback();
    }
  };

  const subscribe = (callback: () => void) => {
    subscribers.add(callback);
    if (subscribers.size === 1) {
      update();
      timer = setInterval(update, 60_000);
    }

    return () => {
      subscribers.delete(callback);
      if (subscribers.size === 0 && timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  };

  const getSnapshot = () => current;
  const getServerSnapshot = () => "";

  return { subscribe, getSnapshot, getServerSnapshot };
})();

function useUtcNow() {
  return useSyncExternalStore(utcStore.subscribe, utcStore.getSnapshot, utcStore.getServerSnapshot);
}

interface UtcClockProps {
  className?: string;
}

export function UtcClock({ className }: UtcClockProps) {
  const utcNow = useUtcNow();

  return (
    <span className={cn("text-muted-foreground text-sm tabular-nums", className)}>
      {utcNow ? `UTC ${utcNow}` : "UTC --"}
    </span>
  );
}
