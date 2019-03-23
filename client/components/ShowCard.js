import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  card: {
    height: '100%',
  },
  title: {
    fontSize: '1rem',
  },
  genres: {
    fontSize: '.8rem',
  },
});

const ShowCard = ({ classes, title, genres, image, id }) => (
  <Card className={classes.card}>
    <Link to={`/shows/${id}`}>
      <CardMedia component="img" image={image} title={title} />
    </Link>
    <CardContent>
      <Typography component="h3" className={classes.title}>
        <Link to={`/shows/${id}`} style={{ textDecoration: 'none' }}>
          {title}
        </Link>
      </Typography>
      {genres && genres.length > 0 && (
        <Typography className={classes.genres}>
          Genres:&nbsp;
          <Typography
            inline
            color="textSecondary"
            component="span"
            className={classes.genres}
          >
            {genres.join(', ')}
          </Typography>
        </Typography>
      )}
    </CardContent>
  </Card>
);

ShowCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

ShowCard.defaultProps = {
  genres: null,
};

export default withStyles(styles)(ShowCard);
