import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import {
  COLORS,
  MIN_TOUCH,
} from '../styles/tokens';

export default function SearchBar({ value, onChange }) {
  return (
    <View style={styles.wrap}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Cari judul, tanggal, atau mood..."
        placeholderTextColor="#9B8BAA"
        style={styles.input}
        accessibilityLabel="Cari entri diary"
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 14,
  },

  input: {
    minHeight: MIN_TOUCH,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    fontSize: 13,
  },
});