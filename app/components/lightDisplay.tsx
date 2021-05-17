import React, { FC, useState, useEffect } from "react"
import { Text, View, StyleSheet, TouchableOpacity, Switch } from "react-native"
import { Card } from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
import { netpie } from "../axiosConfig"
import Header from "./header"
import Navbar from "./navbar"
import ReadData, { Toggle, Devices, Props } from "../interfaces/readInterface"

const LightDisplay: FC<Props> = ({ navigation }) => {
  // sensor values //
  const [light, setLight] = useState<number>(1)
  // on & off //
  const [lamp, setLamp] = useState<Toggle>("off")

  // Axios //
  const fetchData = () => {
    netpie
      .get<ReadData>(`/shadow/data`)
      .then(({ data }) => {
        // sensors //
        setLight(data.data.light)
        // on & off //
        setLamp(data.data.lamp)
      })
      .catch((response) => {
        console.log(response)
      })
  }

  const sendData = () => {
    let value: Toggle = lamp === "on" ? `off` : `on`
    netpie({
      method: "PUT",
      url: "/message",
      headers: { "content-type": "text/plain" },
      params: {
        topic: "lamp",
      },
      data: value,
    })
      .then(() => {
        console.log(`GOT : Lamp - ${value}`)
        setLamp(value)
      })
      .catch((response) => {
        console.log(response)
      })
  }

  // useEffect //
  useEffect(() => {
    fetchData()
  }, [light, lamp])

  return (
    // <View style={styles.icon}>
    <View style={styles.header}>
      <Header title={"Light"} />
      <View style={styles.content}>
        <Card>
          <View>
            <Text style={{ fontSize: 18 }}>Light Intensity</Text>
          </View>
          <Card>
            <View style={styles.row}>
              <Icon name="sunny-outline" size={200} />
            </View>
          </Card>
          <View style={styles.row}>
            <Text style={{ fontSize: 54 }}>{`${light} %`}</Text>
            <Card>
              <Text>Auto Watering</Text>
              <Switch
                onValueChange={() => {
                  sendData()
                }}
                value={lamp === "on"}
              />
            </Card>
          </View>
        </Card>
      </View>
      <View style={styles.footer}>
        <Navbar navigation={navigation} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    // justifyContent: "flex-start",
    alignItems: "center",
    // width: 430,
  },
  content: {
    flex: 1,
    // width: 430,
    paddingTop: 70,
    // alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    // width: 430,
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default LightDisplay
