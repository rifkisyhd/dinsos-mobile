import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Dropdown

const token = Constants.expoConfig.extra.API_TOKEN;
const url = `${Constants.expoConfig.extra.API_BASE_URL}/endpoint`;

const apiKey =
    Constants.expoConfig?.extra?.API_BASE_URL ||
    process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey });

const DataTable = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("all");
    const [loading, setLoading] = useState(true);

    // Fetch data dari API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    "https://https://sapabansos.dinsos.jatimprov.go.id//api/rekapitulasi/aspd/2024",
                );
                const json = await res.json();
                setData(json);
                setFilteredData(json);
                const uniqueCities = [
                    "all",
                    ...new Set(json.map((item) => item.city)),
                ];
                setCities(uniqueCities);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filtering berdasarkan kota
    useEffect(() => {
        if (selectedCity === "all") {
            setFilteredData(data);
        } else {
            setFilteredData(data.filter((item) => item.city === selectedCity));
        }
    }, [selectedCity]);

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.city}</Text>
            <Text style={styles.cell}>{item.email}</Text>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#33A9FF" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Daftar Pengguna</Text>

            {/* Dropdown filter */}
            <Picker
                selectedValue={selectedCity}
                onValueChange={(itemValue) => setSelectedCity(itemValue)}
                style={styles.picker}>
                {cities.map((city) => (
                    <Picker.Item label={city} value={city} key={city} />
                ))}
            </Picker>

            {/* Header */}
            <View style={[styles.row, styles.header]}>
                <Text style={[styles.cell, styles.headerText]}>Nama</Text>
                <Text style={[styles.cell, styles.headerText]}>Kota</Text>
                <Text style={[styles.cell, styles.headerText]}>Email</Text>
            </View>

            {/* Data */}
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default DataTable;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
    },
    picker: {
        marginBottom: 12,
        backgroundColor: "#f0f0f0",
    },
    row: {
        flexDirection: "row",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
    cell: {
        flex: 1,
        fontSize: 14,
    },
    header: {
        backgroundColor: "#33A9FF",
    },
    headerText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
