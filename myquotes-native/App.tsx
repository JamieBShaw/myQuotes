import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { View } from "react-native";
import { styles } from "./style";
import LoginView from "./src/views/login";

const PublicIP = "192.168.0.189";
const Port = "8080";

const link = createHttpLink({
  uri: `http://${PublicIP}:${Port}/query`,
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <LoginView />
      </View>
    </ApolloProvider>
  );
};

export default App;
