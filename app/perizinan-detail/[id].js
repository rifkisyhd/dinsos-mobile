import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../../lib/supabaseClient';
import { styles } from './styles';
import LoadingScreen from "../components/LoadingScreen";

export default function DetailPerizinanScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [perizinan, setPerizinan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('tb_perizinan')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        setPerizinan(data);
      } catch (error) {
        setErrorMsg(error.message || 'Gagal memuat data');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <LoadingScreen />
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#33A9FF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{perizinan.title}</Text>
      </View>
      {perizinan.image_url && (
        <Image source={{ uri: perizinan.image_url }} style={styles.image} />
      )}
      {/* {perizinan.subtitle && <Text style={styles.subtitle}>{perizinan.subtitle}</Text>} */}
      {perizinan.description && <Text style={styles.description}>{perizinan.description}</Text>}
    </ScrollView>
  );
}
