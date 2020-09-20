import React, { useContext } from "react";
import { View } from "react-native";
import { Header } from "../../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./stlyes";
import { useGetQuotesQuery } from "../../../generated/graphql";
import { AuthContext } from "../../../state/context/auth";
import { QuoteList } from "../../../components/QuoteList";

const CreateQuoteView = () => {
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useGetQuotesQuery({
    variables: {
      input: {
        creatorId: user.id,
      },
    },
  });

  if (error) {
    console.log("Error: ", error.message);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.outerContainer}>
        <Header title="Create..." signOut />
        <View style={styles.innerContainer}>
          <QuoteList
            quotesData={user ? data?.quotes : undefined}
            loading={loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateQuoteView;
