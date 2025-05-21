import React from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
    const navigation = useNavigation();

    const menuItems = [
        {
            id: 1,
            title: "Program",
            icon: <MaterialIcons name="list-alt" size={32} color="gray" />,
            onPress: () => navigation.navigate("Program"),
        },
        {
            id: 2,
            title: "Innovasi",
            icon: <MaterialIcons name="lightbulb" size={32} color="gray" />,
            onPress: () => navigation.navigate("Inovasi"),
        },
        {
            id: 3,
            title: "Layanan",
            icon: <FontAwesome5 name="hands-helping" size={32} color="gray" />,
            onPress: () => navigation.navigate("Layanan"),
        },
        {
            id: 4,
            title: "Perizinan",
            icon: <MaterialIcons name="vpn-key" size={32} color="gray" />,
            onPress: () => navigation.navigate("Perizinan"),
        },
        {
            id: 5,
            title: "UPT",
            icon: <FontAwesome name="building" size={32} color="gray" />,
            onPress: () => navigation.navigate("Upt"),
        },
        {
            id: 6,
            title: "Aplikasi",
            icon: <FontAwesome5 name="mobile-alt" size={32} color="gray" />,
            onPress: () => navigation.navigate("Aplikasi"),
        },
        {
            id: 7,
            title: "Pengaduan",
            icon: (
                <FontAwesome name="exclamation-circle" size={32} color="gray" />
            ),
            onPress: () => navigation.navigate("Pengaduan"),
        },
        {
            id: 8,
            title: "Kontak Kami",
            icon: <FontAwesome name="address-book" size={32} color="gray" />,
            onPress: () => navigation.navigate("KontakScreen"),
        },
    ];

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.menuContainer}>
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.id}
                        title={item.title}
                        icon={item.icon}
                        onPress={item.onPress}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

export { MenuItem, MenuItemsList };
