import { useMemo } from 'react';

interface RepositoryOption {
  node: {
    stargazers: {
      totalCount: number;
    };
    name: string;
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
  name: string;
  stars: number;
  forks: number;
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
          ({ node: { stargazers, name, forks } }: RepositoryOption): RepositoryResult => ({
            stars: stargazers.totalCount,
            name,
            forks: forks.totalCount,
          }),
        ),
      };
    }
    return { elements: [], repositoryCount: 0 };
  }, [options]);
