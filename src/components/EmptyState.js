import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import {
  COLORS,
  MIN_TOUCH,
} from '../styles/tokens';

export default function EmptyState({ hasQuery, onClear }) {
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>☁️</Text>

      <Text style={styles.title}>
        {hasQuery
          ? 'Cerita tidak ditemukan'
          : 'Belum ada cerita'}
      </Text>

      <Text style={styles.text}>
        {hasQuery
          ? 'Coba kata kunci yang berbeda.'
          : 'Yuk, tulis momen pertamamu hari ini.'}
      </Text>

      {hasQuery && (
        <Pressable
          onPress={onClear}
          style={styles.button}
          accessibilityRole="button"
          accessibilityLabel="Hapus pencarian"
        >
          <Text style={styles.buttonText}>
            Hapus pencarian
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 28,
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  emoji: {
    fontSize: 36,
    marginBottom: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },

  text: {
    fontSize: 12,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },

  button: {
    marginTop: 12,
    minHeight: MIN_TOUCH,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: COLORS.accentSoft,
  },

  buttonText: {
    color: COLORS.accentDeep,
    fontWeight: '700',
  },
});