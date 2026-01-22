import React, { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    />
  );

  const renderEmpty = () => {
    if (status === 'loading') {
      return (
        <View style={styles.emptyBox}>
          <Ionicons name="hourglass-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>Loading products...</Text>
        </View>
      );
    }

    if (status === 'failed' && error) {
      return (
        <View style={styles.errorBox}>
          <Ionicons name="cloud-offline-outline" size={48} color="#d9534f" />
          <Text style={styles.errorTitle}>Oops!</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => dispatch(fetchProducts())}>
            <Ionicons name="refresh" size={18} color="#fff" />
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.emptyBox}>
        <Ionicons name="basket-outline" size={48} color="#ccc" />
        <Text style={styles.emptyTitle}>No Products Yet</Text>
        <Text style={styles.emptyText}>Check back later for fresh products</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Fresh picks near you</Text>
        <Text style={styles.subheader}>{items.length} products available</Text>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl 
            refreshing={status === 'loading'} 
            onRefresh={() => dispatch(fetchProducts())}
            colors={['#1B4332']}
            tintColor="#1B4332"
          />
        }
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={items.length === 0 && styles.emptyListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6fff6', padding: 16 },
  headerContainer: { marginBottom: 16 },
  header: { fontSize: 22, fontWeight: '700', color: '#1B4332' },
  subheader: { fontSize: 13, color: '#666', marginTop: 4 },
  emptyListContainer: { flex: 1 },
  emptyBox: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: '#333', marginTop: 16 },
  emptyText: { color: '#6c757d', marginTop: 8, textAlign: 'center' },
  errorBox: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  errorTitle: { fontSize: 20, fontWeight: '700', color: '#d9534f', marginTop: 16 },
  errorText: { color: '#666', marginTop: 8, textAlign: 'center', lineHeight: 20 },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B4332',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20
  },
  retryText: { color: '#fff', fontWeight: '600', marginLeft: 8 }
});

export default HomeScreen;
