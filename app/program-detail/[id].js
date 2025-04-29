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
                    .select(
                        `
            id,
            description,
            bidang_id,
            image_1,
            image_2,
            image_3,
            image_4,
            image_5,
            tb_bidang (
              id,
              description
            )
          `,
                    )
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
                    {images.length > 0 && (
                        <View style={styles.imagesWrapper}>
                            {images.map((img, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    onPress={() => {
                                        setSelectedImage([{ uri: img }]);
                                        setIsImageVisible(true);
                                    }}
                                    style={styles.imageTouchable}>
                                    <Image
                                        source={{ uri: img }}
                                        style={{
                                            width: screenWidth - 32,
                                            height: 450,
                                            borderRadius: 10,
                                            alignSelf: "center",
                                        }}
                                        contentFit="cover"
                                        placeholder={img} // Bisa di-set placeholder sementara
                                        transition={1000}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Modal Zoom Gambar */}
                {selectedImage && (
                    <ImageViewing
                        images={selectedImage}
                        imageIndex={0}
                        visible={isImageVisible}
                        onRequestClose={() => setIsImageVisible(false)}
                    />
                )}

                {/* Popup jika gambar tidak ada */}
                <Modal
                    visible={showNoDataModal}
                    transparent
                    animationType="fade">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>
                                Data belum tersedia
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowNoDataModal(false);
                                    router.back();
                                }}
                                style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>
                                    Kembali
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </>
    );
}
