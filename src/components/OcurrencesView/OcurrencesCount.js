import React from "react";
import { View, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export default ({
  Latitude,
  Longitude,
  DateTime,
  CallLocation,
  mensagemOcorrencia,
  ocurrenceNumber,
  Name,
  ocurrenceDate
}) => {
  return (
    <View
      style={{
        width: 80 + "%",
        alignSelf: "center",
        backgroundColor: "rgba(196, 196, 196, 0.66)",
        borderRadius: 10,
        marginBottom: 20,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: 50 + "%",
            padding: 8,
            paddingBottom: 2,
            paddingTop: 2,
            borderBottomWidth: 3,
            borderRightWidth: 3,
          }}
        >
          <Text
            style={{
              alignSelf: "flex-start",
              fontSize: RFPercentage(1.5),
              color: "white",
            }}
          >
            Número da ocorrência:
          </Text>
          <Text style={{ alignSelf: "center" }}>{ocurrenceNumber}</Text>
        </View>
        <View
          style={{
            width: 50 + "%",
            padding: 8,
            paddingBottom: 2,
            paddingTop: 2,
            borderBottomWidth: 3,
          }}
        >
          <Text
            style={{
              alignSelf: "flex-start",
              fontSize: RFPercentage(1.5),
              color: "white",
            }}
          >
            Data de registro:
          </Text>
          <Text style={{ alignSelf: "center" }}>{ocurrenceDate}</Text>
        </View>
      </View>

      <View
        style={{
          width: 100 + "%",
          padding: 8,
          paddingBottom: 2,
          paddingTop: 2,
          borderBottomWidth: 3,
        }}
      >
        <Text
          style={{
            alignSelf: "flex-start",
            fontSize: RFPercentage(1.5),
            color: "white",
          }}
        >
          Nome completo:
        </Text>
        <Text style={{ alignSelf: "center" }}>{Name}</Text>
      </View>

      <View
        style={{
          width: 100 + "%",
          padding: 8,
          paddingBottom: 20,
          paddingTop: 2,
        }}
      >
        <Text
          style={{
            alignSelf: "flex-start",
            fontSize: RFPercentage(1.5),
            color: "white",
          }}
        >
          Registro:
        </Text>
        {mensagemOcorrencia == "Panico" ? (
          <>
            <View
              style={{
                alignSelf: "center",
                width: 80 + "%",
                alignItems: "center",
              }}
            >
              <Text style={{ marginBottom: 10 }}>
                Botão de pânico acionado:
              </Text>
              <Text>Localização:</Text>
              <Text>Latitude: {Latitude}</Text>
              <Text>Longitude: {Longitude}</Text>
              <Text>Efetuada às {DateTime}</Text>
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                alignSelf: "center",
                width: 100 + "%",
                alignItems: "center",
              }}
            >
              <Text style={{ marginBottom: 10 }}>Ligação efetuada para:</Text>
              <Text style={{marginBottom: 10, fontWeight: "bold"}}>{CallLocation}</Text>
              <Text>Efetuada às {DateTime}</Text>
            </View>
          </>
        )}
      </View>
    </View> // View Final
  );
};
