import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const StyledTableCell = styled(TableCell)`
  font-weight: bold !important;
  font-size: 18px !important;

  & > span {
    font-size: 40px;
  }
`;

export const StyledTableRow = styled(TableRow)`
  height: 384px;
`;
