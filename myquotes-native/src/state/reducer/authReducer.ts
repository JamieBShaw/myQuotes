import { removeUserToken } from "../../utils/token";
import { IUserActions, ActionTypes } from "../actions/authActions";
import { IUser } from "../context/auth";

export const authReducer = (state: IUser, action: IUserActions): IUser => {
  switch (action.type) {
    case ActionTypes.addQuoteToUsersFavourites:
      if (
        state.favouriteQuotes?.length === 0 ||
        state.favouriteQuotes === undefined ||
        state.favouriteQuotes === null
      ) {
        return {
          ...state,
          favouriteQuotes: [action.payload],
        };
      }
      return {
        ...state,
        favouriteQuotes: [...state.favouriteQuotes, action.payload],
      };
    case ActionTypes.removeQuoteFromUsersFavourites:
      return {
        ...state,
        favouriteQuotes: state.favouriteQuotes?.filter(
          (quote) => quote?.id !== action.payload
        ),
      };

    case ActionTypes.addAuthorToUsersFavourites:
      if (
        state.favouriteAuthors?.length === 0 ||
        state.favouriteAuthors === undefined ||
        state.favouriteAuthors === null
      ) {
        return {
          ...state,
          favouriteAuthors: [action.payload],
        };
      }
      return {
        ...state,
        favouriteAuthors: [...state.favouriteAuthors, action.payload],
      };

    case ActionTypes.removeAuthorFromUsersFavourites:
      return {
        ...state,
        favouriteAuthors: state.favouriteAuthors?.filter(
          (author) => author?.id !== action.payload
        ),
      };
    case ActionTypes.loginUser:
      return {
        ...state,
        email: action.payload.email,
        id: action.payload.id,
        isLoggedIn: true,
        username: action.payload.username,
        favouriteQuotes: action.payload.favouriteQuotes,
        favouriteAuthors: action.payload.favouriteAuthors,
      };
    case ActionTypes.registerUser:
      if (action.payload.favouriteQuotes === null) {
        action.payload.favouriteQuotes = undefined;
      }
      return {
        ...state,
        email: action.payload.email,
        id: action.payload.id,
        isLoggedIn: true,
        username: action.payload.username,
        favouriteQuotes: action.payload.favouriteQuotes,
        favouriteAuthors: action.payload.favouriteAuthors,
      };

    case ActionTypes.signOutUser:
      removeUserToken();
      return state;
    default:
      return state;
  }
};
