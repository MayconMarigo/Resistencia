import React from "react";
import styled from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";

const InputArea = styled.View`
  padding-bottom: 4px;
  border-bottom-width: 2px;
  border-bottom-color: black;
  margin-top: 15px;
`;
const TextHeader = styled.Text``;

const EdView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const TextEd = styled.TextInput`
  flex: 1;
  padding: 0 5px 0;
  color: white;
  opacity: 0.7;
`;

export default ({
  label,
  placeholder,
  name,
  value,
  onChangeText,
  pass,
  onPress,
  size,
  width,
  fontSize,
  editable,
  placeholderTextColor,
  maxLength,
  keyboardType
}) => {
  return (
    <InputArea style={{ width: width, marginTop: 7 }}>
      <TextHeader style={{ fontSize: fontSize }}>{label}</TextHeader>
      <EdView>
        <TextEd
          keyboardType={keyboardType}
          maxLength={maxLength}
          fontSize={fontSize}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={pass}
          editable={editable}
        ></TextEd>
        <TouchableOpacity onPress={onPress}>
          <Icon name={name} size={size} />
        </TouchableOpacity>
      </EdView>
    </InputArea>
  );
};
