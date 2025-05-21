import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Alert,
    Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../lib/supabaseClient";
import LoadingScreen from "../components/LoadingScreen";
import Header from "../components/Header";

export default function AplicationList() {
    const navigation = useNavigation();
    const [Aplicationitems, setAplicationitems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchaplication = async () => {
            try {
                const { data, error } = await supabase
                    .from("tb_aplikasi")
                    .select("*");

                if (error) throw error;
                if (!data || data.length === 0) {
                    setError("Tidak ada data inovasi ditemukan");
                } else {
                    setAplicationitems(data);
                }
            } catch (err) {
                console.error("Error fetching inovasi:", err);
                setError("Gagal mengambil data: " + err.message);
                Alert.alert("Error", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchaplication();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

            {/* Header selalu tampil */}
            <Header
                title="Aplikasi"
                backgroundColor="#33A9FF"
                textColor="white"
            />

            {/* Loading state */}
            {loading ? (
                <LoadingScreen />
            ) : error ? (
                <Text style={{ color: "red", textAlign: "center" }}>
                    {error}
                </Text>
            ) : (
                <ScrollView style={styles.scrollView}>
                    <View style={styles.gridContainer}>
                        {Aplicationitems.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.card}
                                onPress={() =>
                                    item.onclicklink &&
                                    Linking.openURL(item.onclicklink)
                                }>
                                <View style={styles.cardContent}>
                                    <View style={styles.iconContainer}>
                                        <Image
                                            source={{ uri: item.image_url }}
                                            style={styles.cardImage}
                                            resizeMode="contain"
                                            onError={(e) =>
                                                console.log(
                                                    "Image load error:",
                                                    e.nativeEvent.error,
                                                )
                                            }
                                        />
                                    </View>
                                    <Text style={styles.cardTitle}>
                                        {item.title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}
