import * as React from 'react';
import { History } from 'history';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import ZipcodeTest from './components/ZipcodeTest/ZipcodeTest';

export default (history: History<any>) => {
  return (
    <Route>
      <Route path="/" exact>
        <Redirect to="/auth" />
      </Route>
      <Route path="/auth" exact component={Login} />
      <Route path="/home" exact component={Home} />
      <Route path="/zipcode" exact component={ZipcodeTest} />
    </Route>
  );
};
