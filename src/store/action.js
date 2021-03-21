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

export const loadHotels = createAction(ActionType.LOAD_HOTELS, (hotels) => {
  return {
    payload: hotels,
  };
});

export const loadNearestHotels = createAction(ActionType.LOAD_NEARBY_HOTELS, (hotels) => {
  return {
    payload: hotels,
  };
});

export const refreshHotelData = createAction(ActionType.REFRESH_HOTEL_DATA, (hotel) => {
  return {
    payload: hotel,
  };
});

export const refreshHotelDataLoadStatus = createAction(ActionType.REFRESH_HOTEL_DATA_LOAD_STATUS, (status) => {
  return {
    payload: status,
  };
});

export const setActiveCity = createAction(ActionType.SET_ACTIVE_CITY, (activeCity) => {
  return {
    payload: activeCity,
  };
});

export const loadComments = createAction(ActionType.LOAD_COMMENTS, (comments) => {
  return {
    payload: comments,
  };
});

export const setLastCommentLoadingStatus = createAction(ActionType.SET_LAST_COMMENT_LOADING_STATUS, (status) => {
  return {
    payload: status,
  };
});

export const highlightHotelID = createAction(ActionType.HIGHLIGHT_HOTEL_ID, (id) => {
  return {
    payload: id,
  };
});

export const setActiveSort = createAction(ActionType.SET_ACTIVE_SORT, (sort) => {
  return {
    payload: sort,
  };
});

export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => {
  return {
    payload: status,
  };
});

export const logout = createAction(ActionType.LOGOUT, (status) => {
  return {
    payload: status,
  };
});

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => {
  return {
    payload: url,
  };
});

export const loadUserEmail = createAction(ActionType.LOAD_USER_EMAIL, (email) => {
  return {
    payload: email,
  };
});

// export const loadHotels = (hotels) => ({
//   type: ActionType.LOAD_HOTELS,
//   payload: hotels,
// });

// export const loadNearestHotels = (hotels) => ({
//   type: ActionType.LOAD_NEARBY_HOTELS,
//   payload: hotels,
// });

// export const refreshHotelData = (hotel) => ({
//   type: ActionType.REFRESH_HOTEL_DATA,
//   payload: hotel,
// });

// export const refreshHotelDataLoadStatus = (status) => ({
//   type: ActionType.REFRESH_HOTEL_DATA_LOAD_STATUS,
//   payload: status,
// });

// export const setActiveCity = (activeCity) => ({
//   type: ActionType.SET_ACTIVE_CITY,
//   payload: activeCity,
// });

// export const loadComments = (comments) => ({
//   type: ActionType.LOAD_COMMENTS,
//   payload: comments,
// });

// export const setLastCommentLoadingStatus = (status) => ({
//   type: ActionType.SET_LAST_COMMENT_LOADING_STATUS,
//   payload: status,
// });

// export const highlightHotelID = (id) => ({
//   type: ActionType.HIGHLIGHT_HOTEL_ID,
//   payload: id,
// });

// export const setActiveSort = (sort) => ({
//   type: ActionType.SET_ACTIVE_SORT,
//   payload: sort,
// });

// export const requireAuthorization = (status) => ({
//   type: ActionType.REQUIRED_AUTHORIZATION,
//   payload: status,
// });

// export const logout = (status) => ({
//   type: ActionType.LOGOUT,
//   payload: status,
// });

// export const redirectToRoute = (url) => ({
//   type: ActionType.REDIRECT_TO_ROUTE,
//   payload: url,
// });

// export const loadUserEmail = (email) => ({
//   type: ActionType.LOAD_USER_EMAIL,
//   payload: email,
// });

// Логика:
// в mapDispatchToProps передаётся коллбэк
// коллбэк вызывает dispatch, в котором вызывается необходимый action, а в action передаётся агрумент коллбэка как payload
// затем dispatch вызывает reducer, reducer вызывает store
// и на изменения store подписываются connect(mapStateToProps, mapDispatchToProps)
