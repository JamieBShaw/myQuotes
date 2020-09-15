import React from "react";
import { StyleSheet, View } from "react-native";


interface Props {}

export const AuthorProfileImage: React.FC<Props> = () => {
  return <View style={styles.imageContainer}></View>;
};

// parent user overflow hidden to make sure child components stay within border circle
// see Styling IMages udemy react native

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
