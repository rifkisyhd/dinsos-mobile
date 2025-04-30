import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../lib/supabaseClient";
import { styles } from "./styles";
import LoadingScreen from "../components/LoadingScreen";
import Header from "../components/Header";
import ImageViewing from "react-native-image-viewing";
import { Image } from "expo-image";
import ImageGallery from "../components/ImageGallery";

const screenWidth = Dimensions.get("window").width;

export default function ProgramDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [bidangDetail, setBidangDetail] = useState(null);
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
                    .from("tb_bidang_detail")
                    .select("*")
                    .eq("id", Number(id))
                    .maybeSingle();

                if (error) throw error;
                setBidangDetail(data);

                // Jika tidak ada gambar, tampilkan popup
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

    if (loading) return <LoadingScreen />;

    if (errorMsg || !bidangDetail) {
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

    const images = [
        bidangDetail.image_1,
        bidangDetail.image_2,
        bidangDetail.image_3,
        bidangDetail.image_4,
        bidangDetail.image_5,
        bidangDetail.image_6,
        bidangDetail.image_7,
        bidangDetail.image_8,
        bidangDetail.image_9,
        bidangDetail.image_10,
    ].filter((url) => url);

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <Header
                    title={
                        bidangDetail?.tb_bidang?.description || "Nama Bidang"
                    }
                    backgroundColor="#33A9FF"
                    textColor="white"
                />
                <View style={styles.content}>
                    <ImageGallery
                        images={images}
                        showNoDataModal={showNoDataModal}
                        setShowNoDataModal={setShowNoDataModal}
                        router={router}
                    />
                </View>
            </ScrollView>
        </>
    );
}
