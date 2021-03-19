import {NameSpace} from "../root-reducer";

export const getAuthorizationStatus = (state) => state[NameSpace.AUTH].authorizationStatus;
