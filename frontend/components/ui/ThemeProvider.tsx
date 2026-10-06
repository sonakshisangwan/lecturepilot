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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to dark theme as requested for the soft, cozy, warm dark aesthetic
  const [theme, setThemeState] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Read saved preference if available, default to dark
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("lecturepilot-theme") : null;
    if (saved === "light") {
      setThemeState("light");
    } else {
      setThemeState("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.dataset.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.dataset.theme = "light";
    }
  }, [theme]);

  const setTheme = useCallback((newTheme: "dark" | "light") => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lecturepilot-theme", newTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        window.localStorage.setItem("lecturepilot-theme", next);
      }
      return next;
    });
  }, []);

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