import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const CheckoutScreen = ({ navigation }) => {
  const [address, setAddress] = useState('123 Farm Road, City');
  const [payment, setPayment] = useState('cash_on_delivery');

  const placeOrder = () => {
    Alert.alert('Order placed', 'Track your order in Orders tab.');
    navigation.replace('Orders');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Delivery address" />
      <TextInput style={styles.input} value={payment} onChangeText={setPayment} placeholder="Payment method" />
      <TouchableOpacity style={styles.button} onPress={placeOrder}>
        <Text style={styles.buttonText}>Place order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#d8f3dc', padding: 12, borderRadius: 10, marginBottom: 12 },
  button: { backgroundColor: '#1B4332', padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' }
});

export default CheckoutScreen;
