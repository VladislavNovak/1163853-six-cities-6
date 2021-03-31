import React from 'react';
import {render} from '@testing-library/react';

import {ReviewForm} from '..';

test(`Should ReviewForm render correctly`, () => {
  const loadingStatus = `DEFAULT`;

  const {container} = render(<ReviewForm
    handleSubmit={jest.fn()}
    handleRadioChange={jest.fn()}
    selectedStars={`5`}
    onChangeTextarea={jest.fn()}
    commentLoadingStatus={loadingStatus}
    tale={`tale`} />);
  expect(container).toMatchSnapshot();
});
