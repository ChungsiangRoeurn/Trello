import { useState, useEffect } from "react";

export function useDarkMode() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("darkMode", String(dark));
  }, [dark]);

  const toggle = () => setDark((d) => !d);

  return { dark, toggle };
}