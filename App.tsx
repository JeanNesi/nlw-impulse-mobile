import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import 'react-native-gesture-handler';

import { theme } from './src/theme';
import  Widget  from './src/components/Widget'

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background,
    }}
      >
      <StatusBar style="light" 
        backgroundColor='transparent'
        translucent
      />

  <Widget />
  
    </View>
  );
}