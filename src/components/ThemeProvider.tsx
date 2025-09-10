import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type ColorTheme = 'blue' | 'purple';

interface ThemeContextType {
  theme: Theme;
  colorTheme: ColorTheme;
  setTheme: (theme: Theme) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [colorTheme, setColorTheme] = useState<ColorTheme>('blue');

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Apply dark/light mode
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Apply color theme
    root.classList.remove('theme-blue', 'theme-purple');
    root.classList.add(`theme-${colorTheme}`);
  }, [theme, colorTheme]);

  const value = {
    theme,
    colorTheme,
    setTheme,
    setColorTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}