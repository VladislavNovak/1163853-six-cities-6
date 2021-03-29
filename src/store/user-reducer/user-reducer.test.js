import {adaptAllHotelsToClient, adaptOneHotelToClient} from '../../services/hotelAdapter';
import {adaptAllCommentsToClient} from '../../services/commentAdapter';
import {getPlace} from "../../utils";
import {CitiesList, LoadingStatus, SortType} from "../../utils/constants";
import {ActionType} from "../action";
import {userReducer} from "./user-reducer";

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

const hotel = {
  "city": {
    "name": `Paris`,
    "location": {
      "latitude": 48.85661,
      "longitude": 2.351499,
      "zoom": 13
    }
  },
  "preview_image": `https://assets.htmlacademy.ru`,
  "images": [`https://assets.htmlacademy.ru`],
  "title": `The house among olive`,
  "is_favorite": false,
  "is_premium": true,
  "rating": 3,
  "type": `room`,
  "bedrooms": 1,
  "max_adults": 1,
  "price": 169,
  "goods": [`Breakfast`],
  "host": {
    "id": 25,
    "name": `Angelina`,
    "is_pro": true,
    "avatar_url": `img/avatar-angelina.jpg`
  },
  "description": `Relax, rejuvenate`,
  "location": {
    "latitude": 48.83861,
    "longitude": 2.350499,
    "zoom": 16
  },
  "id": 1
};

const hotels = [hotel];

const comment = ({
  "id": 1,
  "user": {
    "id": 11,
    "is_pro": false,
    "name": `Jack`,
    "avatar_url": `https://assets.htmlacademy.ru`
  },
  "rating": 3,
  "comment": `Beautiful space, fantastic location and`,
  "date": `2021-02-10T08:04:28.647Z`
});

const comments = [comment];

const userAdapter = () => ({
  'userEmail': `email`,
  'userAvatar': `avatar_url`,
});

describe(`Reducers work correctly`, () => {
  it(`tests the reducer. Without additional parameters`, () => {
    expect(userReducer(undefined, {})).toEqual(initState);
  });

  it(`tests the reducer. Load hotels`, () => {
    const adaptedHotels = adaptAllHotelsToClient(hotels);

    const addAction = {
      type: ActionType.LOAD_HOTELS,
      payload: adaptedHotels
    };

    expect(userReducer(initState, addAction)).toEqual({
      ...initState,
      isHotelsLoaded: true,
      hotels: adaptedHotels,
      activeCity: getPlace(adaptedHotels, CitiesList[0])});
  });

  it(`tests the reducer. Load nearest hotels`, () => {
    const addAction = {
      type: ActionType.LOAD_NEARBY_HOTELS,
      payload: adaptAllHotelsToClient
    };

    expect(userReducer(initState, addAction)).toEqual({...initState, nearbyHotels: adaptAllHotelsToClient});
  });

  it(`tests the reducer. Refresh hotel data`, () => {
    const adaptedHotel = adaptOneHotelToClient(hotel);

    const addAction = {
      type: ActionType.REFRESH_HOTEL_DATA,
      payload: adaptedHotel
    };

    expect(userReducer(initState, addAction)).toEqual({
      ...initState,
      activeHotel: adaptedHotel,
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
    const adaptedComments = adaptAllCommentsToClient(comments);

    const addAction = {
      type: ActionType.LOAD_COMMENTS,
      payload: adaptedComments
    };

    expect(userReducer(initState, addAction)).toEqual({...initState, comments: adaptedComments});
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
