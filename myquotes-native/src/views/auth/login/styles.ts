import { StyleSheet } from "react-native";
import { Theme } from "../../../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    opacity: 0.95,
  },
  imageContainer: {
    flex: 1,
  },
  textInput: {
    flexDirection: "column",
    padding: 20,
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
  button: {
    backgroundColor: Theme.colors.background,
    alignSelf: "center",
    width: "69%",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 25,
  },
  text: {
    alignSelf: "center",
    margin: 10,
    textAlign: "center",
    fontSize: Theme.font.size + 10,
    fontFamily: Theme.font.primary,
    color: "white",
  },
  textSecondary: {
    fontStyle: "italic",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
