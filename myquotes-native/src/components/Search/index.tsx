import React from "react";
import {
  StyleSheet,
  TextStyle,
  TextInputProps,
  Text,
  View,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { Theme } from "../../../theme";
import { AppButton } from "../AppButton";
import { Maybe } from "graphql/jsutils/Maybe";

interface Props extends TextInputProps {
  style?: TextStyle;
  searchBy?: string | null;
  values: Maybe<string> | null;
  name: string;
  onPress?: ((en: NativeSyntheticEvent<NativeTouchEvent>) => void) | undefined;
  onCustomChange: ({ name, text }: { name: string; text: string }) => void;
}

export const SearchInput: React.FC<Props> = (
  { style, searchBy, onCustomChange, name, values, onPress },
  props
) => {
  let SearchText;
  if (searchBy) {
    SearchText = <Text style={styles.textDisplay}>{searchBy}: </Text>;
  }

  return (
    <View style={styles.searchContainer}>
      {SearchText}
      <TextInput
        {...props}
        style={{ ...styles.searchInput, ...style }}
        placeholder="Search..."
        placeholderTextColor="black"
        value={values}
        onChangeText={(text) => onCustomChange({ name, text })}
      />
      <View style={styles.button}>
        <AppButton
          onPress={onPress}
          text={<MaterialIcons name="search" size={30} color="white" />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    flex: 1,
    padding: 5,
  },
  textDisplay: {
    fontFamily: Theme.font.primary,
    fontSize: Theme.font.size,
    paddingTop: 18,
    paddingRight: 5,
  },
  searchInput: {
    height: 50,
    width: "70%",
    backgroundColor: Theme.colors.backgroundSecondary,
    paddingHorizontal: 15,
    marginTop: 5,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    fontSize: Theme.font.size,
    fontFamily: Theme.font.primary,
    color: Theme.colors.textPrimary,
    zIndex: 1,
  },
  button: {
    backgroundColor: "black",
    height: 50,
    marginTop: 5,
    flexDirection: "row",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    width: 50,
  },
});
