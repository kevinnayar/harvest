import * as React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory, History } from 'history';
import { Provider } from 'react-redux';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider } from 'baseui';

import config from './config';
import routes from './routes';
import theme from './theme';
import store from './store/store';

import BasePage from './components-core/BasePage/BasePage';
import DevModeBanner from './components-core/DevModeBanner/DevModeBanner';

import './assets/styles/reset.css';

const engine = new Styletron();
const history: History<any> = createBrowserHistory();

export default function App() {
  return (
    <Provider store={store}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={theme}>
          <BasePage>
            <Router history={history}>
              {routes(history)}
              {config.isDevMode && <DevModeBanner />}
            </Router>
          </BasePage>
        </BaseProvider>
      </StyletronProvider>
    </Provider>
  );
}

