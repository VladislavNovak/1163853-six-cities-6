import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

import {ScreenWarning} from '..';

test(`Should ScreenWarning render correctly`, () => {
  const history = createMemoryHistory();
  const warning = `...LOADING...`;

  const {container} = render(
      <Router history={history}>
        <ScreenWarning warning={warning}/>
      </Router>);
  expect(container).toMatchSnapshot();
});
