import React, { FC } from "react"
import { Text, View, StyleSheet } from "react-native"

const Header: FC<{ title: string }> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    width: 500,
    paddingTop: 20,
    backgroundColor: "#01B636",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "BalooBhai2-Bold",
    fontSize: 36,
    color: "white",
  },
})

export default Header
