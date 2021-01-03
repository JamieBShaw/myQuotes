import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import {
  QuoteCreateInput,
  useGetAuthorsQuery,
  useGetAuthorsLazyQuery,
} from "../../generated/graphql";
import { Theme } from "../../../theme";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { AppTextInput } from "../AppTextInput";
import { AuthContext } from "../../state/context/auth";
import { SafeAreaView } from "react-native-safe-area-context";

interface initState extends QuoteCreateInput {
  authorName: string;
}

const initialState: initState = {
  authorName: "",
  authorId: "",
  body: "",
  subject: "",
  dateOf: "",
};

export const QuoteListItemScaffold: React.FC = () => {
  const { user } = useContext(AuthContext);

  const [quoteInputs, setQuoteInputs] = useState<initState>(initialState);
  const [isInput, setIsInput] = useState(false);

  const [getAuthor, { loading, error }] = useGetAuthorsLazyQuery({
    variables: {
      input: {
        creatorId: user.id,
        name: quoteInputs.authorName,
      },
    },
  });

  const handleQuoteInputs = (event: { name: string; text: string }): void => {
    const { name, text } = event;
    setQuoteInputs({ ...quoteInputs, [name]: text });
  };

  return (
    <SafeAreaView>
      <View style={styles.inputContainer}>
        <AppTextInput
          style={styles.quoteInput}
          placeholder="Begin typing quote..."
          multiline
          name="body"
          value={quoteInputs.body}
          onCustomChange={handleQuoteInputs}
        />
        <AppTextInput
          styles={styles.authorNameInput}
          placeholder="Begin typing author name..."
          name="authorName"
          value={quoteInputs.authorName}
          onCustomChange={handleQuoteInputs}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.body}>
          {quoteInputs.body ? `'${quoteInputs.body}'` : ""}
        </Text>
        <View style={styles.secondaryContainer}>
          <Text style={styles.author}>
            <Text style={{ fontWeight: "bold" }}>
              {quoteInputs.authorName ? quoteInputs.authorName : ""}
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
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

  inputContainer: {
    padding: 5,
  },

  quoteInput: {
    fontSize: 16,
    fontFamily: Theme.font.primary,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 5,
    height: 75,
  },

  authorNameInput: {
    fontSize: 16,
    fontFamily: Theme.font.primary,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 5,
    width: "100%",
  },

  // primaryButton: {
  //   marginTop: 10,
  //   backgroundColor: Theme.colors.background,
  //   color: "black",
  // },
  // secondaryButton: {
  //   marginTop: 10,
  //   color: "green",
  // },

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
