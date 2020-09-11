import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { AppButton } from "../AppButton";
import { Theme } from "../../../theme";
import { QuoteData } from "../../utils/interfaces";

interface Props {
  quote: QuoteData;
  likedByUser: (quote: QuoteData) => boolean;
  addQuoteToFav: (id: string) => void;
  removeQuoteFromFav: (id: string) => void;
}

export const Index: React.FC<Props> = ({
  quote,
  addQuoteToFav,
  likedByUser,
  removeQuoteFromFav,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.body}>'{quote.body}'</Text>
      </View>

      <View style={styles.secondaryContainer}>
        <Text style={styles.author}>
          {quote.author.name} | {quote.favCount}
        </Text>
        <View>
          <AppButton
            text={
              likedByUser(quote) ? (
                <MaterialIcons
                  name="remove-circle-outline"
                  size={20}
                  color="black"
                />
              ) : (
                <MaterialIcons
                  name="add-circle-outline"
                  size={20}
                  color="black"
                />
              )
            }
            style={
              likedByUser(quote) ? styles.secondaryButton : styles.primaryButton
            }
            onPress={
              likedByUser(quote)
                ? () => removeQuoteFromFav(quote.id)
                : () => addQuoteToFav(quote.id)
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: Theme.font.size - 4,
    fontStyle: "italic",
  },

  author: {
    paddingTop: 12,
    fontFamily: Theme.font.primary,
  },
});
