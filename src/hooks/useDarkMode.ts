import { useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../constants";

type Theme = "light" | "dark" | "system";

export function useDarkMode(): {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
} {
  const [theme, setThemeValue] = useLocalStorage<Theme>(
    STORAGE_KEYS.THEME,
    "system"
  );

  const getSystemTheme = useCallback((): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }, []);

  const isDark =
    theme === "dark" || (theme === "system" && getSystemTheme());

  useEffect(() => {
    const root = window.document.documentElement;

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const root = window.document.documentElement;
      if (mediaQuery.matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeValue(newTheme);
    },
    [setThemeValue]
  );

  const toggleTheme = useCallback(() => {
    setThemeValue((current) => {
      if (current === "light") return "dark";
      if (current === "dark") return "light";
      return getSystemTheme() ? "light" : "dark";
    });
  }, [setThemeValue, getSystemTheme]);

  return { theme, isDark, setTheme, toggleTheme };
}
