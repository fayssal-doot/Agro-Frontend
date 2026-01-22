import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingOverlay = ({ visible }) => {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#1B4332" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.85)', justifyContent: 'center', alignItems: 'center', zIndex: 100 }
});

export default LoadingOverlay;
