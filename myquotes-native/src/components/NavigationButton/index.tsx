import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  iconType: string;
  size: number;
  color: string;
  navigateTo: string;
  navigation: any;
}

export const NavigatioButton: React.FC<Props> = ({
  navigation,
  navigateTo,
  iconType,
  size,
  color,
}) => {
  const handlePress = () => {
    navigation.navigate(navigateTo);
  };

  return (
    <MaterialIcons
      onPress={handlePress}
      name={iconType}
      size={size}
      color={color}
    />
  );
};
