import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';

const ProductCard = ({ product, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: product.image || 'https://placehold.co/300x200' }} style={styles.image} />
    <View style={styles.body}>
      <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.meta}>{product.location || 'Nearby'} • {product.quantity} units</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', marginBottom: 14, elevation: 2, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4 },
  image: { height: 160, width: '100%' },
  body: { padding: 10 },
  title: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 14, fontWeight: '700', color: '#1B4332', marginTop: 4 },
  meta: { fontSize: 12, color: '#6c757d', marginTop: 2 }
});

export default ProductCard;
