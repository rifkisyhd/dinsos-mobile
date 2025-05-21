import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { supabase } from "../../lib/supabaseClient";
import { styles } from "./styles";
import LoadingScreen from "../components/LoadingScreen";
import Header from "../components/Header";
import ImageGallery from "../components/ImageGallery";

const screenWidth = Dimensions.get("window").width;

export default function ProgramDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params || {}; // ambil dari route.params
    const [bidangDetail, setBidangDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [showNoDataModal, setShowNoDataModal] = useState(false);

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const { data, error } = await supabase
                    .from("tb_bidang_detail")
                    .select("*, tb_bidang(description)")
                    .eq("id", Number(id))
                    .maybeSingle();

                if (error) throw error;
                setBidangDetail(data);

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
                    onPress={() => navigation.goBack()}
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
        <ScrollView contentContainerStyle={styles.container}>
            <Header
                title={bidangDetail?.tb_bidang?.description || "Nama Bidang"}
                backgroundColor="#33A9FF"
                textColor="white"
            />
            <View style={styles.content}>
                <ImageGallery
                    images={images}
                    showNoDataModal={showNoDataModal}
                    setShowNoDataModal={setShowNoDataModal}
                    router={navigation} // kalau komponen butuh goBack misalnya
                />
            </View>
        </ScrollView>
    );
}
