import React, { FC } from "react"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Props, RootStackParamList, NavbarItem } from "../interfaces/readInterface"

const Navbar: FC<Props> = ({ navigation }) => {
  const items: NavbarItem = [
    { key: 1, name: "Temp", icon: "thermometer", link: "TempDisplay" },
    { key: 2, name: "Soil Hu", icon: "water", link: "HumidDisplay" },
    { key: 3, name: "Home", icon: "leaf-outline", link: "Home" },
    { key: 4, name: "Light", icon: "sunny", link: "LightDisplay" },
    { key: 5, name: "Help", icon: "information-circle", link: "HumidDisplay" },
  ]

  // redirect //
  const redirect = (page: keyof RootStackParamList) => {
    navigation.navigate(page)
  }

  return (
    <View style={styles.footer}>
      {items.map((item) => {
        return (
          <TouchableOpacity onPress={() => redirect(item.link)} key={item.key}>
            <View style={styles.icon}>
              <Icon name={item.icon} size={32} color="grey" />
              <Text style={styles.text}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    height: 100,
    width: 500,
    paddingVertical: 16,
    backgroundColor: "white",
    borderColor: "grey",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  icon: {
    alignItems: "center",
    paddingHorizontal: 18,
  },
  text: {
    fontSize: 16,
    color: "grey",
  },
})

export default Navbar
