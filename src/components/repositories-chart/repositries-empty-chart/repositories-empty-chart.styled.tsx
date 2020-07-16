import styled from 'styled-components';

export const Root = styled.div`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 475px;

  font-weight: bold !important;
  font-size: 18px !important;

  & > span {
    font-size: 50px;
  }
`;
