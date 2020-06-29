import gql from 'graphql-tag';

export const FETCH_USERS = gql`
  query($name: String!) {
    search(query: $name, first: 100, type: USER) {
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
