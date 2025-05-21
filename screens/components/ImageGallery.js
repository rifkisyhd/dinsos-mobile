import React, { useState } from "react";
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import ImageViewing from "react-native-image-viewing";
import LoadingScreen from "./LoadingScreen";

const screenWidth = Dimensions.get("window").width;

export default function ImageGallery({
    images = [],
    showNoDataModal,
    setShowNoDataModal,
    router,
}) {
    const [imageLoading, setImageLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageVisible, setIsImageVisible] = useState(false);

    const handleImagePress = (img) => {
        setSelectedImage([{ uri: img }]);
        setIsImageVisible(true);
    };

    return (
        <View style={styles.imagesWrapper}>
            {/* Popup jika gambar tidak ada */}
            {images.length === 0 && (
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
                                    router.back(); // pastikan router ada untuk navigation
                                }}
                                style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>
                                    Kembali
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

            {images.map((img, idx) => (
                <TouchableOpacity
                    key={idx}
                    onPress={() => handleImagePress(img)}
                    style={styles.imageTouchable}>
                    <View style={{ position: "relative" }}>
                        {imageLoading && <LoadingScreen />}
                        {/* Pake LoadingScreen */}
                        <Image
                            source={{ uri: img }}
                            style={{
                                width: screenWidth - 32,
                                height: 450,
                                borderRadius: 10,
                                alignSelf: "center",
                                marginBottom: 20,
                            }}
                            contentFit="cover"
                            onLoadStart={() => setImageLoading(true)}
                            onLoadEnd={() => setImageLoading(false)}
                            transition={1000}
                        />
                    </View>
                </TouchableOpacity>
            ))}

            {/* Modal Zoom Gambar */}
            {selectedImage && (
                <ImageViewing
                    images={selectedImage}
                    imageIndex={0}
                    visible={isImageVisible}
                    onRequestClose={() => setIsImageVisible(false)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    imagesWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingBottom: 10,
    },
    imageTouchable: {
        marginBottom: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    modalButton: {
        backgroundColor: "#33A9FF",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});
