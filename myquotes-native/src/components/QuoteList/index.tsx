import React, { useContext } from "react";
import {
  useAddQuoteToUsersFavMutation,
  useRemoveQuoteFromUsersFavMutation,
} from "../../generated/graphql";
import { View, FlatList, ListRenderItemInfo } from "react-native";
import { AuthContext } from "../../context/auth";
import { QuoteListItem } from "../QuoteListItem";
import { QuoteData, RefetchQuote } from "../../utils/interfaces/Quote";
import { ActionTypes } from "../../context/actions";
type QueryQuoteData = QuoteData[] | undefined;

interface Props {
  quotesData: QueryQuoteData;
  loading: boolean;
  refetch: RefetchQuote;
}

export const QuoteList: React.FC<Props> = ({ quotesData, refetch }) => {
  const { state, dispatch } = useContext(AuthContext);
  const [addQuoteToUsersFavMutation, ,] = useAddQuoteToUsersFavMutation({
    fetchPolicy: "no-cache",
    onCompleted: () => refetch(),
  });
  const [removeQuoteFromUsersFavMutation] = useRemoveQuoteFromUsersFavMutation({
    fetchPolicy: "no-cache",
    onCompleted: () => refetch(),
  });

  const addQuoteToFav = (id: string) => {
    addQuoteToUsersFavMutation({
      variables: {
        id,
      },
    })
      .then(({ data }) => {
        const quoteAdded = data?.addQuoteToFavourites.find((q) => q?.id === id);
        dispatch({
          type: ActionTypes.addQuoteToUsersFavourites,
          payload: quoteAdded,
        });
      })
      .catch((err) => console.log("Error: ", err));
  };

  const removeQuoteFromFav = (id: string) => {
    removeQuoteFromUsersFavMutation({
      variables: {
        id,
      },
    })
      .then(() => {
        dispatch({
          type: ActionTypes.removeQuoteFromUsersFavourites,
          payload: id,
        });
      })
      .catch((err) => console.log("Error:  ", err));
  };

  const likedByUser = (quote: QuoteData): boolean => {
    if (state && state.favouriteQuotes?.find((q) => quote.id === q?.id)) {
      return true;
    } else {
      return false;
    }
  };

  const renderItem = (quote: ListRenderItemInfo<QuoteData>) => {
    const { item } = quote;
    return (
      <QuoteListItem
        quote={item}
        addQuoteToFav={addQuoteToFav}
        removeQuoteFromFav={removeQuoteFromFav}
        likedByUser={likedByUser}
      />
    );
  };

  return (
    <View>
      <FlatList data={quotesData} renderItem={renderItem} />
    </View>
  );
};
