import React from "react";
import {
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeTouchEvent,
  View,
  Text,
  ButtonProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Theme } from "../../../theme";

type BProps = Partial<ButtonProps>;
type NamedStyles = ViewStyle | TextStyle;

interface Props extends BProps {
  text?: any;
  onPress?: (en: NativeSyntheticEvent<NativeTouchEvent>) => void;
  style?: NamedStyles;
  textStyle?: NamedStyles;
}

export const AppButton: React.FC<Props> = (props) => {
  return (
    <View>
      <TouchableOpacity
        style={{ ...props.style }}
        {...props}
        onPress={props.onPress}
      >
        <View>
          <Text
            style={{
              fontFamily: Theme.font.primary,
              fontWeight: "bold",
              fontStyle: "italic",
              ...props.textStyle,
            }}
          >
            {props.text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
