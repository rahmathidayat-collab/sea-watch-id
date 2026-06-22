import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function ShipDetailScreen() {
  const { shipId } = useLocalSearchParams<{ shipId: string }>();
  const router = useRouter();
  const [ship, setShip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fungsi Feedback Otomatis (History)
  const saveHistory = async (shipData: any) => {
    try {
      await axios.post('https://fir-db-654c4-default-rtdb.asia-southeast1.firebasedatabase.app/history.json', {
        shipName: shipData.shipName,
        timestamp: new Date().toLocaleString()
      });
    } catch (e) { console.log("Feedback gagal"); }
  };

  useEffect(() => {
    axios.get('https://fir-db-654c4-default-rtdb.asia-southeast1.firebasedatabase.app/ships.json')
      .then(res => {
        const list: any[] = Object.values(res.data || {}).filter(item => item !== null);
        const found = list.find((s: any) => String(s.id) === String(shipId));
        if (found) {
          setShip(found);
          saveHistory(found);
        }
      })
      .finally(() => setLoading(false));
  }, [shipId]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#64FFDA" /></View>;
  if (!ship) return <View style={styles.center}><Text style={{color: '#ff4d4d'}}>Data Kapal Tidak Ditemukan!</Text></View>;

  return (
    <ScrollView style={styles.container}>
      {/* Header dengan Status Kapal */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{ship.shipName}</Text>
        <View style={[styles.badge, { backgroundColor: ship.status === 'Aktif' ? '#4CAF50' : '#F44336' }]}>
            <Text style={{color:'#fff', fontSize: 10}}>{ship.status || "Aktif"}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.info}>🚢 Tipe: {ship.type}</Text>
        <Text style={styles.info}>⚡ Speed: {ship.speed} knot</Text>
        <Text style={styles.info}>📍 Area: {ship.area}</Text>
        <Text style={styles.info}>👤 Owner: {ship.owner || "TNI AL"}</Text>
      </View>

      <TouchableOpacity style={styles.mapButton} onPress={() => router.push({ pathname: "/map", params: { lat: ship.latitude, lng: ship.longitude, shipName: ship.shipName } } as any)}>
        <Text style={{fontWeight: 'bold', color: '#0A192F'}}>📍 Lihat Posisi di Peta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A192F', padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A192F' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 26, color: '#64FFDA', fontWeight: 'bold' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  card: { backgroundColor: '#112240', padding: 20, borderRadius: 15 },
  info: { color: '#CCD6F6', marginBottom: 15, fontSize: 16 },
  mapButton: { backgroundColor: '#64FFDA', padding: 18, borderRadius: 10, marginTop: 25, alignItems: 'center' }
});