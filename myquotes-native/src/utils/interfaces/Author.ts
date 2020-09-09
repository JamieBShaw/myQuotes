import { Maybe } from "graphql/jsutils/Maybe";
import { Author, Quote, User } from "../../generated/graphql";

export type StateAuthor =
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

export type StateAuthorArray = StateAuthor[];
