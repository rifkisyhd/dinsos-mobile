import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { styles } from "./styles";

const ProfilDinsosScreen = () => {
  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState({
    sekretariatTugas: false,
    sekretariatFungsi: false,
    rehabilitasiTugas: false,
    rehabilitasiFungsi: false,
    pemberdayaanTugas: false,
    pemberdayaanFungsi: false,
    perlindunganTugas: false,
    perlindunganFungsi: false,
  });

  // Toggle function for expanding/collapsing sections
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil Dinsos</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/poster-profil.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Alamat Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alamat</Text>
            <Text style={styles.sectionContent}>
              Jln. Gayung Kebonsari 56B, Gayungan, Kec. Gayungan, Kota Surabaya,
              Jawa Timur 60235
            </Text>
          </View>

          {/* Tugas Dan Fungsi Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tugas Dan Fungsi</Text>
            <Text style={styles.sectionContent}>
              Berdasarkan Peraturan Gubernur Jawa Timur Nomor 79 Tahun 2021
              tentang Kedudukan, Struktur Organisasi, Uraian Tugas dan Fungsi
              serta Tata Kerja Dinas, Berikut Tugas dan Fungsi Dinas Sosial
              Provinsi Jawa Timur
            </Text>
          </View>

          {/* Tugas Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tugas</Text>
            <Text style={styles.sectionContent}>
              membantu Gubernur menyelenggarakan urusan pemerintahan dan tugas
              pembantuan yang menjadi kewenangan Pemerintah Provinsi di bidang
              Sosial serta tugas pembantuan
            </Text>
          </View>

          {/* Fungsi Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fungsi</Text>
            <View style={styles.listContainer}>
              <View style={styles.listItem}>
                <Text style={styles.listNumber}>1.</Text>
                <Text style={styles.listText}>
                  perumusan kebijakan di bidang sosial;
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.listNumber}>2.</Text>
                <Text style={styles.listText}>
                  pelaksanaan kebijakan di bidang sosial;
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.listNumber}>3.</Text>
                <Text style={styles.listText}>
                  pelaksanaan evaluasi dan pelaporan di bidang sosial;
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.listNumber}>4.</Text>
                <Text style={styles.listText}>
                  pelaksanaan administrasi Dinas di bidang sosial; dan
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.listNumber}>5.</Text>
                <Text style={styles.listText}>
                  pelaksanaan fungsi lain yang diberikan oleh Gubernur terkait
                  dengan tugas dan fungsinya
                </Text>
              </View>
            </View>
          </View>

          {/* SEKRETARIAT */}
          <View style={styles.departmentSection}>
            <Text style={styles.departmentTitle}>
              TUGAS DAN FUNGSI SEKRETARIAT
            </Text>

            {/* Sekretariat Tugas */}
            <TouchableOpacity
              style={styles.toggleSection}
              onPress={() => toggleSection("sekretariatTugas")}
            >
              <Text style={styles.toggleText}>Tugas</Text>
              <Text style={styles.toggleIcon}>
                {expandedSections.sekretariatTugas ? "▼" : "▶"}
              </Text>
            </TouchableOpacity>

            {expandedSections.sekretariatTugas && (
              <View style={styles.expandedContent}>
                <Text style={styles.sectionContent}>
                  Sekretariat mempunyai tugas merencanakan, melaksanakan,
                  mengoordinasikan dan mengendalikan kegiatan administrasi umum,
                  kepegawaian, perlengkapan, penyusunan program, keuangan,
                  hubungan masyarakat dan protokol.
                </Text>
              </View>
            )}

            {/* Sekretariat Fungsi */}
            <TouchableOpacity
              style={styles.toggleSection}
              onPress={() => toggleSection("sekretariatFungsi")}
            >
              <Text style={styles.toggleText}>Fungsi</Text>
              <Text style={styles.toggleIcon}>
                {expandedSections.sekretariatFungsi ? "▼" : "▶"}
              </Text>
            </TouchableOpacity>

            {expandedSections.sekretariatFungsi && (
              <View style={styles.expandedContent}>
                <View style={styles.listContainer}>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>1.</Text>
                    <Text style={styles.listText}>
                      pengelolaan pelayanan administrasi umum dan perizinan;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>2.</Text>
                    <Text style={styles.listText}>
                      pengelolaan administrasi kepegawaian;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>3.</Text>
                    <Text style={styles.listText}>
                      pengelolaan administrasi keuangan;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>4.</Text>
                    <Text style={styles.listText}>
                      pengelolaan administrasi perlengkapan;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>5.</Text>
                    <Text style={styles.listText}>
                      pengelolaan aset dan barang milik negara/daerah;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>6.</Text>
                    <Text style={styles.listText}>
                      pengelolaan urusan rumah tangga, hubungan masyarakat dan
                      protokol;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>7.</Text>
                    <Text style={styles.listText}>
                      pelaksanaan koordinasi penyusunan program, anggaran dan
                      perundang-undangan;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>8.</Text>
                    <Text style={styles.listText}>
                      pelaksanaan koordinasi penyelesaian masalah hukum (non
                      yustisial) di bidang kepegawaian;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>9.</Text>
                    <Text style={styles.listText}>
                      pelaksanaan koordinasi penyelenggaraan tugas-tugas bidang;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>10.</Text>
                    <Text style={styles.listText}>
                      pengelolaan kearsipan dan perpustakaan;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>11.</Text>
                    <Text style={styles.listText}>
                      pelaksanaan monitoring serta evaluasi organisasi dan
                      tatalaksana;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>12.</Text>
                    <Text style={styles.listText}>
                      pelaksanaan tugas-tugas lain yang diberikan oleh Kepala
                      Dinas.
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* BIDANG REHABILITASI SOSIAL */}
          <View style={styles.departmentSection}>
            <Text style={styles.departmentTitle}>
              TUGAS DAN FUNGSI BIDANG REHABILITASI SOSIAL
            </Text>

            {/* Rehabilitasi Tugas */}
            <TouchableOpacity
              style={styles.toggleSection}
              onPress={() => toggleSection("rehabilitasiTugas")}
            >
              <Text style={styles.toggleText}>Tugas</Text>
              <Text style={styles.toggleIcon}>
                {expandedSections.rehabilitasiTugas ? "▼" : "▶"}
              </Text>
            </TouchableOpacity>

            {expandedSections.rehabilitasiTugas && (
              <View style={styles.expandedContent}>
                <Text style={styles.sectionContent}>
                  Bidang Rehabilitasi Sosial mempunyai tugas melaksanakan
                  sebagian tugas Dinas di bidang rehabilitasi sosial anak dan
                  lanjut usia, rehabilitasi sosial penyandang disabilitas, dan
                  rehabilitasi sosial, korban NAPZA, dan korban tindak kekerasan
                  dan perdagangan orang.
                </Text>
              </View>
            )}

            {/* Rehabilitasi Fungsi */}
            <TouchableOpacity
              style={styles.toggleSection}
              onPress={() => toggleSection("rehabilitasiFungsi")}
            >
              <Text style={styles.toggleText}>Fungsi</Text>
              <Text style={styles.toggleIcon}>
                {expandedSections.rehabilitasiFungsi ? "▼" : "▶"}
              </Text>
            </TouchableOpacity>

            {expandedSections.rehabilitasiFungsi && (
              <View style={styles.expandedContent}>
                <View style={styles.listContainer}>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>1.</Text>
                    <Text style={styles.listText}>
                      perumusan kebijakan teknis rehabilitasi sosial;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>2.</Text>
                    <Text style={styles.listText}>
                      pelaksanaan kebijakan teknis rehabilitasi sosial;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>3.</Text>
                    <Text style={styles.listText}>
                      pelaksanaan koordinasi dan pembinaan rehabilitasi sosial;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>4.</Text>
                    <Text style={styles.listText}>
                      pelaksanaan monitoring, evaluasi dan pelaporan
                      rehabilitasi sosial;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>5.</Text>
                    <Text style={styles.listText}>
                      pelaksanaan tugas-tugas lain yang diberikan oleh Kepala
                      Dinas.
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* BIDANG PEMBERDAYAAN SOSIAL */}
          <View style={styles.departmentSection}>
            <Text style={styles.departmentTitle}>
              TUGAS DAN FUNGSI BIDANG PEMBERDAYAAN SOSIAL
            </Text>

            {/* Pemberdayaan Tugas */}
            <TouchableOpacity
              style={styles.toggleSection}
              onPress={() => toggleSection("pemberdayaanTugas")}
            >
              <Text style={styles.toggleText}>Tugas</Text>
              <Text style={styles.toggleIcon}>
                {expandedSections.pemberdayaanTugas ? "▼" : "▶"}
              </Text>
            </TouchableOpacity>

            {expandedSections.pemberdayaanTugas && (
              <View style={styles.expandedContent}>
                <Text style={styles.sectionContent}>
                  Bidang Pemberdayaan Sosial mempunyai tugas melaksanakan
                  sebagian tugas Dinas di bidang identifikasi dan penguatan
                  kapasitas, pemberdayaan sosial perorangan, keluarga dan
                  kelembagaan masyarakat, kepahlawanan, keperintisan dan
                  restorasi sosial, serta pengelolaan sumber dana bantuan
                  sosial.
                </Text>
              </View>
            )}

            {/* Pemberdayaan Fungsi */}
            <TouchableOpacity
              style={styles.toggleSection}
              onPress={() => toggleSection("pemberdayaanFungsi")}
            >
              <Text style={styles.toggleText}>Fungsi</Text>
              <Text style={styles.toggleIcon}>
                {expandedSections.pemberdayaanFungsi ? "▼" : "▶"}
              </Text>
            </TouchableOpacity>

            {expandedSections.pemberdayaanFungsi && (
              <View style={styles.expandedContent}>
                <View style={styles.listContainer}>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>1.</Text>
                    <Text style={styles.listText}>
                      perumusan kebijakan teknis pemberdayaan sosial;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>2.</Text>
                    <Text style={styles.listText}>
                      pelaksanaan kebijakan teknis pemberdayaan sosial;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>3.</Text>
                    <Text style={styles.listText}>
                      pelaksanaan koordinasi dan pembinaan pemberdayaan sosial;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>4.</Text>
                    <Text style={styles.listText}>
                      pelaksanaan monitoring, evaluasi dan pelaporan
                      pemberdayaan sosial;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>5.</Text>
                    <Text style={styles.listText}>
                      pelaksanaan tugas-tugas lain yang diberikan oleh Kepala
                      Dinas.
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* BIDANG PERLINDUNGAN DAN JAMINAN SOSIAL */}
          <View style={styles.departmentSection}>
            <Text style={styles.departmentTitle}>
              TUGAS DAN FUNGSI BIDANG PERLINDUNGAN DAN JAMINAN SOSIAL
            </Text>

            {/* Perlindungan Tugas */}
            <TouchableOpacity
              style={styles.toggleSection}
              onPress={() => toggleSection("perlindunganTugas")}
            >
              <Text style={styles.toggleText}>Tugas</Text>
              <Text style={styles.toggleIcon}>
                {expandedSections.perlindunganTugas ? "▼" : "▶"}
              </Text>
            </TouchableOpacity>

            {expandedSections.perlindunganTugas && (
              <View style={styles.expandedContent}>
                <Text style={styles.sectionContent}>
                  Bidang Perlindungan dan Jaminan Sosial mempunyai tugas
                  melaksanakan sebagian tugas Dinas di bidang perlindungan
                  sosial korban bencana alam, perlindungan sosial korban bencana
                  sosial, dan jaminan sosial keluarga.
                </Text>
              </View>
            )}

            {/* Perlindungan Fungsi */}
            <TouchableOpacity
              style={styles.toggleSection}
              onPress={() => toggleSection("perlindunganFungsi")}
            >
              <Text style={styles.toggleText}>Fungsi</Text>
              <Text style={styles.toggleIcon}>
                {expandedSections.perlindunganFungsi ? "▼" : "▶"}
              </Text>
            </TouchableOpacity>

            {expandedSections.perlindunganFungsi && (
              <View style={styles.expandedContent}>
                <View style={styles.listContainer}>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>1.</Text>
                    <Text style={styles.listText}>
                      perumusan kebijakan teknis perlindungan dan jaminan
                      sosial;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>2.</Text>
                    <Text style={styles.listText}>
                      pelaksanaan kebijakan teknis perlindungan dan jaminan
                      sosial;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>3.</Text>
                    <Text style={styles.listText}>
                      pelaksanaan koordinasi dan pembinaan perlindungan dan
                      jaminan sosial;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>4.</Text>
                    <Text style={styles.listText}>
                      pelaksanaan monitoring, evaluasi dan pelaporan
                      perlindungan dan jaminan sosial;
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <Text style={styles.listNumber}>5.</Text>
                    <Text style={styles.listText}>
                      pelaksanaan tugas-tugas lain yang diberikan oleh Kepala
                      Dinas.
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilDinsosScreen;
