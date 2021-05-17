import React, { FC, useState, useEffect } from "react"
import { Text, View, Switch } from "react-native"
import { Card } from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
import { netpie } from "../axiosConfig"
import Header from "./header"
import Navbar from "./navbar"
import ReadData, { Toggle, Props } from "../interfaces/readInterface"
import { globalStyles } from "../styles/globalStyles"

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
    <View style={globalStyles.header}>
      <Header title={"Light"} />
      <View style={globalStyles.content}>
        <Card containerStyle={[globalStyles.outterCard, { borderColor: "#FFC700" }]}>
          <View>
            <Text style={[globalStyles.cardTitle, { color: "#FFC700" }]}>Light Intensity</Text>
          </View>
          <Card containerStyle={[globalStyles.innerCard, { borderColor: "#FFC700", backgroundColor: "rgba(255, 199, 0, 0.08)" }]}>
            <View style={globalStyles.row}>
              <Icon name="sunny-outline" size={200} color="#FFC700" />
            </View>
          </Card>
          <View style={globalStyles.row}>
            <Text style={[globalStyles.valueText, { color: "#FFC700" }]}>{`${light} %`}</Text>
            <Card containerStyle={[globalStyles.innerCard, { borderColor: "#FFC700" }]}>
              <Text style={[globalStyles.normalText, { color: "#FFC700" }]}>Auto Lighting</Text>
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
      <View style={globalStyles.footer}>
        <Navbar navigation={navigation} />
      </View>
    </View>
  )
}

export default LightDisplay
