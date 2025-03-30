"use client";

import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    // Function to get system color scheme
    function getSystemTheme() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    // Set initial theme based on system preference
    setTheme(getSystemTheme());

    // Watch for system theme changes
    const systemThemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };
    
    systemThemeMediaQuery.addEventListener("change", handleThemeChange);

    // Cleanup
    return () => {
      systemThemeMediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return theme;
}
