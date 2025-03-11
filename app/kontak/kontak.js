import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {styles} from "./styles";


export default function Kontak() {
    const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>ini Kontak</Text>
    </View>
  );
}
