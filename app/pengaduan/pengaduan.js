import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { router } from "expo-router";

const PengaduanScreen = () => {
  const openWebsite = () => {
    Linking.openURL("https://www.lapor.go.id");
  };

  const openPlayStore = () => {
    Linking.openURL("https://play.google.com/store/apps/details?id=com.lapor");
  };

  const openWhatsApp = () => {
    const phoneNumber = "6281234567890"; // Ganti dengan nomor WhatsApp yang valid
    const message = "Halo, saya ingin mengajukan pengaduan.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pengaduan</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>
              Sampaikan Aspirasi dan Pengaduan
            </Text>
            <Text style={styles.subtitle}>
              Demi Pelayanan Publik Yang Lebih Baik
            </Text>
          </View>

          {/* WhatsApp Section (New Feature) */}
          <Text style={styles.sectionTitle}>AKSES WHATSAPP</Text>

          <View style={styles.reportSection}>
            {/* WhatsApp Button */}
            <TouchableOpacity
              style={styles.whatsappButton}
              onPress={openWhatsApp}
            >
              <Ionicons name="logo-whatsapp" size={24} color="#fff" />
              <Text style={styles.whatsappText}>Hubungi Kami via WhatsApp</Text>
            </TouchableOpacity>
          </View>

          {/* Web Access Section */}
          <Text style={styles.sectionTitle}>AKSES WEB</Text>

          {/* Report Button and Section */}
          <View style={styles.reportSection}>
            <View style={styles.laporButtonContainer}>
              <Text style={styles.laporText}>LAPOR!</Text>
            </View>

            <View style={styles.webImageContainer}>
              <Image
                source={require("../../assets/images/web-lapor.png")}
                style={styles.webImage}
                resizeMode="contain"
              />
            </View>

            <TouchableOpacity onPress={openWebsite}>
              <View style={styles.urlContainer}>
                <Text style={styles.urlText}>https://www.lapor.go.id</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.orText}>Atau</Text>
          </View>

          {/* Download Section */}
          <View style={styles.downloadContainer}>
            <View style={styles.textSection}>
              <Text style={styles.downloadTitle}>
                Download Aplikasinya Di Playstore!
              </Text>

              <TouchableOpacity
                style={styles.playStoreButton}
                onPress={openPlayStore}
              >
                <Image
                  source={require("../../assets/images/logo-playstore.png")}
                  style={styles.playStoreIcon}
                  resizeMode="contain"
                />
                <Text style={styles.playStoreText}>Lapor</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.imageSection}>
              <Image
                source={require("../../assets/images/app-lapor.png")}
                style={styles.appImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Decorative Background */}
          <View style={styles.redBackgroundTop} />
          <View style={styles.redBackgroundBottom} />
        </View>
      </ScrollView>
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
};

export default PengaduanScreen;
