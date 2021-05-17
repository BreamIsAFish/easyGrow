import React, { FC, useState, useEffect } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Card } from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
import { StatusType } from "../interfaces/readInterface"
import { globalStyles } from "../styles/globalStyles"

const StatusBar: FC<{ type: StatusType; value: number }> = ({ type, value }) => {
  const [icon] = useState<string>(type === "Humid" ? "water-outline" : type === "Light" ? "sunny-outline" : "thermometer-outline")
  const [valueSymbol] = useState<string>(type === "Temperature" ? "°C" : "%")
  const label = {
    Humid: "Soil Humid",
    Temperature: "Temperature",
    Light: "Light Level",
  }

  return (
    <Card containerStyle={styles.root}>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <Card containerStyle={styles.iconCard}>
          <Icon name={icon} size={54} />
        </Card>
        <View style={styles.textField}>
          <Text style={{ fontFamily: "BalooBhai2-SemiBold", fontSize: 18, marginTop: 20 }}>{label[type]}</Text>
          <Text style={styles.valueText}>{`${value} ${valueSymbol}`}</Text>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 10,
    borderWidth: 1,
    borderRadius: 16,
    width: 400,
    justifyContent: "center",
  },
  iconCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 25,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  textField: {
    // marginTop: 20,
    marginLeft: 8,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  valueText: {
    // paddingVertical: 0,
    // marginVertical: 0,
    fontFamily: "BalooBhai2-SemiBold",
    fontSize: 48,
    justifyContent: "flex-end",
    padding: 0,
    margin: 0,
  },
})

export default StatusBar
