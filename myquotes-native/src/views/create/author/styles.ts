import { StyleSheet } from "react-native";
import { Theme } from "../../../../theme";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  outerContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: Theme.colors.background,
  },
  innerContainer: {
    padding: 10,
    marginBottom: 30,
    textAlign: "center",
    justifyContent: "center",
  },
  quoteContainer: {
    backgroundColor: Theme.colors.background,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 5,
    margin: 5,
  },

  input: {
    paddingTop: 5,
    paddingBottom: 5,
  },
});
