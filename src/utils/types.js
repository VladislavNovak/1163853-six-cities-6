import PropTypes from 'prop-types';

export const hotelStructure = PropTypes.shape({
  id: PropTypes.string.isRequired,
  cityName: PropTypes.string.isRequired,
  cityLatitude: PropTypes.number.isRequired,
  cityLongitude: PropTypes.number.isRequired,
  cityZoom: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  preview: PropTypes.string.isRequired,
  isPremium: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  bedrooms: PropTypes.number.isRequired,
  adults: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  hostName: PropTypes.string.isRequired,
  hostId: PropTypes.string.isRequired,
  services: PropTypes.arrayOf(PropTypes.string),
  hostIsPro: PropTypes.bool.isRequired,
  hostAvatar: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
}).isRequired;

export const reviewStructure = PropTypes.shape({
  id: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  visitorId: PropTypes.string.isRequired,
  visitorName: PropTypes.string.isRequired,
  visitorAvatar: PropTypes.string.isRequired,
  visitorIsPro: PropTypes.bool.isRequired
}).isRequired;

export const cityStructure = {
  currentCity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  })
};
