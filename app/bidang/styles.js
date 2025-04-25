import { StyleSheet, Platform, StatusBar } from "react-native";

export const styles = StyleSheet.create({
    container: {
        // padding: 20,
        backgroundColor: "#fff",
        flexGrow: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: 'white',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
    },
    relatedContainer: {
        marginTop: 16,
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: "#f1f1f1",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    cardText: {
        fontSize: 16,
        color: "#333",
    },
});
