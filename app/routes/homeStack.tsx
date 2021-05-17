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

// const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

// const screens = {
//   Home: {
//     screen: Home,
//   },
//   HumidDisplay: {
//     screen: HumidDisplay,
//   },
// }

// const NavTap = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="HumidDisplay" component={HumidDisplay} />
//     </Tab.Navigator>
//   )
// }

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HumidDisplay" component={HumidDisplay} />
      <Stack.Screen name="LightDisplay" component={LightDisplay} />
      <Stack.Screen name="TempDisplay" component={TempDisplay} />
    </Stack.Navigator>
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
// })

// const HomeStack = createStackNavigator(screens)

export default HomeStack
// export default createAppContainer(NavTap)
