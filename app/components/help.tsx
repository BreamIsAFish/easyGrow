import React, { FC } from "react"
import { Text, View, StyleSheet } from "react-native"
// import NetInfo from "@react-native-community/netinfo"
import { Props } from "../interfaces/readInterface"

const Help: FC<Props> = ({ navigation }) => {
  // const [wifiStatus, setWifiStatus] = useState<boolean>(false)

  // const CheckConnectivity = () => {
  //   if (Platform.OS !== "android") {
  //     const unsubscribe = NetInfo.addEventListener((state) => {
  //       if (wifiStatus && !state.isConnected) {
  //         setWifiStatus(false)
  //         console.warn("Internet disconnected")
  //       } else if (!wifiStatus && state.isConnected) {
  //         setWifiStatus(false)
  //         console.warn("Internet connected!")
  //       }
  //     })
  //   }
  // }

  //////
  return (
    <View style={styles.content}>
      <Text style={styles.text}>Go Help Yourself LOL</Text>
    </View>
    // <View>
    //   <Button
    //     onPress={() => CheckConnectivity()}
    //     title="Check Internet Connectivity"
    //     color="#841584"
    //     accessibilityLabel="Learn more about this purple button"
    //   />
    // </View>
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
