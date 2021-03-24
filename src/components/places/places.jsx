import React from 'react';
import {MapType} from '../../utils/constants';

import {Map, SortingPlaces} from '..';

const Places = () => {
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <SortingPlaces />
        <Map
          mapType={MapType.MAIN_MAP} />
      </div>
    </div>
  );
};

export default Places;
