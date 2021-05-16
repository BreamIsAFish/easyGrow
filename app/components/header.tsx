import React, { FC } from "react"
import { Text, View, StyleSheet } from "react-native"

const Header: FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>EasyGrow</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 120,
    width: 500,
    paddingTop: 40,
    backgroundColor: "#01B636",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    color: "white",
  },
})

export default Header
