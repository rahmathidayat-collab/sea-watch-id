import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const goToResults = (query: string) => {
    router.push({ pathname: '/shiplist', params: { query } } as any);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Banner Utama */}
      <View style={styles.banner}>
        <Text style={styles.title}>SEA WATCH ID</Text>
        <Text style={styles.subtitle}>Pantau posisi kapal secara real-time</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <TextInput 
          style={styles.input} 
          placeholder="Cari nama kapal..." 
          placeholderTextColor="#8892B0"
          onChangeText={setKeyword}
        />
        <TouchableOpacity style={styles.btn} onPress={() => goToResults(keyword)}>
          <Text style={styles.btnText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Wilayah dengan Icon */}
      <Text style={styles.sectionTitle}>Pilih Wilayah Operasi</Text>
      <View style={styles.grid}>
        {[
          { name: 'Tanjung Priok', icon: '🏗️' },
          { name: 'Tanjung Perak', icon: '⚓' },
          { name: 'Bali', icon: '🏖️' },
          { name: 'Batam', icon: '🚢' }
        ].map(item => (
          <TouchableOpacity key={item.name} style={styles.card} onPress={() => goToResults(item.name)}>
            <Text style={styles.cardIcon}>{item.icon}</Text>
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A192F', padding: 20 },
  banner: { marginTop: 60, marginBottom: 30, padding: 20, backgroundColor: '#112240', borderRadius: 20 },
  title: { fontSize: 32, fontWeight: '900', color: '#64FFDA' },
  subtitle: { color: '#8892B0', marginTop: 5 },
  searchBox: { flexDirection: 'row', marginBottom: 30 },
  input: { flex: 1, backgroundColor: '#112240', borderRadius: 15, padding: 15, color: '#fff', borderWidth: 1, borderColor: '#233554' },
  btn: { backgroundColor: '#64FFDA', padding: 15, borderRadius: 15, marginLeft: 10 },
  btnText: { fontSize: 20 },
  sectionTitle: { fontSize: 18, color: '#CCD6F6', fontWeight: 'bold', marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '47%', backgroundColor: '#112240', padding: 20, borderRadius: 20, alignItems: 'center', marginBottom: 15 },
  cardIcon: { fontSize: 30, marginBottom: 10 },
  cardText: { color: '#CCD6F6', fontWeight: '600' }
});
