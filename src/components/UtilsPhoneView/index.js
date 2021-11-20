import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { RFPercentage } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";

export default ({ name, onPress, number }) => {
  

  return (
    <>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 35,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(196, 196, 196, 1)",
            width: 60 + "%",
            alignItems: "center",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: RFPercentage(1.5) }}>
            {name}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(39, 214, 36, 1)",
            flexDirection: "row",
            justifyContent: "space-around",
            width: 62 + "%",
            alignItems: "center",
            padding: 15,
            borderRadius: 15,
          }}
          onPress={onPress}
        >
          <Icon name={"phone-call"} size={39} />
          <Text style={{ fontSize: RFPercentage(2.5), fontWeight: 'bold', color: "white" }}>CHAMAR</Text>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "rgba(196, 196, 196, 1)",
            width: 60 + "%",
            alignItems: "center",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <Text>{number}</Text>
        </View>
      </View>
    </>
  );
};
