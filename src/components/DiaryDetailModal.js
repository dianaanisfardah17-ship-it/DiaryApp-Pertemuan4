import React from 'react';

import {
  Modal,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';

import MoodBadge from './MoodBadge';

import {
  COLORS,
  SPACE,
  RADIUS,
  MIN_TOUCH,
} from '../styles/tokens';

const formatDate = (value) => {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export default function DiaryDetailModal({
  visible,
  entry,
  onClose,
}) {
  if (!entry) return null;

  const imageSource =
    entry.heroUri ||
    entry.moodImage ||
    require('../../assets/moods/pagi.jpeg');

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.bg}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Image
            source={imageSource}
            style={styles.hero}
            resizeMode="cover"
          />

          <View style={styles.sheet}>
            <MoodBadge mood={entry.mood} />

            <Text style={styles.title}>
              {entry.title}
            </Text>

            <Text style={styles.date}>
              {formatDate(entry.date)}
            </Text>

            <View style={styles.divider} />

            <Text style={styles.body}>
              {entry.body ||
                entry.preview ||
                'Belum ada isi cerita.'}
            </Text>
          </View>
        </ScrollView>

        <Pressable
          onPress={onClose}
          style={styles.closeFab}
          accessibilityRole="button"
          accessibilityLabel="Tutup detail diary"
        >
          <Text style={styles.closeFabText}>×</Text>
        </Pressable>

        <View style={styles.footer}>
          <Pressable
            onPress={onClose}
            style={styles.button}
            accessibilityRole="button"
            accessibilityLabel="Kembali ke buku harian"
          >
            <Text style={styles.buttonText}>
              Kembali ke buku harian
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  hero: {
    width: '100%',
    height: 310,
    backgroundColor: COLORS.accentSoft,
  },

  sheet: {
    marginTop: -24,
    padding: SPACE.xl,
    paddingBottom: 30,
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: RADIUS.sheet,
    borderTopRightRadius: RADIUS.sheet,
    gap: 10,
  },

  title: {
    fontSize: 25,
    lineHeight: 33,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 8,
  },

  date: {
    fontSize: 12,
    color: COLORS.muted,
  },

  divider: {
    height: 4,
    width: 48,
    borderRadius: 4,
    backgroundColor: '#D4BDEB',
    marginVertical: 14,
  },

  body: {
    fontSize: 15,
    color: '#59446D',
    lineHeight: 26,
  },

  closeFab: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 54 : 24,
    right: 18,
    width: MIN_TOUCH,
    height: MIN_TOUCH,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.overlay,
  },

  closeFabText: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '600',
  },

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
    borderRadius: 24,
    backgroundColor: COLORS.accent,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
});