import gql from 'graphql-tag';

export const FETCH_REPOSTORIES = gql`
  query($queryString: String!, $before: String, $after: String, $first: Int, $last: Int) {
    search(query: $queryString, type: REPOSITORY, first: $first, last: $last, before: $before, after: $after) {
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
