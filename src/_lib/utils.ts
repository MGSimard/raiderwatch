import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import type { ClassValue } from "clsx";

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export const normalizeEmbarkId = (embarkId: string) => {
  return embarkId.replace(/#(\d{4})$/, "-$1");
};
