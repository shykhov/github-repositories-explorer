import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import { Application } from './containers/application';
import { client } from './apollo';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Application />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
