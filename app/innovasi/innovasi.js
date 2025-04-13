import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  // SafeAreaView,
  ScrollView,
  Linking,
  ActivityIndicator,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

import LoadingScreen from "../components/LoadingScreen";

const InnovationScreen = () => {
  const [innovationItems, setInnovationItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInnovationItems = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "tb_inovasi"));
        
        if (querySnapshot.empty) {
          setError("Tidak ada data inovasi ditemukan");
        } else {
          const items = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          console.log("Fetched Inovasi Items:", items);
          
          setInnovationItems(items);
        }
      } catch (error) {
        console.error("Error fetching inovasi items: ", error);
        
        setError(`Gagal mengambil data: ${error.message}`);
        
        Alert.alert(
          "Error Pengambilan Data", 
          `Tidak dapat mengambil data inovasi: ${error.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInnovationItems();
  }, []);

  // Render loading
  if (loading) {
    return (
      // <SafeAreaView style={styles.container}>
      //   <ActivityIndicator size="large" color="#33A9FF" />
      // </SafeAreaView>
      < LoadingScreen />
    );
  }

  // Render error
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inovasi</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.gridContainer}>
          {innovationItems.length === 0 ? (
            <Text style={{textAlign: 'center', marginTop: 20}}>
              Tidak ada data inovasi
            </Text>
          ) : (
            innovationItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => item.onclick && Linking.openURL(item.onclick)}
              >
                <View style={styles.cardContent}>
                  <View style={styles.iconContainer}>
                    <Image 
                      source={{ uri: item.icon }} 
                      style={styles.icon} 
                      onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
                    />
                  </View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </View>

                {/* icon */}
                {item.onclick && (
                  <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => Linking.openURL(item.onclick)}
                  >
                    <Ionicons name="open-outline" size={20} color="white" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InnovationScreen;