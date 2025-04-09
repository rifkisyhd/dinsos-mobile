import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useRouter } from "expo-router";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase";

export default function LayananScreen() {
    const router = useRouter();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesCollection = collection(db, 'db_layanan');
                const servicesSnapshot = await getDocs(servicesCollection);
                const servicesList = servicesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setServices(servicesList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching services: ", error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#33A9FF" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#33A9FF" />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Layanan</Text>
            </View>
            
            {/* Services List */}
            <View style={styles.content}>
                {services.map((item) => (
                    <TouchableOpacity 
                        key={item.id} 
                        style={styles.card}
                        onPress={() => {/* Optional navigation logic */}}
                    >
                        <View style={styles.cardContent}>
                            <View style={styles.cardTextContainer}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                {item.subtitle && (
                                    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                                )}
                            </View>
                            {item.imageUrl && (
                                <Image 
                                    source={{ uri: item.imageUrl }} 
                                    style={styles.cardImage} 
                                    resizeMode="contain"
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.homeIndicator} />
        </SafeAreaView>
    );
}

const additionalStyles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});