import React from 'react';
import {Router} from 'react-router-dom';
import {render} from '@testing-library/react';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus} from '../../utils/constants';
import {rawUserInfo} from '../mocks/mocks';

import {Header} from '..';

jest.mock(`../logo/logo`, () => `Logo`);

test(`Should Header render correctly`, () => {
  jest.spyOn(redux, `useDispatch`);
  jest.spyOn(redux, `useSelector`);

  const mockStore = configureStore({});
  const store = mockStore({
    USER: {userInfo: rawUserInfo},
    AUTH: {authorizationStatus: AuthorizationStatus.NO_AUTH}
  });

  const {container} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <Header/>
        </Router>
      </redux.Provider>
  );

  expect(container).toMatchSnapshot();
});
