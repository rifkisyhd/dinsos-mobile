import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useRouter } from "expo-router";

export default function App() {
const router = useRouter();

  const services = [
    {
      id: 1,
      title: "Penanganan Orang Terlantar",
      image: require("../../assets/images/pemulangan.png"),
    },
    {
      id: 2,
      title: "Pelayanan Adopsi Anak",
      image: require("../../assets/images/adopsi.png"),
    },
    {
      id: 3,
      title: "Sapa Bansos",
      image: require("../../assets/images/sapabansos.png"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Layanan</Text>
      </View>

      {/* Services List */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {services.map((service) => (
          <TouchableOpacity key={service.id} style={styles.card}>
            <ImageBackground
              source={service.image}
              style={styles.cardBackground}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay} />
              <Text style={styles.cardTitle}>{service.title}</Text>
              <TouchableOpacity style={styles.menuButton}>
                <Ionicons name="ellipsis-vertical" size={24} color="white" />
              </TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}


