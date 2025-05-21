import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./screens/TabNavigator.js";
import * as SplashScreen from "expo-splash-screen";

import InnovationScreen from "./screens/innovasi/innovasi";
import LayananScreen from "./screens/layanan/layanan";
import DetailLayananScreen from "./screens/layanan-detail/LayananDetail";
import PengaduanScreen from "./screens/pengaduan/pengaduan";
import PerizinanScreen from "./screens/perizinan/perizinan";
import DetailPerizinanScreen from "./screens/perizinan-detail/PerizinanDetail";
import ProgramScreen from "./screens/program/program";
import ProgramDetailScreen from "./screens/program-detail/ProgramDetail";
import UptScreen from "./screens/upt/upt";
import HomeScreen from "./screens/Homepage/HomeScreen"
import AplicationList from "./screens/aplikasi/aplikasi"
import BidangScreen from "./screens/bidang/BidangDetail"
import UptDetail from "./screens/upt-detail/UptDetail"

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync(); // cegah auto hide splash screen
        // bisa taruh loading data async di sini kalau ada

      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync(); // setelah siap, sembunyikan splash screen
      }
    }

    prepare();
  }, []);


  
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Upt" component={UptScreen} />
        <Stack.Screen name="Inovasi" component={InnovationScreen} />
        <Stack.Screen name="Layanan" component={LayananScreen} />
        <Stack.Screen name="Detail-Layanan" component={DetailLayananScreen} />
        <Stack.Screen name="Pengaduan" component={PengaduanScreen} />
        <Stack.Screen name="Perizinan" component={PerizinanScreen} />
        <Stack.Screen name="Detail-Perizinan" component={DetailPerizinanScreen} />
        <Stack.Screen name="Program" component={ProgramScreen} />
        <Stack.Screen name="Detail-Program" component={ProgramDetailScreen} />
        <Stack.Screen name="Aplikasi" component={AplicationList} />
        <Stack.Screen name="Bidang" component={BidangScreen} />
        <Stack.Screen name="Detail-Upt" component={UptDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

