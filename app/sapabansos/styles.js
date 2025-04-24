import { StyleSheet, Platform, StatusBar } from "react-native";
export const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
        flex: 1,
    },
    title: {
        paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight + 20 : 40,
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
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
        height: 50,
        backgroundColor: "#f0f0f0",
        color: "#000",
        // backgroundColor: "red", // biar kelihatan
        // color: "green", // teks jadi hitam
        // height: 50,
        // borderRadius: 8,
        // marginBottom: 10,
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
    headerCell: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sortIndicator: {
        fontSize: 14,
        marginLeft: 4,
    },
});
