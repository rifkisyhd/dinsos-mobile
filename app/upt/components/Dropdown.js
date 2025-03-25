import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles"; // Sesuaikan path kalau beda folder
import LoadingScreen from "../../components/LoadingScreen"; // Sesuaikan path kalau beda folder

const Dropdown = ({ selectedUPT, setSelectedUPT, categories, loadingCategories }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (loadingCategories) {
    return <LoadingScreen />; // Tampilkan loading jika masih loading kategori
  }

  const handleSelectItem = (item) => {
    setSelectedUPT(item);
    setIsOpen(false); // Tutup dropdown setelah memilih item
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsOpen(!isOpen)}
        disabled={loadingCategories} // Disable jika masih loading
      >
        <Text style={styles.dropdownButtonText}>
          {selectedUPT ? selectedUPT.name : "Pilih UPT"}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={20}
          color="#777"
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownList}>
          <TouchableOpacity
            style={styles.dropdownListItem}
            onPress={() => handleSelectItem(null)}
          >
            <Text style={styles.dropdownListItemText}>Semua UPT</Text>
          </TouchableOpacity>

          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.dropdownListItem,
                selectedUPT?.id === item.id && { backgroundColor: "#ddd" },
              ]}
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

export default Dropdown;
