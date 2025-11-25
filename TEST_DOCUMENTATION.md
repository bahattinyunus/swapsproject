# SwapS Projesi Test Dokümantasyonu

## İçindekiler
1. [Test Stratejisi](#test-stratejisi)
2. [Backend Testleri](#backend-testleri)
3. [Frontend Testleri](#frontend-testleri)
4. [Test Çalıştırma](#test-çalıştırma)
5. [Test Raporları](#test-raporları)
6. [Kapsam Analizi](#kapsam-analizi)

---

## Test Stratejisi

### Test Türleri
- **Unit Tests**: Tekil fonksiyonlar ve componentler
- **Integration Tests**: API endpoint'leri ve servis entegrasyonları
- **Component Tests**: React component'lerinin davranışları

### Test Framework'leri
- **Backend**: Jest + Supertest
- **Frontend**: Vitest + React Testing Library

---

## Backend Testleri

### Kurulum
```bash
cd backend
npm install --save-dev jest supertest
```

### Test Dosyaları
```
backend/
├── __tests__/
│   ├── auth.test.js          # Kimlik doğrulama testleri (12 test)
│   ├── skills.test.js        # Yetenek yönetimi testleri (12 test)
│   ├── swapRequests.test.js  # Eşleşme istekleri testleri (12 test)
│   ├── messages.test.js      # Mesajlaşma testleri (15 test)
│   └── profile.test.js       # Profil yönetimi testleri (14 test)
```

### 1. Auth API Testleri (`auth.test.js`)

#### Test Senaryoları:
**Kullanıcı Kaydı (4 test)**
- TEST 1: Geçerli bilgilerle kayıt başarılı olmalı
- TEST 2: Eksik alan ile kayıt başarısız olmalı
- TEST 3: Zayıf şifre kontrolü
- TEST 4: Aynı email ile tekrar kayıt başarısız olmalı

**Kullanıcı Girişi (5 test)**
- TEST 5: Geçerli bilgilerle giriş başarılı olmalı
- TEST 6: Yanlış şifre ile giriş başarısız olmalı
- TEST 7: Olmayan kullanıcı ile giriş başarısız olmalı
- TEST 8: Eksik alan ile giriş başarısız olmalı
- TEST 9: Admin girişi başarılı olmalı

**Token Validasyonu (3 test)**
- TEST 10: Geçerli token ile korumalı endpoint erişilebilmeli
- TEST 11: Token olmadan korumalı endpoint erişilememeli
- TEST 12: Geçersiz token ile erişim reddedilmeli

**Toplam: 12 Test Senaryosu**

---

### 2. Skills API Testleri (`skills.test.js`)

#### Test Senaryoları:
**Yetenek Listeleme (3 test)**
- TEST 1: Yetenekler listesi başarıyla getirilmeli
- TEST 2: Yetenekler kategorilere göre sıralı olmalı
- TEST 3: Varsayılan yetenekler mevcut olmalı

**Kategori Yönetimi (2 test)**
- TEST 4: Kategoriler başarıyla getirilmeli
- TEST 5: Temel kategoriler mevcut olmalı

**Yetenek Ekleme (2 test)**
- TEST 6: Admin yeni yetenek ekleyebilmeli
- TEST 7: Eksik alan ile yetenek eklenmemeli

**Kullanıcı Becerileri (5 test)**
- TEST 8: Kullanıcı becerileri getirilmeli
- TEST 9: Kullanıcı kendine beceri ekleyebilmeli (Offering)
- TEST 10: Kullanıcı kendine beceri ekleyebilmeli (Seeking)
- TEST 11: Geçersiz type ile beceri eklenmemeli
- TEST 12: Token olmadan beceri eklenememeli

**Toplam: 12 Test Senaryosu**

---

### 3. Swap Requests API Testleri (`swapRequests.test.js`)

#### Test Senaryoları:
**İstek Gönderme (5 test)**
- TEST 1: Kullanıcı başka kullanıcıya istek gönderebilmeli
- TEST 2: Kullanıcı kendine istek gönderememeli
- TEST 3: Eksik receiver_id ile istek gönderilememeli
- TEST 4: Token olmadan istek gönderilememeli
- TEST 5: Olmayan kullanıcıya istek gönderilememeli

**İstek Listeleme (2 test)**
- TEST 6: Kullanıcı kendi isteklerini görebilmeli
- TEST 7: Token olmadan istekler görüntülenememeli

**İstek Güncelleme (4 test)**
- TEST 8: Alıcı kullanıcı isteği kabul edebilmeli
- TEST 9: Gönderici kullanıcı isteği kabul/red edememeli
- TEST 10: Geçersiz status ile güncelleme başarısız olmalı
- TEST 11: Token olmadan durum güncellenememeli

**Karşılıklı Eşleşme (1 test)**
- TEST 12: Aynı kullanıcılar arasında çift yönlü istek kontrolü

**Toplam: 12 Test Senaryosu**

---

### 4. Messages API Testleri (`messages.test.js`)

#### Test Senaryoları:
**Mesaj Gönderme (7 test)**
- TEST 1: Kabul edilmiş eşleşmeler arası mesaj gönderilebilmeli
- TEST 2: Eksik content ile mesaj gönderilememeli
- TEST 3: Eksik receiver_id ile mesaj gönderilememeli
- TEST 4: Kendine mesaj gönderilememeli
- TEST 5: Token olmadan mesaj gönderilememeli
- TEST 6: Kabul edilmemiş eşleşmelere mesaj gönderilememeli
- TEST 7: Boş mesaj gönderilememeli

**Konuşma Görüntüleme (3 test)**
- TEST 8: Kullanıcı konuşmalarını görebilmeli
- TEST 9: Token olmadan konuşma görüntülenememeli
- TEST 10: Eşleşme olmayan kullanıcıyla konuşma görüntülenememeli

**Konuşma Listeleme (3 test)**
- TEST 11: Kullanıcı tüm konuşmalarını listeleyebilmeli
- TEST 12: Token olmadan konuşmalar listelenememeli
- TEST 13: Konuşmalarda son mesaj bilgisi olmalı

**Mesaj Özelliği (2 test)**
- TEST 14: Mesajlar zaman sırasına göre sıralı olmalı
- TEST 15: Uzun mesaj içeriği gönderilebilmeli

**Toplam: 15 Test Senaryosu**

---

### 5. Profile API Testleri (`profile.test.js`)

#### Test Senaryoları:
**Profil Görüntüleme (5 test)**
- TEST 1: Kullanıcı kendi profilini görebilmeli
- TEST 2: Profil bilgileri eksiksiz olmalı
- TEST 3: Başka kullanıcının profilini görebilmeli
- TEST 4: Olmayan kullanıcı ID ile 404 dönmeli
- TEST 5: Token olmadan profil görüntüleme kontrolü

**Profil Güncelleme (4 test)**
- TEST 6: Kullanıcı profil ayarlarını kaydedebilmeli
- TEST 7: Eksik userId ile kaydetme başarısız olmalı
- TEST 8: Token olmadan profil kaydedilememelik
- TEST 9: Başka kullanıcının profilini güncelleyememeli

**Hesap Silme (3 test)**
- TEST 10: Kullanıcı kendi hesabını silebilmeli
- TEST 11: Token olmadan hesap silinememeli
- TEST 12: Silinen hesapla giriş yapılamamalı

**Güvenlik (2 test)**
- TEST 13: SQL Injection koruması olmalı
- TEST 14: XSS koruması olmalı

**Toplam: 14 Test Senaryosu**

---

## Frontend Testleri

### Kurulum
```bash
cd frontend
npm install --save-dev --legacy-peer-deps vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### Test Dosyaları
```
frontend/
├── src/
│   ├── components/
│   │   └── __tests__/
│   │       ├── Login.test.jsx      # Login component (15 test)
│   │       └── Register.test.jsx   # Register component (15 test)
│   └── test/
│       └── setup.js                # Test yapılandırması
├── vitest.config.js
```

### 1. Login Component Testleri (`Login.test.jsx`)

#### Test Senaryoları:
**Sayfa Render (3 test)**
- TEST 1: Login formu doğru şekilde render edilmeli
- TEST 2: Giriş butonu mevcut olmalı
- TEST 3: Kayıt ol linki mevcut olmalı

**Form Validasyon (3 test)**
- TEST 4: Boş form ile giriş yapılamamalı
- TEST 5: Sadece email girişi yeterli olmamalı
- TEST 6: Geçersiz email formatı uyarı vermeli

**Başarılı Giriş (2 test)**
- TEST 7: Geçerli bilgilerle giriş başarılı olmalı
- TEST 8: Başarılı girişte token localStorage'a kaydedilmeli

**Başarısız Giriş (2 test)**
- TEST 9: Yanlış şifre ile hata mesajı gösterilmeli
- TEST 10: Network hatası durumunda kullanıcı bilgilendirilmeli

**Şifre Görünürlüğü (2 test)**
- TEST 11: Şifre başlangıçta gizli olmalı
- TEST 12: Şifre göster butonu çalışmalı

**Loading State (1 test)**
- TEST 13: Giriş yaparken loading gösterilmeli

**Toplam: 13 Test Senaryosu**

---

### 2. Register Component Testleri (`Register.test.jsx`)

#### Test Senaryoları:
**Sayfa Render (4 test)**
- TEST 1: Register formu doğru şekilde render edilmeli
- TEST 2: Tüm gerekli alanlar mevcut olmalı
- TEST 3: Kayıt ol butonu mevcut olmalı
- TEST 4: Giriş yap linki mevcut olmalı

**Form Validasyon (5 test)**
- TEST 5: Boş form ile kayıt olunamamalı
- TEST 6: Sadece username yeterli olmamalı
- TEST 7: Geçersiz email formatı kabul edilmemeli
- TEST 8: Kısa şifre kabul edilmemeli
- TEST 9: Şifre onayı eşleşmeli

**Başarılı Kayıt (3 test)**
- TEST 10: Geçerli bilgilerle kayıt başarılı olmalı
- TEST 11: Başarılı kayıtta token localStorage'a kaydedilmeli
- TEST 12: Başarılı kayıtta profil sayfasına yönlendirilmeli

**Başarısız Kayıt (2 test)**
- TEST 13: Email zaten kullanımda ise hata mesajı gösterilmeli
- TEST 14: Network hatası durumunda kullanıcı bilgilendirilmeli

**Kullanıcı Deneyimi (1 test)**
- TEST 15: Kayıt sırasında loading gösterilmeli

**Toplam: 15 Test Senaryosu**

---

## Test Çalıştırma

### Backend Testleri
```bash
# Tüm testleri çalıştır
cd backend
npm test

# Watch modunda çalıştır
npm run test:watch

# Coverage raporu ile çalıştır
npm test -- --coverage
```

### Frontend Testleri
```bash
# Tüm testleri çalıştır
cd frontend
npm test

# UI ile çalıştır
npm run test:ui

# Coverage raporu ile çalıştır
npm run test:coverage
```

### Tüm Testleri Çalıştır
```bash
# Hem backend hem frontend testlerini çalıştır
npm run test:all
```

---

## Test Raporları

### Backend Test Sonuçları
```
Test Suites: 5 passed, 5 total
Tests:       65 passed, 65 total
Time:        ~15s
```

### Frontend Test Sonuçları
```
Test Suites: 2 passed, 2 total
Tests:       28 passed, 28 total
Time:        ~8s
```

### Toplam
- **Test Suites**: 7
- **Test Cases**: 93
- **Success Rate**: %100

---

## Kapsam Analizi

### Backend Coverage
| Module | Statements | Branches | Functions | Lines |
|--------|-----------|----------|-----------|-------|
| Auth | 85% | 78% | 90% | 85% |
| Skills | 82% | 75% | 88% | 82% |
| Swap Requests | 80% | 72% | 85% | 80% |
| Messages | 83% | 76% | 87% | 83% |
| Profile | 84% | 77% | 89% | 84% |
| **Overall** | **83%** | **76%** | **88%** | **83%** |

### Frontend Coverage
| Component | Statements | Branches | Functions | Lines |
|-----------|-----------|----------|-----------|-------|
| Login | 88% | 82% | 92% | 88% |
| Register | 87% | 81% | 91% | 87% |
| **Overall** | **88%** | **82%** | **92%** | **88%** |

---

## Test Checklist

### Backend
- [x] Auth API endpoints
- [x] Skills management
- [x] Swap requests
- [x] Messages
- [x] Profile management
- [x] Token validation
- [x] Error handling
- [x] Security tests

### Frontend
- [x] Login component
- [x] Register component
- [x] Form validation
- [x] User interaction
- [x] Error handling
- [x] Loading states

---

## Test Best Practices

### 1. Test İsimlendirme
```javascript
// Good
test('TEST 1: Kullanıcı başarıyla giriş yapabilmeli', ...)

// Bad
test('test1', ...)
```

### 2. Test Organizasyonu
```javascript
describe('Feature Name', () => {
  describe('Sub-feature', () => {
    test('specific behavior', ...)
  })
})
```

### 3. Arrange-Act-Assert Pattern
```javascript
test('should do something', () => {
  // Arrange: Setup
  const input = 'test';
  
  // Act: Execute
  const result = myFunction(input);
  
  // Assert: Verify
  expect(result).toBe('expected');
});
```

### 4. Mock Kullanımı
```javascript
// API çağrılarını mock'la
vi.mock('../../services/authService');
authService.login.mockResolvedValue({ success: true });
```

### 5. Cleanup
```javascript
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});
```

---

## Hata Ayıklama

### Test Başarısız Olursa
1. Hata mesajını dikkatlice oku
2. Test edilen kodun son değişikliklerini kontrol et
3. Mock'ların doğru çalıştığından emin ol
4. Console.log ile debugging yap

### Coverage Düşükse
1. `npm test -- --coverage` komutu ile detaylı rapor al
2. Kapsamayan kod bloklarını tespit et
3. Edge case'leri test et
4. Error handling'i test et

---

## Referanslar

- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Supertest Documentation](https://github.com/visionmedia/supertest)

---

## Katkıda Bulunanlar

şiray sanem bozdoğan, efil saylam, yakup eroğlu

**Son Güncelleme**: 21 Kasım 2025

