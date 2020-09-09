import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Header } from "../../components/Header/index";
import { AuthContext } from "../../context/auth";
import { styles } from "./styles";

const MyQuotes: React.FC = () => {
  const { state } = useContext(AuthContext);

  return (
    <View style={styles.screen}>
      <Header title="My Quotes" />
      <View style={styles.mainContainer}>
        <View style={{ backgroundColor: "red" }}>
          {state.favouriteQuotes?.map((quote) => {
            return (
              <View key={quote?.id}>
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
