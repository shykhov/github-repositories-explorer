import React, { FC } from 'react';
import ContentLoader from 'react-content-loader';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import range from 'lodash/range';

const mockData = range(10);

export const LoadingTableBody: FC = () => (
  <>
    {mockData.map((value: number) => (
      <TableRow key={value} role="checkbox">
        <TableCell colSpan={3} padding="none">
          <ContentLoader foregroundColor="#BCCCDC" backgroundColor="#F0F4F8" height={49} width={1024} speed={2}>
            <rect x="0" y="0" rx="0" ry="0" width="1024" height="49" />
          </ContentLoader>
        </TableCell>
      </TableRow>
    ))}
  </>
);
