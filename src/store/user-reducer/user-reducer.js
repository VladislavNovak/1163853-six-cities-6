import {getPlace, updatedHotelsList} from '../../utils';
import {createReducer} from '@reduxjs/toolkit';
import {highlightHotelID, loadComments, loadHotels, loadNearestHotels, loadUserEmail, refreshHotelData, refreshHotelDataLoadStatus, setActiveCity, setActiveSort, setLastCommentLoadingStatus} from '../action';
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

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadHotels, (state, action) => {
    state.isHotelsLoaded = true;
    state.hotels = action.payload;
    state.activeCity = getPlace(action.payload, CitiesList[0]);
  });
  builder.addCase(loadNearestHotels, (state, action) => {
    state.nearbyHotels = action.payload;
  });
  builder.addCase(setActiveCity, (state, action) => {
    state.activeCity = action.payload;
  });
  builder.addCase(highlightHotelID, (state, action) => {
    state.highlightHotelID = action.payload;
  });
  builder.addCase(setActiveSort, (state, action) => {
    state.activeSort = action.payload;
  });
  builder.addCase(loadComments, (state, action) => {
    state.comments = action.payload;
  });
  builder.addCase(setLastCommentLoadingStatus, (state, action) => {
    state.lastCommentLoadingStatus = action.payload;
  });
  builder.addCase(refreshHotelData, (state, action) => {
    state.activeHotel = action.payload;
    state.hotels = updatedHotelsList(state.hotels, action.payload);
  });
  builder.addCase(refreshHotelDataLoadStatus, (state, action) => {
    state.activeHotelReloaded = action.payload;
  });
  builder.addCase(loadUserEmail, (state, action) => {
    state.userEmail = action.payload;
  });
});

export {userReducer};
