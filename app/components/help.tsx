import React, { FC } from "react"
import { Text, View, StyleSheet } from "react-native"
import { Props } from "../interfaces/readInterface"

const Help: FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.content}>
      <Text style={styles.text}>Go Help Yourself LOL</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "BalooBhai2-Regular",
    fontSize: 16,
    color: "grey",
  },
})

export default Help
