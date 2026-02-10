## 🏗️ Design Pattern: Nest Zero Architecture

Project ini dibangun menggunakan pendekatan **"Nest Zero"**, sebuah variasi dari struktur modular standar NestJS yang difokuskan pada kesederhanaan, skalabilitas, dan developer experience.

### Mengapa memilih pattern ini?

1.  **Modular & Separation of Concerns (SoC)**
    * Setiap fitur (Users, Notes) memiliki module sendiri yang terisolasi.
    * **Controller** hanya mengurusi HTTP Request/Response.
    * **Service** hanya mengurusi Business Logic.
    * **Repository (Prisma)** mengurusi Database.
    * Ini membuat kode mudah dibaca dan di-maintain.

2.  **Global Common Module**
    * Service yang digunakan berulang kali (seperti `PrismaService`, `ValidationService`, `Logger`) dikumpulkan dalam satu `CommonModule` yang bersifat `@Global()`.
    * **Benefit:** Tidak perlu mengimport module database berulang-ulang di setiap fitur baru, mengurangi boilerplate code.

3.  **Strict Validation Layer**
    * Menggunakan **Zod** daripada `class-validator` bawaan.
    * **Benefit:** Zod memberikan validasi skema yang lebih ekspresif, type inference otomatis ke TypeScript, dan performa runtime yang lebih ringan.

4.  **Single Responsibility Principle**
    * Autentikasi dipisah menggunakan **Passport Strategy** (Guard), sehingga Controller tidak tercemar oleh logika pengecekan token manual.

Arsitektur ini cocok untuk aplikasi skala kecil hingga menengah yang membutuhkan fondasi kokoh namun tetap cepat untuk dikembangkan (Rapid Application Development).