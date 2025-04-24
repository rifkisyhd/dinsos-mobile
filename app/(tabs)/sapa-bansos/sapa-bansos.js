import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { styles } from "./styles";
import { Picker } from "@react-native-picker/picker";
import NetInfo from "@react-native-community/netinfo";
import Constants from "expo-constants";

// Konfigurasi API
const API_BASE_URL = "https://sapabansos.dinsos.jatimprov.go.id";
const API_TOKEN = Constants.expoConfig?.extra?.API_TOKEN || "";

// Daftar program yang tersedia (sesuaikan dengan program yang ada)
const PROGRAM_LIST = ["aspd", "bnba", "bpnt", "pkh", "bst"];

const DataTable = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State untuk filter
    const [selectedProgram, setSelectedProgram] = useState("aspd");
    const [selectedEndpoint, setSelectedEndpoint] = useState("rekapitulasi");
    const [kabupatens, setKabupatens] = useState(["all"]);
    const [selectedKabupaten, setSelectedKabupaten] = useState("all");
    const [periodes, setPeriodes] = useState(["all"]);
    const [selectedPeriode, setSelectedPeriode] = useState("all");

    // State untuk sorting
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    // Fungsi untuk mengambil data dari API
    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            // NetInfo untuk memeriksa koneksi
            const networkState = await NetInfo.fetch();
            if (!networkState.isConnected) {
                throw new Error(
                    "Tidak ada koneksi internet. Silakan periksa koneksi Anda.",
                );
            }

            const apiUrl = `${API_BASE_URL}/api/${selectedEndpoint}/${selectedProgram}`;
            console.log("Mengakses API:", apiUrl);

            const res = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_TOKEN}`,
                },
                timeout: 15000,
            });

            if (!res.ok) {
                console.error("Response status:", res.status);
                const errorText = await res.text();
                console.error("Error response:", errorText);
                throw new Error(
                    `Server error: ${res.status} ${res.statusText}`,
                );
            }

            const json = await res.json();
            console.log("Respons API :", json.message ?? 'Data Berhasil Ditemukan');

            // Ekstrak data dari respons
            if (json && json.data && Array.isArray(json.data)) {
                setData(json.data);
                setFilteredData(json.data);

                // Ekstrak kabupaten unik untuk filter
                const uniqueKabupatens = [
                    "all",
                    ...new Set(json.data.map((item) => item.kabupaten)),
                ];
                setKabupatens(uniqueKabupatens);

                // Ekstrak periode unik untuk filter
                const uniquePeriodes = [
                    "all",
                    ...new Set(json.data.map((item) => item.periode)),
                ];
                setPeriodes(uniquePeriodes);

                console.log(`Data berhasil diproses: ${json.data.length} item`);
            } else {
                console.log("Struktur data tidak sesuai:", json);
                throw new Error("Format data tidak sesuai yang diharapkan");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError(`Gagal mengambil data: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Memuat data saat komponen dimuat atau filter endpoint/program berubah
    useEffect(() => {
        fetchData();
    }, [selectedEndpoint, selectedProgram]);

    // Filter dan sort data
    useEffect(() => {
        let result = [...data];

        // Filter berdasarkan kabupaten
        if (selectedKabupaten !== "all") {
            result = result.filter(
                (item) => item.kabupaten === selectedKabupaten,
            );
        }

        // Filter berdasarkan periode
        if (selectedPeriode !== "all") {
            result = result.filter((item) => item.periode === selectedPeriode);
        }

        // Sort data jika sortField ada
        if (sortField) {
            result.sort((a, b) => {
                let valueA = a[sortField];
                let valueB = b[sortField];
                
                // Konversi ke number jika nilai berupa angka
                if (sortField === 'dana' || sortField === 'sp2d' || sortField === 'tersalur') {
                    valueA = parseFloat(valueA) || 0;
                    valueB = parseFloat(valueB) || 0;
                }
                
                // String comparison untuk text
                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return sortDirection === 'asc' 
                        ? valueA.localeCompare(valueB) 
                        : valueB.localeCompare(valueA);
                }
                
                // Number comparison
                return sortDirection === 'asc' 
                    ? valueA - valueB 
                    : valueB - valueA;
            });
        }

        setFilteredData(result);
    }, [selectedKabupaten, selectedPeriode, data, sortField, sortDirection]);

    // Format angka rupiah
    const formatRupiah = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Fungsi untuk menangani sorting
    const handleSort = (field) => {
        // Jika mengklik field yang sama, ubah arah sorting
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Jika field baru, set ke ascending
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Render item di dalam FlatList
    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cellKabupaten}>{item.kabupaten}</Text>
            <Text style={styles.cellNumeric}>{item.sp2d}</Text>
            <Text style={styles.cellNumeric}>{formatRupiah(item.dana)}</Text>
            <Text style={styles.cellNumeric}>{item.tersalur}%</Text>
            <Text style={styles.cellPeriode}>{item.periode}</Text>
        </View>
    );

    // Fungsi untuk render arrow sorting indikator
    const renderSortIndicator = (field) => {
        if (sortField === field) {
            return <Text style={styles.sortIndicator}>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</Text>;
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <Text style={styles.title}>
                Data SapaBansos {selectedProgram.toUpperCase()}
            </Text>

            {/* Filter jenis data */}
            <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Jenis Data:</Text>
                <Picker
                    selectedValue={selectedEndpoint}
                    onValueChange={(value) => setSelectedEndpoint(value)}
                    style={styles.picker}>
                    <Picker.Item label="Rekapitulasi" value="rekapitulasi" />
                    <Picker.Item label="BNBA" value="bnba" />
                </Picker>
            </View>

            {/* Filter program */}
            <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Program:</Text>
                <Picker
                    selectedValue={selectedProgram}
                    onValueChange={(value) => setSelectedProgram(value)}
                    style={styles.picker}>
                    {PROGRAM_LIST.map((program) => (
                        <Picker.Item
                            label={program.toUpperCase()}
                            value={program}
                            key={program}
                        />
                    ))}
                </Picker>
            </View>

            {/* Filter kabupaten */}
            <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Kabupaten:</Text>
                <Picker
                    selectedValue={selectedKabupaten}
                    onValueChange={(value) => setSelectedKabupaten(value)}
                    style={styles.picker}>
                    {kabupatens.map((kabupaten) => (
                        <Picker.Item
                            label={
                                kabupaten === "all"
                                    ? "Semua Kabupaten"
                                    : kabupaten
                            }
                            value={kabupaten}
                            key={kabupaten}
                        />
                    ))}
                </Picker>
            </View>

            {/* Filter periode */}
            <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Periode:</Text>
                <Picker
                    selectedValue={selectedPeriode}
                    onValueChange={(value) => setSelectedPeriode(value)}
                    style={styles.picker}>
                    {periodes.map((periode) => (
                        <Picker.Item
                            label={
                                periode === "all" ? "Semua Periode" : periode
                            }
                            value={periode}
                            key={periode}
                        />
                    ))}
                </Picker>
            </View>

            {/* Tombol refresh */}
            <TouchableOpacity style={styles.refreshButton} onPress={fetchData}>
                <Text style={styles.refreshButtonText}>Refresh Data</Text>
            </TouchableOpacity>

            {/* Header tabel with sorting */}
            <View style={[styles.row, styles.header]}>
                <TouchableOpacity  
                    style={[styles.cellKabupaten, styles.headerCell]} 
                    onPress={() => handleSort('kabupaten')}>
                    <Text style={styles.headerText}>
                        Kabupaten
                        {renderSortIndicator('kabupaten')}
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.cellNumeric, styles.headerCell]} 
                    onPress={() => handleSort('sp2d')}>
                    <Text style={styles.headerText}>
                        SP2D
                        {renderSortIndicator('sp2d')}
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.cellNumeric, styles.headerCell]} 
                    onPress={() => handleSort('dana')}>
                    <Text style={styles.headerText}>
                        Dana
                        {renderSortIndicator('dana')}
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.cellNumeric, styles.headerCell]} 
                    onPress={() => handleSort('tersalur')}>
                    <Text style={styles.headerText}>
                        Tersalur
                        {renderSortIndicator('tersalur')}
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.cellPeriode, styles.headerCell]} 
                    onPress={() => handleSort('periode')}>
                    <Text style={styles.headerText}>
                        Periode
                        {renderSortIndicator('periode')}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Loading indicator */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#33A9FF" />
                    <Text style={styles.loadingText}>Memuat data...</Text>
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={fetchData}>
                        <Text style={styles.retryText}>Coba Lagi</Text>
                    </TouchableOpacity>
                </View>
            ) : filteredData.length > 0 ? (
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) =>
                        `${item.kabupaten}-${item.periode}-${index}`
                    }
                    initialNumToRender={10}
                />
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>
                        Tidak ada data yang tersedia
                    </Text>
                </View>
            )}
        </View>
    );
};

export default DataTable;