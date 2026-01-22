import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const sampleCart = [
  { id: 1, title: 'Organic Tomatoes', price: 12, quantity: 2 },
  { id: 2, title: 'Free-range Eggs', price: 5, quantity: 1 }
];

const CartScreen = ({ navigation }) => {
  const total = sampleCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={sampleCart}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price} x {item.quantity}</Text>
          </View>
        )}
        ListFooterComponent={<Text style={styles.total}>Total: ${total.toFixed(2)}</Text>}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Checkout')}>
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  row: { paddingVertical: 12, borderBottomWidth: 1, borderColor: '#f1f3f5' },
  title: { fontSize: 16, fontWeight: '600' },
  price: { color: '#6c757d' },
  total: { fontSize: 18, fontWeight: '700', marginTop: 12 },
  button: { backgroundColor: '#1B4332', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#fff', fontWeight: '700' }
});

export default CartScreen;
