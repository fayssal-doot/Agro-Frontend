import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StatCard = ({ title, value, icon, color = '#2E7D32' }) => {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon || 'stats-chart'} size={24} color={color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export default StatCard;
