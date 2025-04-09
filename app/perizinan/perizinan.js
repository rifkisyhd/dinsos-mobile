import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase";
import { handleUrlParams } from 'expo-router/build/fork/getStateFromPath-forks';

export default function PerizinanScreen() {
  const router = useRouter();
  const [perizinanItems, setPerizinanItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerizinanItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tb_perizinan"));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPerizinanItems(items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching perizinan items: ", error);
        setLoading(false);
      }
    };

    fetchPerizinanItems();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#33A9FF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#33A9FF" />

 {/* Header */}
 <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Perizinan</Text>
        </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
      >

        {/* Content */}
        <View style={styles.content}>
          {/* Card 1 */}
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Surat Pengumpulan</Text>
                <Text style={styles.cardSubtitle}>Uang atau Barang</Text>
              </View>
              <Image
                source={require("../../assets/images/surat-pengumpulan-uang.png")}
                style={styles.cardImage}
              />
            </View>
          </TouchableOpacity>

          {/* Card 2 */}
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Rekomendasi</Text>
                <Text style={styles.cardSubtitle}>Undian Gratis Berhadiah</Text>
              </View>
              <Image
                source={require("../../assets/images/rekomendasi-pengumpulan-uang.png")}
                style={styles.cardImage}
              />
            </View>
          </TouchableOpacity>

          {/* Card 3 */}
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Surat Rekomendasi</Text>
                <Text style={styles.cardSubtitle}>
                  Pengumpulan Uang Atau Barang
                </Text>
              </View>
              <Image
                source={require("../../assets/images/surat-pendaftaran.png")}
                style={styles.cardImage}
              />
            </View>
          </TouchableOpacity>

          {/* Card 4 */}
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>STP</Text>
                <Text style={styles.cardSubtitle}>
                  Surat Tanda Pendaftaran
                </Text>
              </View>
              <Image
                source={require("../../assets/images/surat-pendaftaran.png")}
                style={styles.cardImage}
              />
            </View>
          </TouchableOpacity>
          
          {/* Card 5 */}
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>STPU</Text>
                <Text style={styles.cardSubtitle}>
                Surat Tanda Pendaftaran Ulang
                </Text>
              </View>
              <Image
                source={require("../../assets/images/surat-pendaftaran.png")}
                style={styles.cardImage}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}