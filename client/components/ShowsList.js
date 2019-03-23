import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import get from 'lodash.get';

import ShowCard from './ShowCard';
import { emptyImage } from '../constants';

import * as propTypes from './propTypes';

const ShowsList = ({ shows }) => (
  <React.Fragment>
    {shows.map(({ show }) => (
      <Grid key={String(show.id)} item xl={1} lg={2} md={3} sm={4} xs={6}>
        <ShowCard
          title={show.name}
          genres={show.genres}
          image={get(show, 'image.medium', emptyImage)}
          id={show.id}
        />
      </Grid>
    ))}
  </React.Fragment>
);

ShowsList.propTypes = {
  shows: PropTypes.arrayOf(propTypes.ShowInfoType).isRequired,
};

export default ShowsList;
