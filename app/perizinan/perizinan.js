import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useRouter } from "expo-router";


export default function PerizinanScreen() {
    const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#33A9FF" />
      
      <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
        >

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perizinan</Text>
      </View>
      
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
              source={require('../../assets/images/surat-pengumpulan-uang.png')} 
              style={styles.cardImage}
            />
          </View>
        </TouchableOpacity>
        
        {/* Card 2 */}
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Rekomendasi</Text>
              <Text style={styles.cardSubtitle}>Pengumpulan Uang atau Barang</Text>
            </View>
            <Image 
              source={require('../../assets/images/rekomendasi-pengumpulan-uang.png')} 
              style={styles.cardImage}
            />
          </View>
        </TouchableOpacity>
        
        {/* Card 3 */}
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Surat</Text>
              <Text style={styles.cardSubtitle}>Tanda Pendaftaran</Text>
            </View>
            <Image 
              source={require('../../assets/images/surat-pendaftaran.png')} 
              style={styles.cardImage}
            />
          </View>
        </TouchableOpacity>

        {/* Card 4 */}
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Surat</Text>
              <Text style={styles.cardSubtitle}>Tanda Pendaftaran</Text>
            </View>
            <Image 
              source={require('../../assets/images/surat-pendaftaran.png')} 
              style={styles.cardImage}
            />
          </View>
        </TouchableOpacity>

        {/* Card 5 */}
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Surat</Text>
              <Text style={styles.cardSubtitle}>Tanda Pendaftaran</Text>
            </View>
            <Image 
              source={require('../../assets/images/surat-pendaftaran.png')} 
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

