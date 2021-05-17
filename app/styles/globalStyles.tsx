import { StyleSheet } from "react-native"

export const globalStyles = StyleSheet.create({
  cardTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#639EF6",
    paddingLeft: 20,
  },
  header: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    flex: 1,
    // width: 430,
    paddingTop: 60,
    // alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    // width: 430,
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  row: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  outterCard: {
    padding: 20,
    width: 400,
    borderColor: "#639EF6",
    borderWidth: 1,
    borderRadius: 16,
  },
  innerCard: {
    backgroundColor: "rgba(99, 158, 246, 0.08)",
    borderColor: "#639EF6",
    borderWidth: 1,
    borderRadius: 16,
  },
})
