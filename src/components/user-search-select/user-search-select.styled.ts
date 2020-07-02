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
  control: (provided: Record<string, unknown>): Record<string, unknown> => ({
    ...provided,
    minHeight: '48px',
    border: 'none',
    borderColor: 'transparent !important',
    boxShadow: 'none',
  }),
  valueContainer: (provided: Record<string, unknown>): Record<string, unknown> => ({
    ...provided,
    flexWrap: 'no-wrap',
    minHeight: '52px',
  }),
  placeholder: (provided: Record<string, unknown>): Record<string, unknown> => ({
    ...provided,
    marginLeft: '45px',
    color: 'hsl(0,0%,71%)',
  }),
  input: (provided: Record<string, unknown>): Record<string, unknown> => ({
    ...provided,
    marginLeft: '45px',
  }),
  menu: (provided: Record<string, unknown>): Record<string, unknown> => ({
    ...provided,
    zIndex: 2,
  }),
};
