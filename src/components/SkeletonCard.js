import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { COLORS, SPACE, RADIUS, SHADOW } from '../styles/tokens';

export default function SkeletonCard() {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.card, { opacity }]}
      accessible
      accessibilityLabel="Memuat entri diary"
    >
      <View style={styles.avatar} />
      <View style={styles.content}>
        <View style={[styles.line, { width: '60%', height: 16 }]} />
        <View style={[styles.line, { width: '30%' }]} />
        <View style={[styles.line, { width: '100%' }]} />
        <View style={[styles.line, { width: '85%' }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: SPACE.m,
    padding: SPACE.l,
    borderWidth: 1,
    borderLeftWidth: 5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    ...SHADOW,
  },
  avatar: {
    width: 72, height: 72,
    borderRadius: RADIUS.avatar,
    backgroundColor: COLORS.skeleton,
  },
  content: { flex: 1, gap: SPACE.s },
  line: { height: 12, borderRadius: 6, backgroundColor: COLORS.skeleton },
});