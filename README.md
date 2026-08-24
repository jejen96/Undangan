# Undangan Digital — Seruni

Website penjualan undangan digital pernikahan.  
Stack: **Laravel 9** (backend) · **React + Vite** (frontend) · **MySQL 8.4** (database)

---

## Struktur Proyek

```
├── backend/                         # Laravel 9
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/
│   │   │   │   └── TemplateController.php
│   │   │   └── Resources/
│   │   │       └── TemplateResource.php
│   │   └── Models/
│   │       └── Template.php
│   ├── database/
│   │   ├── migrations/
│   │   │   └── ..._create_templates_table.php
│   │   └── seeders/
│   │       └── TemplateSeeder.php   (18 template)
│   ├── routes/
│   │   └── api.php
│   ├── config/cors.php              (CORS sudah dikonfigurasi)
│   └── .env                        (DB sudah dikonfigurasi)
│
├── frontend/                        # React + Vite
│   ├── src/
│   │   ├── api/templates.js
│   │   ├── components/
│   │   └── pages/
│   └── .env
│
├── start.bat                        # Jalankan semua sekaligus
└── stop.bat                         # Matikan semua sekaligus
```

---

## Cara Menjalankan

### Double klik `start.bat` — otomatis buka semua

Atau manual di 3 terminal terpisah:

#### 1. MySQL
```bat
"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe" --defaults-file="C:\Users\admin\mysql-data\my.ini" --console
```

#### 2. Backend (Laravel)
```bash
cd backend
php artisan serve --port=8000
```
Berjalan di: http://localhost:8000

#### 3. Frontend (React)
```bash
cd frontend
npm run dev
```
Berjalan di: http://localhost:5173

---

## API Endpoints

| Method | URL | Deskripsi |
|--------|-----|-----------|
| GET | `/api/templates` | Semua template |
| GET | `/api/templates?has_photo=true` | Filter: dengan foto |
| GET | `/api/templates?has_photo=false` | Filter: tanpa foto |
| GET | `/api/templates?category=elegant` | Filter: kategori |
| GET | `/api/templates?has_photo=true&category=elegant` | Filter kombinasi |
| GET | `/api/templates/{id}` | Detail 1 template |
| GET | `/api/health` | Health check |

---

## Konfigurasi Database (`backend/.env`)

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=undangan_digital
DB_USERNAME=root
DB_PASSWORD=
```

---

## Reset / Re-seed Database

```bash
cd backend
php artisan migrate:fresh --seed
```
