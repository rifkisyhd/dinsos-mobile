import React from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { styles } from "../styles";

const MenuItem = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );
};

const MenuItemsList = () => {
  const router = useRouter();

  const menuItems = [
    {
      id: 1,
      title: "Program",
      icon: <MaterialIcons name="list-alt" size={32} color="gray" />,
      onPress: () => router.push("/program/program"),
    },
    {
      id: 2,
      title: "Layanan",
      icon: <FontAwesome5 name="hands-helping" size={32} color="gray" />,
      onPress: () => router.push("/layanan/layanan"),
    },
    {
      id: 3,
      title: "Perizinan",
      icon: <MaterialIcons name="vpn-key" size={32} color="gray" />,
      onPress: () => router.push("/perizinan/perizinan"),
    },
    {
      id: 4,
      title: "UPT",
      icon: <FontAwesome name="building" size={32} color="gray" />,
      onPress: () => router.push("/upt/upt"),
    },
    {
      id: 5,
      title: "Aplikasi",
      icon: <FontAwesome5 name="mobile-alt" size={32} color="gray" />,
      onPress: () => router.push("/aplikasi/aplikasi"),
    },
    {
      id: 6,
      title: "Pengaduan",
      icon: <FontAwesome name="exclamation-circle" size={32} color="gray" />,
      onPress: () => router.push("/pengaduan/pengaduan"),
    },
  ];

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <MenuItem key={item.id} title={item.title} icon={item.icon} onPress={item.onPress} />
        ))}
      </View>
    </ScrollView>
  );
};

export { MenuItem, MenuItemsList };
