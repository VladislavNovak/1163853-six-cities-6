import {
  ActionType,
  loadHotels,
  loadNearestHotels,
  refreshHotelData,
  refreshHotelDataLoadStatus,
  setActiveCity,
  loadComments,
  setCommentLoadingStatus,
  setFavoriteLoadingStatus,
  highlightHotelID,
  setActiveSort,
  requireAuthorization,
  redirectToRoute,
  loadUserInfo
} from "./action";

const id = 1;
const activeCity = {id: 1, title: `city`};
const hotel = {id: 0, title: `hotel`};
const comment = {id: 2, title: `comment`};
const hotels = [hotel];
const comments = [comment];
const status = true;
const sort = `Popular`;
const url = `...`;
const info = {id: 1, name: `John`};

const getExpectedAction = (type, payload) => ({type, payload});

describe(`Action creators work correctly`, () => {
  it(`tests the action. Loading hotels`, () => {
    expect(loadHotels(hotels)).toEqual(getExpectedAction(ActionType.LOAD_HOTELS, hotels));
  });

  it(`tests the action. Loading nearby hotels`, () => {
    expect(loadNearestHotels(hotels)).toEqual(getExpectedAction(ActionType.LOAD_NEARBY_HOTELS, hotels));
  });

  it(`tests the action. Refresh hotels`, () => {
    expect(refreshHotelData(hotel)).toEqual(getExpectedAction(ActionType.REFRESH_HOTEL_DATA, hotel));
  });

  it(`tests the action. Hotel loading status update`, () => {
    expect(refreshHotelDataLoadStatus(status)).toEqual(getExpectedAction(ActionType.REFRESH_HOTEL_DATA_LOAD_STATUS, status));
  });

  it(`tests the action. Sets the active city`, () => {
    expect(setActiveCity(activeCity)).toEqual(getExpectedAction(ActionType.SET_ACTIVE_CITY, activeCity));
  });

  it(`tests the action. Loading comments`, () => {
    expect(loadComments(comments)).toEqual(getExpectedAction(ActionType.LOAD_COMMENTS, comments));
  });

  it(`tests the action. Comment loading status update`, () => {
    expect(setCommentLoadingStatus(status)).toEqual(getExpectedAction(ActionType.SET_COMMENT_LOADING_STATUS, status));
  });

  it(`tests the action. Favorite loading status update`, () => {
    expect(setFavoriteLoadingStatus(status)).toEqual(getExpectedAction(ActionType.SET_FAVORITE_LOADING_STATUS, status));
  });

  it(`tests the action. Obtaining ID`, () => {
    expect(highlightHotelID(id)).toEqual(getExpectedAction(ActionType.HIGHLIGHT_HOTEL_ID, id));
  });

  it(`tests the action. Obtaining sort type`, () => {
    expect(setActiveSort(sort)).toEqual(getExpectedAction(ActionType.SET_ACTIVE_SORT, sort));
  });

  it(`tests the action. Getting authorization status`, () => {
    expect(requireAuthorization(status)).toEqual(getExpectedAction(ActionType.REQUIRED_AUTHORIZATION, status));
  });

  it(`tests the action. Redirect to route`, () => {
    expect(redirectToRoute(url)).toEqual(getExpectedAction(ActionType.REDIRECT_TO_ROUTE, url));
  });

  it(`tests the action. Retrieving User information`, () => {
    expect(loadUserInfo(info)).toEqual(getExpectedAction(ActionType.LOAD_USER_INFO, info));
  });
});
