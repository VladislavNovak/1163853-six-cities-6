import {getPlace, updatedHotelsList} from '../../utils';
import {createReducer} from '@reduxjs/toolkit';
import {
  highlightHotelID,
  loadComments,
  loadHotels,
  loadNearestHotels,
  loadUserInfo,
  refreshHotelData,
  refreshHotelDataLoadStatus,
  setActiveCity,
  setActiveSort,
  setCommentLoadingStatus,
  setFavoriteLoadingStatus,
} from '../action';
import {CitiesList, SortType, LoadingStatus} from '../../utils/constants';

const initialState = {
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
  builder.addCase(setCommentLoadingStatus, (state, action) => {
    state.commentLoadingStatus = action.payload;
  });
  builder.addCase(setFavoriteLoadingStatus, (state, action) => {
    state.favoriteLoadingStatus = action.payload;
  });
  builder.addCase(refreshHotelData, (state, action) => {
    state.activeHotel = action.payload;
    state.hotels = updatedHotelsList(state.hotels, action.payload);
  });
  builder.addCase(refreshHotelDataLoadStatus, (state, action) => {
    state.activeHotelReloaded = action.payload;
  });
  builder.addCase(loadUserInfo, (state, action) => {
    state.userInfo = action.payload;
  });
});

export {userReducer};
