import React from "react";

import { Text, View } from "react-native";
import { Header } from "../../components/Header";
import { styles } from "./styles";
import { useGetQuotesQuery } from "../../generated/graphql";

const Home: React.FC = () => {
  const { data, loading, error } = useGetQuotesQuery();

  if (loading) {
    console.log("Loading");
  }

  if (error) {
    console.log("ERROR:  ", error.message);
  }

  if (data) {
    console.log("DATA:  ", data.quotes);
  }
  return (
    <View style={styles.screen}>
      <Header title="Home" />
      <View style={styles.mainContainer}>
        <Text> Is where the heart is </Text>
      </View>
    </View>
  );
};

export default Home;
