import Main from "./Main";
import './index.css';
import { ColorMap, MAX_MOBILE_WIDTH } from './constant';
import { createContext, useEffect, useMemo } from "react";
import { useLocalStorageState } from "ahooks";
import DarkModeIcon from './assets/icons/dark-mode.webp';
import LightModeIcon from './assets/icons/light-mode.webp';
import { ButtonWithReaction } from "./components";

export const LayoutContext = createContext();

function LayoutProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState('@stop-thinking/is-dark-mode', { defaultValue: false });

  const layoutContext = useMemo(() => ({
    isDarkMode,
    toggleIsDarkMode: () => setIsDarkMode((p) => !p),
    theme: ColorMap[isDarkMode ? 'dark' : 'light'],
  }), [isDarkMode]);

  const styles = {
    container: { flex: 1, position: 'relative', ...layoutContext.theme },
    innerContainer: {
      flex: 1,
      width: '100%',
      maxWidth: MAX_MOBILE_WIDTH,
      margin: '0px auto',
    },
    modeChanger: {
      position: 'absolute',
      top: 24,
      right: 24,
    },
    modeIcon: {},
  };

  const modeIcon = isDarkMode ? LightModeIcon : DarkModeIcon;

  return (
    <LayoutContext.Provider value={layoutContext}>
      <div style={styles.container}>
        <div style={styles.innerContainer}>
          {children}

          <div style={styles.modeChanger}>
            <ButtonWithReaction
              onClick={layoutContext.toggleIsDarkMode}
              radius={24}
            >
              <img style={styles.modeIcon} src={modeIcon} width={24} height={24} />
            </ButtonWithReaction>
          </div>
        </div>
      </div>
    </LayoutContext.Provider>
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
