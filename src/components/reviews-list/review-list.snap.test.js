import React from 'react';
import {render} from '@testing-library/react';
import {rawComments} from '../mocks/mocks';
import {adaptAllCommentsToClient} from '../../services/commentAdapter';

import {ReviewsList} from '..';

test(`Should ReviewsList render correctly`, () => {
  const comments = adaptAllCommentsToClient(rawComments);

  const {container} = render(<ReviewsList comments={comments}/>);
  expect(container).toMatchSnapshot();
});
