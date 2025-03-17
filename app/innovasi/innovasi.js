import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { router } from "expo-router";

const innovationItems = [
  {
    id: 1,
    title: "Janeta MU",
    icon: require("../../assets/images/logo-janeta.png"),
  },
  {
    id: 2,
    title: "Si Jelita Manis",
    icon: require("../../assets/images/logo-jelita.png"),
    onclick: () => Linking.openURL("https://taplink.cc/sijelitamanis"),
  },
  {
    id: 3,
    title: "BOMBASTIS",
    icon: require("../../assets/images/e-PSKS.png"),
  },
  {
    id: 4,
    title: "Sabi Bisa!",
    icon: require("../../assets/images/sabi-bisa.png"),
    onclick: () =>
      Linking.openURL("https://sites.google.com/view/sabibisagallery"),
  },
  {
    id: 5,
    title: "Niat Tangkas",
    icon: require("../../assets/images/logo-tangkas.png"),
  },
  {
    id: 6,
    title: "Tuli Mengaji",
    icon: require("../../assets/images/logo-mengaji.png"),
  },
  {
    id: 7,
    title: "LADANGKU",
    icon: require("../../assets/images/logo-mengaji.png"),
  },
  {
    id: 8,
    title: "GADISKU",
    icon: require("../../assets/images/logo-gadisku.png"),
  },
];

const InnovationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#e6f0f5" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inovasi</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.gridContainer}>
          {innovationItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => item.onclick?.()}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Image source={item.icon} style={styles.icon} />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>


              {/* icon */}
              {item.onclick && (
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => item.onclick?.()}
                >
                  <Ionicons name="open-outline" size={20} color="white" />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InnovationScreen;
