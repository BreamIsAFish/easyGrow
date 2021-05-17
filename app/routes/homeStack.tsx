// import { createAppContainer } from "react-navigation"
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// import {createStackNavigator} from "react-navigation-stack"
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
// import { StyleSheet } from "react-native"
import Home from "../components/home"
import HumidDisplay from "../components/humidDisplay"
import LightDisplay from "../components/lightDisplay"
import TempDisplay from "../components/tempDisplay"
import Help from "../components/help"

const Stack = createStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HumidDisplay" component={HumidDisplay} />
      <Stack.Screen name="LightDisplay" component={LightDisplay} />
      <Stack.Screen name="TempDisplay" component={TempDisplay} />
      <Stack.Screen name="Help" component={Help} />
    </Stack.Navigator>
  )
}

export default HomeStack
