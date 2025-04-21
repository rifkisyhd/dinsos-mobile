import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#39b4ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 20,
    marginTop: Platform.OS === "ios" ? 0 : 36,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  sectionContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
  },
  programCard: {
    flexDirection: "row", // Membuat gambar dan teks sejajar
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 20,
    alignItems: "center", // Agar konten di dalam card terpusat secara vertikal
  },
  programsContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Menjaga jarak antara elemen-elemen
    width: "100%", // Agar konten bisa mengisi seluruh lebar container
  },
  programItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%", // Membuat item memenuhi lebar
  },
  iconContainer: {
    width: 80, // Mengurangi ukuran gambar agar lebih proporsional
    height: 80,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16, // Memberikan jarak antara gambar dan teks
  },
  icon: {
    width: 100, // Ukuran gambar yang lebih kecil
    height: 100, 
    borderRadius: 30, // Menjaga gambar tetap bulat
  },
  programName: {
    marginLeft: 30,
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1, // Agar teks tidak keluar dari container
  },
  homeIndicator: Platform.select({
    ios: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 34,
      backgroundColor: "#f5f5f5",
    },
    android: {}, // Di Android nggak ada style
  }),
});
