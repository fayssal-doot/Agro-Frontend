import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../redux/slices/authSlice';

const LoginScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localErrors, setLocalErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const userType = route?.params?.type;

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setLocalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getDisplayError = () => {
    if (!error) return null;

    // Parse different error types
    if (error.includes('Network Error') || error.includes('ECONNABORTED')) {
      return 'Unable to connect to server. Please check your internet connection.';
    }
    if (error.includes('401') || error.includes('Invalid') || error.includes('credentials')) {
      return 'Invalid email or password. Please try again.';
    }
    if (error.includes('429')) {
      return 'Too many login attempts. Please wait a moment and try again.';
    }
    if (error.includes('500')) {
      return 'Server error. Please try again later.';
    }
    if (error.includes('pending')) {
      return 'Your account is pending approval. Please wait for admin verification.';
    }
    if (error.includes('rejected') || error.includes('blocked')) {
      return 'Your account has been suspended. Please contact support.';
    }
    
    return error;
  };

  const onSubmit = async () => {
    dispatch(clearError());
    
    if (!validateForm()) {
      return;
    }

    const result = await dispatch(login({ 
      email: email.trim().toLowerCase(), 
      password, 
      type: userType 
    }));
    
    if (login.fulfilled.match(result)) {
      navigation.replace('Main');
    }
  };

  const displayError = getDisplayError();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Login as {userType === 'store_owner' ? 'Store Owner' : userType?.charAt(0).toUpperCase() + userType?.slice(1) || 'User'}
        </Text>
      </View>

      {/* Email Input */}
      <View style={[styles.inputContainer, localErrors.email && styles.inputError]}>
        <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
        <TextInput 
          value={email} 
          onChangeText={(text) => {
            setEmail(text);
            if (localErrors.email) setLocalErrors(prev => ({ ...prev, email: null }));
            if (error) dispatch(clearError());
          }} 
          placeholder="Email address" 
          autoCapitalize="none" 
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>
      {localErrors.email && <Text style={styles.fieldError}>{localErrors.email}</Text>}

      {/* Password Input */}
      <View style={[styles.inputContainer, localErrors.password && styles.inputError]}>
        <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
        <TextInput 
          value={password} 
          onChangeText={(text) => {
            setPassword(text);
            if (localErrors.password) setLocalErrors(prev => ({ ...prev, password: null }));
            if (error) dispatch(clearError());
          }} 
          placeholder="Password" 
          secureTextEntry={!showPassword} 
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
        </TouchableOpacity>
      </View>
      {localErrors.password && <Text style={styles.fieldError}>{localErrors.password}</Text>}

      {/* Error Message */}
      {displayError && (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle" size={20} color="#d9534f" />
          <Text style={styles.errorText}>{displayError}</Text>
        </View>
      )}

      {/* Login Button */}
      <TouchableOpacity 
        style={[styles.button, status === 'loading' && styles.buttonDisabled]} 
        onPress={onSubmit} 
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Register Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Register', { type: userType })}>
        <Text style={styles.link}>Don't have an account? <Text style={styles.linkBold}>Sign Up</Text></Text>
      </TouchableOpacity>

      {/* Change User Type */}
      <TouchableOpacity onPress={() => navigation.navigate('UserType')} style={styles.changeTypeButton}>
        <Ionicons name="swap-horizontal-outline" size={16} color="#1B4332" />
        <Text style={styles.changeTypeText}>Change account type</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
  header: { marginBottom: 32 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 4, color: '#1B4332' },
  subtitle: { fontSize: 14, color: '#6c757d' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d8f3dc',
    borderRadius: 10,
    marginBottom: 4,
    backgroundColor: '#fafafa'
  },
  inputError: { borderColor: '#d9534f' },
  inputIcon: { paddingLeft: 12 },
  input: { flex: 1, padding: 12, fontSize: 16 },
  eyeIcon: { paddingRight: 12 },
  button: { backgroundColor: '#1B4332', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 16 },
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
    marginTop: 12
  },
  errorText: { color: '#d9534f', marginLeft: 8, flex: 1, fontSize: 14 },
  changeTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    padding: 8
  },
  changeTypeText: { color: '#1B4332', marginLeft: 6, fontWeight: '500' }
});

export default LoginScreen;
