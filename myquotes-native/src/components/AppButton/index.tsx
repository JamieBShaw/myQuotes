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
  ImageStyle,
} from "react-native";
import { Theme } from "../../../theme";

type BProps = Partial<ButtonProps>;
type NamedStyles = ViewStyle | TextStyle | ImageStyle;

interface Props extends BProps {
  text: string;
  onPress: (en: NativeSyntheticEvent<NativeTouchEvent>) => void;
  style?: NamedStyles;
  fontSize?: number;
}

export const AppButton: React.FC<Props> = (props) => {
  const { style } = props;

  return (
    <View>
      <TouchableOpacity style={style} {...props} onPress={props.onPress}>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontFamily: Theme.font.primary,
              fontStyle: "italic",
              fontSize: props.fontSize,
            }}
          >
            {props.text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
