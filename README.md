# Diary App
 
**Nama:** Diana Anis Fardah
**NIM:** [isi NIM]
**Kelas:** [isi kelas]
 
## Cara Menjalankan
1. Pastikan Node.js sudah terpasang.
2. Buka folder project, lalu jalankan:
   npm install
   npx expo start -c
3. Tekan w untuk membuka di browser, atau pindai QR code dengan Expo Go.
 
## Fitur yang Diselesaikan
- Pengaturan tampilan dibuat konsisten melalui tokens.js.
- Daftar diary tampil satu kolom pada layar di bawah 600 piksel dan dua kolom pada layar 600 piksel atau lebih.
- Detail diary dapat dibuka dengan menekan kartu.
- Fitur aksesibilitas dasar tersedia, seperti label, kontras warna, dan ukuran area tekan.
- Terdapat 5 entri diary, termasuk 2 entri baru.
- Badge mood memiliki warna border yang berbeda.
- Empty state menampilkan pesan dan tombol muat ulang saat data kosong.
- Skeleton loader ditampilkan sebagai penanda saat menunggu data.
 
## Screenshot
- screenshots/1-kolom.png
- screenshots/2-kolom.png
 
## Catatan Breakpoint 600 px
Lebar layar dibaca dengan useWindowDimensions. Jika width >= 600,
FlatList memakai numColumns={2} dan kartu bervariasi grid;
jika tidak, 1 kolom. key FlatList diganti agar layout dibuat ulang.

