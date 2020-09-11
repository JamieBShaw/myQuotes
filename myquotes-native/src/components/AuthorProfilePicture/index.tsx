import React from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "../../../theme";

interface Props {}

export const AuthorProfileImage: React.FC<Props> = (props) => {
  return <View></View>;
};

// parent user overflow hidden to make sure child components stay within border circle
// see Styling IMages udemy react natvive

const styles = StyleSheet.create({
  imageContainer: {
    overflow: "hidden",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
  },
  image: {},
});
