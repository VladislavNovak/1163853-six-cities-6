export const ActionType = {
  LOAD_HOTELS: `server/loadHotels`,
  LOAD_NEARBY_HOTELS: `server/loadNearbyHotels`,
  SET_ACTIVE_HOTEL: `hotel/setActiveHotel`,
  LOAD_COMMENTS: `server/loadComments`,
  SET_ACTIVE_CITY: `screenMain/setActiveCity`,
  HIGHLIGHT_HOTEL_ID: `hotel/highlightHotelID`,
  SET_ACTIVE_SORT: `sortingPlaces/activeSort`,
  REQUIRED_AUTHORIZATION: `user/requireAuthorization`,
  LOGOUT: `user/logout`,
  REDIRECT_TO_ROUTE: `screenLogin/REDIRECT_TO_ROUTE`,
  LOAD_USER_EMAIL: `server/loadUserEmail`,
};

export const ActionCreator = {
  loadHotels: (hotels) => ({
    type: ActionType.LOAD_HOTELS,
    payload: hotels,
  }),

  loadNearestHotels: (hotels) => ({
    type: ActionType.LOAD_NEARBY_HOTELS,
    payload: hotels,
  }),

  setActiveHotel: (hotel) => ({
    type: ActionType.SET_ACTIVE_HOTEL,
    payload: hotel,
  }),

  setActiveCity: (activeCity) => ({
    type: ActionType.SET_ACTIVE_CITY,
    payload: activeCity,
  }),

  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
  }),

  highlightHotelID: (id) => ({
    type: ActionType.HIGHLIGHT_HOTEL_ID,
    payload: id,
  }),

  setActiveSort: (sort) => ({
    type: ActionType.SET_ACTIVE_SORT,
    payload: sort,
  }),

  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),

  logout: (status) => ({
    type: ActionType.LOGOUT,
    payload: status,
  }),

  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),

  loadUserEmail: (email) => ({
    type: ActionType.LOAD_USER_EMAIL,
    payload: email,
  }),
};

// Логика:
// в mapDispatchToProps передаётся коллбэк
// коллбэк вызывает dispatch, в котором вызывается необходимый action, а в action передаётся агрумент коллбэка как payload
// затем dispatch вызывает reducer, reducer вызывает store
// и на изменения store подписываются connect(mapStateToProps, mapDispatchToProps)
