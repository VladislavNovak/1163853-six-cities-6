import {combineReducers} from 'redux';
import {authReducer} from './reducers/auth-reducer';
import {userReducer} from './reducers/user-reducer';

export const NameSpace = {
  AUTH: `AUTH`,
  USER: `USER`,
};

export default combineReducers({
  [NameSpace.AUTH]: authReducer,
  [NameSpace.USER]: userReducer,
});
