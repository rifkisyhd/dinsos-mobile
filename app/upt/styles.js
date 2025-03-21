import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f5f5f5",
    backgroundColor: "#33A9FF",
  },

  header: {
    backgroundColor: "#33A9FF",
    paddingVertical: Platform.OS === "ios" ? 20 : 25,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },
  backButton: {
    marginRight: 16,
    top: Platform.OS === "ios" ? 0 : 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    top: Platform.OS === "ios" ? 0 : 10,
    // marginHorizontal: Platform.OS === "ios" ? 15 : 20,
  },
  dropdownContainer: {
    padding: 5,
    position: "relative",
    backgroundColor: "#fff",
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 70,
  },
  dropdownButtonText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#333",
  },
  dropdownList: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 100,
    elevation: 3, // Shadow Android
    shadowColor: "#000", // Shadow iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  dropdownListItem: {
    padding: 12,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  dropdownListItemText: {
    fontSize: 16,
    color: "#333",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20, // Add padding at the bottom for better scrolling experience
  },
  gridContainer: {
    padding: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    height: "300%",
  },
  card: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  cardContent: {
    backgroundColor: "#33A9FF",
    padding: 8,
    minHeight: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardText: {
    color: "white",
    fontSize: 12,
    flex: 1,
    flexWrap: "wrap",
  },
  openIconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  homeIndicator: Platform.select({
    ios: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 34,
      backgroundColor: "#f5f5f5",
    },
    android: {}, // Di Android nggak ada style
  }),
  loadingContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
