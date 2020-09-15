import { Maybe } from "graphql/jsutils/Maybe";
import {
  Author,
  Quote,
  User,
  Exact,
  AuthorFilter,
  GetAuthorsQuery,
} from "../../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";

export type AuthorData =
  | Maybe<
      {
        __typename?: "Author" | undefined;
      } & Pick<
        Author,
        "id" | "subject" | "createdAt" | "updatedAt" | "name"
      > & {
          quotes: ({
            __typename?: "Quote" | undefined;
          } & Pick<Quote, "id">)[];
          user: {
            __typename?: "User" | undefined;
          } & Pick<User, "id">;
        }
    >
  | null
  | undefined;

export type RefetchAuthor = (
  variables?:
    | Partial<
        Exact<{
          input: AuthorFilter;
        }>
      >
    | undefined
) => Promise<ApolloQueryResult<GetAuthorsQuery>>;
