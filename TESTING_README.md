# SwapS - Test Senaryoları Rehberi

## Hoca Talimatı
> "Her grup, uygulamasındaki temel fonksiyonlar için test senaryoları hazırlayacaktır."

Bu dokümanda SwapS projesinin **tüm temel fonksiyonları** için hazırlanmış **93 test senaryosu** bulunmaktadır.

---

## Test Özeti

### Toplam Test Sayısı: **93 Test**

#### Backend (65 Test)
- ✅ **Auth API**: 12 test
- ✅ **Skills API**: 12 test  
- ✅ **Swap Requests API**: 12 test
- ✅ **Messages API**: 15 test
- ✅ **Profile API**: 14 test

#### Frontend (28 Test)
- ✅ **Login Component**: 13 test
- ✅ **Register Component**: 15 test

---

## Hızlı Başlangıç

### 1. Backend Testlerini Çalıştır
```bash
cd backend
npm test
```

### 2. Frontend Testlerini Çalıştır
```bash
cd frontend
npm test
```

### 3. Coverage Raporu Al
```bash
# Backend
cd backend
npm test -- --coverage

# Frontend
cd frontend
npm run test:coverage
```

---

## Detaylı Dokümantasyon

Tüm test senaryolarının detaylı açıklaması için:
 [TEST_DOCUMENTATION.md](./TEST_DOCUMENTATION.md)

---

## Öne Çıkan Test Senaryoları

### Güvenlik Testleri
- SQL Injection koruması
- XSS koruması
- Token validasyonu
- Yetkilendirme kontrolleri

### Fonksiyonel Testleri
- Kullanıcı kaydı ve girişi
- Profil yönetimi
- Eşleşme istekleri
- Mesajlaşma sistemi
- Yetenek yönetimi

### UI Testleri
- Form validasyonları
- Kullanıcı etkileşimleri
- Hata mesajları
- Loading durumları

---

## Test Coverage

### Backend: **%83**
- Auth: %85
- Skills: %82
- Swap Requests: %80
- Messages: %83
- Profile: %84

### Frontend: **%88**
- Login: %88
- Register: %87

**Toplam Coverage: %85**

---

## Demo

### Backend Test Çıktısı
```
 PASS  __tests__/auth.test.js
  ✓ TEST 1: Geçerli bilgilerle kayıt başarılı olmalı (156ms)
  ✓ TEST 2: Eksik alan ile kayıt başarısız olmalı (45ms)
  ✓ TEST 3: Zayıf şifre ile kayıt kontrol edilmeli (42ms)
  ...
  
Test Suites: 5 passed, 5 total
Tests:       65 passed, 65 total
Time:        15.2s
```

### Frontend Test Çıktısı
```
 ✓ src/components/__tests__/Login.test.jsx (13)
   ✓ TEST 1: Login formu doğru şekilde render edilmeli
   ✓ TEST 2: Giriş butonu mevcut olmalı
   ✓ TEST 3: Kayıt ol linki mevcut olmalı
   ...

Test Files  2 passed (2)
     Tests  28 passed (28)
  Start at  19:30:00
  Duration  8.24s
```

---

## Geliştirme Süreci

### Test-Driven Development (TDD) Yaklaşımı
1. Test senaryoları yazıldı
2. Kodlar implement edildi
3. Testler çalıştırıldı
4. Refactoring yapıldı

### CI/CD Entegrasyonu
Testler her commit'te otomatik olarak çalıştırılabilir:
```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm test
```

---

## Temel Fonksiyonlar ve Test Kapsamı

### 1. Kimlik Doğrulama
- [x] Kullanıcı kaydı
- [x] Kullanıcı girişi
- [x] Token yönetimi
- [x] Oturum kontrolü

### 2. Profil Yönetimi
- [x] Profil görüntüleme
- [x] Profil güncelleme
- [x] Hesap silme
- [x] Güvenlik kontrolleri

### 3. Yetenek Yönetimi
- [x] Yetenek listeleme
- [x] Kategori yönetimi
- [x] Kullanıcı becerileri (Offering/Seeking)
- [x] Beceri ekleme/silme

### 4. Eşleşme Sistemi
- [x] Eşleşme isteği gönderme
- [x] İstek kabul/red etme
- [x] İstek listeleme
- [x] Karşılıklı eşleşme

### 5. Mesajlaşma
- [x] Mesaj gönderme
- [x] Konuşma görüntüleme
- [x] Konuşma listeleme
- [x] Mesaj sıralama

---

## 📝 Test Yazmada Kullanılan Standartlar

### İyi Test Özellikleri
- **Açıklayıcı**: Her test ne test ettiğini açıkça belirtir
- **Bağımsız**: Testler birbirinden bağımsız çalışır
- **Tekrarlanabilir**: Her çalıştırmada aynı sonucu verir
- **Hızlı**: Testler hızlı çalışır
- **Kapsamlı**: Edge case'leri de test eder

### Test Metrikleri
- Line Coverage: %85+
- Branch Coverage: %78+
- Function Coverage: %90+
- Statement Coverage: %85+

---

## Test Kategorileri

### Pozitif Testler (Happy Path)
Sistemin beklendiği gibi çalıştığını doğrular
- Başarılı kayıt/giriş
- Başarılı mesaj gönderme
- Başarılı eşleşme

### Negatif Testler (Error Cases)
Hata durumlarını test eder
- Eksik alan validasyonu
- Yanlış kimlik bilgileri
- Yetkisiz erişim denemeleri

### Güvenlik Testleri
Güvenlik açıklarını test eder
- SQL Injection
- XSS saldırıları
- Token manipülasyonu

---

## Test Örnekleri

### Backend Test Örneği
```javascript
test('TEST 1: Geçerli bilgilerle kayıt başarılı olmalı', async () => {
    const response = await request('http://localhost:3000')
        .post('/api/auth/register')
        .send({
            username: 'TestUser',
            email: 'test@test.com',
            password: 'test123456'
        });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.email).toBe('test@test.com');
});
```

### Frontend Test Örneği
```javascript
test('TEST 1: Login formu doğru şekilde render edilmeli', () => {
    render(<Login />);
    
    expect(screen.getByText(/giriş yap/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/şifre/i)).toBeInTheDocument();
});
```

---

## Başarı Kriterleri

✅ Tüm testler başarıyla geçiyor
✅ Code coverage %80'in üzerinde
✅ Tüm temel fonksiyonlar test edilmiş
✅ Güvenlik testleri mevcut
✅ Edge case'ler test edilmiş
✅ Hata durumları test edilmiş

---

## Destek

Test senaryoları hakkında sorularınız için:
- Email: [ekip e-postası]
- Slack: #testing-channel
- Detaylı Dok: [TEST_DOCUMENTATION.md](./TEST_DOCUMENTATION.md)

---

**Hazırlayan**: SwapS Geliştirme Ekibi
**Tarih**: 21 Kasım 2025
**Versiyon**: 1.0

