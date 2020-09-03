import React from "react";
import {
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeTouchEvent,
  View,
  Text,
  StyleSheet,
  ButtonProps,
} from "react-native";
import { Theme } from "../../../theme";

interface Props extends Partial<ButtonProps> {
  text: string;
  onPress: (en: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

export const AppButton: React.FC<Props> = (props) => {
  return (
    <View>
      <TouchableOpacity {...props} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.text}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.colors.buttonPrimary,
    width: "60%",
    alignSelf: "center",
    height: 48,
  },

  text: {
    padding: 5,
    textAlign: "center",
    fontFamily: Theme.font.primary,
    fontStyle: "italic",
    fontSize: Theme.font.size + 6,
  },
});
