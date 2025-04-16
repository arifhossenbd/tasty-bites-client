import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext/ThemeContext';
import { themeConfig } from '../utils/themeConfig';

export const useTheme = () => {
  const { theme } = useContext(ThemeContext);
  const currentTheme = themeConfig.themes[theme] || themeConfig.themes.light;
  
  return {
    theme: currentTheme,
    apply: (element) => currentTheme[element] || '',
  };
};