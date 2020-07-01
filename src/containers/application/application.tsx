import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { HomeContainer } from '../../pages/home';
import { REPOSITORIES_PATHNAME } from '../../constants';

export const Application: FC = () => (
  <Router>
    <Switch>
      <Route exact component={HomeContainer} path={REPOSITORIES_PATHNAME} />
      <Redirect to={REPOSITORIES_PATHNAME} />
    </Switch>
  </Router>
);
