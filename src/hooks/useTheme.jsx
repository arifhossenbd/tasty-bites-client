import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext/ThemeContext";
import { themeConfig } from "../utils/themeConfig";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  const { theme, setTheme, themes, showThemeOptions, setShowThemeOptions } = context;
  const currentTheme = themeConfig.themes[theme] || themeConfig.themes.stone;

  return {
    theme,
    setTheme,
    themes,
    showThemeOptions,
    setShowThemeOptions,
    currentTheme,
    apply: (element) => currentTheme[element] || "",
  };
};
