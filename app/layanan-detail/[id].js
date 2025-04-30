import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Modal,
    Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../lib/supabaseClient";
import { styles } from "./styles"; // Pastikan style tetap di-import dari file yang ada
import LoadingScreen from "../components/LoadingScreen";
import StyledDescription from "../components/StyledDescription";
import Header from "../components/Header";
import ImageViewing from "react-native-image-viewing"; // Import ImageViewing untuk zoom effect
import { Image } from "expo-image";
import ImageGallery from "../components/ImageGallery";

const screenWidth = Dimensions.get("window").width;

export default function DetailLayananScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [layanan, setLayanan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [isImageVisible, setIsImageVisible] = useState(false); // Modal visibility for zoom
    const [selectedImage, setSelectedImage] = useState(null); // Selected image for zoom
    const [showNoDataModal, setShowNoDataModal] = useState(false); // State untuk modal popup

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
            // Cek apakah tidak ada gambar
            const imageUrls = [
                layanan.image_1,
                layanan.image_2,
                layanan.image_3,
                layanan.image_4,
                layanan.image_5,
            ].filter((url) => url);

            // Jika tidak ada gambar, tampilkan modal
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
                    onPress={() => router.back()}
                    style={styles.backButton}>
                    <Text style={styles.backText}>Kembali</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Siapkan array gambar, hanya gambar yang ada URL-nya
    const imageUrls = [
        layanan.image_1,
        layanan.image_2,
        layanan.image_3,
        layanan.image_4,
        layanan.image_5,
    ].filter((url) => url);

    // Fungsi untuk membuka modal zoom
    const openModal = (imageUrl) => {
        setSelectedImage([{ uri: imageUrl }]); // Set gambar yang dipilih
        setIsImageVisible(true); // Tampilkan modal zoom
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

                {/* Render gambar */}
                <ImageGallery
                    images={imageUrls}
                    showNoDataModal={showNoDataModal}
                    setShowNoDataModal={setShowNoDataModal}
                    router={router}
                />
            </View>
        </ScrollView>
    );
}
