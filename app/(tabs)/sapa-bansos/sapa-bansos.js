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

// Daftar program yang tersedia
const PROGRAM_LIST = [
    "PKH-plus",
    "KE",
    "BLT",
    "ASPD",
    "kpm-jawara",
    "putri-jawara",
    "lkspd",
    "eks-ppks-jawara",
    "kemandirian-eks-ppks-jawara",
];

const DataTable = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [columns, setColumns] = useState([]);

    // State untuk filter
    const [selectedProgram, setSelectedProgram] = useState("ASPD");
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

            const apiUrl = `${API_BASE_URL}/api/${selectedEndpoint}/${selectedProgram.toLowerCase()}`;
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
            console.log("Respons API:", json.message ?? 'Data Berhasil Ditemukan');

            // Ekstrak data dari respons
            if (json && json.data && Array.isArray(json.data)) {
                // Simpan data mentah
                const rawData = json.data;
                
                // Tentukan kolom berdasarkan data pertama
                if (rawData.length > 0) {
                    const firstItem = rawData[0];
                    const dynamicColumns = detectColumns(firstItem);
                    setColumns(dynamicColumns);
                    console.log("Kolom terdeteksi:", dynamicColumns.map(col => col.id));
                }

                setData(rawData);
                setFilteredData(rawData);

                // Ekstrak kabupaten unik untuk filter (jika ada)
                if (rawData.length > 0 && rawData[0].kabupaten) {
                    const uniqueKabupatens = [
                        "all",
                        ...new Set(rawData.map((item) => item.kabupaten).filter(Boolean)),
                    ];
                    setKabupatens(uniqueKabupatens);
                }

                // Ekstrak periode unik untuk filter (jika ada)
                if (rawData.length > 0 && rawData[0].periode) {
                    const uniquePeriodes = [
                        "all",
                        ...new Set(rawData.map((item) => item.periode).filter(Boolean)),
                    ];
                    setPeriodes(uniquePeriodes);
                }

                console.log(`Data berhasil diproses: ${rawData.length} item`);
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

    // Deteksi kolom berdasarkan data
    const detectColumns = (dataItem) => {
        const detectedColumns = [];

        // Cek apakah data adalah data individu (PKH+)
        if (dataItem.nik && dataItem.nama) {
            // Format data individu (PKH+)
            detectedColumns.push({ id: 'nama', label: 'Nama', style: styles.cellNama });
            
            if (dataItem.nik) {
                detectedColumns.push({ id: 'nik', label: 'NIK', style: styles.cellNik });
            }
            
            if (dataItem.alamat) {
                detectedColumns.push({ id: 'alamat', label: 'Alamat', style: styles.cellLocation });
            }
            
            if (dataItem.kabupaten) {
                detectedColumns.push({ id: 'kabupaten', label: 'Kabupaten', style: styles.cellLocation });
            }
            
            if (dataItem.kecamatan) {
                detectedColumns.push({ id: 'kecamatan', label: 'Kecamatan', style: styles.cellLocation });
            }
            
            if (dataItem.kelurahan) {
                detectedColumns.push({ id: 'kelurahan', label: 'Kelurahan', style: styles.cellLocation });
            }
        }
        // Cek apakah data adalah agregasi (ASPD)
        else if (dataItem.kabupaten && (dataItem.sp2d !== undefined || dataItem.dana !== undefined)) {
            // Format data agregasi (ASPD)
            detectedColumns.push({ id: 'kabupaten', label: 'Kabupaten', style: styles.cellKabupaten });
            
            if (dataItem.program) {
                detectedColumns.push({ id: 'program', label: 'Program', style: styles.cellLocation });
            }
            
            if (dataItem.sp2d !== undefined) {
                detectedColumns.push({ id: 'sp2d', label: 'SP2D', style: styles.cellNumeric });
            }
            
            if (dataItem.dana !== undefined) {
                detectedColumns.push({ id: 'dana', label: 'Dana', style: styles.cellNumeric, format: 'currency' });
            }
            
            if (dataItem.tersalur !== undefined) {
                detectedColumns.push({ id: 'tersalur', label: 'Tersalur (%)', style: styles.cellNumeric, format: 'percent' });
            }
        }
        
        // Tambahkan kolom periode jika ada
        if (dataItem.periode) {
            detectedColumns.push({ id: 'periode', label: 'Periode', style: styles.cellPeriode });
        }
        
        // Jika tidak terdeteksi format tertentu, gunakan Object.keys untuk mendapatkan semua kolom
        if (detectedColumns.length === 0) {
            const keys = Object.keys(dataItem);
            keys.forEach(key => {
                let style;
                let format;
                
                // Tentukan style berdasarkan nama kolom
                if (key === 'kabupaten') {
                    style = styles.cellKabupaten;
                } else if (['dana', 'sp2d', 'tersalur'].includes(key)) {
                    style = styles.cellNumeric;
                    format = key === 'dana' ? 'currency' : (key === 'tersalur' ? 'percent' : null);
                } else if (key === 'periode') {
                    style = styles.cellPeriode;
                } else {
                    style = styles.cellDefault;
                }
                
                detectedColumns.push({ id: key, label: capitalizeFirstLetter(key), style, format });
            });
        }
        
        return detectedColumns;
    };

    // Fungsi helper untuk kapitalisasi huruf pertama
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
                
                // Handle null/undefined values
                if (valueA === undefined || valueA === null) valueA = '';
                if (valueB === undefined || valueB === null) valueB = '';
                
                // Konversi ke number jika nilai berupa angka atau uang
                if (['dana', 'sp2d', 'tersalur'].includes(sortField)) {
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

    // Format nilai berdasarkan jenisnya
    const formatValue = (value, format) => {
        if (value === undefined || value === null) return '-';
        
        switch (format) {
            case 'currency':
                return formatRupiah(value);
            case 'percent':
                return `${value}%`;
            default:
                return value;
        }
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
    const renderItem = ({ item }) => {
        return (
            <View style={styles.row}>
                {columns.map((column) => (
                    <Text key={column.id} style={column.style}>
                        {column.format 
                            ? formatValue(item[column.id], column.format)
                            : item[column.id] || '-'}
                    </Text>
                ))}
            </View>
        );
    };

    // Fungsi untuk render arrow sorting indikator
    const renderSortIndicator = (field) => {
        if (sortField === field) {
            return <Text style={styles.sortIndicator}>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</Text>;
        }
        return null;
    };

    // Render header sesuai dengan kolom yang terdeteksi
    const renderHeader = () => {
        return (
            <View style={[styles.row, styles.header]}>
                {columns.map((column) => (
                    <TouchableOpacity 
                        key={column.id}
                        style={[column.style, styles.headerCell]} 
                        onPress={() => handleSort(column.id)}>
                        <Text style={styles.headerText}>
                            {column.label}
                            {renderSortIndicator(column.id)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
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

            {/* Filter kabupaten (hanya tampilkan jika ada kolom kabupaten) */}
            {columns.some(col => col.id === 'kabupaten') && (
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
            )}

            {/* Filter periode (hanya tampilkan jika ada kolom periode) */}
            {columns.some(col => col.id === 'periode') && (
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
            )}

            {/* Tombol refresh */}
            <TouchableOpacity style={styles.refreshButton} onPress={fetchData}>
                <Text style={styles.refreshButtonText}>Refresh Data</Text>
            </TouchableOpacity>

            {/* Header tabel with sorting */}
            {columns.length > 0 && renderHeader()}

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
                        `${item.nik || item.kabupaten || ''}-${item.periode || ''}-${index}`
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