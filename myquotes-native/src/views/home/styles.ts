import { StyleSheet } from "react-native";
import { Theme } from "../../../theme";

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
  },
  searchContainer: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 5,
    padding: 5,
  },
  searchInput: {
    height: 45,
    flex: 1,
    backgroundColor: Theme.colors.backgroundSecondary,
    paddingHorizontal: 15,
    marginTop: 5,
    borderRadius: 10,
    fontSize: Theme.font.size,
    fontFamily: Theme.font.primary,
    color: Theme.colors.textPrimary,
  },
});
