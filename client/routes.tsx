import * as React from 'react';
import { History } from 'history';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import ZoneFinder from './components/ZoneFinder/ZoneFinder';

export default (history: History<any>) => {
  return (
    <Route>
      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>

      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/home" exact component={Home} />
      <Route path="/zone-finder" exact component={ZoneFinder} />
    </Route>
  );
};
