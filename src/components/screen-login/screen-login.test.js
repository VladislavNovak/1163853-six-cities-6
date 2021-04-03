import React from 'react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
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
      <redux.Provider store={mockStore({AUTH: {authorizationStatus: AuthorizationStatus.NO_AUTH}})}>
        <Router history={history}>
          <ScreenLogin />
        </Router>
      </redux.Provider>
  );

  expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
  expect(screen.getByText(/Password/i)).toBeInTheDocument();

  userEvent.type(screen.getByTestId(`email`), `xxx`);
  userEvent.type(screen.getByTestId(`password`), `123456`);

  expect(screen.getByDisplayValue(/xxx/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
});
