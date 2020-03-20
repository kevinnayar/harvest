import * as React from 'react';
import { History } from 'history';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

import AuthContainer from './containers/AuthContainer/AuthContainer';
import HomeContainer from './containers/HomeContainer/HomeContainer';

export default (history: History<any>) => {
  return (
    <Route>
      <Route path="/" exact>
        <Redirect to="/auth" />
      </Route>
      <Route path="/auth" exact component={AuthContainer} />
      <Route path="/home" exact component={HomeContainer} />
    </Route>
  );
};


