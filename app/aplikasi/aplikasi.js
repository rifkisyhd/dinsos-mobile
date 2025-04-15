import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabaseClient';
import LoadingScreen from '../components/LoadingScreen';

export default function AplicationList() {
  const router = useRouter();
  const [Aplicationitems, setAplicationitems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchaplication = async () => {
      try {
        const { data, error } = await supabase
          .from('tb_aplikasi')
          .select('*');

        if (error) throw error;
        if (!data || data.length === 0) {
          setError("Tidak ada data inovasi ditemukan");
        } else {
          setAplicationitems(data);
        }
      } catch (err) {
        console.error("Error fetching inovasi:", err);
        setError("Gagal mengambil data: " + err.message);
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchaplication();
  }, []);

  if (loading) return <LoadingScreen />;

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aplikasi</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.gridContainer}>
          {Aplicationitems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => item.onclicklink && Linking.openURL(item.onclicklink)}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Image
                    source={{ uri: item.image_url }}
                    style={styles.cardImage}
                    resizeMode="contain"
                    onError={(e) =>
                      console.log("Image load error:", e.nativeEvent.error)
                    }
                  />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
