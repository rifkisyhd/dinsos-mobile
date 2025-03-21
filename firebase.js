// Pertama, install dependensi yang diperlukan
// Jalankan perintah berikut di terminal:
// npm install firebase

// Buat file firebase.js di direktori root aplikasi Anda
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyAVOxlP4WY4Q1lVUhFWgdmf4o6a1j7djtc",
  authDomain: "dinsosapp-10b7a.firebaseapp.com",
  projectId: "dinsosapp-10b7a",
  storageBucket: "dinsosapp-10b7a.firebasestorage.app",
  messagingSenderId: "746467040081",
  appId: "1:746467040081:web:5307646d106b51fe711170",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };