import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer} from './store/reducers/reducer';
import {requireAuthorization} from './store/action';
import {AuthorizationStatus} from './utils/constants';
import {checkAuth, fetchHotels} from './store/api-action';
import {createAPI} from './services/api';
import {redirect} from './store/middlewares/redirect';

import App from './components/app/app';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)));

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect))
);

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
