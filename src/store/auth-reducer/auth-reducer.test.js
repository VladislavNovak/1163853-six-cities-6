import {AuthorizationStatus} from '../../utils/constants';
import {ActionType} from '../action';
import {authReducer} from './auth-reducer';

describe(`Reducer 'auth-reducer' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(authReducer(undefined, {}))
      .toEqual({authorizationStatus: AuthorizationStatus.NO_AUTH});
  });

  it(`Reducer should update authorizationStatus to 'auth'`, () => {
    const state = {authorizationStatus: AuthorizationStatus.NO_AUTH};
    const requiredAuthorizationAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    };

    expect(authReducer(state, requiredAuthorizationAction))
      .toEqual({authorizationStatus: AuthorizationStatus.AUTH});
  });
});
