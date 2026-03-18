import { create } from "zustand";

type Theme = "light" | "dark";
type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme:
    (document.documentElement.getAttribute("data-mode") as Theme) || "light",
  setTheme: (theme) => {
    localStorage.setItem("data-mode", theme);
    document.documentElement.setAttribute("data-mode", theme);
    set({ theme });
  },
}));
