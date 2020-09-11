import { StyleSheet } from "react-native";
import { Theme } from "../../../../theme";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },

  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    flex: 1,
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
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    padding: 5,
    borderRadius: 20,
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
