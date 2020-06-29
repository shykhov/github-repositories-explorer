import React, { FC } from 'react';
import Paper from '@material-ui/core/Paper';

import { SelectOptions, SelectOption } from '../../utils';
import { Select, customSelectStyles } from './user-search-select.styled';
import { SearchOption } from './search-option';

type NoOptionsCallback = {
  inputValue: string | undefined;
};

interface Props {
  onInputChange(inputValue?: string): void;
  onSelectChange(user: SelectOption): void;
  value: SelectOption | undefined;
  loading: boolean;
  options: SelectOptions;
}

export const UserSearchSelect: FC<Props> = props => {
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
        noOptionsMessage={({ inputValue }: NoOptionsCallback) =>
          !inputValue && !loading ? 'Type user name e.g. "Dan Abramov"' : null
        }
        placeholder="Search for github user name"
        options={options}
        onInputChange={onInputChange}
      />
    </Paper>
  );
};
