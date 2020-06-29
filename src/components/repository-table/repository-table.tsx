import React, { FC } from 'react';
import Link from '@material-ui/core/Link';
import isEmpty from 'lodash/isEmpty';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { StyledTable, StyledTableContainer, StyledPaper, StyledTableCell } from './repository-table.styled';
import { EmptyTableBody } from './empty-table-body';
import { LoadingTableBody } from './loading-table-body';
import { RepositoryResultData, RepositoryResult } from '../../utils';
import { ContentRenderer } from '../content-renderer';
import { REPOSITORIES_PER_PAGE, REPOSITORY_TABLE_COLUMNS } from '../../constants';

interface Props {
  error: boolean;
  called: boolean;
  loading: boolean;
  repositoriesData: RepositoryResultData;
  handleChangePage(event: unknown, newPage: number): void;
  page: number;
}

export const RepositoryTable: FC<Props> = props => {
  const { handleChangePage, page, repositoriesData, loading, called, error } = props;

  return (
    <StyledPaper elevation={10}>
      <StyledTableContainer>
        <StyledTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {REPOSITORY_TABLE_COLUMNS.map(column => (
                <StyledTableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <ContentRenderer
              isLoading={loading}
              isEmpty={isEmpty(repositoriesData.elements)}
              emptyComponent={<EmptyTableBody error={error} called={called} />}
              loadingComponent={<LoadingTableBody />}
              contentComponent={
                <>
                  {repositoriesData.elements.map((repository: RepositoryResult) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={repository.id}>
                      {REPOSITORY_TABLE_COLUMNS.map(column => {
                        const value = repository[column.id];
                        const formattedValue =
                          column.format && typeof value === 'number' ? column.format(value) : value;
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
                </>
              }
            />
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
      <TablePagination
        rowsPerPageOptions={[50]}
        rowsPerPage={REPOSITORIES_PER_PAGE}
        component="div"
        count={loading ? -1 : repositoriesData.repositoryCount}
        page={page}
        onChangePage={handleChangePage}
      />
    </StyledPaper>
  );
};
