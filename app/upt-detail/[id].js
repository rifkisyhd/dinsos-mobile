import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { supabase } from "../../lib/supabaseClient";
import { styles } from "./styles";
import LoadingScreen from "../components/LoadingScreen";

export default function UPTDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [location, setLocation] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);

        // Fetch UPT data
        const { data: uptData, error: uptError } = await supabase
          .from("tb_upt")
          .select("*")
          .eq("id", id)
          .single();

        if (uptError) throw uptError;
        setLocation(uptData);

        // Fetch category data
        const { data: categoryData, error: categoryError } = await supabase
          .from("tb_category")
          .select("name")
          .eq("id", uptData.category)
          .single();

        if (categoryError) throw categoryError;
        setCategoryName(categoryData.name);
      } catch (error) {
        console.error("Error fetching UPT detail: ", error);
        router.back();
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);

  const handleCallPhone = () => {
    if (location?.phone) {
      Linking.openURL(`tel:${location.phone}`);
    }
  };

  const handleOpenMaps = () => {
    if (location?.address) {
      const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(
        location.name
      )}`;
      Linking.openURL(mapUrl);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <ScrollView>
      <StatusBar barStyle="dark-content" backgroundColor="#3498db" />
      <SafeAreaView style={styles.container}>
        {/* Gambar UPT */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: location?.image_url || "https://via.placeholder.com/300" }}
            style={styles.headerImage}
            defaultSource={require("../../assets/images/lokasi1.png")}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Konten */}
        <ScrollView style={styles.content}>
          {/* Judul dan Kategori */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{location?.name}</Text>
            <Text style={styles.category}>{categoryName}</Text>
          </View>

          {/* Informasi Telepon dan Alamat */}
          <View style={styles.infoSection}>
            {location?.phone && (
              <TouchableOpacity style={styles.infoItem} onPress={handleCallPhone}>
                <View style={styles.infoIconContainer}>
                  <Ionicons name="call-outline" size={20} color="#3498db" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Telepon</Text>
                  <Text style={styles.infoValue}>{location.phone}</Text>
                </View>
              </TouchableOpacity>
            )}

            {location?.address && (
              <TouchableOpacity style={styles.infoItem} onPress={handleOpenMaps}>
                <View style={styles.infoIconContainer}>
                  <Ionicons name="location-outline" size={20} color="#3498db" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Alamat</Text>
                  <Text style={styles.infoValue}>{location.address}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* Deskripsi */}
          {location?.description && (
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Deskripsi</Text>
              <Text style={styles.description}>{location.description}</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
}
