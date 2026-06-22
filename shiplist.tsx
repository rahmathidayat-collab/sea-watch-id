import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function ShipListScreen() {
  const { query } = useLocalSearchParams<{ query: string }>();
  const router = useRouter();
  const [ships, setShips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://fir-db-654c4-default-rtdb.asia-southeast1.firebasedatabase.app/ships.json');
        const rawData = Object.values(res.data || {}).filter(s => s !== null);
        
        const q = (query || "").toLowerCase().trim();
        const filtered = rawData.filter((s: any) => {
          const name = s.shipName?.toLowerCase() || "";
          const area = s.area?.toLowerCase().trim() || "";
          return name.includes(q) || area === q;
        });
        
        setShips(filtered);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, [query]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#64FFDA" /></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Hasil Pencarian: {query || "Semua Kapal"}</Text>
      
      {ships.length === 0 ? (
        <Text style={styles.noData}>Tidak ada kapal ditemukan di wilayah ini.</Text>
      ) : (
        <FlatList
          data={ships}
          keyExtractor={(item: any) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => router.push({ pathname: '/shipdetail', params: { shipId: item.id } } as any)}
            >
              <Text style={styles.title}>🚢 {item.shipName}</Text>
              <Text style={styles.text}>📍 {item.area}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A192F', padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A192F' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#64FFDA', marginBottom: 20, marginTop: 40 },
  noData: { color: '#8892B0', textAlign: 'center', marginTop: 20, fontSize: 16 },
  card: { backgroundColor: '#112240', padding: 15, borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#233554' },
  title: { color: '#CCD6F6', fontSize: 18, fontWeight: 'bold' },
  text: { color: '#8892B0', marginTop: 5 }
});