import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

import {Logo} from '..';

test(`Should Logo render correctly`, () => {
  const history = createMemoryHistory();
  const classNameForLogoLink = `usual`;

  const {container} = render(
      <Router history={history}>
        <Logo classNameForLogoLink={classNameForLogoLink}/>
      </Router>
  );
  expect(container).toMatchSnapshot();
});
