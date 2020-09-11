import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  Keyboard,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import Animated from "react-native-reanimated";
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

const initialState: LoginInput = {
  usernameOrEmail: "",
  password: "",
};
const loginErrInitialState = initialState;

const { height, width } = Dimensions.get("window");

const { Value, interpolate, Extrapolate } = Animated;

const LoginView: React.FC = ({ navigation }: any) => {
  const { dispatch } = useContext(AuthContext);
  const [inputs, setInputs] = useState(initialState);
  const [err, setErr] = useState(false);
  const [inputErrors, setInputErrors] = useState(loginErrInitialState);
  const [loginUserMutation] = useLoginUserMutation();

  const buttonOpacity = useRef(new Value(1));
  const buttonY = useRef(
    interpolate(buttonOpacity.current, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    })
  );
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
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={{ height: height, width: width }}
            source={require("../../../../assets/images/bg.jpg")}
          />
        </View>
        <View style={{ paddingTop: 150 }}>
          <View style={styles.textInput}>
            <AppTextInput
              placeholder="Username or Email"
              name="usernameOrEmail"
              blurOnSubmit
              keyboardType="email-address"
              onError={err}
              value={inputs.usernameOrEmail}
              onCustomChange={handleInputs}
            />
          </View>
          <View style={styles.textInput}>
            <AppTextInput
              secureTextEntry
              blurOnSubmit
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
          <Animated.View
            style={{
              ...styles.textContainer,
              opacity: buttonOpacity.current,
              translateY: buttonY.current,
            }}
          >
            <Text style={styles.text}>
              Or if you don't have an account yet,{" "}
              <Text
                onPress={() => navigation.navigate("Register")}
                style={styles.textSecondary}
              >
                register here.
              </Text>
            </Text>
          </Animated.View>
        </View>

        <StatusBar hidden />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default LoginView;
