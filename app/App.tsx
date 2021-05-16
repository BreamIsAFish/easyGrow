import React from "react"
import { Text, View, StyleSheet } from "react-native"
import { StatusBar } from "expo-status-bar"
// import Navigator from "./routes/homeStack"
import Home from "./components/home"

export default function App() {
  // return <Navigator />
  return <Home />
  // return (
  //   <View style={styles.container}>
  //     <Text>FUCK</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
