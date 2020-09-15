import React, { useContext } from "react";
import { View } from "react-native";
import { Header } from "../../components/Header/";
import { AuthContext } from "../../state/context/auth";
import { styles } from "./styles";
import { QuoteList } from "../../components/QuoteList";

const MyQuotes: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.screen}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Header title="My Quotes" signOut />
          <QuoteList quotesData={user ? user.favouriteQuotes : undefined} />
        </View>
      </View>
    </View>
  );
};

export default MyQuotes;
