import React, { FC, useState, useEffect } from "react"
import { Text, View } from "react-native"
import { Card } from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
import { netpie } from "../axiosConfig"
import Header from "./header"
import Navbar from "./navbar"
import ReadData, { Props } from "../interfaces/readInterface"
import { globalStyles } from "../styles/globalStyles"

const TempDisplay: FC<Props> = ({ navigation }) => {
  // sensor values //
  const [temp, setTemp] = useState<number>(1)
  // page state
  const [refresh, setRefresh] = useState<boolean>(false)

  // Axios //
  const fetchData = () => {
    netpie
      .get<ReadData>(`/shadow/data`)
      .then(({ data }) => {
        setRefresh(false)
        // sensors //
        setTemp(data.data.temperature)
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
    // <View style={styles.icon}>
    <View style={globalStyles.header}>
      <Header title={"Temperature"} setRefresh={setRefresh} />
      <View style={globalStyles.content}>
        <Card containerStyle={[globalStyles.outterCard, { borderColor: "#01B636" }]}>
          <Text style={[globalStyles.cardTitle, { color: "#01B636" }]}>Temperature</Text>
          <Card containerStyle={[globalStyles.innerCard, { borderColor: "#01B636", backgroundColor: "rgba(1, 182, 54, 0.08)" }]}>
            <Icon name="thermometer-outline" size={200} color="#01B636" />
            {/* <View style={{ alignItems: "flex-end" }}>
              <Icon name="thermometer-outline" size={32} color="#01B636" />
            </View> */}
          </Card>
          <Text style={[globalStyles.valueText, { color: "#01B636" }]}>{`${temp} °C`}</Text>
        </Card>
      </View>
      <View style={globalStyles.footer}>
        <Navbar navigation={navigation} page={"TempDisplay"} />
      </View>
    </View>
  )
}

export default TempDisplay
