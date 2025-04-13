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
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
// import MapView, { Marker } from "react-native-maps";
import { styles } from "./styles";
import LoadingScreen from "../components/LoadingScreen";


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
            ...locationDocSnap.data(),
          };
          setLocation(locationData);

          // Fetch category data
          const categoryDocRef = doc(
            db,
            "upt_categories",
            locationData.categoryId
          );
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
      const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(
        location.name
      )}`;
      Linking.openURL(mapUrl);
    }
  };

  if (loading) {
    return (
        <LoadingScreen />
    );
  }

  return (
    <ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="#3498db" />

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
              <TouchableOpacity
                style={styles.infoItem}
                onPress={handleCallPhone}
              >
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
              <TouchableOpacity
                style={styles.infoItem}
                onPress={handleOpenMaps}
              >
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
          {/* Menampilkan Peta */}
          {/* {location?.latitude && location?.longitude && (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              provider="google"
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title={location.name}
                description={location.address}
              />
            </MapView>
          </View>
        )} */}

          {/* Description */}
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
