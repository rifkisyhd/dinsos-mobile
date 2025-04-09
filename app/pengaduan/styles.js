import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5b8ba6",
  },
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#5b8ba6",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  titleSection: {
    marginBottom: 25,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  reportSection: {
    alignItems: "center",
    marginBottom: 20,
    zIndex: 2,
  },
  laporButtonContainer: {
    backgroundColor: "#fff",
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  laporText: {
    color: "#d32027",
    fontWeight: "bold",
    fontSize: 16,
  },
  webImageContainer: {
    width: "100%",
    height: 150,
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden",
  },
  webImage: {
    width: "100%",
    height: "100%",
  },
  urlContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  urlText: {
    color: "#333",
    fontWeight: "bold",
  },
  orText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  downloadContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 2,
  },
  textSection: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    maxWidth: width * 0.8, // Bisa disesuaikan
  },
  downloadTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "left", // Biar rata kiri
  },
  playStoreButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  playStoreIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  playStoreText: {
    color: "#333",
    fontWeight: "bold",
  },
  imageSection: {
    flex: 1,
    alignItems: "flex-end",
    // paddingLeft: 150,
  },
  appImage: {
    width: 150,
    height: 250,
  },
  redBackgroundTop: {
    position: "absolute",
    top: 200,
    right: -100,
    width: 300,
    height: 250,
    backgroundColor: "#d32027",
    borderRadius: 150,
    transform: [{ rotate: "-30deg" }],
    zIndex: 1,
  },
  redBackgroundBottom: {
    position: "absolute",
    bottom: 50,
    left: -100,
    width: 300,
    height: 250,
    backgroundColor: "#d32027",
    borderRadius: 150,
    transform: [{ rotate: "30deg" }],
    zIndex: 1,
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

  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25D366",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  
  whatsappText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  
});
