import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO, MOODS, SHADOW } from '../styles/tokens';
import MoodBadge from './MoodBadge';

export default function DiaryCard({
  title, date, preview, moodUri, mood, onPress, variant = 'list',
}) {
  const m = MOODS[mood];
  const imageSource = typeof moodUri === 'string' ? { uri: moodUri } : moodUri;

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#FBCFE8' }}
      style={({ pressed }) => [
        styles.card,
        variant === 'grid' && styles.cardGrid,
        m && { borderLeftColor: m.border },
        pressed && styles.pressed,
      ]}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Entri ${title} tanggal ${date}${m ? `, mood ${m.label}` : ''}`}
      accessibilityHint="Ketuk dua kali untuk membuka detail"
    >
      <Image
        source={imageSource}
        resizeMode="cover"
        style={[styles.mood, m && { borderColor: m.border }]}
        accessibilityIgnoresInvertColors
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        {mood ? <MoodBadge mood={mood} /> : null}
        <Text style={styles.preview} numberOfLines={3} ellipsizeMode="tail">
          {preview}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: SPACE.m,
    padding: SPACE.l,
    borderWidth: 1,
    borderLeftWidth: 6,
    borderColor: COLORS.border,
    borderLeftColor: COLORS.accent,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    ...SHADOW,
  },
  cardGrid: { minHeight: 150 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  mood: {
    width: 72, height: 72,
    borderRadius: RADIUS.avatar,
    borderWidth: 3,
    borderColor: COLORS.border,
    backgroundColor: COLORS.accentSoft,
    overflow: 'hidden',
  },
  content: { flex: 1 },
  title: { fontSize: TYPO.title, fontWeight: '700', color: COLORS.text },
  date: { fontSize: TYPO.caption, color: COLORS.muted, marginTop: 2, marginBottom: SPACE.s },
  preview: { fontSize: TYPO.body, color: COLORS.text, lineHeight: 20 },
});