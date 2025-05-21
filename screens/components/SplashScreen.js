import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Video } from "expo-av";
import { useNavigation, useNavigationState } from "@react-navigation/native";

const SplashScreen = () => {
    const videoRef = useRef(null);
    const navigation = useNavigation();
    const navigationState = useNavigationState((state) => state);
    const [isVideoFinished, setIsVideoFinished] = useState(false);

    useEffect(() => {
        // Tunggu sampai ada navigation state & video selesai
        if (navigationState && isVideoFinished) {
            navigation.replace("Homepage"); // Pindah ke halaman utama
        }
    }, [navigationState, isVideoFinished]);

    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                source={require("../../assets/splash.mp4")}
                style={styles.video}
                resizeMode="cover"
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                    if (status.didJustFinish) {
                        setIsVideoFinished(true);
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
    },
    video: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
});

export default SplashScreen;
