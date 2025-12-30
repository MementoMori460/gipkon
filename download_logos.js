const fs = require('fs');
const path = require('path');
const https = require('http'); // The URLs are http

const urls = [
    "http://gipkon.com.tr/wp-content/uploads/2018/06/GEMAK-GIDA-END.-MAKİNALARI.png",
    "http://gipkon.com.tr/wp-content/uploads/2018/06/ROKETSAN-A.Ş..png",
    "http://gipkon.com.tr/wp-content/uploads/2018/06/SMART-PROSES-300x100.jpg",
    "http://gipkon.com.tr/wp-content/uploads/2018/06/NEOSİS.png",
    "http://gipkon.com.tr/wp-content/uploads/2018/06/ETİ-GIDA.png",
    "http://gipkon.com.tr/wp-content/uploads/2018/06/ÇAMLICA-GIDA.png",
    "http://gipkon.com.tr/wp-content/uploads/2018/06/ALTIN-KÖY-300x100.png",
    "http://gipkon.com.tr/wp-content/uploads/2018/06/AMAK-CO.-300x100.png",
    "http://gipkon.com.tr/wp-content/uploads/2018/07/logo_azersud.png",
    "http://gipkon.com.tr/wp-content/uploads/2018/07/Pharmactive-300x135-300x135.png",
    "http://gipkon.com.tr/wp-content/uploads/2021/05/Baymina-engie.jpg",
    "http://gipkon.com.tr/wp-content/uploads/2021/05/MKEK.png",
    "http://gipkon.com.tr/wp-content/uploads/2021/05/Tada-Gida.png",
    "http://gipkon.com.tr/wp-content/uploads/2021/05/Tepe-Betopan.jpg",
    "http://gipkon.com.tr/wp-content/uploads/2018/06/PROMAK-PROSES-MAKİNALARI.png"
];

const downloadDir = path.join(__dirname, 'public/images/references');

if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
}

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                fs.unlink(dest, () => reject(`Server responded with ${response.statusCode}: ${url}`));
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err.message));
        });
    });
};

const run = async () => {
    for (const url of urls) {
        const filename = decodeURIComponent(path.basename(url));
        const dest = path.join(downloadDir, filename);
        try {
            console.log(`Downloading ${filename}...`);
            await download(url, dest);
            console.log(`Saved to ${dest}`);
        } catch (err) {
            console.error(`Failed to download ${url}: ${err}`);
        }
    }
};

run();
