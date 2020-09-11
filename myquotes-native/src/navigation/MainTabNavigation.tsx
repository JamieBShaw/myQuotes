import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MyQuotes from "../views/myquotes";
import Home from "../views/home";

const TabNav = createBottomTabNavigator();

// Add create tab or inegrate into myQuotes

const MainTabNavigation = () => {
  return (
    <TabNav.Navigator initialRouteName="Home">
      {/* <TabNav.Screen
        name="Search"
        options={{ title: "Search" }}
        component={Explore}
      /> */}
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
