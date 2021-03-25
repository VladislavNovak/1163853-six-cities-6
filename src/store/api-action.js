import {adaptAllCommentsToClient} from '../services/commentAdapter';
import {adaptAllHotelsToClient, adaptOneHotelToClient} from '../services/hotelAdapter';
import {userAdapter} from '../services/userAdapter';
import {AuthorizationStatus, JumpTo, LoadingStatus, ServerRequest} from '../utils/constants';
import {
  loadComments,
  loadHotels,
  loadNearestHotels,
  loadUserInfo,
  redirectToRoute,
  refreshHotelData,
  refreshHotelDataLoadStatus,
  requireAuthorization,
  setCommentLoadingStatus,
  setFavoriteLoadingStatus,
} from './action';

export const fetchHotels = () => (dispatch, _getState, api) => (
  api.get(ServerRequest.HOTELS).then(({data}) => {
    const hotels = adaptAllHotelsToClient(data);
    dispatch(loadHotels(hotels));
  })
);

export const fetchActualRoomInfo = (id) => (dispatch, _getState, api) => (
  Promise.all([
    api.get(`${ServerRequest.HOTELS}/${id}`),
    api.get(`${ServerRequest.HOTELS}/${id}${ServerRequest.NEARBY}`),
    api.get(`${ServerRequest.COMMENTS}/${id}`)
  ]).then(([hotelReceived, nearbyHotelsReceived, commentsReceived]) => {
    const hotel = adaptOneHotelToClient(hotelReceived.data);
    const nearbyHotels = adaptAllHotelsToClient(nearbyHotelsReceived.data);
    const comments = adaptAllCommentsToClient(commentsReceived.data);
    dispatch(refreshHotelData(hotel));
    dispatch(loadNearestHotels(nearbyHotels));
    dispatch(loadComments(comments));
  }).then(() => dispatch(refreshHotelDataLoadStatus(true)))
);

export const sendUpdatedComment = ({id, comment, rating}) => (dispatch, _getState, api) => (
  api.post(`${ServerRequest.COMMENTS}/${id}`, {comment, rating}).then(({data}) => {
    const comments = adaptAllCommentsToClient(data);
    dispatch(loadComments(comments));
    dispatch(setCommentLoadingStatus(LoadingStatus.RECEIVED));
  })
);

export const sendUpdatedFavoriteState = ({id, newFavoriteStatus: status}) => (dispatch, _getState, api) => (
  api.post(`${ServerRequest.FAVORITE}/${id}/${status}`).then(({data}) => {
    const hotel = adaptOneHotelToClient(data);
    dispatch(refreshHotelData(hotel));
    dispatch(refreshHotelDataLoadStatus(true));
    dispatch(setFavoriteLoadingStatus(LoadingStatus.RECEIVED));
  })
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(ServerRequest.LOGIN)
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(loadUserInfo(userAdapter(data)));
    })
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(ServerRequest.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(loadUserInfo(userAdapter(data)));
      dispatch(redirectToRoute(JumpTo.ROOT));
    })
);

// Как это работает на примере асинхронного экшена fetchHotels.
//    Это функция, которая возвращает другую функцию, которой thunk докидывает параметры dispatch, _getState, api
//    это позволит передать middlewate этот api
//    Далее - axios.get возвращает json.response, далее - then и когда промис зарезолвится, делаем dispatch
// checkAuth - необходима для проверки авторизован ли пользователь
