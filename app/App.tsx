import React, { useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import AppLoading from "expo-app-loading"
import { loadAsync } from "expo-font"
import Navigator from "./routes/homeStack"

const getFonts = async () => {
  await loadAsync({
    "BalooBhai2-Regular": require("./assets/fonts/BalooBhai2-Regular.ttf"),
    "BalooBhai2-Bold": require("./assets/fonts/BalooBhai2-Bold.ttf"),
    "BalooBhai2-SemiBold": require("./assets/fonts/BalooBhai2-SemiBold.ttf"),
  })
}

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  if (isLoading) {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => {
          setIsLoading(false)
        }}
        onError={() => {
          console.log("Error")
        }}
      />
    )
  }
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  )
}
