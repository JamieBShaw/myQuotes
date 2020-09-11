import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginView from "../views/auth/login";
import MainTabNavigation from "./MainTabNavigation";
import RegisterView from "../views/auth/register";
import { checkTokenExistsOnStartUp } from "../utils/token";

const MainStack = createStackNavigator();

let initialRoute = "Login";

checkTokenExistsOnStartUp(initialRoute);

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator headerMode="none" initialRouteName={initialRoute}>
      <MainStack.Screen name="Login" component={LoginView} />
      <MainStack.Screen name="Register" component={RegisterView} />
      <MainStack.Screen name="Home" component={MainTabNavigation} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
