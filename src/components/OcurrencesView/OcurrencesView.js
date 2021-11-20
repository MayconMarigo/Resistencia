import React from "react";
import { View, TextInput } from "react-native";
import SwitchSelector from "react-native-switch-selector";

export default ({ onChangeText, onPress, search, order }) => {
  return (
    <View style={{ padding: 20, paddingTop: 0, marginBottom: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={{
            padding: 5,
            width: 100 + "%",
            backgroundColor: "rgba(196, 196, 196, 0.54)",
            marginTop: 5,
          }}
          placeholder="Faça sua busca por nome ou número completo..."
          onChangeText={onChangeText}
          value={search}
        ></TextInput>
      </View>

      {order ? (
        <View style={{ marginTop: 5 }}>
          <SwitchSelector
            buttonColor={"#CB2E81"}
            options={[
              { label: "Mais Recentes", value: "newer" },
              { label: "Mais Antigas", value: "older" },
            ]}
            hasPadding
            initial={0}
            onPress={onPress}
          />
        </View>
      ) : null}
    </View>
  );
};
