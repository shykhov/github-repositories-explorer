import { REPOSITORIES_DEFAULT_DATA } from '../constants';

interface RepositoryOption {
  node: {
    stargazers: {
      totalCount: number;
    };
    id: string;
    url: string;
    nameWithOwner: string;
    forks: {
      totalCount: number;
    };
  };
}

interface RepositoryOptions {
  search: {
    repositoryCount: number;
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
    };
    edges: [RepositoryOption];
  };
}

export interface RepositoryResult {
  nameWithOwner: string;
  stars: number;
  forks: number;
  url: string;
  id: string;
}

export type RepositoryResultData = {
  elements: Array<RepositoryResult>;
  repositoryCount: number;
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
};

export const formatRepositories = (options: RepositoryOptions): RepositoryResultData => {
  if (options && options.search && options.search.edges) {
    return {
      repositoryCount: options.search.repositoryCount,
      pageInfo: options.search.pageInfo,
      elements: options.search.edges.map(
        ({ node: { stargazers, nameWithOwner, forks, url, id } }: RepositoryOption): RepositoryResult => ({
          stars: stargazers.totalCount,
          nameWithOwner,
          forks: forks.totalCount,
          url,
          id,
        }),
      ),
    };
  }
  return REPOSITORIES_DEFAULT_DATA;
};
