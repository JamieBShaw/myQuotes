import { QuoteData, AuthorData } from "../../utils/interfaces";
import { IUser } from "../context/auth";

export enum ActionTypes {
  addQuoteToUsersFavourites,
  removeQuoteFromUsersFavourites,
  addAuthorToUsersFavourites,
  removeAuthorFromUsersFavourites,
  loginUser,
  registerUser,
  signOutUser,
}

export interface AddQuoteToUserFav {
  type: ActionTypes.addQuoteToUsersFavourites;
  payload: QuoteData;
}

export interface RemoveQuoteFromUsersFav {
  type: ActionTypes.removeQuoteFromUsersFavourites;
  payload: string;
}

export interface AddAuthorToUserFav {
  type: ActionTypes.addAuthorToUsersFavourites;
  payload: AuthorData;
}

export interface RemoveAuthorFromUsersFav {
  type: ActionTypes.removeAuthorFromUsersFavourites;
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
  | AddAuthorToUserFav
  | RemoveAuthorFromUsersFav
  | LoginUser
  | SignOutUser
  | RegisterUser;
