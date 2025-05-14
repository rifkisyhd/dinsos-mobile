import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../lib/supabaseClient";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { styles } from "./styles";
import LoadingScreen from "../components/LoadingScreen";
import StyledDescription from "../components/StyledDescription";
import ImageViewing from "react-native-image-viewing";
import { Image } from "expo-image";
import ImageGallery from "../components/ImageGallery";

const screenWidth = Dimensions.get("window").width;

export default function DetailPerizinanScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [perizinan, setPerizinan] = useState(null);
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
                    .from("tb_perizinan")
                    .select("*")
                    .eq("id", id)
                    .single();
                if (error) throw error;
                setPerizinan(data);

                // Cek apakah semua image kosong
                const images = [
                    data.image_1,
                    data.image_2,
                    data.image_3,
                    data.image_4,
                    data.image_5,
                    data.image_6,
                    data.image_7,
                    data.image_8,
                    data.image_9,
                    data.image_10,
                ].filter((url) => url);

                if (images.length === 0) {
                    setShowNoDataModal(true);
                }
            } catch (error) {
                setErrorMsg(error.message || "Gagal memuat data");
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) {
        return <LoadingScreen />;
    }

    if (errorMsg || !perizinan) {
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

    const imageUrls = [
        perizinan.image_1,
        perizinan.image_2,
        perizinan.image_3,
        perizinan.image_4,
        perizinan.image_5,
        perizinan.image_6,
        perizinan.image_7,
        perizinan.image_8,
        perizinan.image_9,
        perizinan.image_10,
    ].filter((url) => url);

    const openModal = (imageUrl) => {
        setSelectedImage([{ uri: imageUrl }]);
        setIsImageVisible(true);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <Header
                title={perizinan.title || "Detail Perizinan"}
                backgroundColor="#33A9FF"
                textColor="white"
            />
            <View style={styles.content}>
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
