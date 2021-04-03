import React from 'react';
import {Router} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import App from './app';
import {AuthorizationStatus, JumpTo, LoadingStatus, WarningType} from '../../utils/constants';
const mockStore = configureStore({});

describe(`Test routing`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'ScreenMain' when user navigate to '/' url`, () => {
    const history = createMemoryHistory();
    history.push(JumpTo.ROOT);

    const store = mockStore({
      USER: {hotels: [], activeCity: null},
      AUTH: {authorizationStatus: AuthorizationStatus.NO_AUTH}
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Cities`)).toBeInTheDocument();
  });

  it(`Render 'ScreenLogin' when user navigate to '/login' url`, () => {
    const history = createMemoryHistory();
    history.push(JumpTo.LOGIN);
    const store = mockStore({
      AUTH: {authorizationStatus: AuthorizationStatus.NO_AUTH}
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it(`Render 'ScreenFavorites' when user navigate to '/favorites' url`, () => {
    const history = createMemoryHistory();
    history.push(JumpTo.FAVORITES);
    const store = mockStore({
      USER: {hotels: []},
      AUTH: {authorizationStatus: AuthorizationStatus.NO_AUTH}
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Nothing yet saved.`)).toBeInTheDocument();
  });

  it(`Render 'ScreenRoom' when user navigate to '/offer' url`, () => {
    const history = createMemoryHistory();
    history.push(JumpTo.OFFER);
    const store = mockStore({
      USER: {hotels: [], activeHotel: {}, comments: [], nearbyHotels: [], activeHotelReloaded: false, favoriteLoadingStatus: LoadingStatus.DEFAULT,},
      AUTH: {authorizationStatus: AuthorizationStatus.NO_AUTH}
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Premium`)).toBeInTheDocument();
  });

  it(`Render 'NotFoundScreen' when user navigate to non-existent route`, () => {
    const history = createMemoryHistory();
    history.push(`/non-existent-route`);
    const warning = `...LOADING...`;

    render(
        <redux.Provider store={mockStore({warning})}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`404`)).toBeInTheDocument();
  });
});
