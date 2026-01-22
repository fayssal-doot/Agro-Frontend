import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

const ProductDetailsScreen = ({ route, navigation }) => {
  const product = route.params?.product;
  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  const addToCart = () => {
    Alert.alert('Added to cart', product.title);
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image || 'https://placehold.co/600x400' }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price} • {product.quantity} units</Text>
      <Text style={styles.meta}>Seller: {product.seller?.name || 'Unknown'} • {product.location || 'N/A'}</Text>
      <Text style={styles.description}>{product.description || 'Fresh product, ready to ship.'}</Text>
      <TouchableOpacity style={styles.button} onPress={addToCart}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  image: { width: '100%', height: 220, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#1B4332' },
  price: { fontSize: 18, fontWeight: '600', marginTop: 4 },
  meta: { color: '#6c757d', marginTop: 4 },
  description: { marginTop: 12, lineHeight: 20 },
  button: { backgroundColor: '#1B4332', padding: 14, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' }
});

export default ProductDetailsScreen;
