import gql from 'graphql-tag';

import { REPOSITORIES_PER_PAGE } from '../../constants';

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
  query($queryString: String!, $after: String) {
    search(query: $queryString, type: REPOSITORY, first: 50, after: $after) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        node {
          ... on Repository {
            id
            nameWithOwner
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
            url
          }
        }
      }
    }
  }
`;
