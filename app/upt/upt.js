import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabaseClient"; // Ganti dengan path sesuai struktur folder kamu
import LoadingScreen from "../components/LoadingScreen";
import Dropdown from "./components/Dropdown";
import Header from "../components/Header";


export default function App() {
  const router = useRouter();

  const [selectedUPT, setSelectedUPT] = useState(null);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Fetch UPT Categories dari Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const { data, error } = await supabase.from("tb_category").select("*");
        if (error) throw error;
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch UPT Locations dari Supabase
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        let query = supabase.from("tb_upt").select("*");

        if (selectedUPT) {
          query = query.eq("category", selectedUPT.id);
          console.log("Selected UPT:", selectedUPT);
        }

        const { data, error } = await query;
        if (error) throw error;

        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        if (isFirstLoad) {
          setTimeout(() => {
            setLoading(false);
            setIsFirstLoad(false);
          }, 1000);
        } else {
          setLoading(false);
        }
      }
    };

    fetchLocations();
  }, [selectedUPT]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#33A9FF" />

      {/* Header */}
       <Header title="UPT (Unit Pelayanan Tugas)" backgroundColor="#33A9FF" textColor="white" />

      {/* Dropdown Kategori */}
      <Dropdown
        selectedUPT={selectedUPT}
        setSelectedUPT={setSelectedUPT}
        categories={categories}
        loading={loading}
      />

      {/* Konten Lokasi */}
      {loading ? (
        <LoadingScreen />
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollViewContent}
          bounces={false} 
          overScrollMode="never" 
        >
          {locations.length > 0 ? (
            <View style={styles.gridContainer}>
              {locations.map((location) => (
                <TouchableOpacity
                  key={location.id}
                  style={styles.card}
                  onPress={() => router.push(`../upt-detail/${location.id}`)}
                >
                  <Image
                    source={{ uri: location.image_url || "https://via.placeholder.com/150" }}
                    style={styles.cardImage}
                    defaultSource={require("../../assets/images/lokasi1.png")}
                  />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardText} numberOfLines={2}>
                      {location.name}
                    </Text>
                    <TouchableOpacity style={styles.openIconContainer}>
                      <Ionicons name="open-outline" size={18} color="white" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Tidak ada lokasi UPT yang tersedia.
              </Text>
            </View>
          )}
        </ScrollView>
      )}

      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}
