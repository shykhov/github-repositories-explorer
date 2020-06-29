import React from 'react';
import Paper from '@material-ui/core/Paper';

import { Select, customSelectStyles } from './user-search-select.styled';
import { SearchOption } from './search-option';

interface InputOptions {
  inputValue?: string;
}

export interface SelectValue {
  value: string;
  label: string;
  iconSrc: string;
}

interface SearchBarProps {
  onInputChange(): void;
  onSelectChange(user: SelectValue): void;
  value: SelectValue | undefined;
  loading: boolean;
  options: any;
}

export const UserSearchSelect = (props: SearchBarProps) => {
  const { onInputChange, onSelectChange, value, loading, options } = props;

  return (
    <Paper elevation={10}>
      <Select
        styles={customSelectStyles}
        isLoading={loading}
        value={value}
        cacheOptions
        isSearchable
        maxMenuHeight={200}
        components={{ Option: SearchOption, SingleValue: SearchOption }}
        isClearable
        onChange={onSelectChange}
        noOptionsMessage={({ inputValue }: InputOptions) =>
          !inputValue && !loading ? 'Type user name e.g. "Dan Abramov"' : null
        }
        placeholder="Search for github user name"
        options={options}
        onInputChange={onInputChange}
      />
    </Paper>
  );
};
