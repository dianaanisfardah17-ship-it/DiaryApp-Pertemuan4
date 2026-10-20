import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  Alert,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import {
  COLORS,
  SPACE,
  MOODS,
  MIN_TOUCH,
} from '../styles/tokens';

const getToday = () => {
  const now = new Date();

  return `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')}`;
};

export default function EntryForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(getToday());
  const [body, setBody] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [mood, setMood] = useState('senang');

  const canSubmit =
    title.trim().length > 0 &&
    body.trim().length > 0 &&
    /^\d{4}-\d{2}-\d{2}$/.test(date.trim());

  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Izin galeri diperlukan',
          'Izinkan akses galeri untuk memilih foto diary.'
        );
        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });

      if (!result.canceled && result.assets?.[0]?.uri) {
        setImageUri(result.assets[0].uri);
      }
    } catch {
      Alert.alert(
        'Foto tidak dapat dibuka',
        'Coba pilih foto sekali lagi.'
      );
    }
  };

  const submit = () => {
    if (!canSubmit) {
      Alert.alert(
        'Data belum lengkap',
        'Isi judul, tanggal dengan format YYYY-MM-DD, dan cerita.'
      );
      return;
    }

    const imageSource = imageUri
      ? { uri: imageUri }
      : require('../../assets/moods/pagi.jpeg');

    onSubmit?.({
      id: Date.now(),
      title: title.trim(),
      date: date.trim(),
      preview: body.trim(),
      body: body.trim(),
      mood,
      moodImage: imageSource,
      heroUri: imageSource,
    });

    setTitle('');
    setDate(getToday());
    setBody('');
    setImageUri(null);
    setMood('senang');
  };

  return (
    <View style={styles.form}>
      <Text style={styles.heading}>
        Tulis Ceritamu ✿
      </Text>

      <Text style={styles.description}>
        Abadikan momen kecil yang berarti.
      </Text>

      <Text style={styles.label}>
        Judul cerita
      </Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Contoh: Hari yang menyenangkan"
        placeholderTextColor="#9B8BAA"
        style={styles.input}
        maxLength={80}
        accessibilityLabel="Judul cerita"
      />

      <Text style={styles.label}>
        Tanggal (YYYY-MM-DD)
      </Text>

      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#9B8BAA"
        style={styles.input}
        accessibilityLabel="Tanggal cerita"
      />

      <Text style={styles.label}>
        Bagaimana perasaanmu?
      </Text>

      <View style={styles.moodRow}>
        {Object.entries(MOODS).map(([id, item]) => (
          <Pressable
            key={id}
            onPress={() => setMood(id)}
            style={[
              styles.moodOption,
              {
                borderColor:
                  mood === id ? item.border : COLORS.border,
                backgroundColor:
                  mood === id ? item.bg : '#FFFFFF',
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Pilih mood ${item.label}`}
            accessibilityState={{ selected: mood === id }}
          >
            <Text style={styles.moodEmoji}>
              {item.emoji}
            </Text>

            <Text
              style={[
                styles.moodLabel,
                { color: item.text },
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>
        Ceritamu
      </Text>

      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Ceritakan apa yang kamu rasakan hari ini..."
        placeholderTextColor="#9B8BAA"
        style={[styles.input, styles.multiline]}
        multiline
        textAlignVertical="top"
        maxLength={2000}
        accessibilityLabel="Isi cerita diary"
      />

      <Pressable
        onPress={pickImage}
        style={styles.imagePicker}
        accessibilityRole="button"
        accessibilityLabel={
          imageUri
            ? 'Ganti foto diary'
            : 'Tambahkan foto dari galeri'
        }
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.imagePreview}
          />
        ) : (
          <Text style={styles.imageEmoji}>📷</Text>
        )}

        <View style={{ flex: 1 }}>
          <Text style={styles.imageTitle}>
            {imageUri ? 'Ganti foto' : 'Tambahkan foto'}
          </Text>

          <Text style={styles.imageSubtitle}>
            Opsional · Pilih dari galeri
          </Text>
        </View>

        <Text style={styles.imageArrow}>＋</Text>
      </Pressable>

      <Pressable
        onPress={submit}
        disabled={!canSubmit}
        style={[
          styles.button,
          !canSubmit && styles.buttonDisabled,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Simpan cerita"
      >
        <Text style={styles.buttonText}>
          ♡ Simpan Cerita
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: SPACE.l,
    gap: SPACE.s,
  },

  heading: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.text,
  },

  description: {
    color: COLORS.muted,
    fontSize: 12,
    marginBottom: SPACE.s,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#59446D',
    marginTop: SPACE.xs,
  },

  input: {
    minHeight: MIN_TOUCH,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FCFAFF',
    color: COLORS.text,
    fontSize: 13,
  },

  multiline: {
    minHeight: 110,
    lineHeight: 21,
  },

  moodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginVertical: 3,
  },

  moodOption: {
    minWidth: 68,
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1,
  },

  moodEmoji: {
    fontSize: 19,
  },

  moodLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 3,
  },

  imagePicker: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACE.m,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CDBAE8',
    borderRadius: 16,
    backgroundColor: COLORS.bg,
    gap: SPACE.m,
    marginTop: SPACE.xs,
  },

  imageEmoji: {
    fontSize: 27,
  },

  imagePreview: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },

  imageTitle: {
    color: '#59446D',
    fontSize: 12,
    fontWeight: '700',
  },

  imageSubtitle: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 4,
  },

  imageArrow: {
    fontSize: 22,
    color: COLORS.accent,
  },

  button: {
    minHeight: MIN_TOUCH,
    marginTop: SPACE.s,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonDisabled: {
    opacity: 0.45,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
});