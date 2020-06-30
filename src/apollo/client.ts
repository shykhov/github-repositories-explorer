import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

export interface ProcessEnv {
  [REACT_APP_GH_AUTH_TOKEN: string]: string | undefined;
}

const { REACT_APP_GH_AUTH_TOKEN = '' }: ProcessEnv = process.env;

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${REACT_APP_GH_AUTH_TOKEN}`,
  },
});
