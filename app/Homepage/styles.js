// styles/styles.js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
    position: "absolute",
    zIndex: 1000,
    top: 0,
    left: 25,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 70,
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
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  menuItem: {
    alignItems: "center",
    width: "23%",
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
    marginLeft: 20,
    color: "Black",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonStyle: {
    marginTop: 20,
    padding: 200,
    color: "red",
    backgroundColor: "red",
  },
});
