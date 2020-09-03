import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MyQuotes from "../views/myquotes";
import Home from "../views/home";
import Explore from "../views/explore";

const TabNav = createBottomTabNavigator();

const MainTabNavigation = () => {
  return (
    <TabNav.Navigator initialRouteName="Home">
      <TabNav.Screen
        name="Explore"
        options={{ title: "Explore" }}
        component={Explore}
      />
      <TabNav.Screen name="Home" component={Home} />
      <TabNav.Screen
        name="MyQuotes"
        options={{ title: "My Quotes" }}
        component={MyQuotes}
      />
    </TabNav.Navigator>
  );
};

export default MainTabNavigation;
