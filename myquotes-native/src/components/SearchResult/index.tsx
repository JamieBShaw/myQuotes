import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Theme } from "../../../theme";
import { AppButton } from "../AppButton";

interface Props {}

export const SearchResult: React.FC<Props> = () => {
  return (
    <View>
      <View>
        <Text style={styles.body}/>
      </View>

      <View style={styles.secondaryContainer}>
        <Text style={styles.author}/>
        <View>
          <AppButton text="Add" fontSize={18} />
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
