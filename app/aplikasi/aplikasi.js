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
        title: "Simlontar Rek",
        image: require("../../assets/images/Logo-Simlontar-Rek.png"),
      },
      {
        id: 2,
        title: "E-JSC",
        image: require("../../assets/images/JSC.png"),
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
        <Text style={styles.headerTitle}>Aplikasi</Text>
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
    <View style={styles.homeIndicator} />
    </SafeAreaView>

  );
}
