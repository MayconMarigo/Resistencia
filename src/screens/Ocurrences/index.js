import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Text, View, ActivityIndicator } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/core";
import { RFPercentage } from "react-native-responsive-fontsize";
import OcurrencesView from "../../components/OcurrencesView/OcurrencesView";
import OcurrencesCount from "../../components/OcurrencesView/OcurrencesCount";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default () => {
  const navigation = useNavigation();
  const [Count, setCount] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  let newFilter = [];
  let filter = false;

  function SearchFn(text) {
    if (text) {
      filter = true;
    } else {
      filter = false;
    }
    newFilter = Count.filter((e) => {
      setSearch(text);

      if (e.NomeCompleto.includes(text)) {
        return e.NomeCompleto;
      } else if (e.DataHorario.includes(text)) {
        return e.DataHorario;
      }
    });
    setFilteredData(newFilter);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const value = await AsyncStorage.getItem("key");
        const stringValue = JSON.parse(value);
        const resp = await axios.get(
          `http://192.168.0.18:3000/ocorrencias/${stringValue.id}`
        );
        setCount(resp.data);
      } catch (error) {
        alert(
          "Erro ao tentar listar as ocorrências, tente novamente em alguns segundos."
        );
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  function dateFormatter(dateTime) {
    const newDate = dateTime.split("T")[0];
    const newDateYear = newDate.split("-")[0];
    const newDateMonth = newDate.split("-")[1];
    const newDateDay = newDate.split("-")[2];
    return `${newDateDay}-${newDateMonth}-${newDateYear}`;
  }

  function timeFormatter(dateTime) {
    const newTime = dateTime.split("T")[1];
    const finalTime = newTime.split(".")[0];

    return finalTime;
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
          <Text style={{ fontSize: RFPercentage(3), marginLeft: 20 }}>
            {" "}
            Ocorrências
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
      <ScrollView>
        <OcurrencesView
          onChangeText={(e) => {
            SearchFn(e);
          }}
          value={search}
        />
        {Count == "" ? (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: RFPercentage(2) }}>
              Sem ocorrências cadastradas até o momento
            </Text>
          </View>
        ) : null}
        {Count && Count != "" && filteredData.length == 0
          ? Count.map((el) => {
              return (
                <OcurrencesCount
                  ocurrenceDate={dateFormatter(el.DataHorario)}
                  key={el.idOcorrencia}
                  Latitude={el.Latitude}
                  Longitude={el.Longitude}
                  DateTime={timeFormatter(el.DataHorario)}
                  CallLocation={el.mensagemOcorrencia}
                  mensagemOcorrencia={el.mensagemOcorrencia}
                  ocurrenceNumber={el.idOcorrencia}
                  Name={el.NomeCompleto.toUpperCase()}
                />
              );
            })
          : filteredData.map((el) => {
              return (
                <OcurrencesCount
                  ocurrenceDate={dateFormatter(el.DataHorario)}
                  key={el.idOcorrencia}
                  Latitude={el.Latitude}
                  Longitude={el.Longitude}
                  DateTime={timeFormatter(el.DataHorario)}
                  CallLocation={el.mensagemOcorrencia}
                  mensagemOcorrencia={el.mensagemOcorrencia}
                  ocurrenceNumber={el.idOcorrencia}
                  Name={el.NomeCompleto.toUpperCase()}
                />
              );
            })}
      </ScrollView>
    </LinearGradient>
  );
};
