import React from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Theme } from "../../../theme";

interface Props extends TextInputProps {
  value: string;
  name: string;
  onError?: boolean;
  errorMessage?: string;
  onCustomChange: ({ name, text }: { name: string; text: string }) => void;
}

export const AppTextInput: React.FC<Props> = (props) => {
  const { name, value, onCustomChange, onError, errorMessage } = props;

  let ErrorMessageReturn = null;

  if (onError) {
    ErrorMessageReturn = (
      <Text style={{ textAlign: "center", color: "red", fontSize: 14 }}>
        {errorMessage}
      </Text>
    );
  }
  return (
    <View>
      <TextInput
        style={onError ? styles.inputError : styles.input}
        {...props}
        value={value}
        onChangeText={(text) => onCustomChange({ name, text })}
      />
      {ErrorMessageReturn}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Theme.colors.background,
    borderColor: Theme.colors.border,
    borderBottomWidth: 1,
    width: "80%",
    height: 66,
    paddingLeft: 10,
    alignSelf: "center",
    textAlign: "left",
    fontFamily: Theme.font.primary,
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: Theme.font.size + 6,
    lineHeight: 33,
  },
  inputError: {
    borderColor: Theme.colors.error,
    color: Theme.colors.error,
    borderBottomWidth: 1,
    backgroundColor: Theme.colors.background,
    width: "80%",
    height: 66,
    paddingLeft: 10,
    alignSelf: "center",
    textAlign: "left",
    fontFamily: Theme.font.primary,
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: Theme.font.size + 6,
    lineHeight: 33,
  },
});
