import { View, Text, CheckBox } from "react-native";
import React from "react";

export default ({ text, value, onValueChange }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <CheckBox
          value={value}
          onValueChange={onValueChange}
          style={{ alignSelf: "center" }}
        />
        <Text>{text}</Text>
      </View>
    </View>
  );
};
