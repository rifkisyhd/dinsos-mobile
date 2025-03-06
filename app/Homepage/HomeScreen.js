// screens/HomeScreen.js
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { onPress } from 'react-native';
import {
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  StatusBar,
  Image,
} from "react-native";
import {
  FontAwesome,
  EvilIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { MenuItemsList } from "./components/MenuItem";
import { styles } from "./styles";

export default function HomeScreen( { onPress }) {
  const router = useRouter();

  const menuItems = [
    {
      id: 1,
      title: "Program",
      icon: <MaterialIcons name="list-alt" size={32} color="gray" />,
      onPress: () => router.push("/program/program"),
    },
    {
      id: 2,
      title: "Layanan",
      icon: <FontAwesome5 name="hands-helping" size={32} color="gray" />,
      onPress: () => router.push("/layanan/layanan"),
    },
    {
      id: 3,
      title: "Perizinan",
      icon: <MaterialIcons name="vpn-key" size={32} color="gray" />,
      onPress: () => router.push("/perizinan/perizinan"),
    },
    {
      id: 4,
      title: "UPT",
      icon: <FontAwesome name="building" size={32} color="gray" />,
      onPress: () => router.push("/upt/upt"),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3498db" />

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
      </View>

      <Button
        title="Pergi ke Detail"
        onPress={() => router.push("../detail")}
        style={styles.buttonStyle}
      />
    </View>
  );
}
