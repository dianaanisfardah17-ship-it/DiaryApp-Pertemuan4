import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MOODS, SPACE, RADIUS, TYPO } from '../styles/tokens';

export default function MoodBadge({ mood }) {
  const m = MOODS[mood] || MOODS.tenang;
  return (
    <View
      style={[styles.badge, { borderColor: m.border, backgroundColor: m.bg }]}
      accessible
      accessibilityLabel={`Mood ${m.label}`}
    >
      <Text style={[styles.text, { color: m.text }]}>{m.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1.5,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACE.m,
    paddingVertical: SPACE.xs,
    marginBottom: SPACE.s,
  },
  text: { fontSize: TYPO.caption, fontWeight: '700' },
});