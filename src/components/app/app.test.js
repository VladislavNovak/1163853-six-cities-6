import React from 'react';
import {Router} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus, JumpTo} from '../../utils/constants';
import {rawHotels, rawUserInfo} from '../mocks/mocks';
import {adaptAllHotelsToClient} from '../../services/hotelAdapter';

import App from './app';
import {ScreenFavorites, ScreenLogin, ScreenRoom, ScreenWarning} from '..';

const mockStore = configureStore({});

describe(`Test routing`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  jest.mock(`../../store/user-reducer/user-reducer`, () => ({
    isHotelsLoaded: true,
    hotels: [],
    nearbyHotels: [],
    activeHotel: {},
    activeHotelReloaded: false,
    activeCity: null,
    comments: [],
    commentLoadingStatus: `DEFAULT`,
    favoriteLoadingStatus: `DEFAULT`,
    highlightHotelID: ``,
    activeSort: `Popular`,
    userInfo: {},
  }));

  it(`Render 'ScreenMain' when user navigate to '/' url`, () => {
    const history = createMemoryHistory();
    history.push(JumpTo.ROOT);

    const store = mockStore({
      USER: {isHotelsLoaded: true, hotels: adaptAllHotelsToClient(rawHotels), activeCity: `Paris`, userInfo: rawUserInfo},
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
      USER: {isHotelsLoaded: true, userInfo: rawUserInfo},
      AUTH: {authorizationStatus: AuthorizationStatus.NO_AUTH}
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <ScreenLogin />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it(`Render 'ScreenFavorites' when user navigate to '/favorites' url`, () => {
    const history = createMemoryHistory();
    history.push(JumpTo.FAVORITES);
    const store = mockStore({
      USER: {isHotelsLoaded: true, hotels: adaptAllHotelsToClient(rawHotels), userInfo: rawUserInfo},
      AUTH: {authorizationStatus: AuthorizationStatus.NO_AUTH}
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <ScreenFavorites />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Nothing yet saved.`)).toBeInTheDocument();
  });

  it(`Render 'ScreenRoom' when user navigate to '/offer' url`, () => {
    const history = createMemoryHistory();
    history.push(`${JumpTo.OFFER}/1`);
    const store = mockStore({
      USER: {isHotelsLoaded: true, hotels: adaptAllHotelsToClient(rawHotels), userInfo: rawUserInfo},
      AUTH: {authorizationStatus: AuthorizationStatus.AUTH}
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <ScreenRoom id={`1`} />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Premium`)).toBeInTheDocument();
  });

  it(`Render 'NotFoundScreen' when user navigate to non-existent route`, () => {
    const history = createMemoryHistory();
    history.push(`/non-existent-route`);
    const store = mockStore({
      USER: {isHotelsLoaded: true}
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <ScreenWarning warning={`...LOADING...`} />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`404`)).toBeInTheDocument();
  });
});
