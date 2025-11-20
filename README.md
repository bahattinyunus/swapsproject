# SwapS-Project

SwapS: Proje tabanlı beceri takas platformu. Kullanıcılar projelerini ve ihtiyaç duydukları becerileri paylaşır; diğer kullanıcılar kendi becerileriyle katkı sunarak karşılıklı kazan-kazan (skill swap) modeliyle işbirliği yapar.

---

## İçindekiler

- Özellikler
- Mimari ve Klasör Yapısı
- Gereksinimler
- Kurulum
- Çalıştırma
- Ortam Değişkenleri (.env)
- Proje Komutları
- Geliştirme Rehberi
- Test, Lint ve Format
- Dağıtım (Deploy) Notları
- Yol Haritası
- Katkı ve Lisans

---

## Özellikler

- Kullanıcı kaydı ve JWT tabanlı kimlik doğrulama
- Proje oluşturma ve yönetim sistemi
- Kullanıcı profili ve beceri etiketleri yönetimi
- **Kullanıcı beceri sistemi** (Offering/Seeking)
- **Karşılıklı eşleşme algoritması** (Reciprocal Matching)
- Başvuru ve teklif yönetimi (Matches)
- Eşleşme ve iletişim akışı (örn. mesajlaşma/yorumlar)
- Admin paneli (Kullanıcı ve beceri yönetimi)
- Dashboard görev yönetimi
- Değerlendirme/geri bildirim sistemi (ileride)

> Not: Özelliklerin kapsamı ve detayları geliştirme ilerledikçe güncellenecektir.

## Mimari ve Klasör Yapısı

Monorepo düzeni ile `backend` ve `frontend` dizinleri:

```
.
├─ backend/         # Sunucu tarafı kodu (Node.js/Express + PostgreSQL)
│  ├─ config/       # Veritabanı konfigürasyonu
│  ├─ controllers/  # İş mantığı kontrolcüleri
│  ├─ middleware/   # JWT authentication middleware
│  ├─ routes/       # API route tanımlamaları
│  ├─ index.js      # Ana sunucu dosyası
│  └─ sema.sql      # Veritabanı şema tanımları
└─ frontend/        # İstemci tarafı uygulama (React + Vite)
   ├─ src/
   │  ├─ components/ # React bileşenleri
   │  ├─ services/   # API servisleri
   │  └─ App.jsx     # Ana uygulama
   └─ public/        # Statik dosyalar
```

### Veritabanı Yapısı (PostgreSQL)

- **Kullanicilar** - Kullanıcı hesapları ve kimlik bilgileri
- **Yetenekler** - Beceri/yetenek katalogu (kategori bazlı)
- **User_Skill** 🆕 - Kullanıcı-Beceri ilişkisi (Offering/Seeking)
- **Projects** - Kullanıcı projeleri
- **Matches** - Proje başvuruları ve eşleşmeler
- **Messages** - Kullanıcı mesajlaşma sistemi

## Gereksinimler

- Git
- Node.js 18+ ve paket yöneticisi (npm / yarn / pnpm) veya
- Python/Java/Go gibi alternatif backend yığını (seçime göre güncellenecek)
- Bir veritabanı (PostgreSQL önerilir) – opsiyonel, yığındaki karara göre

## Kurulum

1) Depoyu klonlayın:

```bash
git clone https://github.com/USERNAME/SwapS-Project.git
cd SwapS-Project
```

2) Ortam değişkeni dosyalarını oluşturun (örnek aşağıda):

```bash
cp backend/.env.example backend/.env  # yoksa oluşturun
cp frontend/.env.example frontend/.env # yoksa oluşturun
```

3) Bağımlılıkları kurun (seçeceğiniz yığına göre):

```bash
# Node.js tabanlı ise
cd frontend && npm install && cd ..
cd backend  && npm install && cd ..

# Alternatif: Python tabanlı backend ise (örnek)
# cd backend && python -m venv .venv && source .venv/bin/activate
# pip install -r requirements.txt && cd ..
```

## Çalıştırma

### 1. PostgreSQL Veritabanını Hazırlayın

```bash
# PostgreSQL'e bağlanın
psql -U postgres

# Veritabanını oluşturun
CREATE DATABASE swaps_db;

# Çıkış yapın
\q
```

> **Not:** Şema otomatik olarak ilk çalıştırmada oluşturulur. Manuel olarak oluşturmak için `backend/sema.sql` dosyasını kullanabilirsiniz.

### 2. Backend'i Başlatın

```bash
cd backend
npm install
node index.js
# Sunucu http://localhost:3000 adresinde başlatılacak
```

### 3. Frontend'i Başlatın

```bash
cd frontend
npm install
npm run dev
# Uygulama http://localhost:5173 adresinde açılacak
```

## Ortam Değişkenleri (.env)

### Backend (.env)
```env
NODE_ENV=development
PORT=3000

# PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=swaps_db

# JWT Secret
JWT_SECRET=your_super_secret_key_here

# Frontend URL (CORS için)
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3000
```

## Proje Komutları

Aşağıdaki komutlar örnek olup projenin gerçek yığınına göre güncellenmelidir.

```bash
# Frontend
npm run dev       # Geliştirme sunucusu
npm run build     # Üretim derlemesi
npm run preview   # Üretim derlemesini lokalde önizleme

# Backend
npm run dev       # Geliştirme sunucusu (hot-reload)
npm run build     # Üretim derlemesi
npm start         # Üretim çalıştırma
```

## Geliştirme Rehberi

- Dal (branch) stratejisi: `main` kararlı, özellikler için `feature/<isim>` dalları
- Commit biçimi: Anlaşılır, atomik ve tek konu odaklı
- Kod inceleme (PR) gereklidir; küçük de olsa PR açın
- Kod okunabilirliğini ve test kapsamını koruyun


## Dağıtım (Deploy) Notları

### Backend + Database: Render.com
- **Backend Web Service:** Node.js uygulaması olarak deploy edilir
- **PostgreSQL Database:** Render PostgreSQL (Free plan mevcut)
- Detaylı kurulum için: [README-RENDER-SETUP.md](./README-RENDER-SETUP.md) dosyasına bakın

### Frontend: Render Static Site (veya Vercel)
- **Render Static Site:** Basit ve hızlı deploy
- **Alternatif Vercel:** Frontend için Vercel de kullanılabilir

### Hızlı Deploy (render.yaml ile)
Proje kök dizininde `render.yaml` dosyası mevcut. Bu dosya ile tek tıkla deploy:

1. [Render.com](https://render.com) → New + → Blueprint
2. GitHub repository'nizi bağlayın
3. Apply butonuna tıklayın
4. Tüm servisler (Database, Backend, Frontend) otomatik oluşturulur

### Environment Variables

**Backend (Render Web Service):**
```env
NODE_ENV=production
PORT=3000
DB_HOST=<from-database>
DB_PORT=5432
DB_USER=<from-database>
DB_PASSWORD=<from-database>
DB_NAME=<from-database>
JWT_SECRET=<strong-random-secret>
FRONTEND_URL=<frontend-url>
```

**Frontend (Static Site):**
```env
VITE_API_BASE_URL=<backend-url>
```

### CI/CD
- Render otomatik olarak main branch'teki her commit'i deploy eder
- Preview environments için PR branch'leri kullanabilirsiniz

## API Dokümantasyonu

### Kimlik Doğrulama
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi

### Kullanıcı Profili
- `GET /api/profile/:userId` - Kullanıcı profili getir
- `POST /api/profile/save-settings` - Profil ayarlarını kaydet
- `DELETE /api/profile/delete-account/:userId` - Hesap sil

### Yetenekler (Skills)
- `GET /api/skills` - Tüm yetenekleri listele
- `POST /api/skills` - Yeni yetenek ekle
- `PUT /api/skills/:skillId` - Yetenek güncelle
- `DELETE /api/skills/:skillId` - Yetenek sil
- `GET /api/categories` - Tüm kategorileri listele

### Kullanıcı Becerileri (User Skills) 🆕
- `GET /user-skills/:userId` - Kullanıcının becerilerini getir (Offering/Seeking)
- `POST /user-skills` - Kullanıcıya beceri ekle (Token gerekli)
- `DELETE /user-skills/:id` - Kullanıcıdan beceri sil (Token gerekli)

### Karşılıklı Eşleşme (Reciprocal Matching) 🆕
- `GET /swaps/reciprocal` - İki yönlü beceri eşleşmelerini getir (Token gerekli)
  - Kullanıcı A'nın Seeking becerileri = Kullanıcı B'nin Offering becerileri
  - Kullanıcı B'nin Seeking becerileri = Kullanıcı A'nın Offering becerileri

### Projeler
- `GET /projects` - Tüm projeleri listele
- `GET /projects/:id` - Proje detayı
- `GET /projects/my` - Kullanıcının projeleri (Token gerekli)
- `POST /projects` - Yeni proje oluştur (Token gerekli)
- `PUT /projects/:id` - Proje güncelle (Token gerekli)
- `DELETE /projects/:id` - Proje sil (Token gerekli)

### Başvurular (Matches)
- `GET /matches/user` - Kullanıcının başvurularını listele (Token gerekli)
- `POST /matches` - Projeye başvur (Token gerekli)
- `PUT /matches/:id/status` - Başvuru durumu güncelle (Token gerekli)
- `DELETE /matches/:id` - Başvuru sil (Token gerekli)

### Dashboard
- `GET /user/tasks?filter=ongoing` - Devam eden işler
- `GET /user/tasks?filter=offers` - Bekleyen teklifler
- `GET /user/tasks?filter=suggestions` - Önerilen projeler

### Admin
- `GET /api/admin/users` - Tüm kullanıcıları listele
- `PUT /api/admin/users/:userId` - Kullanıcı güncelle
- `DELETE /api/admin/users/:userId` - Kullanıcı sil

> **Not:** 🔒 Token gerekli endpoint'ler için `Authorization: Bearer <TOKEN>` header'ı gereklidir.

## Yol Haritası

- ✅ MVP: Proje ve beceri ilanları, başvuru/katılım, temel profil
- ✅ Kullanıcı beceri sistemi (Offering/Seeking)
- ✅ Karşılıklı eşleşme algoritması (Reciprocal Matching)
- ⏳ Mesajlaşma/işbirliği araçları
- ⏳ Bildirim sistemi
- ⏳ Değerlendirme ve rozetler
- ⏳ Mobil uyum ve erişilebilirlik iyileştirmeleri


