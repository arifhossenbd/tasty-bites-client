import { useEffect, useState, useMemo } from "react";
import { ThemeContext } from "./ThemeContext";
import { themeConfig } from "../../utils/themeConfig";

export const ThemeProvider = ({ children }) => {
  const themes = Object.keys(themeConfig.themes);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return themes.includes(savedTheme) ? savedTheme : 'stone';
  });

  const [showThemeOptions, setShowThemeOptions] = useState(false);

  // Get current theme config
  const currentTheme = themeConfig.themes[theme] || themeConfig.themes.stone;

  useEffect(() => {
    // Set theme attribute
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Use proper color values instead of Tailwind classes
    document.documentElement.style.setProperty(
      '--scrollbar-thumb',
      currentTheme.scrollbarThumbColor || '#78716c' // stone-500 as fallback
    );
    
    document.documentElement.style.setProperty(
      '--scrollbar-track',
      currentTheme.scrollbarTrackColor || '#fafaf9' // stone-50 as fallback
    );
    
    document.documentElement.style.setProperty(
      '--scrollbar-thumb-hover',
      currentTheme.scrollbarThumbHoverColor || '#57534e' // stone-700 as fallback
    );
    
    // For Firefox
    document.documentElement.style.setProperty(
      'scrollbar-color',
      `${currentTheme.scrollbarThumbColor || '#78716c'} ${
        currentTheme.scrollbarTrackColor || '#fafaf9'
      }`
    );
    
    // For WebKit browsers
    const style = document.createElement('style');
    style.id = 'dynamic-scrollbar-styles';
    style.textContent = `
      ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
      }
      ::-webkit-scrollbar-track {
        background: var(--scrollbar-track);
      }
      ::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb);
        border-radius: 6px;
        border: 3px solid var(--scrollbar-track);
      }
      ::-webkit-scrollbar-thumb:hover {
        background: var(--scrollbar-thumb-hover);
      }
    `;
    
    // Remove existing style if it exists
    const existingStyle = document.getElementById('dynamic-scrollbar-styles');
    if (existingStyle) {
      document.head.removeChild(existingStyle);
    }
    
    document.head.appendChild(style);

  }, [theme, currentTheme]);

  const contextValue = useMemo(() => ({
    theme,
    setTheme,
    themes,
    showThemeOptions,
    setShowThemeOptions,
    currentTheme
  }), [theme, showThemeOptions, currentTheme, themes]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};