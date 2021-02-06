import PropTypes from 'prop-types';

export const hotelSrtucture = PropTypes.shape({
  id: PropTypes.string.isRequired,
  cityName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  isPremium: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  bedrooms: PropTypes.number.isRequired,
  adults: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  hostName: PropTypes.string.isRequired,
  hostId: PropTypes.string.isRequired,
  services: PropTypes.arrayOf(PropTypes.string),
}).isRequired;