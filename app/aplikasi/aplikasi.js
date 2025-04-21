import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useRouter } from "expo-router";
import { supabase } from '../../lib/supabaseClient';
import LoadingScreen from '../components/LoadingScreen';

export default function PerizinanScreen() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

   
  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from('tb_aplikasi').select('*');
      if (!error && Array.isArray(data)) {
        setServices(data);
      } else {
        setServices([]); 
      }
      setLoading(false);
    };
    fetchServices();
  }, []);
  
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#33A9FF" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aplikasi</Text>
      </View>

      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.content}>
        {services.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => {
              if (item.onclicklink) {
                Linking.openURL(item.onclicklink);
              }
            }}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
              {item.image_url && (
                <Image source={{ uri: item.image_url }} style={styles.cardImage} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    )}

      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}
