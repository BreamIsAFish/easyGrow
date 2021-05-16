import { StatusBar } from "expo-status-bar"
import React, { FunctionComponent, useState, useEffect, useCallback } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { netpie } from "../axiosConfig"
import ReadData from "../interfaces/readInterface"

type Devices = "lamp" | "pump" | "autoPump"

// export default function Home() {
const Home: FunctionComponent = () => {
  // sensor values //
  const [humid, setHumid] = useState<number>(1)
  const [light, setLight] = useState<number>(1)
  const [temperature, setTemperature] = useState<number>(1)
  // on & off control //
  const [lamp, setLamp] = useState<"on" | "off">("off")
  const [pump, setPump] = useState<"on" | "off">("off")
  const [autoPump, setAutoPump] = useState<"on" | "off">("off")
  // page state //
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [refresh, setRefresh] = useState<boolean>(false)

  // useEffect //
  const fetchData = () => {
    // console.log("FETCHING....")
    netpie
      .get<ReadData>(`/shadow/data`)
      .then(({ data }) => {
        console.log(data.data)
        setRefresh(false)
        // sensors //
        setHumid(data.data.humid)
        setLight(data.data.light)
        setTemperature(data.data.temperature)
        // on & off //
        setLamp(data.data.lamp)
        setPump(data.data.pump)
        setAutoPump(data.data.autoPump)
      })
      .catch((response) => {
        console.log(response)
      })
  }

  const sendData = (type: Devices) => {
    let value: string
    if (type === "lamp") value = lamp === "on" ? `off` : `on`
    else if (type === "pump") value = pump === "on" ? `off` : `on`
    else value = autoPump === "on" ? `off` : `on`
    console.log(value)
    netpie({
      method: "PUT",
      url: "/message",
      headers: { "content-type": "text/plain" },
      params: {
        topic: type,
      },
      data: value,
    })
      .then((data) => {
        console.log("sent")
        console.log(data)
        setRefresh(true)
      })
      .catch((response) => {
        console.log(response)
      })
  }

  useEffect(() => {
    console.log(refresh)
    if (refresh) fetchData()
  }, [refresh])

  return (
    <View style={styles.container}>
      <Text>Humid : {humid}</Text>
      <Text>Light Level : {light}</Text>
      <Text>Temperature : {temperature}</Text>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => sendData("lamp")}>
        <Text>lamp : {lamp}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default Home
