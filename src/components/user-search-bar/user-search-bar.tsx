import React from 'react';

import { Select, BarWrapper } from './user-search-bar.styled';
import { SearchOption } from '../search-option';

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
  value: SelectValue;
  loading: boolean;
  refetch(): void;
  options: any;
}

export const UserSearchBar = (props: SearchBarProps) => {
  const { onInputChange, onSelectChange, value, loading, refetch, options } = props;

  return (
    <BarWrapper>
      <Select
        isLoading={loading}
        loadOptions={refetch}
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
        placeholder="Search for github user name..."
        options={options}
        onInputChange={onInputChange}
      />
    </BarWrapper>
  );
};
