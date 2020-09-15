import "react-native-gesture-handler";
import React, { useState } from "react";
import { Image } from "react-native";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import {
  useFonts,
  Philosopher_700Bold,
  Philosopher_400Regular,
  Philosopher_700Bold_Italic,
  Philosopher_400Regular_Italic,
} from "@expo-google-fonts/philosopher";

import MainStackNavigator from "./src/navigation/MainStackNavigator";
import { client } from "./ApolloProvider";
import { AuthContextProvider } from "./src/state/context/auth";

enableScreens();

const App = () => {
  const [ready, setReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Philosopher_400Regular_Italic,
    Philosopher_400Regular,
    Philosopher_700Bold_Italic,
    Philosopher_700Bold,
  });

  function cacheImages(images: any) {
    return images.map((image: any) => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([require("./assets/images/bg.jpg")]);
    await Promise.all([...imageAssets]);
  };

  if (!fontsLoaded || !ready) {
    return (
      <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </AuthContextProvider>
    </ApolloProvider>
  );
};

export default App;
