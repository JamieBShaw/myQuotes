import React from "react";

import { View, Keyboard } from "react-native";
import { Header } from "../../components/Header";
import { QuoteList } from "../../components/QuoteList";
import { styles } from "./styles";
import { useGetQuotesQuery } from "../../generated/graphql";
import { SearchInput } from "../../components/Search";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Home: React.FC = () => {
  const { data, loading, refetch } = useGetQuotesQuery({
    fetchPolicy: "no-cache",
  });

  return (
    <View style={styles.screen}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            <Header title="Explore" />
            <View style={styles.searchContainer}>
              <SearchInput />
            </View>
            <QuoteList
              loading={loading}
              quotesData={data?.quotes}
              handleRefetch={refetch}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Home;
