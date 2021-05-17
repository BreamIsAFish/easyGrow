import React, { FC, useState, useEffect } from "react"
import { Text, View, StyleSheet, TouchableOpacity, Switch } from "react-native"
import { Card } from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
import { netpie } from "../axiosConfig"
import Header from "./header"
import Navbar from "./navbar"
import ReadData, { Toggle, Devices, Props } from "../interfaces/readInterface"
import { globalStyles } from "../styles/globalStyles"

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
    <View style={globalStyles.header}>
      <Header title={"Soil Humid"} />
      <View style={globalStyles.content}>
        <Card containerStyle={[globalStyles.outterCard, { borderColor: "#4ED4FF" }]}>
          <View>
            <Text style={[globalStyles.cardTitle, { color: "#4ED4FF" }]}>Press to water your plant</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              sendData("pump")
            }}
          >
            <Card containerStyle={[globalStyles.innerCard, { borderColor: "#4ED4FF", backgroundColor: "rgba(78, 212, 255, 0.08)" }]}>
              <View style={globalStyles.row}>
                <Icon name="water" size={200} color="#4ED4FF" />
              </View>
            </Card>
          </TouchableOpacity>
          <View style={globalStyles.row}>
            <Text style={[globalStyles.valueText, { color: "#4ED4FF" }]}>{`${humid} %`}</Text>
            <Card containerStyle={[globalStyles.innerCard, { borderColor: "#4ED4FF" }]}>
              <Text style={[globalStyles.normalText, { color: "#4ED4FF" }]}>Auto Watering</Text>
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
      <View style={globalStyles.footer}>
        <Navbar navigation={navigation} />
      </View>
    </View>
  )
}

export default HumidDisplay
