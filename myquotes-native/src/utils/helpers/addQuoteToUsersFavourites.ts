// import { AuthContext } from "../../state/context/auth";
// import { useContext } from "react";
// import { ActionTypes, IUserActions } from "../../state/actions/actions";
// import { AddQuoteToUsersFavMutation, Exact } from "../../generated/graphql";
// import { MutationFunctionOptions, FetchResult } from "@apollo/client";

// const { dispatch } = useContext(AuthContext);

// type AddQuoteToFavType = (
//   options?:
//     | MutationFunctionOptions<AddQuoteToUsersFavMutation, Exact<{ id: string }>>
//     | undefined
// ) => Promise<FetchResult<AddQuoteToUsersFavMutation>>;

// export const addQuoteToFav = (
//   id: string,
//   mutation: AddQuoteToFavType,
//   dispath: React.Dispatch<IUserActions>
// ) => {
//   return mutation({
//     variables: {
//       id,
//     },
//   })
//     .then(({ data }) => {
//       const quoteAdded = data?.addQuoteToFavourites.find((q) => q?.id === id);
//       dispatch({
//         type: ActionTypes.addQuoteToUsersFavourites,
//         payload: quoteAdded,
//       });
//     })
//     .catch((err) => console.log("Error: ", err));
// };
