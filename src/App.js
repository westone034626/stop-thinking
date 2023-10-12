import Main from "./Main";
import './index.css';
import { MAX_MOBILE_WIDTH } from './constant';
import { useEffect } from "react";

function Layout({ children }) {
  const styles = {
    container: {
      flex: 1,
      width: '100%',
      maxWidth: MAX_MOBILE_WIDTH,
      margin: '0px auto',
    }
  };
  return (
    <div style={styles.container}>{children}</div>
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
    <Layout>
      <Main />
    </Layout>
  );
}

export default App;
