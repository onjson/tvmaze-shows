import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import StarRatings from 'react-star-ratings';
import parse from 'url-parse';

import ShowDescriptionItem from './ShowDescriptionItem';

import * as propTypes from './propTypes';

const ShowDescription = ({ info }) => (
  <List dense>
    {info.network && info.network.country && (
      <ShowDescriptionItem title="Network">
        {info.network.country.code || info.network.country.name}
        ,&nbsp;
        {info.network.name}
      </ShowDescriptionItem>
    )}
    {info.webChannel && info.webChannel.country && (
      <ShowDescriptionItem title="Web Channel">
        {info.webChannel.country.code || info.webChannel.country.name}
        ,&nbsp;
        {info.webChannel.name}
      </ShowDescriptionItem>
    )}
    {info.premiered && (
      <ShowDescriptionItem title="Premiered">
        {info.premiered}
      </ShowDescriptionItem>
    )}
    {info.schedule && info.schedule.time && info.schedule.days.length ? (
      <ShowDescriptionItem title="Schedule">
        {`${info.schedule.days.join()} at ${info.schedule.time} (${
          info.runtime
        } minutes)`}
      </ShowDescriptionItem>
    ) : (
      <ShowDescriptionItem title="Runtime">
        {info.runtime}
        &nbsp;minutes
      </ShowDescriptionItem>
    )}
    <ShowDescriptionItem title="Status">{info.status}</ShowDescriptionItem>
    {info.language && (
      <ShowDescriptionItem title="Language">
        {info.language}
      </ShowDescriptionItem>
    )}
    <ShowDescriptionItem title="Show Type">{info.type}</ShowDescriptionItem>
    {info.genres.length > 0 && (
      <ShowDescriptionItem title="Genres">
        {info.genres.join(' | ')}
      </ShowDescriptionItem>
    )}
    {info.officialSite && (
      <ShowDescriptionItem title="Official Site">
        <a href={info.officialSite}>{parse(info.officialSite).hostname}</a>
      </ShowDescriptionItem>
    )}
    <ListItem>
      <StarRatings
        rating={info.rating.average || 0}
        starRatedColor="blue"
        numberOfStars={10}
        name="rating"
        starDimension="16px"
        starSpacing="0"
      />
      <Typography component="span" inline>
        &nbsp;
        {info.rating.average}
      </Typography>
    </ListItem>
  </List>
);

ShowDescription.propTypes = {
  info: propTypes.ShowInfoType,
};

ShowDescription.defaultProps = {
  info: null,
};

export default ShowDescription;
