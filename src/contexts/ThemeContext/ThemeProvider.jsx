import { useEffect, useState, useMemo } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
  const themes = ['light', 'dark', 'cupcake', 'forest', 'luxury'];

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  const [showThemeOptions, setShowThemeOptions] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const contextValue = useMemo(() => ({
    theme,
    setTheme,
    themes,
    showThemeOptions,
    setShowThemeOptions
  }), [theme, showThemeOptions]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
