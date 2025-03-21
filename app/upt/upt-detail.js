import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function UPTDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchLocationDetail = async () => {
      try {
        setLoading(true);
        
        // Fetch location data
        const locationDocRef = doc(db, "upt_locations", id);
        const locationDocSnap = await getDoc(locationDocRef);
        
        if (locationDocSnap.exists()) {
          const locationData = {
            id: locationDocSnap.id,
            ...locationDocSnap.data()
          };
          setLocation(locationData);
          
          // Fetch category data
          const categoryDocRef = doc(db, "upt_categories", locationData.categoryId);
          const categoryDocSnap = await getDoc(categoryDocRef);
          
          if (categoryDocSnap.exists()) {
            setCategoryName(categoryDocSnap.data().name);
          }
        } else {
          console.log("UPT tidak ditemukan!");
          router.back();
        }
      } catch (error) {
        console.error("Error fetching UPT detail: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLocationDetail();
    }
  }, [id]);

  const handleCallPhone = () => {
    if (location?.phone) {
      Linking.openURL(`tel:${location.phone}`);
    }
  };

  const handleOpenMaps = () => {
    if (location?.address) {
      const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(location.address)}`;
      Linking.openURL(mapUrl);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Memuat data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: location?.imageUrl }}
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

      <ScrollView style={styles.content}>
        {/* Title and Category */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{location?.name}</Text>
          <Text style={styles.category}>{categoryName}</Text>
        </View>

        {/* Contact and Location */}
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

        {/* Description */}
        {location?.description && (
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Deskripsi</Text>
            <Text style={styles.description}>{location.description}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#777",
  },
  imageContainer: {
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: 250,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  category: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  infoSection: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f8ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#777",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    marginTop: 2,
  },
  descriptionSection: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#444",
  },
});