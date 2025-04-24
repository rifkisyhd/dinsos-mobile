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

const API_BASE_URL = "https://sapabansos.dinsos.jatimprov.go.id";
const API_TOKEN = Constants.expoConfig?.extra?.API_TOKEN || "";
const PROGRAM_LIST = ["aspd", "bnba", "bpnt", "pkh", "bst"];

const DataTable = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedProgram, setSelectedProgram] = useState("aspd");
    const [selectedEndpoint, setSelectedEndpoint] = useState("rekapitulasi");
    const [kabupatens, setKabupatens] = useState(["all"]);
    const [selectedKabupaten, setSelectedKabupaten] = useState("all");
    const [periodes, setPeriodes] = useState(["all"]);
    const [selectedPeriode, setSelectedPeriode] = useState("all");

    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const networkState = await NetInfo.fetch();
            if (!networkState.isConnected) throw new Error("Tidak ada koneksi internet.");

            const apiUrl = `${API_BASE_URL}/api/${selectedEndpoint}/${selectedProgram}`;
            const res = await fetch(apiUrl, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_TOKEN}`,
                },
            });

            if (!res.ok) throw new Error(`Server error: ${res.status}`);

            const json = await res.json();

            if (json?.data && Array.isArray(json.data)) {
                setData(json.data);
                setFilteredData(json.data);
                setKabupatens(["all", ...new Set(json.data.map((i) => i.kabupaten))]);
                setPeriodes(["all", ...new Set(json.data.map((i) => i.periode))]);
            } else {
                throw new Error("Format data tidak sesuai");
            }
        } catch (err) {
            setError(`Gagal mengambil data: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedEndpoint, selectedProgram]);

    useEffect(() => {
        let result = [...data];

        if (selectedKabupaten !== "all") {
            result = result.filter((i) => i.kabupaten === selectedKabupaten);
        }
        if (selectedPeriode !== "all") {
            result = result.filter((i) => i.periode === selectedPeriode);
        }

        if (sortField) {
            result.sort((a, b) => {
                let valA = a[sortField];
                let valB = b[sortField];
                if (["dana", "sp2d", "tersalur"].includes(sortField)) {
                    valA = parseFloat(valA) || 0;
                    valB = parseFloat(valB) || 0;
                }
                if (typeof valA === "string") {
                    return sortDirection === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
                }
                return sortDirection === "asc" ? valA - valB : valB - valA;
            });
        }

        setFilteredData(result);
    }, [selectedKabupaten, selectedPeriode, data, sortField, sortDirection]);

    const formatRupiah = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const renderSortIndicator = (field) => {
        if (sortField === field) {
            return <Text style={styles.sortIndicator}>{sortDirection === "asc" ? " ▲" : " ▼"}</Text>;
        }
        return null;
    };

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cellKabupaten}>{item.kabupaten}</Text>
            <Text style={styles.cellNumeric}>{item.sp2d}</Text>
            <Text style={styles.cellNumeric}>{formatRupiah(item.dana)}</Text>
            <Text style={styles.cellNumeric}>{item.tersalur}%</Text>
            <Text style={styles.cellPeriode}>{item.periode}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.kabupaten}-${item.periode}-${index}`}
                initialNumToRender={10}
                ListHeaderComponent={
                    <>
                        <Text style={styles.title}>
                            Data SapaBansos {selectedProgram.toUpperCase()}
                        </Text>

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

                        <View style={styles.filterRow}>
                            <Text style={styles.filterLabel}>Kabupaten:</Text>
                            <Picker
                                selectedValue={selectedKabupaten}
                                onValueChange={(value) => setSelectedKabupaten(value)}
                                style={styles.picker}>
                                {kabupatens.map((kabupaten) => (
                                    <Picker.Item
                                        label={kabupaten === "all" ? "Semua Kabupaten" : kabupaten}
                                        value={kabupaten}
                                        key={kabupaten}
                                    />
                                ))}
                            </Picker>
                        </View>

                        <View style={styles.filterRow}>
                            <Text style={styles.filterLabel}>Periode:</Text>
                            <Picker
                                selectedValue={selectedPeriode}
                                onValueChange={(value) => setSelectedPeriode(value)}
                                style={styles.picker}>
                                {periodes.map((periode) => (
                                    <Picker.Item
                                        label={periode === "all" ? "Semua Periode" : periode}
                                        value={periode}
                                        key={periode}
                                    />
                                ))}
                            </Picker>
                        </View>

                        <TouchableOpacity style={styles.refreshButton} onPress={fetchData}>
                            <Text style={styles.refreshButtonText}>Refresh Data</Text>
                        </TouchableOpacity>

                        <View style={[styles.row, styles.header]}>
                            <TouchableOpacity style={[styles.cellKabupaten, styles.headerCell]} onPress={() => handleSort("kabupaten")}>
                                <Text style={styles.headerText}>Kabupaten{renderSortIndicator("kabupaten")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.cellNumeric, styles.headerCell]} onPress={() => handleSort("sp2d")}>
                                <Text style={styles.headerText}>SP2D{renderSortIndicator("sp2d")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.cellNumeric, styles.headerCell]} onPress={() => handleSort("dana")}>
                                <Text style={styles.headerText}>Dana{renderSortIndicator("dana")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.cellNumeric, styles.headerCell]} onPress={() => handleSort("tersalur")}>
                                <Text style={styles.headerText}>Tersalur{renderSortIndicator("tersalur")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.cellPeriode, styles.headerCell]} onPress={() => handleSort("periode")}>
                                <Text style={styles.headerText}>Periode{renderSortIndicator("periode")}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }
                ListEmptyComponent={
                    loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#33A9FF" />
                            <Text style={styles.loadingText}>Memuat data...</Text>
                        </View>
                    ) : error ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                            <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
                                <Text style={styles.retryText}>Coba Lagi</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>Tidak ada data yang tersedia</Text>
                        </View>
                    )
                }
            />
        </View>
    );
};

export default DataTable;
