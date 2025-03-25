import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

export default function ProgramScreen() {
  const router = useRouter();

  const programData = [
    {
      programs: [
        {
          id: 1,
          name: "E-RANTANG BASKOM",
          icon: require("../../assets/images/e-rantang.png"),
        },
        {
          id: 2,
          name: "Sabi Bisa!",
          icon: require("../../assets/images/sabi-bisa.png"),
        },
        {
          id: 3,
          name: "Jelita Manis",
          icon: require("../../assets/images/jelita-manis.png"),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Program</Text>
      </View>

      {programData.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          <View style={styles.programCard}>
            <View style={styles.programsContainer}>
              {section.programs.map((program) => (
                <TouchableOpacity
                  key={program.id}
                  style={styles.programItem}
                  onPress={() => router.push(`/program/${program.id}`)}
                >
                  <View style={styles.iconContainer}>
                    <Image source={program.icon} style={styles.icon} />
                  </View>
                  <Text style={styles.programName}>{program.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      ))}
        <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}
