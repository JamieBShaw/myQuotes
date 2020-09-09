import { StateQuote } from "../utils/interfaces/Quote";
import { IUser } from "../utils/interfaces/User";

export enum ActionTypes {
  addQuoteToUsersFavourites,
  removeQuoteFromUsersFavourites,
  loginUser,
  registerUser,
  signOutUser,
}

export interface AddQuoteToUserFav {
  type: ActionTypes.addQuoteToUsersFavourites;
  payload: StateQuote;
}

export interface RemoveQuoteFromUsersFav {
  type: ActionTypes.removeQuoteFromUsersFavourites;
  payload: string;
}

export interface LoginUser {
  type: ActionTypes.loginUser;
  payload: IUser;
}

export interface RegisterUser {
  type: ActionTypes.registerUser;
  payload: IUser;
}

export interface SignOutUser {
  type: ActionTypes.signOutUser;
  payload: IUser;
}

export type IUserActions =
  | AddQuoteToUserFav
  | RemoveQuoteFromUsersFav
  | LoginUser
  | SignOutUser
  | RegisterUser;
