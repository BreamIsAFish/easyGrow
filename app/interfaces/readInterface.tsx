import { StackNavigationProp } from "@react-navigation/stack"

export default interface ReadData {
  data: {
    autoPump: "on" | "off"
    pump: "on" | "off"
    lamp: "on" | "off"
    humid: number
    light: number
    temperature: number
  }
}

// Type //
export type StatusType = "Humid" | "Temperature" | "Light"
export type Devices = "lamp" | "pump" | "autoPump"
export type Toggle = "on" | "off"
export type NavbarItem = { key: number; name: string; icon: string; link: keyof RootStackParamList }[]

export type RootStackParamList = {
  Home: undefined
  HumidDisplay: undefined
  LightDisplay: undefined
  TempDisplay: undefined
  Help: undefined
  // Page: { page: "Humid" | "Temperature" | "Light" | "Other" }
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>
export type Props = {
  navigation: ProfileScreenNavigationProp
}

export type NavProps = {
  page: keyof RootStackParamList
  navigation: ProfileScreenNavigationProp
}
