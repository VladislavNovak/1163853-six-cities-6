import React from 'react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {render} from '@testing-library/react';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus} from '../../utils/constants';
import ScreenLogin from './screen-login';

const mockStore = configureStore({});
jest.mock(`../header/header`, () => `Header`);

it(`Should ScreenLogin render correctly`, () => {
  const history = createMemoryHistory();
  history.push(`/login`);
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  render(
      <redux.Provider store={mockStore({AUTH: {authorizationStatus: AuthorizationStatus.AUTH}})}>
        <Router history={history}>
          <ScreenLogin />
        </Router>
      </redux.Provider>
  );
});
