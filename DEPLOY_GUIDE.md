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

---

## Seçenek 3: Docker & Portainer (Swarm Uyumlu)

Portainer'ınızın **Swarm Modunda** çalıştığı anlaşılıyor. Bu modda Portainer direkt derleme (build) yapamaz. Bu yüzden kodu önce GitHub üzerinde derleyip Portainer'a hazır bir paket (image) olarak sunmalıyız.

Bunun için otomatik bir sistem (GitHub Action) kurdum.

### Adım 1: Kodu GitHub'a Yükleyin

Yaptığım değişiklikleri (özellikle `.github/workflows/deploy.yml` dosyasını) GitHub'a yükleyin:

```bash
git add .
git commit -m "Add Docker CI/CD workflow"
git push origin main
```

Bunu yaptığınızda GitHub'da "Actions" sekmesinde bir işlem başlayacak ve `ghcr.io/mementomori460/gipkon` adında bir imaj oluşturacak. Bu işlemin bitmesini (yeşil tik olmasını) bekleyin.

### Adım 2: Portainer Kurulumu

1.  Portainer paneline girin: **Stacks** > **Add stack**
2.  **Name**: `gipkon`
3.  **Method**: `Repository`
4.  **Repository URL**: `https://github.com/MementoMori460/gipkon.git`
5.  **Environment variables**:
    *   `NEXTAUTH_SECRET`: (Daha önce oluşturduğunuz şifre)
6.  **Deploy the stack** butonuna basın.

> **Not (ÖNEMLİ):** Eğer GitHub projeniz **Private (Gizli)** ise:
> 1.  GitHub'da profilinizden: **Settings > Developer Settings > Personal access tokens (Classic)** yoluna gidin. "Generate new token" deyin ve `read:packages` iznini seçip token oluşturun.
> 2.  Portainer'da **Registries** menüsüne gidin. **Custom registry** seçin.
>     *   **Name**: `GitHub Container Registry`
>     *   **Registry URL**: `ghcr.io`
>     *   **Username**: GitHub kullanıcı adınız
>     *   **Password**: Az önce oluşturduğunuz Token
> 3.  Stack oluştururken bu Registry'yi kullanması gerektiğini belirtin (veya Authentication kısmında kullanın).

Fakat projeniz **Public** ise buna gerek kalmayacaktır.

---

## Adım 3: Nginx Proxy Manager (NPM) Ayarları

Uygulamanız artık `33031` portundan çalışıyor. Sitenizi yayına almak için Nginx Proxy Manager'da şu ayarları yapın:

1.  **Dashboard** > **Add Proxy Host**
2.  **Domain Names**: `siteniz.com` (veya sunucu IP'niz)
3.  **Scheme**: `http`
4.  **Forward Host**: `10.0.100.27` (veya Docker sunucunuzun IP adresi)
5.  **Forward Port**: `33031`
6.  **Block Common Exploits**: Açık
7.  **SSL** sekmesine geçin:
    *   **SSL Certificate**: `Request a new SSL Certificate`
    *   **Force SSL**: Açık
    *   **HTTP/2 Support**: Açık
8.  **Save** butonuna basın.

Artık siteniz `https://siteniz.com` adresinde güvenli bir şekilde çalışacaktır.

---

## ⚠️ Önemli Notlar

1.  **Güncelleme**: Sitede bir değişiklik yaptığınızda `git push` yapın. GitHub Action otomatik çalışır. Bittiğinde Portainer'da Stack'in içine girip **"Update the stack"** ve **"Re-pull image"** demeniz yeterlidir.
2.  **Veriler**: Verileriniz yine `volumes` sayesinde sunucuda güvende kalır.
3.  **Port**: Eğer `33031` portu doluysa `docker-compose.yml` dosyasından ve NPM ayarlarından değiştirebilirsiniz.

---

## ⚠️ Önemli Notlar

1.  **Resim Yükleme**: `public/uploads` klasörünün yazılabilir olduğundan emin olun.
2.  **Ortam Değişkenleri**: `.env` dosyanızı sunucuya atmayı unutmayın veya Portainer'da "Environment variables" kısmına `NEXTAUTH_SECRET` ekleyin.
