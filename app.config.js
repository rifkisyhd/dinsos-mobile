import 'dotenv/config';

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
        output: "static",
        favicon: "./assets/images/favicon.png",
      },
  
      plugins: [
        "expo-router",
        [
          "expo-splash-screen",
          {
            image: "./assets/images/logo_dinsos.png",
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#ffffff",
          },
        ],
      ],
  
      experiments: {
        typedRoutes: true,
      },
    extra: {
      EXPO_PUBLIC_OPENAI_API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      API_TOKEN: process.env.API_TOKEN
    },
  },
};