import {
  Quote,
  Author,
  Exact,
  QuoteFilter,
  GetQuotesQuery,
} from "../../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { Maybe } from "graphql/jsutils/Maybe";

export type QuoteData =
  | Maybe<
      {
        __typename?: "Quote" | undefined;
      } & Pick<Quote, "id" | "body" | "favCount" | "subject"> & {
          author: {
            __typename?: "Author" | undefined;
          } & Pick<Author, "id" | "name">;
        }
    >
  | null
  | undefined;

//   (property) addQuoteToFavourites: Maybe<{
//     __typename?: "Quote" | undefined;
// } & Pick<Quote, "id" | "body" | "favCount" | "subject"> & {
//     author: {
//         __typename?: "Author" | undefined;
//     } & Pick<Author, "id" | "name">;
// }>[] | undefined

// export type RefetchQuote<T> = (
//   variables?:
//     | Partial<
//         Exact<{
//           [key: string]: never;
//         }>
//       >
//     | undefined
// ) => Promise<ApolloQueryResult<T>>;

// export type RefetchQuote = (
//   variables?:
//     | Partial<
//         Exact<{
//           input: QuoteFilter;
//           offset?: number | null | undefined;
//           limit?: number | null | undefined;
//         }>
//       >
//     | undefined
// ) => Promise<ApolloQueryResult<GetQuotesQuery>>;

export type RefetchQuote = (
  variables?:
    | Partial<
        Exact<{
          input: QuoteFilter;
        }>
      >
    | undefined
) => Promise<ApolloQueryResult<GetQuotesQuery>>;

// export type RefetchQuote = (
//   variables?:
//     | Partial<
//         Exact<{
//           [key: string]: never;
//         }>
//       >
//     | undefined
// ) => Promise<ApolloQueryResult<GetQuotesQuery>>;
