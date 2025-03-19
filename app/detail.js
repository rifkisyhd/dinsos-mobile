import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function DetailScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Ini Detail Screen</Text>
    </View>
  );
}
