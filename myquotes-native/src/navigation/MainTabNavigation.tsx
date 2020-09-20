import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { MaterialIcons } from "@expo/vector-icons";
import MyQuotes from "../views/myquotes";
import Home from "../views/home";
import CreateTopTabNav from "./MainTopTabNavigation";

const Tab = createMaterialBottomTabNavigator();

export const MainTabNavigation = () => {
  return (
    <Tab.Navigator
      activeColor="green"
      inactiveColor="black"
      barStyle={{ backgroundColor: "white" }}
      initialRouteName="Home"
      shifting
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="home" size={28} color="black" />
          ),
          tabBarBadge: true,
        }}
      />
      <Tab.Screen
        name="MyQuoutes"
        component={MyQuotes}
        options={{
          title: "My Quotes",
          tabBarIcon: () => (
            <MaterialIcons name="format-quote" size={28} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateTopTabNav}
        options={{
          title: "Create",
          tabBarIcon: () => (
            <MaterialIcons name="create" size={28} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// const TabNav = createBottomTabNavigator();

// // Add create tab or inegrate into myQuotes

// const MainTabNavigation = () => {
//   return (
//     <TabNav.Navigator initialRouteName="Home">
//       {/* <TabNav.Screen
//         name="Search"
//         options={{ title: "Search" }}
//         component={Explore}
//       /> */}
//       <TabNav.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: () => (
//             <MaterialIcons name="home" size={28} color="black" />
//           ),
//         }}
//       />
//       <TabNav.Screen
//         name="MyQuotes"
//         component={MyQuotes}
//         options={{
//           title: "My Quotes",
//           tabBarIcon: () => (
//             <MaterialIcons name="format-quote" size={28} color="black" />
//           ),
//         }}
//       />
//     </TabNav.Navigator>
//   );
// };

// export default MainTabNavigation;
