import React from "react"
import { Text, View, StyleSheet } from "react-native"
// import Navigator from "./routes/homeStack"
import Home from "./components/home"

export default function App() {
  // return <Navigator />
  // return
  return (
    <View style={styles.container}>
      <Home />
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
