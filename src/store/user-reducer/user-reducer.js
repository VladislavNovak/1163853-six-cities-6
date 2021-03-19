import {getPlace, updatedHotelsList} from '../../utils';
import {ActionType} from '../action';
import {CitiesList, SortType, LoadingStatus} from '../../utils/constants';

const initialState = {
  isHotelsLoaded: false,
  hotels: [],
  nearbyHotels: [],
  activeHotel: {},
  activeHotelReloaded: false,
  activeCity: null,
  comments: [],
  lastCommentLoadingStatus: LoadingStatus.DEFAULT,
  highlightHotelID: ``,
  activeSort: SortType.POPULAR,
  userEmail: ``,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_HOTELS:
      return {...state, isHotelsLoaded: true, hotels: action.payload, activeCity: getPlace(action.payload, CitiesList[0])};
    case ActionType.LOAD_NEARBY_HOTELS:
      return {...state, nearbyHotels: action.payload};
    case ActionType.SET_ACTIVE_CITY:
      return {...state, activeCity: action.payload};
    case ActionType.HIGHLIGHT_HOTEL_ID:
      return {...state, highlightHotelID: action.payload};
    case ActionType.SET_ACTIVE_SORT:
      return {...state, activeSort: action.payload};
    case ActionType.LOAD_COMMENTS:
      return {...state, comments: action.payload};
    case ActionType.SET_LAST_COMMENT_LOADING_STATUS:
      return {...state, lastCommentLoadingStatus: action.payload};
    case ActionType.REFRESH_HOTEL_DATA:
      return {
        ...state,
        activeHotel: action.payload,
        hotels: updatedHotelsList(state.hotels, action.payload),
      };
    case ActionType.REFRESH_HOTEL_DATA_LOAD_STATUS:
      return {...state, activeHotelReloaded: action.payload};
    case ActionType.LOAD_USER_EMAIL:
      return {...state, userEmail: action.payload};
    default:
      return state;
  }
};

export {userReducer};
