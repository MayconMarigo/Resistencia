import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { View, Text, ActivityIndicator } from "react-native";

//functions
import { cpfMask, rgMask, dateMask, phoneMask } from "../../masks/mask";

//components
import Input from "../../components/Input/Input";
import CustomButton from "../../components/Button/Button.js";
import axios from "axios";
import { useEffect } from "react";

export default () => {
  const [Cpf, setCPF] = useState("");
  const [showQuestion, setShowQuestion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [Rg, setRg] = useState("");
  const [Birthdate, setBirthdate] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [showPw, setShowPW] = useState(false);
  const [showPwView, setShowPwView] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowPwView(false);
      setShowPW(false);
      setShowQuestion(false);
    }, 5000);
  }, [showPwView]);

  let modName;

  function nameInput(t) {
    modName = cpfMask(t);
    setCPF(modName);
  }

  async function checkPw() {
    setIsLoading(true);
    const resp = await axios.get(`http://192.168.0.18:3000/usuarios/${Cpf}`);
    setShowQuestion(true);
    setIsLoading(false);
    setData(resp.data);
  }

  async function submitValues() {
    let sum = 0;
    if (Rg == data[0].RG) {
      sum++;
    }
    if (Birthdate == data[0].DataNascimento) {
      sum++;
    }
    if (PhoneNumber == data[0].TelefonePrincipal) {
      sum++;
    }
    if (sum < 2) {
      alert(
        "Você precisa acertar pelo menos 2 questões para recuperar a senha!"
      );
      return;
    } else {
      setShowPW(true);
      setShowPwView(true);
      sum = 0;
    }
  }

  return (
    <LinearGradient
      colors={["#CB2E81", "#FFC1E3"]}
      style={{
        width: wp(100),
        height: hp(100),
        flex: 1,
        padding: 40,
        paddingTop: hp(8),
      }}
    >
      {isLoading ? (
        <ActivityIndicator
          size={50}
          color="blue"
          style={{
            position: "absolute",
            top: hp(45),
            right: wp(44),
            zIndex: 9999,
          }}
        />
      ) : null}
      <Input
        width={100 + "%"}
        label={"CPF"}
        value={cpfMask(Cpf)}
        placeholder={"Insira o CPF cadastrado aqui..."}
        placeholderTextColor={"#E8CECE"}
        onChangeText={(t) => nameInput(t)}
        maxLength={14}
        keyboardType={"number-pad"}
      />
      {showQuestion ? null : (
        <View style={{ marginTop: RFPercentage(4), alignItems: "center" }}>
          <CustomButton
            text={"RECUPERAR"}
            color={"white"}
            backgroundColor={"#0E0F0A"}
            width={wp(40)}
            height={hp(6)}
            fontSize={RFPercentage(2)}
            onPress={() => checkPw()}
          />
        </View>
      )}

      {showQuestion ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: RFPercentage(2.5) }}>
            Confirme algumas questões para recuperar a senha:
          </Text>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Input
              label={"RG"}
              placeholder={"00.000.000-0"}
              value={rgMask(Rg)}
              onChangeText={(t) => setRg(rgMask(t))}
              width={45 + "%"}
              placeholderTextColor={"#E8CECE"}
              maxLength={12}
              keyboardType={"number-pad"}
            />
            <Input
              label={"Data de Nascimento"}
              placeholder={"00/00/0000"}
              value={dateMask(Birthdate)}
              placeholderTextColor={"#E8CECE"}
              onChangeText={(t) => setBirthdate(dateMask(t))}
              width={45 + "%"}
              maxLength={10}
              keyboardType={"number-pad"}
            />
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Input
              label={"Telefone para contato"}
              placeholder={"(43)99999-9999 ou (43)3333-3333"}
              value={phoneMask(PhoneNumber)}
              onChangeText={(t) => setPhoneNumber(t)}
              placeholderTextColor={"#E8CECE"}
              maxLength={20}
              keyboardType={"number-pad"}
            />
          </View>
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <CustomButton
              text={"VERIFICAR"}
              color={"white"}
              backgroundColor={"#0E0F0A"}
              width={wp(50)}
              height={hp(6)}
              fontSize={RFPercentage(2)}
              onPress={() => submitValues()}
            />
          </View>
          {showPw ? (
            <View style={{ marginTop: 20, alignItems: "center" }}>
              <Text style={{ fontSize: RFPercentage(2.5) }}>Senha Atual</Text>
              <Text style={{ fontSize: RFPercentage(2.5) }}>
                à vista por 5 segundos:
              </Text>
              {showPwView ? (
                <Text style={{ marginTop: 40 }}>{data[0].Senha}</Text>
              ) : null}
            </View>
          ) : null}
        </View>
      ) : null}
    </LinearGradient>
  );
};
