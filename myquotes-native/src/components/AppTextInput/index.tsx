import React from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  Text,
  View,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Theme } from "../../../theme";

type NamedStyles = ViewStyle | TextStyle;
interface Props extends TextInputProps {
  value: string;
  name: string;
  onError?: boolean;
  styles?: NamedStyles;
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
        style={
          onError ? styles.inputError : { ...styles.input, ...props.styles }
        }
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
    borderRadius: 20,
    width: "80%",
    height: 66,
    paddingLeft: 15,
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
    borderWidth: 1,
    backgroundColor: Theme.colors.background,
    width: "80%",
    height: 66,
    paddingLeft: 15,
    alignSelf: "center",
    textAlign: "left",
    fontFamily: Theme.font.primary,
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: Theme.font.size + 6,
    lineHeight: 33,
  },
});
