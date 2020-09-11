import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../../../theme";

interface Props {
  title: string;
}

export const Header: React.FC<Props> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 10,
    padding: 10,
    backgroundColor: Theme.colors.background,
    borderBottomColor: Theme.colors.border,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "black",
    fontSize: Theme.font.size + 4,
    fontFamily: Theme.font.primary,
    fontWeight: "bold",
  },
});
