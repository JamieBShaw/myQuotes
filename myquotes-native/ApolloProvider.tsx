import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import AsyncStorage from "@react-native-community/async-storage";
import { ACCESS_TOKEN } from "./src/utils/token";

const Port = "8080";
const Uri = "192.168.0.189";

const httpLink = createHttpLink({
  uri: `http://${Uri}:${Port}/query`,
});

interface headerProps {
  headers: {
    Authorization: string;
  };
}

const authLink = setContext(async (_, { headers }: headerProps) => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
