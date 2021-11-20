import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeTabStack from "../../screens/HomeTabStack";
import { NavigationContainer } from "@react-navigation/native";
import Ocurrences from "../../screens/Ocurrences";
import UsefulPhones from "../../screens/UsefulPhones";
import ProtectiveMeasure from "../../screens/ProtectiveMeasure";
import MyLocation from "../../screens/MyLocation";

const StackHome = createStackNavigator();

export default function HomeStack() {
  return (
    <NavigationContainer independent={true}>
      <StackHome.Navigator
        initialRouteName="initial"
        screenOptions={{
          presentation: "modal",
          headerShown: false,
          headerTintColor: "white",
        }}
      >
        <StackHome.Screen name="initial" component={HomeTabStack} />
        <StackHome.Screen name="Ocorrencias" component={Ocurrences} />
        <StackHome.Screen name="Telefones úteis" component={UsefulPhones} />
        <StackHome.Screen
          name="Medida protetiva"
          component={ProtectiveMeasure}
        />
        <StackHome.Screen name="Minha Localização" component={MyLocation} />
      </StackHome.Navigator>
    </NavigationContainer>
  );
}
