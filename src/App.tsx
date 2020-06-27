import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Home } from './pages/home';

export const App = () => (
  <Router>
    <Switch>
      <Route exact component={Home} path="/repositories" />
      <Redirect to="/repositories" />
    </Switch>
  </Router>
);
