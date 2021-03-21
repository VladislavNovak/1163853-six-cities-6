import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../utils/constants';
import {requireAuthorization} from '../action';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(requireAuthorization, (store, action) => {
    store.authorizationStatus = action.payload;
  });
});


export {authReducer};
