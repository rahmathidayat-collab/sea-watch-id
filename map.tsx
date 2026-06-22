import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function MapScreen() {
  const { lat, lng, shipName } = useLocalSearchParams();

  const openMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Peta {shipName} tidak dapat dimuat di dalam aplikasi.</Text>
      <TouchableOpacity style={styles.button} onPress={openMap}>
        <Text style={styles.buttonText}>Buka di Google Maps</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A192F' },
  text: { color: '#CCD6F6', marginBottom: 20 },
  button: { backgroundColor: '#64FFDA', padding: 15, borderRadius: 10 },
  buttonText: { color: '#0A192F', fontWeight: 'bold' }
});