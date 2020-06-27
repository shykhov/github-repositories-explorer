import styled from 'styled-components';
import ReactSelect from 'react-select';

export const Select = styled(ReactSelect)`
  & > div {
    min-height: 45px;
    font-size: 16px;
  }
`;

export const BarWrapper = styled.div`
  margin: 0 0 30px;
`;

export const ImageWrapper = styled.div`
  width: 25px;
  height: 25px;

  & > img {
    border-radius: 5px;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;
