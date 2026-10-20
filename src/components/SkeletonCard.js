import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import {
  COLORS,
  RADIUS,
} from '../styles/tokens';

export default function SkeletonCard({ twoColumns = false }) {
  return (
    <View
      style={[
        styles.card,
        twoColumns ? styles.grid : styles.list,
      ]}
    >
      <View
        style={[
          styles.block,
          twoColumns ? styles.gridImage : styles.listImage,
        ]}
      />

      <View style={styles.content}>
        <View
          style={[
            styles.block,
            { width: '38%', height: 9 },
          ]}
        />

        <View
          style={[
            styles.block,
            { width: '78%', height: 15 },
          ]}
        />

        <View
          style={[
            styles.block,
            { width: '95%', height: 10 },
          ]}
        />

        <View
          style={[
            styles.block,
            { width: '68%', height: 10 },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },

  list: {
    flexDirection: 'row',
    gap: 12,
    minHeight: 145,
  },

  grid: {
    flex: 1,
    minHeight: 300,
  },

  block: {
    backgroundColor: COLORS.skeleton,
    borderRadius: 8,
  },

  listImage: {
    width: 94,
    height: 118,
    borderRadius: 15,
  },

  gridImage: {
    width: '100%',
    height: 135,
    marginBottom: 12,
    borderRadius: 15,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
});