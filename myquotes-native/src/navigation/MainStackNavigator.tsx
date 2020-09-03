import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginView from "../views/auth/login";
import RegisterView from "../views/auth/register";
import MainTabNavigation from "./MainTabNavigation";

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator headerMode="none" initialRouteName="Login">
      <MainStack.Screen name="Login" component={LoginView} />
      <MainStack.Screen name="Register" component={RegisterView} />
      <MainStack.Screen name="Home" component={MainTabNavigation} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
