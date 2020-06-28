import { useMemo } from 'react';

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

const defaultValue = {
  elements: [],
  repositoryCount: 0,
  pageInfo: { endCursor: '', hasNextPage: false, hasPreviousPage: false, startCursor: '' },
};

export const useFormatRepositories = (options: RepositoryOptions): RepositoryResultData =>
  useMemo(() => {
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
    return defaultValue;
  }, [options]);
