import React, { FC, useState, useEffect } from "react"
import { TouchableOpacity, View } from "react-native"
import { netpie } from "../axiosConfig"
import ReadData, { RootStackParamList } from "../interfaces/readInterface"
import Navbar from "./navbar"
import Header from "./header"
import StatusBar from "./statusBar"
import { Props } from "../interfaces/readInterface"
import { globalStyles } from "../styles/globalStyles"

// export default function Home() {
const Home: FC<Props> = ({ navigation }) => {
  // sensor values //
  const [humid, setHumid] = useState<number>(1)
  const [light, setLight] = useState<number>(1)
  const [temperature, setTemperature] = useState<number>(1)
  // page state //
  // const [refresh, setRefresh] = useState<boolean>(false)

  // useEffect //
  const fetchData = () => {
    netpie
      .get<ReadData>(`/shadow/data`)
      .then(({ data }) => {
        // setRefresh(false)
        // sensors //
        setHumid(data.data.humid)
        setLight(data.data.light)
        setTemperature(data.data.temperature)
      })
      .catch((response) => {
        console.log(response)
      })
  }

  useEffect(() => {
    fetchData()
  }, [humid, light, temperature])

  // redirect //
  const redirect = (page: keyof RootStackParamList) => {
    navigation.navigate(page)
  }

  return (
    <View style={globalStyles.header}>
      <Header title={"EasyGrow"} />
      <View style={globalStyles.content}>
        <TouchableOpacity
          onPress={() => {
            redirect("HumidDisplay")
          }}
        >
          <StatusBar type={"Humid"} value={humid} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            redirect("TempDisplay")
          }}
        >
          <StatusBar type={"Temperature"} value={temperature} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            redirect("LightDisplay")
          }}
        >
          <StatusBar type={"Light"} value={light} />
        </TouchableOpacity>
      </View>
      <View style={globalStyles.footer}>
        <Navbar navigation={navigation} />
      </View>
    </View>
  )
}

export default Home
