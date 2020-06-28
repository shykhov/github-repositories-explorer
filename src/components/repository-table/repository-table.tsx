import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { RepositoryResultData, RepositoryResult } from '../../hooks';
import { REPOSITORIES_PER_PAGE } from '../../constants';

interface Column {
  id: 'nameWithOwner' | 'stars' | 'forks';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'nameWithOwner', label: 'Owner/Name', minWidth: 170 },
  { id: 'stars', label: 'Stars', minWidth: 100, align: 'center' },
  {
    id: 'forks',
    label: 'Forks',
    minWidth: 170,
    align: 'center',
  },
];

const useStyles = makeStyles({
  root: {
    maxWidth: '800px',
  },
  container: {
    maxHeight: 440,
  },
  headCell: {
    fontWeight: 'bold',
  },
  table: {
    tableLayout: 'fixed',
  },
});

interface Props {
  loading: boolean;
  repositoriesData: RepositoryResultData;
  handleChangePage(event: unknown, newPage: number): void;
  page: number;
}

export const RepositoryTable: FC<Props> = props => {
  const { handleChangePage, page, repositoriesData } = props;
  const classes = useStyles();

  return (
    <Paper elevation={5} className={classes.root}>
      <TableContainer className={classes.container}>
        <Table className={classes.table} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  className={classes.headCell}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {repositoriesData.elements.map((repository: RepositoryResult) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={repository.id}>
                {columns.map(column => {
                  const value = repository[column.id];
                  const formattedValue = column.format && typeof value === 'number' ? column.format(value) : value;
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {repository.url && column.id === 'nameWithOwner' ? (
                        <Link href={repository.url} target="_blank" rel="noopener noreferrer">
                          {formattedValue}
                        </Link>
                      ) : (
                        formattedValue
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[50]}
        rowsPerPage={REPOSITORIES_PER_PAGE}
        component="div"
        count={repositoriesData.repositoryCount}
        page={page}
        onChangePage={handleChangePage}
      />
    </Paper>
  );
};
