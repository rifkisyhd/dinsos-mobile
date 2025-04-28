import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../lib/supabaseClient";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { styles } from "./styles";
import LoadingScreen from "../components/LoadingScreen";
import StyledDescription from "../components/StyledDescription";
import ImageViewing from "react-native-image-viewing";

const screenWidth = Dimensions.get("window").width;

export default function DetailPerizinanScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [perizinan, setPerizinan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [isImageVisible, setIsImageVisible] = useState(false); // For modal visibility
    const [selectedImage, setSelectedImage] = useState(null); // Store selected image for modal

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const { data, error } = await supabase
                    .from("tb_perizinan")
                    .select(
                        `
            id,
            title,
            description, 
            image_1, 
            image_2,
            image_3,
            image_4,
            image_5
            `,
                    )
                    .eq("id", id)
                    .single(); // Get single perizinan by ID
                if (error) throw error;
                setPerizinan(data);
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

    // Prepare image URLs, filter out empty URLs
    const imageUrls = [
        perizinan.image_1,
        perizinan.image_2,
        perizinan.image_3,
        perizinan.image_4,
        perizinan.image_5,
    ].filter((url) => url);

    // Open image in modal
    const openModal = (imageUrl) => {
        setSelectedImage([{ uri: imageUrl }]); // Set selected image for zoom
        setIsImageVisible(true); // Show modal
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
                {/* {perizinan.image_url && (
                    <Image
                        source={{ uri: perizinan.image_url }}
                        style={styles.image}
                    />
                )} */}
                {/* {perizinan.subtitle && <Text style={styles.subtitle}>{perizinan.subtitle}</Text>} */}
                {/* {perizinan.description && (
                    <StyledDescription
                        description={perizinan.description}
                        style={styles.description}
                        boldColor={"#33A9FF"}
                    />
                )} */}

                {/* Render images */}
                {imageUrls.length > 0 && (
                    <View style={{ marginTop: 0 }}>
                        {imageUrls.map((imageUrl, idx) => (
                            <TouchableOpacity
                                key={idx}
                                onPress={() => openModal(imageUrl)} // Open image modal on click
                                style={{ marginBottom: 20 }}>
                                <Image
                                    source={{ uri: imageUrl }}
                                    style={{
                                        width: screenWidth - 32,
                                        height: 450,
                                        borderRadius: 10,
                                        alignSelf: "center",
                                      }}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            {/* Modal for zoomed image */}
            {selectedImage && (
                <ImageViewing
                    images={selectedImage} // Show selected image
                    imageIndex={0} // Start with the first image in the list
                    visible={isImageVisible} // Display the modal
                    onRequestClose={() => setIsImageVisible(false)} // Close the modal
                />
            )}
        </ScrollView>
    );
}
