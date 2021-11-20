import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/Login";
import Register from "../../screens/Register";
import TermsAndConditions from "../../screens/TermsAndConditions";
import { NavigationContainer } from "@react-navigation/native";

import ForgotPW from "../../screens/ForgotPW";
import Home from "../../screens/Home";

const StackLogin = createStackNavigator();

export default function LoginStack() {
  return (
    <NavigationContainer theme={{colors: "#CB2E81"}}>
      <StackLogin.Navigator
        initialRouteName="Login"
        screenOptions={{
          presentation: "modal",
          headerShown: false,
          headerStyle: {
            backgroundColor: "#CB2E81",
          },
          headerTintColor: "white",
          cardStyle: {opacity: 1},
        }}
      >
        <StackLogin.Screen name="Login" component={Login} />
        <StackLogin.Screen
          name="Cadastro"
          component={Register}
          options={{ headerShown: true }}
        />
        <StackLogin.Screen name="Home" component={Home} />
        <StackLogin.Screen
          name="Termos e Condições"
          component={TermsAndConditions}
          options={{ headerShown: true }}
        />
        <StackLogin.Screen
          name="Esqueci minha senha"
          component={ForgotPW}
          options={{ headerShown: true }}
        />
      </StackLogin.Navigator>
    </NavigationContainer>
  );
}
