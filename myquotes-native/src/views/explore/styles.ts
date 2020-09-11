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
    padding: 16,
    borderColor: "black",
    borderWidth: 1,
  },
  searchContainer: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
