import React, { ChangeEvent, KeyboardEvent, SFC } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { useStyles } from './repositories.search.styled';

interface Props {
  handleSearchInputChange(event: ChangeEvent<HTMLInputElement>): void;
  loading: boolean;
  value: string | undefined;
  debouncedSubmitInputSearch: {
    flush(value: string | undefined): void;
  };
}

export const RepositoriesSearchInput = (props: Props) => {
  const { handleSearchInputChange, debouncedSubmitInputSearch, loading, value } = props;
  const classes = useStyles();

  const submitSearch = () => {
    debouncedSubmitInputSearch.flush(value);
  };

  const handleEnterKeyPress = (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      debouncedSubmitInputSearch.flush(value);
    }
  };

  return (
    <Paper elevation={10} className={classes.root}>
      <InputBase
        value={value}
        onChange={handleSearchInputChange}
        className={classes.input}
        onKeyDown={handleEnterKeyPress}
        placeholder="Search for repository name"
        startAdornment={
          <InputAdornment className={classes.adornment} position="start">
            {loading && <CircularProgress size={20} />}
          </InputAdornment>
        }
        inputProps={{ 'aria-label': 'search github repository' }}
      />
      <IconButton onClick={submitSearch} className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
