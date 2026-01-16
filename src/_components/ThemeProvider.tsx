/** CUSTOM THEME PROVIDER - SSR Compatible with FOUC Prevention
 * - Server-side rendering support with hydration safety
 * - Zero FOUC via inline script execution
 * - Transition disabling during theme changes
 * - Cross-tab synchronization via storage events
 * - Uses React 19's use() hook for Context consumption
 * - Class-based theming for Tailwind/Shadcn compatibility
 * - Proper colorScheme CSS property setting for browser integration
 * - Theme validation to prevent invalid states
 * - Remove system related functionalities for portfolio version as
 * communicated branding default is more important than user's system preferences
 */
import { createContext, use, useCallback, useEffect, useMemo, useState } from "react";
import { ScriptOnce } from "@tanstack/react-router";

type Theme = "light" | "dark";

interface ThemeContextTypes {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextTypes | null>(null);

const STORAGE_KEY = "raiderwatch-theme";
const THEMES = ["light", "dark"] as const;
const isBrowser = typeof window !== "undefined";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({ children, defaultTheme = "dark", storageKey = STORAGE_KEY }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (!isBrowser) return defaultTheme;
    try {
      const stored = localStorage.getItem(storageKey);
      return stored && isValidTheme(stored) ? stored : defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const updateTheme = useCallback(
    (newTheme: Theme) => {
      if (isBrowser) {
        const enableTransitions = disableTransitions();
        setTheme(newTheme);
        try {
          localStorage.setItem(storageKey, newTheme);
        } catch (error) {
          console.error("ERROR: Failed to save theme preference:", error);
        }
        // Double RAF ensures transitions re-enable after paint
        requestAnimationFrame(() => {
          requestAnimationFrame(enableTransitions);
        });
      } else {
        setTheme(newTheme);
      }
    },
    [storageKey]
  );

  useEffect(() => {
    if (!isBrowser) return;
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    if (!isBrowser) return;
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue && isValidTheme(e.newValue)) {
        const enableTransitions = disableTransitions();
        setTheme(e.newValue);
        requestAnimationFrame(() => {
          requestAnimationFrame(enableTransitions);
        });
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [storageKey]);

  const contextValue = useMemo(() => ({ theme, setTheme: updateTheme }), [theme, updateTheme]);

  return (
    <ThemeContext value={contextValue}>
      <ScriptOnce>
        {`(function(storageKey, defaultTheme) {
          try {
            const themes = ['light', 'dark'];
            const stored = localStorage.getItem(storageKey);
            const theme = stored && themes.includes(stored) ? stored : defaultTheme;
            const root = document.documentElement;
            root.classList.toggle('dark', theme === 'dark');
            root.style.colorScheme = theme;
          } catch {}
        })(${JSON.stringify(storageKey)}, ${JSON.stringify(defaultTheme)})`}
      </ScriptOnce>
      {children}
    </ThemeContext>
  );
}

export function useTheme() {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error("ERROR: useTheme must be used within ThemeProvider.");
  }
  return context;
}

function isValidTheme(value: string): value is Theme {
  return THEMES.includes(value as Theme);
}

function disableTransitions() {
  const root = document.documentElement;
  root.dataset.disableTransitions = "";
  // Force a reflow
  // Regarding getComputedStyle vs requestAnimationFrame: https://paco.me/writing/disable-theme-transitions
  void window.getComputedStyle(root).opacity;
  return () => {
    delete root.dataset.disableTransitions;
  };
}
