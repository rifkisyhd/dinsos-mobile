import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Linking,
  Platform,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';

const ContactScreen = () => {
  const router = useRouter();

  const contactInfo = [
    { 
      id: 1, 
      type: 'phone', 
      icon: <Ionicons name="call" size={24} color="white" />, 
      text: '031-8290794', 
      onPress: () => Linking.openURL('tel:0318290794') 
    },
    { 
      id: 2, 
      type: 'email', 
      icon: <MaterialIcons name="email" size={24} color="white" />, 
      text: 'dinsosjatim56b@gmail.com', 
      onPress: () => Linking.openURL('mailto:dinsosjatim56b@gmail.com') 
    },
    { 
      id: 3, 
      type: 'address', 
      icon: <Ionicons name="location" size={24} color="white" />, 
      text: 'Jl. Gayung Kebonsari No.56b, Gayungan, Kec. Gayungan, Kota SBY, Jawa Timur 60235', 
      onPress: null 
    },
    { 
      id: 4, 
      type: 'instagram', 
      icon: <FontAwesome name="instagram" size={24} color="white" />, 
      text: '@dinsosjatim', 
      onPress: () => Linking.openURL('https://instagram.com/dinsosjatim') 
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Kontak</Text>
      </View>

      <View style={styles.contactCard}>
        <View style={styles.contactHeaderContainer}>
          <View>
            <Text style={styles.contactHeaderTitle}>Informasi Kontak</Text>
            <Text style={styles.contactHeaderSubtitle}>Berikan Suara Anda!</Text>
          </View>
          <Image 
            source={require('../../assets/images/logo_dinsos.png')} 
            style={styles.logo}
          />
        </View>

        <View style={styles.contactInfoContainer}>
          {contactInfo.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.contactItem}
              onPress={item.onPress}
              disabled={!item.onPress}
            >
              <View style={styles.iconContainer}>
                {item.icon}
              </View>
              <Text style={styles.contactText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
};

export default ContactScreen;