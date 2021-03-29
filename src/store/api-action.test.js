import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../services/api';
import {adaptAllCommentsToClient} from '../services/commentAdapter';
import {adaptAllHotelsToClient, adaptOneHotelToClient} from '../services/hotelAdapter';
import {userAdapter} from '../services/userAdapter';
import {HttpCode, LoadingStatus, ServerRequest, AuthorizationStatus, JumpTo} from '../utils/constants';
import {ActionType} from './action';
import {checkAuth, fetchActualRoomInfo, fetchHotels, login, sendUpdatedComment, sendUpdatedFavoriteState} from './api-action';

const api = createAPI(() => {});

const rawHotel = {
  "city": {
    "name": `Paris`,
    "location": {
      "latitude": 48.85661,
      "longitude": 2.351499,
      "zoom": 13
    }
  },
  "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
  "images": [`https://assets.htmlacademy.ru/intensives/javascript-3/hotel/7.jpg`],
  "title": `The house among olive`,
  "is_favorite": false,
  "is_premium": true,
  "rating": 3,
  "type": `room`,
  "bedrooms": 1,
  "max_adults": 1,
  "price": 169,
  "goods": [`Breakfast`],
  "host": {
    "id": 25,
    "name": `Angelina`,
    "is_pro": true,
    "avatar_url": `img/avatar-angelina.jpg`
  },
  "description": `Relax, rejuvenate`,
  "location": {
    "latitude": 48.83861,
    "longitude": 2.350499,
    "zoom": 16
  },
  "id": 1
};

const rawComment = ({
  "id": 1,
  "user": {
    "id": 11,
    "is_pro": false,
    "name": `Jack`,
    "avatar_url": `https://assets.htmlacademy.ru`
  },
  "rating": 3,
  "comment": `Beautiful space, fantastic location and`,
  "date": `2021-02-10T08:04:28.647Z`
});

const rawUserInfo = ({
  userEmail: `email`,
  userAvatar: `avatar_url`,
});

const rawHotels = [rawHotel];
const rawComments = [rawComment];

describe(`Async operation work correctly`, () => {
  it(`Should get server data API for fetchHotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const getHotels = fetchHotels();

    apiMock
      .onGet(ServerRequest.HOTELS)
      .reply(HttpCode.OK, rawHotels);

    return getHotels(dispatch, () => {}, api)
      .then(() => {
        const hotels = adaptAllHotelsToClient(rawHotels);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_HOTELS,
          payload: hotels
        });
      });
  });

  it(`Should get server data API for sendUpdatedComment`, () => {
    const id = 1;
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const getComments = sendUpdatedComment({id, comment: `comment`, rating: 1});

    apiMock
      .onPost(`${ServerRequest.COMMENTS}/${id}`)
      .reply(HttpCode.OK, rawComments);

    return getComments(dispatch, () => {}, api)
      .then(() => {
        const comments = adaptAllCommentsToClient(rawComments);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: comments
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_COMMENT_LOADING_STATUS,
          payload: LoadingStatus.RECEIVED
        });
      });
  });

  it(`Should get server data API for sendUpdatedFavoriteState`, () => {
    const id = 1;
    const status = 1;
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const getFavorite = sendUpdatedFavoriteState({id, status});

    apiMock
      .onPost(`${ServerRequest.FAVORITE}/${id}/${status}`)
      .reply(HttpCode.OK, rawHotel);

    return getFavorite(dispatch, () => {}, api)
      .then(() => {
        const hotel = adaptOneHotelToClient(rawHotel);
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REFRESH_HOTEL_DATA,
          payload: hotel
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REFRESH_HOTEL_DATA_LOAD_STATUS,
          payload: true
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_FAVORITE_LOADING_STATUS,
          payload: LoadingStatus.RECEIVED
        });
      });
  });

  it(`Should get server data API for fetchActualRoomInfo`, () => {
    const id = 1;
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const getActualRoomInfo = fetchActualRoomInfo(1);

    apiMock
      .onGet(`${ServerRequest.HOTELS}/${id}`)
      .reply(HttpCode.OK, rawHotel)
      .onGet(`${ServerRequest.HOTELS}/${id}${ServerRequest.NEARBY}`)
      .reply(HttpCode.OK, rawHotels)
      .onGet(`${ServerRequest.COMMENTS}/${id}`)
      .reply(HttpCode.OK, rawComments);

    return getActualRoomInfo(dispatch, () => {}, api)
      .then(() => {
        const hotel = adaptOneHotelToClient(rawHotel);
        const nearbyHotels = adaptAllHotelsToClient(rawHotels);
        const comments = adaptAllCommentsToClient(rawComments);
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REFRESH_HOTEL_DATA,
          payload: hotel
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_NEARBY_HOTELS,
          payload: nearbyHotels
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.LOAD_COMMENTS,
          payload: comments
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.REFRESH_HOTEL_DATA_LOAD_STATUS,
          payload: true
        });
      });
  });

  it(`Should get server data API for checkAuth`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(ServerRequest.LOGIN)
      .reply(200, rawUserInfo);

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        const userInfo = userAdapter(rawUserInfo);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_USER_INFO,
          payload: userInfo,
        });
      });
  });

  it(`Should get server data API for login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: `test@test.ru`, password: `123456`};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(JumpTo.LOGIN)
      .reply(200, rawUserInfo);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        const userInfo = userAdapter(rawUserInfo);
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_USER_INFO,
          payload: userInfo,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: JumpTo.ROOT,
        });
      });
  });
});

// новому MockAdapter в качестве параметра передаётся сконфигурированный axios api. Имеет методы:
// onGet - путь, по которому будет произведён запрос
// reply - код ответа с фейкового сервера и сам ответ. К примеру - data.hotels
// jest.fn создает заглушку для реальной функции. Реализация этой функции - dispatch - не важна.
// Вызов dispatch позволяет установить сам факт вызова. Это достигается такими методами jest:
// toHaveBeenCalledTimes - количество вызовов dispatch
// toHaveBeenNthCalledWith - количество вызовов с указанным объектом
// результатом действия должен быть возврат результата выполнения метода API. Например, fetchHotels, т.е return getHotels

