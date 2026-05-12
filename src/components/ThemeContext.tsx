import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Theme } from '@carbon/react';

type ThemeName = 'white' | 'g100';

interface ThemeContextValue {
    theme: ThemeName;
    toggle: () => void;
    isDark: boolean;
    chartTheme: 'white' | 'g100';
}

const STORAGE_KEY = 'dagr.theme';

const ThemeCtx = createContext<ThemeContextValue>({
    theme: 'white',
    toggle: () => {},
    isDark: false,
    chartTheme: 'white',
});

export const useDagrTheme = () => useContext(ThemeCtx);

export const DagrThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<ThemeName>(() => {
        if (typeof window === 'undefined') return 'white';
        return (window.localStorage.getItem(STORAGE_KEY) as ThemeName | null) ?? 'white';
    });

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, theme);
        document.documentElement.setAttribute('data-carbon-theme', theme);
    }, [theme]);

    const toggle = () => setTheme(prev => (prev === 'white' ? 'g100' : 'white'));

    return (
        <ThemeCtx.Provider value={{ theme, toggle, isDark: theme === 'g100', chartTheme: theme }}>
            <Theme theme={theme}>
                {children}
            </Theme>
        </ThemeCtx.Provider>
    );
};
