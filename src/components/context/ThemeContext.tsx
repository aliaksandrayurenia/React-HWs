import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";
export type ThemePreference = "system" | Theme;

type ThemeContextValue = {
  theme: Theme; 
  preference: ThemePreference; 
  setPreference: (next: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "theme-preference";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
    return saved ?? "system";
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
    const pref = saved ?? "system";
    return pref === "system" ? getSystemTheme() : pref;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, preference);

    const apply = () => {
      setTheme(preference === "system" ? getSystemTheme() : preference);
    };

    apply();

    if (preference !== "system") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = () => apply();

    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, [preference]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const value = useMemo(
    () => ({ theme, preference, setPreference }),
    [theme, preference]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
