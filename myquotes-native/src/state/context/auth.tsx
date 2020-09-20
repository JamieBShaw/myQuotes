import React, { createContext, Dispatch, useReducer } from "react";
import { IUserActions } from "../actions/authActions";
import { authReducer } from "../reducer/authReducer";
import { Scalars } from "../../generated/graphql";
import { AuthorData, QuoteData } from "../../utils/interfaces";

export interface IUser {
  __typename?: "user";
  id: Scalars["ID"];
  username: Scalars["String"];
  email: Scalars["String"];
  isLoggedIn: Scalars["Boolean"];
  favouriteQuotes?: Partial<Array<QuoteData>>;
  favouriteAuthors?: Partial<Array<AuthorData>>;
}

export const userInitialState: IUser = {
  __typename: "user",
  id: "",
  email: "",
  username: "",
  isLoggedIn: false,
  favouriteQuotes: [],
  favouriteAuthors: [],
};

interface AuthContext {
  user: IUser;
  dispatch: Dispatch<IUserActions>;
}

export const AuthContext = createContext({} as AuthContext);

export const AuthContextProvider: React.FC = (props): JSX.Element => {
  const [user, dispatch] = useReducer(authReducer, userInitialState);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};
