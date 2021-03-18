import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import rootReducer from './store/root-reducer';
import {requireAuthorization} from './store/action';
import {AuthorizationStatus} from './utils/constants';
import {checkAuth, fetchHotels} from './store/api-action';
import {createAPI} from './services/api';
import {redirect} from './store/middlewares/redirect';

import App from './components/app/app';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
    }).concat(redirect)
});

Promise.all([
  store.dispatch(fetchHotels()),
  store.dispatch(checkAuth()),
]).then(() => {
  ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>, document.querySelector(`#root`)
  );
});

// thunk - позволяет вызывать экшены в виде функций и сообщит в эти функции метод dispatch, _getState
// createAPI - сконфигурированный api с коллбэком requireAuthorization,
//    который будет вызываться в случае, если пользователь не авторизован
// createStore - создаёт хранилище. У него есть два аргумента:
//    reducer - ссылка на функцию, которая будет обновлять хранилище
//    composeWithDevTools - подключает devTools и в него же передаём applyMiddleware с сконфигурированным axios
// Provider - обёртка, которая соединяет redux с react
