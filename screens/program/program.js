import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";
import LoadingScreen from "../components/LoadingScreen";
import { supabase } from "../../lib/supabaseClient";
import Header from "../components/Header";

export default function ProgramScreen() {
    const navigation = useNavigation();
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            const { data, error } = await supabase
                .from("tb_program")
                .select("*");
            if (error) {
                console.error("Error fetching data:", error.message);
            } else if (Array.isArray(data)) {
                setPrograms(data);
            }
            setLoading(false);
        };

        fetchPrograms();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <LoadingScreen />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />

            <Header
                title="Program"
                backgroundColor="#33A9FF"
                textColor="white"
            />

            <ScrollView contentContainerStyle={styles.content}>
                {programs.map((program) => (
                    <TouchableOpacity
                        key={program.id}
                        style={styles.programCard}
                        onPress={() =>
                            navigation.navigate("Bidang", {
                                id: program.id,
                            })
                        }>
                        <Image
                            source={{ uri: program.image_url }}
                            style={styles.icon}
                        />
                        <Text style={styles.programName}>{program.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
