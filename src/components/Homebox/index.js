import styled from "styled-components";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";

const SquareView = styled.View`
  border-radius: 15px;
  background-color: rgba(232, 244, 244, 0.8);
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border: 0.5px gray;
`;
const TextEd1 = styled.Text`
  color: #c92085;
`;

const TextEd2 = styled.Text``;

export default ({ label1, label2, width, height, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <SquareView style={{ width: width, height: height }}>
        <TextEd1 style={{ fontSize: RFPercentage(2.5) }}>{label1}</TextEd1>
        <TextEd2 style={{ fontSize: RFPercentage(2) }}>{label2}</TextEd2>
      </SquareView>
    </TouchableOpacity>
  );
};
