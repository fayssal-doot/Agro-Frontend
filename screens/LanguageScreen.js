import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LanguageScreen = ({ navigation }) => {
  const selectLanguage = () => navigation.navigate('UserType');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your language</Text>
      <TouchableOpacity style={styles.button} onPress={selectLanguage}>
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={selectLanguage}>
        <Text style={styles.buttonText}>Arabic</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Skip to login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#f7fff7' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 24 },
  button: { width: '100%', padding: 14, backgroundColor: '#1B4332', borderRadius: 10, marginBottom: 12 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  link: { marginTop: 12 },
  linkText: { color: '#1B4332', fontWeight: '500' }
});

export default LanguageScreen;
