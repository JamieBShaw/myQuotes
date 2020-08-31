import React from "react";
import {
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeTouchEvent,
  View,
  Text,
  StyleSheet,
} from "react-native";

interface Props {
  text: string;
  onPress: (en: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

export const AppButton = ({ text, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    borderColor: "black",
    borderWidth: 1,
  },

  text: {
    color: "white",
    fontWeight: "normal",
    fontSize: 18,
    textAlign: "center",
  },
});
