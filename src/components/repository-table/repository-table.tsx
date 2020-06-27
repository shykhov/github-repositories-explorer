import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

interface Column {
  id: 'name' | 'stars' | 'forks';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'stars', label: 'Stars', minWidth: 100 },
  {
    id: 'forks',
    label: 'Forks',
    minWidth: 170,
  },
];

interface Data {
  name: string;
  stars: number;
  forks: number;
}

function createData(name: string, forks: number, stars: number): Data {
  return { name, forks, stars };
}

const rows = [
  createData('IN', 1324171354, 3287263),
  createData('CN', 1403500365, 9596961),
  createData('IT', 60483973, 301340),
  createData('US', 327167434, 9833520),
  createData('CA', 37602103, 9984670),
  createData('AU', 25475400, 7692024),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

interface Props {
  loading: boolean;
  repositories: unknown;
  handleChangePage(event: unknown, newPage: number): void;
  handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>): void;
  page: number;
  rowsPerPage: number;
}

export const RepositoryTable = (props: Props) => {
  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                {columns.map(column => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
