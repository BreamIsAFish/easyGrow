import React, { FC } from "react"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

const Navbar: FC = () => {
  const icons = [
    { key: 1, name: "Temp", link: "thermometer" },
    { key: 2, name: "Soil Hu", link: "water" },
    { key: 3, name: "Home", link: "leaf" },
    { key: 4, name: "Light", link: "sunny" },
    { key: 5, name: "Help", link: "information-circle" },
  ]
  return (
    <View style={styles.footer}>
      {icons.map((icon) => {
        return (
          <TouchableOpacity>
            <View style={styles.icon}>
              <Icon name={icon.link} size={32} color="grey" />
              <Text style={styles.text}>{icon.name}</Text>
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
