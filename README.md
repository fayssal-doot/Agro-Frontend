# Agro Trade Mobile App

Expo managed React Native application for clients, farmers, and store owners.

## Setup

```bash
npm install
npx expo start
```

Use Expo Go on iOS/Android or simulators.

## Environment Variables

Create a file `app.config.js` or set via `expo.extra` in `app.json`:

```
EXPO_PUBLIC_API_URL=http://localhost:8000/api
```

This is picked up in `services/api.js`.

## Features
- Welcome / language / user type selection
- Login / register with role
- Home feed of products
- Product details, cart, checkout
- Order tracking
- Seller dashboard (add product, view orders, stats)

## Folder Structure
```
├── App.js
├── screens/
│   └── SplashScreen, LoginScreen, ...
├── navigation/
│   └── RootNavigator, MainTabs
├── redux/
│   ├── store.js
│   └── slices/authSlice, productSlice, orderSlice
├── components/
│   └── ProductCard, EmptyState, LoadingOverlay
├── services/
│   └── api.js  (Axios instance with secure token storage)
└── assets/
```

## Security notes
- Tokens stored in `expo-secure-store`, not AsyncStorage.
- Defensive loading / error / empty states on screens.
- CORS and credentials handled by backend.
