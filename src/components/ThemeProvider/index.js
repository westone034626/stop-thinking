import { useLocalStorageState } from 'ahooks';
import { createContext, useMemo } from 'react';
import { ColorMap } from '../../constant';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState('@stop-thinking/is-dark-mode', { defaultValue: false });

    const layoutContext = useMemo(() => ({
        isDarkMode,
        toggleIsDarkMode: () => setIsDarkMode((p) => !p),
        theme: ColorMap[isDarkMode ? 'dark' : 'light'],
        reverseTheme: ColorMap[isDarkMode ? 'light' : 'dark'],
    }), [isDarkMode]);

    return (
        <ThemeContext.Provider value={layoutContext}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;