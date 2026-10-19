import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import { COLORS, SPACE, RADIUS, SHADOW, TYPO, BREAKPOINTS, MAX_WIDTH } from '../styles/tokens';

const DATA = [
  { id: 1, title: 'Pagi yang Tenang', date: '2025-10-06', mood: 'tenang',
    preview: 'Bangun lebih pagi…',
    body: 'Catatan lengkap tentang pagi yang tenang dan udara yang segar...',
    moodUri: require('../../assets/moods/pagi.jpeg'),
    heroUri: require('../../assets/moods/pagi2.jpeg') },
  { id: 2, title: 'Produktif di Kampus', date: '2025-10-05', mood: 'fokus',
    preview: 'Menyelesaikan modul…',
    body: 'Hari ini berhasil menyelesaikan kemajuan proyek dan tugas akhir...',
    moodUri: require('../../assets/moods/produktif.jpeg'),
    heroUri: require('../../assets/moods/produktif2.jpeg') },
  { id: 3, title: 'Senja di Taman', date: '2025-10-04', mood: 'santai',
    preview: 'Membaca buku…',
    body: 'Refleksi singkat sambil melihat matahari terbenam di taman kota...',
    moodUri: require('../../assets/moods/senja.jpeg'),
    heroUri: require('../../assets/moods/senja2.jpeg') },
  { id: 4, title: 'Makan Siang Bareng Teman', date: '2025-10-07', mood: 'senang',
    preview: 'Mencoba kafe baru di sudut jalan...',
    body: 'Hari ini nyobain kopi dan pastry di kafe baru. Suasananya nyaman untuk mengobrol santai bersama teman-teman.',
    moodUri: require('../../assets/moods/makan.jpeg'),
    heroUri: require('../../assets/moods/makan.jpeg') },
  { id: 5, title: 'Olahraga Sore', date: '2025-10-08', mood: 'semangat',
    preview: 'Lari keliling komplek biar sehat...',
    body: 'Akhirnya memaksakan diri buat jogging 3 kilometer. Sangat melelahkan tapi rasanya segar sekali setelahnya.',
    moodUri: require('../../assets/moods/olahraga.jpeg'),
    heroUri: require('../../assets/moods/olahraga2.jpeg') },
];
const SKELETON_DATA = [1, 2, 3, 4].map((n) => ({ id: `sk-${n}`, skeleton: true }));
const LOAD_DELAY_MS = 1200;
const SIMULATE_EMPTY = false; // ubah ke true untuk menguji empty state

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const load = useCallback(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setItems(SIMULATE_EMPTY ? [] : DATA);
      setLoading(false);
    }, LOAD_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => load(), [load]);

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      {item.skeleton ? (
        <SkeletonCard />
      ) : (
        <DiaryCard
          title={item.title}
          date={item.date}
          preview={item.preview}
          moodUri={item.moodUri}
          mood={item.mood}
          variant={twoCols ? 'grid' : 'list'}
          onPress={() => setSelected(item)}
        />
      )}
    </View>
  );

  const keyForCols = useMemo(() => (twoCols ? 'grid2' : 'list1'), [twoCols]);

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.headerWrap}>
          <View style={styles.banner}>
            <View style={styles.bubbleBig} />
            <View style={styles.bubbleSmall} />
            <Text style={styles.kicker}>🌸 DIARY PRIBADI</Text>
            <Text style={styles.header} accessibilityRole="header">Buku Harian</Text>
            <View style={styles.countPill}>
              <Text style={styles.countText}>
                {loading ? 'Memuat catatan…' : `${items.length} catatan`}
              </Text>
            </View>
          </View>
        </View>
        <FlatList
          key={keyForCols}
          data={loading ? SKELETON_DATA : items}
          numColumns={twoCols ? 2 : 1}
          keyExtractor={(it) => String(it.id)}
          renderItem={renderItem}
          columnWrapperStyle={twoCols ? { gap: SPACE.m } : undefined}
          contentContainerStyle={{ padding: SPACE.l, gap: SPACE.m, paddingTop: SPACE.l }}
          ListEmptyComponent={<EmptyState onReload={load} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  inner: { flex: 1, width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center' },
  headerWrap: { paddingHorizontal: SPACE.l, paddingTop: SPACE.l },
  banner: {
    backgroundColor: COLORS.accent,
    borderRadius: 28,
    padding: SPACE.xl,
    overflow: 'hidden',
    ...SHADOW,
  },
  bubbleBig: {
    position: 'absolute', right: -30, top: -40,
    width: 140, height: 140, borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  bubbleSmall: {
    position: 'absolute', right: 60, bottom: -30,
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  kicker: { color: '#FFE4F1', fontSize: TYPO.caption, fontWeight: '700', letterSpacing: 1 },
  header: { fontSize: TYPO.h1, fontWeight: '800', color: '#fff', marginTop: SPACE.xs },
  countPill: {
    alignSelf: 'flex-start',
    marginTop: SPACE.m,
    paddingHorizontal: SPACE.m,
    paddingVertical: SPACE.xs,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  countText: { color: '#fff', fontSize: TYPO.caption, fontWeight: '700' },
  itemWrap: { flex: 1 },
  itemWrap2: { flex: 1, maxWidth: '50%' }, // item ganjil terakhir tetap setengah lebar
});