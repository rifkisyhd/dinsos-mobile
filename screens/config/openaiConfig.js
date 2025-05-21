import Constants from "expo-constants";

const OPENAI_API_KEY = Constants.expoConfig.extra.EXPO_PUBLIC_OPENAI_API_KEY;
console.log("API Key:", OPENAI_API_KEY);
console.log("All Expo Extra Config:", Constants.expoConfig.extra);