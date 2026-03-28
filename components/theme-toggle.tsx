"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { flushSync } from "react-dom";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setCurrentTheme(prefersDark ? "dark" : "light");
    } else {
      setCurrentTheme(theme);
    }
  }, [theme]);

  const toggleTheme = (event: React.MouseEvent) => {
 
    if (!document.startViewTransition) {
      setTheme(currentTheme === "dark" ? "light" : "dark");
      return;
    }

    const x = event.clientX;
    const y = event.clientY;

    document.documentElement.style.setProperty("--circle-x", `${x}px`);
    document.documentElement.style.setProperty("--circle-y", `${y}px`);

    document.startViewTransition(() => {
      flushSync(() => {
        setTheme(currentTheme === "dark" ? "light" : "dark");
      });
    });
  };

  if (!currentTheme) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-9 w-9 rounded-full hover:bg-accent/50 transition-colors"
      onClick={toggleTheme}
    >
      <div className="relative h-5 w-5">
        <Sun
          className={`absolute inset-0 h-full w-full transition-all duration-500 ease-in-out ${currentTheme === "dark"
            ? "opacity-0 rotate-90 scale-0"
            : "opacity-100 rotate-0 scale-100"
            }`}
        />
        <Moon
          className={`absolute inset-0 h-full w-full transition-all duration-500 ease-in-out ${currentTheme === "dark"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-90 scale-0"
            }`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
