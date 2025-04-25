import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Header({
    title = "Judul",
    backgroundColor = "#33A9FF",
    textColor = "white",
    showBack = true,
    centerTitle = false,
}) {
    const router = useRouter();

    return (
        <View
            style={[
                styles.header,
                {
                    backgroundColor,
                    paddingTop:
                        Platform.OS === "android"
                            ? StatusBar.currentHeight + 20
                            : 10,
                },
            ]}>
            {showBack && (
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={textColor} />
                </TouchableOpacity>
            )}
            <Text
                style={[
                    styles.headerTitle,
                    { color: textColor },
                    centerTitle && {
                        position: "absolute",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                    },
                    !centerTitle && { marginLeft: showBack ? 0 : 0 }, // jaga spacing
                ]}>
                {title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.2)",
        position: "relative",
        zIndex: 10,
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
