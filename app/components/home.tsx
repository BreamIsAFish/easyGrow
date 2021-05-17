import React, { FC, useState, useEffect } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { netpie } from "../axiosConfig"
import ReadData from "../interfaces/readInterface"
import Navbar from "./navbar"
import Header from "./header"
import StatusBar from "./statusBar"
import { Toggle, Props } from "../interfaces/readInterface"

// export default function Home() {
const Home: FC<Props> = ({ navigation }) => {
  // sensor values //
  const [humid, setHumid] = useState<number>(1)
  const [light, setLight] = useState<number>(1)
  const [temperature, setTemperature] = useState<number>(1)
  // on & off control //
  // const [lamp, setLamp] = useState<Toggle>("off")
  // const [pump, setPump] = useState<Toggle>("off")
  // const [autoPump, setAutoPump] = useState<Toggle>("off")
  // page state //
  // const [isLoading, setIsLoading] = useState<boolean>(true)
  const [refresh, setRefresh] = useState<boolean>(false)

  // useEffect //
  const fetchData = () => {
    // console.log("FETCHING....")
    netpie
      .get<ReadData>(`/shadow/data`)
      .then(({ data }) => {
        setRefresh(false)
        // sensors //
        setHumid(data.data.humid)
        setLight(data.data.light)
        setTemperature(data.data.temperature)
        // on & off //
        // setLamp(data.data.lamp)
        // setPump(data.data.pump)
        // setAutoPump(data.data.autoPump)
      })
      .catch((response) => {
        console.log(response)
      })
  }

  // const sendData = (type: Devices) => {
  //   let value: Toggle
  //   if (type === "lamp") value = lamp === "on" ? `off` : `on`
  //   else if (type === "pump") value = pump === "on" ? `off` : `on`
  //   else value = autoPump === "on" ? `off` : `on`
  //   netpie({
  //     method: "PUT",
  //     url: "/message",
  //     headers: { "content-type": "text/plain" },
  //     params: {
  //       topic: type,
  //     },
  //     data: value,
  //   })
  //     .then(() => {
  //       if (type === "lamp") setLamp(value)
  //       else if (type === "pump") setPump(value)
  //       else setAutoPump(value)
  //     })
  //     .catch((response) => {
  //       console.log(response)
  //     })
  // }

  useEffect(() => {
    // if (refresh) fetchData()
    fetchData()
  }, [humid, light, temperature])

  // redirect //
  // const directHumid = () => {
  //   navigation.navigate("HumidDisplay")
  // }

  return (
    <View style={styles.header}>
      <Header title={"EasyGrow"} />
      <View style={styles.content}>
        <TouchableOpacity
        // onPress={() => {
        //   console.log("pressed")
        //   directHumid()
        // }}
        >
          <StatusBar type={"Humid"} value={humid} />
        </TouchableOpacity>
        <TouchableOpacity>
          <StatusBar type={"Temperature"} value={temperature} />
        </TouchableOpacity>
        <TouchableOpacity>
          <StatusBar type={"Light"} value={light} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => sendData("lamp")}>
        <Text>lamp : {lamp}</Text>
      </TouchableOpacity> */}
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
})

export default Home
