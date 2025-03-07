import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { styles } from "./styles";
import { useRouter } from "expo-router";

export default function Aplikasi() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Pengaduan</Text>
    </View>
  );
}
