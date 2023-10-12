import Main from "./Main";
import './index.css';
import { MAX_MOBILE_WIDTH } from './constant';

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
  return (
    <Layout>
      <Main />
    </Layout>
  );
}

export default App;
