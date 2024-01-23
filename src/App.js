import Main from "./Main";
import './index.css';
import { ColorMap, MAX_MOBILE_WIDTH } from './constant';
import { createContext, useEffect, useMemo } from "react";
import { useLocalStorageState } from "ahooks";

export const LayoutContext = createContext();

function LayoutProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState('@stop-thinking/is-dark-mode', { defaultValue: false });

  const layoutContext = useMemo(() => ({
    isDarkMode,
    toggleIsDarkMode: () => setIsDarkMode((p) => !p),
    theme: ColorMap[isDarkMode ? 'dark' : 'light'],
  }), [isDarkMode]);

  const styles = {
    container: { flex: 1, ...layoutContext.theme },
    innerContainer: {
      flex: 1,
      width: '100%',
      maxWidth: MAX_MOBILE_WIDTH,
      margin: '0px auto',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <LayoutContext.Provider value={layoutContext}>
          {children}
        </LayoutContext.Provider>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    document.addEventListener("gesturestart", function (e) {
      e.preventDefault();
      document.body.style.zoom = 1;
    });

    document.addEventListener("gesturechange", function (e) {
      e.preventDefault();

      document.body.style.zoom = 1;
    });
    document.addEventListener("gestureend", function (e) {
      e.preventDefault();
      document.body.style.zoom = 1;
    });
  }, []);

  return (
    <LayoutProvider>
      <Main />
    </LayoutProvider>
  );
}

export default App;
