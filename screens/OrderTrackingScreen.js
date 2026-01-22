import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/slices/orderSlice';

const OrderTrackingScreen = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your orders</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => `${item.id}`}
        refreshControl={<RefreshControl refreshing={status === 'loading'} onRefresh={() => dispatch(fetchOrders())} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.label}>Order #{item.id}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Product: {item.product?.title || 'N/A'}</Text>
            <Text>Qty: {item.quantity}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.muted}>{status === 'loading' ? 'Loading...' : 'No orders yet'}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f6fff6' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12, color: '#1B4332' },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#eef2e6' },
  label: { fontWeight: '700' },
  muted: { color: '#6c757d', textAlign: 'center', marginTop: 16 }
});

export default OrderTrackingScreen;
