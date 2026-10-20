import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';

import {
  COLORS,
  SPACE,
  RADIUS,
  SHADOW,
  MIN_TOUCH,
} from '../styles/tokens';

import MoodBadge from './MoodBadge';

const formatDate = (value) => {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export default function DiaryCard({
  entry,
  liked = false,
  onPress,
  onToggleLike,
  twoColumns = false,
}) {
  const imageSource =
    entry.moodImage || require('../../assets/moods/pagi.jpeg');

  return (
    <View
      style={[
        styles.card,
        twoColumns ? styles.gridCard : styles.listCard,
      ]}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.mainContent,
          pressed && styles.pressed,
          twoColumns && styles.gridMainContent,
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Buka entri ${entry.title}, tanggal ${formatDate(entry.date)}`}
      >
        <Image
          source={imageSource}
          style={[
            styles.image,
            twoColumns ? styles.gridImage : styles.listImage,
          ]}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <Text style={styles.date}>
            {formatDate(entry.date)}
          </Text>

          <MoodBadge mood={entry.mood} />

          <Text style={styles.title} numberOfLines={2}>
            {entry.title}
          </Text>

          <Text
            style={styles.preview}
            numberOfLines={twoColumns ? 3 : 2}
          >
            {entry.preview}
          </Text>

          <Text style={styles.readMore}>
            Baca cerita →
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={onToggleLike}
        style={styles.likeButton}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={
          liked
            ? `Hapus ${entry.title} dari favorit`
            : `Sukai ${entry.title}`
        }
        accessibilityState={{ selected: liked }}
      >
        <Text
          style={[
            styles.heart,
            liked && styles.heartLiked,
          ]}
        >
          {liked ? '♥' : '♡'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    ...SHADOW,
  },

  listCard: {
    minHeight: 145,
    padding: SPACE.m,
  },

  gridCard: {
    flex: 1,
    minHeight: 300,
    padding: SPACE.s,
  },

  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
  },

  gridMainContent: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  pressed: {
    opacity: 0.85,
  },

  image: {
    backgroundColor: COLORS.accentSoft,
    borderRadius: 15,
  },

  listImage: {
    width: 94,
    height: 118,
  },

  gridImage: {
    width: '100%',
    height: 135,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 2,
  },

  date: {
    color: COLORS.muted,
    fontSize: 10,
  },

  title: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
  },

  preview: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 17,
  },

  readMore: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 2,
  },

  likeButton: {
    minWidth: MIN_TOUCH,
    minHeight: MIN_TOUCH,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  heart: {
    color: '#B18AE0',
    fontSize: 26,
  },

  heartLiked: {
    color: '#D66A9B',
  },
});