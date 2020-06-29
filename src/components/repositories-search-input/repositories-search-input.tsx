import React, { ChangeEvent, KeyboardEvent, FC } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';

import { StyledPaper, StyledInputBase, StyledInputAdornment, StyledIconButton } from './repositories.search.styled';

interface Props {
  handleSearchInputChange(event: ChangeEvent<HTMLInputElement>): void;
  loading: boolean;
  value: string | undefined;
  debouncedSubmitInputSearch: {
    flush(value: string | undefined): void;
  };
}

export const RepositoriesSearchInput: FC<Props> = props => {
  const { handleSearchInputChange, debouncedSubmitInputSearch, loading, value } = props;

  const submitSearch = () => {
    debouncedSubmitInputSearch.flush(value);
  };

  const handleEnterKeyPress = (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      debouncedSubmitInputSearch.flush(value);
    }
  };

  return (
    <StyledPaper elevation={10}>
      <StyledInputBase
        value={value}
        onChange={handleSearchInputChange}
        onKeyDown={handleEnterKeyPress}
        placeholder="Search for repository name"
        startAdornment={
          <StyledInputAdornment position="start">
            {loading && value && <CircularProgress size={20} />}
          </StyledInputAdornment>
        }
        inputProps={{ 'aria-label': 'search github repository' }}
      />
      <StyledIconButton onClick={submitSearch} aria-label="search">
        <SearchIcon />
      </StyledIconButton>
    </StyledPaper>
  );
};
