import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const USER_TYPES = [
  { 
    type: 'client', 
    label: 'Client', 
    description: 'Buy fresh products from local farmers',
    icon: 'cart-outline',
    color: '#2E7D32'
  },
  { 
    type: 'farmer', 
    label: 'Farmer', 
    description: 'Sell your farm products directly to buyers',
    icon: 'leaf-outline',
    color: '#F57C00'
  },
  { 
    type: 'store_owner', 
    label: 'Store Owner', 
    description: 'Manage your agricultural supply store',
    icon: 'storefront-outline',
    color: '#1565C0'
  },
];

const UserTypeScreen = ({ navigation }) => {
  const choose = (type) => {
    navigation.navigate('Login', { type });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🌿 AgroTrade</Text>
        <Text style={styles.title}>Choose Your Account Type</Text>
        <Text style={styles.subtitle}>Select how you want to use AgroTrade</Text>
      </View>

      <View style={styles.optionsContainer}>
        {USER_TYPES.map((item) => (
          <TouchableOpacity 
            key={item.type} 
            style={styles.optionCard} 
            onPress={() => choose(item.type)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={32} color={item.color} />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionLabel}>{item.label}</Text>
              <Text style={styles.optionDescription}>{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.footerText}>
        You can change your account type later in settings
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
    padding: 24
  },
  header: {
    marginTop: 60,
    marginBottom: 40
  },
  logo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B4332',
    marginBottom: 24
  },
  title: { 
    fontSize: 26, 
    fontWeight: '700', 
    color: '#333',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 15,
    color: '#666'
  },
  optionsContainer: {
    flex: 1
  },
  optionCard: { 
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16, 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  optionContent: {
    flex: 1
  },
  optionLabel: { 
    fontSize: 18, 
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  optionDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18
  },
  footerText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 13,
    marginBottom: 20
  }
});

export default UserTypeScreen;
