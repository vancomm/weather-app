import { createContext, useContext, useMemo, useState } from "react";
import { TimeOfDay } from "../types";

export interface Theme {
  timeOfDay: TimeOfDay;
}

const defaultTheme: Theme = { timeOfDay: "day" };

export interface IThemeContext {
  theme: Theme;
  setTheme: (value: React.SetStateAction<Theme>) => void;
}

const ThemeContext = createContext<IThemeContext | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(defaultTheme);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext)!;
