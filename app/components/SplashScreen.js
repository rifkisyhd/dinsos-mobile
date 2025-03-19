import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Video } from "expo-av";
import { useRouter, useRootNavigationState } from "expo-router";

const SplashScreen = () => {
  const videoRef = useRef(null);
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const [isVideoFinished, setIsVideoFinished] = useState(false);

  useEffect(() => {
    // Tunggu sampai RootLayout siap & video selesai
    if (navigationState?.key && isVideoFinished) {
      router.replace("../Homepage/HomeScreen"); // Pindah ke halaman utama
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
            setIsVideoFinished(true); // Tandai kalau video sudah selesai
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
