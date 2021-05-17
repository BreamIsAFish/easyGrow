import React, { FC, useState, useEffect } from "react"
import { Text, View, StyleSheet, TouchableOpacity, Switch } from "react-native"
import { Card } from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
import { netpie } from "../axiosConfig"
import Header from "./header"
import Navbar from "./navbar"
import ReadData, { Toggle, Devices, Props } from "../interfaces/readInterface"

const HumidDisplay: FC<Props> = ({ navigation }) => {
  // sensor values //
  const [humid, setHumid] = useState<number>(1)
  // on & off //
  const [pump, setPump] = useState<Toggle>("off")
  const [autoPump, setAutoPump] = useState<Toggle>("off")

  // Axios //
  const fetchData = () => {
    netpie
      .get<ReadData>(`/shadow/data`)
      .then(({ data }) => {
        // sensors //
        setHumid(data.data.humid)
        // on & off //
        setPump(data.data.pump)
        setAutoPump(data.data.autoPump)
      })
      .catch((response) => {
        console.log(response)
      })
  }

  const sendData = (type: Devices) => {
    let value: Toggle
    if (type === "pump") value = pump === "on" ? `off` : `on`
    else value = autoPump === "on" ? `off` : `on`
    netpie({
      method: "PUT",
      url: "/message",
      headers: { "content-type": "text/plain" },
      params: {
        topic: type,
      },
      data: value,
    })
      .then(() => {
        console.log(`GOT : ${type} - ${value}`)
        if (type === "pump") setPump(value)
        else setAutoPump(value)
      })
      .catch((response) => {
        console.log(response)
      })
  }

  // useEffect //
  useEffect(() => {
    fetchData()
  }, [humid, pump, autoPump])

  return (
    // <View style={styles.icon}>
    <View style={styles.header}>
      <Header title={"EasyGrow"} />
      <View style={styles.content}>
        <Card>
          <View>
            <Text style={{ fontSize: 18 }}>Press to water your plant</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              sendData("pump")
            }}
          >
            <Card>
              <View style={styles.row}>
                <Icon name="water" size={200} />
              </View>
            </Card>
          </TouchableOpacity>
          <View style={styles.row}>
            <Text style={{ fontSize: 48 }}>100%</Text>
            <Card>
              <Text>Auto Watering</Text>
              <Switch
                onValueChange={() => {
                  sendData("autoPump")
                }}
                value={autoPump === "on"}
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

export default HumidDisplay
