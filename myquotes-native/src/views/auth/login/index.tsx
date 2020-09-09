import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import { useLoginUserMutation, LoginInput } from "../../../generated/graphql";
import { AppButton } from "../../../components/AppButton";
import { AppTextInput } from "../../../components/AppTextInput";
import { styles } from "./styles";
import { GraphQLError } from "graphql";
import { ApolloError } from "@apollo/client";
import { setUserToken } from "../../../utils/auth/Auth";
import { AuthContext } from "../../../context/auth";
import { Theme } from "../../../../theme";
import { ActionTypes } from "../../../context/actions";

const initialState: LoginInput = {
  usernameOrEmail: "",
  password: "",
};

const loginErrInitialState = initialState;

const LoginView: React.FC = ({ navigation }: any) => {
  const { dispatch } = useContext(AuthContext);
  const [inputs, setInputs] = useState(initialState);
  const [err, setErr] = useState(false);
  const [inputErrors, setInputErrors] = useState(loginErrInitialState);
  const [loginUserMutation] = useLoginUserMutation();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loginUserMutation({
      variables: {
        input: {
          usernameOrEmail: inputs.usernameOrEmail,
          password: inputs.password,
        },
      },
    })
      .then(({ data }) => {
        if (data) {
          const {
            loginUser: { user, authToken },
          } = data;

          dispatch({
            type: ActionTypes.loginUser,
            payload: {
              email: user.email,
              id: user.id,
              isLoggedIn: true,
              username: user.username,
              favouriteQuotes: user.favouriteQuotes,
              favouriteAuthors: user.favouriteAuthors,
            },
          });

          setUserToken(authToken.accessToken).then(() =>
            navigation.navigate("Home")
          );
        }
      })
      .catch((e: ApolloError) => {
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
          <AppButton
            style={styles.button}
            fontSize={Theme.font.size + 6}
            text="Login"
            onPress={handleSubmit}
          />
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
