import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DiaryListScreen from './src/screens/DiaryListScreen';
import { COLORS } from './src/styles/tokens';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: COLORS.bg }}
        edges={['top', 'left', 'right']}
      >
        <DiaryListScreen />
        <StatusBar style="dark" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}