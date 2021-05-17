import React, { FC, useState, useEffect } from "react"
import { Text, View, StyleSheet, TouchableOpacity, Switch } from "react-native"
import { Card } from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
import { netpie } from "../axiosConfig"
import Header from "./header"
import Navbar from "./navbar"
import ReadData, { Toggle, Devices, Props } from "../interfaces/readInterface"

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
    <View style={styles.header}>
      <Header title={"Temperature"} />
      <View style={styles.content}>
        <Card containerStyle={styles.outterCard}>
          <View>
            <Text style={styles.cardTitle}>Temperature</Text>
          </View>
          <Card containerStyle={styles.innerCard}>
            <View style={styles.row}>
              <Icon name="snow" size={200} color="#639EF6" />
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Icon name="thermometer-outline" size={24} color="#639EF6" />
            </View>
          </Card>
          <Text style={{ fontSize: 54, color: "#639EF6", paddingLeft: 20 }}>{`${temp} °C`}</Text>
        </Card>
      </View>
      <View style={styles.footer}>
        <Navbar navigation={navigation} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#639EF6",
    paddingLeft: 20,
  },
  header: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    flex: 1,
    // width: 430,
    paddingTop: 60,
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
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  outterCard: {
    padding: 20,
    width: 400,
    borderColor: "#639EF6",
    borderWidth: 1,
    borderRadius: 16,
  },
  innerCard: {
    backgroundColor: "rgba(99, 158, 246, 0.08)",
    borderColor: "#639EF6",
    borderWidth: 1,
    borderRadius: 16,
  },
})

export default TempDisplay
