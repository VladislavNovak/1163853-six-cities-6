import {NameSpace} from "../root-reducer";

export const getIsHotelsLoaded = (state) => state[NameSpace.USER].isHotelsLoaded;
export const getHotels = (state) => state[NameSpace.USER].hotels;
export const getNearbyHotels = (state) => state[NameSpace.USER].nearbyHotels;
export const getActiveHotel = (state) => state[NameSpace.USER].activeHotel;
export const getActiveHotelReloaded = (state) => state[NameSpace.USER].activeHotelReloaded;
export const getActiveCity = (state) => state[NameSpace.USER].activeCity;
export const getComments = (state) => state[NameSpace.USER].comments;
export const getLastCommentLoadingStatus = (state) => state[NameSpace.USER].lastCommentLoadingStatus;
export const getHighlightHotelID = (state) => state[NameSpace.USER].highlightHotelID;
export const getActiveSort = (state) => state[NameSpace.USER].activeSort;
export const getUserEmail = (state) => state[NameSpace.USER].userEmail;
