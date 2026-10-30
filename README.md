# Dear Diary – Aplikasi Catatan Harian

**Nama:** Diana Anis Fardah  
**NIM:** 2430511046  
**Program Studi:** Teknik Informatika  
**Universitas Muhammadiyah Sukabumi**

## 1. Cara Menjalankan Project

1. Pastikan Node.js dan Expo sudah terpasang.
2. Buka folder project melalui VS Code.
3. Jalankan perintah berikut di terminal:

   ```bash
   npm install
   npx expo install expo-image-picker react-native-safe-area-context
   npx expo start
   ```

4. Scan QR Code menggunakan aplikasi Expo Go atau jalankan melalui emulator Android.

## 2. Penggunaan Props dan State

**Props** digunakan untuk mengirim data dan fungsi antar-komponen, antara lain:
- `DiaryCard`: menerima data diary, status favorit, dan fungsi klik.
- `DiaryDetailModal`: menerima data diary yang dipilih serta fungsi menutup modal.
- `EntryForm`: menerima fungsi untuk menyimpan diary.
- `SearchBar`: menerima nilai pencarian dan fungsi perubahan.
- `MoodBadge`: menerima jenis mood untuk ditampilkan.

**State** digunakan untuk mengelola data dan perubahan tampilan aplikasi, antara lain:
- `entries`: menyimpan daftar diary.
- `query`: menyimpan kata kunci pencarian.
- `likedIds`: menyimpan daftar diary favorit.
- `selected`: menyimpan diary yang dipilih.
- `showForm`: mengatur tampilan formulir diary.
- `loading`: mengatur kondisi loading.

## 3. Screenshot Aplikasi

### Tampilan 1 Kolom
![Tampilan 1 Kolom](screenshots/1-kolom.png)

### Daftar Diary
![Daftar Diary](screenshots/list.png)

### Hasil Pencarian
![Hasil Search](screenshots/hasil-search.png)

### Form Tulis Diary
![Tulis Diary](screenshots/tulis-diary.png)

![Tulis Diary 2](screenshots/tulis-diary2.png)

### Tampilan 2 Kolom
![Tampilan 2 Kolom](screenshots/2kolom.png)

