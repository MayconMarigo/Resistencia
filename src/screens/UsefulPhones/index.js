import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View, Text, ScrollView, Alert, ActivityIndicator } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/AntDesign";
import * as Location from "expo-location";
import { mckData } from "./mockdata";
import OcurrencesView from "../../components/OcurrencesView/OcurrencesView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import UtilsPhoneView from "../../components/UtilsPhoneView";
import { Linking } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [currentTime, setCurrentTime] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    getLocation();
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("key");
      const stringValue = JSON.parse(value);
      if (value !== null) {
        setId(stringValue.id);
      }
    } catch (e) {}
  };
  const getLocation = () => {
    Location.installWebGeolocationPolyfill();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;

        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  let newFilter = [];

  function SearchFn(text) {
    newFilter = mckData.filter((e) => {
      let newName = text.toUpperCase();
      setSearch(newName);

      if (e.nome.includes(newName)) {
        return e.nome;
      } else if (e.numero.includes(text)) {
        return e.numero;
      }
    });

    setFilteredData(newFilter);
  }

  var today = new Date(),
    date,
    time,
    dateTime;
  const getTime = () => {
    today = new Date();
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    dateTime = date + " " + time;
    setCurrentTime(dateTime);
  };
  setInterval(() => {
    getTime();
  }, 1000);

  function handleEmergency(number, nome) {
    const payload = {
      idUsuario: id,
      mensagemOcorrencia: nome,
      Latitude: currentLatitude,
      Longitude: currentLongitude,
      DataHorario: currentTime,
    };
    console.log(payload)
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);

    setTimeout(() => {
      Alert.alert(
        "Confirmação de Operação",
        "Você chegou a realizar a chamada?",
        [
          {
            text: "Sim",
            onPress: () => {
              setIsLoading(true);
              axios
                .post("http://192.168.0.18:3000/ocorrencias", payload, {
                  headers: {
                    "content-type": "application/json",
                  },
                })
                .then(setIsLoading(false))
                .then(alert("Ocorrência registrada com sucesso."))
                .catch((e) => {
                  console.log(e);
                  alert(
                    "Não foi possível registrar a ocorrência, tente novamente"
                  );
                });
            },
          },
          {
            text: "Não",
          },
        ],
        {
          cancelable: false,
        }
      );
    }, 1000);
  }

  return (
    <LinearGradient
      colors={["#FFC1E3", "#CB2E81"]}
      style={{ width: wp(100), height: hp(100), flex: 1 }}
    >
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ padding: 24, flexDirection: "row", alignItems: "center" }}
        >
          <Icon name={"arrowleft"} size={36} />
          <Text style={{ fontSize: RFPercentage(3), marginLeft: 15 }}>
            {" "}
            Telefones Úteis
          </Text>
        </TouchableOpacity>
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
      <OcurrencesView
        onChangeText={(e) => {
          SearchFn(e);
        }}
        value={search}
      />

      <ScrollView>
        {search == ""
          ? mckData.map((el) => {
              return (
                <UtilsPhoneView
                  key={el.id}
                  name={el.nome}
                  number={el.numero}
                  onPress={() => {
                    handleEmergency(el.numero, el.nome);
                  }}
                />
              );
            })
          : filteredData.map((el) => {
              return (
                <UtilsPhoneView
                  key={el.id}
                  name={el.nome}
                  number={el.numero}
                  onPress={() => {
                    handleEmergency(el.numero, el.nome);
                  }}
                />
              );
            })}
      </ScrollView>
    </LinearGradient>
  );
};
