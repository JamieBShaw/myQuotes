import React, { useContext } from "react";
import {
  useAddQuoteToUsersFavMutation,
  useRemoveQuoteFromUsersFavMutation,
} from "../../generated/graphql";
import {
  FlatList,
  ListRenderItemInfo,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { AuthContext } from "../../state/context/auth";
import { QuoteItem } from "../QuoteListItem";
import { QuoteData, RefetchQuote } from "../../utils/interfaces";
import { ActionTypes } from "../../state/actions/authActions";

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
  const { dispatch } = useContext(AuthContext);
  const [addQuoteToUsersFavMutation] = useAddQuoteToUsersFavMutation({
    onCompleted: () => {
      handleRefetch ? handleRefetch!() : undefined;
    },
  });
  const [removeQuoteFromUsersFavMutation] = useRemoveQuoteFromUsersFavMutation({
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

  const renderItem = (quote: ListRenderItemInfo<QuoteData>) => {
    const { item } = quote;

    return (
      <QuoteItem
        item={item}
        addQuoteToFav={addQuoteToFav}
        removeQuoteFromFav={removeQuoteFromFav}
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
      ListFooterComponent={() => <View style={{ paddingBottom: 20 }} />}
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
