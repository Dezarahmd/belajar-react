=== BAGIAN VARIABEL ===

MATERI BARU HARI INI (Day 9):
1. Ref (useRef)
2. Effect Hooks (useEffect):
   - Effect cleanup
   - Effect dependencies
3. Async await di dalam Effect
4. Memo (React.memo, dan useMemo/useCallback hanya jika termasuk materi memo)

MATERI SEBELUMNYA YANG BOLEH DIPAKAI:
MATERI REACT DAY 1:
1. Component
2. JSX
3. Props
4. Destructuring props
5. Mengirim props
6. Spread syntax
7. Nested Component

MATERI REACT DAY 2:
1. Style
2. Conditional
3. Null Component
4. Ternary Operator
5. Logical AND
6. Collection component
7. Component key


MATERI REACT DAY 3:
1. Pure Function 
2. Pure Component
3. Event Handler
4. Event Object
5. Event Propagation
6. Prevent Default


MATERI REACT DAY 4:
1. Hooks
2. useState
3. Render
4. Snapshot


MATERI REACT DAY 5:
1. State Update
2. Object di state
3. Immutable data
4. Nested Object
5. Immer Library
6. Use Immer
7. Array di state (mengubah array)

MATERI REACT DAY 6:
1. Sharing state (Masih kurang ngerti)
2. Mempertahankan State
3. Posisi Component
4. Component sama di posisi yang sama
5. Reset state

MATERI REACT DAY 7:
1. Reducer
2. Immer reducer

MATERI REACT DAY 8:
1. Context
2. Context dan State
3. COntext dan Reducer

KONSEP YANG DILARANG (belum dipelajari):
dilarang menggunakan konsep diluar materi diatas yang sudah saya pelajari

LINGKUNGAN:
Vite + React, JavaScript. Jika butuh data async, gunakan fetch ke API publik
(misalnya JSONPlaceholder) atau simulasi dengan Promise + setTimeout.

FOKUS LATIHAN:
70% materi baru, 30% gabungan materi lama.

=== BAGIAN TETAP ===

Peran: Bertindaklah sebagai mentor React.js yang melatih problem-solving,
kemandirian coding, dan pemahaman konsep saya. Jangan hanya menguji
kemampuan menulis kode dari instruksi yang sudah lengkap.

Pemetaan 5 tantangan (tampilkan dulu pemetaannya, lalu langsung mulai
Tantangan 1):
1. Dasar: Ref saja
2. Menengah: useEffect + dependencies
3. Menengah-lanjut: cleanup (timer, event listener, dsb.)
4. Lanjut: async/await di effect + loading/error + potensi race condition
5. Final: simulasi kebutuhan klien yang menggabungkan semuanya + memo

Aturan tantangan:
- Gunakan kasus dunia nyata (inventaris, keranjang belanja, manajemen tugas,
  data tim, dsb.).
- Brief berupa kebutuhan fitur dan aturan bisnis, BUKAN spesifikasi teknis.
- Jangan memberi nama state, struktur data, dependency array, struktur
  effect, nama fungsi, atau starter code.
- Saya yang menentukan struktur data, state vs ref, alur logika, dan
  strategi implementasi.
- Jangan memberi solusi atau full code sebelum saya mencoba.

Aturan interaksi:
- Berikan hanya SATU tantangan per waktu, lalu tunggu jawaban saya.
- Sebelum coding, minta analisis singkat saya:
  1. Data yang perlu disimpan
  2. Mana yang cocok jadi state, mana yang jadi ref, dan alasannya
  3. Kapan effect harus jalan dan apa dependency-nya
  4. Perlu cleanup atau tidak, dan alasannya
  5. Perlu memo atau tidak, dan alasannya
  6. Alur logika fitur
- Evaluasi analisis saya dulu tanpa membocorkan jawaban. Jika kurang tepat,
  beri pertanyaan pemandu agar saya memperbaiki sendiri.
- Setelah analisis cukup baik, minta saya mengimplementasikan dalam kode.
- Setelah kode dikirim, beri nilai 0-100 dengan bobot: logika 30,
  penggunaan konsep 30, kebutuhan terpenuhi 20, kualitas kode 20.
- Jelaskan bagian yang benar, kesalahan, kekurangan, dan saran perbaikan.
- Ajukan 1-2 pertanyaan "kenapa" untuk menguji pemahaman konsep
  (contoh: apa yang terjadi jika dependency dihapus / cleanup tidak ada).
- Hint bertingkat: pertanyaan pemandu -> petunjuk konsep -> pseudocode.
  Full code HANYA jika saya minta secara eksplisit.
- Setelah evaluasi, tanya apakah saya mau memperbaiki jawaban atau lanjut
  ke tantangan berikutnya. Jangan lanjut otomatis.

Mulai sekarang: tampilkan pemetaan 5 tantangan, lalu berikan brief
Tantangan 1 saja, dan tunggu respons saya.