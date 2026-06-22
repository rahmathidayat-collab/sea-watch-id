# SEA WATCH ID 🚢
**Aplikasi Monitoring Posisi Kapal Real-Time berbasis Mobile Computing**

Aplikasi **SEA WATCH ID** adalah platform mobile yang dirancang khusus untuk memantau posisi, spesifikasi, dan wilayah operasi kapal secara real-time. Aplikasi ini dibangun menggunakan **React Native (Expo)** dan menerapkan arsitektur Client-Server yang memanfaatkan **Firebase Realtime Database** sebagai backend serta **Axios** untuk manajemen komunikasi datanya (Modul 5).

---

## 👥 Anggota Tim & Tabel Pembagian Tugas
**Nama Tim:** Automation Engineer  

| Nama Anggota | Job Desk / Pembagian Tugas |
| :--- | :--- |
| **RAHMAT HIDAYAT AL HAMIDY** | **State Management & Core Logic Developer:**<br>• Mengelola arsitektur data lokal dan seluruh logika per *state* aplikasi (`useState`, `useEffect`).<br>• Menyusun sistem penyaringan data (*filtering logic*) kapal berdasarkan wilayah operasi secara dinamis.<br>• Mengonfigurasi parameter *deep linking* koordinat untuk fungsi visualisasi peta.<br>• Mengembangkan logika pembalikan array (`.reverse()`) untuk optimalisasi tampilan riwayat terbaru. |
| **VALENTINO FEBRIAN** | **UI/UX Designer & API Integration Specialist:**<br>• Merancang dan mengimplementasikan seluruh tampilan antarmuka (UI/UX) aplikasi dengan tema *Dark Mode* yang responsif.<br>• Bertanggung jawab penuh atas integrasi library **Axios** untuk komunikasi data dua arah (`GET` & `POST`) dengan API Firebase.<br>• Mengonfigurasi endpoint database kustom untuk menampung 100 manifest data kapal.<br>• Melakukan *handling* data NoSQL dari Firebase menjadi format komponen `FlatList`. |

---

## 🛠️ Fitur Utama Aplikasi
Aplikasi ini dilengkapi dengan 4 fitur utama yang saling terintegrasi:
1. **Dynamic Searching & Filtering:** Memungkinkan pengguna mencari kapal berdasarkan nama spesifik atau wilayah operasi tertentu (seperti Bali, Batam, Tanjung Priok) secara instan dari halaman Dashboard (`index.tsx`).
2. **Real-Time Live Logging (History Feedback):** Setiap kali user membuka halaman detail kapal, aplikasi secara otomatis melakukan *write data* ke Firebase untuk mencatat riwayat akses.
3. **Smart Reverse History:** Menampilkan daftar riwayat aktivitas di halaman `history.tsx` dengan urutan yang dibalik (`.reverse()`), sehingga aktivitas terbaru selalu berada di paling atas layar.
4. **External Deep Linking Maps:** Menyediakan fitur pemetaan akurat dengan melempar parameter koordinat (*latitude* & *longitude*) langsung ke aplikasi Google Maps asli bawaan perangkat pengguna agar hemat resource aplikasi.

---

## 🌐 Daftar API yang Digunakan (Custom Firebase API)
Aplikasi ini menggunakan **Custom Mock API** mandiri berbentuk JSON Endpoint NoSQL yang di-host langsung di Firebase Realtime Database:

### 1. Endpoint Data Kapal (Ships Data)
* **URL End Point:** `https://fir-db-654c4-default-rtdb.asia-southeast1.firebasedatabase.app/ships.json`
* **Metode HTTP:** `GET`
* **Fungsi:** Digunakan oleh `shiplist.tsx` dan `shipDetail.tsx` untuk menarik data mentah dari 100 manifest kapal kustom (nama, tipe, kecepatan knot, area, koordinat) secara *asynchronous*.

### 2. Endpoint Riwayat (History Logs)
* **URL End Point:** `https://fir-db-654c4-default-rtdb.asia-southeast1.firebasedatabase.app/history.json`
* **Metode HTTP:** `GET` & `POST`
* **Fungsi:** * `POST`: Digunakan oleh `shipDetail.tsx` untuk mengirimkan log riwayat baru berupa nama kapal dan *timestamp* saat detail kapal diakses.
  * `GET`: Digunakan oleh `history.tsx` untuk mengambil kembali seluruh log riwayat aktivitas pengguna untuk ditampilkan di layar.

---

## 🚀 Teknologi yang Digunakan
* **Framework:** React Native (Expo Router)
* **State Management:** React Hooks (`useState`, `useEffect`, `useLocalSearchParams`)
* **HTTP Client:** Axios (Asynchronous Request/Response)
* **Database Backend:** Firebase Realtime Database (NoSQL)
* **Navigation:** Expo Router & Linking API
