import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "./styles";
import { supabase } from "../../lib/supabaseClient"; // pastikan path ini sesuai struktur project kamu
import LoadingScreen from "../components/LoadingScreen";
import Header from "../components/Header";



export default function PerizinanScreen() {
  const router = useRouter();
  const [perizinanItems, setPerizinanItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerizinanItems = async () => {
      try {
        const { data, error } = await supabase.from("tb_perizinan").select("*");
        if (error) throw error;
        setPerizinanItems(data);
      } catch (error) {
        console.error("Error fetching perizinan items:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPerizinanItems();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#33A9FF" />

      {/* Header tetap tampil */}
       <Header title="Perizinan" backgroundColor="#33A9FF" textColor="white" />

      {/* Jika loading, tampilkan ActivityIndicator */}
      {loading ? (
        // <View style={styles.loadingContainer}>
        //   <ActivityIndicator size="large" color="#33A9FF" />
        // </View>
        <LoadingScreen />
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {perizinanItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.card}
              onPress={() => router.push(`/perizinan-detail/${item.id}`)}
              >
                <View style={styles.cardContent}>
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                  </View>
                  <Image
                    source={{
                      uri: item.image_url || "https://via.placeholder.com/150",
                    }}
                    style={styles.cardImage}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}
