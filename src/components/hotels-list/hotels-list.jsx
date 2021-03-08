import React from 'react';
import PropTypes from 'prop-types';
import {hotelStructure} from '../../utils/types';
import Hotel from '../hotel/hotel';
import {RenderType} from '../../utils/constants';

const HotelsList = ({hotels, renderType, onClickHotel}) => {
  const isRenderAllHotels = renderType === RenderType.ALL_HOTELS;
  const isRenderFavoriteHotels = renderType === RenderType.FAVORITE_HOTELS;
  const isRenderNearestHotels = renderType === RenderType.NEAR_HOTELS;

  return (
    <div className={
      isRenderAllHotels && `cities__places-list places__list tabs__content` ||
      isRenderFavoriteHotels && `favorites__places` ||
      isRenderNearestHotels && `near-places__list places__list`}>
      {
        hotels.map((hotel) => {
          const {id} = hotel;
          return (
            <Hotel key={id}
              hotel={hotel}
              isRenderAllHotels={isRenderAllHotels}
              isRenderFavoriteHotels={isRenderFavoriteHotels}
              isRenderNearestHotels={isRenderNearestHotels}
              onClickHotel={onClickHotel}
            />);
        })
      }
    </div>
  );
};

HotelsList.propTypes = {
  hotels: PropTypes.arrayOf(hotelStructure).isRequired,
  renderType: PropTypes.string.isRequired,
  onClickHotel: PropTypes.func.isRequired,
};

export default HotelsList;
