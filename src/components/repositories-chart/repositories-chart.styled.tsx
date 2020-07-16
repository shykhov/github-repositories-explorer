import styled from 'styled-components';
import { Paper } from '@material-ui/core';

export const ChartWrapper = styled.div`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  display: flex;
  justify-content: center;
`;

export const StyledPaper = styled(Paper)`
  width: 1250px;
  max-width: 100%;
  margin: 50px;
  overflow: hidden;

  @media (max-width: 1200px) {
    min-width: 800px;
    margin: 50px;
  }
`;
