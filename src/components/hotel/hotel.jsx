import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {RATING_MULTIPLIER} from '../../utils/constants';
import {highlightHotelID, refreshHotelDataLoadStatus} from '../../store/action';
import {hotelStructure} from '../../utils/types';
import {fetchActiveHotel, fetchComments, fetchNearbyHotels, sendUpdatedFavoriteState} from '../../store/api-action';
import HotelPicture from '../hotel-picture/hotel-picture';

const Hotel = ({
  hotel,
  isRenderAllHotels,
  isRenderFavoriteHotels,
  isRenderNearestHotels,
  onClickHotel,
}) => {
  const {id, isPremium, title, preview, price, isFavorite, type, rating} = hotel;
  const styleRating = {width: `${Number(rating) * RATING_MULTIPLIER}%`};

  const {activeHotelReloaded, activeHotel} = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  const getIDToServerRequest = (hotelID) => {
    dispatch(refreshHotelDataLoadStatus(false));
    dispatch(fetchActiveHotel(hotelID));
    dispatch(fetchComments(hotelID));
    dispatch(fetchNearbyHotels(hotelID));
  };

  const handleChangeFavoriteStatus = () => {
    dispatch(refreshHotelDataLoadStatus(false));
    dispatch(sendUpdatedFavoriteState({id, newFavoriteStatus: Number(!isFavorite)}));
  };

  useEffect(() => {
    if (!activeHotelReloaded && activeHotel.id === id) {
      getIDToServerRequest(id);
    }
  }, [activeHotelReloaded]);

  return (
    <article
      onMouseOver={(evt) => {
        evt.preventDefault();
        dispatch(highlightHotelID(id));
      }}
      className={
        isRenderAllHotels && `cities__place-card place-card` ||
        isRenderFavoriteHotels && `favorites__card place-card` ||
        isRenderNearestHotels && `near-places__card place-card`}>
      {isPremium && isRenderAllHotels && (<div className="place-card__mark"><span>Premium</span></div>)}
      <HotelPicture
        id={id}
        isRenderAllHotels={isRenderAllHotels}
        isRenderFavoriteHotels={isRenderFavoriteHotels}
        isRenderNearestHotels={isRenderNearestHotels}
        preview={preview}
        title={title}
        getIDToServerRequest={getIDToServerRequest}
        onClickHotel={onClickHotel} />
      <div className={`${isRenderFavoriteHotels && `favorites__card-info`} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={handleChangeFavoriteStatus}
            className={`place-card__bookmark-button ${isFavorite && `place-card__bookmark-button--active`} button`}
            type="button">
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
};

export default Hotel;
