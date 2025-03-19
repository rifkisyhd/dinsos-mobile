import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useRouter } from "expo-router";

// Komponen Dropdown (Pakai Props)
const Dropdown = ({ selectedUPT, setSelectedUPT }) => {
  const [isOpen, setIsOpen] = useState(false);

  // List UPT
  const items = [
    { id: 1, name: "UPT Perlindungan dan Pelayanan Sosial Asuhan Anak" },
    { id: 2, name: "UPT Pelayanan Sosial Tresna Werdha" },
    { id: 3, name: "UPT Pelayanan Sosial Bina Remaja" },
    { id: 4, name: "UPT Perlindungan dan Pelayanan Sosial Asuhan Balita" },
    { id: 5, name: "UPT Peningkatan Tenaga Kesejahteraan Sosial" },
  ];

  const handleSelectItem = (item) => {
    setSelectedUPT(item.name);
    setIsOpen(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedUPT ? selectedUPT : "Pilih UPT"}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={20}
          color="#777"
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownList}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.dropdownListItem}
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

  const locations = [
    {
      id: 1,
      upt: "UPT Perlindungan dan Pelayanan Sosial Asuhan Anak",
      name: "UPT Asuhan Anak Sumenep",
      image: require("../../assets/images/lokasi1.png"),
    },
    {
      id: 2,
      upt: "UPT Perlindungan dan Pelayanan Sosial Asuhan Anak",
      name: "UPT Asuhan Anak Trenggalek",
      image: require("../../assets/images/lokasi1.png"),
    },
    {
      id: 3,
      upt: "UPT Pelayanan Sosial Tresna Werdha",
      name: "UPT Tresna Werdha Surabaya",
      image: require("../../assets/images/lokasi1.png"),
    },
    {
      id: 4,
      upt: "UPT Pelayanan Sosial Tresna Werdha",
      name: "UPT Tresna Werdha Malang",
      image: require("../../assets/images/lokasi1.png"),
    },
    {
      id: 5,
      upt: "UPT Pelayanan Sosial Bina Remaja",
      name: "UPT Bina Remaja Jember",
      image: require("../../assets/images/lokasi1.png"),
    },
    {
      id: 6,
      upt: "UPT Pelayanan Sosial Bina Remaja",
      name: "UPT Bina Remaja Kediri",
      image: require("../../assets/images/lokasi1.png"),
    },
  ];

  // Filter berdasarkan UPT yang dipilih
  const filteredLocations = selectedUPT
    ? locations.filter((loc) => loc.upt === selectedUPT)
    : locations;

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

      {/* <View style={styles.main}> */}
      {/* Dropdown dengan props */}
      <Dropdown selectedUPT={selectedUPT} setSelectedUPT={setSelectedUPT} />

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.gridContainer}>
          {filteredLocations.map((location) => (
            <TouchableOpacity key={location.id} style={styles.card}>
              <Image source={location.image} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardText} numberOfLines={2}>
                  {location.name}
                </Text>
                <TouchableOpacity style={styles.openIconContainer}>
                  <Ionicons name="open-outline" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* </View> */}
       <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}
