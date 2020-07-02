import styled from 'styled-components';

export const Root = styled.div`
  margin: 50px;
  display: flex;
  justify-content: center;

  @media (max-width: 1200px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const ControlsWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 0 0 50px;

  @media (max-width: 1200px) {
    margin: 0 0 30px 0;
    max-width: 500px;
    width: 100%;
  }

  & > div:first-of-type {
    margin-bottom: 25px;
  }
`;
