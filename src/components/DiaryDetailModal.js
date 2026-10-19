import React from 'react';
import { Modal, View, Text, Image, ScrollView, StyleSheet, Pressable, Platform } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO, MIN_TOUCH } from '../styles/tokens';
import MoodBadge from './MoodBadge';

export default function DiaryDetailModal({ visible, onClose, entry }) {
  if (!entry) return null;
  const { title, date, body, heroUri, mood } = entry;
  const src = heroUri || entry.moodUri;
  const imageSource = typeof src === 'string' ? { uri: src } : src;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={imageSource}
            resizeMode="cover"
            style={styles.hero}
            accessibilityLabel={`Gambar untuk entri ${title}`}
          />
          <View style={styles.sheet}>
            {mood ? <MoodBadge mood={mood} /> : null}
            <Text style={styles.title} accessibilityRole="header">{title}</Text>
            <Text style={styles.date}>{date}</Text>
            <View style={styles.divider} />
            <Text style={styles.body}>{body}</Text>
          </View>
        </ScrollView>

        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Tutup detail entri"
          style={styles.closeFab}
        >
          <Text style={styles.closeFabText}>✕</Text>
        </Pressable>

        <View style={styles.footer}>
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Tutup detail entri"
            style={styles.button}
          >
            <Text style={styles.buttonText}>Tutup</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  hero: { width: '100%', aspectRatio: 16 / 9, backgroundColor: COLORS.border },
  sheet: {
    marginTop: -SPACE.xl,
    padding: SPACE.xl,
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: RADIUS.sheet,
    borderTopRightRadius: RADIUS.sheet,
  },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  date: { fontSize: TYPO.caption, color: COLORS.muted, marginTop: SPACE.xs },
  divider: {
    height: 3, width: 48, borderRadius: 2,
    backgroundColor: COLORS.accent,
    marginVertical: SPACE.l,
  },
  body: { fontSize: 15, color: COLORS.text, lineHeight: 24 },
  closeFab: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 52 : SPACE.l,
    right: SPACE.l,
    width: 44, height: 44,
    borderRadius: 22,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.overlay,
  },
  closeFabText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  footer: {
    padding: SPACE.l,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  button: {
    minHeight: MIN_TOUCH,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.accent,
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: TYPO.body },
});