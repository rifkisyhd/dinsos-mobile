import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Ini Home Screen</Text>
      <Button title="Pergi ke Detail" onPress={() => router.push("/detail")} />
    </View>
  );
}
