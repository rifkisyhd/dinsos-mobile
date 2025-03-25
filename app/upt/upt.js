import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import { db } from "../../firebase"; // Sesuaikan path ke file firebase.js
import { collection, getDocs, query, where } from "firebase/firestore";
import LoadingScreen from "../components/LoadingScreen";
import Dropdown from "./components/Dropdown";

export default function App() {
  const router = useRouter();

  const [selectedUPT, setSelectedUPT] = useState(null);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Fetch UPT Categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true); // Tampilkan loading sebelum fetch
      try {
        const categoriesCollection = collection(db, "upt_categories");
        const categorySnapshot = await getDocs(categoriesCollection);
        const categoryList = categorySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      } finally {
        setLoadingCategories(false); // Matikan loading setelah selesai
      }
    };

    fetchCategories();
  }, []);

  // Fetch UPT Locations from Firebase
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        let locationsQuery;
        if (selectedUPT) {
          // Filter by selected UPT
          locationsQuery = query(
            collection(db, "upt_locations"),
            where("categoryId", "==", selectedUPT.id)
          );
        } else {
          // Get all locations
          locationsQuery = collection(db, "upt_locations");
        }

        const locationSnapshot = await getDocs(locationsQuery);
        const locationList = locationSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLocations(locationList);
      } catch (error) {
        console.error("Error fetching locations: ", error);
      } finally {
        if (isFirstLoad) {
          setTimeout(() => {
            setLoading(false);
            setIsFirstLoad(false); // Setelah fetch pertama, set false biar next fetch langsung
          }, 1000);
        } else {
          setLoading(false); // Fetch berikutnya langsung tanpa delay
        }
      }
    };

    fetchLocations();
  }, [selectedUPT]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#3498db" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>UPT</Text>
      </View>

      {/* Dropdown dengan loading state */}
      <Dropdown
        selectedUPT={selectedUPT}
        setSelectedUPT={setSelectedUPT}
        categories={categories}
        loading={loading}
      />

      {/* Kalau masih loading, tampilkan LoadingScreen, kalau udah selesai, tampilkan konten */}
      {loading ? (
        <LoadingScreen />
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollViewContent}
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
                    source={{ uri: location.imageUrl }}
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
