import {adaptAllCommentsToClient} from '../services/commentAdapter';
import {adaptAllHotelsToClient, adaptOneHotelToClient} from '../services/hotelAdapter';
import {AuthorizationStatus, JumpTo, LoadingStatus, ServerRequest} from '../utils/constants';
import {ActionCreator} from './action';

export const fetchHotels = () => (dispatch, _getState, api) => (
  api.get(ServerRequest.HOTELS).then(({data}) => {
    const hotels = adaptAllHotelsToClient(data);
    dispatch(ActionCreator.loadHotels(hotels));
  })
);

export const fetchActiveHotel = (id) => (dispatch, _getState, api) => (
  api.get(`${ServerRequest.HOTELS}/${id}`).then(({data}) => {
    const hotel = adaptOneHotelToClient(data);
    dispatch(ActionCreator.refreshHotelData(hotel));
    dispatch(ActionCreator.refreshHotelDataLoadStatus(true));
  })
);

export const fetchNearbyHotels = (id) => (dispatch, _getState, api) => (
  api.get(`${ServerRequest.HOTELS}/${id}${ServerRequest.NEARBY}`).then(({data}) => {
    const nearbyHotels = adaptAllHotelsToClient(data);
    dispatch(ActionCreator.loadNearestHotels(nearbyHotels));
  })
);

export const fetchComments = (id) => (dispatch, _getState, api) => (
  api.get(`${ServerRequest.COMMENTS}/${id}`).then(({data}) => {
    const comments = adaptAllCommentsToClient(data);
    dispatch(ActionCreator.loadComments(comments));
  })
);

export const sendUpdatedComment = ({id, comment, rating}) => (dispatch, _getState, api) => (
  api.post(`${ServerRequest.COMMENTS}/${id}`, {comment, rating}).then(({data}) => {
    const comments = adaptAllCommentsToClient(data);
    dispatch(ActionCreator.loadComments(comments));
    dispatch(ActionCreator.setLastCommentLoadingStatus(LoadingStatus.RECEIVED));
  })
);

export const sendUpdatedFavoriteState = ({id, newFavoriteStatus: status}) => (dispatch, _getState, api) => (
  api.post(`${ServerRequest.FAVORITE}/${id}/${status}`).then(({data}) => {
    const hotel = adaptOneHotelToClient(data);
    dispatch(ActionCreator.refreshHotelData(hotel));
    dispatch(ActionCreator.refreshHotelDataLoadStatus(true));
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
    .then(({data}) => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.loadUserEmail(data[`email`]));
      dispatch(ActionCreator.redirectToRoute(JumpTo.ROOT));
    })
);


// Как это работает на примере асинхронного экшена fetchHotels.
//    Это функция, которая возвращает другую функцию, которой thunk докидывает параметры dispatch, _getState, api
//    это позволит передать middlewate этот api
//    Далее - axios.get возвращает json.response, далее - then и когда промис зарезолвится, делаем dispatch
// checkAuth - необходима для проверки авторизован ли пользователь
