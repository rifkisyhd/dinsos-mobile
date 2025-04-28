import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        marginVertical: 10,
        color: "#666",
    },
    image: {
        width: "100%",
        height: 200,
        marginBottom: 16,
        borderRadius: 10,
    },
    description: {
        fontSize: 15,
        color: "#444",
        lineHeight: 22,
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontSize: 18,
        color: "red",
    },
});
