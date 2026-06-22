import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function HistoryScreen() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    axios.get('https://fir-db-654c4-default-rtdb.asia-southeast1.firebasedatabase.app/history.json')
      .then(res => {
        const data = res.data ? Object.values(res.data).reverse() : [];
        setHistory(data);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Riwayat Terakhir</Text>
      <FlatList 
        data={history}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{color:'#64FFDA', fontWeight:'bold'}}>{item.shipName}</Text>
            <Text style={{color:'#8892B0', fontSize:12}}>{item.timestamp}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A192F', padding: 20 },
  headerTitle: { fontSize: 22, color: '#fff', marginBottom: 20, marginTop: 40 },
  card: { backgroundColor: '#112240', padding: 15, borderRadius: 10, marginBottom: 10 }
});