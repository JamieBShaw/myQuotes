import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Theme } from "../../../theme";
import { AppButton } from "../AppButton";
import { useNavigation } from "@react-navigation/native";
import { removeUserToken } from "../../utils/token";

interface Props {
  title?: string;
  signOut?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Header: React.FC<Props> = ({ title, signOut = false, style }) => {
  const nav = useNavigation();

  const signOutUser = () => {
    removeUserToken();
    nav.navigate("Login");
  };

  let SignOutButton = null;
  if (signOut) {
    SignOutButton = (
      <View>
        <AppButton
          onPress={signOutUser}
          text={<FontAwesome name="sign-out" size={24} color="black" on />}
        ></AppButton>
      </View>
    );
  }
  return (
    <View {...style} style={styles.header}>
      {/* <Text style={styles.headerTitle}>{title}</Text> */}
      <View style={styles.imageContainer}>
        <Image source={require("../../../assets/images/favicon.png")} />
      </View>
      {SignOutButton}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 10,
    flexDirection: "row",
    padding: 10,
    height: Dimensions.get("window").height / 12,
    backgroundColor: Theme.colors.background,
    borderBottomColor: Theme.colors.border,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerTitle: {
    color: "black",
    fontSize: Theme.font.size + 4,
    fontFamily: Theme.font.primary,
    fontWeight: "bold",
  },
  imageContainer: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Dimensions.get("window").width / 3,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
