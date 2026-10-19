import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO, MIN_TOUCH, SHADOW } from '../styles/tokens';

export default function EmptyState({ onReload }) {
  return (
    <View style={styles.wrap} accessible accessibilityLabel="Belum ada entri diary">
      <Text style={styles.emoji}>🌷</Text>
      <Text style={styles.title}>Belum ada entri</Text>
      <Text style={styles.desc}>
        Buku harianmu masih kosong. Mulai tulis cerita hari ini, atau muat ulang
        kalau kamu merasa seharusnya ada entri di sini.
      </Text>
      {onReload && (
        <Pressable
          onPress={onReload}
          accessibilityRole="button"
          accessibilityLabel="Muat ulang entri"
          style={styles.button}
        >
          <Text style={styles.buttonText}>Muat ulang</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: SPACE.xl,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW,
  },
  emoji: { fontSize: 48, marginBottom: SPACE.m },
  title: { fontSize: TYPO.title, fontWeight: '700', color: COLORS.text, marginBottom: SPACE.s },
  desc: { fontSize: TYPO.body, color: COLORS.muted, textAlign: 'center', lineHeight: 20 },
  button: {
    marginTop: SPACE.l,
    minHeight: MIN_TOUCH,
    paddingHorizontal: SPACE.xl,
    justifyContent: 'center',
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.accent,
  },
  buttonText: { color: '#fff', fontWeight: '700' },
});