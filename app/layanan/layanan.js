import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import LoadingScreen from "../components/LoadingScreen";
import Header from "../components/Header";
import { supabase } from "../../lib/supabaseClient";

export default function LayananScreen() {
    const router = useRouter();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data, error } = await supabase
                    .from("tb_layanan")
                    .select("*");

                if (error) throw error;

                setServices(data);
            } catch (error) {
                console.error("Error fetching services from Supabase: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#33A9FF" />

            {/* Header tetap tampil */}
         <Header title="Layanan" backgroundColor="#33A9FF" textColor="white" />

            {/* Jika sedang loading, tampilkan LoadingScreen */}
            {loading ? (
                <LoadingScreen />
            ) : (
                <View style={styles.content}>
                    {services.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.card}
                            onPress={() =>
                                router.push(`/layanan-detail/${item.id}`)
                            }>
                            <View style={styles.cardContent}>
                                <View style={styles.cardTextContainer}>
                                    <Text style={styles.cardTitle}>
                                        {item.title}
                                    </Text>
                                    {item.subtitle && (
                                        <Text style={styles.cardSubtitle}>
                                            {item.subtitle}
                                        </Text>
                                    )}
                                </View>
                                {item.image_url && (
                                    <Image
                                        source={{ uri: item.image_url }}
                                        style={styles.cardImage}
                                        resizeMode="contain"
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <View style={styles.homeIndicator} />
        </SafeAreaView>
    );
}
