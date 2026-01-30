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

/**
 * Copies text to clipboard then displays success or error state in a toast
 *
 * @param text - The text to copy to clipboard
 * @param label - A label identifier of what is being copied
 */
export const copyToClipboard = async (text: string, label: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard.`);
  } catch (err: unknown) {
    toast.error(`Failed to copy ${label}, view console for more details.`);
    console.error(`Error copying ${label}:`, err instanceof Error ? err : "Unknown error.");
  }
};

/**
 * Extracts the YouTube video ID from various URL formats
 *
 * Supported formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 *
 * @param url - Any YouTube URL format
 * @returns The 11-character video ID or null if invalid
 */
export function extractYouTubeVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    let videoId: string | null = null;

    // Handle youtu.be short URLs
    if (hostname === "youtu.be") {
      // Extract from pathname: /VIDEO_ID
      const pathSegments = urlObj.pathname.split("/").filter(Boolean);
      videoId = pathSegments[0] || null;
    }
    // Handle youtube.com domains (www.youtube.com, youtube.com, m.youtube.com)
    else if (hostname === "www.youtube.com" || hostname === "youtube.com" || hostname === "m.youtube.com") {
      // Check if it's an embed URL: /embed/VIDEO_ID
      if (urlObj.pathname.startsWith("/embed/")) {
        const pathSegments = urlObj.pathname.split("/").filter(Boolean);
        videoId = pathSegments[1] || null;
      }
      // Otherwise, extract from query parameter: ?v=VIDEO_ID
      else {
        videoId = urlObj.searchParams.get("v");
      }
    }

    // Validate video ID format (11 characters, alphanumeric, hyphens, and underscores)
    if (videoId && /^[A-Za-z0-9_-]{11}$/.test(videoId)) {
      return videoId;
    }

    // Catch-all for invalid video IDs
    return null;
  } catch {
    // Catch-all for invalid URLs
    return null;
  }
}

/**
 * Converts any valid YouTube URL to an embed format
 *
 * @param url - Any YouTube URL format
 * @returns Embed URL (https://www.youtube.com/embed/VIDEO_ID) or undefined if invalid
 */
export function getYouTubeEmbedUrl(url: string) {
  const videoId = extractYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
}
