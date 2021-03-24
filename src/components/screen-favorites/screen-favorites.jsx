import React from 'react';
import PropTypes from 'prop-types';
import {hotelStructure} from '../../utils/types';

import {FavoriteList, Header} from '..';

const ScreenFavorites = ({hotels}) => {
  const favoriteHotels = hotels.filter(({isFavorite}) => isFavorite);

  return (
    <div className={`page ${!favoriteHotels.length && `page--favorites-empty`}`}>
      <Header />
      <main className={`page__main page__main--favorites ${!favoriteHotels.length && `page__main--favorites-empty`}`}>
        <div className="page__favorites-container container">
          {favoriteHotels.length
            ? <FavoriteList favoriteHotels={favoriteHotels}/>
            : (
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
              </section>)
          }
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

ScreenFavorites.propTypes = {
  hotels: PropTypes.arrayOf(hotelStructure).isRequired,
};

export default ScreenFavorites;
