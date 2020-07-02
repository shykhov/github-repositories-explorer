import React, { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { HomeContainer } from '../../pages/home';
import { REPOSITORIES_PATHNAME } from '../../constants';

export const Application: FC = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact component={HomeContainer} path={REPOSITORIES_PATHNAME} />
      <Redirect to={REPOSITORIES_PATHNAME} />
    </Switch>
  </BrowserRouter>
);
