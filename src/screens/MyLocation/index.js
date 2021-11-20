import React, { useEffect, useState } from "react";
import { Text, View, Alert, Image, ActivityIndicator } from "react-native";
import Icon from "../../assets/marker.png";
import Icon2 from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/core";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../../components/Button/Button.js";

export default function () {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [coords, setCoords] = useState({
    lat: 0,
    long: 0,
    latDelta: 0,
    longDelta: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      getLocation();
    }, 1000);
  }, []);

  async function CheckIfLocationEnabled() {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Localização do dispositivo desativada.",
        "Para coletar as informações é necessário ativar o serviço de localização do dispositivo.",
        [{ Text: "Ok" }]
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  }

  function getLocation() {
    CheckIfLocationEnabled();
    Location.installWebGeolocationPolyfill();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
        var accuracy = position.coords.accuracy / 2;
        const circumference = 40075;
        const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
        const angularDistance = accuracy / circumference;
        const latitudeDelta = accuracy / oneDegreeOfLongitudeInMeters;
        const longitudeDelta = Math.abs(
          Math.atan2(
            Math.sin(angularDistance) * Math.cos(currentLatitude),
            Math.cos(angularDistance) -
              Math.sin(currentLatitude) * Math.sin(currentLatitude)
          )
        );
        setCoords({
          lat: currentLatitude,
          long: currentLongitude,
          latDelta: latitudeDelta,
          longDelta: longitudeDelta,
        });
      },
      { timeout: 30000, enableHighAccuracy: false, maximumAge: 75000 }
    );
    setIsLoading(false);
  }

  return (
    <LinearGradient
      colors={["#FFC1E3", "#CB2E81"]}
      style={{height: hp(100) }}
    >
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ padding: 24, flexDirection: "row", alignItems: "center" }}
        >
          <Icon2 name={"arrowleft"} size={36} />
          <Text style={{ fontSize: RFPercentage(3), marginLeft: 20 }}>
            {" "}
            Minha Localização
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
      ) : (
        <View style={{height: 100+"%"}}>
          <MapView
            style={{ width: wp(100), height: 70+"%" }}
            region={{
              latitude: coords.lat,
              longitude: coords.long,
              latitudeDelta: coords.latDelta * 0.86,
              longitudeDelta: coords.longDelta * 0.75,
            }}
          >
            <Marker
              coordinate={{
                latitude: coords.lat,
                longitude: coords.long,
              }}
              title={"Minha Localização"}
            >
              <Image source={Icon} />
            </Marker>
          </MapView>
       
        </View>
      )}
    </LinearGradient>
  );
}
