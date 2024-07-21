// components/SplashScreenHandler.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Animatable from 'react-native-animatable';

const SplashScreenHandler = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Simulate a task by using a timeout
        setTimeout(() => {
          setIsReady(true);
        }, 3000); // 3 seconds
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <Animatable.Image
          source={require('../assets/icon.png')} // Pastikan logo ada di folder assets
          style={styles.logo}
          animation="bounceIn"
          iterationCount="infinite"
        />
        <ActivityIndicator size="large" color="#55bcf6" />
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EAED',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default SplashScreenHandler;
