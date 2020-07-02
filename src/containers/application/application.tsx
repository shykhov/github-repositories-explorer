import React, { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { HomeContainer } from '../../pages/home';
import { REPOSITORIES_PATHNAME } from '../../constants';

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

export const Application: FC = () => (
  <BrowserRouter history={history}>
    <Switch>
      <Route exact component={HomeContainer} path={REPOSITORIES_PATHNAME} />
      <Redirect to={REPOSITORIES_PATHNAME} />
    </Switch>
  </BrowserRouter>
);
