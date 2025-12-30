# Sunucu Kurulum Rehberi (Next.js & Node.js)

Bu proje **Next.js (App Router)** tabanlıdır. Yönetim panelinin (`Admin Panel`) sorunsuz çalışması ve değişikliklerin kaydedilebilmesi için uygulamanın **Node.js** destekleyen bir sunucuda çalışması gerekir.

> [!TIP]
> **Kendi sunucunuza (VPS, VDS veya Node.js destekli Hosting) kurarsanız, harici bir veritabanına ihtiyacınız yoktur.** Mevcut JSON tabanlı sistem sorunsuz çalışır.

## Gereksinimler

-   **Node.js**: Sunucuda Node.js (v18 veya v20) kurulu olmalıdır.
-   **Yazma İzni**: Uygulamanın `data/` klasörüne yazma izni olmalıdır.

---

## Seçenek 1: cPanel / Paylaşımlı Hosting Kurulumu

Eğer Natro, Turhost, Güzel Hosting gibi firmaların "Node.js Destekli" paketlerini kullanıyorsanız:

1.  **Build Alın**:
    Bilgisayarınızda `npm run build` komutunu çalıştırın. `.next/standalone` klasörü oluşacaktır.

2.  **Dosyaları Hazırlayın**:
    Sunucuya yüklenecekler:
    -   `.next/standalone` klasörünün **içindeki tüm dosyalar**
    -   `public` klasörü
    -   `.next/static` klasörü (Bunu, sunucudaki `.next/static` yoluna kopyalayın)

3.  **Yükleme**:
    Dosyaları `public_html` içine yükleyin.

4.  **Node.js Uygulaması Oluşturun**:
    cPanel'den "Setup Node.js App" menüsüne girin.
    -   **Root**: `public_html`
    -   **Startup File**: `server.js`
    -   **Mod**: `Production`
    Uygulamayı başlatın.

---

## Seçenek 2: Ubuntu / VPS Kurulumu

Kendi sanal sunucunuz (DigitalOcean, AWS, Hetzner vb.) varsa:

1.  **Sunucuyu Hazırlayın**:
    ```bash
    # Node.js Kurulumu (Örnek: Ubuntu)
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    # Process Manager (PM2) Kurulumu
    sudo npm install -g pm2
    ```

2.  **Dosyaları Gönderin**:
    Projenizi (build alınmış halini veya kaynak kodunu) sunucuya gönderin. Kaynak kodunu gönderdiyseniz sunucuda `npm install && npm run build` yapın.

3.  **Uygulamayı Başlatın**:
    ```bash
    # Uygulama dizininde
    pm2 start npm --name "gipkon" -- start
    # VEYA standalone mod kullanıyorsanız:
    pm2 start server.js --name "gipkon"
    ```

4.  **Nginx ile Yayına Alma (Reverse Proxy)**:
    Uygulamanız genellikle 3000 portunda çalışır. Nginx ile 80/443 portuna yönlendirin.

---
