import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, I18nManager } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { t, LANGUAGES } from '../services/i18n';

const LanguageScreen = ({ navigation }) => {
  const { changeLanguage } = useLanguage();

  const selectLanguage = (lang) => {
    changeLanguage(lang);
    // Set text direction for RTL languages (Arabic)
    I18nManager.forceRTL(lang === LANGUAGES.ARABIC);
    navigation.navigate('UserType');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('en', 'chooseLanguage')}</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => selectLanguage(LANGUAGES.ENGLISH)}
      >
        <Text style={styles.buttonText}>{t(LANGUAGES.ENGLISH, 'english')}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => selectLanguage(LANGUAGES.FRENCH)}
      >
        <Text style={styles.buttonText}>{t(LANGUAGES.FRENCH, 'french')}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => selectLanguage(LANGUAGES.ARABIC)}
      >
        <Text style={styles.buttonText}>{t(LANGUAGES.ARABIC, 'arabic')}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.link} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.linkText}>{t('en', 'skipToLogin')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#f7fff7' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 24, textAlign: 'center' },
  button: { width: '100%', padding: 14, backgroundColor: '#1B4332', borderRadius: 10, marginBottom: 12 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  link: { marginTop: 12 },
  linkText: { color: '#1B4332', fontWeight: '500' }
});

export default LanguageScreen;
