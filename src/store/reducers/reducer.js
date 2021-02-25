import {extend} from '../../utils';
import {ActionType} from '../action';
import {City, getCity} from '../../temp/city';
import {mockHotels} from '../../temp/hotel';
import {mockComments} from '../../temp/comment';

const initialState = {
  hotels: mockHotels,
  activeCity: getCity(City.PARIS),
  comments: mockComments,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_HOTELS:
      return extend(state, {
        hotels: action.payload,
      });
    case ActionType.SET_ACTIVE_CITY:
      return extend(state, {
        activeCity: action.payload,
      });
    default:
      return state;
  }
};

export {reducer};
