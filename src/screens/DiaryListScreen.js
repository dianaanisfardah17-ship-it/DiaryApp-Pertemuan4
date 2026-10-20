import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  useWindowDimensions,
} from 'react-native';

import {
  COLORS,
  SPACE,
  RADIUS,
  TYPO,
  BREAKPOINTS,
  MAX_WIDTH,
  MIN_TOUCH,
  MOODS,
} from '../styles/tokens';

import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import SearchBar from '../components/SearchBar';
import EntryForm from '../components/EntryForm';
import EmptyState from '../components/EmptyState';
import SkeletonCard from '../components/SkeletonCard';

const INITIAL_ENTRIES = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    mood: 'tenang',
    preview: 'Bangun lebih pagi dan menikmati udara segar.',
    body: 'Pagi ini aku bangun lebih awal. Udara masih sejuk dan suasananya tenang. Rasanya menyenangkan memulai hari tanpa terburu-buru.',
    moodImage: require('../../assets/moods/pagi.jpeg'),
    heroUri: require('../../assets/moods/pagi2.jpeg'),
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    mood: 'fokus',
    preview: 'Menyelesaikan modul dan tugas yang tertunda.',
    body: 'Hari ini aku berhasil menyelesaikan beberapa tugas dan membuat kemajuan untuk proyek. Senang rasanya ketika satu per satu pekerjaan selesai.',
    moodImage: require('../../assets/moods/produktif.jpeg'),
    heroUri: require('../../assets/moods/produktif2.jpeg'),
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    mood: 'santai',
    preview: 'Membaca buku sambil melihat matahari terbenam.',
    body: 'Aku duduk santai di taman sambil membaca buku. Langit sore terlihat cantik dan membuat pikiranku terasa lebih ringan.',
    moodImage: require('../../assets/moods/senja.jpeg'),
    heroUri: require('../../assets/moods/senja2.jpeg'),
  },
  {
    id: 4,
    title: 'Makan Siang Bareng Teman',
    date: '2025-10-07',
    mood: 'senang',
    preview: 'Mencoba kafe baru di sudut jalan.',
    body: 'Hari ini mencoba kopi dan pastry di kafe baru bersama teman-teman. Kami banyak bercerita dan tertawa.',
    moodImage: require('../../assets/moods/makan.jpeg'),
    heroUri: require('../../assets/moods/makan.jpeg'),
  },
  {
    id: 5,
    title: 'Olahraga Sore',
    date: '2025-10-08',
    mood: 'semangat',
    preview: 'Lari keliling komplek supaya badan tetap sehat.',
    body: 'Jogging sekitar tiga kilometer sore ini. Memang melelahkan, tetapi badan terasa segar setelahnya.',
    moodImage: require('../../assets/moods/olahraga.jpeg'),
    heroUri: require('../../assets/moods/olahraga2.jpeg'),
  },
  {
    id: 6,
    title: 'Hari yang Sedikit Berat',
    date: '2025-10-09',
    mood: 'sedih',
    preview: 'Belajar menerima bahwa tidak semua hal berjalan sesuai rencana.',
    body: 'Hari ini tidak semuanya berjalan sesuai harapan. Aku mencoba memberi waktu untuk diri sendiri dan mengingat bahwa besok selalu ada kesempatan baru.',
    moodImage: require('../../assets/moods/senja.jpeg'),
    heroUri: require('../../assets/moods/senja2.jpeg'),
  },
  {
    id: 7,
    title: 'Belajar Mengatur Emosi',
    date: '2025-10-10',
    mood: 'marah',
    preview: 'Mengambil jeda sebelum menanggapi sesuatu.',
    body: 'Ada hal yang membuatku kesal hari ini. Aku mencoba berhenti sebentar, menarik napas, dan memikirkan respons yang lebih baik.',
    moodImage: require('../../assets/moods/produktif.jpeg'),
    heroUri: require('../../assets/moods/produktif2.jpeg'),
  },
];

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoColumns = width >= BREAKPOINTS.tablet;

  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [query, setQuery] = useState('');
  const [likedIds, setLikedIds] = useState(() => new Set());
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return entries;

    return entries.filter((entry) => {
      const searchable = [
        entry.title,
        entry.preview,
        entry.body || '',
        entry.date,
        entry.mood || '',
        MOODS[entry.mood]?.label || '',
      ]
        .join(' ')
        .toLowerCase();

      return searchable.includes(q);
    });
  }, [entries, query]);

  const toggleLike = (id) => {
    setLikedIds((previous) => {
      const next = new Set(previous);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const addEntry = (newEntry) => {
    setEntries((previous) => [newEntry, ...previous]);
    setShowForm(false);
    setQuery('');
  };

  const ListHeader = (
    <View>
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={styles.brandIcon}>
            <Text style={styles.brandEmoji}>✿</Text>
          </View>

          <View style={styles.heroTitleWrap}>
            <Text style={styles.brand}>
              Dear Diary
            </Text>

            <Text style={styles.subtitle}>
              Simpan cerita kecilmu setiap hari.
            </Text>
          </View>

          <Text style={styles.sparkle}>✧</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>
              Total cerita
            </Text>

            <Text style={styles.statNumber}>
              {String(entries.length).padStart(2, '0')}
            </Text>

            <Text style={styles.statCaption}>
              Momen tersimpan ♡
            </Text>
          </View>

          <View style={[styles.statCard, styles.pinkStat]}>
            <Text style={styles.statLabel}>
              Disukai
            </Text>

            <Text style={styles.statNumber}>
              {String(likedIds.size).padStart(2, '0')}
            </Text>

            <Text style={styles.statCaption}>
              Cerita favorit ♡
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>
            Buku Harian
          </Text>

          <Text style={styles.sectionSubtitle}>
            Setiap hari punya cerita.
          </Text>
        </View>

        <Pressable
          onPress={() => setShowForm((previous) => !previous)}
          style={styles.addButton}
          accessibilityRole="button"
          accessibilityLabel={
            showForm
              ? 'Tutup formulir cerita'
              : 'Tambah cerita baru'
          }
        >
          <Text style={styles.addButtonText}>
            {showForm ? '− Tutup' : '+ Tulis'}
          </Text>
        </Pressable>
      </View>

      {showForm && (
        <View style={styles.formCard}>
          <EntryForm onSubmit={addEntry} />
        </View>
      )}

      <SearchBar
        value={query}
        onChange={setQuery}
      />

      <View style={styles.listHeading}>
        <Text style={styles.listTitle}>
          Semua cerita ✧
        </Text>

        <Text style={styles.count}>
          {filtered.length} entri
        </Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => {
    if (loading) {
      return <SkeletonCard twoColumns={twoColumns} />;
    }

    return (
      <DiaryCard
        entry={item}
        twoColumns={twoColumns}
        liked={likedIds.has(item.id)}
        onToggleLike={() => toggleLike(item.id)}
        onPress={() => setSelected(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrap}>
        <FlatList
          key={twoColumns ? 'two-columns' : 'one-column'}
          data={
            loading
              ? Array.from(
                  { length: 4 },
                  (_, index) => ({ id: `skeleton-${index}` })
                )
              : filtered
          }
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          numColumns={twoColumns ? 2 : 1}
          columnWrapperStyle={
            twoColumns ? styles.columnWrapper : undefined
          }
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={
            !loading ? (
              <EmptyState
                hasQuery={Boolean(query.trim())}
                onClear={() => setQuery('')}
              />
            ) : null
          }
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => (
            <View style={{ height: SPACE.m }} />
          )}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </View>

      <DiaryDetailModal
        visible={Boolean(selected)}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  contentWrap: {
    flex: 1,
    width: '100%',
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
  },

  listContent: {
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    paddingBottom: 36,
    flexGrow: 1,
  },

  hero: {
    padding: SPACE.xl,
    backgroundColor: COLORS.accentSoft,
    borderRadius: 26,
    marginBottom: 26,
  },

  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  brandIcon: {
    width: 48,
    height: 48,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACE.m,
  },

  brandEmoji: {
    fontSize: 28,
    color: '#8C6BC0',
  },

  heroTitleWrap: {
    flex: 1,
  },

  brand: {
    fontSize: TYPO.h1 - 3,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.7,
  },

  subtitle: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginTop: 4,
  },

  sparkle: {
    color: '#B18AE0',
    fontSize: 30,
  },

  statsRow: {
    flexDirection: 'row',
    gap: SPACE.m,
  },

  statCard: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
  },

  pinkStat: {
    backgroundColor: COLORS.pink,
  },

  statLabel: {
    fontSize: 12,
    color: COLORS.muted,
  },

  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.accent,
    marginVertical: 3,
  },

  statCaption: {
    fontSize: 10,
    color: COLORS.muted,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },

  sectionSubtitle: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 4,
  },

  addButton: {
    minHeight: MIN_TOUCH,
    justifyContent: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 17,
    borderRadius: 24,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },

  formCard: {
    marginTop: SPACE.l,
    marginBottom: SPACE.s,
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },

  listHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: 4,
  },

  listTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#4B365F',
  },

  count: {
    fontSize: 11,
    color: COLORS.muted,
    backgroundColor: COLORS.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    overflow: 'hidden',
  },

  columnWrapper: {
    gap: SPACE.m,
    alignItems: 'stretch',
  },
});