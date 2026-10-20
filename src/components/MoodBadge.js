import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, MOODS } from '../styles/tokens';

export default function MoodBadge({ mood = 'senang' }) {
  const item = MOODS[mood] || MOODS.senang;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: item.bg,
          borderColor: item.border,
        },
      ]}
    >
      <Text style={[styles.text, { color: item.text }]}>
        {item.emoji} {item.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  text: {
    fontSize: 10,
    fontWeight: '700',
  },
});