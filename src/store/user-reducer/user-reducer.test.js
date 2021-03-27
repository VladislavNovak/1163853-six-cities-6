import {LoadingStatus, SortType} from "../../utils/constants";
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

describe(`Reducers work correctly`, () => {
  it(`tests the reducer. Without additional parameters`, () => {
    expect(userReducer(undefined, {})).toEqual(initState);
  });

  it(`tests the reducer. Set active city`, () => {
    const addAction = {
      type: ActionType.SET_ACTIVE_CITY,
      payload: `Paris`
    };

    expect(userReducer(initState, addAction)).toEqual({...initState, activeCity: `Paris`});
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

});

// userReducer:
// initState - текущее состояние
// addAction - воздействие на состояние
