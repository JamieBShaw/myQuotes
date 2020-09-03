import "react-native-gesture-handler";
import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import { client } from "./ApolloProvider";
import {
  useFonts,
  Philosopher_700Bold,
  Philosopher_400Regular,
  Philosopher_700Bold_Italic,
  Philosopher_400Regular_Italic,
} from "@expo-google-fonts/philosopher";
import MainStackNavigator from "./src/navigation/MainStackNavigator";
// @ts-ignore
// import getEnvVars from "./enviroment";

const App = () => {
  let [fontsLoaded] = useFonts({
    Philosopher_400Regular_Italic,
    Philosopher_400Regular,
    Philosopher_700Bold_Italic,
    Philosopher_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text> Loading fonts..... </Text>
      </View>
    );
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
