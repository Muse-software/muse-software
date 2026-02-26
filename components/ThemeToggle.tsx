"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const storageKey = "muse-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey) as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme: Theme = stored ?? (prefersDark ? "dark" : "light");
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="h-10 rounded-full border border-white/30 px-4 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-[var(--coral)]"
      aria-label="Toggle light and dark theme"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
