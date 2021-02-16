import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {hotelStructure, reviewStructure} from '../../utils/types';
import {RATING_MULTIPLIER, RenderType, JumpTo} from '../../utils/constants';

import {HotelsList, Logo, Review} from '../../components';

const ScreenRoom = ({hotel, hotels, comments}) => {
  const {id, isPremium, title, isFavorite, price, type, rating, images,
    bedrooms, adults, services, hostName, hostIsPro, description} = hotel;

  const styleRating = {width: `${rating * RATING_MULTIPLIER}%`};

  const history = useHistory();

  const handleClick = (activeHotelID) => {
    history.push(`${JumpTo.OFFER}/${activeHotelID}`);
  };

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                images.map((image, index) => (
                  <div key={index} className="property__image-wrapper">
                    <img className="property__image" src={image} alt="Photo studio"/>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={`property__bookmark-button ${isFavorite && `property__bookmark-button--active`} button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={styleRating} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {adults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    services.map((service, index) => (
                      <li key={`${service}-${index}`} className="property__inside-item">
                        {service}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {hostName}
                  </span>
                  {
                    hostIsPro && (
                      <span className="property__user-status">
                        Pro
                      </span>
                    )
                  }
                </div>
                {
                  (description.length !== 0) && (
                    <div className="property__description">
                      <p className="property__text">
                        {description}
                      </p>
                    </div>
                  )
                }
              </div>
              <Review comments={comments} />
            </div>
          </div>
          <section className="property__map map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <HotelsList
              hotels={hotels.filter((item) => item.id !== id).slice(0, 3)}
              renderType={RenderType.NEAR_HOTELS}
              onClickHotel={handleClick}/>
          </section>
        </div>
      </main>
    </div>
  );
};

ScreenRoom.propTypes = {
  hotel: PropTypes.shape(hotelStructure).isRequired,
  hotels: PropTypes.arrayOf(hotelStructure).isRequired,
  comments: PropTypes.arrayOf(reviewStructure).isRequired,
};

export default ScreenRoom;