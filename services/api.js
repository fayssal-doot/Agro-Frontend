import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl || 'http://192.168.0.9:8000/api';
const TOKEN_KEY = 'agrotrade_token';

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

instance.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.warn('Error reading token:', error);
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error for debugging
    if (__DEV__) {
      console.log('API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });
    }

    if (error.response?.status === 401) {
      // Token invalid/expired - could dispatch logout action here
      SecureStore.deleteItemAsync(TOKEN_KEY).catch(() => {});
    }
    
    return Promise.reject(error);
  }
);

export const api = instance;

export const setApiBaseUrl = (url) => {
  api.defaults.baseURL = url;
};

// Helper to check if API is reachable
export const checkConnection = async () => {
  try {
    await api.get('/debug/ping', { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
};
