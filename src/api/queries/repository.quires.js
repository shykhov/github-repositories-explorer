import gql from 'graphql-tag';

export const FETCH_REPOSTORIES_BY_USER = gql`
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
export const FETCH_REPOSTORIES = gql`
  query($queryString: String!, $repositoryItemsCount: Int!) {
    search(query: $queryString, type: REPOSITORY, first: $repositoryItemsCount) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            descriptionHTML
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
            updatedAt
          }
        }
      }
    }
  }
`;
