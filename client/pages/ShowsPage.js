import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RouterPropTypes from 'react-router-prop-types';
import DocumentTitle from 'react-document-title';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import qs from 'query-string';

import SearchForm from '../components/SearchForm';
import ShowsList from '../components/ShowsList';
import { getShowsApi } from '../services/api';

const styles = () => ({
  showsListContainer: {
    padding: '1rem',
  },
});

const ShowsPage = ({ classes, history, location }) => {
  const [shows, setShows] = useState([]);
  const queries = qs.parse(location.search);

  async function fetchShows(query) {
    if (!query) {
      setShows([]);
    } else {
      const res = await getShowsApi(query);
      const data = await res.json();
      setShows(data);
    }
  }

  useEffect(() => {
    fetchShows(queries.query);
  }, [queries.query]);

  return (
    <DocumentTitle title="Shows">
      <Grid container>
        <Grid container justify="center">
          <Grid item lg={6} md={8} sm={10} xs={11}>
            <SearchForm query={queries.query} push={history.push} />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={16}
          justify="flex-start"
          alignItems="stretch"
          className={classes.showsListContainer}
        >
          <Grid item xs={12}>
            <Typography component="h2" variant="h4">
              Shows
            </Typography>
          </Grid>
          <ShowsList shows={shows} />
        </Grid>
      </Grid>
    </DocumentTitle>
  );
};

ShowsPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  history: RouterPropTypes.history.isRequired,
  location: RouterPropTypes.location.isRequired,
};

export default withStyles(styles)(ShowsPage);
