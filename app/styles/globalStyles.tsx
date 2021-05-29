import { StyleSheet } from "react-native"

export const globalStyles = StyleSheet.create({
  cardTitle: {
    fontFamily: "BalooBhai2-Bold",
    fontSize: 28,
    fontWeight: "900",
    paddingLeft: 30,
  },
  valueText: {
    fontFamily: "BalooBhai2-SemiBold",
    fontSize: 72,
    paddingLeft: 30,
  },
  normalText: {
    fontFamily: "BalooBhai2-Regular",
    fontSize: 24,
  },
  header: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingTop: 100,
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  row: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  outterCard: {
    paddingHorizontal: 0,
    paddingTop: 10,
    width: 400,
    borderWidth: 1,
    borderRadius: 16,
  },
  innerCard: {
    borderWidth: 1,
    borderRadius: 16,
    marginVertical: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
})
