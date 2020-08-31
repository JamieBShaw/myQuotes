import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { useLoginUserMutation } from "../../generated/graphql";
import { AppButton } from "../../components/AppButton";
import { styles } from "./styles";
import { AppTextInput } from "../../components/AppTextInput";

const initialState = {
  usernameOrEmail: "",
  password: "",
};

const LoginView: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");

  const [input, setInput] = useState(initialState);

  const [loginUserMutation, { data, loading, error }] = useLoginUserMutation();

  if (loading) {
    console.log("loading....");
  }

  if (error) {
    console.log("Error");
  }

  if (data) {
    console.log(data);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitting....");

    loginUserMutation({
      variables: {
        input: {
          usernameOrEmail: usernameOrEmail,
          password: password,
        },
      },
    });
  };

  const handleUsernameOrEmailInput = (entertedText: string) => {
    setUsernameOrEmail(entertedText);
  };
  //const handlePasswordInput = (entertedText: string) => {
  //setPassword(entertedText);
  //};

  const handleInput = (event: { name: string; text: string }) => {
    const { name, text } = event;
    setInput({ ...input, [name]: text });
  };

  return (
    <View>
      <View style={{ paddingBottom: 5 }}>
        <TextInput
          autoFocus
          autoCompleteType="email"
          value={usernameOrEmail}
          placeholder="Username or Email..."
          style={styles.input}
          onChangeText={handleUsernameOrEmailInput}
        />
      </View>
      <View>
        <AppTextInput
          type="passowrd"
          name="password"
          style={styles.input}
          value={input.password}
          onCustomChange={handleInput}
        />
      </View>
      <View style={{ paddingTop: 10 }}>
        <AppButton text="Login" onPress={handleSubmit} />
        <AppButton
          text={"App Button"}
          onPress={() => console.log("actually worked lul")}
        />
      </View>
    </View>
  );
};

export default LoginView;
