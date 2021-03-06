import React, { FC, useState, useEffect } from "react"
import { Text, View, TouchableOpacity } from "react-native"
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
  // page state
  const [refresh, setRefresh] = useState<boolean>(false)

  // Axios //
  const fetchData = () => {
    netpie
      .get<ReadData>(`/shadow/data`)
      .then(({ data }) => {
        setRefresh(false)
        // sensors //
        setLight(Math.min(data.data.light, 100))
        // on & off //
        setLamp(data.data.lamp)
      })
      .catch((response) => {
        console.error("Unable to connect to netpie")
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
        console.error("Unable to connect to netpie")
        console.log(response)
      })
  }

  // useEffect //
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (refresh) fetchData()
  }, [refresh])

  return (
    <View style={globalStyles.header}>
      <Header title={"Light"} setRefresh={setRefresh} />
      <View style={globalStyles.content}>
        <Card containerStyle={[globalStyles.outterCard, { borderColor: "#FFC700" }]}>
          <Text style={[globalStyles.cardTitle, { color: "#FFC700" }]}>Light Intensity</Text>
          <TouchableOpacity
            onPress={() => {
              sendData()
            }}
          >
            <Card containerStyle={[globalStyles.innerCard, { borderColor: "#FFC700", backgroundColor: "rgba(255, 199, 0, 0.08)" }]}>
              <Icon name="sunny-outline" size={200} color="#FFC700" />
            </Card>
          </TouchableOpacity>
          {/* <View style={globalStyles.row}> */}
          <Text style={[globalStyles.valueText, { color: "#FFC700" }]}>{`${light} %`}</Text>
          {/* <Card containerStyle={[globalStyles.innerCard, { borderColor: "#FFC700" }]}>
              <Switch
                onValueChange={(value) => {
                  sendData()
                }}
                value={lamp === "on"}
              />
              <Text style={[globalStyles.normalText, { color: "#FFC700" }]}>Auto Lighting</Text>
            </Card> */}
          {/* </View> */}
        </Card>
      </View>
      <View style={globalStyles.footer}>
        <Navbar navigation={navigation} page={"LightDisplay"} />
      </View>
    </View>
  )
}

export default LightDisplay
