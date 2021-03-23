import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  LOAD_HOTELS: `server/loadHotels`,
  LOAD_NEARBY_HOTELS: `server/loadNearbyHotels`,
  REFRESH_HOTEL_DATA: `hotel/refreshHotelData`,
  REFRESH_HOTEL_DATA_LOAD_STATUS: `server/refreshHotelDataLoadStatus`,
  LOAD_COMMENTS: `server/loadComments`,
  SET_LAST_COMMENT_LOADING_STATUS: `server/setLastCommentLoadingStatus`,
  SET_ACTIVE_CITY: `screenMain/setActiveCity`,
  HIGHLIGHT_HOTEL_ID: `hotel/highlightHotelID`,
  SET_ACTIVE_SORT: `sortingPlaces/activeSort`,
  REQUIRED_AUTHORIZATION: `user/requireAuthorization`,
  LOGOUT: `user/logout`,
  REDIRECT_TO_ROUTE: `screenLogin/REDIRECT_TO_ROUTE`,
  LOAD_USER_EMAIL: `server/loadUserEmail`,
};

export const loadHotels = createAction(ActionType.LOAD_HOTELS, (hotels) => ({payload: hotels}));
export const loadNearestHotels = createAction(ActionType.LOAD_NEARBY_HOTELS, (hotels) => ({payload: hotels}));
export const refreshHotelData = createAction(ActionType.REFRESH_HOTEL_DATA, (hotel) => ({payload: hotel}));
export const refreshHotelDataLoadStatus = createAction(ActionType.REFRESH_HOTEL_DATA_LOAD_STATUS, (status) => ({payload: status}));
export const setActiveCity = createAction(ActionType.SET_ACTIVE_CITY, (activeCity) => ({payload: activeCity}));
export const loadComments = createAction(ActionType.LOAD_COMMENTS, (comments) => ({payload: comments}));
export const setLastCommentLoadingStatus = createAction(ActionType.SET_LAST_COMMENT_LOADING_STATUS, (status) => ({payload: status}));
export const highlightHotelID = createAction(ActionType.HIGHLIGHT_HOTEL_ID, (id) => ({payload: id}));
export const setActiveSort = createAction(ActionType.SET_ACTIVE_SORT, (sort) => ({payload: sort}));
export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => ({payload: status}));
export const logout = createAction(ActionType.LOGOUT, (status) => ({payload: status}));
export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => ({payload: url}));
export const loadUserEmail = createAction(ActionType.LOAD_USER_EMAIL, (email) => ({payload: email}));

// Логика:
// в mapDispatchToProps передаётся коллбэк
// коллбэк вызывает dispatch, в котором вызывается необходимый action, а в action передаётся агрумент коллбэка как payload
// затем dispatch вызывает reducer, reducer вызывает store
// и на изменения store подписываются connect(mapStateToProps, mapDispatchToProps)
