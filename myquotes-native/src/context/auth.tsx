import React, { createContext, Dispatch, useReducer } from "react";
import { IUserActions } from "./actions";
import { authReducer } from "./authReducer";
import { Scalars } from "../generated/graphql";
import { StateQuoteArray } from "../utils/interfaces/Quote";
import { StateAuthorArray } from "../utils/interfaces/Author";

export interface IUser {
  __typename?: "user";
  id: Scalars["ID"];
  username: Scalars["String"];
  email: Scalars["String"];
  isLoggedIn: Scalars["Boolean"];
  favouriteQuotes?: Partial<StateQuoteArray>;
  favouriteAuthors?: Partial<StateAuthorArray>;
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
  state: IUser;
  dispatch: Dispatch<IUserActions>;
}

export const AuthContext = createContext({} as AuthContext);

export const AuthContextProvider: React.FC = (props): JSX.Element => {
  const [state, dispatch] = useReducer(authReducer, userInitialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};
