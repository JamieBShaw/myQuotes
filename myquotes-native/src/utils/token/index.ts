import AsyncStorage from "@react-native-community/async-storage";

export const ACCESS_TOKEN = "access_token";

export const setUserToken = (newToken: string) => {
  return AsyncStorage.setItem(ACCESS_TOKEN, newToken);
};

export const removeUserToken = () => {
  return AsyncStorage.removeItem(ACCESS_TOKEN);
};

export const checkTokenExistsOnStartUp = async (initialRoute: string) => {
  try {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      return;
    }
    initialRoute = "Home";
  } catch (e) {
    console.warn("Token, warn", e);
  }
};
