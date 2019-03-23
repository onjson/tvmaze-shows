import React from 'react';
import PropTypes from 'prop-types';
import RouterPropTypes from 'react-router-prop-types';
import DocumentTitle from 'react-document-title';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import SearchField from '../components/SearchForm';

const styles = () => ({
  container: {
    height: '100%',
  },
  title: {
    fontSize: '40px',
    textAlign: 'center',
  },
});

const SearchPage = ({ classes, history }) => (
  <DocumentTitle title="Search">
    <Grid
      className={classes.container}
      container
      justify="center"
      alignItems="center"
    >
      <Grid item lg={6} md={8} sm={10} xs={11}>
        <Typography variant="h1" className={classes.title}>
          Search shows
        </Typography>
        <SearchField push={history.push} />
      </Grid>
    </Grid>
  </DocumentTitle>
);

SearchPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  history: RouterPropTypes.history.isRequired,
};

export default withStyles(styles)(SearchPage);
