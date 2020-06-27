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
    edges: [RepositoryOption];
  };
}

interface RepositoryResult {
  name: string;
  stars: number;
  forks: number;
}

type RepositoryResultOptions = Array<RepositoryResult>;

export const useFormatRepositories = (options: RepositoryOptions): RepositoryResultOptions =>
  useMemo(() => {
    if (options && options.search && options.search.edges) {
      return options.search.edges.map(
        ({ node: { stargazers, name, forks } }: RepositoryOption): RepositoryResult => ({
          stars: stargazers.totalCount,
          name,
          forks: forks.totalCount,
        }),
      );
    }
    return [];
  }, [options]);
