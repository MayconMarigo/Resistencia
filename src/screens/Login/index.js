import React, { useEffect, useState } from "react";
import { Image, Text, View, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import axios from "axios";

//functions
import { cpfMask } from "../../masks/mask";

//assets
import Logo from "../../assets/logo.png";

//components
import Input from "../../components/Input/Input.js";
import CustomButton from "../../components/Button/Button.js";

export default () => {
  const navigation = useNavigation();

  const [security, setSecurity] = useState(true);
  const [nameField, setNameField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [pass, setPass] = useState(security);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const storeData = async (value) => {
    setIsLoading(true);
    const stringValue = JSON.stringify(value);
    try {
      await AsyncStorage.setItem("key", stringValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("key");
      if (value !== null) {
        navigation.navigate("Home");
      }
    } catch (e) {}
  };

  let modName;
  function nameInput(t) {
    modName = cpfMask(t);
    setNameField(modName);
  }

  function showPw() {
    setSecurity(!security);
    setPass(security);
  }

  const handleLogin = async () => {
    try {
      if (nameField && passwordField) {
        setIsLoading(true);
        const resp = await axios.get(
          `http://192.168.0.18:3000/usuarios/${nameField}&${passwordField}`
        );
        if (resp.data.length == 0) {
          alert("Usuario ou senha incorretos!");
          setIsLoading(false);
        } else {
          const id = {
            id: resp.data[0].idUsuario,
            cpf: resp.data[0].CPF,
            senha: resp.data[0].Senha,
          };
          storeData(id);
          setNameField("");
          setPasswordField("");
          setIsLoading(false);
          navigation.navigate("Home");
        }
      } else {
        alert("Preencha os campos corretamente para acessar o aplicativo.");
      }
    } catch (error) {
      console.log(error);
      alert(
        "Não foi possível efetuar o login, tente novamente em alguns instantes..."
      );
    }
  };
  return (
    <LinearGradient colors={["#CB2E81", "#FFC1E3"]} style={{ flex: 1 }}>
      <Image
        source={Logo}
        style={{
          alignSelf: "center",
          marginTop: hp(14),
          marginBottom: hp(3),
          resizeMode: "contain",
          width: wp(50),
          height: hp(25),
        }}
      />
      {isLoading ? (
        <ActivityIndicator
          size={50}
          color="blue"
          style={{
            position: "absolute",
            top: hp(50),
            right: wp(44),
            zIndex: 9999,
          }}
        />
      ) : null}
      <View
        style={{
          width: wp(100),
          maxHeight: hp(50),
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: wp(80) }}>
          <Input
            label={"Usuário"}
            value={nameField}
            placeholder={"Digite seu Cpf"}
            onChangeText={(t) => nameInput(t)}
            width={100 + "%"}
            fontSize={RFPercentage(2)}
            placeholderTextColor={"#E8CECE"}
            keyboardType={"number-pad"}
            maxLength={14}
          />
          <Input
            label={"Senha"}
            value={passwordField}
            placeholder={"Digite sua senha"}
            pass={security}
            name={security ? "eye" : "eye-slash"}
            size={18}
            onChangeText={(t) => setPasswordField(t)}
            onPress={() => showPw()}
            width={100 + "%"}
            fontSize={RFPercentage(2)}
            placeholderTextColor={"#E8CECE"}
            maxLength={16}
          />
          <TouchableOpacity>
            <Text
              style={{
                fontSize: RFPercentage(2),
                marginTop: 10,
                textDecorationLine: "underline",
                color: "#100101",
              }}
              onPress={() => {
                navigation.navigate("Esqueci minha senha");
              }}
            >
              Esqueci minha senha
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: RFPercentage(4) }}>
          <CustomButton
            text={"ENTRAR"}
            backgroundColor={"#0E0F0A"}
            width={wp(40)}
            height={hp(6)}
            color={"white"}
            fontSize={RFPercentage(2)}
            onPress={() => handleLogin()}
          />
        </View>

        <View
          style={{
            marginTop: hp(5),
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "#BB377D" }}>Não possui conta?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Cadastro");
            }}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                fontWeight: "bold",
              }}
            >
              {"  "}Cadastre-se !
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          alignSelf: "center",
          alignItems: "center",
          position: "absolute",
          bottom: hp(5),
          marginBottom: RFPercentage(2),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Termos e Condições");
          }}
          style={{ alignItems: "center" }}
        >
          <Text style={{ textDecorationLine: "underline", color: "#BB377D" }}>
            Termos e condições gerais de uso e
          </Text>
          <Text style={{ textDecorationLine: "underline", color: "#BB377D" }}>
            {" "}
            Politicas de privacidade
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
