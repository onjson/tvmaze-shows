import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  notFound: {
    textAling: 'center',
  },
});

const ShowsNotFound = ({ classes }) => (
  <Paper className={classes.root} elevation={1}>
    <Typography variant="h5" component="h3" className={classes.notFound}>
      Shows not found
    </Typography>
  </Paper>
);

ShowsNotFound.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowsNotFound);
