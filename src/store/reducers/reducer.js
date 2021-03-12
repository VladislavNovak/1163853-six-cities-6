import {getPlace} from '../../utils';
import {ActionType} from '../action';
import {CitiesList, SortType, AuthorizationStatus, LoadingStatus} from '../../utils/constants';

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
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userEmail: ``,
};

const reducer = (state = initialState, action) => {
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
    case ActionType.REQUIRED_AUTHORIZATION:
      return {...state, authorizationStatus: action.payload};
    case ActionType.LOAD_COMMENTS:
      return {...state, comments: action.payload};
    case ActionType.SET_LAST_COMMENT_LOADING_STATUS:
      return {...state, lastCommentLoadingStatus: action.payload};
    case ActionType.LOAD_ACTIVE_HOTEL:
      return {...state, activeHotel: action.payload};
    case ActionType.RELOAD_ACTIVE_HOTEL:
      return {...state, activeHotelReloaded: action.payload};
    case ActionType.LOAD_USER_EMAIL:
      return {...state, userEmail: action.payload};
    default:
      return state;
  }
};

export {reducer};

// isHotelsLoaded: false - если отели не загружены. Используется в App
// hotels: список отелей. Используется в App
// nearbyHotels: список ближайших отелей. Используется в ScreenRoom
// activeHotel: активный выделенный отель. Используется в ScreenRoom
// activeHotelReloaded: false - если отправлен запрос на сервер, true - когда ответ получен. Используется в ScreenRoom
// activeCity: null,
// comments: список комментариев. Используется в Review через ScreenRoom
// highlightHotelID: ``,
// activeSort: SortType.POPULAR,
// authorizationStatus: AuthorizationStatus.NO_AUTH,
// userEmail: ``,
