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

export default function HomeScreen() {
  const router = useRouter();
  //buat popup
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3498db" />

      {/* <WelcomeModal visible={modalVisible} onClose={() => setModalVisible(false)} />  */}

      <Text style={styles.headerText}>
        {new Date().getHours() < 12
          ? "Selamat Pagi"
          : new Date().getHours() < 15
          ? "Selamat Siang"
          : new Date().getHours() < 18
          ? "Selamat Sore"
          : "Selamat Malam"}
      </Text>

      <ImageBackground
        source={require("../../assets/images/homepage-atas.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Cari ..."
            placeholderTextColor="gray"
            style={styles.searchInput}
            onChangeText={(text) => console.log(text)}
          />
          <EvilIcons
            name="search"
            size={34}
            color="gray"
            style={styles.searchIcon}
          />
        </View>

        <MenuItemsList />
      </ImageBackground>

      <View>
        <Text style={styles.menuText2}>Astacita Prabowo-Gibran</Text>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
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

        {/* Popup Gambar */}
        <ImagePopup
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          imageSource={require("../../assets/images/popup.png")}
        />
      </View>

      <Button
        title="Pergi ke Detail"
        onPress={() => router.push("/detail")}
        style={styles.buttonStyle}
      />
    </View>
  );
}
