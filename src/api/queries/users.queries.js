import gql from 'graphql-tag';

export const FETCH_USERS = gql`
  query($name: String!, $userItemsCount: Int!) {
    search(query: $name, first: $userItemsCount, type: USER) {
      edges {
        node {
          ... on User {
            id
            login
            name
            avatarUrl
          }
        }
      }
    }
  }
`;
