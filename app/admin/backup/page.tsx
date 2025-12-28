"use client";

import { useState } from "react";
import { Download, Upload, AlertCircle, CheckCircle, Save } from "lucide-react";
import Button from "@/components/ui/Button";

export default function BackupPage() {
    const [isRestoring, setIsRestoring] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleDownload = () => {
        window.location.href = "/api/admin/backup";
    };

    const handleRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!confirm("DİKKAT! Bu işlem mevcut tüm verilerinizi (sektörler, ayarlar, projeler) veritabanından silecektir ve yerini yedek dosyadaki veriler alacaktır. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?")) {
            e.target.value = ""; // Reset input
            return;
        }

        setIsRestoring(true);
        setMessage(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/admin/backup", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                setMessage({ type: "success", text: "Yedek başarıyla geri yüklendi!" });
                setTimeout(() => window.location.reload(), 2000);
            } else {
                const data = await res.json();
                setMessage({ type: "error", text: data.error || "Geri yükleme başarısız oldu." });
            }
        } catch (error) {
            console.error(error);
            setMessage({ type: "error", text: "Bir hata oluştu." });
        } finally {
            setIsRestoring(false);
            e.target.value = "";
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Sistem Yedekleme ve Geri Yükleme</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Backup Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Download className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Yedek Al</h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        Mevcut veritabanınızı (data klasörü) bir ZIP dosyası olarak bilgisayarınıza indirin. Bu dosyayı daha sonra sistemi geri yüklemek veya başka bir sunucuya taşımak için kullanabilirsiniz.
                    </p>
                    <Button onClick={handleDownload} variant="primary" className="w-full justify-center">
                        <Save className="w-4 h-4 mr-2" />
                        Yedeği İndir
                    </Button>
                </div>

                {/* Restore Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                        <Upload className="w-6 h-6 text-orange-600" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Yedekten Geri Yükle</h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        Daha önce aldığınız bir ZIP yedeğini yükleyerek sistemi o tarihteki durumuna döndürün.
                    </p>

                    {message && (
                        <div className={`mb-4 p-3 rounded-lg flex items-center text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {message.type === 'success' ? <CheckCircle className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
                            {message.text}
                        </div>
                    )}

                    <div className="relative">
                        <input
                            type="file"
                            accept=".zip"
                            onChange={handleRestore}
                            disabled={isRestoring}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        />
                        <Button variant="outline" className={`w-full justify-center ${isRestoring ? 'opacity-50' : ''}`}>
                            <Upload className="w-4 h-4 mr-2" />
                            {isRestoring ? "Yükleniyor..." : "Yedek Dosyası Seç ve Yükle"}
                        </Button>
                    </div>
                    <p className="text-xs text-red-500 mt-3 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Bu işlem mevcut verilerinizi kalıcı olarak silecektir!
                    </p>
                </div>
            </div>
        </div>
    );
}
