import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    '&:active': {
      color: '#fff',
    },
  },
  error: {
    textAlign: 'center',
  },
  back: {
    display: 'flex',
    justifyContent: 'center',
  },
};

const PageNotFound = ({ classes }) => (
  <Grid container className={classes.container}>
    <Grid item lg={4} md={6} sm={8}>
      <Card>
        <CardContent>
          <Typography
            gutterBottom
            color="textSecondary"
            variant="h1"
            component="h1"
            className={classes.error}
          >
            Error 404
          </Typography>
        </CardContent>
        <CardActions className={classes.back}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            <Link className={classes.link} to="/">
              Back to home
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  </Grid>
);

PageNotFound.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageNotFound);
