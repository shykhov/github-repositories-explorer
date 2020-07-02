import ApolloClient from 'apollo-boost';

import { cache } from './fragment-matcher';

export interface ProcessEnv {
  [key: string]: string | undefined;
}

const {
  REACT_APP_GH_AUTH_LOCAL_TOKEN = '',
  REACT_APP_GH_AUTH_PRODUCTION_TOKEN = '',
  NODE_ENV,
}: ProcessEnv = process.env;

export const client = new ApolloClient({
  cache,
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${
      NODE_ENV === 'production' ? REACT_APP_GH_AUTH_PRODUCTION_TOKEN : REACT_APP_GH_AUTH_LOCAL_TOKEN
    }`,
    Accept: 'application/vnd.github.machine-man-preview+json',
  },
});
