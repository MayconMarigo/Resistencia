import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import styled from "styled-components";

const EdView = styled.View`
  flex-direction: row;
  width: 68%;
  align-self: center;
`;
const View1 = styled.View`
  flex: 1;
`;
const View2 = styled.View`
  justify-content: center;
  align-items: center;
`;

const InputEd = styled.TextInput`
  align-items: center;
  background-color: "rgba(196, 196, 196, 1)";
  border-bottom-width: 2px;
  width: 100%;
  padding: 5px;
`;

export default ({
  iconName,
  backgroundColor,
  onChangeText,
  onChangeText2,
  onPress,
  nameValue,
  phoneValue,
  editable,
  color,
  marginBottom,
  sms,
  onPress2,
}) => {
  return (
    <View style={{ marginBottom: marginBottom }}>
      <EdView>
        <View1>
          <InputEd
            onChangeText={onChangeText}
            placeholder="Nome do contato"
            value={nameValue}
            editable={editable}
            style={{ color: color, borderTopLeftRadius: 15 }}
          ></InputEd>
          <InputEd
            onChangeText={onChangeText2}
            placeholder="(43)99999-9999"
            value={phoneValue}
            editable={editable}
            maxLength={14}
            style={{ color: color, borderBottomLeftRadius: sms ? null : 15 }}
          ></InputEd>
        </View1>

        <TouchableOpacity onPress={onPress}>
          <View2
            style={{
              backgroundColor: backgroundColor,
              borderTopRightRadius: 15,
              borderBottomRightRadius: sms ? null : 15,
            }}
          >
            <Icon name={iconName} size={36} style={{ padding: 21 }} />
          </View2>
        </TouchableOpacity>
      </EdView>
      {sms ? (
        <TouchableOpacity onPress={onPress2}>
          <View
            style={{
              backgroundColor: "rgba(39, 214, 36, 0.83)",
              width: 68 + "%",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              height: 35,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>ENVIAR SMS DE TESTE</Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
