import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  value: string;
  name: string;
  type: string;
  onCustomChange: ({ name, text }: { name: string; text: string }) => void;
}

export const AppTextInput: React.FC<Props> = ({
  value,
  name,
  type,
  onCustomChange,
}) => {
  return (
    <TextInput
      placeholder={type === "password" ? "Email or Username" : "Password"}
      autoCompleteType={type === "password" ? "password" : "email"}
      value={value}
      secureTextEntry
      onChangeText={(text) => onCustomChange({ name, text })}
    />
  );
};
