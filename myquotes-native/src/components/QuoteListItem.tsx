import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppButton } from "./AppButton";
import { Theme } from "../../theme";
import { QuoteData } from "../utils/interfaces/Quote";

interface Props {
  quote: QuoteData;
  likedByUser: (quote: QuoteData) => boolean;
  addQuoteToFav: (id: string) => void;
  removeQuoteFromFav: (id: string) => void;
}

export const QuoteListItem: React.FC<Props> = ({
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
            text={likedByUser(quote) ? "-" : "+"}
            style={
              likedByUser(quote) ? styles.secondaryButton : styles.primaryButton
            }
            fontSize={18}
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
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 5,
    margin: 5,
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
