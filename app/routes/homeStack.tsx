import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import Home from "../components/home"

const screens = {
  Home: {
    screen: Home,
  },
}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)
