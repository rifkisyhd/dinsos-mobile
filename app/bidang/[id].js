import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../lib/supabaseClient";
import { styles } from "./styles";
import LoadingScreen from "../components/LoadingScreen";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";

export default function BidangScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [program, setProgram] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const { data, error } = await supabase
                    .from("tb_program")
                    .select(
                        `
                  id,
                  image_url,
                  title,
                  tb_bidang (
                    id,
                    description,
                    tb_bidang_detail (
                      id,
                      description
                    )
                  )
                `,
                    )
                    .eq("id", id);
                if (error) throw error;
                console.log("DATA:", data);

                setProgram(data[0]); // ambil row pertama
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

    if (errorMsg) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMsg}</Text>
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
              <Header
                            title={program.title}
                            backgroundColor="#33A9FF"
                            textColor="white"
                        />

                {/* Bidang Terkait */}
                {program.tb_bidang?.length > 0 && (
                    <View style={styles.relatedContainer}>
                        <Text style={styles.subtitle}>Bidang Terkait:</Text>
                        {program.tb_bidang.map((bidang, index) =>
                            bidang.tb_bidang_detail?.map((detail, i) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.card}
                                    onPress={() =>
                                        router.push(
                                            `/program-detail/${detail.id}`,
                                        )
                                    }>
                                    <Text style={styles.cardText}>
                                        {bidang.description}
                                    </Text>
                                </TouchableOpacity>
                            )),
                        )}
                    </View>
                )}
        </ScrollView>
    );
}
