import { VITE_SITE_DESCRIPTION, VITE_SITE_TITLE, VITE_SITE_URL } from "@/_lib/consts";
import globalCss from "@/_styles/global.css?url";
import fontsCss from "@/_styles/fonts.css?url";

export const configMeta = [
  {
    charSet: "utf-8",
  },
  {
    name: "viewport",
    content: "width=device-width, initial-scale=1",
  },
  {
    title: VITE_SITE_TITLE,
  },
  {
    name: "description",
    content: VITE_SITE_DESCRIPTION,
  },
  {
    name: "author",
    content: "MGSIMARD",
  },
];

export const configLinks = [
  {
    rel: "sitemap",
    href: "/sitemap.xml",
  },
  {
    rel: "manifest",
    href: "/metadata/manifest.webmanifest",
  },
];

export const favIcons = [
  {
    rel: "shortcut icon",
    href: "/metadata/favicon.ico",
  },
  {
    rel: "icon",
    type: "image/svg+xml",
    href: "/metadata/icon.svg",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "96x96",
    href: "/metadata/icon96.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/metadata/apple-icon.png",
  },
  {
    rel: "mask-icon",
    href: "/metadata/icon.svg",
    color: "#0E0E17",
  },
];

export const fontPreloads = [
  {
    rel: "preload",
    href: "/assets/fonts/ITCAG/ITCAvantGardeStd-Bold.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/assets/fonts/Barlow/Barlow-Regular.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/assets/fonts/Prompt/Prompt-Bold.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/assets/fonts/Urbanist/Urbanist-Bold.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
];

export const openGraph = [
  {
    property: "og:type",
    content: "website",
  },
  {
    property: "og:site_name",
    content: VITE_SITE_TITLE,
  },
  {
    property: "og:url",
    content: VITE_SITE_URL,
  },
  {
    property: "og:title",
    content: VITE_SITE_TITLE,
  },
  {
    property: "og:description",
    content: VITE_SITE_DESCRIPTION,
  },
  {
    property: "og:image",
    content: `${VITE_SITE_URL}/metadata/og-img.jpg`,
  },
  {
    property: "og:image:width",
    content: "1200",
  },
  {
    property: "og:image:height",
    content: "630",
  },
];

export const twitter = [
  {
    name: "twitter:card",
    content: "summary_large_image",
  },
  {
    name: "twitter:site",
    content: "@MGSimard",
  },
  {
    name: "twitter:creator",
    content: "@MGSimard",
  },
  {
    name: "twitter:url",
    content: VITE_SITE_URL,
  },
  {
    name: "twitter:title",
    content: VITE_SITE_TITLE,
  },
  {
    name: "twitter:description",
    content: VITE_SITE_DESCRIPTION,
  },
  {
    name: "twitter:image",
    content: `${VITE_SITE_URL}/metadata/twitter-img.jpg`,
  },
];

export const misc = [
  {
    name: "application-name",
    content: VITE_SITE_TITLE,
  },
  {
    name: "apple-mobile-web-app-title",
    content: VITE_SITE_TITLE,
  },
  {
    name: "theme-color",
    content: "#f8fafc",
    media: "(prefers-color-scheme: light)",
  },
  {
    name: "theme-color",
    content: "#181012",
    media: "(prefers-color-scheme: dark)",
  },
  {
    name: "color-scheme",
    content: "dark light",
  },
  {
    name: "msapplication-TileColor",
    content: "#181012",
  },
  {
    name: "mobile-web-app-capable",
    content: "yes",
  },
  {
    name: "apple-mobile-web-app-capable",
    content: "yes",
  },
  {
    name: "apple-mobile-web-app-status-bar-style",
    content: "black",
  },
];

export const styles = [
  {
    rel: "stylesheet",
    href: globalCss,
  },
  {
    rel: "stylesheet",
    href: fontsCss,
  },
];
