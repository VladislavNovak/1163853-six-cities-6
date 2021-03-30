import React from 'react';
import {render} from '@testing-library/react';
import {rawHotels} from '../mocks/mocks';
import {adaptAllHotelsToClient} from '../../services/hotelAdapter';

import {FavoriteList} from '..';

jest.mock(`../hotels-list/hotels-list`, () => `HotelsList`);

test(`Should FavoriteList render correctly`, () => {
  const favoriteHotels = adaptAllHotelsToClient(rawHotels);

  const {container} = render(<FavoriteList favoriteHotels={favoriteHotels}/>);
  expect(container).toMatchSnapshot();
});
