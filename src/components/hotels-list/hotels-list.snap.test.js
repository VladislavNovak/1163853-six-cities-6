import React from 'react';
import {render} from '@testing-library/react';
import {rawHotels} from '../mocks/mocks';
import {adaptAllHotelsToClient} from '../../services/hotelAdapter';

import {HotelsList} from '..';

jest.mock(`../hotel/hotel`, () => `Hotel`);

test(`Should HotelsList render correctly`, () => {
  const renderType = `usual`;
  const hotels = adaptAllHotelsToClient(rawHotels);

  const {container} = render(<HotelsList hotels={hotels} renderType={renderType}/>);
  expect(container).toMatchSnapshot();
});
