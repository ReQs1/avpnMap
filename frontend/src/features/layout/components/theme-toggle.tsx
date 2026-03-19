import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../theme-store";
import { useThrottle } from "@/shared/hooks/use-throttle";

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const { throttledAction: handleClick } = useThrottle(toggleTheme);

  return (
    <button
      onClick={handleClick}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md text-black transition-colors hover:bg-gray-200"
    >
      <Sun className="absolute h-5 w-5 scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90" />

      <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0" />

      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
