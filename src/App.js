import { createContext, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Main from './Main';
import './index.css';
import { MAX_MOBILE_WIDTH } from './constant';
import { Header, NumberOfCountByDateProvider, ThemeProvider } from './components';
import { ThemeContext } from './components/ThemeProvider';
import MutedProvider from './components/MutedProvider';

export const LayoutContext = createContext();

function Layout({ children }) {
    const { theme } = useContext(ThemeContext);

    const styles = {
        container: { flex: 1, ...theme },
        innerContainer: {
            flex: 1,
            width: '100%',
            maxWidth: MAX_MOBILE_WIDTH,
            margin: '0px auto',
        },
    };

    return (
        <div style={styles.container}>
            <Helmet>
                <meta
                    name="theme-color"
                    content={theme.backgroundColor}
                />
            </Helmet>

            <div style={styles.innerContainer}>
                <Header />

                {children}
            </div>
        </div>
    );
}

function App() {
    useEffect(() => {
        document.addEventListener('gesturestart', (e) => {
            e.preventDefault();
            document.body.style.zoom = 1;
        });

        document.addEventListener('gesturechange', (e) => {
            e.preventDefault();

            document.body.style.zoom = 1;
        });
        document.addEventListener('gestureend', (e) => {
            e.preventDefault();
            document.body.style.zoom = 1;
        });
    }, []);

    return (
        <NumberOfCountByDateProvider>
            <ThemeProvider>
                <MutedProvider>
                    <Layout>
                        <Main />
                    </Layout>
                </MutedProvider>
            </ThemeProvider>
        </NumberOfCountByDateProvider>
    );
}

export default App;
