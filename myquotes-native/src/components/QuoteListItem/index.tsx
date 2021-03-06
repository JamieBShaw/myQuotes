import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { AppButton } from "../AppButton";
import { Theme } from "../../../theme";
import { QuoteData } from "../../utils/interfaces";
import { likedByUser } from "../../utils/helpers/likedByUser";
import { AuthContext } from "../../state/context/auth";

interface Props {
  item: QuoteData;
  addQuoteToFav: (id: string) => void;
  removeQuoteFromFav: (id: string) => void;
}

// const isQuoteData = (item: any): item is QuoteData => {
//   return true;
// };

export const QuoteItem: React.FC<Props> = ({
  item,
  addQuoteToFav,
  removeQuoteFromFav,
}) => {
  const { user } = useContext(AuthContext);
  if (!item) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.body}>'{item.body}'</Text>
      </View>

      <View style={styles.secondaryContainer}>
        <Text style={styles.author}>
          <Text style={{ fontWeight: "bold" }}>
            {item.id} | {item.author.name} | {item.subject ? item.subject : ""}
          </Text>{" "}
          |{" "}
          <MaterialIcons
            name="favorite"
            size={14}
            color={likedByUser(item, user) ? "red" : "black"}
          />{" "}
          {item.favCount}
        </Text>
        <View>
          <AppButton
            text={
              likedByUser(item, user) ? (
                <MaterialIcons
                  name="remove-circle-outline"
                  size={28}
                  color="black"
                />
              ) : (
                <MaterialIcons
                  name="add-circle-outline"
                  size={28}
                  color="black"
                />
              )
            }
            style={
              likedByUser(item, user)
                ? styles.secondaryButton
                : styles.primaryButton
            }
            onPress={
              likedByUser(item, user)
                ? () => removeQuoteFromFav(item.id)
                : () => addQuoteToFav(item.id)
            }
          />
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
    padding: 5,
    elevation: 2, // android
    shadowColor: "black", // ios
    shadowOffset: { width: 0, height: 1 }, // ios
    shadowRadius: 4, // ios
    shadowOpacity: 0.25, // ios
    margin: 5,
    borderRadius: 10,
  },

  primaryButton: {
    marginTop: 10,
    backgroundColor: Theme.colors.background,
    color: "black",
  },
  secondaryButton: {
    marginTop: 10,
    color: "green",
  },

  secondaryContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  body: {
    fontFamily: Theme.font.primary,
    fontSize: Theme.font.size - 2,
    fontStyle: "italic",
  },
  author: {
    paddingTop: 12,
    fontFamily: Theme.font.primary,
  },
});
