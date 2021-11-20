import React, { useState } from "react";
import axios from "axios";
import { View, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Input from "../../components/Input/Input.js";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/core";

// components
import CheckBox from "../../components/CheckBox/index.js";
import CustomButton from "../../components/Button/Button.js";
import { cpf } from "cpf-cnpj-validator";

// masks

import {
  cpfMask,
  cepMask,
  phoneMask,
  dateMask,
  rgMask,
} from "../../masks/mask";

export default () => {
  const [Name, setName] = useState("");
  const [Cpf, setCpf] = useState("");
  const [Cep, setCep] = useState("");
  const [Neighbourhood, setNeighbourhood] = useState("");
  const [Address, setAddress] = useState("");
  const [Adnumber, setAdNumber] = useState("");
  const [Complement, setComplement] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [OtherNum, setOtherNum] = useState("");
  const [Rg, setRg] = useState("");
  const [Birthdate, setBirthdate] = useState("");
  const [Pw, setPw] = useState("");
  const [Pw2, setPw2] = useState("");
  const [Security, setSecurity] = useState(true);
  const [Security2, setSecurity2] = useState(true);
  const [isSelected, setSelection] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [Pass, setPass] = useState(Security);
  const navigation = useNavigation();

  const registerInfo = {
    NomeCompleto: Name,
    Cpf: cpfMask(Cpf),
    Cep: cepMask(Cep),
    Bairro: Neighbourhood,
    Endereco: Address,
    NumeroEndereco: Adnumber,
    Complemento: Complement,
    TelefonePrincipal: phoneMask(PhoneNumber),
    Email: Email,
    TelefoneSecundario: phoneMask(OtherNum),
    Rg: rgMask(Rg),
    DataNascimento: dateMask(Birthdate),
    Senha: Pw,
    Valido: 1,
    Panico: 0,
    Ativo: 1,
  };

  //validando se o obj está vazio com excessão dos campos RG, complemento, Data nascimento, Telefone Secundário, pânico e se o CPF é válido

  function checkAllFields(obj) {

    for (var key in obj) {
      if (
        obj[key] == "" &&
        key != "Complemento" &&
        key != "TelefoneSecundario" &&
        key != "Rg" &&
        key != "DataNascimento" &&
        key != "Panico"
      ) {
        alert("Por favor, preencha todos os campos corretamente.");
        console.log(key);
        return false;
      } else if (obj.Senha.length < 6 || Pw2.length < 6) {
        alert(
          "A senha e confirmação de senha precisam ter no mínimo 6 caracteres"
        );
        return false;
      } else if (obj.Senha != Pw2) {
        alert("As senhas não conferem.");
        return false;
      }
    }
    return true;
  }

  async function HandleSubmit() {
    checkAllFields(registerInfo);
    try {
      const resp = await axios.get(
        `http://192.168.0.18:3000/usuarios/${registerInfo.Cpf}&${registerInfo.Senha}`
      );
      if (resp.data && resp.data.length > 0) {
        alert("Este Cpf já registrado!");
      } else {
        try {
          axios
            .post("http://192.168.0.18:3000/usuarios", registerInfo)
            .then(
              Alert.alert(
                "Você já pode acessar o aplicativo.",
                "Cadastro realizado com sucesso!",
                [
                  {
                    text: "OK",
                    onPress: () => navigation.navigate("Login"),
                  },
                ],
                {
                  cancelable: false,
                }
              )
            )
            .catch((e) => {
              console.log(e);
              alert("Não foi possível realizar seu cadastro, tente novamente!");
            });
        } catch (error) {
          console.log("POST ERROR" + error);
        }
      }
    } catch (error) {
      console.log("GET ERROR:" + error);
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

  function checkbox() {
    setSelection2(!isSelected2);
    setBirthdate("");
    setOtherNum("");
    setRg("");
  }

  return (
    <LinearGradient colors={["#CB2E81", "#FFC1E3"]} style={{ flex: 1 }}>
      <ScrollView style={{ padding: 40 }}>
        <Input
          label={"Nome completo"}
          placeholder={"Seu nome aqui..."}
          value={Name}
          onChangeText={(t) => {
            t = t.replace(/[^A-Za-z ]/gi, "");
            setName(t);
          }}
          placeholderTextColor={"#E8CECE"}
          maxLength={100}
        />
        <Input
          textContentType={Number}
          label={"CPF"}
          placeholder={"000.000.000-00"}
          value={cpfMask(Cpf)}
          onChangeText={(t) => {
            setCpf(t);
            console.log(t);
          }}
          placeholderTextColor={"#E8CECE"}
          maxLength={14}
          keyboardType={"number-pad"}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Input
            label={"CEP"}
            placeholder={"00000-000"}
            value={cepMask(Cep)}
            onChangeText={(t) => setCep(t)}
            width={30 + "%"}
            placeholderTextColor={"#E8CECE"}
            maxLength={10}
            keyboardType={"number-pad"}
          />
          <Input
            label={"Bairro"}
            placeholder={"Seu Bairro aqui..."}
            value={Neighbourhood}
            onChangeText={(t) => {
              t = t.replace(/[^A-Za-z]/gi, "");
              setNeighbourhood(t);
            }}
            width={60 + "%"}
            placeholderTextColor={"#E8CECE"}
            maxLength={100}
          />
        </View>

        <Input
          label={"Endereço"}
          placeholder={"Rua, avenida, travessa, etc..."}
          value={Address}
          onChangeText={(t) => {
            t = t.replace(/[^A-Za-z]/gi, "");
            setAddress(t);
          }}
          placeholderTextColor={"#E8CECE"}
          maxLength={100}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Input
            label={"Número"}
            placeholder={"000"}
            value={Adnumber}
            onChangeText={(t) => setAdNumber(t)}
            width={30 + "%"}
            placeholderTextColor={"#E8CECE"}
            maxLength={10}
            keyboardType={"number-pad"}
          />
          <Input
            label={"Complemento"}
            placeholder={"Apartamento, bloco."}
            value={Complement}
            onChangeText={(t) => {
              t = t.replace(/[^A-Za-z]/gi, "");
              setComplement(t);
            }}
            width={60 + "%"}
            placeholderTextColor={"#E8CECE"}
            maxLength={20}
          />
        </View>

        <Input
          label={"Telefone para contato"}
          placeholder={"(43)99999-9999 ou (43)3333-3333"}
          value={phoneMask(PhoneNumber)}
          onChangeText={(t) => setPhoneNumber(t)}
          placeholderTextColor={"#E8CECE"}
          maxLength={14}
          keyboardType={"number-pad"}
        />
        <Input
          label={"E-mail"}
          placeholder={"email@exemplo.com.br"}
          value={Email}
          onChangeText={(t) => setEmail(t)}
          placeholderTextColor={"#E8CECE"}
          maxLength={100}
          keyboardType={"email-address"}
        />
        <Input
          label={"Outro número para contato ( não obrigatório )"}
          placeholder={"(43)99999-9999 ou (43)3333-3333"}
          value={phoneMask(OtherNum)}
          onChangeText={(t) => setOtherNum(t)}
          placeholderTextColor={isSelected2 ? "black" : "#E8CECE"}
          editable={isSelected2 ? false : true}
          maxLength={14}
          keyboardType={"number-pad"}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Input
            label={"RG"}
            placeholder={"00.000.000-0"}
            value={rgMask(Rg)}
            onChangeText={(t) => setRg(t)}
            width={30 + "%"}
            placeholderTextColor={isSelected2 ? "black" : "#E8CECE"}
            editable={isSelected2 ? false : true}
            maxLength={12}
            keyboardType={"number-pad"}
          />
          <Input
            label={"Data de Nascimento"}
            placeholder={"00/00/0000"}
            value={dateMask(Birthdate)}
            placeholderTextColor={isSelected2 ? "black" : "#E8CECE"}
            editable={isSelected2 ? false : true}
            onChangeText={(t) => setBirthdate(t)}
            width={60 + "%"}
            maxLength={10}
            keyboardType={"number-pad"}
          />
        </View>

        <Input
          label={"Senha ( 6 até 16 caracteres )"}
          value={Pw}
          placeholder={"Sua senha aqui..."}
          name={Security ? "eye" : "eye-slash"}
          pass={Security}
          size={18}
          onChangeText={(t) => setPw(t)}
          onPress={() => showPw()}
          placeholderTextColor={"#E8CECE"}
          maxLength={16}
        />
        <Input
          label={"Repita a senha"}
          value={Pw2}
          placeholder={"Sua senha aqui..."}
          name={Security2 ? "eye" : "eye-slash"}
          pass={Security2}
          size={18}
          onChangeText={(t) => setPw2(t)}
          onPress={() => showPw2()}
          placeholderTextColor={"#E8CECE"}
          maxLength={16}
        />

        <CheckBox
          value={isSelected2}
          onValueChange={() => checkbox()}
          text={`Concordo em disponibilizar apenas dados que considero sensíveis para utilização do aplicativo, conforme diz a Lei Geral de Proteção de Dados.`}
        />
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          text={`Li e concordo com os termos de uso, no que diz respeito as normas da Lei Geral de Proteção de Dados sobre o consentimento, segurança, e manuseio de meus dados pessoais aqui dispostos. `}
        />

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: hp(10),
          }}
        >
          <CustomButton
            text={"CADASTRAR"}
            backgroundColor={"#0E0F0A"}
            color={"white"}
            width={wp(50)}
            height={hp(6)}
            fontSize={RFPercentage(2)}
            onPress={() => HandleSubmit()}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
