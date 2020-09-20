import React, { useContext } from "react";
import {
  View,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
} from "react-native";
import { AuthorData, RefetchAuthor } from "../../utils/interfaces";
import { AuthorItem } from "../AuthorListItem";
import { ActionTypes } from "../../state/actions/authActions";
import { AuthContext } from "../../state/context/auth";
import {
  useAddAuthorToUsersFavMutation,
  useRemoveAuthorFromUsersFavMutation,
} from "../../generated/graphql";
import { ActivityIndicator } from "react-native-paper";

interface Props {
  authorData: AuthorData[] | undefined;
  loading?: boolean;
  handleRefetch?: RefetchAuthor;
}

export const AuthorList: React.FC<Props> = ({
  authorData,
  handleRefetch,
  loading,
}) => {
  if (!handleRefetch) {
    handleRefetch = undefined;
  }
  const { dispatch } = useContext(AuthContext);

  const [addAuthorToUsersFavMutation] = useAddAuthorToUsersFavMutation({
    onCompleted: () => {
      handleRefetch ? handleRefetch() : undefined;
    },
  });
  const [
    removeAuthorFromUsersFavMutation,
  ] = useRemoveAuthorFromUsersFavMutation({
    onCompleted: () => {
      handleRefetch ? handleRefetch() : undefined;
    },
  });

  const addAuthorToFav = (id: string) => {
    addAuthorToUsersFavMutation({
      variables: {
        id,
      },
    })
      .then(({ data }) => {
        const authorAdded = data?.addAuthorToFavourites.find(
          (a) => a?.id === id
        );
        dispatch({
          type: ActionTypes.addAuthorToUsersFavourites,
          payload: authorAdded,
        });
      })
      .catch((err) => console.log("Error: ", err));
  };

  const removeAuthorFromFav = (id: string) => {
    removeAuthorFromUsersFavMutation({
      variables: {
        id,
      },
    })
      .then(() => {
        dispatch({
          type: ActionTypes.removeAuthorFromUsersFavourites,
          payload: id,
        });
      })
      .catch((err) => console.log("Error:  ", err));
  };

  const renderItem = (author: ListRenderItemInfo<AuthorData>) => {
    const { item } = author;
    return (
      <AuthorItem
        item={item}
        addAuthorToFav={addAuthorToFav}
        removeAuthorFromFav={removeAuthorFromFav}
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
      data={authorData}
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
          <Text>No Authors Found...</Text>
        </View>
      )}
    />
  );
};
