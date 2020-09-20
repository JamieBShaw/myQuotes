import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CreateAuthorView from "../views/create/author";
import CreateQuoteView from "../views/create/quote";
import { Dimensions } from "react-native";
import { Theme } from "../../theme";

const Tab = createMaterialTopTabNavigator();

const CreateTopTabNav = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      initialRouteName="Authors"
      initialLayout={{ width: Dimensions.get("window").width }}
      tabBarOptions={{
        activeTintColor: Theme.colors.secondary,
        labelStyle: {
          fontSize: 14,
          fontFamily: Theme.font.primary,
          fontWeight: "bold",
        },
        style: { backgroundColor: "white" },
      }}
    >
      <Tab.Screen
        name="Authors"
        component={CreateAuthorView}
        options={{ tabBarLabel: "Authors" }}
        key="1"
      />
      <Tab.Screen name="Quotes" component={CreateQuoteView} key="2" />
    </Tab.Navigator>
  );
};

export default CreateTopTabNav;
