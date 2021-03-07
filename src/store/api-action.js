import {adaptAllCommentsToClient} from '../services/commentAdapter';
import {adaptAllHotelsToClient} from '../services/hotelAdapter';
import {AuthorizationStatus, JumpTo, ServerRequest} from '../utils/constants';
import {ActionCreator} from './action';

export const fetchHotels = () => (dispatch, _getState, api) => (
  api.get(ServerRequest.HOTELS).then(({data}) => {
    const hotels = adaptAllHotelsToClient(data);
    dispatch(ActionCreator.loadHotels(hotels));
  })
);

export const fetchNearbyHotels = (id) => (dispatch, _getState, api) => (
  api.get(`${ServerRequest.HOTELS}/${id}${ServerRequest.NEARBY}`).then(({data}) => {
    const nearbyHotels = adaptAllHotelsToClient(data);
    dispatch(ActionCreator.loadNearestHotels(nearbyHotels));
  })
);

export const fetchComments = (id) => (dispatch, _getState, api) => (
  api.get(`${ServerRequest.COMMENTS}${id}`).then(({data}) => {
    const comments = adaptAllCommentsToClient(data);
    dispatch(ActionCreator.loadComments(comments));
  })
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(ServerRequest.LOGIN)
    .then(({data}) => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.loadUserEmail(data[`email`]));
    })
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(ServerRequest.LOGIN, {email, password})
    .then(() => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.redirectToRoute(JumpTo.ROOT));
    })
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(ServerRequest.LOGIN)
    .then(() => {
      dispatch(ActionCreator.logout(AuthorizationStatus.NO_AUTH));
    })
);

// Как это работает на примере асинхронного экшена fetchHotels.
//    Это функция, которая возвращает другую функцию, которой thunk докидывает параметры dispatch, _getState, api
//    это позволит передать middlewate этот api
//    Далее - axios.get возвращает json.response, далее - then и когда промис зарезолвится, делаем dispatch
// checkAuth - необходима для проверки авторизован ли пользователь
// login - необходим, чтобы залогиниться
