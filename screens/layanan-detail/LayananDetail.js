import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { supabase } from "../../lib/supabaseClient";
import { styles } from "./styles";
import LoadingScreen from "../components/LoadingScreen";
import StyledDescription from "../components/StyledDescription";
import Header from "../components/Header";
import ImageViewing from "react-native-image-viewing";
import { Image } from "expo-image";
import ImageGallery from "../components/ImageGallery";

const screenWidth = Dimensions.get("window").width;

export default function DetailLayananScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    const [layanan, setLayanan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showNoDataModal, setShowNoDataModal] = useState(false);

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const { data, error } = await supabase
                    .from("tb_layanan")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) throw error;
                setLayanan(data);
            } catch (error) {
                setErrorMsg(error.message || "Gagal memuat data");
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    useEffect(() => {
        if (layanan) {
            const imageUrls = [
                layanan.image_1,
                layanan.image_2,
                layanan.image_3,
                layanan.image_4,
                layanan.image_5,
                layanan.image_6,
                layanan.image_7,
                layanan.image_8,
                layanan.image_9,
                layanan.image_10,
            ].filter((url) => url);

            if (imageUrls.length === 0) {
                setShowNoDataModal(true);
            }
        }
    }, [layanan]);

    if (loading) return <LoadingScreen />;

    if (errorMsg || !layanan) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                    {errorMsg || "Data tidak ditemukan"}
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}>
                    <Text style={styles.backText}>Kembali</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const imageUrls = [
        layanan.image_1,
        layanan.image_2,
        layanan.image_3,
        layanan.image_4,
        layanan.image_5,
        layanan.image_6,
        layanan.image_7,
        layanan.image_8,
        layanan.image_9,
        layanan.image_10,
    ].filter((url) => url);

    const openModal = (imageUrl) => {
        setSelectedImage([{ uri: imageUrl }]);
        setIsImageVisible(true);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <Header
                title={layanan.title || "Detail Layanan"}
                backgroundColor="#33A9FF"
                textColor="white"
            />
            <View style={styles.content}>
                {layanan.subtitle && (
                    <Text style={styles.subtitle}>{layanan.subtitle}</Text>
                )}

                <ImageGallery
                    images={imageUrls}
                    showNoDataModal={showNoDataModal}
                    setShowNoDataModal={setShowNoDataModal}
                    router={navigation}
                />
            </View>
        </ScrollView>
    );
}
