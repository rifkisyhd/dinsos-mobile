import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../lib/supabaseClient";
import { styles } from "./styles";
import LoadingScreen from "../components/LoadingScreen";
import Header from "../components/Header";
import ImageViewing from "react-native-image-viewing";

const screenWidth = Dimensions.get("window").width;


export default function ProgramDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [bidangDetail, setBidangDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
          `
          )
          .eq("id", Number(id))
          .maybeSingle();

        if (error) throw error;
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
          style={styles.backButton}
        >
          <Text style={styles.backText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Siapkan array gambar, buang yang kosong
  const images = [
    bidangDetail.image_1,
    bidangDetail.image_2,
    bidangDetail.image_3,
    bidangDetail.image_4,
    bidangDetail.image_5,
  ].filter((url) => url); // Hanya yang ada URL-nya

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header
        title={bidangDetail?.tb_bidang?.description || "Nama Bidang"}
        backgroundColor="#33A9FF"
        textColor="white"
      />
      <View style={styles.content}>
        {/* <Text style={styles.description}>
          {bidangDetail.description || "Tidak ada deskripsi detail."}
        </Text> */}

        {/* Render gambar bertumpuk */}
        {images.length > 0 && (
          <View style={{ marginTop: 0 }}>
            {images.map((img, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  setSelectedImage([{ uri: img }]);
                  setIsImageVisible(true);
                }}
                style={{ marginBottom: 20 }}
              >
                <Image
                  source={{ uri: img }}
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

      {/* Modal Zoom Gambar */}
      {selectedImage && (
        <ImageViewing
          images={selectedImage}
          imageIndex={0}
          visible={isImageVisible}
          onRequestClose={() => setIsImageVisible(false)}
        />
      )}
    </ScrollView>
    
  );
}
