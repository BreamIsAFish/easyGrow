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

export type StatusType = "Humid" | "Temperature" | "Light"
