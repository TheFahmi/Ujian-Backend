# Ujian Backend - TypeScript + TypeORM Version

Proyek ini merupakan versi modern dari backend API Ujian Backend Fahmi menggunakan TypeScript dan TypeORM.

## Fitur

- REST API untuk manajemen movie, kategori, dan relasi antara keduanya
- Dibuat dengan Express.js dan TypeORM
- Menggunakan ES Modules untuk struktur kode modern
- Entity relationship dengan TypeORM untuk model data yang kuat
- Keamanan ditingkatkan dengan Helmet dan Rate Limiting
- Dikonversi ke TypeScript untuk keamanan tipe data dan pengembangan yang lebih baik
- Validasi input untuk mencegah data tidak valid

## Persyaratan

- Node.js 16+ 
- MySQL Server 8+
- npm atau yarn

## Instalasi

1. Clone repositori:
   ```
   git clone https://github.com/TheFahmi/Ujian-Backend.git
   cd Ujian-Backend
   ```

2. Instal dependensi:
   ```
   npm install
   ```

3. Membuat database dan tabel (TypeORM akan secara otomatis membuat tabel dari entity jika `synchronize: true`):
   ```
   mysql -u root -p
   ```
   ```sql
   CREATE DATABASE movieindoxxi;
   ```

## Variabel Lingkungan

Buat file `.env` di root proyek dengan konfigurasi sebagai berikut:

```
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=movieindoxxi
```

## Penggunaan

### Development

Untuk menjalankan dalam mode development dengan hot-reload:

```
npm run dev
```

### Production

Untuk membangun dan menjalankan dalam mode production:

```
npm run build
npm start
```

## Entity & Relation

Proyek ini menggunakan TypeORM dengan tiga entity utama:

1. **Movie** - Entity untuk data film
   - id: Primary Key
   - nama: Nama film
   - tahun: Tahun film dirilis
   - OneToMany relasi ke MovieCategory

2. **Category** - Entity untuk data kategori film
   - id: Primary Key
   - nama: Nama kategori
   - OneToMany relasi ke MovieCategory

3. **MovieCategory** - Entity untuk relasi antara film dan kategori (junction table)
   - id: Primary Key 
   - movieId: Foreign Key ke Movie
   - categoryId: Foreign Key ke Category
   - ManyToOne relasi ke Movie dan Category

## Teknologi

Proyek ini menggunakan:

- **Express.js** - Framework web
- **TypeScript** - Bahasa pemrograman untuk type safety
- **TypeORM** - ORM untuk pengelolaan database dan relasi dengan model
- **MySQL2** - Driver database yang lebih cepat dan mendukung promise
- **Helmet** - Keamanan HTTP header
- **Express Rate Limit** - Pembatasan jumlah request untuk mencegah DDoS
- **ES Modules** - Format module JavaScript modern
- **Reflect Metadata** - Untuk mendukung decorators TypeORM

## Endpoint API

### Movies
- `GET /movie/getmovies` - Mendapatkan semua film
- `GET /movie/getmovies/:id` - Mendapatkan film berdasarkan ID
- `POST /movie/addmovie` - Menambahkan film baru
- `PUT /movie/editmovie/:id` - Mengedit film berdasarkan ID
- `DELETE /movie/deletemovie/:id` - Menghapus film berdasarkan ID

### Categories
- `GET /category/getcategories` - Mendapatkan semua kategori
- `GET /category/getcategories/:id` - Mendapatkan kategori berdasarkan ID
- `POST /category/addcategory` - Menambahkan kategori baru
- `PUT /category/editcategory/:id` - Mengedit kategori berdasarkan ID
- `DELETE /category/deletecategory/:id` - Menghapus kategori berdasarkan ID

### Movie-Category Relations
- `GET /movcat/getmovcats` - Mendapatkan semua relasi film-kategori
- `GET /movcat/getmovcats/:id` - Mendapatkan relasi berdasarkan ID
- `POST /movcat/addmovcat` - Menambahkan relasi baru
- `PUT /movcat/editmovcat/:id` - Mengedit relasi berdasarkan ID
- `DELETE /movcat/deletemovcat/:id` - Menghapus relasi berdasarkan ID

## Pengembang

- Fahmi 