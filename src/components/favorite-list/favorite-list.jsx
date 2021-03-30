import React from 'react';
import PropTypes from 'prop-types';
import {RenderType} from '../../utils/constants';
import {hotelStructure} from '../../utils/types';
import {getFavoriteHotelsCollection} from '../../utils';

import {HotelsList} from '..';

const FavoriteList = ({favoriteHotels}) => {

  const favoriteHotelsCollection = getFavoriteHotelsCollection(favoriteHotels);
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {Object.entries(favoriteHotelsCollection).map(([city, hotels]) => (
          <li key={city} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <HotelsList
              hotels={hotels}
              renderType={RenderType.FAVORITE_HOTELS}/>
          </li>))
        }
      </ul>
    </section>
  );
};

FavoriteList.propTypes = {
  favoriteHotels: PropTypes.arrayOf(hotelStructure).isRequired,
};

export default FavoriteList;
