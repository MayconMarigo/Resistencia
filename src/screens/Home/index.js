import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

//components
import HomeScreen from "./Tabs/HomeTab";
import AccountSettings from "./Tabs/AccountTab";
import MessageConfig from "./Tabs/MessageConfigTab";

const Tab = createMaterialTopTabNavigator();
export default () => {
  return (
      <Tab.Navigator
        initialRouteName="HomeLogin"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "rgba(255, 193, 227, 0.87)",
            paddingTop: 30,
          },
          tabBarShowLabel: false,
          tabBarIndicatorStyle: { backgroundColor: "#AD4396", height: 3 },
        }}
      >
        <Tab.Screen
          name="Settings"
          component={AccountSettings}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: () => <Icon2 name={"account"} size={23} />,
          }}
        />
        <Tab.Screen
          name="HomeLogin"
          component={HomeScreen}
          options={{
            tabBarLabel: "HomeLogin",
            tabBarIcon: () => <Icon name={"home"} size={23} />,
          }}
        />
        <Tab.Screen
          name="Message Settings"
          component={MessageConfig}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => <Icon2 name={"message-settings"} size={21} />,
          }}
        />
      </Tab.Navigator>
  );
};
