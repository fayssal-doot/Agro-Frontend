import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const role = user?.role || 'client';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user?.name || 'Guest'}</Text>
      <Text style={styles.meta}>Role: {role}</Text>
      <Text style={styles.meta}>Email: {user?.email || 'anonymous'}</Text>

      {['farmer', 'store owner', 'store_owner'].includes(role) && (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SellerDashboard')}>
          <Text style={styles.buttonText}>Open Seller Dashboard</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={[styles.button, styles.secondary]} onPress={() => dispatch(logout())}>
        <Text style={styles.secondaryText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  meta: { color: '#6c757d', marginBottom: 4 },
  button: { backgroundColor: '#1B4332', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#fff', fontWeight: '700' },
  secondary: { backgroundColor: '#f1f3f5' },
  secondaryText: { color: '#1B4332', fontWeight: '700' }
});

export default ProfileScreen;
