import {ActionType} from '../action';
import {AuthorizationStatus} from '../../utils/constants';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return {...state, authorizationStatus: action.payload};
    default:
      return state;
  }
};

export {authReducer};
