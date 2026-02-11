# 🚀 Test API 

Backend REST API yang dibangun menggunakan **NestJS** dengan arsitektur **Modular Monolith** yang bersih, aman, dan scalable. Project ini mencakup fitur otentikasi pengguna (JWT), manajemen kategori, catatan (CRUD), validasi data ketat, dan dokumentasi otomatis.

## 🛠️ Tech Stack

* **Framework:** [NestJS](https://nestjs.com/) (Node.js)
* **Language:** TypeScript
* **Database:** MySQL
* **ORM:** [Prisma](https://www.prisma.io/)
* **Validation:** [Zod](https://zod.dev/)
* **Authentication:** JWT (Passport)
* **Logging:** Winston
* **Documentation:** Swagger UI

---

## ✨ Fitur Utama

1.  **Authentication (JWT)**
    * Register User (Password di-hash dengan Bcrypt).
    * Login (Mendapatkan Token Bearer).
    * Proteksi Endpoint (Guard) menggunakan Strategy JWT.

2.  **Categories Management (CRUD)**
    * **Create:** Membuat kategori baru (misal: "Kuliah", "Kerjaan").
    * **Read:** Melihat daftar kategori milik user.
    * **Update:** Mengubah nama kategori.
    * **Delete:** Menghapus kategori.

3.  **Notes Management (CRUD)**
    * **Create:** Membuat catatan baru dengan relasi ke Kategori (Optional).
    * **Read:** Melihat daftar catatan beserta detail kategorinya.
    * **Update:** Mengedit judul/isi catatan & memindahkan kategori.
    * **Delete:** Menghapus catatan.

4.  **Keamanan & Validasi**
    * Validasi input request menggunakan **Zod Schema**.
    * **Ownership Check:** Memastikan user tidak bisa mengedit/menghapus data milik orang lain.

5.  **Developer Experience**
    * **Swagger UI:** Testing API visual tanpa Postman.
    * **Winston Logger:** Logging aktivitas user yang rapi dan terstruktur.

---

## 🏗️ Design Pattern: Modular Monolith Architecture

Project ini dibangun menggunakan arsitektur **Modular Monolith**, standar industri untuk aplikasi NestJS yang mengutamakan keteraturan dan kemudahan maintenance.

### Mengapa menggunakan pattern ini?

1.  **Modular & Separation of Concerns (SoC)**
    * Setiap fitur bisnis (`Users`, `Notes`, `Categories`) diisolasi dalam **Module** tersendiri.
    * Kode terorganisir rapi: **Controller** (HTTP), **Service** (Logic), dan **Repository** (Database) terpisah jelas.
    * Memudahkan refactoring atau migrasi ke Microservices di masa depan.

2.  **Global Common Module**
    * Komponen pendukung yang bersifat umum (seperti `PrismaService`, `ValidationService`, `Logger`) dikumpulkan dalam satu `CommonModule` yang bersifat `@Global()`.
    * Mengurangi duplikasi kode (*Don't Repeat Yourself*) dan menyederhanakan dependency injection.

3.  **Strict Validation Layer**
    * Menggunakan **Zod** sebagai validasi skema data transfer (DTO).
    * Memberikan keamanan tipe data (*type safety*) yang lebih kuat dibandingkan validator bawaan, serta performa runtime yang lebih ringan.

---

## ⚙️ Cara Install & Running

Pastikan kamu sudah menginstall **Node.js** dan **MySQL** (via XAMPP/Laragon).

### 1. Clone & Install Dependencies
```bash
# Clone repository ini (jika ada) atau masuk ke folder project
cd magang-test

# Install semua library
npm install

```

### 2. Setup Environment Variable

Buat file `.env` di root folder, lalu isi konfigurasi berikut:

```env
# Database Config (Sesuaikan username:password database lokalmu)
DATABASE_URL="mysql://root:@localhost:3306/magang_test_db"

# JWT Secret (Bebas, makin panjang makin aman)
JWT_SECRET="rahasia_super_kikuk_afandi_2026"

```

### 3. Setup Database (Prisma Migrate)

Pastikan MySQL sudah **Start**, lalu jalankan:

```bash
# Generate tabel user, category, & note di database
npx prisma migrate dev --name init_db

```

### 4. Jalankan Aplikasi

```bash
# Running mode development
npm run start:dev

```

Aplikasi akan berjalan di: `http://localhost:3000`

---

## 📖 Dokumentasi API (Swagger)

Project ini dilengkapi dengan Swagger UI untuk mempermudah testing.

1. Jalankan aplikasi (`npm run start:dev`).
2. Buka browser dan akses:
👉 **http://localhost:3000/api-docs**
3. **Cara Pakai:**
* Lakukan **Login** terlebih dahulu.
* Copy **Token** dari response.
* Klik tombol **Authorize** (ikon gembok) di kanan atas.
* Paste token dengan format: `Bearer <token_kamu>`.
* Sekarang kamu bisa mencoba semua fitur (Users, Categories, Notes).



---

## 📂 Struktur Project

```
src/
├── common/             # Module Global (Prisma, Validation, Config)
├── users/              # Fitur User (Auth & Profile)
├── categories/         # Fitur Kategori (CRUD)
├── notes/              # Fitur Notes (CRUD & Relasi)
└── main.ts             # Entry point (Swagger Setup)

```

---

Created with ❤️ by **Kikuk Afandi**
