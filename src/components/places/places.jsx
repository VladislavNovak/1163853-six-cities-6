import React from 'react';
import PropTypes from 'prop-types';
import {MapType} from '../../utils/constants';
import {hotelStructure, cityStructure} from '../../utils/types';

import {Map, SortingPlaces} from '..';

const Places = ({currentCity, hotels}) => {
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <SortingPlaces
          currentCity={currentCity}
          hotels={hotels} />
        <Map
          mapType={MapType.MAIN_MAP} />
      </div>
    </div>
  );
};

Places.propTypes = {
  hotels: PropTypes.arrayOf(hotelStructure).isRequired,
  currentCity: PropTypes.shape(cityStructure).isRequired,
};

export default Places;
