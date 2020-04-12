import * as React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory, History } from 'history';
import { Provider } from 'react-redux';
import store from './store/store';
import routes from './routes';

function DevModeBanner() {
  const styles: React.CSSProperties = {
    position: 'fixed',
    right: 20,
    bottom: 20,
    height: 50,
    lineHeight: '50px',
    width: 200,
    background: '#ff6103',
    color: 'white',
    textAlign: 'center',
    fontFamily: `"Courier New", Courier, monospace`,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    zIndex: 1,
    borderRadius: 25,
  };
  return <div style={styles}>&#9733; dev mode &#9733;</div>;
}

const history: History<any> = createBrowserHistory();

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        {routes(history)}
        {process.env.NODE_ENV === 'development' && <DevModeBanner />}
      </Router>
    </Provider>
  );
}
