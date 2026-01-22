import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrderTrackingScreen from '../screens/OrderTrackingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#1B4332',
      tabBarIcon: ({ color, size }) => {
        const icons = {
          Home: 'leaf-outline',
          Cart: 'cart-outline',
          Orders: 'trail-sign-outline',
          Profile: 'person-circle-outline'
        };
        const iconName = icons[route.name] || 'ellipse-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      }
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
    <Tab.Screen name="Orders" component={OrderTrackingScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default MainTabs;
