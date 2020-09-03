import { StyleSheet } from "react-native";
import { Theme } from "../../../../theme";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  textInput: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    margin: 0,
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
  text: {
    alignSelf: "center",
    margin: 10,
    textAlign: "center",
    fontSize: Theme.font.size + 6,
    fontFamily: Theme.font.primary,
    fontStyle: "normal",
    fontWeight: "normal",
  },
  textSecondary: {
    fontStyle: "italic",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
