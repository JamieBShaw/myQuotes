import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginView from "../views/auth/login";
import { MainTabNavigation } from "./MainTabNavigation";
import RegisterView from "../views/auth/register";

const MainStack = createStackNavigator();

let initialRoute = "Login";

interface Props {
  token?: string | undefined | null | "";
}

const MainStackNavigator: React.FC<Props> = () => {
  return (
    <MainStack.Navigator headerMode="none" initialRouteName={initialRoute}>
      <MainStack.Screen
        options={{ title: "Login" }}
        name="Login"
        component={LoginView}
      />
      <MainStack.Screen
        options={{ title: "Register" }}
        name="Register"
        component={RegisterView}
      />
      <MainStack.Screen
        options={{ title: "Home" }}
        name="Home"
        component={MainTabNavigation}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
