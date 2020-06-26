import gql from 'graphql-tag';

export const FETCH_REPOSTORIES = gql`
  query($login: String!, $repositoryItemsCount: Int!) {
    user(login: $login) {
      id
      login
      repositories(first: $repositoryItemsCount) {
        nodes {
          id
          name
          forkCount
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;
