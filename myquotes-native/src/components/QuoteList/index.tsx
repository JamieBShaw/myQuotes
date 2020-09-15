import React, { useContext, useEffect } from "react";
import {
  useAddQuoteToUsersFavMutation,
  useRemoveQuoteFromUsersFavMutation,
  GetQuotesQuery,
  useGetQuotesQuery,
  GetQuotesDocument,
} from "../../generated/graphql";
import {
  FlatList,
  ListRenderItemInfo,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { AuthContext } from "../../state/context/auth";
import { Index } from "../QuoteListItem";
import { QuoteData, RefetchQuote } from "../../utils/interfaces";
import { ActionTypes } from "../../state/actions/actions";
import { ActivityIndicator } from "react-native-paper";
import { getQueryDefinition } from "@apollo/client/utilities";

interface Props {
  quotesData: QuoteData[] | undefined;
  loading?: boolean;
  handleRefetch?: RefetchQuote;
}

export const QuoteList: React.FC<Props> = ({
  quotesData,
  handleRefetch,
  loading,
}) => {
  if (!handleRefetch) {
    handleRefetch = undefined;
  }
  const { user, dispatch } = useContext(AuthContext);
  const [addQuoteToUsersFavMutation] = useAddQuoteToUsersFavMutation({
    fetchPolicy: "no-cache",
    onCompleted: () => {
      handleRefetch ? handleRefetch!() : undefined;
    },
  });
  const [removeQuoteFromUsersFavMutation] = useRemoveQuoteFromUsersFavMutation({
    fetchPolicy: "no-cache",
    onCompleted: () => {
      handleRefetch ? handleRefetch!() : undefined;
    },
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
    if (user && user.favouriteQuotes?.find((q) => quote!.id === q?.id)) {
      return true;
    } else {
      return false;
    }
  };

  const renderItem = (quote: ListRenderItemInfo<QuoteData>) => {
    const { item } = quote;

    return (
      <Index
        item={item}
        addQuoteToFav={addQuoteToFav}
        removeQuoteFromFav={removeQuoteFromFav}
        likedByUser={likedByUser}
      />
    );
  };

  if (loading) {
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          paddingTop: 100,
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <FlatList
      data={quotesData}
      renderItem={renderItem}
      keyExtractor={(item) => item!.id}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 100,
          }}
        >
          <Text>No Quotes Found...</Text>
        </View>
      )}
    />
  );
};
