import { BrowserRouter } from 'react-router-dom';
import RouterConfig from 'navigation/RouterConfig';
import Layout from 'layouts/Layout';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from 'themes/theme';
import BaseLoadingRedux from 'components/Base/BaseLoadingRedux';
import ScrollToTop from 'navigation/ScrollToTop';
import CacheBuster from 'react-cache-buster';
import BasePageLoader from 'components/Base/BasePageLoader';
import packageJson from '../package.json';
const { version } = packageJson;

function App() {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <CacheBuster
      currentVersion={version}
      isEnabled={isProduction} //If false, the library is disabled.
      isVerboseMode={false} //If true, the library writes verbose logs to console.
      loadingComponent={<BasePageLoader />} //If not pass, nothing appears at the time of new version check.
    >
      <>
        <CssBaseline />
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <BaseLoadingRedux />
            <Layout>
              <ScrollToTop>
                <RouterConfig />
              </ScrollToTop>
            </Layout>
          </ThemeProvider>
        </BrowserRouter>
      </>
    </CacheBuster>
  );
}

export default App;
