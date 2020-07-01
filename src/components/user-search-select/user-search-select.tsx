import React, { FC } from 'react';
import Paper from '@material-ui/core/Paper';

import { SelectOptions, SelectOption } from '../../utils';
import { Select, customSelectStyles } from './user-search-select.styled';
import { SearchOption } from './search-option';

type NoOptionsEvent = {
  inputValue: string | undefined;
};

export interface Props {
  onInputChange(inputValue?: string): void;
  onSelectChange(user: SelectOption): void;
  value: SelectOption | undefined;
  loading: boolean;
  options: SelectOptions;
  noOptionsMessage?: string;
  inputValue: string;
}

export const UserSearchSelect: FC<Props> = props => {
  const { onInputChange, onSelectChange, value, loading, options, inputValue, noOptionsMessage } = props;

  const generateNoOptionsMessage = (event: NoOptionsEvent): string | undefined =>
    !event.inputValue && !loading ? noOptionsMessage : undefined;

  return (
    <Paper elevation={10}>
      <Select
        styles={customSelectStyles}
        isLoading={loading}
        inputValue={inputValue}
        value={value}
        cacheOptions
        isSearchable
        maxMenuHeight={200}
        components={{ Option: SearchOption, SingleValue: SearchOption }}
        isClearable
        onChange={onSelectChange}
        noOptionsMessage={generateNoOptionsMessage}
        placeholder="Search for github user name"
        options={options}
        onInputChange={onInputChange}
      />
    </Paper>
  );
};

UserSearchSelect.defaultProps = {
  noOptionsMessage: 'Type user name e.g. "Dan Abramov"',
};
