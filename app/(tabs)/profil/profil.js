import { View, Text } from "react-native";
import { useRouter } from "expo-router";

export default function Profil() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Halaman Profil</Text>
    </View>
  );
}

