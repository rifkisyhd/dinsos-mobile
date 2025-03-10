import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useRouter } from "expo-router";

export default function PerizinanScreen() {
    const router = useRouter();

    const services = [
      {
        id: 1,
        title: "Penanganan Orang Terlantar",
        image: require("../../assets/images/pemulangan.png"),
      },
      {
        id: 2,
        title: "Pelayanan Adopsi Anak",
        image: require("../../assets/images/adopsi.png"),
      },
      {
        id: 3,
        title: "Sapa Bansos",
        image: require("../../assets/images/sapabansos.png"),
      },
    ];
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#33A9FF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Layanan</Text>
      </View>
      
     {/* Services List */}
      <View style={styles.content}>
        {services.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
              <Image source={item.image} style={styles.cardImage} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
