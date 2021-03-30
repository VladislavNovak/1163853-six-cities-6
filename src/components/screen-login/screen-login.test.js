import React from 'react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import * as redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus, JumpTo} from '../../utils/constants';
import ScreenLogin from './screen-login';

const mockStore = configureStore({});
jest.mock(`../header/header`, () => `Header`);

it(`Should ScreenLogin render correctly`, () => {
  const history = createMemoryHistory();
  history.push(JumpTo.ROOT);
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  render(
      <redux.Provider store={mockStore({AUTH: {authorizationStatus: AuthorizationStatus.AUTH}})}>
        <Router history={history}>
          <ScreenLogin />
        </Router>
      </redux.Provider>
  );

  userEvent.type(screen.getByTestId(`login`), `xxx`);
  userEvent.type(screen.getByTestId(`password`), `123456`);
  expect(screen.getByDisplayValue(/xxx/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
});
