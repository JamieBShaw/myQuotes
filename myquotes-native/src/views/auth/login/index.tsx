import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Keyboard,
  StatusBar,
  Dimensions,
  ImageBackground,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useLoginUserMutation, LoginInput } from "../../../generated/graphql";
import { ApolloError } from "@apollo/client";

import { AppButton } from "../../../components/AppButton";
import { AppTextInput } from "../../../components/AppTextInput";
import { styles } from "./styles";
import { setUserToken } from "../../../utils/token";
import { AuthContext } from "../../../state/context/auth";
import { ActionTypes } from "../../../state/actions/actions";
import { GraphQLError } from "graphql";
import { useNavigation } from "@react-navigation/native";

const initialState: LoginInput = {
  usernameOrEmail: "",
  password: "",
};
const loginErrInitialState = initialState;

const { height, width } = Dimensions.get("window");

const LoginView: React.FC = () => {
  const nav = useNavigation();
  const { dispatch } = useContext(AuthContext);
  const [inputs, setInputs] = useState(initialState);
  const [err, setErr] = useState(false);
  const [inputErrors, setInputErrors] = useState(loginErrInitialState);
  const [loginUserMutation] = useLoginUserMutation();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    Keyboard.dismiss();

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
              favouriteQuotes: user.favouriteQuotes!,
              favouriteAuthors: user.favouriteAuthors!,
            },
          });
          setUserToken(authToken.accessToken).then(() => nav.navigate("Home"));
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
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.imageContainer}>
          <ImageBackground
            style={{ height: height, width: width }}
            source={require("../../../../assets/images/bg.jpg")}
          />
        </View>
        <View style={{ paddingTop: 150 }}>
          <View style={styles.textInput}>
            <AppTextInput
              placeholder="Username or Email"
              name="usernameOrEmail"
              keyboardType="email-address"
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
        <View
          style={{
            height: "100%",
            paddingTop: 10,
          }}
        >
          <AppButton
            style={styles.button}
            textStyle={{ fontSize: 18 }}
            text="Login"
            onPress={handleSubmit}
          />
          <View>
            <Text style={styles.text}>
              Or if you don't have an account yet,{" "}
              <Text
                onPress={() => nav.navigate("Register")}
                style={styles.textSecondary}
              >
                register here.
              </Text>
            </Text>
          </View>
        </View>

        <StatusBar hidden />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default LoginView;
