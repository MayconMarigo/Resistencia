import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//components

import Input from "../../../../components/Input/Input";
import CustomButton from "../../../../components/Button/Button";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

//masks

import {
  cpfMask,
  cepMask,
  phoneMask,
  dateMask,
  rgMask,
} from "../../../../masks/mask";

export default function AccountSettings() {
  const navigation = useNavigation();
  const [Security, setSecurity] = useState(true);
  const [Security2, setSecurity2] = useState(true);
  const [Pass, setPass] = useState(Security);
  const [isEditable, setEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accountData, setAccountData] = useState({
    Name: "",
    Cpf: "",
    Cep: "",
    Neighbourhood: "",
    Address: "",
    Adnumber: "",
    Complement: "",
    PhoneNumber: "",
    Email: "",
    OtherNum: "",
    Rg: "",
    Birthdate: "",
    Pw: "",
    Pw2: "",
  });

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const value = await AsyncStorage.getItem("key");
      const stringValue = JSON.parse(value);
      const res = await axios.get(
        `http://192.168.0.18:3000/usuarios/${stringValue.cpf}&${stringValue.senha}`
      );
      const resp = res.data[0];
      setAccountData({
        id: resp.idUsuario,
        Name: resp.NomeCompleto,
        Cpf: resp.CPF,
        Cep: resp.CEP,
        Neighbourhood: resp.Bairro,
        Address: resp.Endereco,
        Adnumber: resp.NumeroEndereco,
        Complement: resp.Complemento,
        PhoneNumber: resp.TelefonePrincipal,
        Email: resp.Email,
        OtherNum: resp.TelefoneSecundario,
        Rg: resp.RG,
        Birthdate: resp.DataNascimento,
        Pw: resp.Senha,
        Pw2: resp.Senha,
      });
      setIsLoading(false);
    }
    fetchData();
  }, []);
  async function handleLogout() {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem("key");
      setIsLoading(false);
      navigation.navigate("Login");
    } catch (e) {
      // implement something
    }
  }

  function showPw() {
    setSecurity(!Security);
    setPass(Security);
  }
  function showPw2() {
    setSecurity2(!Security2);
    setPass(Security2);
  }

  function turnEditable() {
    setEditable(!isEditable);
  }

  //validating if all fields have some information except rg, birthdate, secondarynumber(othernum) and complement

  function checkAllFields(obj) {
    for (var key in obj) {
      if (
        obj[key] == "" &&
        key != "Complement" &&
        key != "OtherNum" &&
        key != "Rg" &&
        key != "Birthdate"
      ) {
        alert("Por favor, preencha todos os campos corretamente.");
        return false;
      } else if (obj.Pw.length < 6 || obj.Pw2.length < 6) {
        alert(
          "A senha e confirmação de senha precisam ter no mínimo 6 caracteres"
        );
        return false;
      } else if (obj.Pw != obj.Pw2) {
        alert("As senhas não conferem.");
        return false;
      }
    }
    return true;
  }

  async function updateFields() {
    setIsLoading(true);
    if (checkAllFields(accountData) == false) {
      setIsLoading(false);
      return;
    } else {
      try {
        await axios.post(
          `http://192.168.0.18:3000/usuarios/${accountData.id}`,
          accountData
        );
        alert("Informações alteradas com sucesso!");
        setEditable(!isEditable);
      } catch (error) {
        alert(
          "Não foi possível alterar suas informações, tente novamente dentro de alguns instantes..."
        );
      }
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
      <LinearGradient colors={["#FFC1E3", "#CB2E81"]}>
        <View
          style={{ marginTop: hp(3), padding: hp(1.5), alignSelf: "center" }}
        >
          <Text
            style={{
              fontSize: RFPercentage(2.5),
              fontWeight: "bold",
              color: "black",
            }}
          >
            MEUS DADOS
          </Text>
        </View>
        {isLoading ? (
          <ActivityIndicator
            size={50}
            color="blue"
            style={{
              position: "absolute",
              top: hp(40),
              right: wp(44),
              zIndex: 9999,
            }}
          />
        ) : null}
        <ScrollView style={{ padding: 40, paddingTop: 20 }}>
          <Input
            label={"Nome completo"}
            placeholder={"Seu nome aqui..."}
            value={accountData.Name}
            onChangeText={(t) => setAccountData({ ...accountData, Name: t })}
            placeholderTextColor={"#E8CECE"}
            editable={isEditable}
            maxLength={100}
          />
          <Input
            label={"CPF"}
            placeholder={"000.000.000-00"}
            value={cpfMask(accountData.Cpf)}
            placeholderTextColor={"#E8CECE"}
            editable={false}
            maxLength={14}
            keyboardType={"number-pad"}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Input
              label={"CEP"}
              placeholder={"00000-000"}
              value={cepMask(accountData.Cep)}
              onChangeText={(t) => setAccountData({ ...accountData, Cep: t })}
              width={30 + "%"}
              placeholderTextColor={"#E8CECE"}
              editable={isEditable}
              maxLength={10}
              keyboardType={"number-pad"}
            />
            <Input
              label={"Bairro"}
              placeholder={"Seu Bairro aqui..."}
              value={accountData.Neighbourhood}
              onChangeText={(t) =>
                setAccountData({ ...accountData, Neighbourhood: t })
              }
              width={60 + "%"}
              placeholderTextColor={"#E8CECE"}
              editable={isEditable}
              maxLength={100}
            />
          </View>

          <Input
            label={"Endereço"}
            placeholder={"Rua, avenida, travessa, etc..."}
            value={accountData.Address}
            onChangeText={(t) => setAccountData({ ...accountData, Address: t })}
            placeholderTextColor={"#E8CECE"}
            editable={isEditable}
            maxLength={100}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Input
              label={"Número"}
              placeholder={"000"}
              value={accountData.Adnumber}
              onChangeText={(t) =>
                setAccountData({ ...accountData, Adnumber: t })
              }
              width={30 + "%"}
              placeholderTextColor={"#E8CECE"}
              editable={isEditable}
              maxLength={10}
              keyboardType={"number-pad"}
            />
            <Input
              label={"Complemento"}
              placeholder={"Apartamento, bloco."}
              value={accountData.Complement}
              onChangeText={(t) =>
                setAccountData({ ...accountData, Complement: t })
              }
              width={60 + "%"}
              placeholderTextColor={"#E8CECE"}
              editable={isEditable}
              maxLength={20}
            />
          </View>

          <Input
            label={"Telefone para contato"}
            placeholder={"(43)99999-9999 ou (43)3333-3333"}
            value={phoneMask(accountData.PhoneNumber)}
            onChangeText={(t) =>
              setAccountData({ ...accountData, PhoneNumber: t })
            }
            placeholderTextColor={"#E8CECE"}
            editable={isEditable}
            maxLength={20}
            keyboardType={"number-pad"}
          />
          <Input
            label={"E-mail"}
            placeholder={"email@exemplo.com.br"}
            value={accountData.Email}
            onChangeText={(t) => setAccountData({ ...accountData, Email: t })}
            placeholderTextColor={"#E8CECE"}
            editable={isEditable}
            maxLength={100}
            keyboardType={"email-address"}
          />
          <Input
            label={"Outro número para contato ( não obrigatório )"}
            placeholder={"(43)99999-9999 ou (43)3333-3333"}
            value={phoneMask(accountData.OtherNum)}
            onChangeText={(t) =>
              setAccountData({ ...accountData, OtherNum: t })
            }
            placeholderTextColor={"#E8CECE"}
            editable={isEditable}
            maxLength={20}
            keyboardType={"number-pad"}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Input
              label={"RG"}
              placeholder={"00.000.000-0"}
              value={rgMask(accountData.Rg)}
              onChangeText={(t) => setAccountData({ ...accountData, Rg: t })}
              width={30 + "%"}
              placeholderTextColor={"#E8CECE"}
              editable={isEditable}
              maxLength={12}
              keyboardType={"number-pad"}
            />
            <Input
              label={"Data de Nascimento"}
              placeholder={"00/00/0000"}
              value={dateMask(accountData.Birthdate)}
              placeholderTextColor={"#E8CECE"}
              onChangeText={(t) =>
                setAccountData({ ...accountData, Birthdate: t })
              }
              width={60 + "%"}
              editable={isEditable}
              maxLength={10}
              keyboardType={"number-pad"}
            />
          </View>

          <Input
            label={"Senha ( 6 até 16 caracteres )"}
            value={accountData.Pw}
            placeholder={"Sua senha aqui..."}
            name={Security ? "eye" : "eye-slash"}
            pass={Security}
            size={18}
            onChangeText={(t) => setAccountData({ ...accountData, Pw: t })}
            onPress={() => showPw()}
            placeholderTextColor={"#E8CECE"}
            editable={isEditable}
            maxLength={16}
          />
          <Input
            label={"Repita a senha"}
            value={accountData.Pw2}
            placeholder={"Sua senha aqui..."}
            name={Security2 ? "eye" : "eye-slash"}
            pass={Security2}
            size={18}
            onChangeText={(t) => setAccountData({ ...accountData, Pw2: t })}
            onPress={() => showPw2()}
            placeholderTextColor={"#E8CECE"}
            editable={isEditable}
            maxLength={16}
          />
          <View style={{ marginTop: 25, alignItems: "center" }}>
            <Text
              style={{
                textDecorationLine: "underline",
                fontSize: RFPercentage(2),
                color: isEditable ? "yellow" : "blue",
                fontWeight: "bold",
              }}
            >
              {isEditable ? "Modo Edição de dados" : "Modo Leitura"}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: hp(4),
              marginBottom: hp(5),
              flexDirection: "row",
            }}
          >
            <CustomButton
              text={"ALTERAR DADOS"}
              backgroundColor={"rgba(15, 10, 10, 0.85)"}
              width={wp(40)}
              height={hp(6)}
              fontSize={RFPercentage(2)}
              onPress={() => turnEditable()}
              color={"white"}
            />

            <CustomButton
              text={"CONFIRMAR"}
              backgroundColor={"#27D624"}
              color={"black"}
              width={wp(37)}
              height={hp(6)}
              fontSize={RFPercentage(2)}
              onPress={() => updateFields()}
            />
          </View>
          <TouchableOpacity style={{ marginBottom: hp(20) }}>
            <Text
              style={{
                fontWeight: "bold",
                alignSelf: "center",
                fontSize: RFPercentage(3),
                textDecorationLine: "underline",
              }}
              onPress={() => {
                handleLogout();
              }}
            >
              SAIR DA MINHA CONTA
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
