import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import RegContainer from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";


export default () => {
  return (
    <LinearGradient colors={["#CB2E81", "#FFC1E3"]} style={{ flex: 1 }}>
      <ScrollView>
        <RegContainer fontSize={RFPercentage(2.2)} />
      </ScrollView>
    </LinearGradient>
  );
};
