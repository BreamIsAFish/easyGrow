import React from "react"
import { Text, View, StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import Navigator from "./routes/homeStack"
// import Header from "./components/header"
// import Home from "./components/home"

export default function App() {
  return (
    // <View style={styles.container}>
    //   <View style={styles.content}>
    //   <NavigationContainer>
    //     <Navigator />
    //   </NavigationContainer>
    //   </View>
    // </View>
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: 430,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// content: {
//   flex: 1,
//   width: 425,
//   // height: "auto",
//   // backgroundColor: "#fff",
// },
// })
