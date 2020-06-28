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
};

export const useFormatRepositories = (options: RepositoryOptions): RepositoryResultData =>
  useMemo(() => {
    if (options && options.search && options.search.edges) {
      return {
        repositoryCount: options.search.repositoryCount,
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
    return { elements: [], repositoryCount: 0 };
  }, [options]);
