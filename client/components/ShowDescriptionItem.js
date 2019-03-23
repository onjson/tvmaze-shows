import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

const styles = () => ({
  name: {
    fontWeight: 600,
  },
});

const ShowDescriptionItem = ({ classes, children, title }) => (
  <React.Fragment>
    <ListItem>
      <Typography component="span" inline className={classes.name}>
        {title}
        :&nbsp;
        <Typography component="span" inline>
          {children}
        </Typography>
      </Typography>
    </ListItem>
  </React.Fragment>
);

ShowDescriptionItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default withStyles(styles)(ShowDescriptionItem);
