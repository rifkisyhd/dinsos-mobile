import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Linking,
    StatusBar,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { supabase } from "../../lib/supabaseClient";
import { styles } from "./styles";
import LoadingScreen from "../components/LoadingScreen";
import ImageGallery from "../components/ImageGallery";

export default function UptDetail() {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    const [location, setLocation] = useState(null);
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);

                const { data: uptData, error: uptError } = await supabase
                    .from("tb_upt")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (uptError) throw uptError;
                setLocation(uptData);

                const { data: categoryData, error: categoryError } =
                    await supabase
                        .from("tb_category")
                        .select("name")
                        .eq("id", uptData.category)
                        .single();

                if (categoryError) throw categoryError;
                setCategoryName(categoryData.name);
            } catch (error) {
                console.error("Error fetching UPT detail: ", error);
                navigation.goBack();
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDetail();
        }
    }, [id]);

    const handleCallPhone = () => {
        if (location?.phone) {
            Linking.openURL(`tel:${location.phone}`);
        }
    };

    const handleOpenMaps = () => {
        if (location?.name) {
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                location.name,
            )}`;
            Linking.openURL(mapUrl);
        }
    };

    if (loading) return <LoadingScreen />;

    const imageDescriptions = [
        location?.image_description_1,
        location?.image_description_2,
        location?.image_description_3,
        location?.image_description_4,
        location?.image_description_5,
    ].filter((img) => !!img);

    return (
        <ScrollView>
            <StatusBar
                backgroundColor="transparent"
                translucent
                barStyle={
                    Platform.OS === "ios" ? "dark-content" : "light-content"
                }
            />
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{
                            uri:
                                location?.image_url ||
                                "https://via.placeholder.com/300",
                        }}
                        style={styles.headerImage}
                        defaultSource={require("../../assets/images/lokasi1.png")}
                    />
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.content}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{location?.name}</Text>
                        <Text style={styles.category}>{categoryName}</Text>
                    </View>

                    <View style={styles.infoSection}>
                        {location?.number && (
                            <TouchableOpacity
                                style={styles.infoItem}
                                onPress={handleCallPhone}>
                                <View style={styles.infoIconContainer}>
                                    <Ionicons
                                        name="call-outline"
                                        size={20}
                                        color="#3498db"
                                    />
                                </View>
                                <View style={styles.infoTextContainer}>
                                    <Text style={styles.infoLabel}>Kontak</Text>
                                    <Text style={styles.infoValue}>
                                        {location.number}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}

                        {location?.location && (
                            <TouchableOpacity
                                style={styles.infoItem}
                                onPress={handleOpenMaps}>
                                <View style={styles.infoIconContainer}>
                                    <Ionicons
                                        name="location-outline"
                                        size={20}
                                        color="#3498db"
                                    />
                                </View>
                                <View style={styles.infoTextContainer}>
                                    <Text style={styles.infoLabel}>Lokasi</Text>
                                    <Text style={styles.infoValue}>
                                        {location.location}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>

                    {imageDescriptions.length > 0 && (
                        <View style={styles.extraImageContainer}>
                            <Text style={styles.sectionTitle}>
                                Informasi UPT
                            </Text>
                            <ImageGallery
                                images={imageDescriptions}
                                showNoDataModal={false}
                                setShowNoDataModal={() => {}}
                                router={navigation} // ini sih bisa dikasih, tapi gak dipake ya
                            />
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </ScrollView>
    );
}
