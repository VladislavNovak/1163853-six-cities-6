import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import browserHistory from '../../browser-history';
import PropTypes from 'prop-types';
import {RATING_MULTIPLIER, JumpTo, AuthorizationStatus} from '../../utils/constants';
import {highlightHotelID, refreshHotelDataLoadStatus} from '../../store/action';
import {hotelStructure} from '../../utils/types';
import {sendUpdatedFavoriteState} from '../../store/api-action';

const Hotel = ({
  hotel,
  isRenderAllHotels,
  isRenderFavoriteHotels,
  isRenderNearestHotels,
}) => {
  const {id, isPremium, title, preview, price, isFavorite, type, rating} = hotel;
  const styleRating = {width: `${Number(rating) * RATING_MULTIPLIER}%`};
  const {authorizationStatus} = useSelector((state) => state.AUTH);
  const dispatch = useDispatch();

  const handleChangeFavoriteStatus = () => {
    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      browserHistory.push(JumpTo.LOGIN);
    } else {
      dispatch(refreshHotelDataLoadStatus(false));
      dispatch(sendUpdatedFavoriteState({id, newFavoriteStatus: Number(!isFavorite)}));
    }
  };

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
      <div
        className={
          isRenderAllHotels && `cities__image-wrapper place-card__image-wrapper` ||
          isRenderFavoriteHotels && `favorites__image-wrapper place-card__image-wrapper` ||
          isRenderNearestHotels && `near-places__image-wrapper place-card__image-wrapper`}>
        <Link to={`${JumpTo.OFFER}/${id}`}>
          <img
            className="place-card__image"
            src={preview}
            width={(isRenderAllHotels || isRenderNearestHotels) && `260` || isRenderFavoriteHotels && `150`}
            height={(isRenderAllHotels || isRenderNearestHotels) && `200` || isRenderFavoriteHotels && `110`}
            alt={`${title} image`}/>
        </Link>
      </div>
      <div className={`${isRenderFavoriteHotels ? `favorites__card-info` : null} place-card__info`}>
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
          <Link to={`${JumpTo.OFFER}/${id}`}>{title}</Link>
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
};

export default Hotel;
