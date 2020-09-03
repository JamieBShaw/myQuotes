import React, { useState } from "react";
import { AsyncStorage, View, Text } from "react-native";
import { useLoginUserMutation, LoginInput } from "../../../generated/graphql";
import { AppButton } from "../../../components/AppButton";
import { AppTextInput } from "../../../components/AppTextInput";
import { styles } from "./styles";
import { GraphQLError } from "graphql";
import { ApolloError } from "@apollo/client";

const initialState: LoginInput = {
  usernameOrEmail: "",
  password: "",
};

const loginErrInitialState = initialState;

const LoginView: React.FC = ({ navigation }: any) => {
  const [inputs, setInputs] = useState(initialState);
  const [err, setErr] = useState(false);
  const [inputErrors, setInputErrors] = useState(loginErrInitialState);
  const [loginUserMutation, { data }] = useLoginUserMutation();

  if (data) {
    async () => {
      try {
        await AsyncStorage.setItem(
          "token",
          data.loginUser.authToken.accessToken
        );
      } catch (error) {
        console.log(error);
      }
    };
    navigation.navigate("Home");
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("sending.........");
    loginUserMutation({
      variables: {
        input: {
          usernameOrEmail: inputs.usernameOrEmail,
          password: inputs.password,
        },
      },
    }).catch((e: ApolloError) => {
      e.graphQLErrors.map((e: GraphQLError) => {
        if (e.extensions?.field) {
          const field: keyof LoginInput = e.extensions!.field;
          const errorMessage: string = e.message;
          setInputErrors({ ...inputErrors, [field]: errorMessage });
        }
      });
      setErr(true);
      setInputs(initialState);
    });
  };

  const handleInputs = (event: { name: string; text: string }): void => {
    setErr(false);
    const { name, text } = event;
    setInputs({ ...inputs, [name]: text });
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 100 }}>
        <View style={styles.textInput}>
          <AppTextInput
            placeholder="Username or Email"
            name="usernameOrEmail"
            onError={err}
            value={inputs.usernameOrEmail}
            onCustomChange={handleInputs}
          />
        </View>
        <View style={styles.textInput}>
          <AppTextInput
            secureTextEntry
            onError={err}
            errorMessage={
              inputErrors
                ? inputErrors["password"] || inputErrors["usernameOrEmail"]
                : ""
            }
            placeholder="Password"
            name="password"
            value={inputs.password}
            onCustomChange={handleInputs}
          />
        </View>
      </View>
      <View>
        <View style={{ padding: 25 }}>
          <AppButton text="Login" onPress={handleSubmit} />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Or if you don't have an account yet,{" "}
          <Text
            onPress={() => navigation.navigate("Register")}
            style={styles.textSecondary}
          >
            register here.
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginView;
