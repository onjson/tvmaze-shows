import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: '1rem 0',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
};

const SearchForm = ({ classes, query, push }) => {
  const [value, setValue] = useState(query);

  const search = () => {
    if (value !== '') {
      push(`/shows?query=${value}`);
    }
  };

  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase
        className={classes.input}
        placeholder="Search Shows"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={(e) => e.keyCode === 13 && search()}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="Search"
        onClick={search}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

SearchForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  query: PropTypes.string,
  push: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  query: '',
};

export default withStyles(styles)(SearchForm);
