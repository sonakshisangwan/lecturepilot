"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

export type ThemeMode = "dark" | "light";

type ThemeContextValue = {
  theme: "dark" | "light";
  mode: "dark" | "light";
  setTheme: (mode: "dark" | "light") => void;
  setMode: (mode: "dark" | "light") => void;
  toggleTheme: () => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "lecturepilot-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark") return saved;
        const attr = document.documentElement.getAttribute("data-theme");
        if (attr === "light" || attr === "dark") return attr;
      } catch (e) {
        // LocalStorage access may fail in restricted iframes
      }
    }
    return "dark";
  });

  const applyThemeToDOM = useCallback((targetTheme: "dark" | "light") => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, targetTheme);
    } catch (e) {
      // ignore
    }
    if (targetTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.style.colorScheme = "light";
    }
  }, []);

  // Synchronize and lock on mount
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") {
        setThemeState(saved);
        applyThemeToDOM(saved);
      } else {
        const initial = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
        setThemeState(initial);
        applyThemeToDOM(initial);
      }
    } catch (e) {
      applyThemeToDOM("dark");
    }

    // Cross-tab synchronization
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === "light" || e.newValue === "dark")) {
        setThemeState(e.newValue);
        applyThemeToDOM(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [applyThemeToDOM]);

  const setTheme = useCallback(
    (newTheme: "dark" | "light") => {
      setThemeState(newTheme);
      applyThemeToDOM(newTheme);
    },
    [applyThemeToDOM]
  );

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyThemeToDOM(next);
      return next;
    });
  }, [applyThemeToDOM]);

  const value = useMemo(
    () => ({
      theme,
      mode: theme,
      setTheme,
      setMode: setTheme,
      toggleTheme,
      toggleMode: toggleTheme,
    }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}