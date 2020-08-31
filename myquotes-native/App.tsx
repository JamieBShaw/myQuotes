import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { LoginView } from './src/views/login';
import { View, Button, Text } from 'react-native';
import { styles } from './style';

const PublicIP = '192.168.0.189';
const Port = '8080';

const link = createHttpLink({
  uri: `http://${PublicIP}:${Port}/query`,
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

const App = () => {

  const [loginText, setText] = useState('Initial text')

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
      <LoginView />
      <Text>{loginText}</Text>
      <StatusBar style="auto" />
      <Button title="Login" onPress={() => setText("User logging in")} />
      </View>
    </ApolloProvider>
  );
};

export default App;
