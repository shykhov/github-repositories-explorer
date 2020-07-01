import React, { FC } from 'react';
import Link from '@material-ui/core/Link';

import { ContentRenderer } from '../../content-renderer';
import { AUTHOR_GITHUB_PROFILE_URL } from '../../../constants';
import { StyledTableRow, StyledTableCell } from './empty-table-body.styled';

export interface Props {
  called: boolean;
  error: boolean;
  hasNoQueryParameters: boolean;
  isEmptyRepositoriesList: boolean;
}

export const EmptyTableBody: FC<Props> = ({ called, error, hasNoQueryParameters, isEmptyRepositoriesList }) => (
  <StyledTableRow>
    <StyledTableCell key="empty-data" align="center" colSpan={3}>
      <ContentRenderer
        hasError={error}
        isEmpty={called && isEmptyRepositoriesList && !hasNoQueryParameters}
        emptyComponent={
          <>
            <span aria-label="emodji" role="img">
              🤷🏻‍♂️
            </span>{' '}
            <div>We couldn’t find any results. Let’s try removing some filters.</div>
          </>
        }
        errorComponent={
          <>
            <span aria-label="emodji" role="img">
              🙅🏻‍♂️
            </span>
            <div>
              Something went wrong. Please{' '}
              <Link href={AUTHOR_GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                contact the author
              </Link>{' '}
              of the project.
            </div>
          </>
        }
        contentComponent={
          <>
            <span aria-label="emodji" role="img">
              🕵🏻
            </span>{' '}
            <div>Enter repository name or choose github user to start our journey.</div>
          </>
        }
      />
    </StyledTableCell>
  </StyledTableRow>
);
