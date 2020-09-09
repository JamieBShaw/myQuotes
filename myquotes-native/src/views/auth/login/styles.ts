import { StyleSheet } from "react-native";
import { Theme } from "../../../../theme";

export const styles = StyleSheet.create({
  container: {
    margin: 10,
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
  button: {
    backgroundColor: Theme.colors.buttonPrimary,
    width: "60%",
    alignSelf: "center",
    height: 48,
    padding: 5,
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

export const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: Theme.colors.buttonPrimary,
    width: "60%",
    alignSelf: "center",
    height: 48,
    padding: 5,
    textAlign: "center",
    fontFamily: Theme.font.primary,
    fontStyle: "italic",
    fontSize: Theme.font.size + 6,
  },
});
