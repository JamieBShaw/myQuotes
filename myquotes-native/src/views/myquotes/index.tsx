import React, { useContext } from "react";
import { View } from "react-native";
import { Header } from "../../components/Header/";
import { AuthContext } from "../../state/context/auth";
import { styles } from "./styles";
import { QuoteList } from "../../components/QuoteList";
import { SafeAreaView } from "react-native-safe-area-context";

const MyQuotes: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.outerContainer}>
        <Header title="My Quotes" signOut />
        <View style={styles.innerContainer}>
          <QuoteList quotesData={user ? user.favouriteQuotes : undefined} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyQuotes;
