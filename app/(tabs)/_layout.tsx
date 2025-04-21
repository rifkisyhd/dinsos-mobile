import { Tabs } from "expo-router";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat/chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-ellipses-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil/profil"
        options={{
          title: "Profil",
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, size }) => (
            // <FontAwesome icon="fa-solid fa-id-card" size={size} color={color} />
            <FontAwesome name="user-o" size={size} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="sapa-bansos/sapa-bansos"
        options={{
          title: "Sapa Bansos",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="smile" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
