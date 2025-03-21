import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import { db } from "../../firebase"; // Sesuaikan path ke file firebase.js
import { collection, getDocs, query, where } from "firebase/firestore";

// Komponen Dropdown dengan Data dari Firebase
const Dropdown = ({ selectedUPT, setSelectedUPT, categories, loading }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectItem = (item) => {
    setSelectedUPT(item);
    setIsOpen(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsOpen(!isOpen)}
        disabled={loading}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedUPT ? selectedUPT.name : "Pilih UPT"}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={20}
          color="#777"
        />
      </TouchableOpacity>
  
      {isOpen && (
        <View style={styles.dropdownList}>
          {/* Tambahkan opsi "Pilih UPT" di paling atas */}
          <TouchableOpacity
            style={styles.dropdownListItem}
            onPress={() => handleSelectItem(null)} // Reset pilihan
          >
            <Text style={styles.dropdownListItemText}>Semua UPT</Text>
          </TouchableOpacity>
  
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.dropdownListItem,
                selectedUPT?.id === item.id && { backgroundColor: "#ddd" }
              ]}
              onPress={() => handleSelectItem(item)}
            >
              <Text style={styles.dropdownListItemText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Komponen Utama
export default function App() {
  const router = useRouter();

  const [selectedUPT, setSelectedUPT] = useState(null);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch UPT Categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
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
        setLoading(false);
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

      {/* Dropdown dengan props */}
      <View style={styles.dropdownContainer}>
        <Dropdown
          selectedUPT={selectedUPT}
          setSelectedUPT={setSelectedUPT}
          categories={categories}
          loading={loading}
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* grid container */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3498db" />
            <Text style={styles.loadingText}>Memuat data...</Text>
          </View>
        ) : (
          <View style={styles.gridContainer}>
            {locations.length > 0 ? (
              locations.map((location) => (
                <TouchableOpacity
                  key={location.id}
                  style={styles.card}
                  onPress={() => router.push(`/upt-detail/${location.id}`)}
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
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  Tidak ada lokasi UPT yang tersedia.
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}
