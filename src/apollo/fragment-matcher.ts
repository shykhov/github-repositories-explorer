import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';

import introspectionQueryResultData from './fragment-types.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

export const cache = new InMemoryCache({ fragmentMatcher });
