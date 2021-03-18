import {combineReducers} from 'redux';
import {authReducer} from './auth-reducer/auth-reducer';
import {userReducer} from './user-reducer/user-reducer';

export const NameSpace = {
  AUTH: `AUTH`,
  USER: `USER`,
};

export default combineReducers({
  [NameSpace.AUTH]: authReducer,
  [NameSpace.USER]: userReducer,
});
