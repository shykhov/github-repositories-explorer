import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Home } from './pages/home';
import { REPOSITORIES_PATHNAME, DEFAULT_PATHNAME } from './constants';

export const App = () => (
  <Router>
    <Switch>
      <Route exact component={Home} path={REPOSITORIES_PATHNAME} />
      <Redirect to={DEFAULT_PATHNAME} />
    </Switch>
  </Router>
);
