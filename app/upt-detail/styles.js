import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      marginTop: 10,
      color: "#777",
    },
    imageContainer: {
      position: "relative",
    },
    headerImage: {
      width: "100%",
      height: 250,
    },
    backButton: {
      position: "absolute",
      top: 16,
      left: 16,
      backgroundColor: "rgba(0,0,0,0.3)",
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      flex: 1,
      padding: 16,
    },
    titleContainer: {
      marginBottom: 16,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#333",
    },
    category: {
      fontSize: 16,
      color: "#666",
      marginTop: 4,
    },
    infoSection: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 16,
      marginBottom: 16,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    infoItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    infoIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#f0f8ff",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    infoTextContainer: {
      flex: 1,
    },
    infoLabel: {
      fontSize: 14,
      color: "#777",
    },
    infoValue: {
      fontSize: 16,
      color: "#333",
      marginTop: 2,
    },
    descriptionSection: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 16,
      marginBottom: 16,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 12,
      color: "#333",
    },
    description: {
      fontSize: 15,
      lineHeight: 24,
      color: "#444",
    },
  });