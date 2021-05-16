import React, { FC, useState, useEffect } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Card } from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
import { StatusType } from "../interfaces/readInterface"

const StatusBar: FC<{ type: StatusType; value: number }> = ({ type, value }) => {
  const [icon] = useState<string>(type === "Humid" ? "water-outline" : type === "Light" ? "sunny-outline" : "thermometer-outline")
  const [valueSymbol] = useState<string>(type === "Temperature" ? "°C" : "%")
  const label = {
    Humid: "Soil Humid",
    Temperature: "Temperature",
    Light: "Light Level",
  }

  return (
    <TouchableOpacity>
      <Card>
        <View style={styles.root}>
          <Card>
            <Icon name={icon} size={56} />
          </Card>
          <View style={styles.textField}>
            <Text>{label[type]}</Text>
            <Text style={styles.valueText}>{`${value} ${valueSymbol}`}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    width: 350,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: 2,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  valueText: {
    fontSize: 48,
    fontWeight: "bold",
    marginTop: 4,
  },
})

export default StatusBar
