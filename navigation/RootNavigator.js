import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LanguageScreen from '../screens/LanguageScreen';
import UserTypeScreen from '../screens/UserTypeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainTabs from './MainTabs';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderTrackingScreen from '../screens/OrderTrackingScreen';
import SellerDashboardScreen from '../screens/SellerDashboardScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Language" component={LanguageScreen} />
    <Stack.Screen name="UserType" component={UserTypeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Main" component={MainTabs} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
    <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
    <Stack.Screen name="SellerDashboard" component={SellerDashboardScreen} />
  </Stack.Navigator>
);

export default RootNavigator;
