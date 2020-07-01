interface RepositryTableColumn {
  id: 'nameWithOwner' | 'stars' | 'forks';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
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
