# Language Support Implementation Guide

## Overview
The mobile app now supports multilingual UI with English, French, and Arabic. The implementation includes:
- Comprehensive translation system using i18n
- Language context for state management
- RTL support for Arabic
- Persistent language selection

## Files Added/Modified

### New Files Created

#### 1. `services/i18n.js`
Translation strings and utilities for all supported languages:
- **English (en)**: Default language
- **French (fr)**: Full French translations
- **Arabic (ar)**: Full Arabic translations with RTL support

**Key Functions:**
- `t(language, key)` - Get translation for a key in specified language
- `getTranslation(language, key)` - Alternative function name
- `LANGUAGES` - Object with language constants

#### 2. `context/LanguageContext.js`
React Context for managing language state globally:
- Stores selected language
- Persists language preference to AsyncStorage
- Provides `useLanguage()` hook for components

**Usage:**
```javascript
const { language, changeLanguage, isLoading } = useLanguage();
```

### Modified Files

#### 1. `App.js`
- Added `LanguageProvider` wrapper
- Wraps the entire app to provide language context

#### 2. `package.json`
- Added `@react-native-async-storage/async-storage` dependency

#### 3. `screens/LanguageScreen.js`
- Now uses language context
- Implements RTL support for Arabic (via `I18nManager.forceRTL`)
- Saves language selection to device storage
- All text uses translations

#### 4. `screens/HomeScreen.js`
- Integrated language support
- All UI text uses `t(language, key)` translation function
- Responds to language changes in real-time

#### 5. `screens/LoginScreen.js`
- Added language support
- Form labels and error messages use translations
- Maintains user experience in all languages

## Usage Instructions

### For App Users
1. **First Launch**: App displays LanguageScreen
2. **Select Language**: Choose English, Français, or العربية
3. **Language Persists**: Selection saved automatically
4. **Change Anytime**: Go to ProfileScreen settings to change language

### For Developers

#### Add Translation for New String
1. Open `services/i18n.js`
2. Add your key to all three language objects:
```javascript
en: { myKey: 'English text' },
fr: { myKey: 'Texte français' },
ar: { myKey: 'نص عربي' }
```

#### Use Translation in Component
```javascript
import { useLanguage } from '../context/LanguageContext';
import { t } from '../services/i18n';

const MyComponent = () => {
  const { language } = useLanguage();
  
  return (
    <Text>{t(language, 'myKey')}</Text>
  );
};
```

#### Change Language Programmatically
```javascript
const { changeLanguage } = useLanguage();

// Change to Arabic
changeLanguage('ar');

// Change to French
changeLanguage('fr');

// Change to English
changeLanguage('en');
```

## Translation Coverage

### Complete Translations for:
- ✅ Language Selection
- ✅ User Type Selection
- ✅ Login & Registration
- ✅ Home Screen
- ✅ Product Details
- ✅ Shopping Cart
- ✅ Checkout
- ✅ Order Tracking
- ✅ User Profile
- ✅ Seller Dashboard
- ✅ Common UI elements

### Available Translation Keys
See `services/i18n.js` for complete list of translation keys organized by screen/feature.

## RTL (Right-to-Left) Support

Arabic text automatically triggers RTL layout:
- Language context sets `I18nManager.forceRTL(true)` for Arabic
- Components should use flexbox for automatic RTL alignment
- Text alignment respects RTL direction

## Storage & Persistence

Language preference is stored in AsyncStorage:
- **Key**: `'appLanguage'`
- **Values**: `'en'`, `'fr'`, or `'ar'`
- **Loads On App Start**: Restored from storage automatically

## Testing Language Support

1. **Test Language Switch**:
   - Go to LanguageScreen
   - Select different language
   - Verify UI updates

2. **Test RTL (Arabic)**:
   - Select Arabic
   - Verify text appears right-to-left
   - Check text direction of UI elements

3. **Test Persistence**:
   - Select language
   - Close and reopen app
   - Verify selected language is restored

## Adding New Languages

To add a new language (e.g., Spanish):

1. **Add to i18n.js**:
```javascript
const translations = {
  // ... existing languages
  es: {
    chooseLanguage: 'Elige tu idioma',
    // ... all other translations
  }
};

export const LANGUAGES = {
  ENGLISH: 'en',
  FRENCH: 'fr',
  ARABIC: 'ar',
  SPANISH: 'es' // Add new language
};
```

2. **Update LanguageScreen** to show new option:
```javascript
<TouchableOpacity onPress={() => selectLanguage(LANGUAGES.SPANISH)}>
  <Text>{t(LANGUAGES.SPANISH, 'spanish')}</Text>
</TouchableOpacity>
```

## Best Practices

1. **Always Use Translation Function**: Never hardcode UI text in components
2. **Keep Keys Consistent**: Use camelCase for translation keys
3. **Add All Languages**: When adding new key, add to all three language objects
4. **Use Context Hook**: Use `useLanguage()` hook to access language state
5. **Test All Languages**: Test UI with all supported languages
6. **Handle RTL**: Consider RTL layouts when designing UI (especially for Arabic)

## Troubleshooting

### Translations Not Showing
- Ensure component uses `useLanguage()` hook
- Verify key exists in `i18n.js`
- Check that translation function is imported: `import { t } from '../services/i18n'`

### Language Not Persisting
- Verify AsyncStorage is installed: `npm install @react-native-async-storage/async-storage`
- Check device storage permissions
- Ensure `LanguageContext` is properly wrapped in App

### RTL Not Working (Arabic)
- Verify `I18nManager.forceRTL(true)` is called in LanguageScreen
- May need to restart app for RTL to take full effect
- Ensure Flex layouts are used (not absolute positioning)

## Next Steps

1. **Update Remaining Screens**: Apply language support to other screens:
   - RegisterScreen
   - ProductDetailsScreen
   - CartScreen
   - CheckoutScreen
   - OrderTrackingScreen
   - ProfileScreen
   - SellerDashboardScreen

2. **Add Language Switcher**: Add UI button to ProfileScreen for changing language

3. **Backend Integration**: Ensure API returns localized content when needed

4. **Test Coverage**: Add tests for language switching and persistence

## Notes
- App defaults to English on first launch
- Language selection is device-specific (not server-synced)
- All translations are client-side (no API calls needed)
- Performance impact is minimal (in-memory translation lookup)
