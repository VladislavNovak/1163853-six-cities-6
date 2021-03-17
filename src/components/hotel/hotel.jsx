import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {RATING_MULTIPLIER} from '../../utils/constants';
import {highlightHotelID, refreshHotelDataLoadStatus} from '../../store/action';
import {hotelStructure} from '../../utils/types';
import {fetchActiveHotel, fetchComments, fetchNearbyHotels} from '../../store/api-action';

const Hotel = ({
  hotel,
  isRenderAllHotels,
  isRenderFavoriteHotels,
  isRenderNearestHotels,
  onClickHotel,
  onMouseOverHotel,
  getIDToServerRequest}) => {
  const {id, isPremium, title, preview, price, isFavorite, type, rating} = hotel;
  const styleRating = {width: `${rating * RATING_MULTIPLIER}%`};

  return (
    <article
      onClick={(evt) => {
        evt.preventDefault();
        getIDToServerRequest(id);
        onClickHotel(id);
      }}
      onMouseOver={(evt) => {
        evt.preventDefault();
        onMouseOverHotel(id);
      }}
      className={
        isRenderAllHotels && `cities__place-card place-card` ||
        isRenderFavoriteHotels && `favorites__card place-card` ||
        isRenderNearestHotels && `near-places__card place-card`
      }>
      {isPremium && isRenderAllHotels && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>)
      }
      <div className={
        isRenderAllHotels && `cities__image-wrapper place-card__image-wrapper` ||
        isRenderFavoriteHotels && `favorites__image-wrapper place-card__image-wrapper` ||
        isRenderNearestHotels && `near-places__image-wrapper place-card__image-wrapper`
      }>
        <a href="#">
          <img
            className="place-card__image"
            src={preview}
            width={(isRenderAllHotels || isRenderNearestHotels) && `260` || isRenderFavoriteHotels && `150`}
            height={(isRenderAllHotels || isRenderNearestHotels) && `200` || isRenderFavoriteHotels && `110`}
            alt={`${title} image`}
          />
        </a>
      </div>
      <div className={`${isRenderFavoriteHotels && `favorites__card-info`} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite && `place-card__bookmark-button--active`} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={styleRating} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

Hotel.propTypes = {
  hotel: PropTypes.shape(hotelStructure).isRequired,
  isRenderAllHotels: PropTypes.bool.isRequired,
  isRenderFavoriteHotels: PropTypes.bool.isRequired,
  isRenderNearestHotels: PropTypes.bool.isRequired,
  onClickHotel: PropTypes.func.isRequired,
  onMouseOverHotel: PropTypes.func.isRequired,
  getIDToServerRequest: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getIDToServerRequest(id) {
    dispatch(refreshHotelDataLoadStatus(false));
    dispatch(fetchActiveHotel(id));
    dispatch(fetchComments(id));
    dispatch(fetchNearbyHotels(id));
  },

  onMouseOverHotel(id) {
    dispatch(highlightHotelID(id));
  },
});

export {Hotel};
export default connect(null, mapDispatchToProps)(Hotel);
