import ApolloClient from 'apollo-boost';

import { cache } from './fragment-matcher';

export interface ProcessEnv {
  [REACT_APP_GH_AUTH_TOKEN: string]: string | undefined;
}

const { REACT_APP_GH_AUTH_TOKEN = '' }: ProcessEnv = process.env;

export const client = new ApolloClient({
  cache,
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${REACT_APP_GH_AUTH_TOKEN}`,
  },
});
