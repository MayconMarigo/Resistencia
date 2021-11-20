import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Alert, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import HomeBox from "../../components/Homebox/index";
import { RFPercentage } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Linking } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Accelerometer } from "expo-sensors";

export default () => {
  const navigation = useNavigation();
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [currentTime, setCurrentTime] = useState();
  const [id, setId] = useState();
  const [subscription, setSubscription] = useState(null);
  const [Acc, setAcc] = useState(0);
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    getData();
    getLocation();

    checkAccelerometer();
  }, []);

  // ativação do acelerômetro
  if (
    Math.sqrt(Math.pow(data.x, 2) + Math.pow(data.y, 2) + Math.pow(data.z, 2)) >
      8 &&
    Acc == 0
  ) {
    setAcc(1);
    handleSOS();
  }
  //

  async function checkAccelerometer() {
    await Accelerometer.requestPermissionsAsync();
    Accelerometer.isAvailableAsync().then((res) => {
      if (res === true) {
        _subscribe();
      }
    });
  }

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      })
    );
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("key");
      const stringValue = JSON.parse(value);
      if (value !== null) {
        setId(stringValue.id);
      }
    } catch (e) {}
  };

  const registerInfo = {
    Latitude: currentLatitude,
    Longitude: currentLongitude,
    mensagemOcorrencia: "Panico",
    idUsuario: id,
    DataHorario: currentTime,
  };

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

  function postOcurrence() {
    axios
      .post(
        "http://192.168.0.18:3000/ocorrencias",
        JSON.stringify(registerInfo),
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then(alert("Ocorrência registrada com sucesso."))
      .catch((e) => {
        console.log(e);
        alert("Não foi possível registrar a ocorrência, tente novamente");
      });
  }

  function handleSOS(number) {
    number = "153";
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
            onPress: () => postOcurrence(),
          },
          {
            text: "Não",
            onPress: () =>
              alert(
                "Caso esteja precisando de auxílio com outros números, vá até a tela Telefones Úteis"
              ),
            style: "cancel",
          },
        ],
        {
          cancelable: false,
        }
      );
    }, 1000);
    setTimeout(() => {
      setAcc(0);
    }, 1000);
  }

  return (
    <LinearGradient colors={["#FFC1E3", "#CB2E81"]} style={{ flex: 1 }}>
      <View
        style={{
          marginTop: hp(10),
          padding: wp(8),
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <HomeBox
            label1="Ocorrências"
            label2="Consulta/Cadastro"
            width={wp(40)}
            height={hp(15)}
            onPress={() => {
              navigation.navigate("Ocorrencias");
            }}
          />
          <HomeBox
            label1="Telefones úteis"
            label2="Orgãos de proteção"
            width={wp(40)}
            height={hp(15)}
            onPress={() => {
              navigation.navigate("Telefones úteis");
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: hp(2),
          }}
        >
          <HomeBox
            label1="Medida Protetiva"
            label2="Informações Gerais"
            width={wp(40)}
            height={hp(15)}
            onPress={() => {
              navigation.navigate("Medida protetiva");
            }}
          />
          <HomeBox
            label1="Localização"
            label2="Visualização"
            width={wp(40)}
            height={hp(15)}
            onPress={() => {
              navigation.navigate("Minha Localização");
            }}
          />
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: hp(5) }}>
        <TouchableOpacity
          onPress={() => {
            handleSOS();
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(235, 38, 38, 0.9)",
              width: wp(50),
              height: hp(25),
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: RFPercentage(5),
                fontWeight: "bold",
                color: "white",
              }}
            >
              S.O.S
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
