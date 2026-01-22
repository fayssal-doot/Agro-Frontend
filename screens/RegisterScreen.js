import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../services/api';

const ROLE_OPTIONS = [
  { value: 'client', label: 'Client', description: 'Buy products from farmers and stores' },
  { value: 'farmer', label: 'Farmer', description: 'Sell your farm products directly' },
  { value: 'store_owner', label: 'Store Owner', description: 'Manage your agricultural store' },
];

const RegisterScreen = ({ navigation, route }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: route?.params?.type || 'client'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showRolePicker, setShowRolePicker] = useState(false);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getErrorMessage = (error) => {
    // Handle network errors
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        return 'Request timed out. Please check your internet connection and try again.';
      }
      if (error.message === 'Network Error') {
        return 'Unable to connect to server. Please check your internet connection.';
      }
      return 'Connection error. Please try again later.';
    }

    // Handle HTTP errors
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return data?.message || 'Invalid request. Please check your information.';
      case 409:
        return 'An account with this email already exists.';
      case 422:
        // Validation errors from Laravel
        if (data?.errors) {
          const firstError = Object.values(data.errors)[0];
          return Array.isArray(firstError) ? firstError[0] : firstError;
        }
        return data?.message || 'Please check your information and try again.';
      case 429:
        return 'Too many attempts. Please wait a moment and try again.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return data?.message || 'Registration failed. Please try again.';
    }
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await api.post('/auth/register', {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role
      });
      
      Alert.alert(
        'Account Created! 🎉',
        'Your account has been created successfully. You can now login.',
        [{ text: 'Login Now', onPress: () => navigation.replace('Login', { type: form.role }) }]
      );
    } catch (err) {
      const message = getErrorMessage(err);
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  const selectedRole = ROLE_OPTIONS.find(r => r.value === form.role);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join AgroTrade today</Text>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
        <TextInput 
          style={styles.input} 
          value={form.name} 
          onChangeText={(v) => update('name', v)} 
          placeholder="Full name" 
          placeholderTextColor="#999"
        />
      </View>
      {errors.name && <Text style={styles.fieldError}>{errors.name}</Text>}

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
        <TextInput 
          style={styles.input} 
          value={form.email} 
          onChangeText={(v) => update('email', v)} 
          placeholder="Email address" 
          autoCapitalize="none" 
          keyboardType="email-address"
          placeholderTextColor="#999"
        />
      </View>
      {errors.email && <Text style={styles.fieldError}>{errors.email}</Text>}

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
        <TextInput 
          style={styles.input} 
          value={form.password} 
          onChangeText={(v) => update('password', v)} 
          placeholder="Password" 
          secureTextEntry
          placeholderTextColor="#999"
        />
      </View>
      {errors.password && <Text style={styles.fieldError}>{errors.password}</Text>}

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
        <TextInput 
          style={styles.input} 
          value={form.confirmPassword} 
          onChangeText={(v) => update('confirmPassword', v)} 
          placeholder="Confirm password" 
          secureTextEntry
          placeholderTextColor="#999"
        />
      </View>
      {errors.confirmPassword && <Text style={styles.fieldError}>{errors.confirmPassword}</Text>}

      {/* Role Picker */}
      <Text style={styles.label}>Account Type</Text>
      <TouchableOpacity style={styles.pickerButton} onPress={() => setShowRolePicker(true)}>
        <View style={styles.pickerContent}>
          <Ionicons name="briefcase-outline" size={20} color="#666" />
          <View style={styles.pickerTextContainer}>
            <Text style={styles.pickerText}>{selectedRole?.label}</Text>
            <Text style={styles.pickerDescription}>{selectedRole?.description}</Text>
          </View>
        </View>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      {/* General Error */}
      {errors.general && (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle" size={20} color="#d9534f" />
          <Text style={styles.errorText}>{errors.general}</Text>
        </View>
      )}

      {/* Submit Button */}
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={onSubmit} 
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Creating Account...' : 'Create Account'}</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Login', { type: form.role })}>
        <Text style={styles.link}>Already have an account? <Text style={styles.linkBold}>Login</Text></Text>
      </TouchableOpacity>

      {/* Role Picker Modal */}
      <Modal visible={showRolePicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Account Type</Text>
              <TouchableOpacity onPress={() => setShowRolePicker(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={ROLE_OPTIONS}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.roleOption,
                    form.role === item.value && styles.roleOptionSelected
                  ]}
                  onPress={() => {
                    update('role', item.value);
                    setShowRolePicker(false);
                  }}
                >
                  <View style={styles.roleOptionContent}>
                    <Text style={[
                      styles.roleOptionLabel,
                      form.role === item.value && styles.roleOptionLabelSelected
                    ]}>
                      {item.label}
                    </Text>
                    <Text style={styles.roleOptionDescription}>{item.description}</Text>
                  </View>
                  {form.role === item.value && (
                    <Ionicons name="checkmark-circle" size={24} color="#1B4332" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 4, color: '#1B4332' },
  subtitle: { fontSize: 14, color: '#6c757d', marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8, marginTop: 8 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d8f3dc',
    borderRadius: 10,
    marginBottom: 4,
    backgroundColor: '#fafafa'
  },
  inputIcon: { paddingLeft: 12 },
  input: { flex: 1, padding: 12, fontSize: 16 },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d8f3dc',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fafafa',
    marginBottom: 16
  },
  pickerContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  pickerTextContainer: { marginLeft: 12 },
  pickerText: { fontSize: 16, fontWeight: '600', color: '#333' },
  pickerDescription: { fontSize: 12, color: '#666', marginTop: 2 },
  button: { backgroundColor: '#1B4332', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  buttonDisabled: { backgroundColor: '#87a98f' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  link: { color: '#666', marginTop: 16, textAlign: 'center' },
  linkBold: { color: '#1B4332', fontWeight: '700' },
  fieldError: { color: '#d9534f', fontSize: 12, marginBottom: 8, marginLeft: 4 },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffeaea',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12
  },
  errorText: { color: '#d9534f', marginLeft: 8, flex: 1, fontSize: 14 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
    maxHeight: '50%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  roleOptionSelected: { backgroundColor: '#f0f9f4' },
  roleOptionContent: { flex: 1 },
  roleOptionLabel: { fontSize: 16, fontWeight: '600', color: '#333' },
  roleOptionLabelSelected: { color: '#1B4332' },
  roleOptionDescription: { fontSize: 13, color: '#666', marginTop: 2 }
});

export default RegisterScreen;
