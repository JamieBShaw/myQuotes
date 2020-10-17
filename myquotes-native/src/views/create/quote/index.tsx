import React, { useContext } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./stlyes";
import {
  useGetQuotesQuery,
  //useCreateQuoteMutation,
  //QuoteCreateInput,
} from "../../../generated/graphql";
import { AuthContext } from "../../../state/context/auth";
import { QuoteList } from "../../../components/QuoteList";
import { QuoteListItemScaffold } from "../../../components/QuoteListItem/quoteListItemScaffold";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

// const initialState: QuoteCreateInput = {
// authorId: "",
// body: "",
// subject: "",
// dateOf: "",
// };

const CreateQuoteView = () => {
  const { user } = useContext(AuthContext);

  // const [inputs, setInputs] = useState<QuoteCreateInput>(initialState);

  const { data, loading, error } = useGetQuotesQuery({
    variables: {
      input: {
        creatorId: user.id,
      },
    },
  });

  //const [createQuote] = useCreateQuoteMutation({
  //onCompleted: () => console.log("Quote Created"),
  //});

  if (error) {
    console.log("Error: ", error.message);
  }

  //const handleInputs = (event: { name: string; text: string }): void => {
  //const { name, text } = event;
  //setInputs({ ...inputs, [name]: text });
  //};

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback onPress={() => console.log("Dismiss keyboard")}>
        <View style={styles.outerContainer}>
          {/* <Header title="Create..." signOut /> */}
          <View style={styles.inputs}>
            <QuoteListItemScaffold />
            {/* <AppTextInput
            placeholder="Author "
            name="authorId"
            onCustomChange={handleInputs}
            value={inputs.authorId}
          />
          <AppTextInput
            multiline
            placeholder="Write your quote here..."
            name="body"
            onCustomChange={handleInputs}
            value={inputs.body}
          /> */}
          </View>
          <View style={styles.innerContainer}>
            <QuoteList
              quotesData={user ? data?.quotes : undefined}
              loading={loading}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default CreateQuoteView;
