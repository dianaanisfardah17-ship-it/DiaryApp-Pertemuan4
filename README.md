<<<<<<< HEAD
# 📔 Diary App — React Native & Expo

Aplikasi buku harian sederhana yang dikembangkan menggunakan React Native dan Expo CLI untuk tugas Praktikum Mobile Multi Platform Pertemuan 

## Identitas Mahasiswa

- **Nama:** Diana Anis Fardah
- **NIM:** 2430511046
- **Program Studi:** Teknik Informatika
- **Universitas:** Universitas Muhammadiyah Sukabumi

## Fitur yang Diselesaikan

- Menampilkan lima entri catatan harian.
- Menampilkan judul, tanggal, ringkasan, gambar, dan mood pada setiap catatan.
- Menampilkan avatar pengguna pada bagian header.
- Menampilkan variasi warna kartu berdasarkan mood: Senang, Fokus, Tenang, Sedih, dan Semangat.
- Menggunakan gambar lokal dari folder `assets/moods/`.
- Menggunakan komponen reusable `DiaryCard`.
- Menampilkan daftar catatan menggunakan `ScrollView` dan metode `map()`.

## Langkah Menjalankan Proyek

1. Clone Repository

Buka terminal atau CMD, lalu jalankan perintah berikut:

```bash
git clone https://github.com/dianaanisfardah17-ship-it/diary-app.git
```

2. Masuk ke Folder Proyek
   
```bash
cd diary-app
```

3. Instal Dependensi

Pastikan Node.js sudah terinstal, kemudian jalankan:

```bash
npm install
```
Tunggu sampai proses instalasi selesai.

4. Jalankan Aplikasi

Jalankan perintah berikut untuk memulai Expo:

```bash
npx expo start
```

5. Buka Aplikasi

Setelah Expo berjalan, aplikasi dapat dibuka dengan salah satu cara berikut:

- HP Android: Pindai QR code menggunakan Expo Go.
- Android Emulator: Tekan tombol "a" pada terminal Expo jika emulator sudah berjalan.
- Browser: Tekan tombol "w" jika proyek mendukung versi web.
   
📁 Struktur Proyek
```text
diary-app/
├── assets/
│   └── moods/
│       ├── 1.jpeg
│       ├── 2.jpeg
│       ├── 3.jpeg
│       ├── 4.jpeg
│       ├── 5.jpeg
│       └── WhatsApp Image ...
├── screenshot/
│   └── diary-home.jpeg
├── src/
│   ├── components/
│   │   └── DiaryCard.js
│   ├── screens/
│   │   └── DiaryListScreen.js
│   └── styles/
│       └── moods.js
├── App.js
├── app.json
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

## Screenshot Aplikasi

![Tampilan Diary App](screenshot/diary-home.jpeg)
=======
# Diary App

**Nama:** Diana Anis Fardah
**NIM:** 2430511046
**Kelas:** 5C

## Cara Menjalankan
1. Pastikan Node.js sudah terpasang.
2. Buka folder project, lalu jalankan:
   npm install
   npx expo start -c
3. Tekan `w` untuk membuka di browser, atau pindai QR code dengan Expo Go.

## Fitur yang Diselesaikan
- Design tokens dan StyleSheet konsisten di semua komponen
- FlatList responsif: 1 kolom (< 600 px) dan 2 kolom (≥ 600 px)
- DiaryDetailModal terbuka saat kartu ditekan
- Aksesibilitas dasar (label, kontras, target sentuh 48 px)
- 5 entri diary (2 entri baru)
- Badge mood dengan warna border berbeda per mood
- Empty state informatif dengan tombol muat ulang
- Skeleton loader sebelum data tampil

## Screenshot
- screenshots/1-kolom.png
- screenshots/2-Kolom.jpeg

## Catatan Breakpoint 600 px
Lebar layar dibaca dengan `useWindowDimensions`. Jika `width >= 600`,
FlatList memakai `numColumns={2}` dan kartu bervariasi `grid`;
jika tidak, 1 kolom. `key` FlatList diganti agar layout dibuat ulang.
>>>>>>> 07353d8 (Update Diary App Praktikum Pertemuan 3)
