import styled from 'styled-components';
import ReactSelect from 'react-select';

export const Select = styled(ReactSelect)`
  font-family: 'Lato', sans-serif;
  & > div {
    min-height: 48px;
    font-size: 16px;
  }
`;

export const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    minHeight: '48px',
    border: 'none',
    borderColor: 'transparent !important',
    boxShadow: 'none',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    marginLeft: '45px',
    color: 'hsl(0,0%,71%)',
  }),
  input: (provided: any) => ({
    ...provided,
    marginLeft: '45px',
  }),
};
