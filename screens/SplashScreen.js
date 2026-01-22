import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Language');
    }, 1200);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agro Trade</Text>
      <Text style={styles.subtitle}>Connecting farms, stores, and clients</Text>
      <ActivityIndicator color="#fff" style={{ marginTop: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1B4332', padding: 24 },
  title: { fontSize: 32, color: '#fff', fontWeight: '700' },
  subtitle: { fontSize: 16, color: '#d8f3dc', marginTop: 8, textAlign: 'center' }
});

export default SplashScreen;
