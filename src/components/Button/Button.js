import React from "react";
import styled from "styled-components";
import { View } from "react-native";

const EdButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  elevation: 15;
`;

const EdButtonText = styled.Text`
  color: white;
`;

export default ({ onPress, backgroundColor, text, width, height, fontSize, color }) => {
  return (
    <View>
      <EdButton
        onPress={onPress}
        style={{
          backgroundColor: backgroundColor,
          width: width,
          height: height,
        }}
      >
        <EdButtonText style={{fontSize: fontSize, color: color}}>{text}</EdButtonText>
      </EdButton>
    </View>
  );
};
