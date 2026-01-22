import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyState = ({ message = 'Nothing to show' }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  text: { fontSize: 16, color: '#6c757d' }
});

export default EmptyState;
