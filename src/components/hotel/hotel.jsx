import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import browserHistory from '../../browser-history';
import PropTypes from 'prop-types';
import {RATING_MULTIPLIER, JumpTo, AuthorizationStatus, RenderType} from '../../utils/constants';
import {highlightHotelID, refreshHotelDataLoadStatus} from '../../store/action';
import {hotelStructure} from '../../utils/types';
import {sendUpdatedFavoriteState} from '../../store/api-action';
import {getMarkupStyle} from '../../utils';

const Hotel = ({hotel, renderType}) => {

  const ArticleStyle = {
    ALL_HOTELS: `cities__place-card place-card`,
    FAVORITE_HOTELS: `favorites__card place-card`,
    NEAR_HOTELS: `near-places__card place-card`,
  };

  const LinkWrapperStyle = {
    ALL_HOTELS: `cities__image-wrapper place-card__image-wrapper`,
    FAVORITE_HOTELS: `favorites__image-wrapper place-card__image-wrapper`,
    NEAR_HOTELS: `near-places__image-wrapper place-card__image-wrapper`,
  };

  const ImageWidthStyle = {
    ALL_HOTELS: `260`,
    FAVORITE_HOTELS: `150`,
    NEAR_HOTELS: `260`,
  };

  const ImageHeightStyle = {
    ALL_HOTELS: `200`,
    FAVORITE_HOTELS: `110`,
    NEAR_HOTELS: `200`,
  };

  const {id, isPremium, title, preview, price, isFavorite, type, rating} = hotel;
  const styleRating = {width: `${Math.round(Number(rating)) * RATING_MULTIPLIER}%`};
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

  const handleMouseOver = () => {
    dispatch(highlightHotelID(id));
  };

  return (
    <article
      onMouseOver={renderType !== RenderType.NEAR_HOTELS ? handleMouseOver : undefined}
      className={getMarkupStyle(renderType, ArticleStyle)}>
      {(isPremium && renderType === RenderType.ALL_HOTELS) ? (<div className="place-card__mark"><span>Premium</span></div>) : null}
      <div className={getMarkupStyle(renderType, LinkWrapperStyle)}>
        <Link to={`${JumpTo.OFFER}/${id}`}>
          <img
            className="place-card__image"
            src={preview}
            width={getMarkupStyle(renderType, ImageWidthStyle)}
            height={getMarkupStyle(renderType, ImageHeightStyle)}
            alt={`${title} image`}/>
        </Link>
      </div>
      <div className={`${renderType === RenderType.FAVORITE_HOTELS ? `favorites__card-info` : null} place-card__info`}>
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

  renderType: PropTypes.string.isRequired,
};

export default Hotel;
