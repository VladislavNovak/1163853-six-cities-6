import React from 'react';
import {render} from '@testing-library/react';

import {ScreenLoading} from '..';

test(`Should ScreenLoading render correctly`, () => {
  const {container} = render(<ScreenLoading />);
  expect(container).toMatchSnapshot();
});
