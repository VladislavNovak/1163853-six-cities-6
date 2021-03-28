import {getPlace} from "../../utils";
import {CitiesList, LoadingStatus, SortType} from "../../utils/constants";
import {ActionType} from "../action";
import {userReducer} from "./user-reducer";

// setActiveCity
// highlightHotelID
// setActiveSort
// setCommentLoadingStatus
// setFavoriteLoadingStatus

const initState = {
  isHotelsLoaded: false,
  hotels: [],
  nearbyHotels: [],
  activeHotel: {},
  activeHotelReloaded: false,
  activeCity: null,
  comments: [],
  commentLoadingStatus: LoadingStatus.DEFAULT,
  favoriteLoadingStatus: LoadingStatus.DEFAULT,
  highlightHotelID: ``,
  activeSort: SortType.POPULAR,
  userInfo: {},
};

const adaptOneHotelToClient = () => ({
  'id': `1`,
  'cityName': `Paris`,
  'cityLatitude': 0.325,
  'cityLongitude': 0.563,
  'cityZoom': 13,
  'title': `Good`,
  'images': [`url`],
  'preview': `Preview`,
  'isPremium': true,
  'isFavorite': true,
  'bedrooms': 2,
  'adults': 1,
  'price': 123,
  'rating': `5`,
  'description': `Good`,
  'type': `Type`,
  'hostName': `Name`,
  'hostId': `2`,
  'services': [`Services`],
  'hostIsPro': false,
  'hostAvatar': `Avatar`,
  'latitude': 0.235,
  'longitude': 0.563,
  'zoom': 13,
});

const adaptOneCommentToClient = ({
  'id': `1`,
  'quote': `Good`,
  'date': `3464575467`,
  'rating': `5`,
  'visitorId': `2`,
  'visitorName': `Avatar`,
  'visitorIsPro': false
});

const userAdapter = () => ({
  'userEmail': `email`,
  'userAvatar': `avatar_url`,
});

const adaptAllHotelsToClient = [adaptOneHotelToClient];
const adaptAllCommentsToClient = [adaptOneCommentToClient];

describe(`Reducers work correctly`, () => {
  it(`tests the reducer. Without additional parameters`, () => {
    expect(userReducer(undefined, {})).toEqual(initState);
  });

  it(`tests the reducer. Load hotels`, () => {
    const addAction = {
      type: ActionType.LOAD_HOTELS,
      payload: adaptAllHotelsToClient
    };

    expect(userReducer(initState, addAction)).toEqual({
      ...initState,
      isHotelsLoaded: true,
      hotels: adaptAllHotelsToClient,
      activeCity: getPlace(adaptAllHotelsToClient, CitiesList[0])});
  });

  it(`tests the reducer. Load nearest hotels`, () => {
    const addAction = {
      type: ActionType.LOAD_NEARBY_HOTELS,
      payload: adaptAllHotelsToClient
    };

    expect(userReducer(initState, addAction)).toEqual({...initState, nearbyHotels: adaptAllHotelsToClient});
  });

  it(`tests the reducer. Refresh hotel data`, () => {
    const addAction = {
      type: ActionType.REFRESH_HOTEL_DATA,
      payload: adaptOneHotelToClient
    };

    expect(userReducer(initState, addAction)).toEqual({
      ...initState,
      activeHotel: adaptOneHotelToClient,
      hotels: []
    });
  });

  it(`tests the reducer. Refresh hotel data load status`, () => {
    const addAction = {
      type: ActionType.REFRESH_HOTEL_DATA_LOAD_STATUS,
      payload: true
    };

    expect(userReducer(initState, addAction)).toEqual({...initState, activeHotelReloaded: true});
  });

  it(`tests the reducer. Set active city`, () => {
    const addAction = {
      type: ActionType.SET_ACTIVE_CITY,
      payload: `Paris`
    };

    expect(userReducer(initState, addAction)).toEqual({...initState, activeCity: `Paris`});
  });

  it(`tests the reducer. Load comments`, () => {
    const addAction = {
      type: ActionType.LOAD_COMMENTS,
      payload: adaptAllCommentsToClient
    };

    expect(userReducer(initState, addAction)).toEqual({...initState, comments: adaptAllCommentsToClient});
  });

  it(`tests the reducer. Highlight hotel ID`, () => {
    const addAction = {
      type: ActionType.HIGHLIGHT_HOTEL_ID,
      payload: 1
    };

    expect(userReducer(initState, addAction)).toEqual({...initState, highlightHotelID: 1});
  });

  it(`tests the reducer. Set active sort`, () => {
    const addAction = {
      type: ActionType.SET_ACTIVE_SORT,
      payload: `Popular`
    };

    expect(userReducer(initState, addAction)).toEqual({...initState, activeSort: `Popular`});
  });

  it(`tests the reducer. Set comment loading status`, () => {
    const addAction = {
      type: ActionType.SET_COMMENT_LOADING_STATUS,
      payload: LoadingStatus.DEFAULT
    };

    expect(userReducer(initState, addAction)).toEqual({...initState, commentLoadingStatus: LoadingStatus.DEFAULT});
  });

  it(`tests the reducer. Set favorit loading status`, () => {
    const addAction = {
      type: ActionType.SET_FAVORITE_LOADING_STATUS,
      payload: LoadingStatus.DEFAULT
    };

    expect(userReducer(initState, addAction)).toEqual({...initState, favoriteLoadingStatus: LoadingStatus.DEFAULT});
  });

  it(`tests the reducer. Load iser info`, () => {
    const addAction = {
      type: ActionType.LOAD_USER_INFO,
      payload: userAdapter
    };

    expect(userReducer(initState, addAction)).toEqual({...initState, userInfo: userAdapter});
  });

});

// userReducer:
// initState - текущее состояние
// addAction - воздействие на состояние
