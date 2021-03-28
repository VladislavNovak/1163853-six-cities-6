import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  LOAD_HOTELS: `server/loadHotels`,
  LOAD_NEARBY_HOTELS: `server/loadNearbyHotels`,
  REFRESH_HOTEL_DATA: `hotel/refreshHotelData`,
  REFRESH_HOTEL_DATA_LOAD_STATUS: `server/refreshHotelDataLoadStatus`,
  LOAD_COMMENTS: `server/loadComments`,
  SET_COMMENT_LOADING_STATUS: `server/setCommentLoadingStatus`,
  SET_FAVORITE_LOADING_STATUS: `server/setFavoriteLoadingStatus`,
  SET_ACTIVE_CITY: `screenMain/setActiveCity`,
  HIGHLIGHT_HOTEL_ID: `hotel/highlightHotelID`,
  SET_ACTIVE_SORT: `sortingPlaces/activeSort`,
  REQUIRED_AUTHORIZATION: `user/requireAuthorization`,
  REDIRECT_TO_ROUTE: `screenLogin/REDIRECT_TO_ROUTE`,
  LOAD_USER_INFO: `server/loadUserInfo`,
};

export const loadHotels = createAction(ActionType.LOAD_HOTELS, (hotels) => ({payload: hotels}));
export const loadNearestHotels = createAction(ActionType.LOAD_NEARBY_HOTELS, (hotels) => ({payload: hotels}));
export const refreshHotelData = createAction(ActionType.REFRESH_HOTEL_DATA, (hotel) => ({payload: hotel}));
export const refreshHotelDataLoadStatus = createAction(ActionType.REFRESH_HOTEL_DATA_LOAD_STATUS, (status) => ({payload: status}));
export const setActiveCity = createAction(ActionType.SET_ACTIVE_CITY, (activeCity) => ({payload: activeCity}));
export const loadComments = createAction(ActionType.LOAD_COMMENTS, (comments) => ({payload: comments}));
export const setCommentLoadingStatus = createAction(ActionType.SET_COMMENT_LOADING_STATUS, (status) => ({payload: status}));
export const setFavoriteLoadingStatus = createAction(ActionType.SET_FAVORITE_LOADING_STATUS, (status) => ({payload: status}));
export const highlightHotelID = createAction(ActionType.HIGHLIGHT_HOTEL_ID, (id) => ({payload: id}));
export const setActiveSort = createAction(ActionType.SET_ACTIVE_SORT, (sort) => ({payload: sort}));
export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => ({payload: status}));
export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => ({payload: url}));
export const loadUserInfo = createAction(ActionType.LOAD_USER_INFO, (info) => ({payload: info}));

// Логика:
// в mapDispatchToProps передаётся коллбэк
// коллбэк вызывает dispatch, в котором вызывается необходимый action, а в action передаётся агрумент коллбэка как payload
// затем dispatch вызывает reducer, reducer вызывает store
// и на изменения store подписываются connect(mapStateToProps, mapDispatchToProps)
