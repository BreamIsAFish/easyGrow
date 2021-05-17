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

  // Axios //
  const fetchData = () => {
    netpie
      .get<ReadData>(`/shadow/data`)
      .then(({ data }) => {
        // sensors //
        setTemp(data.data.temperature)
      })
      .catch((response) => {
        console.log(response)
      })
  }

  // useEffect //
  useEffect(() => {
    fetchData()
  }, [temp])

  return (
    // <View style={styles.icon}>
    <View style={globalStyles.header}>
      <Header title={"Temperature"} />
      <View style={globalStyles.content}>
        <Card containerStyle={[globalStyles.outterCard, { borderColor: "#639EF6" }]}>
          <View>
            <Text style={[globalStyles.cardTitle, { color: "#639EF6" }]}>Temperature</Text>
          </View>
          <Card containerStyle={[globalStyles.innerCard, { borderColor: "#639EF6", backgroundColor: "rgba(99, 158, 246, 0.08)" }]}>
            <View style={globalStyles.row}>
              <Icon name="snow" size={200} color="#639EF6" />
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Icon name="thermometer-outline" size={32} color="#639EF6" />
            </View>
          </Card>
          <Text style={[globalStyles.valueText, { color: "#639EF6" }]}>{`${temp} °C`}</Text>
        </Card>
      </View>
      <View style={globalStyles.footer}>
        <Navbar navigation={navigation} page={"TempDisplay"} />
      </View>
    </View>
  )
}

export default TempDisplay
