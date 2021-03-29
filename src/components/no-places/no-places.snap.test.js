import React from 'react';
import {render} from '@testing-library/react';

import {NoPlaces} from '..';

test(`Should NoPlaces render correctly`, () => {
  const {container} = render(<NoPlaces />);
  expect(container).toMatchSnapshot();
});
