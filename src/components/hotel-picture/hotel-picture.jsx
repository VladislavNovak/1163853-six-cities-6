import React from 'react';
import PropTypes from 'prop-types';

const HotelPicture = ({
  id,
  isRenderAllHotels,
  isRenderFavoriteHotels,
  isRenderNearestHotels,
  preview,
  title,
  getIDToServerRequest,
  onClickHotel,
}) => {

  return (
    <div
      onClick={(evt) => {
        evt.preventDefault();
        getIDToServerRequest(id);
        onClickHotel(id);
      }}
      className={
        isRenderAllHotels && `cities__image-wrapper place-card__image-wrapper` ||
        isRenderFavoriteHotels && `favorites__image-wrapper place-card__image-wrapper` ||
        isRenderNearestHotels && `near-places__image-wrapper place-card__image-wrapper`}>
      <a href="#">
        <img
          className="place-card__image"
          src={preview}
          width={(isRenderAllHotels || isRenderNearestHotels) && `260` || isRenderFavoriteHotels && `150`}
          height={(isRenderAllHotels || isRenderNearestHotels) && `200` || isRenderFavoriteHotels && `110`}
          alt={`${title} image`}/>
      </a>
    </div>
  );
};

HotelPicture.propTypes = {
  id: PropTypes.string.isRequired,
  isRenderAllHotels: PropTypes.bool.isRequired,
  isRenderFavoriteHotels: PropTypes.bool.isRequired,
  isRenderNearestHotels: PropTypes.bool.isRequired,
  preview: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  getIDToServerRequest: PropTypes.func.isRequired,
  onClickHotel: PropTypes.func.isRequired,
};

export default React.memo(HotelPicture, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});
