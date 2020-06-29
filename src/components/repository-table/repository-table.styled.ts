import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

export const StyledTableContainer = styled(TableContainer)`
  max-height: 440px;
`;

export const StyledPaper = styled(Paper)`
  max-width: 800px;
`;

export const StyledTableCell = styled(TableCell)`
  font-weight: bold !important;
`;

export const StyledTable = styled(Table)`
  table-layout: fixed;
`;
