import PropTypes from 'prop-types';

export const ManufacturerInformationType = PropTypes.shape({
  country: PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  }),
  name: PropTypes.string,
});

export const ShowInfoType = PropTypes.shape({
  network: ManufacturerInformationType,
  webChannel: ManufacturerInformationType,
  premiered: PropTypes.string,
  schedule: PropTypes.shape({
    time: PropTypes.string,
    dates: PropTypes.arrayOf(PropTypes.string),
  }),
  runtime: PropTypes.number,
  status: PropTypes.string,
  language: PropTypes.string,
  type: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
  officialSite: PropTypes.string,
  rating: PropTypes.shape({
    average: PropTypes.number,
  }),
});
