import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StatusBar,
    SafeAreaView,
    ScrollView,
    Alert,
    Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "./styles";
import LoadingScreen from "../components/LoadingScreen";
import { supabase } from "../../lib/supabaseClient";

const InnovationScreen = () => {
    const router = useRouter();
    const [innovationItems, setInnovationItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInnovationItems = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from("tb_inovasi")
                    .select("*");

                if (error) {
                    setError("Gagal mengambil data: " + error.message);
                    console.error("Error Supabase: ", error);
                    Alert.alert("Gagal mengambil data", error.message);
                } else if (data.length === 0) {
                    setError("Tidak ada data inovasi ditemukan");
                } else {
                    setInnovationItems(data);
                }
            } catch (err) {
                console.error("Error fetching inovasi: ", err);
                setError("Gagal mengambil data: " + err.message);
                Alert.alert("Error", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInnovationItems();
    }, []);

    // Jika ada error, tampilkan pesan error
    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ color: "red", textAlign: "center" }}>
                    {error}
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />

            {/* Header tetap tampil selama loading */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Inovasi</Text>
            </View>

            {/* Jika loading, tampilkan LoadingScreen */}
            {loading ? (
                <LoadingScreen />
            ) : (
                <ScrollView style={styles.scrollView}>
                    <View style={styles.gridContainer}>
                        {innovationItems.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.card}
                                onPress={() =>
                                    item.onclicklink &&
                                    Linking.openURL(item.onclicklink)
                                }
                            >
                                <View style={styles.cardContent}>
                                    {/* Gambar ikon */}
                                    {item.image_url && (
                                        <View style={styles.iconContainer}>
                                            <Image
                                                source={{ uri: item.image_url }}
                                                style={styles.icon}
                                                resizeMode="contain"
                                                onError={(e) => {
                                                    console.log(
                                                        "Image load error:",
                                                        e.nativeEvent.error
                                                    );
                                                }}
                                            />
                                        </View>
                                    )}

                                    {/* Judul */}
                                    <Text style={styles.cardTitle}>
                                        {item.title}
                                    </Text>
                                </View>

                                {/* Tombol buka tautan */}
                                {item.onclicklink && (
                                    <TouchableOpacity
                                        style={styles.menuButton}
                                        onPress={() =>
                                            Linking.openURL(item.onclicklink)
                                        }
                                    >
                                        <Ionicons
                                            name="open-outline"
                                            size={20}
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default InnovationScreen;
