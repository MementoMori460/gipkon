# Natro / cPanel Kurulum Rehberi (Next.js Node.js)

Bu proje **Next.js (App Router)** ve **Node.js** tabanlıdır. Yönetim panelinin (`Admin Panel`) çalışması ve ayarların (`settings.json`) kaydedilebilmesi için sunucuda **Node.js** servisinin çalışması gerekir.

Standart "Sadece HTML" (Static) hosting paketlerinde yönetim paneli **ÇALIŞMAZ**.
Natro'daki hosting paketinizin **Node.js desteği** olduğundan emin olun (Genellikle "CloudLinux" veya "Setup Node.js App" özelliği olan paketler).

---

## Adım 1: Projeyi Hazırlama (Build)

Bilgisayarınızdaki terminalde şu komutu çalıştırın:

```bash
npm run build
```

Bu işlem tamamlandığında `.next` klasörü içinde `standalone` adında bir klasör oluşacaktır. Bizim sunucuya yükleyeceğimiz ana yapı buradadır.

## Adım 2: Dosyaları Hazırlama

Sunucuya yüklemek için özel bir klasör yapısı hazırlayalım. Masaüstünüzde `gipkon-deploy` diye bir klasör açın ve içine şunları kopyalayın:

1.  Projenizin içindeki `.next/standalone` klasörünün **içindeki her şeyi** `gipkon-deploy` içine atın.
2.  Projenizin içindeki `public` klasörünü, `gipkon-deploy` içine kopyalayın.
3.  Projenizin içindeki `.next/static` klasörünü, `gipkon-deploy` içindeki `.next/static` yoluna kopyalayın (Eğer `.next` klasörü yoksa oluşturun).

**Sonuçta `gipkon-deploy` klasörünün yapısı şöyle olmalı:**
```
gipkon-deploy/
├── .next/
│   ├── static/  <-- (Yerel bilgisayarınızdaki .next/static buraya kopyalandı)
│   └── ...
├── public/      <-- (Yerel bilgisayarınızdaki public buraya kopyalandı)
├── node_modules/
├── server.js    <-- (Bu dosya standalone içinden geldi)
├── package.json
└── ...
```

## Adım 3: Sunucuya Yükleme (cPanel)

1.  Natro müşteri panelinden **cPanel**'e giriş yapın.
2.  **Dosya Yöneticisi (File Manager)**'ni açın.
3.  Web sitenizin kök dizinine (genellikle `public_html`) gidin.
4.  Eğer içeride başka dosyalar varsa (eski site vb.), bunları yedekleyip silin veya yeni bir klasöre taşıyın.
5.  Hazırladığınız `gipkon-deploy` klasörünün içindekileri (ZIP yapıp yüklemek daha hızlıdır) `public_html` içine yükleyin ve çıkartın.

## Adım 4: Node.js Uygulamasını Başlatma

1.  cPanel ana sayfasına dönün.
2.  **"Setup Node.js App"** (veya benzeri "Node.js Uygulaması Oluştur") simgesine tıklayın.
3.  **"Create Application"** butonuna tıklayın.
4.  **Ayarlar:**
    *   **Node.js Version:** `20.x` veya `18.x` (Projenizle uyumlu en yüksek sürüm).
    *   **Application Mode:** `Production`.
    *   **Application Root:** `public_html` (Dosyaları nereye attıysanız).
    *   **Application URL:** Sitenizin adresi (gipkon.com.tr).
    *   **Application Startup File:** `server.js`
5.  **Create** butonuna basın.

## Adım 5: NPM Install (Opsiyonel ama Önerilen)

Eğer `node_modules` klasörünü tam olarak yüklemediyseniz veya eksiklik varsa:
1.  Oluşturduğunuz Node.js uygulamasının detaylarında "Run NPM Install" butonu göreceksiniz. Buna tıklayarak gerekli paketlerin sunucuda kurulmasını sağlayın.
2.  Ancak biz `standalone` mod kullandığımız için gerekli paketler zaten `node_modules` içinde yüklü gelmiş olmalıdır (Adım 2'de kopyalandı).

## Adım 6: Uygulamayı Başlatma/Yeniden Başlatma

1.  "Restart Application" butonuna tıklayın.
2.  Tarayıcınızda sitenizi açın.

---

## ⚠️ Önemli Notlar

1.  **Görsel Hataları:** Eğer resimler görünmüyorsa, `sharp` kütüphanesi Linux sunucuda eksik olabilir. cPanel terminalinden `npm install sharp` komutunu çalıştırmanız gerekebilir.
2.  **Veri Yazma İzni:** `data/settings.json` gibi dosyaların yazılabilir olduğundan emin olun (Dosya izinleri 644 veya 755 olmalıdır).
3.  **htaccess:** Node.js uygulaması oluşturduğunuzda cPanel otomatik bir `.htaccess` dosyası oluşturur. Bunu silmeyin, bu dosya gelen istekleri Node.js uygulamanıza yönlendirir.
