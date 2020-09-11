import { StyleSheet } from "react-native";
import { Theme } from "../../../theme";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  outerContainer: {
    width: "100%",
    backgroundColor: Theme.colors.background,
    //  padding: 10,
    //     borderColor: "black",
    //     borderWidth: 1
  },
  innerContainer: {
    padding: 10,
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
