import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
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
  
      {/* Bungkus list pakai ScrollView biar bisa scroll jika banyak */}
      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <LoadingScreen />
        ) : (
          programs.map((program) => (
            <TouchableOpacity
              key={program.id}
              style={styles.programCard}
              onPress={() => router.push(`/program/${program.id}`)}
            >
              <Image
                source={{ uri: program.image_url }}
                style={styles.icon}
              />
              <Text style={styles.programName}>{program.title}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
  
}
