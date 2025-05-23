import "dotenv/config";

export default {
  expo: {
    name: "dinsos-mobile",
    slug: "dinsos-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo_dinsos.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/logo_dinsos.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      infoPlist: {
        UIEdgeInsets: {
          top: "safeArea",
        },
      },
    },

    android: {
      package: "com.dinsosjatim.gacor",
      adaptiveIcon: {
        foregroundImage: "./assets/images/logo_dinsos.png",
        backgroundColor: "#ffffff",
      },
    },

    web: {
      bundler: "metro",
      output: "standalone",
      favicon: "./assets/images/favicon.png",
    },

    extra: {
      EXPO_PUBLIC_OPENAI_API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
      EXPO_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL,
      EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      EXPO_PUBLIC_API_TOKEN: process.env.API_TOKEN,
    },

    // Ini dipindah ke luar `extra`
    owner: "your-username-if-needed",
    runtimeVersion: {
      policy: "appVersion",
    },
  },

  // Ini keluarin dari `expo.extra` dan taruh langsung di root `eas`
  eas: {
    projectId: "541b73b5-3f81-419c-8eac-73064415090e",
  },
};
