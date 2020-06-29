export const REPOSITORIES_PATHNAME = '/repositories';

export const REPOSITORIES_PER_PAGE = 50;

export const DEFAULT_DEBOUNCE_TIMEOUT = 1500;

export const USER_LOGIN_PARAMETER = 'userLogin';

export const REPOSITORY_NAME_PARAMETER = 'repositoryNameSearch';

export const REPOSITORY_NAME_QUERY_KEY = 'in:name';

export const DEFAULT_REPOSITORY_SORT_QUERY = { sort: 'stars' };

export const PAGINATION_DIRECTION = {
  last: 'last',
  first: 'first',
};

export const REPOSITORIES_DEFAULT_DATA = {
  elements: [],
  repositoryCount: 0,
  pageInfo: { endCursor: '', hasNextPage: false, hasPreviousPage: false, startCursor: '' },
};

interface RepositryTableColumn {
  id: 'nameWithOwner' | 'stars' | 'forks';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

export const REPOSITORY_TABLE_COLUMNS: RepositryTableColumn[] = [
  { id: 'nameWithOwner', label: 'Owner/Name', minWidth: 170 },
  { id: 'stars', label: 'Stars', align: 'center' },
  {
    id: 'forks',
    label: 'Forks',
    align: 'center',
  },
];
