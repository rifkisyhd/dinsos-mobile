import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "../components/LoadingScreen";
import { supabase } from "../../lib/supabaseClient";

export default function ProgramScreen() {
  const router = useRouter();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase.from("tb_program").select("*");
      if (error) {
        console.error("Error fetching data:", error.message);
      } else if (Array.isArray(data)) {
        setPrograms(data);
      }
      setLoading(false);
    };

    fetchPrograms();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Program</Text>
      </View>

      {loading ? (
        <LoadingScreen />
      ) : (
        programs.map((program) => (
          <View key={program.id} style={styles.sectionContainer}>
            <View style={styles.programCard}>
              <View style={styles.programsContainer}>
                <TouchableOpacity
                  style={styles.programItem}
                  onPress={() => router.push(`/program/${program.id}`)}
                >
                  <View style={styles.iconContainer}>
                    <Image
                      source={{ uri: program.image_url }}
                      style={styles.icon}
                    />
                  </View>
                  <Text style={styles.programName}>{program.title}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      )}

      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}
