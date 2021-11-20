import React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import LoginStack from "./src/stacks/LoginStack/Main";

export default function App() {
  return (
    <>
      <LoginStack />
      <StatusBar style="auto" />
    </>
  );
}
