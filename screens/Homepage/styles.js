// styles/styles.js
// import { main } from "react-devtools";
import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#33A9FF",
    backgroundColor: "#eaeaea",
  },

  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
    position: "absolute",
    zIndex: 1000,
    top: Platform.OS === "ios" ? 0 : 0,
    marginHorizontal: Platform.OS === "ios" ? 15 : 20,
  },
  backgroundImage: {
...StyleSheet.absoluteFillObject,
width: "100%",
height: 300,
  },
  
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: Platform.select({ ios: 70, android: 70 }), 
    position: "relative",
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    borderRadius: 70,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  searchIcon: {
    position: "absolute",
    right: 20,
    top: 3,
  },

   menuContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },


  menuItem: {
    alignItems: "center",
    width: 80, 
    marginRight: 15, // Kasih jarak antar item
  },

  menuContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 70,
    borderRadius: 10,
    marginBottom: 20,
  },
  menuItem: {
    alignItems: "center",
    width: "23%",
    width: 80,
    marginRight: 15,
  },
  iconContainer: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  menuText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  menuText2: {
    marginTop: 20,
    marginLeft: 10,
    color: "Black",
    fontWeight: "600",
    fontSize: 24,
  },
  buttonStyle: {
    marginTop: 20,
    padding: 200,
    color: "red",
    backgroundColor: "red",
  },

  main: {
    flex: 1,
    // backgroundColor: "#eaeaea",
    backgroundColor: "red",
    paddingBottom: 20,
  },
});
