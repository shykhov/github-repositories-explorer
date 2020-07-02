import React, { FC } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import { HomeContainer } from '../../pages/home';
import { DEFAULT_PATHNAME } from '../../constants';

export const Application: FC = () => (
  <HashRouter hashType="noslash">
    <Switch>
      <Route exact component={HomeContainer} path={DEFAULT_PATHNAME} />
      <Redirect to={DEFAULT_PATHNAME} />
    </Switch>
  </HashRouter>
);
