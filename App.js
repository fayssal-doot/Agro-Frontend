import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import store from './redux/store';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <RootNavigator />
        </NavigationContainer>
      </LanguageProvider>
    </Provider>
  );
}
