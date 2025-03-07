// import { Slot } from 'expo-router';

import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Bisa true kalau mau ada header
        gestureEnabled: true, // Biar bisa swipe-back di iOS
      }}
    />
  );
}


// import SplashScreen from "./SplashScreen";
// import { StatusBar } from "expo-status-bar";
// import { Slot } from "expo-router";

// export default function Index() {
//   return <SplashScreen />;
//   <StatusBar hidden />
//   return <Slot />;
// }
