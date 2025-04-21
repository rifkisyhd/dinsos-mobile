import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';

const DataScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBNBA = async () => {
    try {
      const res = await fetch('https://sapabansos.dinsos.jatimprov.go.id/api/bnba/sosial/2024');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const json = await res.json();
      console.log('Data yang diambil:', json); // Menampilkan data di console untuk debugging
      setData(json);
    } catch (err) {
      console.error('Gagal fetch:', err);
      setData([]); // Menangani error dengan mengosongkan data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBNBA();
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <Text>{JSON.stringify(item)}</Text>
          )}
        />
      )}
    </View>
  );
};

export default DataScreen;
