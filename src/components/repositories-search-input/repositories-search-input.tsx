import React, { ChangeEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    adornment: {
      minWidth: 20,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

interface Props {
  handleSearchInputChange(event: ChangeEvent<HTMLInputElement>): void;
  loading: boolean;
  value: string | undefined;
}

export const RepositoriesSearchInput = (props: Props) => {
  const { handleSearchInputChange, loading, value } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <InputBase
        value={value}
        onChange={handleSearchInputChange}
        className={classes.input}
        placeholder="Search for repository name"
        startAdornment={
          <InputAdornment className={classes.adornment} position="start">
            {loading && <CircularProgress size={20} />}
          </InputAdornment>
        }
        inputProps={{ 'aria-label': 'search github repository' }}
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
