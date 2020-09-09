import { removeUserToken } from "../utils/auth/Auth";
import { IUserActions, ActionTypes } from "./actions";
import { IUser } from "./auth";

export const authReducer = (state: IUser, action: IUserActions): IUser => {
  switch (action.type) {
    case ActionTypes.addQuoteToUsersFavourites:
      console.log("payload quote id: ", action.payload?.id);

      return {
        ...state,
        favouriteQuotes: [...state.favouriteQuotes, action.payload],
      };
    case ActionTypes.removeQuoteFromUsersFavourites:
      console.log("payload quote id: ", action.payload);

      return {
        ...state,
        favouriteQuotes: state.favouriteQuotes?.filter(
          (quote) => quote?.id !== action.payload
        ),
      };
    case ActionTypes.loginUser:
      console.log("payload login user id: ", action.payload.id);

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
      console.log("payload register user id: ", action.payload.id);

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
