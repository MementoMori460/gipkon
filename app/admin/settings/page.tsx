"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Save, RefreshCw } from "lucide-react";

export default function SettingsPage() {
    const router = useRouter();
    const { refreshTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [settings, setSettings] = useState({
        contact: {
            address: "",
            phone: "",
            email: "",
            mapUrl: ""
        },
        social: {
            facebook: "",
            twitter: "",
            linkedin: "",
            instagram: ""
        },
        theme: {
            primaryColor: "#0056e0"
        }
    });

    useEffect(() => {
        fetch("/api/admin/settings")
            .then((res) => res.json())
            .then((data) => {
                setSettings(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    const handleChange = (section: string, field: string, value: string) => {
        setSettings((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleThemeChange = (field: string, value: string) => {
        setSettings((prev: any) => ({
            ...prev,
            theme: {
                ...prev.theme,
                [field]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });

            if (res.ok) {
                await refreshTheme(); // Apply theme changes immediately
                alert("Ayarlar başarıyla kaydedildi.");
                router.refresh();
            } else {
                alert("Kaydetme başarısız oldu.");
            }
        } catch (error) {
            console.error(error);
            alert("Bir hata oluştu.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-8">Yükleniyor...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Site Ayarları</h1>
                <button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                    {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                    Kaydet
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 pb-2 border-b">İletişim Bilgileri</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                            <textarea
                                value={settings.contact.address}
                                onChange={(e) => handleChange("contact", "address", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                rows={3}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                            <input
                                type="text"
                                value={settings.contact.phone}
                                onChange={(e) => handleChange("contact", "phone", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                            <input
                                type="email"
                                value={settings.contact.email}
                                onChange={(e) => handleChange("contact", "email", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Harita URL (Embed)</label>
                            <input
                                type="text"
                                value={settings.contact.mapUrl || ""}
                                onChange={(e) => handleChange("contact", "mapUrl", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                                placeholder="Google Maps embed URL"
                            />
                        </div>
                    </div>
                </div>

                {/* Theme & Social */}
                <div className="space-y-8">
                    {/* Theme Settings */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Tema Ayarları</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ana Tema Rengi
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={settings.theme?.primaryColor || "#0056e0"}
                                        onChange={(e) => handleThemeChange("primaryColor", e.target.value)}
                                        className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
                                    />
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={settings.theme?.primaryColor || "#0056e0"}
                                            onChange={(e) => handleThemeChange("primaryColor", e.target.value)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Sitenin ana rengi (Butonlar, linkler, vurgular).
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Metin / İkincil Renk
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={settings.theme?.secondaryColor || "#5576a3"}
                                        onChange={(e) => handleThemeChange("secondaryColor", e.target.value)}
                                        className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
                                    />
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={settings.theme?.secondaryColor || "#5576a3"}
                                            onChange={(e) => handleThemeChange("secondaryColor", e.target.value)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Metinler ve ikincil elemanlar için temel renk. (Genellikle Koyu Gri veya Lacivert tonları).
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Sosyal Medya</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                                <input
                                    type="url"
                                    value={settings.social.facebook}
                                    onChange={(e) => handleChange("social", "facebook", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Twitter / X</label>
                                <input
                                    type="url"
                                    value={settings.social.twitter}
                                    onChange={(e) => handleChange("social", "twitter", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                                <input
                                    type="url"
                                    value={settings.social.linkedin}
                                    onChange={(e) => handleChange("social", "linkedin", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                                <input
                                    type="url"
                                    value={settings.social.instagram}
                                    onChange={(e) => handleChange("social", "instagram", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
