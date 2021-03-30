import React from 'react';
import PropTypes from 'prop-types';
import {hotelStructure} from '../../utils/types';
import Hotel from '../hotel/hotel';
import {getMarkupStyle} from '../../utils';

const HotelsList = ({hotels, renderType}) => {
  const PlacesListStyle = {
    ALL_HOTELS: `cities__places-list places__list tabs__content`,
    FAVORITE_HOTELS: `favorites__places`,
    NEAR_HOTELS: `near-places__list places__list`,
  };

  return (
    <div className={getMarkupStyle(renderType, PlacesListStyle)}>
      {hotels.map((hotel) => (
        <Hotel key={hotel.id}
          hotel={hotel}
          renderType={renderType} />))
      }
    </div>
  );
};

HotelsList.propTypes = {
  hotels: PropTypes.arrayOf(hotelStructure).isRequired,
  renderType: PropTypes.string.isRequired,
};

export default HotelsList;
