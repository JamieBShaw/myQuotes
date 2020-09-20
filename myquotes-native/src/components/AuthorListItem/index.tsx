import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthorData } from "../../utils/interfaces";
import { AuthContext } from "../../state/context/auth";
import { Theme } from "../../../theme";
import { AuthorProfileImage } from "../AuthorProfilePicture";

interface Props {
  item: AuthorData;
  addAuthorToFav: (id: string) => void;
  removeAuthorFromFav: (id: string) => void;
}

export const AuthorItem: React.FC<Props> = ({
  item,
  addAuthorToFav,
  removeAuthorFromFav,
}) => {
  const { user } = useContext(AuthContext);

  if (!item) {
    return null;
  }

  const handleShowQuotes = (authorId: string) => {
    console.log("author ID: ", authorId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.secondaryContainer}>
        <AuthorProfileImage />
        <Text>
          {item.id} | {item.name} | {item.DOB}
        </Text>
        <View>
          <MaterialIcons
            name="arrow-drop-down"
            size={24}
            color="black"
            onPress={() => handleShowQuotes(item.id)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
    padding: 5,
    elevation: 2, // android
    shadowColor: "black", // ios
    shadowOffset: { width: 0, height: 1 }, // ios
    shadowRadius: 4, // ios
    shadowOpacity: 0.25, // ios
    margin: 5,
    borderRadius: 10,
  },

  primaryButton: {
    marginTop: 10,
    backgroundColor: Theme.colors.background,
    color: "black",
  },
  secondaryButton: {
    marginTop: 10,
    color: "green",
  },

  secondaryContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  body: {
    fontFamily: Theme.font.primary,
    fontSize: Theme.font.size - 2,
    fontStyle: "italic",
  },
  author: {
    paddingTop: 12,
    fontFamily: Theme.font.primary,
  },
});
