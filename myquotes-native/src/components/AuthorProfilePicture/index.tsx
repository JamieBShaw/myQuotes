import React from "react";
import { StyleSheet, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

interface Props {}

export const AuthorProfileImage: React.FC<Props> = () => {
  return (
    <View style={styles.imageContainer}>
      <MaterialIcons name="person-outline" size={23} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: 27,
    height: 27,
    borderRadius: 13.5,
    borderWidth: 2,
  },
});
