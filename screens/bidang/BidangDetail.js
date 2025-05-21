import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { supabase } from "../../lib/supabaseClient";
import { styles } from "./styles";
import LoadingScreen from "../components/LoadingScreen";
import Header from "../components/Header";

export default function BidangScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params || {};
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
                setProgram(data[0]);
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
                    onPress={() => navigation.goBack()}
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
                                key={index + "-" + i}
                                style={styles.card}
                                onPress={() =>
                                    navigation.navigate("Detail-Program", {
                                        id: detail.id,
                                    })
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
