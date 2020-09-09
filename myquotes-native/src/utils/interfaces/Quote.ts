import { Quote, Author, Exact, GetQuotesQuery } from "../../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { Maybe } from "graphql/jsutils/Maybe";

export type QuoteData = {
  __typename?: "Quote" | undefined;
} & Pick<Quote, "id" | "body" | "favCount"> & {
    author: {
      __typename?: "Author" | undefined;
    } & Pick<Author, "id" | "name">;
  };

export type StateQuote =
  | Maybe<
      {
        __typename?: "Quote" | undefined;
      } & Pick<
        Quote,
        "id" | "createdAt" | "updatedAt" | "body" | "favCount" | "subject"
      > & {
          author: {
            __typename?: "Author" | undefined;
          } & Pick<Author, "id">;
        }
    >
  | null
  | undefined;

export type StateQuoteArray = StateQuote[];

export type RefetchQuote = (
  variables?:
    | Partial<
        Exact<{
          [key: string]: never;
        }>
      >
    | undefined
) => Promise<ApolloQueryResult<GetQuotesQuery>>;
