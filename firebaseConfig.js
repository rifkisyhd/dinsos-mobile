// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDysuaYbIAviqnV-ulS-mP8GePNZo496ro",
  authDomain: "dinsosapp.firebaseapp.com",
  projectId: "dinsosapp",
  storageBucket: "dinsosapp.firebasestorage.app",
  messagingSenderId: "937118957960",
  appId: "1:937118957960:web:2223411ee53ceafddcba3d",
  measurementId: "G-LEVQ21B7WK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);