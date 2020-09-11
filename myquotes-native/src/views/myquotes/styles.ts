import { StyleSheet } from "react-native";
import { Theme } from "../../../theme";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  mainContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: Theme.font.primary,
    color: Theme.colors.textPrimary,
    backgroundColor: Theme.colors.background,
    padding: 10,
    marginBottom: 40,
  },

  quoteContainer: {
    backgroundColor: Theme.colors.background,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 5,
    margin: 5,
  },
});
