import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: "#fff",
      flex: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
      textAlign: "center",
    },
    filterRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    filterLabel: {
      width: 80,
      fontSize: 14,
      fontWeight: "bold",
    },
    picker: {
      flex: 1,
      height: 40,
      backgroundColor: "#f0f0f0",
    },
    refreshButton: {
      backgroundColor: "#33A9FF",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      marginVertical: 10,
    },
    refreshButtonText: {
      color: "white",
      fontWeight: "bold",
    },
    row: {
      flexDirection: "row",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: "#ddd",
    },
    cellKabupaten: {
      flex: 2,
      fontSize: 14,
      paddingHorizontal: 5,
    },
    cellNumeric: {
      flex: 1,
      fontSize: 14,
      paddingHorizontal: 5,
      textAlign: "right",
    },
    cellPeriode: {
      flex: 1,
      fontSize: 10,
      paddingHorizontal: 5,
    },
    header: {
      backgroundColor: "#33A9FF",
      paddingVertical: 12,
    },
    headerText: {
      color: "#fff",
      fontWeight: "bold",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      marginTop: 10,
      color: "#666",
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    errorText: {
      color: "red",
      textAlign: "center",
      marginBottom: 15,
    },
    retryButton: {
      backgroundColor: "#33A9FF",
      padding: 10,
      borderRadius: 5,
    },
    retryText: {
      color: "white",
      fontWeight: "bold",
    },
    noDataContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    noDataText: {
      color: "#666",
    },
  });