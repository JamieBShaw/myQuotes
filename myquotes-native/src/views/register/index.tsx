import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { AppButton } from "../../components/AppButton";
import { useRegisterUserMutation } from "../../generated/graphql";

const RegisterView: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [
    registerUserMutation,
    { data, loading, error },
  ] = useRegisterUserMutation();

  if (loading) {
    console.log("loading....");
  }

  if (error) {
    console.log("Error");
  }

  if (data) {
    console.log(data.registerUser.user);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitting....");

    registerUserMutation({
      variables: {
        input: {
          username: username,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        },
      },
    });
  };

  const handleUsername = (text: string) => {
    setUsername(text);
  };
  const handleEmail = (text: string) => {
    setEmail(text);
  };
  const handlePassword = (text: string) => {
    setPassword(text);
  };
  const handleConfirmPassword = (text: string) => {
    setConfirmPassword(text);
  };

  return (
    <View>
      <View style={{ paddingBottom: 5 }}>
        <TextInput placeholder="Email..." onChangeText={handleUsername} />
      </View>
      <View style={{ paddingBottom: 5 }}>
        <TextInput
          keyboardType="email-address"
          placeholder="Username..."
          onChangeText={handleEmail}
        />
      </View>
      <View style={{ paddingBottom: 5 }}>
        <TextInput
          secureTextEntry
          placeholder="Passowrd..."
          onChangeText={handlePassword}
        />
      </View>
      <View>
        <TextInput
          secureTextEntry
          placeholder="Confirm your password"
          onChangeText={handleConfirmPassword}
        />
      </View>
      <View style={{ paddingTop: 10 }}>
        <AppButton text="Sign me up" onPress={handleSubmit} />
        <AppButton
          text={"I've already got an account"}
          onPress={() => console.log("actually worked lul")}
        />
      </View>
    </View>
  );
};

export default RegisterView;
