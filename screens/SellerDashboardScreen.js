import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import StatCard from '../components/StatCard';

const initialOrders = [
  { id: 12, product: 'Organic Tomatoes', status: 'approved', qty: 10 },
  { id: 13, product: 'Fresh Lettuce', status: 'pending', qty: 5 }
];

const SellerDashboardScreen = () => {
  const [product, setProduct] = useState({ title: '', price: '', quantity: '', location: '' });
  const [orders] = useState(initialOrders);

  const submitProduct = () => {
    Alert.alert('Submitted for approval', product.title || 'New product');
    setProduct({ title: '', price: '', quantity: '', location: '' });
  };

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <View>
          <Text style={styles.title}>Seller dashboard</Text>
          <View style={styles.statsRow}>
            <StatCard label="Views" value="1.2k" />
            <StatCard label="Top product" value="Tomatoes" />
            <StatCard label="Orders" value="24" />
          </View>
          <Text style={styles.section}>Add product</Text>
          <TextInput style={styles.input} value={product.title} placeholder="Title" onChangeText={(v) => setProduct({ ...product, title: v })} />
          <TextInput style={styles.input} value={product.price} placeholder="Price" keyboardType="numeric" onChangeText={(v) => setProduct({ ...product, price: v })} />
          <TextInput style={styles.input} value={product.quantity} placeholder="Quantity" keyboardType="numeric" onChangeText={(v) => setProduct({ ...product, quantity: v })} />
          <TextInput style={styles.input} value={product.location} placeholder="Location" onChangeText={(v) => setProduct({ ...product, location: v })} />
          <TouchableOpacity style={styles.button} onPress={submitProduct}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <Text style={styles.section}>Orders</Text>
        </View>
      }
      data={orders}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => (
        <View style={styles.orderCard}>
          <Text style={styles.bold}>Order #{item.id}</Text>
          <Text>Product: {item.product}</Text>
          <Text>Status: {item.status}</Text>
          <Text>Qty: {item.qty}</Text>
        </View>
      )}
      ListFooterComponent={<View style={{ height: 24 }} />}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  section: { fontSize: 18, fontWeight: '700', marginTop: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#d8f3dc', padding: 12, borderRadius: 10, marginBottom: 10 },
  button: { backgroundColor: '#1B4332', padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
  orderCard: { padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#eef2e6', marginTop: 10 },
  bold: { fontWeight: '700' }
});

export default SellerDashboardScreen;
