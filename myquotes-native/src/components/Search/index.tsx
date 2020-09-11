import React from "react";
import { StyleSheet, TextStyle, TextInputProps } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Theme } from "../../../theme";

interface Props extends TextInputProps {
  style?: TextStyle;
}

export const SearchInput: React.FC<Props> = (props) => {
  return (
    <TextInput
      {...props}
      style={{ ...styles.searchInput, ...props.style }}
      placeholder="Search..."
      selectionColor="green"
      placeholderTextColor="black"
    />
  );
};

const styles = StyleSheet.create({
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
