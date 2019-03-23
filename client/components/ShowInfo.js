import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import get from 'lodash.get';

import { emptyImage } from '../constants';
import ShowDescription from './ShowDescription';

import * as propTypes from './propTypes';

const styles = () => ({
  container: {
    padding: '1rem',
  },
  title: {
    fontSize: '32px',
  },
  info: {
    display: 'flex',
    marginTop: '1rem',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  summary: {
    marginTop: '1rem',
  },
});

const ShowInfo = ({ classes, info, loading, error }) => (
  <Card className={classes.container}>
    {loading && (
      <CardContent className={classes.loading}>
        <CircularProgress />
      </CardContent>
    )}
    {!loading && info && (
      <Grid container>
        <Grid item xs={12}>
          <Typography
            className={classes.title}
            color="textSecondary"
            variant="h2"
          >
            {info.name}
          </Typography>
        </Grid>
        <Grid container className={classes.info}>
          <Grid item lg={5} md={5} sm={6} xs={12}>
            <CardMedia
              image={get(info, 'image.original', emptyImage)}
              title={info.name}
              component="img"
            />
          </Grid>
          <Grid item lg={7} md={7} sm={6} xs={12}>
            <CardContent>
              <ShowDescription info={info} />
            </CardContent>
          </Grid>
        </Grid>
        {info.summary && (
          <Grid className={classes.summary} item xs={12}>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: info.summary,
              }}
            />
          </Grid>
        )}
      </Grid>
    )}
    {error && <CardContent>Data not found</CardContent>}
  </Card>
);

ShowInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  info: propTypes.ShowInfoType,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

ShowInfo.defaultProps = {
  info: null,
  error: null,
};

export default withStyles(styles)(ShowInfo);
