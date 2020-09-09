import React from "react";

import { View } from "react-native";
import { Header } from "../../components/Header";
import { QuoteList } from "../../components/QuoteList";
import { styles } from "./styles";
import { useGetQuotesQuery } from "../../generated/graphql";

const Home: React.FC = () => {
  const { data, loading, refetch } = useGetQuotesQuery({
    fetchPolicy: "no-cache",
  });

  return (
    <View style={styles.screen}>
      <Header title="Home Test" />
      <View style={styles.mainContainer}>
        <QuoteList
          loading={loading}
          quotesData={data?.quotes}
          refetch={refetch}
        />
      </View>
    </View>
  );
};

export default Home;
