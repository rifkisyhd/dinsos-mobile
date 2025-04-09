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
          {perizinanItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </View>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.cardImage}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}