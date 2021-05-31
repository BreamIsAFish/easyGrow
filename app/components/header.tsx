import React, { FC } from "react"
import { Text, View, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

type HeaderProps = { title: string; setRefresh: React.Dispatch<React.SetStateAction<boolean>> }

const Header: FC<HeaderProps> = ({ title, setRefresh }) => {
  return (
    <View style={styles.header}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Icon
        name="refresh"
        size={28}
        color="white"
        onPress={() => {
          setRefresh(true)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 0.3,
    height: 100,
    width: 500,
    paddingTop: 20,
    backgroundColor: "#01B636",
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontFamily: "BalooBhai2-Bold",
    fontSize: 36,
    color: "white",
  },
  titleBox: {
    justifyContent: "center",
  },
})

export default Header
