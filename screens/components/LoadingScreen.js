import { useRef, React, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const LoadingScreen = () => {

    const animationRef = useRef(null);

    useEffect(() => {
      animationRef.current?.play();
    }, []);
  

  return (
    <View style={styles.container}>
       <LottieView
        ref={animationRef}
        source={require("../../assets/images/loading.json")} 
        autoPlay
        loop
        style={{ width: 100, height: 100 }}
      />
      <Text style={styles.text}>Memuat Data...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#3498db",
  },
});

export default LoadingScreen;
