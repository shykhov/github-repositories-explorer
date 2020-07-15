import { RepositoryResult } from './format-repositories';

export interface ChartDataResult {
  name: string | null;
  forks: number | null;
  stars: number | null;
}

export const generateChartData = (repositories: RepositoryResult[]): ChartDataResult[] =>
  repositories.map(({ nameWithOwner, forks, stars }) => ({
    name: nameWithOwner,
    forks,
    stars,
  }));
