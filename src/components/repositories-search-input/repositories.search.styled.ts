import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

export const StyledPaper = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
`;

export const StyledInputBase = styled(InputBase)`
  margin-left: 41px;
  font-family: 'Lato', sans-serif;
  flex: 1;
`;

export const StyledInputAdornment = styled(InputAdornment)`
  max-width: 20px;
`;

export const StyledIconButton = styled(IconButton)`
  padding: 10px;
`;
