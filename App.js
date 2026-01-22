import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import store from './redux/store';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light" />
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
