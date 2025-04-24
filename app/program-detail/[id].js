import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../lib/supabaseClient";
import { styles } from "./styles";
import LoadingScreen from "../components/LoadingScreen";

export default function ProgramDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [bidangDetail, setBidangDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const { data, error } = await supabase
                .from("tb_bidang_detail")
                .select(`
                    id,
                    description,
                    bidang_id,
                    tb_bidang (
                      id,
                      description
                    )
                  `)
                .eq("id", Number(id))
                .maybeSingle();

                if (error) throw error;
                console.log("DATA:", data);
                setBidangDetail(data);
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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>
                    {bidangDetail.tb_bidang.description || "Nama Bidang"}
                </Text>
            </View>

            <Text style={styles.description}>
                {bidangDetail.description || "Tidak ada deskripsi detail."}
            </Text>
        </ScrollView>
    );
}
