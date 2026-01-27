import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";

export const cn = (...inputs: Array<ClassValue>) => {
  return twMerge(clsx(inputs));
};

export const formatUtcDate = (value: string | Date): string => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  }).format(date);
};

export const formatUtcDateTime = (value: string | Date) => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  const formatted = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(date);
  return `${formatted} UTC`;
};

export const copyToClipboard = async (text: string, label: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard.`);
  } catch (err: unknown) {
    toast.error(`Failed to copy ${label}, view console for more details.`);
    console.error(`Error copying ${label}:`, err instanceof Error ? err : "Unknown error.");
  }
};
