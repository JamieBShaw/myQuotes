import React, { useState, useContext } from "react";
import { View } from "react-native";
import { AppButton } from "../../../components/AppButton";
import {
  useRegisterUserMutation,
  RegisterInput,
} from "../../../generated/graphql";
import { AppTextInput } from "../../../components/AppTextInput";
import { styles } from "../login/styles";
import { GraphQLError } from "graphql";
import { ApolloError } from "@apollo/client";
import { AuthContext } from "../../../context/auth";
import { ActionTypes } from "../../../context/actions";
import { setUserToken } from "../../../utils/auth/Auth";

const initialState: RegisterInput = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const registerErrInitialState = initialState;

const RegisterView: React.FC = ({ navigation }: any) => {
  const { dispatch } = useContext(AuthContext);
  const [input, setInputs] = useState(initialState);
  const [inputErrors, setInputErrors] = useState(registerErrInitialState);
  const [err, setErr] = useState(false);

  const [registerUserMutation] = useRegisterUserMutation();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("sending");
    registerUserMutation({
      variables: {
        input: {
          username: input.username,
          email: input.email,
          password: input.password,
          confirmPassword: input.confirmPassword,
        },
      },
    })
      .then(({ data }) => {
        if (data) {
          const {
            registerUser: { authToken, user },
          } = data;

          dispatch({
            type: ActionTypes.registerUser,
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
            const field: keyof RegisterInput = e.extensions!.field;
            const errorMessage: string = e.message;
            setInputErrors({ ...inputErrors, [field]: errorMessage });
          }
        });
        setErr(true);
        setInputs(initialState);
      });
  };

  const handleInput = (event: { name: string; text: string }): void => {
    setErr(false);
    const { name, text } = event;
    setInputs({ ...input, [name]: text });
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 100 }}>
        <View style={styles.textInput}>
          <AppTextInput
            value={input.email}
            name="email"
            onError={err}
            errorMessage={inputErrors ? inputErrors["email"] : ""}
            placeholder="Email..."
            onCustomChange={handleInput}
          />
        </View>
        <View style={{ paddingBottom: 5 }}>
          <View style={styles.textInput}>
            <AppTextInput
              value={input.username}
              name="username"
              placeholder="Username..."
              onError={err}
              errorMessage={inputErrors ? inputErrors["username"] : ""}
              onCustomChange={handleInput}
            />
          </View>
        </View>
        <View style={{ paddingBottom: 5 }}>
          <View style={styles.textInput}>
            <AppTextInput
              secureTextEntry
              name="password"
              value={input.password}
              onError={err}
              errorMessage={inputErrors ? inputErrors["password"] : ""}
              onCustomChange={handleInput}
              placeholder="Passowrd..."
            />
          </View>
        </View>
        <View>
          <View style={styles.textInput}>
            <AppTextInput
              secureTextEntry
              name="confirmPassword"
              value={input.confirmPassword}
              onError={err}
              errorMessage={inputErrors ? inputErrors["confirmPassword"] : ""}
              placeholder="Confirm your password"
              onCustomChange={handleInput}
            />
          </View>
        </View>
        <View style={{ paddingTop: 25 }}>
          <AppButton text="Sign me up" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
};

export default RegisterView;
