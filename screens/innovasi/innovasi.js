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
import { useNavigation } from "@react-navigation/native"; // ganti ini
import styles from "./styles";
import LoadingScreen from "../components/LoadingScreen";
import { supabase } from "../../lib/supabaseClient";
import Header from "../components/Header";

const InnovationScreen = () => {
    const navigation = useNavigation(); // ganti ini
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

            {/* Ganti ke komponen Header */}
            <Header
                title="Inovasi"
                backgroundColor="#d4e5ef"
                textColor="black"
                showBack={true}
            />

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
                                }>
                                <View style={styles.cardContent}>
                                    {item.image_url && (
                                        <View style={styles.iconContainer}>
                                            <Image
                                                source={{ uri: item.image_url }}
                                                style={styles.icon}
                                                resizeMode="contain"
                                                onError={(e) => {
                                                    console.log(
                                                        "Image load error:",
                                                        e.nativeEvent.error,
                                                    );
                                                }}
                                            />
                                        </View>
                                    )}
                                    <Text style={styles.cardTitle}>
                                        {item.title}
                                    </Text>
                                </View>

                                {item.onclicklink && (
                                    <TouchableOpacity
                                        style={styles.menuButton}
                                        onPress={() =>
                                            Linking.openURL(item.onclicklink)
                                        }>
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
