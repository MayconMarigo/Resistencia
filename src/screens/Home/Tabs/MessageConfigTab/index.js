import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";

import { phoneMask } from "../../../../masks/mask";

//components

import EdView from "../../../../components/ContactView/index";

export default function MessageConfig() {
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [contactArr, setcontactArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");

  useEffect(() => {
    getContacts();
  }, []);

  async function getContacts() {
    try {
      const value = await AsyncStorage.getItem("key");
      const stringValue = JSON.parse(value);
      const resp = await axios.get(
        `http://192.168.0.18:3000/contatos/${stringValue.id}`
      );
      setcontactArr(resp.data);
      setId(stringValue.id);
    } catch (error) {
      alert(
        "Não foi possível carregar seus contatos, tente novamente em alguns segundos..."
      );
    }

    setIsLoading(false);
  }

  function addContact() {
    if (phoneMask(Phone).length < 14) {
      alert("Informe um número de telefone móvel correto.");
      return;
    }
    setIsLoading(true);
    const payload = {
      idUsuario: id,
      nomeContato: Name,
      telefoneContato: Phone,
    };
    if (Name == "" || Phone == "") {
      alert("Preencha os campos corretamente antes de adicionar um contato.");
    } else if (contactArr.length == 3) {
      alert("Voce pode ter no máximo 3 contatos!");
    } else {
      try {
        axios
          .post("http://192.168.0.18:3000/contatos/", payload)
          .then(() => {
            alert("Contato adicionado com sucesso!");
          })
          .then(() => {
            getContacts();
          });
      } catch (error) {
        alert(
          "Não foi possível adicionar um contato, tente novamente em alguns segundos..."
        );
      }
    }
    setIsLoading(false);
  }

  function delContact(idContato) {
    const payload = {
      contactNumber: idContato,
    };
    Alert.alert("Atenção", "Tem certeza que deseja deletar esse contato?", [
      {
        text: "Sim",
        onPress: () => {
          setIsLoading(true);
          try {
            axios
              .delete("http://192.168.0.18:3000/contatos/", { data: payload })
              .then(() => {
                alert("Contato deletado com sucesso!");
              })
              .then(() => {
                getContacts();
              });
          } catch (error) {
            alert(
              "Não foi possível deletar o contato, tente novamente em alguns segundos.."
            );
          }
          setIsLoading(false);
        },
      },
      {
        text: "Não",
      },
    ]);
  }

  function sendSms(num, msg) {
    const url = `sms:${num}?body=${msg}`;
    Linking.openURL(url);
  }

  return (
    <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
      <LinearGradient
        colors={["#FFC1E3", "#CB2E81"]}
        style={{ height: hp(100) }}
      >
        <View style={{ padding: 40, alignItems: "center" }}>
          <Text style={{ fontSize: RFPercentage(3) }}>
            Adicionar um contato
          </Text>
        </View>
        {isLoading ? (
          <ActivityIndicator
            size={50}
            color="blue"
            style={{
              position: "absolute",
              top: hp(45),
              right: wp(45),
              zIndex: 9999,
            }}
          />
        ) : null}

        <ScrollView>
          <EdView
            iconName="check"
            backgroundColor="#27D624"
            onPress={() => {
              addContact();
            }}
            onChangeText={(e) => {
              setName(e);
            }}
            onChangeText2={(e) => {
              setPhone(e);
            }}
            phoneValue={phoneMask(Phone)}
          />

          <View style={{ padding: 40, alignItems: "center" }}>
            <Text style={{ fontSize: RFPercentage(3) }}>
              Meus Contatos Ativos
            </Text>
          </View>

          {contactArr && contactArr.length != 0
            ? contactArr.map((el) => {
                return (
                  <EdView
                    sms={true}
                    editable={false}
                    key={el.idContato}
                    nameValue={el.NomeContato}
                    phoneValue={phoneMask(el.TelefoneContato)}
                    iconName="x-circle"
                    backgroundColor="red"
                    color="black"
                    marginBottom={25}
                    onPress={() => delContact(el.idContato)}
                    onPress2={() => sendSms(el.TelefoneContato, "SMS de teste do aplicativo Resistência.")}
                  />
                );
              })
            : null}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
