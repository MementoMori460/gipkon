import fs from "fs";
import path from "path";

async function getData() {
    const projectsPath = path.join(process.cwd(), "data/projects.json");
    const referencesPath = path.join(process.cwd(), "data/references.json");
    const sectorsPath = path.join(process.cwd(), "data/sectors.json");

    let projectCount = 0;
    let referenceCount = 0;
    let sectorCount = 0;
    let lastUpdate = "-";
    let lastBackup = "Hiç Alınmadı";

    try {
        let lastModified = 0;

        if (fs.existsSync(projectsPath)) {
            const projects = JSON.parse(fs.readFileSync(projectsPath, "utf-8"));
            projectCount = projects.length;
            const stats = fs.statSync(projectsPath);
            lastModified = Math.max(lastModified, stats.mtimeMs);
        }
        if (fs.existsSync(referencesPath)) {
            const references = JSON.parse(fs.readFileSync(referencesPath, "utf-8"));
            referenceCount = references.length;
            const stats = fs.statSync(referencesPath);
            lastModified = Math.max(lastModified, stats.mtimeMs);
        }
        const settingsPath = path.join(process.cwd(), "data/settings.json");
        if (fs.existsSync(settingsPath)) {
            try {
                const settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
                if (settings.system?.lastBackup) {
                    lastBackup = new Date(settings.system.lastBackup).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit"
                    });
                }
            } catch (e) {
                // ignore
            }
        }

        if (fs.existsSync(sectorsPath)) {
            const sectors = JSON.parse(fs.readFileSync(sectorsPath, "utf-8"));
            sectorCount = sectors.length;
            const activeCount = sectors.filter((s: any) => s.isActive).length;

            const stats = fs.statSync(sectorsPath);
            lastModified = Math.max(lastModified, stats.mtimeMs);

            // Temporary hack to pass active count out without changing return signature too much or breaking other things if not needed
            // Actually better to just format it in the return or add a new field
            return { projectCount, referenceCount, sectorCount, activeSectorCount: activeCount, lastUpdate, lastBackup };
        }

        if (lastModified > 0) {
            lastUpdate = new Date(lastModified).toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit"
            });
        }
    } catch (error) {
        console.error("Error reading stats:", error);
    }

    return { projectCount, referenceCount, sectorCount, activeSectorCount: 0, lastUpdate, lastBackup };
}

export default async function AdminDashboard() {
    const { projectCount, referenceCount, sectorCount, activeSectorCount, lastUpdate, lastBackup } = await getData();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Genel Bakış</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Toplam Proje</h3>
                    <div className="text-3xl font-bold text-primary-600">{projectCount}</div>
                    <div className="text-xs text-green-500 mt-2">Yayında</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Sektörler</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary-600">{activeSectorCount}</span>
                        <span className="text-sm text-gray-400">/ {sectorCount}</span>
                    </div>
                    <div className="text-xs text-green-500 mt-2">Aktif / Toplam</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Referanslar</h3>
                    <div className="text-3xl font-bold text-primary-600">{referenceCount}</div>
                    <div className="text-xs text-green-500 mt-2">Görüntüleniyor</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Son Güncelleme</h3>
                    <div className="text-gray-800 font-semibold">{lastUpdate}</div>
                    <div className="text-xs text-gray-400 mt-2">Son Yedek: {lastBackup}</div>
                </div>
            </div>

            <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <h2 className="text-xl font-semibold mb-4">Hoş Geldiniz!</h2>
                <p className="text-gray-600 max-w-lg mx-auto mb-6">
                    Sol menüden <strong>Projeler</strong> veya <strong>Referanslar</strong> sekmesine tıklayarak site içeriğini yönetmeye başlayabilirsiniz.
                </p>
            </div>
        </div>
    );
}
