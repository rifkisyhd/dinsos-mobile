import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    Button,
    TextInput,
    ImageBackground,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useState } from "react";
import {
    FontAwesome,
    EvilIcons,
    MaterialIcons,
    FontAwesome5,
} from "@expo/vector-icons";
import { MenuItemsList, menuItems } from "./components/MenuItem";
import { styles } from "./styles";
// import WelcomeModal from "../welcome";
import ImagePopup from "../components/ImagePopup";
import ImageViewing from "react-native-image-viewing";

export default function HomeScreen() {
    const router = useRouter();

    // Bikin state terpisah buat masing-masing popup
    const [modalVisibleAstacita, setModalVisibleAstacita] = useState(false);
    const [modalVisibleNawa, setModalVisibleNawa] = useState(false);

    return (
        <View style={[styles.container, { flex: 1 }]}>
            <ImageBackground
                source={require("../../assets/images/homepage-atas.png")}
                style={styles.backgroundImage}></ImageBackground>

            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />

                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    keyboardShouldPersistTaps="handled"
                    bounces={false} 
                    overScrollMode="never" 
                >
                    <Text style={styles.headerText}>
                        {new Date().getHours() < 11
                            ? "Selamat Pagi Kawan Showsial"
                            : new Date().getHours() < 15
                            ? "Selamat Siang Kawan Showsial"
                            : new Date().getHours() < 18
                            ? "Selamat Sore Kawan Showsial"
                            : "Selamat Malam Kawan Showsial"}
                    </Text>

                    <MenuItemsList />

                    <View style={styles.main}>
                        {/* Astacita */}
                        <View>
                            <Text style={styles.menuText2}>
                                Astacita Prabowo-Gibran
                            </Text>
                            <TouchableOpacity
                                onPress={() => setModalVisibleAstacita(true)}>
                                <Image
                                    source={require("../../assets/images/asa-cita.png")}
                                    style={{
                                        width: 370,
                                        height: 175,
                                        resizeMode: "contain",
                                        marginTop: 10,
                                        alignSelf: "center",
                                    }}
                                />
                            </TouchableOpacity>

                            {/* Modal untuk Astacita */}
                            <ImageViewing
                                key={
                                    modalVisibleAstacita
                                        ? "open-astacita"
                                        : "closed-astacita"
                                } // Menambahkan key yang berbeda
                                visible={modalVisibleAstacita}
                                images={[
                                    {
                                        uri: Image.resolveAssetSource(
                                            require("../../assets/images/asacita.png"), // Ganti dengan gambar popup yang sesuai
                                        ).uri,
                                    },
                                ]}
                                onRequestClose={() =>
                                    setModalVisibleAstacita(false)
                                }
                            />
                        </View>

                        {/* Nawa Bhakti Satya */}
                        <View>
                            <Text style={styles.menuText2}>
                                Nawa Bhakti Satya
                            </Text>
                            <TouchableOpacity
                                onPress={() => setModalVisibleNawa(true)}>
                                <Image
                                    source={require("../../assets/images/nawabakti.png")}
                                    style={{
                                        width: 400,
                                        height: 255,
                                        resizeMode: "contain",
                                        marginTop: 10,
                                        alignSelf: "center",
                                    }}
                                />
                            </TouchableOpacity>

                            {/* Modal untuk Nawa Bhakti Satya */}
                            <ImageViewing
                                key={
                                    modalVisibleNawa
                                        ? "open-nawa"
                                        : "closed-nawa"
                                } // Menambahkan key yang berbeda
                                visible={modalVisibleNawa}
                                images={[
                                    {
                                        uri: Image.resolveAssetSource(
                                            require("../../assets/images/popup.png"), // Ganti dengan gambar popup yang sesuai
                                        ).uri,
                                    },
                                ]}
                                onRequestClose={() =>
                                    setModalVisibleNawa(false)
                                }
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
