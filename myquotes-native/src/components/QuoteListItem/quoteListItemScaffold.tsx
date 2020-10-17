import React, { useState } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { QuoteCreateInput } from "../../generated/graphql";
import { Theme } from "../../../theme";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { AppTextInput } from "../AppTextInput";

// interface Props {
//   item: QuoteCreateInput;
// }

const initialState: QuoteCreateInput = {
  authorId: "",
  body: "",
  subject: "",
  dateOf: "",
};

export const QuoteListItemScaffold: React.FC = () => {
  const [quoteInputs, setQuoteInputs] = useState<QuoteCreateInput>(
    initialState
  );
  const [isInput, setIsInput] = useState(false);

  const handleQuoteInputs = (event: { name: string; text: string }): void => {
    const { name, text } = event;
    setQuoteInputs({ ...quoteInputs, [name]: text });
  };

  const handleSwitchInput = () => {
    setIsInput(!isInput);
  };

  let QuoteInput = (
    <Text style={styles.body}>
      '
      {quoteInputs.body
        ? quoteInputs.body
        : "Tap here to begin entering your new quote"}
      '
    </Text>
  );

  // let AuthorInput = (
  //   <Text style={styles.body}>
  //     '{quoteInputs.body ? quoteInputs.body : "Enter Author name here..."}'
  //   </Text>
  // );

  if (isInput) {
    QuoteInput = (
      <AppTextInput
        style={{
          fontSize: 16,
          fontFamily: Theme.font.primary,
          borderColor: "grey",
          borderWidth: 1,
          borderRadius: 10,
          paddingLeft: 5,
          height: 40,
        }}
        placeholder="Begin typing quote..."
        multiline
        name="body"
        value={quoteInputs.body}
        onCustomChange={handleQuoteInputs}
      />
    );

    // AuthorInput = (
    //   <AppTextInput
    //     style={{ fontSize: 16, fontFamily: Theme.font.primary }}
    //     placeholder="Begin typing author name..."
    //     multiline
    //     name="body"
    //     value={quoteInputs.body}
    //     onCustomChange={handleQuoteInputs}
    //   />
    // );
  }

  const handleKeyboardDismis = () => {
    Keyboard.dismiss();
    handleSwitchInput();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDismis}>
      <View style={styles.container}>
        <View>{QuoteInput}</View>
        <View style={styles.secondaryContainer}>
          <Text style={styles.author}>{/* <View>{AuthorInput}</View> */}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export const styles = StyleSheet.create({
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
    height: 100,
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
