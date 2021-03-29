import React from 'react';
import {render} from '@testing-library/react';

import {Places} from '..';

jest.mock(`../sorting-places/sorting-places`, () => `SortingPlaces`);
jest.mock(`../map/map`, () => `Map`);

test(`Should Places render correctly`, () => {
  const {container} = render(<Places />);
  expect(container).toMatchSnapshot();
});
