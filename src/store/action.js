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

export const loadHotels = (hotels) => ({
  type: ActionType.LOAD_HOTELS,
  payload: hotels,
});

export const loadNearestHotels = (hotels) => ({
  type: ActionType.LOAD_NEARBY_HOTELS,
  payload: hotels,
});

export const refreshHotelData = (hotel) => ({
  type: ActionType.REFRESH_HOTEL_DATA,
  payload: hotel,
});

export const refreshHotelDataLoadStatus = (status) => ({
  type: ActionType.REFRESH_HOTEL_DATA_LOAD_STATUS,
  payload: status,
});

export const setActiveCity = (activeCity) => ({
  type: ActionType.SET_ACTIVE_CITY,
  payload: activeCity,
});

export const loadComments = (comments) => ({
  type: ActionType.LOAD_COMMENTS,
  payload: comments,
});

export const setLastCommentLoadingStatus = (status) => ({
  type: ActionType.SET_LAST_COMMENT_LOADING_STATUS,
  payload: status,
});

export const highlightHotelID = (id) => ({
  type: ActionType.HIGHLIGHT_HOTEL_ID,
  payload: id,
});

export const setActiveSort = (sort) => ({
  type: ActionType.SET_ACTIVE_SORT,
  payload: sort,
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});

export const logout = (status) => ({
  type: ActionType.LOGOUT,
  payload: status,
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});

export const loadUserEmail = (email) => ({
  type: ActionType.LOAD_USER_EMAIL,
  payload: email,
});

// Логика:
// в mapDispatchToProps передаётся коллбэк
// коллбэк вызывает dispatch, в котором вызывается необходимый action, а в action передаётся агрумент коллбэка как payload
// затем dispatch вызывает reducer, reducer вызывает store
// и на изменения store подписываются connect(mapStateToProps, mapDispatchToProps)
