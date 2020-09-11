import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Header } from "../../components/Header/";
import { AuthContext } from "../../state/context/auth";
import { styles } from "./styles";

const MyQuotes: React.FC = () => {
  const { state } = useContext(AuthContext);

  return (
    <View style={styles.screen}>
      <View style={styles.mainContainer}>
        <Header title="My Quotes" />
        <View style={{ backgroundColor: "red" }}>
          {state.favouriteQuotes?.map((quote) => {
            return (
              <View style={styles.quoteContainer} key={quote?.id}>
                <Text>{quote?.body}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default MyQuotes;
